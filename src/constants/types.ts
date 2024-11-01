export type RootStackParamList = {
  Main: undefined;
  Details: {movie: Movie};
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: Array<number>;
  genres?: Array<{
    id: string;
    name: string;
  }>;
}
