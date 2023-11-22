import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "../Images/loginImg.png";
import "../Style/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email) {
      toast.warning("Please Enter the Email", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!password) {
      toast.warning("Please Enter the Password", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/login_view/", {
        email: email,
        password: password,
      });
      console.log("Login successful", response.data);
      const jsonData = response.data;
      const loginStatus = jsonData.response.Login;
      const data1 = jsonData.data.member_name;
      localStorage.setItem("membersData", data1);

      console.log(localStorage.getItem("membersData"));
      if (loginStatus === "Invalid Password") {
        toast.error("Invalid Password", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (loginStatus === "User not found") {
        toast.error("Invalid Email", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (loginStatus === "Login Successful") {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
        navigate("/Home");
      }
    } catch (error) {
      console.error("Login failed", error.response.data);
      toast.error("Login Failed. Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row p-5">
          <div
            className="Client-name fs-1"
            style={{
              color: "dodgerblue",
              fontWeight: "900",
              fontFamily: "boxicons",
              textTransform:"uppercase"
            }}
          >
            The BPC Employees’ Co-op. Credit Society Ltd. 
          </div>
          <hr style={{background:"blue",color:"blue"}}/>
          <div className="col-lg-7 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
            <div
              className="text-center"
              style={{ maxWidth: "440px", width: "100%", paddingTop: "6rem" }}
            >
              <div className=" fs-1">
                <strong style={{ color: "dodgerblue", fontWeight: "900" }}>
                  LOG IN
                </strong>
              </div>
              <span className="pb-3 pt-0">
                <strong style={{ color: "dodgerblue" }}>
                  Welcome Back, Please Login To Your Account
                </strong>
              </span>
              <form action="">
                <div className="mb-2 mt-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2 px-2 d-flex text-start"
                  >
                    Email address
                  </label>
                  <input
                    style={{
                      borderRadius: "20px",
                      padding: "15px 20px",
                      width: "100%",
                      border: "none",
                      borderBottom: "2px solid dodgerblue",
                      outline: "none",
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
                <div className="mb-3">
                  <label
                    htmlFor="inputPassword"
                    className="col-form-label px-2 d-flex text-start"
                  >
                    Password
                  </label>
                  <input
                    style={{
                      borderRadius: "20px",
                      padding: "15px 20px",
                      width: "100%",
                      border: "none",
                      borderBottom: "2px solid dodgerblue",
                      outline: "none",
                    }}
                    placeholder="Password"
                    type="password"
                    className="form-control no-outline-login"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="py-3">
                  <button
                    style={{
                      background:
                      "linear-gradient(to right, dodgerblue, #58d5ff)",
                      color: "white",
                      padding: "15px 30px",
                      borderRadius: "30px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                    type="button"
                    className="btn w-100"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <div className="pt-2 text-center">
                  <Link
                    to="/forgot-password"
                    style={{
                      textDecoration: "underline 1px solid white",
                      color: "dodgerblue",
                      fontWeight: "700",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 d-flex justify-content-center align-items-end">
            <img className="loginImg" src={loginImg} alt="" />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
