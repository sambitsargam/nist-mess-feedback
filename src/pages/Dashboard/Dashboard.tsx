import "./Dashboard.css";
import { useAuth } from "../../context/Auth/auth-context";
import { useEffect, useState } from "react";
import { useQuiz } from "../../context/Quiz/quiz-context";
import { useNavigate } from "react-router-dom";
import { collection, db, getDocs } from "../../firebase";

export function Dashboard() {
  const { userInfo } = useAuth();
  const { dispatch, setLoader } = useQuiz();
  const navigate = useNavigate();
  const [leaderData, setLeaderData] = useState([]);
  useEffect(() => {
    setLoader(true);
    dispatch({ type: "RESET" });
    sessionStorage.removeItem("quizId");
    (async () => {
      let data: any = [];
      const querySnapshot = await getDocs(collection(db, "scoreboard"));
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data = [...data, docData];
      });
      setLeaderData(data);
    })();
    setTimeout(() => setLoader(false), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const progressData = leaderData.filter((ele: any) => ele?.email === userInfo.email);
  const sortedLeaderboard = leaderData.sort((data1: any, data2: any) => data2.score - data1.score);
  return (
    <div className="dash-container">
      <div className="dash">
        <h2 className="dash-title">Progress Dashboard</h2>
        {progressData.length === 0 ? (
          <div className="dash-play-now flex-center">
            <h3>Looks like you haven't played any quiz !</h3>
            <button
              className="link-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              Play Now
            </button>
          </div>
        ) : (
          <div className="score-container">
            <div className="score-header">
              <h3>Quiz Category</h3>
              <h3>Score</h3>
            </div>
            {progressData.map((progress: any) => (
              <div className="score-main">
                <div className="score-main-header">
                  <h4> {progress?.quizCategory}</h4>
                  <h4>{progress?.score}</h4>
                </div>
                <button
                  className="btn default"
                  onClick={() => {
                    sessionStorage.setItem("quizId", progress.quizId);
                    navigate("/rules");
                  }}
                >
                  Retake
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="dash">
        <h2 className="dash-title">
          <i className="fa fa-trophy" aria-hidden="true"></i> Leaderboard
        </h2>
        <div className="score-container">
          <div className="score-header">
            <h3>Username</h3>
            <h3>Quiz Category</h3>
            <h3>Score</h3>
          </div>
          {sortedLeaderboard.map((progress: any) => (
            <div className="score-main">
              <div className="score-main-header">
                <h4> {progress?.username}</h4>

                <h4> {progress?.quizCategory}</h4>
                <h4>{progress?.score}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
