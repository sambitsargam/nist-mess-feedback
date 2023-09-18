import "./admin.css";
import { useAuth } from "../../context/Auth/auth-context";
import { useEffect, useState } from "react";
import { useQuiz } from "../../context/Quiz/quiz-context";
import { useNavigate } from "react-router-dom";

// Define an interface to represent the structure of a complaint entry
interface ComplaintEntry {
  status: string;
  complaintNumber: string;
  name: string;
  email: string;
}

export function Admin() {
  const { userInfo } = useAuth();
  const { dispatch, setLoader } = useQuiz();
  const navigate = useNavigate();

  // Initialize complainData as an empty array
  const [complainData, setComplainData] = useState<ComplaintEntry[]>([]);

  async function fetchData() {
    setLoader(true);

    try {
      const response = await fetch(`http://localhost:3001/fetchByStatus/pending`);
      const data = await response.json();

      const complaintEntries = Object.values(data) as ComplaintEntry[];
      setComplainData(complaintEntries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoader(false);
  }

  useEffect(() => {
    // Call fetchData once when the component mounts
    fetchData();
  }, []); // An empty dependency array ensures it runs once on mount

  return (
    <div className="dash-container">
      <div className="dash">
        <h2 className="dash-title">Complain Dashboard</h2>
          <div className="complain-list">
            {complainData.map((complaint, index) => (
              <div className="complaint-card" key={index}>
                <h4 className="complaint-number">Complaint Number: {complaint?.complaintNumber}</h4>
                <p className="complaint-name">Name: {complaint?.name}</p>
                <p className="complaint-email">Status: {complaint?.status}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

           