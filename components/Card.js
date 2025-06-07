import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {icons, SIZES, COLORS} from '../constants';

const Card = ({
  item,
  index,
  currentIndex,
  isSwipe,
  swipedcard,
  swipe,
  ...dragHandlers
}) => {
  const navigation = useNavigation();

  return (
    <Animated.View
      {...dragHandlers}
      style={[
        styles.cardContainer,
        isSwipe
          ? swipedcard.getLayout()
          : currentIndex === index
          ? swipe.getLayout()
          : null,
      ]}>
      <Image
        style={styles.cardImage}
        source={{uri: item.Img}}
      />
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPressOut={() => navigation.navigate('Detail', item)}>
              <Text style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.bookmarkIcon}
            source={icons.bookmark}
          />
        </View>

        <Text style={styles.descriptionText}>{item.content}</Text>

        <View style={styles.footerRow}>
          <Text style={styles.categoryText}>Sports</Text>
          <Text style={styles.dateText}>Aug 9, 2021</Text>
        </View>

        <View style={styles.shareButton}>
          <Image
            source={icons.shareblack}
            style={styles.shareIcon}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white2,
    position: 'absolute',
    height: SIZES.height,
    width: SIZES.width,
  },
  cardImage: {
    height: SIZES.height * 0.55,
    width: SIZES.width,
    borderWidth: 1,
    resizeMode: 'cover',
  },
  cardContent: {
    paddingHorizontal: SIZES.padding,
    flex: 1,
    flexDirection: 'column',
  },
  titleRow: {
    paddingVertical: SIZES.padding / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 20,
  },
  bookmarkIcon: {
    height: 40,
    width: 30,
    tintColor: COLORS.primary,
    marginTop: -10,
  },
  descriptionText: {
    fontSize: SIZES.fontSize,
    fontWeight: '400',
    color: 'gray',
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontWeight: '600',
    color: COLORS.primary,
    fontSize: SIZES.fontSize,
  },
  dateText: {
    marginRight: 50,
    color: 'gray',
    fontSize: SIZES.fontSize,
  },
  shareButton: {
    position: 'absolute',
    bottom: 20,
    right: SIZES.padding,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    elevation: 10,
  },
  shareIcon: {
    height: 25,
    width: 25,
    tintColor: 'white',
  },
});
