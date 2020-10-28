jest.mock("../triviaAPI.ts");
jest.mock("../programmingQuizAPI.ts");
import { getTriviaApiQuestions } from "../triviaAPI";
import { getProgrammingQuizApiQuestions } from "../programmingQuizAPI";
import * as functions from "../functions";
import { picsUrls } from "../../constants/picsUrls";
import { assertObjectProperty } from "../../utils/test-utils";
import { QuizType, APISendable } from "../../models/PublicQuizQuestion";

test("getPropertyName function", () => {
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

describe("capitaliseInput function", () => {
  test("capitalise a lowercase", () => {
    const expected = "Andrea";
    const received = functions.capitaliseInput("andrea");
    expect(received).toMatch(expected);
  });

  test("return the input unaltered if word is already uppercase", () => {
    expect(functions.capitaliseInput("Franco")).toMatch("Franco");
  });
});

test("checkMinimumInputLength function", () => {
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

// API

describe("API questions getting", () => {
  test("it triggers right function for trivia", async () => {
    (getTriviaApiQuestions as jest.Mock).mockResolvedValueOnce([
      {
        category: "Art",
        type: "multiple",
        difficulty: "medium",
        question:
          "Which artist&rsquo;s studio was known as &#039;The Factory&#039;?",
        correct_answer: "Andy Warhol",
        incorrect_answers: ["Roy Lichtenstein", "David Hockney", "Peter Blake"]
      },
      {
        category: "Art",
        type: "multiple",
        difficulty: "medium",
        question: "What nationality was the surrealist painter Salvador Dali?",
        correct_answer: "Spanish",
        incorrect_answers: ["Italian", "French", "Portuguese"]
      }
    ]);
    const configs = {
      difficulty: "medium",
      numOfQuestions: 6,
      quizType: QuizType.TRIVIA,
      subject: "Art"
    };
    await functions.getQuestions(configs as APISendable);
    expect(getTriviaApiQuestions).toHaveBeenCalledTimes(1);
    expect(getTriviaApiQuestions).toHaveBeenCalledWith(6, "Art", "medium");
  });

  test("it triggers right function for programming", async () => {
    (getProgrammingQuizApiQuestions as jest.Mock).mockResolvedValueOnce([
      {
        id: 9,
        question: "#!/bin/bash is commonly called as",
        description: null,
        answers: {
          answer_a: "shebang",
          answer_b: "hashbang",
          answer_c: "Script Initialiser",
          answer_d: "None of the Above",
          answer_e: null,
          answer_f: null
        },
        multiple_correct_answers: "false",
        correct_answers: {
          answer_a_correct: "true",
          answer_b_correct: "false",
          answer_c_correct: "false",
          answer_d_correct: "false",
          answer_e_correct: "false",
          answer_f_correct: "false"
        },
        correct_answer: "answer_a",
        explanation: null,
        tip: null,
        tags: [
          {
            name: "Linux"
          },
          {
            name: "BASH"
          }
        ],
        category: "bash",
        difficulty: "Easy"
      },
      {
        id: 644,
        question:
          "How can you set the default rwx permission to all users on every file which is created in the current shell?",
        description: null,
        answers: {
          answer_a: "umask  0777",
          answer_b: "chmod  777",
          answer_c: "chown  777",
          answer_d: "umask  0666",
          answer_e: null,
          answer_f: null
        },
        multiple_correct_answers: "false",
        correct_answers: {
          answer_a_correct: "true",
          answer_b_correct: "false",
          answer_c_correct: "false",
          answer_d_correct: "false",
          answer_e_correct: "false",
          answer_f_correct: "false"
        },
        correct_answer: "answer_a",
        explanation: null,
        tip: null,
        tags: [
          {
            name: "BASH"
          }
        ],
        category: "bash",
        difficulty: "Easy"
      }
    ]);
    const configs = {
      difficulty: "any",
      numOfQuestions: 2,
      quizType: QuizType.PROGRAMMING,
      subject: "bash"
    };
    await functions.getQuestions(configs as APISendable);
    expect(getProgrammingQuizApiQuestions).toHaveBeenCalledTimes(1);
    expect(getProgrammingQuizApiQuestions).toHaveBeenCalledWith(
      2,
      "bash",
      "any"
    );
  });
});

describe("API questions formatting functions", () => {
  test("formatProgrammingQuestion fuction", () => {
    const rawProgrammingQuestions = [
      {
        id: 264,
        question: "Is it a good practice to edit the WordPress core files?",
        description: null,
        answers: {
          answer_a:
            "No, because your changes will be lost during the next WordPress update",
          answer_b:
            "Yes, you can change the core files without any further compilations",
          answer_c: null,
          answer_d: null,
          answer_e: null,
          answer_f: null
        },
        multiple_correct_answers: "false",
        correct_answers: {
          answer_a_correct: "true",
          answer_b_correct: "false",
          answer_c_correct: "false",
          answer_d_correct: "false",
          answer_e_correct: "false",
          answer_f_correct: "false"
        },
        correct_answer: "answer_a",
        explanation: null,
        tip: null,
        tags: [
          {
            name: "WordPress"
          }
        ],
        category: "CMS",
        difficulty: "Medium"
      }
    ];
    const formatted = functions.formatProgrammingQuestion(
      rawProgrammingQuestions[0] as any
    );
    const expected = {
      question: "Is it a good practice to edit the WordPress core files?",
      difficulty: "medium",
      subject: "CMS",
      allReplies: [
        "No, because your changes will be lost during the next WordPress update",
        "Yes, you can change the core files without any further compilations",
        null,
        null,
        null,
        null
      ],
      rightReply:
        "No, because your changes will be lost during the next WordPress update",
      explanation: null
    };

    expect(formatted).toEqual(expected);
  });

  test("formatTrivia function", () => {
    const formatted = functions.formatTrivia({
      category: "Animals",
      type: "multiple",
      difficulty: "medium",
      question: "What color/colour is a polar bear&#039;s skin?",
      correct_answer: "Black",
      incorrect_answers: ["White", "Pink", "Green"]
    });

    const checkFormattedFor = assertObjectProperty(formatted);
    checkFormattedFor("question")(
      "What color/colour is a polar bear&#039;s skin?"
    );
    checkFormattedFor("rightReply")("Black");
    checkFormattedFor("difficulty")("medium");
    checkFormattedFor("subject")("Animals");
  });
});
