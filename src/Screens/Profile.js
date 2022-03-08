import React from 'react';
import type {Node} from 'react';
import {Screen} from './Screen';
import {StyleSheet} from 'react-native';

export const Profile: () => Node = ({}) => {
  //add global user state here for image selection
  return (
    <Screen>
      <View style={styles.profileImageContainer}>
        <Image source={require('../../img/steve.jpg')} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
  },
});
