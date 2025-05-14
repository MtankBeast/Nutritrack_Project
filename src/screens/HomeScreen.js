import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Welcome to NutriTrack</Title>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Today's Summary</Title>
          <Paragraph>Calories: 0 / 2000 kcal</Paragraph>
          <Paragraph>Protein: 0 / 60g</Paragraph>
          <Paragraph>Carbs: 0 / 250g</Paragraph>
          <Paragraph>Fat: 0 / 70g</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Meal Plan</Title>
          <Paragraph>No meals planned for today</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Recent Activity</Title>
          <Paragraph>Start tracking your meals to see your activity</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  card: {
    margin: 10,
    elevation: 4,
  },
});

export default HomeScreen; 