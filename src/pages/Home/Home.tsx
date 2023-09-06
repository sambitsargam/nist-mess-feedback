import React from "react";
import "./Home.css";

export function Home() {
  return (
    <>
      <div className="quiz-home-container">
        <div className="main-header">
          <div className="home-text">
            <h1>Welcome to the Mess Feedback and Complaint System</h1>
            <h2>Have a complaint or want to provide feedback?</h2>
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
          Made with <i className="fa fa-heart" aria-hidden="true"></i> by sambitsargam{" "}
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
