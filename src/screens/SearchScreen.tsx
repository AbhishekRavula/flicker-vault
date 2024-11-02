import React, {useState, useCallback} from 'react';
import {View, FlatList, StyleSheet, Dimensions, Pressable} from 'react-native';
import {Searchbar, ActivityIndicator, Text} from 'react-native-paper';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchSearchMovies} from '../services/movieService';
import FastImage from 'react-native-fast-image';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {debounce, getImageUrl} from '../utils/commonUtils';
import {useAppTheme} from '../hooks/useAppTheme';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {MoviePosterSize} from '../constants/enums';
import {Movie, RootStackParamList, TabParamList} from '../constants/types';

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

const {width} = Dimensions.get('window');
// Number of columns in the grid
const COLUMN_COUNT = 3;

// Spacing between cards
const SPACING = 10;

// The width of each card
const CARD_WIDTH = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;

// The height of the card (1.5 times its width for a 2:3 aspect ratio)
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const SearchScreen = ({navigation}: ProfileScreenProps) => {
  const {theme} = useAppTheme();
  const {t} = useTranslation();

  const [debouncedSearchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['searchMovies', debouncedSearchQuery],
    queryFn: ({pageParam = 1}) => {
      return fetchSearchMovies(debouncedSearchQuery, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    enabled: debouncedSearchQuery.length > 0,
  });

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 500),
    [],
  );

  const handleSearch = (text: string) => {
    debouncedSearch(text);
    setSearchInput(text);
  };

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }, [isFetchingNextPage]);

  const renderEmptyState = useCallback(() => {
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
          <Text>{t('Error loading movies. Please try again.')}</Text>
        </View>
      );
    }

    if (debouncedSearchQuery.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text>{t('Search for your favorite movies')}</Text>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Text>{t('No movies found')}</Text>
      </View>
    );
  }, [debouncedSearchQuery, isLoading]);

  const navigateToMovieDetails = (movie: Movie) => {
    navigation.navigate('Details', {movie});
  };

  const allMovies = (data?.pages.flatMap(page => page.results) ??
    []) as Movie[];

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.surface}]}>
      <Searchbar
        placeholder={t('Search for a title...')}
        placeholderTextColor={theme.colors.primary}
        onChangeText={handleSearch}
        value={searchInput}
        style={styles.searchbar}
        iconColor={theme.colors.primary}
        inputStyle={{color: theme.colors.onSurface}}
        traileringIcon={'magnify'}
        traileringIconColor={theme.colors.primary}
        icon={() => {}} // To remove the left search icon
      />
      <FlatList
        data={allMovies}
        renderItem={({item}) => (
          <Pressable onPress={() => navigateToMovieDetails(item)} key={item.id}>
            <FastImage
              style={[styles.cardWrapper]}
              source={{
                uri: getImageUrl(MoviePosterSize.w342, item.poster_path),
                priority: 'high',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Pressable>
        )}
        keyExtractor={item => item.id}
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
