import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteHabit,
  selectHabits,
  toggleCompletion,
  updateHabit,
} from '../Redux/habitsSlice';
import { currentStreak, recentHistory, todayKey } from '../utils/dates';

const HabitRow = ({ habit }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(habit.name);

  const doneToday = habit.completions.includes(todayKey());
  const streak = currentStreak(habit.completions);
  const history = recentHistory(habit.completions, 7);

  const startEdit = () => {
    setDraft(habit.name);
    setEditing(true);
  };

  const saveEdit = () => {
    if (draft.trim()) {
      dispatch(updateHabit({ id: habit.id, name: draft }));
      setEditing(false);
    }
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity
        accessibilityRole="checkbox"
        accessibilityState={{ checked: doneToday }}
        accessibilityLabel={`Mark ${habit.name} as done today`}
        onPress={() => dispatch(toggleCompletion(habit.id))}
        style={[styles.check, doneToday && styles.checkDone]}
      >
        {doneToday && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.body}>
        {editing ? (
          <TextInput
            style={styles.editInput}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={saveEdit}
            autoFocus
            returnKeyType="done"
            accessibilityLabel="Habit name"
          />
        ) : (
          <Text style={[styles.name, doneToday && styles.nameDone]}>{habit.name}</Text>
        )}
        <View style={styles.meta}>
          <Text style={styles.streak}>
            {streak > 0 ? `${streak}-day streak` : 'No streak yet'}
          </Text>
          <View style={styles.history}>
            {history.map((day) => (
              <View key={day.key} style={[styles.dot, day.done && styles.dotDone]} />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        {editing ? (
          <>
            <TouchableOpacity onPress={saveEdit}>
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditing(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={startEdit}>
              <Text style={styles.edit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(deleteHabit(habit.id))}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const HabitList = () => {
  const habits = useSelector(selectHabits);

  return (
    <FlatList
      data={habits}
      keyExtractor={(habit) => String(habit.id)}
      renderItem={({ item }) => <HabitRow habit={item} />}
      ListEmptyComponent={
        <Text style={styles.empty}>No habits yet. Add your first one below.</Text>
      }
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d0d5dd',
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#2e7d32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkDone: {
    backgroundColor: '#2e7d32',
  },
  checkMark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#1d2939',
  },
  nameDone: {
    color: '#667085',
    textDecorationLine: 'line-through',
  },
  editInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1565c0',
    paddingVertical: 2,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  streak: {
    fontSize: 12,
    color: '#667085',
    marginRight: 8,
  },
  history: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: '#e4e7ec',
  },
  dotDone: {
    backgroundColor: '#2e7d32',
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  edit: {
    color: '#1565c0',
    marginRight: 12,
  },
  save: {
    color: '#2e7d32',
    fontWeight: '600',
    marginRight: 12,
  },
  cancel: {
    color: '#667085',
  },
  delete: {
    color: '#c62828',
  },
  empty: {
    textAlign: 'center',
    color: '#667085',
    paddingVertical: 24,
  },
});

export default HabitList;
