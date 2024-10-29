import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import './i18n';
import {useTranslation} from 'react-i18next';
import {toggleLanguage} from './src/utils/languaueUtils';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchPopularMovies} from './src/services/movieService';
import FastImage from 'react-native-fast-image';

// Define the structure of a movie object
interface Movie {
  id: string;
  title: string;
  poster_path: string;
}

// Props for the MovieCard component
interface MovieCardProps {
  movie: Movie;
}

// Props for the MovieList component
interface MovieListProps {
  title: string;
  movies: Movie[];
}

const {width, height} = Dimensions.get('window');
const CARD_WIDTH = width * 0.33; // Adjust this value to change card width
const CARD_HEIGHT = CARD_WIDTH * 1.5; // Maintain a 2:3 aspect ratio for posters

const MovieCard: React.FC<MovieCardProps> = ({movie}) => (
  <View style={styles.cardContainer}>
    <FastImage
      style={styles.poster}
      source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
      resizeMode={FastImage.resizeMode.cover}
    />
  </View>
);

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

function App(): React.JSX.Element {
  const {t} = useTranslation();

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  wallPosterContainer: {
    height: height * 0.7, // Adjust this value to change the wall poster height
    width: '100%',
  },
  wallPoster: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // Add a dark overlay to improve text visibility
  },
  listContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 5,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginHorizontal: 5,
  },
  poster: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
});

export default App;
