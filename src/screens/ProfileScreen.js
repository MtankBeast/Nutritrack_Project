import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar, List } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={80} icon="account" />
        <Title style={styles.name}>User Name</Title>
        <Paragraph>user@example.com</Paragraph>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Personal Information</Title>
          <List.Item
            title="Height"
            description="Not set"
            left={props => <List.Icon {...props} icon="human-male-height" />}
          />
          <List.Item
            title="Weight"
            description="Not set"
            left={props => <List.Icon {...props} icon="weight" />}
          />
          <List.Item
            title="Age"
            description="Not set"
            left={props => <List.Icon {...props} icon="calendar" />}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Preferences</Title>
          <List.Item
            title="Diet Type"
            description="Not set"
            left={props => <List.Icon {...props} icon="food" />}
          />
          <List.Item
            title="Allergies"
            description="None"
            left={props => <List.Icon {...props} icon="alert-circle" />}
          />
          <List.Item
            title="Daily Goal"
            description="2000 kcal"
            left={props => <List.Icon {...props} icon="target" />}
          />
        </Card.Content>
      </Card>

      <Button 
        mode="contained" 
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    marginTop: 10,
    marginBottom: 5,
  },
  card: {
    margin: 10,
    elevation: 4,
  },
  button: {
    margin: 10,
  },
});

export default ProfileScreen; 