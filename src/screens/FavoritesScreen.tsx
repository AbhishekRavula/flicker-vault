import React from 'react';
import {View, StyleSheet, FlatList, Dimensions, Pressable} from 'react-native';
import {useAppTheme} from '../hooks/useAppTheme';
import {Text, IconButton, Menu, ActivityIndicator} from 'react-native-paper';
import {useFavoriteMovies} from '../hooks/useFavoriteMovies';
import {useInfiniteQuery} from '@tanstack/react-query';
import FastImage from 'react-native-fast-image';
import {fetchMovieDetailsById} from '../services/movieService';
import {Movie} from './HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

const {width} = Dimensions.get('window');
const CARD_WIDTH = width - 32; // 16px padding on each side
const POSTER_WIDTH = CARD_WIDTH * 0.2;
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

const MovieCard = ({movie, onRemove}: {movie: Movie; onRemove: () => void}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const {theme} = useAppTheme();
  const navigation = useNavigation<DetailScreenNavigationProp>();

  const navigateToMovieDetails = () => {
    navigation.navigate('Details', {movie});
  };

  return (
    <Pressable style={styles.card} onPress={navigateToMovieDetails}>
      <FastImage
        style={styles.poster}
        source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.movieInfo}>
        <Text
          style={[styles.title, {color: theme.colors.onSurface}]}
          numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.movieYear}>
          {new Date(movie.release_date).getFullYear()}
        </Text>
      </View>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton
            icon="dots-vertical"
            onPress={() => setMenuVisible(true)}
          />
        }>
        <Menu.Item
          onPress={() => {
            onRemove();
            setMenuVisible(false);
          }}
          title="Remove"
        />
      </Menu>
    </Pressable>
  );
};

const FavoritesScreen = () => {
  const {theme} = useAppTheme();
  const {favoriteMovieIds, removeFavoriteMovieId} = useFavoriteMovies();

  const {data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['favoriteMovies', favoriteMovieIds],
      queryFn: async ({pageParam = 0}) => {
        const start = pageParam * 20;
        const end = start + 20;
        const movieIds = favoriteMovieIds.slice(start, end);
        const movies = await Promise.all(
          movieIds.map(id => fetchMovieDetailsById(id.toString())),
        );
        return movies;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 20 ? allPages.length : undefined;
      },
      enabled: favoriteMovieIds.length > 0,
    });

  const handleRemove = (movieId: string) => {
    removeFavoriteMovieId(movieId.toString());
  };

  const renderItem = ({item}: {item: Movie}) => (
    <MovieCard movie={item} onRemove={() => handleRemove(item.id)} />
  );

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (favoriteMovieIds.length === 0) {
    return (
      <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
        <Text style={{textAlign: 'center'}}>No favorite movies yet.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <FlatList
        data={data?.pages.flat()}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 16,
    gap: 5,
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  movieYear: {
    fontSize: 14,
    fontWeight: '400',
    color: '#969696',
  },
});

export default FavoritesScreen;
