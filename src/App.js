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
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {action, makeAutoObservable, makeObservable, observable} from 'mobx';
import {observer} from 'mobx-react-lite';
import {Picker} from '@react-native-picker/picker';
import {useContext} from 'react/cjs/react.development';

const Stack = createNativeStackNavigator();

export class User {
  id = Math.random();
  name = '';

  constructor(name) {
    makeAutoObservable(this);
    this.name = name;
  }
}

export class UserStore {
  activeUser = null;
  users = [];

  constructor(users) {
    makeObservable(this, {
      activeUser: observable,
      users: observable,
      changeActiveUser: action,
    });
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

const Home = observer(({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const store = useContext(StoreContext);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {store.activeUser && (
          <View>
            <Picker
              selectedValue={store.activeUser}
              onValueChange={user => store.changeActiveUser(user)}>
              {store.users.map(user => (
                <Picker.Item key={user.id} value={user} label={user.name} />
              ))}
            </Picker>
            <Button
              title={'Go to profile page: ' + store.activeUser.name}
              onPress={() => navigation.navigate('Profile')}
            />
            <Button
              title="Go to feed"
              onPress={() => navigation.navigate('Feed')}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
});

const Profile: () => Node = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.profileImageContainer}>
          <Image source={require('../img/steve.jpg')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Feed: () => Node = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  items = [
    Math.floor(Math.random() * 15),
    Math.floor(Math.random() * 15),
    Math.floor(Math.random() * 15),
  ];
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {items.map(item => (
          <Section key={item} title={fullNbaEast[item]}>
            {fullNbaEast[item]}
          </Section>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const userStore = new UserStore([new User('Steve'), new User('Jane')]);
const fullNbaEast = [
  'Toronto Raptors',
  'Boston Celtics',
  'Brooklyn Nets',
  'Philadelphia 76ers',
  'New York Knicks',
  'Cleveland Cavaliers',
  'Chicago Bulls',
  'Milwaukee Bucks',
  'Indiana Pacers',
  'Detroit Pistons',
  'Atlanta Hawks',
  'Washington Wizards',
  'Miami Heat',
  'Charlotte Hornets',
  'Orlando Magic',
];
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
  profileImageContainer: {
    alignItems: 'center',
  },
});

export default App;
