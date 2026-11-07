import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HabitList from '../component/HabitList';
import AddHabitModal from '../component/AddHabitModal';

const HabitManagementScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Habit Management</Text>
    <Text style={styles.hint}>Tap the circle to mark a habit done for today.</Text>
    <HabitList />
    <AddHabitModal />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  hint: {
    textAlign: 'center',
    color: '#667085',
    marginBottom: 12,
  },
});

export default HabitManagementScreen;
