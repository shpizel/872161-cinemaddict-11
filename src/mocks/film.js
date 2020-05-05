import {getRandomChoice, getRandomNumber} from "../utils/common";
import {getRandomComments} from "./comments";
import {DescriptionList} from "../utils/consts";

const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const [MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES] = [1, 5];
const [MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT] = [0, 5];

export const getRandomFilm = () => ({
  title: `Пролетая над гнездом кукушки`,
  originalTitle: `Proletaya nad gnezdom kukushki`,
  minAge: getRandomNumber(12, 18),
  poster: getRandomChoice(Posters),
  description: getRandomChoice(DescriptionList, getRandomNumber(MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES)).join(` `),
  comments: getRandomComments(getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)),
  rating: getRandomNumber(1, 100) / 10,
  year: getRandomNumber(2000, 2020),
  duration: `${getRandomNumber(1, 3)}h ${getRandomNumber(1, 59)}m`,
  genres: getRandomChoice([`thriller`, `comedy`, `Melodrama`, `Drama`], getRandomNumber(1, 4)),
  writers: getRandomChoice([`Ivanov`, `Petrov`, `Sidorov`], getRandomNumber(1, 3)),
  actors: getRandomChoice([`Ivanov`, `Petrov`, `Sidorov`], getRandomNumber(1, 3)),
  country: getRandomChoice([`Russia`, `USA`, `EU`]),
  director: getRandomChoice([`Spilberg`, `Cameron`, `Mikhalkov`]),
  isAddedToWatchlist: getRandomChoice([true, false]),
  isMarkedAsWatched: getRandomChoice([true, false]),
  isMarkedAsFavorite: getRandomChoice([true, false]),
});
