import { getLetterMatchCount } from "./index";

describe("getLetterMatchCount", () => {
  const secretWord = "party";

  test("returns correct count when there are no matching letter", () => {
    const guessedWord = "bones";
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    expect(letterMatchCount).toBe(0);
  });

  test("returns correct count when there are 3 matching letter", () => {
    const guessedWord = "train";
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    expect(letterMatchCount).toBe(3);
  });

  test("returns correct count when there are duplicate letters in the guessed word", () => {
    const guessedWord = "parka";
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    expect(letterMatchCount).toBe(3);
  });
});
