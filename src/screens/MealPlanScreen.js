import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const MealPlanScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Meal Plan</Title>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Breakfast</Title>
          <Paragraph>No meal planned</Paragraph>
          <Button mode="contained" style={styles.button}>Add Breakfast</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Lunch</Title>
          <Paragraph>No meal planned</Paragraph>
          <Button mode="contained" style={styles.button}>Add Lunch</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Dinner</Title>
          <Paragraph>No meal planned</Paragraph>
          <Button mode="contained" style={styles.button}>Add Dinner</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Snacks</Title>
          <Paragraph>No snacks planned</Paragraph>
          <Button mode="contained" style={styles.button}>Add Snack</Button>
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
  button: {
    marginTop: 10,
  },
});

export default MealPlanScreen; 