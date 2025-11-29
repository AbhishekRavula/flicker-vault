import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@tanstack/react-query';
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../services/movieService';
import MovieList from '../components/MovieList';
import {useAppTheme} from '../hooks/useAppTheme';
import {useTranslation} from 'react-i18next';
import {getImageUrl} from '../utils/commonUtils';
import {MoviePosterSize} from '../constants/enums';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Movie, RootStackParamList} from '../constants/types';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList>;

const {height} = Dimensions.get('window');

const HomeScreen = ({navigation}: ProfileScreenProps) => {
  const {theme} = useAppTheme();
  const {t} = useTranslation();

  const popularMovies = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => fetchPopularMovies(),
  });

  const nowPlayingMovies = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: () => fetchNowPlayingMovies(),
  });

  const topRatedMovies = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: () => fetchTopRatedMovies(),
  });

  const upcomingMovies = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: () => fetchUpcomingMovies(),
  });

  const trendingMovies = useQuery({
    queryKey: ['trendingMovies'],
    queryFn: fetchTrendingMovies,
  });

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
      <ScrollView>
        <Pressable
          style={styles.wallPosterContainer}
          onPress={onWallPosterPress}>
          {wallPosterMovie && (
            <FastImage
              source={{
                uri: getImageUrl(
                  MoviePosterSize.w780,
                  wallPosterMovie.poster_path,
                ),
              }}
              style={styles.wallPoster}
              resizeMode={FastImage.resizeMode.stretch}
            />
          )}
        </Pressable>
        <MovieList
          title={t('Popular')}
          movies={popularMovies.data?.results || []}
        />
        <MovieList
          title={t('Now Playing')}
          movies={nowPlayingMovies.data?.results || []}
        />
        <MovieList
          title={t('Upcoming')}
          movies={upcomingMovies.data?.results || []}
        />
        <MovieList
          title={t('Top Rated')}
          movies={topRatedMovies.data?.results || []}
        />
      </ScrollView>
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
    height: height * 0.6, // 60% of screen height
    marginBottom: 10,
  },

  wallPoster: {
    ...StyleSheet.absoluteFillObject,
  },
});
