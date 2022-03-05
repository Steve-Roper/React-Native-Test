/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {makeAutoObservable} from 'mobx';
import {observer} from 'mobx-react-lite';
import {Picker} from '@react-native-picker/picker';
import {useContext} from 'react/cjs/react.development';

const Stack = createNativeStackNavigator();

export class User {
  id = Math.random();
  name = '';
  image = './img/steve.jpg';

  constructor(name) {
    makeAutoObservable(this);
    this.name = name;
  }
}

export class UserStore {
  activeUser = null;
  users = [];

  constructor(users) {
    makeAutoObservable(this);
    this.users = users;
    this.activeUser = users[0];
  }

  changeActiveUser(user) {
    this.activeUser = user;
  }
}

const StoreContext = React.createContext();

export const StoreProvider: () => Node = ({children, store}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const UserStoreView = observer(({navigation, userStore}) => {
  return (
    userStore &&
    userStore.users && (
      <View>
        <Picker
          selectedValue={userStore.activeUser}
          onValueChange={user => userStore.changeActiveUser(user)}>
          {userStore.users.map(user => (
            <Picker.Item key={user.id} value={user} label={user.name} />
          ))}
        </Picker>
        {userStore.activeUser && (
          <View>
            <Button
              title="Go to profile page"
              onPress={() =>
                navigation.navigate('Profile', {
                  name: userStore.activeUser.name,
                })
              }
            />
            <Button
              title="Go to feed"
              onPress={() => navigation.navigate('Feed')}
            />
          </View>
        )}
      </View>
    )
  );
});

const Home: () => Node = ({navigation, isDarkMode = true}) => {
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const store = useContext(StoreContext);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <UserStoreView navigation={navigation} userStore={store} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Profile: () => Node = ({navigation, isDarkMode = true}) => {
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Image source={require('./img/steve.jpg')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Feed: () => Node = ({navigation, isDarkMode = true}) => {
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}></ScrollView>
    </SafeAreaView>
  );
};

const userStore = new UserStore([new User('Steve'), new User('Jane')]);
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  profileImageContainer: {
    alignItems: 'center',
  },
});

export default App;
