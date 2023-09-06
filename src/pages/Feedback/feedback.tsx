import "./feedback.css";
import React, { useState } from "react";


export function Feedback() {
    const [userData, setUserData] = useState({
        fullname: "",
        email: "",
        mobile: "",
        feedback: "",


    });
    
    let name, value;
    const postUserData = (e: { target: { name: any; value: any; }; }) => {
        name=e.target.name;
        value=e.target.value;
        setUserData({...userData, [name]:value});
    };

    const submitData = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const { fullname, email, mobile, feedback} = userData;
        if (fullname && email && mobile && feedback) {
            const res = fetch(
              "https://ccc-hiring-default-rtdb.firebaseio.com/userDataRecords.json",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fullname,
                  email,
                  mobile,
                  feedback,
                }),
              }
            );
      
            if (await res) {
              setUserData({
                fullname: "",
                email: "",
                mobile: "",
                feedback: "",
              });
              alert("Answers Received🎉"); 
            } else {
              alert("⚠️ plz answer all the question");
            }
          } else {
            alert("⚠️ plz answer all the question");
          }
        };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <div className="quiz">
     <div className="rsltcontainer flex-center">
      <h1 className="rslt-title">Descriptive Question</h1>
      </div>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form method="POST">
            <div className="formbold-mb-5">
                <label className="formbold-form-label">Mobile Number</label>
                <input
                    type="number"
                    name="mobile"
                    id="mobile"
                    placeholder="Enter your Mobile Number"
                    onChange={postUserData}
                    className="formbold-form-input"
                    required
                />
            </div>

            <div className="formbold-mb-5">
              <label className="formbold-form-label">Describe your Feedback</label>
              <textarea
                name="feedback"
                id="q1"
                placeholder="Enter your Feedback"
                className="que"
                onPaste={(e)=>{
                    e.preventDefault()
                    return false;
                  }} 
                value={userData.feedback}
                onChange={postUserData}
                required></textarea>
            </div>
            
            <div>
              <button className="formbold-btn" onClick={submitData}>Submit</button>
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