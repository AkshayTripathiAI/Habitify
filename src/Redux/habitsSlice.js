import { createSlice, nanoid } from '@reduxjs/toolkit';
import { currentStreak, todayKey } from '../utils/dates';

const newHabit = (name) => ({
  id: nanoid(),
  name,
  createdAt: new Date().toISOString(),
  completions: [], // list of "YYYY-MM-DD" days on which the habit was done
});

const initialState = {
  habits: [newHabit('Exercise'), newHabit('Read'), newHabit('Meditate')],
};

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: {
      reducer(state, action) {
        state.habits.push(action.payload);
      },
      prepare(name) {
        return { payload: newHabit(name.trim()) };
      },
    },
    updateHabit(state, action) {
      const { id, name } = action.payload;
      const habit = state.habits.find((h) => h.id === id);
      if (habit && name.trim()) habit.name = name.trim();
    },
    deleteHabit(state, action) {
      state.habits = state.habits.filter((h) => h.id !== action.payload);
    },
    toggleCompletion: {
      reducer(state, action) {
        const { id, date } = action.payload;
        const habit = state.habits.find((h) => h.id === id);
        if (!habit) return;
        habit.completions = habit.completions.includes(date)
          ? habit.completions.filter((d) => d !== date)
          : [...habit.completions, date].sort();
      },
      prepare(id, date = todayKey()) {
        return { payload: { id, date } };
      },
    },
  },
});

export const { addHabit, updateHabit, deleteHabit, toggleCompletion } = habitsSlice.actions;

// Selectors
export const selectHabits = (state) => state.habits.habits;

export const selectTodayProgress = (state) => {
  const habits = selectHabits(state);
  const today = todayKey();
  const done = habits.filter((h) => h.completions.includes(today)).length;
  return { done, total: habits.length };
};

export const selectBestStreak = (state) =>
  selectHabits(state).reduce((best, h) => Math.max(best, currentStreak(h.completions)), 0);

export default habitsSlice.reducer;
