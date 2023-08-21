import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/Quiz/quiz-context";
import { Option } from "../../types/question.types";
import "./Question.css";
import { quizData } from "./quiz.model";

export function Question() {
  const navigate = useNavigate();
  const quizId = sessionStorage.getItem("quizId");
  const questions: any = quizData.find((quizObj) => quizObj.id === quizId)?.questions;
  const [selectedOption, setSelectedOption] = useState("");
  const [seconds, setSeconds] = useState(30);
  const {
    state: { currentQue },
    dispatch,
    setModal,
    modal,
  } = useQuiz();

  const optionClickHandler = (option: Option): void => {
    setSelectedOption(option.value);
  };
  const nextClickHandler = (): void => {
    setSeconds(30);
    dispatch({
      type: "NEXT_QUE",
      payload: {
        question: questions[currentQue - 1].question,
        value: selectedOption,
      },
    });
    setSelectedOption("");
  };
  const quitHandler = () => {
    setModal(true);
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 1) {
        nextClickHandler();
        if (currentQue === questions.length && !modal) {
          navigate("/result");
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <div className="quiz-container flex-center">
      <div className={`quiz-main-container ${modal && "pointer-none"}`}>
        <div className="quiz-pg-header">
          <p className="paragraph-rg">
            Question: {currentQue}/{questions?.length}
          </p>
          <div className={`${seconds < 11 && "text-red"}`}>
            <i className="fa-regular fa-clock timer"></i>
            {"  "}
            <span className={`timer paragraph-rg `}>{seconds} Sec</span>
          </div>
        </div>

        <div className="quiz-pg-question">
          <h2> {questions[currentQue - 1].question}</h2>
        </div>

        <div className="quiz-pg-main">
          {questions[currentQue - 1].options.map((option: Option) => (
            <label
              key={option.value}
              className={`quiz-option ${
                selectedOption === option.value ? "option-select" : "quiz-option"
              }`}
              onClick={() => optionClickHandler(option)}
            >
              {option.value}
            </label>
          ))}
        </div>

        <div className="quiz-pg-footer">
          <button className="btn danger" onClick={() => quitHandler()}>
            Quit
          </button>
          {questions?.length === currentQue ? (
            <button
              className={`link-btn next-que-btn ${selectedOption === "" ? "btn-disable" : ""}`}
              onClick={() => {
                nextClickHandler();
                navigate("/result");
              }}
              disabled={selectedOption === "" ? true : false}
            >
              View Result
            </button>
          ) : (
            <button className="link-btn next-que-btn" onClick={() => nextClickHandler()}>
              Next <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
