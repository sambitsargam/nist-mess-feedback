import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./com.css";

interface ComplaintDetailsProps {
  // Define your props if needed
}

const ComplaintDetails: React.FC<ComplaintDetailsProps> = () => {
  const { complaintNumber } = useParams<{ complaintNumber: string }>();
  const [complaintDetails, setComplaintDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch the complaint details using the complaint number
    async function fetchComplaintDetails() {
      try {
        const response = await fetch(`http://localhost:3001/fetchByComplaintNumber/${complaintNumber}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming data is an array with one element, extract that element
        if (Array.isArray(data) && data.length === 1) {
          setComplaintDetails(data[0]);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching complaint details:", error);
      }
    }

    fetchComplaintDetails();
  }, [complaintNumber]);

  if (!complaintDetails) {
    return <div>Loading...</div>; // You can render a loading indicator here
  }

  return (
    <div className="complaint-details-container">
      <h2>Complaint Details</h2>
      <br></br><br></br>
      <div className="profile-section">
        <img src={complaintDetails.profilePic} alt="Profile" className="profile-pic" />
        <br></br>
        <div className="profile-info">
          <p className="bold-text">Name: {complaintDetails.name}</p>
          <p>Email: {complaintDetails.email}</p>
          <p className="bold-text">Mobile: {complaintDetails.mobile}</p>
          <p>Roll: {complaintDetails.roll}</p>
        </div>
      </div>
      <p>Complaint Number: {complaintNumber}</p>
      <p>Status: {complaintDetails.status}</p>
      <p>Q1: {complaintDetails.q1}</p>
      <a href={complaintDetails.fileUrl} download>
              Download Attached File
            </a>

    </div>
  );
}
export default ComplaintDetails;
