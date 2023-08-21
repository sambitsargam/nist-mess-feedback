import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/Quiz/quiz-context";
import "./Modal.css";

export function Modal() {
  const { setModal } = useQuiz();
  const navigate = useNavigate();
  return (
    <div className="modal-container flex-center">
      <div className="modal">
        <h4>
          <i className="fa fa-exclamation-circle" aria-hidden="true"></i> Are you sure want to quit
          this Quiz ?
        </h4>
        <p>You will be redirect to home after confirm.</p>
        <div className="dialog-btn">
          <button className="btn link-btn" onClick={() => setModal(false)}>
            Cancel
          </button>
          <button
            className="btn danger"
            onClick={() => {
              setModal(false);
              sessionStorage.removeItem("quizId");
              navigate("/");
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
