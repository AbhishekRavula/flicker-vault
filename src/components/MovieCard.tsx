import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Movie} from '../screens/HomeScreen';

interface MovieCardProps {
  movie: Movie;
}

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.33; // value to change card width
const CARD_HEIGHT = CARD_WIDTH * 1.5; // 2:3 aspect ratio for posters

const MovieCard: React.FC<MovieCardProps> = ({movie}) => (
  <View style={styles.cardContainer}>
    <FastImage
      style={styles.poster}
      source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
      resizeMode={FastImage.resizeMode.cover}
    />
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginHorizontal: 5,
  },
  poster: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
  },
});

export default MovieCard;
