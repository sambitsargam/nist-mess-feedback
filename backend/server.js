const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;


app.use(express.json());

// Middleware to allow Cross-Origin Resource Sharing (CORS) for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Fetch data from Firebase
app.get("/fetchData", async (req, res) => {
  try {
    const response = await axios.get("https://nistmess-default-rtdb.firebaseio.com/complain.json");
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Firebase:", error.message);
    res.status(500).json({ error: "Failed to fetch data from Firebase" });
  }
});

// Save data to Firebase
app.post("/saveData", async (req, res) => {
  try {
    const dataToSave = req.body;
    const response = await axios.post("https://nistmess-default-rtdb.firebaseio.com/complain.json", dataToSave);
    res.json(response.data);
  } catch (error) {
    console.error("Error saving data to Firebase:", error.message);
    res.status(500).json({ error: "Failed to save data to Firebase" });
  }
});

// Fetch data for a specific email
app.get("/fetchByEmail/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const response = await axios.get("https://nistmess-default-rtdb.firebaseio.com/complain.json");
      const data = response.data;
  
      // Find and filter data for the specified email
      const specificData = Object.values(data).filter((item) => item.email === email);
  
      res.json(specificData);
    } catch (error) {
      console.error("Error fetching data from Firebase:", error.message);
      res.status(500).json({ error: "Failed to fetch data from Firebase" });
    }
  });

app.get("/fetchByStatus/:status", async (req, res) => {
    try {
        const { status } = req.params;
        const response = await axios.get("https://nistmess-default-rtdb.firebaseio.com/complain.json");
        const data = response.data;
    
        // Find and filter data for the specified email
        const specificData = Object.values(data).filter((item) => item.status === status);
    
        res.json(specificData);
    }
    catch (error) {
        console.error("Error fetching data from Firebase:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Firebase" });
    }
});

app.put("/updateStatus/:complaintNumber", async (req, res) => {
  try {
    const { complaintNumber } = req.params;

    // Fetch the complaint with the specified complaintNumber
    const response = await axios.get("https://nistmess-default-rtdb.firebaseio.com/complain.json");
    const data = response.data;

    // Find the complaint using the specified complaintNumber
    const specificData = Object.values(data).find((item) => item.complaintNumber === complaintNumber);

    // Check if a complaint with the specified complaintNumber exists
    if (specificData) {
      // Update the status to "Accepted"
      specificData.status = "Accepted";

      // Use the specificData's key as the unique identifier for the PUT request
     await axios.put(`https://nistmess-default-rtdb.firebaseio.com/complain.json`, data);
      res.json({ message: "Status updated to Accepted" });
    } else {
      res.status(404).json({ error: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// lets update the status to rejected
app.put("/updateStatusToRejected/:complaintNumber", async (req, res) => {
  try {
    const { complaintNumber } = req.params;

    // Fetch the complaint with the specified complaintNumber
    const response = await axios.get("https://nistmess-default-rtdb.firebaseio.com/complain.json");
    const data = response.data;

    // Find the complaint using the specified complaintNumber
    const specificData = Object.values(data).find((item) => item.complaintNumber === complaintNumber);

    // Check if a complaint with the specified complaintNumber exists
    if (specificData) {
      // Update the status to "Rejected"
      specificData.status = "Rejected";

      // Use the specificData's key as the unique identifier for the PUT request
     await axios.put(`https://nistmess-default-rtdb.firebaseio.com/complain.json`, data);
      res.json({ message: "Status updated to Rejected" });
    } else {
      res.status(404).json({ error: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
}
);

// lets update the status to resolved
app.put("/updateStatusToResolved/:complaintNumber", async (req, res) => {
  try {
    const { complaintNumber } = req.params;

    // Fetch the complaint with the specified complaintNumber
    const response = await axios.get("https://nistmess-default-rtdb.firebaseio.com/complain.json");
    const data = response.data;

    // Find the complaint using the specified complaintNumber
    const specificData = Object.values(data).find((item) => item.complaintNumber === complaintNumber);

    // Check if a complaint with the specified complaintNumber exists
    if (specificData) {
      // Update the status to "Resolved"
      specificData.status = "Resolved";

      // Use the specificData's key as the unique identifier for the PUT request
     await axios.put(`https://nistmess-default-rtdb.firebaseio.com/complain.json`, data);
      res.json({ message: "Status updated to Resolved" });
    } else {
      res.status(404).json({ error: "Complaint not found" });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
}
);

// fetch details by complaintNumber
app.get("/fetchByComplaintNumber/:complaintNumber", async (req, res) => {
    try {
        const { complaintNumber } = req.params;
        const response = await axios.get("https://nistmess-default-rtdb.firebaseio.com/complain.json");
        const data = response.data;
        const specificData = Object.values(data).filter((item) => item.complaintNumber === complaintNumber);
        res.json(specificData);
    }
    catch (error) {
        console.error("Error fetching data from Firebase:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Firebase" });
    }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
