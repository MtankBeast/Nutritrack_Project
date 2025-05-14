from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

# Initialize FastAPI app
app = FastAPI(title="NutriTrack API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security configurations
SECRET_KEY = "your-secret-key"  # In production, use environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Load food database
food_db = pd.read_csv('../src/data/indian_food_database.csv')

# Data Models
class User(BaseModel):
    username: str
    email: str
    full_name: str
    age: int
    weight: float
    height: float
    gender: str
    activity_level: str
    goal: str
    dietary_preferences: List[str] = []
    allergies: List[str] = []

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class MealLog(BaseModel):
    food_name: str
    serving_size: str
    meal_time: str
    date: str

# Helper functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user(username: str):
    # In a real application, this would query a database
    # For now, we'll use a dummy user
    if username == "test_user":
        return UserInDB(
            username="test_user",
            email="test@example.com",
            full_name="Test User",
            hashed_password=pwd_context.hash("test_password"),
            age=30,
            weight=70,
            height=170,
            gender="M",
            activity_level="moderate",
            goal="weight_loss",
            dietary_preferences=["vegetarian"],
            allergies=[]
        )

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(token_data.username)
    if user is None:
        raise credentials_exception
    return user

# ML Model for Meal Recommendations
def get_meal_recommendations(user_preferences: dict) -> List[dict]:
    # Simple recommendation based on dietary preferences and nutritional needs
    recommendations = []
    filtered_foods = food_db

    # Filter by dietary preferences
    if "vegetarian" in user_preferences.get("dietary_preferences", []):
        filtered_foods = filtered_foods[~filtered_foods['name'].isin(['Chicken Curry', 'Fish Curry', 'Butter Chicken'])]

    # Calculate daily caloric needs (basic BMR * activity factor)
    bmr = 0
    if user_preferences["gender"] == "M":
        bmr = 88.362 + (13.397 * user_preferences["weight"]) + (4.799 * user_preferences["height"]) - (5.677 * user_preferences["age"])
    else:
        bmr = 447.593 + (9.247 * user_preferences["weight"]) + (3.098 * user_preferences["height"]) - (4.330 * user_preferences["age"])

    activity_factors = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9
    }
    
    daily_calories = bmr * activity_factors.get(user_preferences["activity_level"], 1.2)

    # Adjust calories based on goal
    if user_preferences["goal"] == "weight_loss":
        daily_calories *= 0.8
    elif user_preferences["goal"] == "weight_gain":
        daily_calories *= 1.2

    # Get meals that fit within caloric needs
    breakfast_options = filtered_foods[filtered_foods['category'] == 'Breakfast']
    lunch_options = filtered_foods[filtered_foods['category'].isin(['Main Course', 'One Pot'])]
    dinner_options = filtered_foods[filtered_foods['category'].isin(['Main Course', 'One Pot'])]
    snack_options = filtered_foods[filtered_foods['category'] == 'Snacks']

    # Select meals based on caloric distribution
    breakfast_calories = daily_calories * 0.25
    lunch_calories = daily_calories * 0.35
    dinner_calories = daily_calories * 0.3
    snack_calories = daily_calories * 0.1

    recommendations.extend([
        breakfast_options.iloc[0].to_dict(),  # Breakfast
        lunch_options.iloc[0].to_dict(),      # Lunch
        snack_options.iloc[0].to_dict(),      # Snack
        dinner_options.iloc[0].to_dict()      # Dinner
    ])

    return recommendations

# API Endpoints
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.post("/meal-recommendations")
async def get_recommendations(current_user: User = Depends(get_current_user)):
    user_preferences = {
        "age": current_user.age,
        "weight": current_user.weight,
        "height": current_user.height,
        "gender": current_user.gender,
        "activity_level": current_user.activity_level,
        "goal": current_user.goal,
        "dietary_preferences": current_user.dietary_preferences,
        "allergies": current_user.allergies
    }
    recommendations = get_meal_recommendations(user_preferences)
    return recommendations

@app.post("/log-meal")
async def log_meal(meal: MealLog, current_user: User = Depends(get_current_user)):
    # In a real application, this would save to a database
    return {"status": "success", "message": "Meal logged successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 