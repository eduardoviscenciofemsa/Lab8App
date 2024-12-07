import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import {BatteryLevel} from '../../components';

import {styles} from './HomeScreen.styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Native Modules</Text>
      <View style={styles.content}>
        <BatteryLevel />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
