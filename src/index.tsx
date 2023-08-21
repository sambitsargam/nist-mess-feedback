import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/Auth/auth-context";
import { QuizProvider } from "./context/Quiz/quiz-context";
import { ThemeProvider } from "./context/Theme/theme-context";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <QuizProvider>
            <App />
          </QuizProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
