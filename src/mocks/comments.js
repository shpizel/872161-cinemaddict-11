import {getRandomChoice, getRandomNumber} from "../utils/common";
import {DescriptionList} from "../utils/consts";

const EmotionsList = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const getRandomComment = () => ({
  text: getRandomChoice(DescriptionList),
  emotion: getRandomChoice(EmotionsList),
  author: getRandomChoice([`A`, `B`, `C`]),
  date: `${getRandomNumber(1, 3)} hours ago`,
});

export const getRandomComments = (count) => {
  let comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(getRandomComment());
  }

  return comments;
};
