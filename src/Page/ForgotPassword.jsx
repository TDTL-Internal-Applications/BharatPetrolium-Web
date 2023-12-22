import axios from "axios";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  // const [newPassword, setnewPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Please enter the email address");
      return;
    }
    try {
      await axios.post("http://bpcl.kolhapurdakshin.com:8000/mail_verification/", { email });

      // email sent successfully
      toast.success("Password reset link sent successfully to your email!");
    } catch (error) {
      //error
      console.error("Error sending email:", error);
      toast.error("User not found. Please check the email and try again.");
    }
  };

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
        className="container-fluid"
        style={{ backgroundColor: "white", height: "100vh" }}
      >
        <div className="row">
          <div
            className="col-sm-12 d-flex justify-content-center align-items-center"
            style={{ paddingTop: "10rem" }}
          >
            <div
              className=" "
              style={{
                backgroundColor: "deepskyblue",
                padding: "30px 70px 30px 70px",
                borderRadius: "20px",
              }}
            >
              <strong
                className=""
                style={{ paddingTop: "20px", fontSize: "2rem", color: "white" }}
              >
                Reset Password
              </strong>
              {!otp && (
                <form onSubmit={handleEmailSubmit}>
                  <div className="w-100">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label mt-2 px-2 d-flex text-start"
                    >
                      <strong style={{ color: "white" }}>Email</strong>
                    </label>
                    <input
                      style={{
                        borderRadius: "30px",
                        padding: "27px 20px 27px 20px",
                        width: "23rem",
                      }}
                      placeholder="Email"
                      type="email"
                      className="form-control no-outline-login"
                      id="exampleFormControlInput1"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="py-3">
                    <button
                      style={{
                        background:
                          "linear-gradient(to right, #6610f2, #0000002d)",
                        color: "white",
                        padding: "15px 30px",
                        borderRadius: "30px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                      type="button"
                      className="btn w-100"
                      onClick={handleEmailSubmit}
                      // onClick={handleResetPassword}
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              )}
              {/* {otp && !newPassword && (
                <form>
                  <label>OTP:</label>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button type="submit">Submit</button>
                </form>
              )} */}
              {/* {otp && newPassword && (
                <form>
                  <label htmlFor="">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                  />
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </form>
              )} */}
            </div>
          </div>
          <div className="col-12 py-3">
            <Link to="/">
              <button
                type="btn"
                style={{
                  background: "none",
                  textDecoration: "underline 1px solid white",
                  color: "dodgerblue",
                  fontWeight: "700",
                  border: "none",
                  padding: "10px",
                }}
              >
                Remembered Password? Login Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
