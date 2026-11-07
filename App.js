import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import HomeScreen from './src/screens/HomeScreen';
import HabitManagementScreen from './src/screens/HabitManagementScreen';
import store, { persistor } from './src/Redux/store';

const Stack = createStackNavigator();

const Loading = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

const App = () => (
  <Provider store={store}>
    {/* Wait until saved habits are restored from storage before rendering. */}
    <PersistGate loading={<Loading />} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Habitify' }} />
          <Stack.Screen
            name="HabitManagement"
            component={HabitManagementScreen}
            options={{ title: 'Manage Habits' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
