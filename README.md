# Habitify

A small habit-tracking mobile app built with React Native (Expo), React Navigation and Redux.

Built as a practice project while learning React Native and Redux.

| Home | Manage Habits |
| --- | --- |
| <img src="screenshots/HomeScreen.png" alt="Home screen" width="240"> | <img src="screenshots/HabitList.png" alt="Habit list screen" width="240"> |

## Features

- Home screen with a motivational quote and a "Manage Habits" button.
- Habit management screen (stack navigation) listing habits, pre-filled with three sample habits.
- Add a new habit by name.
- Delete a habit.
- State is managed in a Redux store (created with Redux Toolkit's `configureStore`).

Limitations: habits are kept in memory only (there is no persistence, so changes are lost when the app restarts), and the "Edit" button is not implemented yet.

## Tech stack

- React Native 0.73 with Expo SDK 50 (native `android/` and `ios/` projects included)
- React Navigation 6 (stack navigator)
- Redux, React Redux, Redux Toolkit
- React Native Web (for `npm run web`)

## Getting started

Prerequisites: Node.js 18+, npm, and either Android Studio (Android emulator/device) or Xcode (iOS, macOS only).

```bash
git clone https://github.com/AkshayTripathiAI/Habitify.git
cd Habitify
npm install
```

Run it:

| Command | Description |
| --- | --- |
| `npm run android` | Build and run on an Android emulator/device (`expo run:android`) |
| `npm run ios` | Build and run on the iOS simulator (`expo run:ios`) |
| `npm start` | Start the Metro dev server for an installed development build (`expo start --dev-client`) |
| `npm run web` | Run in the browser via React Native Web |

## Project structure

```
App.js                         # Redux Provider + stack navigator
index.js                       # Expo entry point
src/
├── screens/
│   ├── HomeScreen.js
│   └── HabitManagementScreen.js
├── component/
│   ├── HabitList.jsx          # Habit list with Edit/Delete actions
│   ├── AddHabitModal.jsx      # Add-habit input
│   └── HabitItems.jsx         # Habit card (currently unused)
└── Redux/
    ├── store.js
    ├── actions/               # Action types and creators
    └── reducers/              # habitReducer, rootReducer
android/, ios/                 # Native projects
```

## License

[MIT](LICENSE)
