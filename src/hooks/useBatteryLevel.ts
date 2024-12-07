import {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

import {BatteryModuleType} from '../typings/BatteryModule.type';

const {BatteryModule, EventEmitterModule} = NativeModules;

const eventEmitter = new NativeEventEmitter(EventEmitterModule);
const batteryEventEmitter = new NativeEventEmitter(BatteryModule);

type ParamsT = {
  warningThreshold?: number;
};

export const useBatteryLevel = ({warningThreshold = 10}: ParamsT = {}) => {
  const [batteryLevel, setBatteryLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<boolean>(false);

  // Get the initial battery level
  useEffect(() => {
    (BatteryModule as BatteryModuleType)
      // .getBatteryLevel()
      .getBatteryLevelAsync() // For thread method
      .then(level => {
        if (level < 0) {
          return;
        }

        setWarning(level <= warningThreshold);

        setBatteryLevel(level);
      })
      .catch(err => setError(err.toString()));
  }, [warningThreshold]);

  // Listen the generic event
  useEffect(() => {
    const eventListener = eventEmitter.addListener('onCustomEvent', event => {
      console.log(event.message);
    });

    EventEmitterModule.sendEventToJavaScript();

    return () => {
      eventListener.remove();
    };
  }, []);

  // Listen the battery level event
  useEffect(() => {
    const eventListener = batteryEventEmitter.addListener(
      'batteryLevelChanged',
      value => {
        /* The value in iOS simulator is -100. We log it to see if the event is triggered correctly
        from the native module.*/
        console.log('value:', value);

        if (value < 0) {
          return;
        }

        setWarning(value <= warningThreshold);

        setBatteryLevel(value);
      },
    );

    return () => {
      eventListener.remove();
    };
  }, [warningThreshold]);

  return {batteryLevel, error, warning};
};
