import "./complain.css";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Web3Storage } from "web3.storage";

export function Complain() {

const [userData, setUserData] = useState({ mobile: "", roll: "",who:"", q1: "" });
const postUserData = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setUserData({ ...userData, [name]: value });
};
const [isloading, setisloading] = useState(false);
// eslint-disable-next-line no-unused-vars
const [isfileuploading, setisfileuploading] = useState(false);
const [file, setFile] = useState("");
// eslint-disable-next-line no-unused-vars
const [filetype, setfiletype] = useState("");

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGIyMDE1N0IyODJiMkQ5ZThFMzY5MjBGMDhiY0EyZkVhMzRmRTBmYjQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYyMjU5MjQ3MTEsIm5hbWUiOiJtZW50bGUifQ.wjCD8ygNde_wiV95BPDJFe7KvKcysTTwvz4RcDMwJEw";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

// lets add a function to create a complain number with prefix NIST automatically when submiited
// eslint-disable-next-line no-unused-vars
function complainNumber() {
  var text = "";
  var possible = "0123456789";
  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return "NIST" + text;
}


const handleSubmit = async (event) => {
  event.preventDefault();

  // Generate a complaint number
  const complaintNumber = complainNumber();

  // Prepare the data to be sent
  const formData = new FormData();
  formData.append("complaintNumber", complaintNumber); // Add the complaint number to the form data
  formData.append("who", userData.who);
  formData.append("mobile", userData.mobile);
  formData.append("roll", userData.roll);
  formData.append("q1", userData.q1);
  formData.append("file", file);

  // Make a POST request to the API endpoint
  try {
    const response = await fetch("https://nist-mess-default-rtdb.firebaseio.com/complain.json", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Handle a successful response here (e.g., show a success message)
      console.log("Complaint submitted successfully!");
      console.log("Complaint Number:", complaintNumber); // Log the generated complaint number
    } else {
      // Handle any errors in the response
      console.error("Failed to submit complaint.");
    }
  } catch (error) {
    // Handle network errors
    console.error("Network error:", error);
  }
};




async function onChangeCoverImage(e) {
  setisloading(true);
  const files = e.target.files[0];
  const client = makeStorageClient();
  const cid = await client.put([files]);
  const res = await client.get(cid);
  // eslint-disable-next-line no-unused-vars
  const filess = await res.files();
  setFile(`https://${cid}.ipfs.dweb.link/${files.name}`);
  // console.log(file);
  setisloading(false);
  return cid;
}   
      
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="complain">
     <div className="rsltcontainer flex-center">
      <h1 className="rslt-title">Complain</h1>
      </div>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form method="POST">
            <div className="formbold-mb-5">
              <label className="formbold-form-label">Who are You?</label>
              <select
                name="who"
                id="who"
                className="formbold-form-input"
                value={userData.who}
                onChange={postUserData}
                required
              >
                <option value="">Select</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Staff">Staff</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="formbold-mb-5">
                <label className="formbold-form-label">Mobile Number</label>
                <input
                    type="number"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter your Mobile Number"
                    value={userData.mobile}
                    onChange={postUserData}
                    className="formbold-form-input"
                    required
                />
            </div>
            {userData.who === 'Student' && (
            <div className="formbold-mb-5">
              <label className="formbold-form-label"> Roll Number </label>
              <input
                type="number"
                name="roll"
                id="roll"
                placeholder="Enter your Nist Roll Number"
                className="formbold-form-input"
                value={userData.roll}
                onChange={postUserData}
              />
            </div>
            )}

            <div className="formbold-mb-5">
              <label className="formbold-form-label">Upload your Image</label>
              <input
                type="file"
                name="file"
                id="file"
                placeholder="Upload your Image"
                className="formbold-form-input"
                onChange={onChangeCoverImage}
                required
              />

              {isloading ? (
                <div className="formbold-form-input">
                  <h3>Uploading...</h3>
                </div>
              ) : (
                <div>
                  {file ? (
                    <div className="formbold-form-input">
                      <img  src={file} alt="If you Upload a Video then Click below to open in another tab" />
                      <br></br>
                      <a href={file} target="_blank" rel="noreferrer"> Click here to open in another tab</a>
                    </div>
                  ) : (
                    <div>
                      </div>
                  )}
                </div>
              )}
            </div>


            <div className="formbold-mb-5">
              <label className="formbold-form-label">Describe your Complain</label>
              <textarea
                name="q1"
                id="q1"
                placeholder="Type your Answer"
                className="que"
                onPaste={(e)=>{
                    e.preventDefault()
                    return false;
                  }} 
                value={userData.q1}
                onChange={postUserData}
                required></textarea>
            </div>
            
            <div>
              <button className="formbold-btn" onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer flex-center">
    <h5>
      Made with <i className="fa fa-heart" aria-hidden="true"></i> by  Sambit Sargam{" "}
    </h5>
    </div>
    </div>
  );
}