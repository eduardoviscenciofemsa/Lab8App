import React, {useEffect, useCallback, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

import {styles} from './BatteryLevel.styles';

type PropsT = {
  level: number;
  error: string | null;
};

const BatteryLevel = ({level, error}: PropsT) => {
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
      <Animated.View
        style={[
          styles.charge,
          {
            width: chargeWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
      {!error ? (
        <Text style={styles.levelText}>{level}%</Text>
      ) : (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

export default BatteryLevel;
