import React, {useEffect, useState} from 'react';
import {NativeModules, SafeAreaView, Text, View} from 'react-native';

import {BatteryModuleType} from '../../typings/BatteryModule.type';

import {styles} from './HomeScreen.styles';
import {BatteryLevel} from '../../components';

const {BatteryModule} = NativeModules;

const HomeScreen = () => {
  const [batteryLevel, setBatteryLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (BatteryModule as BatteryModuleType)
      .getBatteryLevel()
      .then(setBatteryLevel)
      .catch(err => setError(err.toString()));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Native Modules</Text>
      <View style={styles.content}>
        <BatteryLevel level={batteryLevel} error={error} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
