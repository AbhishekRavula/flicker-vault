import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Movie} from '../screens/HomeScreen';
import {useLayoutEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  const [viewHeight, setViewHeight] = useState(0);

  const targetRef = useRef<View>(null);
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  useLayoutEffect(() => {
    targetRef.current?.measure((x, y, width, height) => {
      setViewHeight(height);
    });
  }, []);

  const navigateToMovieDetails = () => {
    navigation.navigate('Details', {movie});
  };

  return (
    <View style={styles.cardContainer} ref={targetRef}>
      <Pressable onPress={navigateToMovieDetails}>
        <FastImage
          style={[
            styles.poster,
            {width: viewHeight * (2 / 3), height: viewHeight},
          ]}
          source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
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
});

export default MovieCard;
