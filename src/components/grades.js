import {getRandomNumber} from "./utils";

export const [GRADE_NONE, GRADE_NOVICE, GRADE_FAN, GRADE_MOVIE_BUFF] = [``, `novice`, `fan`, `movie buff`];

export const getGradeByFilmsWatched = (filmsWhatched = getRandomNumber(0, 100)) => {
  let grade = GRADE_NONE;
  if (filmsWhatched <= 0) {
    grade = GRADE_NONE;
  } else if (filmsWhatched >= 1 && filmsWhatched <= 10) {
    grade = GRADE_NOVICE;
  } else if (filmsWhatched >= 11 && filmsWhatched <= 20) {
    grade = GRADE_FAN;
  } else if (filmsWhatched >= 21) {
    grade = GRADE_MOVIE_BUFF;
  }

  return grade;
};
