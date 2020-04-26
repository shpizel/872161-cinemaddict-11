import {getRandomChoice, getRandomNumber} from "../components/utils";
import {posters} from "./posters";
import {descriptions} from "./descriptions";
import {getRandomComments} from "./comments";

const [MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES] = [1, 5];
const [MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT] = [0, 5];

export const getRandomFilm = () => ({
  title: `Пролетая над гнездом кукушки`,
  originalTitle: `Proletaya nad gnezdom kukushki`,
  minAge: getRandomNumber(12, 18),
  poster: getRandomChoice(posters),
  description: getRandomChoice(descriptions, getRandomNumber(MIN_DESCRIPTION_SENTENCES, MAX_DESCRIPTION_SENTENCES)).join(` `),
  comments: getRandomComments(getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)),
  rating: getRandomNumber(1, 100) / 10,
  year: getRandomNumber(2000, 2020),
  duration: `${getRandomNumber(1, 3)}h ${getRandomNumber(1, 59)}m`,
  genres: getRandomChoice([`thriller`, `comedy`, `Melodrama`, `Drama`], getRandomNumber(1, 4)),
  writers: getRandomChoice([`Ivanov`, `Petrov`, `Sidorov`], getRandomNumber(1, 3)),
  actors: getRandomChoice([`Ivanov`, `Petrov`, `Sidorov`], getRandomNumber(1, 3)),
  country: getRandomChoice([`Russia`, `USA`, `EU`]),
  director: getRandomChoice([`Spilberg`, `Cameron`, `Mikhalkov`])
});
