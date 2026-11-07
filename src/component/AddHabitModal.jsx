import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addHabit } from '../Redux/habitsSlice';

const AddHabitModal = () => {
  const dispatch = useDispatch();
  const [habitName, setHabitName] = useState('');

  const handleAddHabit = () => {
    if (habitName.trim() !== '') {
      dispatch(addHabit(habitName));
      setHabitName('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={habitName}
        onChangeText={setHabitName}
        onSubmitEditing={handleAddHabit}
        placeholder="Enter new habit"
        returnKeyType="done"
        accessibilityLabel="New habit name"
      />
      <Button title="Add Habit" onPress={handleAddHabit} disabled={!habitName.trim()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#98a2b3',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddHabitModal;
