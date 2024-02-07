import axios from "axios";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../Style/ForgotPassword.css";
import { FaEye ,FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword3() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  // const [newPassword, setnewPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");

 let[passwordVisibility,setPasswordVisibility]=useState(true);
 let[confirmPasswordVisibility,setConfirmPasswordVisibility]=useState(true);


  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className="container-fluid forgot-password-parent-container"
        style={{ backgroundColor: "white", height: "100vh" }}
      >
        <div className="row">
          <div
            className="col-sm-12 d-flex justify-content-center align-items-center "
            style={{ paddingTop: "10rem" }}
          >
            <div
              className="forgot-password-inner-div"
              style={{
                backgroundColor: "#027CC6",
                padding: "30px 50px 30px 50px",
                borderRadius: "10px",
              }}
            >
              <strong
                className=""
                style={{ paddingTop: "20px", fontSize: "1.4rem", color: "white" }}
              >
                Change Password
              </strong>
              
                <form >
                  <div className="w-100 mt-3 ">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label mt-2 px-2 d-flex text-start"
                    >
                      <strong style={{ color: "white",fontSize:'0.9em' }}>Password</strong>
                    </label>
                    <div className="position-relative" >
                        <input
                        
                        placeholder="password"
                        type={(passwordVisibility)?"password":'text'}
                        className="form-control no-outline-login forgot-password-login "
                        id="exampleFormControlInput1"
                        name="email"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="position-absolute" style={{right:'5px',top:'4px',cursor:'pointer'}} onClick={()=>{setPasswordVisibility(!passwordVisibility)}} >
                        {(passwordVisibility)?<FaEye /> :<FaEyeSlash />}
                    </div>
                    </div>
                    
                  </div>

                  <div className="w-100 mt-3 ">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label mt-2 px-2 d-flex text-start"
                    >
                      <strong style={{ color: "white",fontSize:'0.9em' }}>Confirm Password</strong>
                    </label>
                    <div className="position-relative" >
                        <input
                        
                        placeholder="confirm password"
                        type={(confirmPasswordVisibility)?"password":'text'}
                        className="form-control no-outline-login forgot-password-login"
                        id="exampleFormControlInput1"
                        name="email"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                        <div className="position-absolute" style={{right:'5px',top:'4px',cursor:'pointer'}} onClick={()=>{setConfirmPasswordVisibility(!confirmPasswordVisibility)}} >
                        {(confirmPasswordVisibility)?<FaEye /> :<FaEyeSlash />}
                    </div>
                    </div>
                   
                  </div>
                  <div className="my-4">
                    <button
                     
                      type="button"
                      className=" w-100 reset-password-button"
                    //   onClick={handleEmailSubmit}
                      // onClick={handleResetPassword}
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              
              
            </div>
          </div>
          {/* <div className="col-12 py-3">
            <Link to="/">
              <button
                type="btn"
                style={{
                  background: "none",
                  textDecoration: "underline",
                  color: "dodgerblue",
                  fontWeight: "700",
                  border: "none",
                  padding: "10px",
                }}
              >
                Remembered Password? Login Now
              </button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
