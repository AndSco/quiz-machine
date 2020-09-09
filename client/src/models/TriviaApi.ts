export interface TriviaResultType {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type TriviaApiResponse = TriviaResultType[];

export type Difficulty = "easy" | "medium" | "hard";

export const getCategoryId = (category: TriviaCategory) => {
  const categoryToUse = TriviaCategoriesDictionary.find(
    entry => entry.name === category
  );
  return categoryToUse?.id;
};

export type TriviaCategory =
  | "General Knowledge"
  | "Entertainment: Books"
  | "Entertainment: Film"
  | "Entertainment: Music"
  | "Entertainment: Musicals & Theatres"
  | "Entertainment: Television"
  | "Entertainment: Video Games"
  | "Entertainment: Board Games"
  | "Science & Nature"
  | "Science: Computers"
  | "Science: Mathematics"
  | "Mythology"
  | "Sports"
  | "Geography"
  | "History"
  | "Politics"
  | "Art"
  | "Celebrities"
  | "Animals"
  | "Vehicles"
  | "Entertainment: Comics"
  | "Science: Gadgets"
  | "Entertainment: Japanese Anime & Manga"
  | "Entertainment: Cartoon & Animations";

export const TriviaCategoriesDictionary = [
  {
    id: 9,
    name: "General Knowledge"
  },
  {
    id: 10,
    name: "Entertainment: Books"
  },
  {
    id: 11,
    name: "Entertainment: Film"
  },
  {
    id: 12,
    name: "Entertainment: Music"
  },
  {
    id: 13,
    name: "Entertainment: Musicals & Theatres"
  },
  {
    id: 14,
    name: "Entertainment: Television"
  },
  {
    id: 15,
    name: "Entertainment: Video Games"
  },
  {
    id: 16,
    name: "Entertainment: Board Games"
  },
  {
    id: 17,
    name: "Science & Nature"
  },
  {
    id: 18,
    name: "Science: Computers"
  },
  {
    id: 19,
    name: "Science: Mathematics"
  },
  {
    id: 20,
    name: "Mythology"
  },
  {
    id: 21,
    name: "Sports"
  },
  {
    id: 22,
    name: "Geography"
  },
  {
    id: 23,
    name: "History"
  },
  {
    id: 24,
    name: "Politics"
  },
  {
    id: 25,
    name: "Art"
  },
  {
    id: 26,
    name: "Celebrities"
  },
  {
    id: 27,
    name: "Animals"
  },
  {
    id: 28,
    name: "Vehicles"
  },
  {
    id: 29,
    name: "Entertainment: Comics"
  },
  {
    id: 30,
    name: "Science: Gadgets"
  },
  {
    id: 31,
    name: "Entertainment: Japanese Anime & Manga"
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations"
  }
];

// export enum TriviaCategory {
//   GENERAL = "General Knowledge",
//   BOOKS = "Entertainment: Books",
//   FILM = "Entertainment: Film",
//   MUSIC = "Entertainment: Music",
//   THEATRE = "Entertainment: Musicals & Theatres",
//   TV = "Entertainment: Television",
//   VIDEO_GAMES = "Entertainment: Video Games",
//   BOARD_GAMES = "Entertainment: Board Games",
//   SCIENCE_NATURE = "Science & Nature",
//   COMPUTER_SCIENCE = "Science: Computers",
//   MATH = "Science: Mathematics",
//   MYTHOLOGY = "Mythology",
//   SPORTS = "Sports",
//   GEOGRAPHY = "Geography",
//   HISTORY = "History",
//   POLITICS = "Politics",
//   ART = "Art",
//   CELEBRITIES = "Celebrities",
//   ANUMALS = "Animals",
//   VEHICLES = "Vehicles",
//   COMICS = "Entertainment: Comics",
//   GADGETS = "Science: Gadgets",
//   MANGA = "Entertainment: Japanese Anime & Manga",
//   CARTOONS = "Entertainment: Cartoon & Animations"
// }
