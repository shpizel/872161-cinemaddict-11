import {getRandomNumber} from "../utils/common";

const Grades = {
  GRADE_NONE: ``,
  GRADE_NOVICE: `novice`,
  GRADE_FAN: `fan`,
  GRADE_MOVIE_BUFF: `movie buff`
};

export const getGradeByFilmsWatched = (filmsWhatched) => {
  let grade = Grades.GRADE_NONE;
  if (filmsWhatched >= 1 && filmsWhatched <= 10) {
    grade = Grades.GRADE_NOVICE;
  } else if (filmsWhatched >= 11 && filmsWhatched <= 20) {
    grade = Grades.GRADE_FAN;
  } else if (filmsWhatched >= 21) {
    grade = Grades.GRADE_MOVIE_BUFF;
  }
  return grade;
};

export const getRandomProfile = () => ({
  avatar: `images/bitmap@2x.png`,
  grade: getGradeByFilmsWatched(getRandomNumber(0, 100))
});
