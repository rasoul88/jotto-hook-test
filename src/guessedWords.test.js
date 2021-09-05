import React from "react";
import { shallow } from "enzyme";
import { findByDataAttr, checkProps } from "./test/testUtils";
import GuessedWords from "./guessedWords";

const defaultProps = {
  guessedWords: [
    {
      guessedWord: "train",
      letterMatchCount: 3,
    },
  ],
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("does not throw warning with expected props", () => {
  checkProps(GuessedWords, defaultProps);
});

test("renders without error", () => {
  const wrapper = setup();
  const component = findByDataAttr(wrapper, "component-guessed-words");
  expect(component.length).toBe(1);
});

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test("renders instructions to guess a word", () => {
    const instructions = findByDataAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there are guessed words", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "trian", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  test("renders guessedWords section", () => {
    const guessedWordsNode = findByDataAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });

  test("Correct number of guessed words", () => {
    const guessedWordNodes = findByDataAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});
