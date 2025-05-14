import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';

const MainAppScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome to NutriTrack</Title>
      <View style={styles.content}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('Track Meal')}>
          Track Meal
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('View Progress')}>
          View Progress
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('View Recommendations')}>
          Get Recommendations
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
  },
});

export default MainAppScreen; 