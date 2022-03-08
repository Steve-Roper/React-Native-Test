import React from 'react';
import {Screen} from './Screen';
import {observer} from 'mobx-react-lite';
import {Picker, Button} from '@react-native-picker/picker';
import {useContext} from 'react/cjs/react.development';
import {StoreContext} from '../App';

export const Home = observer(({navigation}) => {
  const store = useContext(StoreContext);
  if (store.activeUser === null) {
    return <Screen />;
  }
  return (
    <Screen>
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
      <Button title="Go to feed" onPress={() => navigation.navigate('Feed')} />
    </Screen>
  );
});
