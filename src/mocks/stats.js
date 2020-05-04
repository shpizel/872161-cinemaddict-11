export const generateStats = (films) => {
  const addedToWatchlist = films.filter((film) => Boolean(film.isAddedToWatchlist));
  const markedAsWatched = films.filter((film) => Boolean(film.isMarkedAsWatched));
  const markedAsFavorite = films.filter((film) => Boolean(film.isMarkedAsFavorite));

  return {
    watchlist: addedToWatchlist.length,
    history: markedAsWatched.length,
    favorites: markedAsFavorite.length,
  };
};
