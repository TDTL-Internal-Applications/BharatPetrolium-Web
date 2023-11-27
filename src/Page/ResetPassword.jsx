import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

//   const { member_id } = useParams();


  const getPasswordStrength = () => {
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (newPassword.length >= 8 && hasUpperCase && hasLowerCase && hasNumber) {
      return "Strong";
    } else if (
      newPassword.length >= 8 &&
      (hasUpperCase || hasLowerCase || hasNumber)
    ) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case "Strong":
        return "text-success";
      case "Medium":
        return "text-warning";
      case "Weak":
      default:
        return "text-danger";
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/reset_password/3/`,
        {
          newPassword: newPassword,
        }
      );

      if (response.status === 200) {
        console.log("Password reset successful");
      } else {
        console.error("Password reset failed");
      }
    } catch (error) {
      console.error("An error occurred during password reset:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center w-100 mt-5">
      <div
        className="row d-flex w-100 justify-content-center"
        style={{ paddingTop: "8rem" }}
      >
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ flexDirection: "column" }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "2rem",
              background: "deepskyblue",
              borderRadius: "30px",
            }}
          >
            <div>
              <h2 style={{ fontWeight: "bold", color: "white" }}>
                Reset Password
              </h2>
            </div>
            <div className={`mb-3 ${getPasswordStrengthColor()}`}>
              <label
                htmlFor="newPassword"
                className="form-label text-white"
                style={{ fontWeight: "600" }}
              >
                New Password
              </label>
              <input
                style={{
                  borderRadius: "30px",
                  padding: "15px",
                  width: "23rem",
                }}
                type="password"
                placeholder="* * * * * *"
                className="form-control text-center no-outline"
                id="newPassword"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <small>Password Strength: {getPasswordStrength()}</small>
            </div>
            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="form-label text-white"
                style={{ fontWeight: "600" }}
              >
                Confirm Password
              </label>
              <input
                style={{
                  borderRadius: "30px",
                  padding: "15px",
                  width: "23rem",
                }}
                type="password"
                placeholder="* * * * * *"
                className="form-control text-center no-outline"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {passwordMismatch && (
                <small className="text-danger">Password is not matching</small>
              )}
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                background: "linear-gradient(to right, #6610f2, #0000002d)",
                color: "white",
                padding: "15px 30px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              Reset Password
            </button>
          </form>
          <div className="d-flex justify-content-center pt-3">
            <Link
              to="/login"
              style={{
                color: "dodgerblue",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1.4rem",
              }}
            >
              Go To Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
