import {SafeAreaView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
} from '../services/movieService';
import MovieList from '../components/MovieList';

export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: Array<number>;
}

const HomeScreen = () => {
  const theme = useTheme();

  const popularMovies = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => fetchPopularMovies(),
  });

  const trendingMovies = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: fetchTrendingMovies,
  });

  const moviesList = popularMovies.data?.results || [];
  const wallPosterImage =
    trendingMovies.data?.results?.[0]?.backdrop_path || '';

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <View style={styles.wallPosterContainer}>
        <FastImage
          source={{
            uri: `https://image.tmdb.org/t/p/w1280/${wallPosterImage}.jpg`,
          }}
          style={styles.wallPoster}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <MovieList title="Popular" movies={moviesList} />
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
