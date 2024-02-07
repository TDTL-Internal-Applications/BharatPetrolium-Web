import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../Style/ForgotPassword.css";
import { FaEye ,FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword2(props) {
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

 
  const [EMAILId, setEMAILId] = useState("");
  // const [newPassword, setnewPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");

  useEffect(()=>{
    setEMAILId(props.forgotPasswordEmail);
  },[props.forgotPasswordEmail]);

  let navigate=useNavigate()
  function handleChangeEmailButton()
  {
    navigate('/forgot-password');
  }


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
            style={{ paddingTop: "8rem" }}
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
                Enter 4 Digit Code
              </strong>

              <div className="forgot-password-msg-div mt-2">Check <span style={{color:'#FFDD00'}}>{EMAILId}</span> for a verification code.</div>
              <div className="text-start"  title="Change Email">
                        <button className="Resend-Code mt-1" onClick={handleChangeEmailButton}>Change</button>
                    </div>
                <form >
              

                  <div className="w-100 mt-3 ">
                   
                    <div className="d-flex align-items-center justify-content-center" style={{gap:'1em'}}>
                      <input type="text" className="forgot-password-otp-input border border-danger" value={otp1} onChange={(e)=>{setOtp1(e.target.value)}} min="0" max="9" maxLength={1} pattern="[0-9]"/>
                      <input type="text" className="forgot-password-otp-input" value={otp2} onChange={(e)=>{setOtp2(e.target.value)}} min="0" max="9" maxLength={1} pattern="[0-9]"/>
                      <input type="text" className="forgot-password-otp-input" value={otp3} onChange={(e)=>{setOtp3(e.target.value)}} min="0" max="9" maxLength={1} pattern="[0-9]"/>
                      <input type="text" className="forgot-password-otp-input" value={otp4} onChange={(e)=>{setOtp4(e.target.value)}} min="0" max="9" maxLength={1} pattern="[0-9]"/>

                    </div>
                    <div className="text-start">
                        <button className="Resend-Code">Resend Code</button>
                    </div>

                    {/* <div className="forgot-password-msg-div mt-1 " style={{color:'#F76869'}}>
                        Invalid OTP
                    </div> */}
                   
                  </div>
                  <div className="my-3">
                    <button
                     
                      type="button"
                      className=" w-100 reset-password-button"
                    //   onClick={handleEmailSubmit}
                      // onClick={handleResetPassword}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="forgot-password-msg-div">
                    If you don't see a code in your inbox, check your spam folder. If it's not there, the email address may not be confirmed, or it may not match an existing account.
                    </div>
                </form>
              
              
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
