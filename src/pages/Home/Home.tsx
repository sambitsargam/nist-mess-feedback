import React from "react";
import "./Home.css";

export function Home() {
  return (
    <>
      <div className="quiz-home-container">
        <div className="main-header">
          <div className="home-text">
            <h1>Welcome to the Mess Feedback and Complaint System</h1>
            <h2>Have a complaint or a feedback?</h2>
            <p>Choose an option below:</p>
            <div className="home-buttons">
              <a href="complain" className="link-btn">
                Complain
              </a>
              <a href="feedback" className="link-btn">
                Feedback
              </a>
            </div>
          </div>
          <div>
            <img
              className="home-img"
              src="https://res.cloudinary.com/depmzczni/image/upload/v1649998229/quiz_rrrtco.png"
              alt="Bulb"
            />
          </div>
        </div>
      </div>
      <div className="footer flex-center">
        <h5>
          Made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://www.linkedin.com/in/sambitsargam/" target="_blank" rel="noreferrer">Sambit Sargam Ekalabya</a>{" "}
        </h5>
        <p className="paragraph-sm">© 2023</p>
      </div>
    </>
  );
}
