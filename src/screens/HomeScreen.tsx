import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MovieCard from '../components/MovieCard';
import {Text} from 'react-native-paper';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchPopularMovies} from '../services/movieService';

export interface Movie {
  id: string;
  title: string;
  poster_path: string;
}

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const {height} = Dimensions.get('window');

const HomeScreen = () => {
  console.log('HomeScreen');

  const {
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    promise,
    ...result
  } = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: ({pageParam}: {pageParam: number}) =>
      fetchPopularMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextCursor,
  });

  // console.log('result', result);
  // console.log('result data', result.data?.pages[0].results);

  const movies = result.data?.pages[0].results || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wallPosterContainer}>
        <FastImage
          source={{
            uri: 'https://image.tmdb.org/t/p/w780/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
          }}
          style={styles.wallPoster}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.gradient} />
      </View>
      <MovieList title="Popular" movies={movies} />
    </SafeAreaView>
  );
};

const MovieList: React.FC<MovieListProps> = ({title, movies}) => (
  <View style={styles.listContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      data={movies}
      renderItem={({item}) => <MovieCard movie={item} />}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  </View>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  wallPosterContainer: {
    height: height * 0.7, // Adjust this value to change the wall poster height
    width: '100%',
  },
  listContainer: {
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#fff',
  },
  wallPoster: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // Add a dark overlay to improve text visibility
  },
});
