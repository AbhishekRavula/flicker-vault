import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {Divider, Icon, Text} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {useGenres} from '../contexts/GenreContext';
import {useAppTheme} from '../hooks/useAppTheme';
import {useFavoriteMovies} from '../hooks/useFavoriteMovies';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({route, navigation}: Props) => {
  const {theme} = useAppTheme();
  const genres = useGenres();
  const {isFavorite, saveFavoriteMovieId, removeFavoriteMovieId} =
    useFavoriteMovies();

  const movie = route.params.movie;
  const isFavoriteMovie = isFavorite(movie.id);

  useEffect(() => {
    navigation.setOptions({title: movie.title});
  }, [navigation, movie]);

  const handleFavorite = () => {
    if (isFavoriteMovie) {
      removeFavoriteMovieId(movie.id);
    } else {
      saveFavoriteMovieId(movie.id);
    }
  };

  const movieGenreIds =
    movie.genre_ids || movie.genres?.map(genre => genre.id) || [];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: theme.colors.surface},
      ]}>
      <View style={styles.wallPosterContainer}>
        <FastImage
          source={{
            uri: `https://image.tmdb.org/t/p/w780/${movie.poster_path}.jpg`,
          }}
          style={styles.wallPoster}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.titleAndFavoriteContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <TouchableOpacity onPress={handleFavorite}>
            <Icon
              source={isFavoriteMovie ? 'heart' : 'heart-outline'}
              size={24}
              color={theme.colors.onSurface}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsSubTextContainer}>
          <Text style={styles.detailsSubText}>{movie.release_date}</Text>
          <Divider style={styles.divider} />
          <Text style={styles.detailsSubText}>
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </Text>
          <Divider style={styles.divider} />
          {movieGenreIds.map((id, index) => {
            const genreName = genres[id];
            return genreName ? (
              <React.Fragment key={id}>
                <Text style={styles.detailsSubText} numberOfLines={1}>
                  {genreName}
                </Text>
                {index !== movieGenreIds.length - 1 && (
                  <Divider style={styles.divider} />
                )}
              </React.Fragment>
            ) : null;
          })}
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  wallPosterContainer: {
    flex: 0.4,
  },
  wallPoster: {
    ...StyleSheet.absoluteFillObject,
  },
  detailsContainer: {
    flex: 0.6,
    paddingHorizontal: 10,
    gap: 10,
  },
  detailsSubTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailsSubText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#969696',
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: '#969696',
    marginHorizontal: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    flexShrink: 1,
    maxWidth: '90%',
    flexWrap: 'wrap',
  },
  titleAndFavoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overview: {
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'justify',
  },
});
