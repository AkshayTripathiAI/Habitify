# Habitify

A habit-tracking mobile app built with React Native (Expo), React Navigation and Redux Toolkit. Add habits, check them off each day, build streaks, and keep your data between restarts.

| Home | Manage Habits |
| --- | --- |
| <img src="screenshots/HomeScreen.png" alt="Home screen" width="240"> | <img src="screenshots/HabitList.png" alt="Habit list screen" width="240"> |

(The screenshots show an earlier version of the UI.)

## Features

- **Daily check-off**: tap the circle next to a habit to mark it done for today (tap again to undo).
- **Streaks**: each habit shows its current streak of consecutive days and a 7-day history strip. A streak only breaks once a full day is missed.
- **Today summary**: the home screen shows "x / y habits done" with a progress bar and your best current streak.
- **Add, edit and delete** habits. Edit works inline: tap Edit, change the name, then Save or Cancel.
- **Persistence**: the Redux store is saved with `redux-persist` to `@react-native-async-storage/async-storage` (localStorage on web), so habits and history survive app restarts.
- Starts with three sample habits (Exercise, Read, Meditate) on first launch.

## Tech stack

- React Native 0.73 with Expo SDK 50 (native `android/` and `ios/` projects included)
- React Navigation 6 (stack navigator)
- Redux Toolkit (`createSlice`), React Redux hooks, redux-persist + AsyncStorage
- React Native Web (for the browser build)

## Getting started

Prerequisites: Node.js 18+, npm, and either Android Studio (Android emulator/device) or Xcode (iOS, macOS only).

```bash
git clone https://github.com/AkshayTripathiAI/Habitify.git
cd Habitify
npm install
```

AsyncStorage is a native module, so rebuild the native app once after pulling this version (`npm run android` / `npm run ios`).

| Command | Description |
| --- | --- |
| `npm run android` | Build and run on an Android emulator/device (`expo run:android`) |
| `npm run ios` | Build and run on the iOS simulator (`expo run:ios`) |
| `npm start` | Start the Metro dev server for an installed development build (`expo start --dev-client`) |
| `npm run web` | Run in the browser via React Native Web |
| `npm run export:web` | Static web build into `dist/` |

The web target uses the Metro bundler (`expo.web.bundler` in `app.json`). To host the static build under a sub-path such as GitHub Pages (`/Habitify`), add `"experiments": { "baseUrl": "/Habitify" }` to `app.json` before exporting. Note: Expo SDK 50's CLI fails on Windows with Node 22+ (`ENOENT ... externals\node:sea`); use Node 18 or 20 there.

## Project structure

```
App.js                         # Redux Provider + PersistGate + stack navigator
index.js                       # Expo entry point
src/
├── screens/
│   ├── HomeScreen.js          # Quote, today's progress, best streak
│   └── HabitManagementScreen.js
├── component/
│   ├── HabitList.jsx          # Check-off, streak, 7-day history, inline edit, delete
│   └── AddHabitModal.jsx      # Add-habit input
├── Redux/
│   ├── habitsSlice.js         # Reducers, actions and selectors (Redux Toolkit)
│   └── store.js               # configureStore + redux-persist (AsyncStorage)
└── utils/
    └── dates.js               # Local date keys, streak and history helpers
android/, ios/                 # Native projects
```

### Data model

```js
{ id, name, createdAt, completions: ['2026-11-05', '2026-11-06', ...] }
```

Completions are stored as local calendar days, and streaks are derived from them, so nothing has to be recalculated or migrated when the day changes.

## License

[MIT](LICENSE)
