import {getGradeByFilmsWatched} from "../components/grades";
import {getRandomNumber} from "../components/utils";

export const getRandomProfile = () => ({
  avatar: `images/bitmap@2x.png`,
  grade: getGradeByFilmsWatched(getRandomNumber(0, 100))
});
