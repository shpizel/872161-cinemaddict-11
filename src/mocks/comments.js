import {getRandomChoice, getRandomDate} from "../utils/common";
import {FILM_DESCRIPTIONS, EMOTIONS} from "./consts";

const getRandomComment = () => ({
  text: getRandomChoice(FILM_DESCRIPTIONS),
  emotion: getRandomChoice(EMOTIONS),
  author: getRandomChoice([`Igor`, `Vasya`, `Petya`, `Kolya`, `Lida`]),
  date: getRandomDate(),
});

export const getRandomComments = (count) => {
  let comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(getRandomComment());
  }
  return comments;
};
