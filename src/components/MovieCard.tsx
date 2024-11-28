import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useLayoutEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getImageUrl} from '../utils/commonUtils';
import {MoviePosterSize} from '../constants/enums';
import {Movie, RootStackParamList} from '../constants/types';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface MovieCardProps {
  movie: Movie;
}

const {width} = Dimensions.get('window');
// Number of columns in the grid
const COLUMN_COUNT = 3;

// Spacing between cards
const SPACING = 10;

// The width of each card
const CARD_WIDTH = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;

// The height of the card (1.5 times its width for a 2:3 aspect ratio)
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const navigateToMovieDetails = () => {
    navigation.navigate('Details', {movie});
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={navigateToMovieDetails}>
        <FastImage
          style={styles.cardWrapper}
          source={{uri: getImageUrl(MoviePosterSize.w500, movie.poster_path)}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
  },
  poster: {
    borderRadius: 8,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: SPACING / 2,
    borderRadius: 8,
  },
});

export default MovieCard;
