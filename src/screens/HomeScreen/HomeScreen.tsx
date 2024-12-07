import React, {useEffect, useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import {BatteryModuleType} from '../../typings/BatteryModule.type';

import {styles} from './HomeScreen.styles';
import {BatteryLevel} from '../../components';

const {BatteryModule, EventEmitterModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(EventEmitterModule);

const HomeScreen = () => {
  const [batteryLevel, setBatteryLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // EventEmitterModule.sendEventToJavaScript();

    (BatteryModule as BatteryModuleType)
      // .getBatteryLevel()
      .performHeavyTask()
      .then(setBatteryLevel)
      .catch(err => setError(err.toString()));
  }, []);

  // useEffect(() => {
  //   const eventListener = eventEmitter.addListener('onCustomEvent', event => {
  //     console.log(event.message);
  //   });

  //   return () => {
  //     eventListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      'batteryLevelChanged',
      value => {
        setBatteryLevel(value);
      },
    );

    return () => {
      eventListener.remove();
    };
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
