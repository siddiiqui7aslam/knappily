import React, { useRef, useEffect } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, data, FONTS, SIZES } from '../constants';

const HEADER_HEIGHT = 70;

const Details = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Clamps the animated value so header slides up and down smoothly
  const headerTranslateY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const renderHeader = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.headerScroll}>
        {data
          .filter(item => item.selected)
          .map(item => (
            <View
              key={item.id.toString()}
              style={styles.headerItem}>
              <Text style={styles.headerText}>{item.title}</Text>
            </View>
          ))}
      </ScrollView>
    );
  };

  useEffect(() => {
    // Optional: animate header to initial position on mount (smooth effect)
    Animated.timing(headerTranslateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [headerTranslateY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: headerTranslateY.interpolate({
                  inputRange: [0, HEADER_HEIGHT],
                  outputRange: [0, -HEADER_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        {renderHeader()}
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 20 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}>
        {/* Replace below with your main content */}
        <View style={{ height: 1000, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: COLORS.white }}>
            Scroll me to see header animation
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    position: 'absolute',
    height: HEADER_HEIGHT,
    width: SIZES.width,
    zIndex: 1,
    backgroundColor: COLORS.black,
  },
  headerScroll: {
    paddingTop: 8,
  },
  headerItem: {
    height: 30,
    marginTop: 8,
    marginLeft: 10,
  },
  headerText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
