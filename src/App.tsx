import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Loader, Modal, Navbar, PrivateRoute } from "./component";
import { Dashboard, Home, Question, Result, Rule, SignIn, SignUp, UserProfile } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { useQuiz } from "./context/Quiz/quiz-context";
import { useTheme } from "./context/Theme/theme-context";
function App() {
  const { loader, modal } = useQuiz();
  const { theme } = useTheme();
  return (
    <div className={`${theme === "dark" ? "default-theme" : "light-theme"}`}>
      <div className="App-container">
        <Navbar />
        {modal && <Modal />}
        {loader && <Loader />}
        <ToastContainer
          position="top-right"
          style={{ top: "4.5em", right: "0em" }}
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/rules"
            element={
              <PrivateRoute>
                <Rule />
              </PrivateRoute>
            }
          />
          <Route
            path="/question/:quizId"
            element={
              <PrivateRoute>
                <Question />
              </PrivateRoute>
            }
          />
          <Route
            path="/result"
            element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
