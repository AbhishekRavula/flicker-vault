import {FlatList, StyleSheet, View} from 'react-native';
import {Movie} from '../screens/HomeScreen';
import {Text, useTheme} from 'react-native-paper';
import MovieCard from './MovieCard';

interface MovieListProps {
  title: string;
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({title, movies}) => {
  const theme = useTheme();

  return (
    <View style={styles.listContainer}>
      <Text style={[styles.sectionTitle, {color: theme.colors.onSurface}]}>
        {title}
      </Text>
      <FlatList
        data={movies}
        renderItem={({item}) => <MovieCard movie={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 10,
    flex: 0.3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 10,
  },
});
