export type Option = {
    value: string,
    isRight: boolean
}

export type QuestionType = {
    question: string,
    points: number,
    options: Option[]
}

export type QuizObj = {
    category: string,
    questions: QuestionType[]
}
