import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "../Images/Login-Side.png";
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
      const response = await axios.post("http://bpcl.kolhapurdakshin.com:8000/member_login/", {
        role: email,
        password: password,
      });
      console.log("Login successful", response.data);
      const jsonData = response.data;
      const loginStatus = jsonData.response.Login;
      const firstName = jsonData.data.first_name;
      const lastName = jsonData.data.last_name;
      const email_id =jsonData.data.member_email;
      const member_name = firstName +" "+ lastName
      const member_id = jsonData.data.id;
      const role_name = jsonData.role_name;

      localStorage.setItem("name", member_name);
      localStorage.setItem("email", email_id);
      localStorage.setItem("role_name", role_name);
      localStorage.setItem("member_id", member_id);
      localStorage.setItem('loginStatus', 'Login Successful');


      console.log(member_name)

      console.log(localStorage.getItem("name"));
      console.log(localStorage.getItem("email"));
      console.log(localStorage.getItem("role_name"));

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
        toast.error("Invalid ID", {
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
          text: "Welcome back " + member_name + "!",
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
        <div className="row d-flex justify-content-center  p-4">
          <div
            className="Client-name fs-1"
            style={{
              color: "dodgerblue",
              fontWeight: "900",
              // fontFamily: "boxicons",
              textTransform:"uppercase"
            }}
          >
            The BPC Employees’ Co-op. Credit Society Ltd. 
          </div>
          <hr style={{background:"blue",color:"blue"}}/>
          <div className="col-lg-7 col-md-12 col-sm-12 d-flex justify-content-center align-items-end py-1">
            <img className="loginImg" src={loginImg} alt=""  />
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 d-flex justify-content-center align-items-center " style={{background:"#027CC6",paddingBottom:"3rem"}} >
            <div
              className="text-center"
              style={{ maxWidth: "440px", width: "100%", paddingTop: "4rem" }}
            >
              <div className=" fs-1">
                <strong style={{ color: "white", fontWeight: "900" }}>
                  LOG IN
                </strong>
              </div>
              <span className="pb-3 pt-0">
                <strong style={{ color: "white" }}>
                  Welcome Back, Please Login To Your Account
                </strong>
              </span>
              <form action="">
                <div className="mb-2 mt-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label mt-2 px-2 d-flex text-start text-white"
                  >
                    Member ID
                  </label>
                  <input
                    style={{
                      borderRadius: "8px",
                      padding: "15px 20px",
                      width: "100%",
                      // border: "none",
                      // borderBottom: "2px solid dodgerblue",
                      outline: "none",
                    }}
                    placeholder="Member ID"
                    type="email"
                    className="form-control no-outline-login"
                    id="exampleFormControlInput1"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin();
                      }
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputPassword"
                    className="col-form-label px-2 d-flex text-start text-white"
                  >
                    Password
                  </label>
                  <input
                    style={{
                      borderRadius: "8px",
                      padding: "15px 20px",
                      width: "100%",
                      // border: "none",
                      // borderBottom: "2px solid dodgerblue",
                      outline: "none",
                    }}
                    placeholder="Password"
                    type="password"
                    className="form-control no-outline-login"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin();
                      }
                    }}
                  />
                </div>
                <div className="py-3">
                  <button
                    style={{
                      background:"#FD0",
                      color: "#027CC6",
                      // padding: "15px 30px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      fontWeight:"bold",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"

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
                      textDecoration: "underline 1px solid #027CC6",
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
         
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
