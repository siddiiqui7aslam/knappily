import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Easing,
} from 'react-native';
import { COLORS, icons, SIZES } from '../constants';

const HEADER_HEIGHT = 70;

const FilterModal = ({ isVisible, onClose }) => {
  const [showFilterMode, setShowFilterMode] = useState(isVisible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  // Sync internal state with prop change
  useEffect(() => {
    if (isVisible) {
      setShowFilterMode(true);
    } else {
      // Trigger closing animation
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => setShowFilterMode(false));
    }
  }, [isVisible]);

  // Animate scale when modal is shown
  useEffect(() => {
    if (showFilterMode) {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [showFilterMode]);

  const handleClose = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setShowFilterMode(false);
      onClose && onClose();
    });
  };

  if (!showFilterMode) return null;

  return (
    <Modal animationType="fade" transparent={true} visible={showFilterMode}>
      <View
        style={{
          height: SIZES.height * 0.8,
          marginTop: HEADER_HEIGHT,
          backgroundColor: COLORS.transparentBlack5,
        }}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.fullScreenOverlay} />
        </TouchableWithoutFeedback>

        <Animated.View style={styles.menuContainer}>
          {[
            { text: 'Reference', icon: icons.menu },
            { text: 'Next Knapp', icon: icons.uparrow },
            { text: 'Bookmark', icon: icons.bookmark },
            { text: 'Text to speech', icon: icons.sound },
            { text: 'Share', icon: icons.shareblack },
          ].map(({ text, icon }, idx) => (
            <Animated.View key={idx} style={styles.rowView}>
              <Animated.Text
                style={[styles.textStyle, { transform: [{ scale: scaleValue }] }]}
              >
                {text}
              </Animated.Text>
              <Animated.View
                style={[styles.iconView, { transform: [{ scale: scaleValue }] }]}
              >
                <Image style={styles.iconStyle} source={icon} />
              </Animated.View>
            </Animated.View>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuContainer: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    alignItems: 'flex-end',
  },
  iconView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginBottom: 15,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: { width: 25, height: 25, tintColor: COLORS.primary },
  textStyle: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
