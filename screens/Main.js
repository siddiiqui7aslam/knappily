import React, { useRef, useState } from 'react';
import { StyleSheet, Easing, Animated, PanResponder } from 'react-native';
import Card from '../components/Card';
import { data } from '../constants/data';
import Header from '../components/Header';
import { SIZES } from '../constants';

const Main = () => {
  const swipe = useRef(new Animated.ValueXY()).current;
  const swipedcard = useRef(new Animated.ValueXY({ x: 0, y: -SIZES.height })).current;
  const headerHeight = useRef(new Animated.Value(0)).current;
  const [headerHide, setHeaderHide] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dummyData] = useState(data);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderRelease: (e, gesture) => {
      // Use threshold instead of exact zero
      if (Math.abs(gesture.dy) < 5) {
        if (headerHide) {
          Animated.timing(headerHeight, {
            toValue: -60,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(() => setHeaderHide(false));
        } else {
          Animated.timing(headerHeight, {
            toValue: 0,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(() => setHeaderHide(true));
        }
      }

      // Swipe card down to previous card
      if (currentIndex > 0 && gesture.dy > 50 && gesture.vy > 0.2) {
        Animated.timing(swipedcard, {
          toValue: { x: 0, y: 0 },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(prevIndex => prevIndex - 1);
          swipedcard.setValue({ x: 0, y: -SIZES.height });
        });
      }
      // Swipe card up to next card
      else if (-gesture.dy > 50 && -gesture.vy > 0.2 && currentIndex < data.length - 1) {
        Animated.timing(swipe, {
          toValue: { x: 0, y: -SIZES.height },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(prevIndex => prevIndex + 1);
          swipe.setValue({ x: 0, y: 0 });
        });
      } else {
        // Reset positions if swipe not significant
        Animated.parallel([
          Animated.spring(swipe, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }),
          Animated.spring(swipedcard, {
            toValue: { x: 0, y: -SIZES.height },
            useNativeDriver: false,
          }),
        ]).start();
      }
    },

    onPanResponderMove: (e, gesture) => {
      if (gesture.dy > 0 && currentIndex > 0) {
        swipedcard.setValue({ x: 0, y: -SIZES.height + gesture.dy });
      } else if (gesture.dy < 0 && currentIndex < data.length - 1) {
        swipe.setValue({ x: 0, y: gesture.dy });
      }
    },
  });

  return (
    <Animated.View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <Header headerHeight={headerHeight} />

      {dummyData
        .map((item, index) => {
          if (index === currentIndex - 1) {
            // Previous card visible below current, swipable down
            return (
              <Card
                key={index}
                index={index}
                item={item}
                currentIndex={currentIndex}
                isSwipe={true}
                swipedcard={swipedcard}
                swipe={swipe}
                {...panResponder.panHandlers}
              />
            );
          } else if (index < currentIndex) {
            // Cards already swiped away, don't render
            return null;
          }

          // Current or future cards get panHandlers only if current
          const dragHandlers = currentIndex === index ? panResponder.panHandlers : {};

          return (
            <Card
              key={index}
              index={index}
              item={item}
              currentIndex={currentIndex}
              swipedcard={swipedcard}
              swipe={swipe}
              {...dragHandlers}
            />
          );
        })
        .reverse()}
    </Animated.View>
  );
};

export default Main;

const styles = StyleSheet.create({});
