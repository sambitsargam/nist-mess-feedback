import { Link } from "react-router-dom";
import "./Rule.css";

const RULES = [
  "You will get 30 seconds to select an option for each question.",
  "Otherwise that question will be skipped and point won't be considered.",
  "Each right answer scores 10 Points.",
  "Each multiple choice question has only one correct answer.",
  "To win the quiz you need to score more than 80%.",
];
export function Rule() {
  const quizId = sessionStorage.getItem("quizId");
  return (
    <div className="rule-container flex-center">
      <div className="rule-main-container flex-center">
        <div className="rule-header">
          <h1>Rules</h1>
        </div>
        <div className="rule-main">
          {RULES.map((rule) => (
            <p>
              <i className="fa fa-star" aria-hidden="true"></i> {rule}
            </p>
          ))}
        </div>
        <div className="flex-center">
          <Link to={`/question/${quizId}`}>
            <button className="link-btn start-quiz-btn">Start Quiz</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
