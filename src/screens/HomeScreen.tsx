import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@tanstack/react-query';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
} from '../services/movieService';
import MovieList from '../components/MovieList';
import {useAppTheme} from '../hooks/useAppTheme';
import {useTranslation} from 'react-i18next';
import {getImageUrl} from '../utils/commonUtils';
import {MoviePosterSize} from '../constants/enums';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Movie, RootStackParamList} from '../constants/types';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList>;

const HomeScreen = ({navigation}: ProfileScreenProps) => {
  const {theme} = useAppTheme();
  const {t} = useTranslation();

  const popularMovies = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => fetchPopularMovies(),
  });

  const trendingMovies = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: fetchTrendingMovies,
  });

  const moviesList = popularMovies.data?.results || [];
  const wallPosterMovie = trendingMovies.data?.results?.[0] as
    | Movie
    | undefined;

  const onWallPosterPress = () => {
    if (wallPosterMovie)
      navigation.navigate('Details', {movie: wallPosterMovie});
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <Pressable style={styles.wallPosterContainer} onPress={onWallPosterPress}>
        {wallPosterMovie && (
          <FastImage
            source={{
              uri: getImageUrl(
                MoviePosterSize.w780,
                wallPosterMovie.poster_path,
              ),
            }}
            style={styles.wallPoster}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}
      </Pressable>
      <MovieList title={t('Popular')} movies={moviesList} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wallPosterContainer: {
    width: '100%',
    flex: 0.7,
    marginBottom: 10,
  },

  wallPoster: {
    ...StyleSheet.absoluteFillObject,
  },
});
