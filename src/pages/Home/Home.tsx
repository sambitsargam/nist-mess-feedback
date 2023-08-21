import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/Quiz/quiz-context";
import { quizData } from "../Question/quiz.model";
import "./Home.css";

export function Home() {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const playHandler = (id: string) => {
    navigate("/rules");
    sessionStorage.setItem("quizId", id);
  };

  useEffect(() => {
    dispatch({ type: "RESET" });
    sessionStorage.removeItem("quizId");
  }, [dispatch]);

  return (
    <>
      <div className="quiz-home-container">
        <div className="main-header">
          <div className="home-text">
            <h1>Bored ?</h1>
            <h1>Want to have some fun ?</h1>
            <h1>Do you think you are bollywood movie fan ?</h1>
            <a href="#explore" className="link-btn">
              Explore Quiz
            </a>
          </div>
          <div>
            <img
              className="home-img"
              src="https://res.cloudinary.com/depmzczni/image/upload/v1649998229/quiz_rrrtco.png"
              alt="Bulb"
            />
          </div>
        </div>

        <div className="category-home-container flex-center">
          <div className="category">
            <header className="category-header">Category</header>
            <main className="category-main" id="explore">
              {quizData.map((quiz) => {
                return (
                  <div key={quiz.id} className="card text-overlay">
                    <div className="img-content">
                      <img className="card-img" src={quiz.img} alt={quiz.category} />
                    </div>
                    <div className="card-info">
                      <h3>{quiz.category}</h3>
                      <div className="card-info-bottom">
                        <p className="paragraph-sm">
                          <i className="fa fa-tag" aria-hidden="true"></i> Take this quiz to test
                          yourself.
                        </p>
                        <p className="paragraph-sm">
                          <i className="fa fa-tag" aria-hidden="true"></i> {quiz.questions.length}{" "}
                          Questions
                        </p>
                        <div
                          className="link-btn take-quiz-btn"
                          onClick={() => playHandler(`${quiz.id}`)}
                        >
                          Play Now
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </main>
          </div>
        </div>
      </div>
      <div className="footer flex-center">
        <h5>
          Made with <i className="fa fa-heart" aria-hidden="true"></i> by sambit{" "}
        </h5>
        <div className="icon-bar">
          <a
            href="https://github.com/sambitsargam"
            target="_blank"
            className="github-logo"
            rel="noreferrer"
          >
            <i className="fa fa-github "></i>
          </a>
          <a
            href="https://twitter.com/sambitsargam"
            target="_blank"
            className="twitter"
            rel="noreferrer"
          >
            <i className="fa fa-twitter "></i>
          </a>
          <a
            href="https://linkedin.com/in/sambitsargam"
            target="_blank"
            className="linkedin"
            rel="noreferrer"
          >
            <i className="fa fa-linkedin "></i>
          </a>
        </div>
        <p className="paragraph-sm">© 2023</p>
      </div>
    </>
  );
}
