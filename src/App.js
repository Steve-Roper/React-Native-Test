/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './Screens/Home';
import {Profile} from './Screens/Profile';
import {Feed} from './Screens/Feed';
import {UserStore, User, StoreProvider} from './UserStore/UserStore';

const Stack = createNativeStackNavigator();

const userStore = new UserStore([new User('Steve'), new User('Jane')]);
const App: () => Node = () => {
  return (
    <StoreProvider store={userStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}></Stack.Screen>
          <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
          <Stack.Screen name="Feed" component={Feed}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
