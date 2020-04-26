import {getRandomChoice, getRandomNumber} from "../components/utils";
import {descriptions} from "./descriptions";

const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const getRandomComment = () => ({
  text: getRandomChoice(descriptions),
  emotion: getRandomChoice(emotions),
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
