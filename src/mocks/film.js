import {getRandomChoice, getRandomNumber} from "../utils/common";
import {getRandomComments} from "./comments";
import {
  ACTOR_NAMES, COUNTRIES,
  FILM_DESCRIPTIONS, FILM_DIRECTOR_NAMES,
  FILM_GENRES,
  FILM_NAMES,
  FILM_POSTER_IMAGES,
  WRITER_NAMES
} from "./consts";

const [MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES] = [1, 5];
const [MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT] = [0, 5];

export const getRandomFilm = () => {
  const filmName = getRandomChoice(FILM_NAMES);
  return {
    title: filmName,
    originalTitle: filmName,
    minAge: getRandomNumber(12, 18),
    poster: getRandomChoice(FILM_POSTER_IMAGES),
    description: getRandomChoice(FILM_DESCRIPTIONS, getRandomNumber(MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES)).join(` `),
    comments: getRandomComments(getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)),
    rating: getRandomNumber(1, 100) / 10,
    year: getRandomNumber(2000, 2020),
    duration: `${getRandomNumber(1, 3)}h ${getRandomNumber(1, 59)}m`,
    genres: getRandomChoice(FILM_GENRES, getRandomNumber(1, 4)),
    writers: getRandomChoice(WRITER_NAMES, getRandomNumber(1, 3)),
    actors: getRandomChoice(ACTOR_NAMES, getRandomNumber(1, 3)),
    country: getRandomChoice(COUNTRIES),
    director: getRandomChoice(FILM_DIRECTOR_NAMES),
    isAddedToWatchlist: getRandomChoice([true, false]),
    isMarkedAsWatched: getRandomChoice([true, false]),
    isMarkedAsFavorite: getRandomChoice([true, false]),
  };
};
