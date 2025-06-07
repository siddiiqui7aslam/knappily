import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const INDICATOR_WIDTH = 60;

const Indicator = ({scrollX}) => {
  const inputRange = Array.from({length: 6}, (_, i) => i * SIZES.width);
  const outputRange = inputRange.map((_, i) => i * (INDICATOR_WIDTH + SIZES.base));

  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          transform: [
            {
              translateX: scrollX.interpolate({
                inputRange,
                outputRange,
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}
    />
  );
};

export default Indicator;

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: 0,
    borderBottomWidth: 5,
    borderBottomColor: COLORS.primary,
    width: INDICATOR_WIDTH,
    marginLeft: SIZES.base,
  },
});
