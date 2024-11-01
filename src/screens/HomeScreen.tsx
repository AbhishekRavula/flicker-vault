import {SafeAreaView, StyleSheet, View} from 'react-native';
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

const HomeScreen = () => {
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
  const wallPosterImage = trendingMovies.data?.results?.[0]?.poster_path || '';

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <View style={styles.wallPosterContainer}>
        <FastImage
          source={{uri: getImageUrl(MoviePosterSize.w780, wallPosterImage)}}
          style={styles.wallPoster}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
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
