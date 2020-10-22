jest.mock("../triviaAPI");
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
  const result1 = functions.createScoreComment(1, 15);
  const result2 = functions.createScoreComment(1, 10);
  const result3 = functions.createScoreComment(12, 20);
  const result4 = functions.createScoreComment(15, 20);
  const result5 = functions.createScoreComment(13, 20);
  const result6 = functions.createScoreComment(16, 20);
  const result7 = functions.createScoreComment(17, 20);
  const result8 = functions.createScoreComment(19, 20);
  expect(result).toMatch(/😭 You can do better!/);
  expect(result1).toMatch(/😭 You can do better!/);
  expect(result2).toMatch(/😭 You can do better!/);
  expect(result3).toMatch(/🥺 Not too bad/);
  expect(result4).toMatch(/😀 Good!/);
  expect(result5).toMatch(/🥺 Not too bad/);
  expect(result6).toMatch(/😀 Good!/);
  expect(result7).toMatch(/😍 Great!/);
  expect(result8).toMatch(/🥳 Perfect!!/);
});

test("extractNumberFromBreakpoint function", () => {
  expect(functions.extractNumberFromBreakpoint("300px")).toBe(300);
  expect(functions.extractNumberFromBreakpoint("3px")).toBe(3);
  expect(functions.extractNumberFromBreakpoint("12px")).toBe(12);
});

test("modifyObjectProperty function", () => {
  const user = { name: "andrea", age: 30, address: "unknown" };
  const result1 = functions.modifyObjectProperty(user)("age")(38);
  expect(result1).toEqual({ ...user, age: 38 });
  const result2 = functions.modifyObjectProperty(user)("address")("Brno");
  expect(result2).toEqual({ ...user, address: "Brno" });
});

test("getValueWhichIsNot function", () => {
  const result1 = functions.getValueWhichIsNot(["A", "B", "C"], "B");
  const result2 = functions.getValueWhichIsNot(["A", "B", "C"], "A");
  const result3 = functions.getValueWhichIsNot(["A", "B", "C"], "C");
  expect(result1).toBe("A");
  expect(result2).toBe("B");
  expect(result3).toBe("A");
});
