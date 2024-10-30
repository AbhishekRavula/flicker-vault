import React, {useState, useCallback} from 'react';
import {View, FlatList, StyleSheet, Dimensions, Pressable} from 'react-native';
import {
  useTheme,
  Searchbar,
  ActivityIndicator,
  Text,
  Icon,
} from 'react-native-paper';
import {useInfiniteQuery} from '@tanstack/react-query';
// import debounce from 'lodash/debounce';
import MovieCard from '../components/MovieCard';
import {fetchSearchMovies} from '../services/movieService';
import MovieList from '../components/MovieList';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const COLUMN_COUNT = 3;
const SPACING = 10;
const CARD_WIDTH = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const SearchScreen = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['searchMovies', searchQuery],
    queryFn: ({pageParam = 1}) => fetchSearchMovies(searchQuery, pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
    enabled: searchQuery.length > 0,
  });

  const navigation = useNavigation<any>();

  // Debounced search handler
  // const debouncedSearch = useCallback(
  //   debounce((text: string) => {
  //     setSearchQuery(text);
  //   }, 500),
  //   [],
  // );

  const handleSearch = (text: string) => {
    // debouncedSearch(text);
    setSearchQuery(text);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  };

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.centerContainer}>
          <Text>Error loading movies. Please try again.</Text>
        </View>
      );
    }

    if (searchQuery.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text>Search for your favorite movies</Text>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text>No movies found</Text>
      </View>
    );
  };

  const navigateToMovieDetails = (movie: any) => {
    navigation.navigate('Details', {movie});
  };

  const allMovies = data?.pages.flatMap(page => page.results) ?? [];

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <Searchbar
        placeholder="Search for a title..."
        onChangeText={text => {
          setSearchInput(text);
          handleSearch(text);
        }}
        value={searchInput}
        style={styles.searchbar}
        iconColor={theme.colors.primary}
        inputStyle={{color: theme.colors.onSurface}}
        traileringIcon={'magnify'}
        traileringIconColor={theme.colors.primary}
        icon={() => {}}
      />
      <FlatList
        data={allMovies}
        renderItem={({item}) => (
          <Pressable onPress={() => navigateToMovieDetails(item)}>
            <FastImage
              key={item.id}
              style={[styles.cardWrapper]}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 16,
    marginTop: 0,
    elevation: 0,
  },
  listContent: {
    padding: SPACING,
    paddingTop: 0,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: SPACING / 2,
    borderRadius: 8,
  },
  loaderContainer: {
    paddingVertical: SPACING * 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING * 2,
  },
});

export default SearchScreen;
