import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Loader, Modal, Navbar, PrivateRoute } from "./component";
import { Dashboard, Home, Rule, SignIn, UserProfile, Feedback, Complain, Admin, AdminDashboard } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { useQuiz } from "./context/Quiz/quiz-context";
import { useTheme } from "./context/Theme/theme-context";
import ComplaintDetails  from "./component/ComplaintDetails";
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
            path="/feedback"
            element={
              <PrivateRoute>
                <Feedback />
              </PrivateRoute>
            }
          />

          <Route
            path="/complain"
            element={
              <PrivateRoute>
                <Complain />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
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
          <Route path="/complaint-details/:complaintNumber" element={<ComplaintDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
