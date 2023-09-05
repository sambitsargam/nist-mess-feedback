import "./complain.css";
import React, { useState } from "react";


export function Complain() {
    const [userData, setUserData] = useState({
        fullname: "",
        email: "",
        roll: "",
        q1: "",


    });
    
    let name, value;
    const postUserData = (e: { target: { name: any; value: any; }; }) => {
        name=e.target.name;
        value=e.target.value;
        setUserData({...userData, [name]:value});
    };

    const submitData = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const { fullname, email, roll, q1} = userData;
        if (fullname && email && roll && q1) {
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
                  roll,
                  q1,
                }),
              }
            );
      
            if (await res) {
              setUserData({
                fullname: "",
                email: "",
                roll: "",
                q1: "",
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
                    value={userData.mobile}
                    onChange={postUserData}
                    className="formbold-form-input"
                    required
                />
            </div>
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
              <button className="formbold-btn" onClick={submitData}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer flex-center">
    <h5>
      Made with <i className="fa fa-heart" aria-hidden="true"></i> by  NIST CCC{" "}
    </h5>
    </div>
    </div>
  );
}