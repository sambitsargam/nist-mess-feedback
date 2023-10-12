/* eslint-disable react-hooks/exhaustive-deps */
import "./admin.css";
import { useEffect, useState } from "react";
import { useQuiz } from "../../context/Quiz/quiz-context";

// Define an interface to represent the structure of a complaint entry
interface ComplaintEntry {
  status: string;
  complaintNumber: string;
  name: string;
  email: string;
  q1: string;
  img: string;
}

export function AdminDashboard() {
  const { setLoader } = useQuiz();

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

  // Function to open the details in a new tab
  function openDetailsInNewTab(complaint: ComplaintEntry) {
    window.open(`/complaint-details/${complaint.complaintNumber}`, "_blank");
  }

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
              <button onClick={() => openDetailsInNewTab(complaint)}>View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
