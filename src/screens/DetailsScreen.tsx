import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {Divider, Text} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {useGenres} from '../contexts/GenreContext';
import {useAppTheme} from '../hooks/useAppTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({route, navigation}: Props) => {
  const {theme} = useAppTheme();
  const genres = useGenres();

  const movie = route.params.movie;

  useEffect(() => {
    navigation.setOptions({title: movie.title});
  }, [navigation, movie]);

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
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.detailsSubTextContainer}>
          <Text style={styles.detailsSubText}>{movie.release_date}</Text>
          <Divider style={styles.divider} />
          <Text style={styles.detailsSubText}>
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </Text>
          <Divider style={styles.divider} />
          {movie.genre_ids.map((id, index) => {
            const genreName = genres[id];
            return genreName ? (
              <React.Fragment key={id}>
                <Text style={styles.detailsSubText} numberOfLines={1}>
                  {genreName}
                </Text>
                {index !== movie.genre_ids.length - 1 && (
                  <Divider style={styles.divider} />
                )}
              </React.Fragment>
            ) : null;
          })}
        </View>

        <Text style={{fontWeight: '400', fontSize: 13, textAlign: 'justify'}}>
          {movie.overview}
        </Text>
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
  },
});
