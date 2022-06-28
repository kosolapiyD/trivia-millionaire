import { SelectChangeEvent } from "@mui/material";

export type SelectFieldType = {
  id: number | string;
  name: string;
};

export type TriviaCategoryResponseType = {
  trivia_categories: Array<CategoryList>;
};

export type CategoryList = {
  id: number;
  name: string;
};

export type LocationType = {
  state: {
    category: string;
    difficulty: string;
  };
};

export type TriviaDataType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
};

export type TriviaDataResponseType = {
  results: Array<TriviaDataResponseArray>;
};

export type TriviaDataResponseArray = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
};
