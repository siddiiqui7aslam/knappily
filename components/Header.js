import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, icons, SIZES} from '../constants';

const HEADER_HEIGHT = 60;

const Header = ({headerHeight}) => {
  return (
    <>
      <LinearGradient
        style={styles.gradientOverlay}
        colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.0)']}
      />
      <Animated.View style={[styles.headerContainer, {transform: [{translateY: headerHeight}]}]}>
        <View style={styles.leftIcons}>
          <Image style={styles.iconStyle} source={icons.menu_dots} />
          <Text style={styles.headerTitle}>All Knapps</Text>
        </View>
        <View style={styles.rightIcons}>
          <Image style={styles.iconStyle} source={icons.coffee} />
          <TouchableOpacity>
            <Image style={[styles.iconStyle, styles.marginHorizontal]} source={icons.uparrow} />
          </TouchableOpacity>
          <Image style={styles.iconStyle} source={icons.menu} />
          <Image style={[styles.iconStyle, styles.marginLeft]} source={icons.search} />
        </View>
      </Animated.View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    zIndex: 2,
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  marginLeft: {
    marginLeft: -10,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: SIZES.fontSize + SIZES.base,
    fontWeight: '600',
    marginLeft: 10,
  },
});
