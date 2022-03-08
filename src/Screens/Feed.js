import React from 'react';
import type {Node} from 'react';
import {Screen} from './Screen';
import {View, StyleSheet} from 'react-native';

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

export const Feed: () => Node = ({}) => {
  items = [
    Math.floor(Math.random() * 15),
    Math.floor(Math.random() * 15),
    Math.floor(Math.random() * 15),
  ];
  return (
    <Screen>
      {items.map(item => (
        <Section key={item} title={fullNbaEast[item]}>
          {fullNbaEast[item]}
        </Section>
      ))}
    </Screen>
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
});
