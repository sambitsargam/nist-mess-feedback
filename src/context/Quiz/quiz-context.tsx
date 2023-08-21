import React, { createContext, useContext, useReducer, useState } from "react";
import { initialState, quizReducer } from "../../reducer/quizReducer";
import { QuizContextType } from "../../types/quizcontext.types";

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <QuizContext.Provider value={{ state, dispatch, loader, setLoader, modal, setModal }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export { QuizProvider, useQuiz };
