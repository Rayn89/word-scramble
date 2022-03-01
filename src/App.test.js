import { render, screen } from '@testing-library/react';
import scrambler from "./scrambler"

test('Make sure scrambler works with string length 3.', () => {
  const word = "Hey"
  expect(scrambler(word)).toEqual("Hey");
});

test("Make sure scrambler works with string length 1 or 2.", () => {
  const word = "Hi";
  expect(scrambler(word)).toEqual("Hi");
});

test("Make sure scrambler does not change first or last letters if length > 3.", () => {
  const word = "Hello";
  let returnWord = scrambler(word)
  expect(returnWord[0]).toEqual("H");
  expect(returnWord[returnWord.length - 1]).toEqual("o");
});
