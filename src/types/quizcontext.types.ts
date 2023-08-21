export type QuestionSelectType = {
    question: string,
    value: string
}

export type QuizState = {
    selectedQuestions: QuestionSelectType[];
    currentQue: number,
    score: number
}

export type Action =
    | { type: "NEXT_QUE", payload: any }
    | { type: "RESET" };

type Dispatch = (action: Action) => void;

export type QuizContextType = {
    state: QuizState,
    dispatch: Dispatch,
    loader: boolean;
    setLoader: (value: boolean) => void;
    modal: boolean;
    setModal: (value: boolean) => void;
}

export type ThemeContextType = {
    theme: string | null;
    changeTheme: () => void;
}