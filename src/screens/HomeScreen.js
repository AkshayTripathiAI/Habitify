import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectBestStreak, selectTodayProgress } from '../Redux/habitsSlice';

const HomeScreen = ({ navigation }) => {
  const { done, total } = useSelector(selectTodayProgress);
  const bestStreak = useSelector(selectBestStreak);
  const progress = total > 0 ? done / total : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>"The secret of getting ahead is getting started."</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today</Text>
        <Text style={styles.cardValue}>
          {done} / {total} habits done
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <Text style={styles.cardHint}>
          {bestStreak > 0 ? `Best current streak: ${bestStreak} day${bestStreak === 1 ? '' : 's'}` : 'Start a streak today'}
        </Text>
      </View>

      <Button title="Manage Habits" onPress={() => navigation.navigate('HabitManagement')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quote: {
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    maxWidth: 420,
    width: '100%',
    backgroundColor: '#f2f4f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 13,
    color: '#667085',
    textTransform: 'uppercase',
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 6,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e4e7ec',
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    backgroundColor: '#2e7d32',
  },
  cardHint: {
    marginTop: 8,
    color: '#475467',
  },
});

export default HomeScreen;
