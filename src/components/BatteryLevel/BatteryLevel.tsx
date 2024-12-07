import React, {useEffect, useCallback, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

import {useBatteryLevel} from '../../hooks/useBatteryLevel';

import {styles} from './BatteryLevel.styles';

const BatteryLevel = () => {
  const {
    batteryLevel: level,
    error,
    warning,
  } = useBatteryLevel({
    warningThreshold: 20,
  });

  const chargeWidth = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    Animated.timing(chargeWidth, {
      toValue: level,
      duration: 1000,
      delay: 100,
      useNativeDriver: false,
    }).start();
  }, [chargeWidth, level]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <View style={styles.container}>
      <View style={styles.outContainer} />
      {!error ? (
        <>
          <Animated.View
            style={[
              styles.charge,
              warning && styles.warningCharge,
              {
                width: chargeWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          <Text style={styles.levelText}>{level}%</Text>
        </>
      ) : (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

export default BatteryLevel;
