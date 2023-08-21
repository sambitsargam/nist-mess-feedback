import { Action, QuizState } from "../types/quizcontext.types";

export const initialState = {
  currentQue: 1,
  selectedQuestions: [],
  score: 0,
};

export const quizReducer = (state: QuizState, action: Action) => {
  switch (action.type) {
    case "NEXT_QUE":
      return {
        ...state,
        currentQue: state.currentQue + 1,
        selectedQuestions: [...state.selectedQuestions, action.payload],
      };
    case "RESET":
      return initialState;
  }
};
