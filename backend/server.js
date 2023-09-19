const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(express.json());

// Middleware to allow Cross-Origin Resource Sharing (CORS) for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Fetch data from Firebase
app.get("/fetchData", async (req, res) => {
  try {
    const response = await axios.get("https://nist-mess-default-rtdb.firebaseio.com/complain.json");
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
    const response = await axios.post("https://nist-mess-default-rtdb.firebaseio.com/complain.json", dataToSave);
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
      const response = await axios.get("https://nist-mess-default-rtdb.firebaseio.com/complain.json");
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
        const response = await axios.get("https://nist-mess-default-rtdb.firebaseio.com/complain.json");
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

// create that able to update the status
app.put("/updateStatus/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const response = await axios.get("https://nist-mess-default-rtdb.firebaseio.com/complain.json");
        const data = response.data;
        const specificData = Object.values(data).filter((item) => item.id === id);
        const specificDataKey = Object.keys(data).filter((item) => item === id);
        const updateData = {
            ...specificData[0],
            status: status
        }
        const updateResponse = await axios.put(`https://nist-mess-default-rtdb.firebaseio.com/complain/${specificDataKey[0]}.json`, updateData);
        res.json(updateResponse.data);
    }
    catch (error) {
        console.error("Error fetching data from Firebase:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Firebase" });
    }
});

// fetch details by complaintNumber
app.get("/fetchByComplaintNumber/:complaintNumber", async (req, res) => {
    try {
        const { complaintNumber } = req.params;
        const response = await axios.get("https://nist-mess-default-rtdb.firebaseio.com/complain.json");
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
