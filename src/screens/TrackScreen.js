import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, FAB } from 'react-native-paper';

const TrackScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Title style={styles.title}>Track Your Meals</Title>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Today's Meals</Title>
            <Paragraph>No meals tracked yet</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Nutrition Summary</Title>
            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <Title>0</Title>
                <Paragraph>Calories</Paragraph>
              </View>
              <View style={styles.nutritionItem}>
                <Title>0g</Title>
                <Paragraph>Protein</Paragraph>
              </View>
              <View style={styles.nutritionItem}>
                <Title>0g</Title>
                <Paragraph>Carbs</Paragraph>
              </View>
              <View style={styles.nutritionItem}>
                <Title>0g</Title>
                <Paragraph>Fat</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
        label="Track Meal"
      />
    </View>
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
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TrackScreen; 