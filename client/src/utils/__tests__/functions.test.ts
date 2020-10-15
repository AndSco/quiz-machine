import * as functions from "../functions";
import { picsUrls } from "../../constants/picsUrls";

test("the TS object key accessor works as it should", () => {
  const testObj = {
    name: "andrea",
    age: 39
  };
  const expected = testObj.age;
  const received = functions.getPropertyName(testObj, "age");
  expect(received).toBe(expected);

  const expected2 = testObj.name;
  const received2 = functions.getPropertyName(testObj, "name");
  expect(received2).toBe(expected2);
});

test("function to get the background for API quizzes", () => {
  const bgrounds = Object.values(picsUrls);
  bgrounds.map((bg, i) => expect(bg).toBe(bgrounds[i]));
});

describe("function to capitalise a word", () => {
  test("capitalise a lowercase", () => {
    const expected = "Andrea";
    const received = functions.capitaliseInput("andrea");
    expect(received).toMatch(expected);
  });

  test("return the input unaltered if word is already uppercase", () => {
    expect(functions.capitaliseInput("Franco")).toMatch("Franco");
  });

  test("function to check a minimum input length", () => {
    expect(functions.checkMinimumInputLength("test", 2)).toBe(true);
    expect(functions.checkMinimumInputLength("one", 6)).toBe(false);
    expect(functions.checkMinimumInputLength("one", 3)).toBe(true);
  });

  test("cropInput function", () => {
    expect(functions.cropInput("password", 3)).toMatch("pas");
    expect(functions.cropInput("veryLongWord withSpaces", 12)).toMatch(
      "veryLongWord"
    );
  });

  test("removeEntryFromArray function", () => {
    const stringArr = ["one", "two", "three"];
    const result = functions.removeEntryFromArray(stringArr, "one");
    expect(result.length).toBe(2);
    expect(result[0]).toMatch(/two/);
    expect(result).toEqual(["two", "three"]);

    const numArr = [1, 2, 3];
    const result2 = functions.removeEntryFromArray(numArr, 1);
    expect(result2.length).toBe(2);
    expect(result2[0]).toBe(2);
    expect(result2).toEqual([2, 3]);
  });

  test("createScoreComment function", () => {
    const result = functions.createScoreComment(5, 10);
    expect(result).toMatch(/😭 You can do better!/);
  });
});
