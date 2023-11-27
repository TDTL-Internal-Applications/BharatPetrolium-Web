import React from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function TitleTaxProp() {
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-4">
            <div className="row w-100">
              <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-md d-flex text-start">
                <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Title Transfer Of Property <MdOutlineKeyboardArrowDown />
                </h2>
              </div>
              <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center py-2">
                <button
                  type="btn"
                  style={{
                    padding: "10px 35px 10px 35px",
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "bold",
                    border: "1px solid grey",
                    borderRadius: "7px",
                  }}
                >
                  Login
                </button>
              </div>
              <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center py-2">
                <button
                  type="btn"
                  style={{
                    padding: "10px 25px 10px 25px",
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "bold",
                    border: "1px solid grey",
                    borderRadius: "7px",
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Token Section */}
          <div className="container d-flex w-100">
            <div
              className="row w-100"
              style={{
                backgroundColor: "whitesmoke",
                padding: "3rem",
                borderRadius: "20px",
              }}
            >
              <div className="col-12 d-flex text-start">
                <div>
                  <strong>Track Your Token</strong>
                </div>
              </div>
              <div className="col-10 py-2">
                <input
                  type="text"
                  placeholder="Type Your Token Details"
                  style={{
                    padding: "22px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                  className="form-control no-outline"
                />
              </div>
              <div className="col-2 py-2">
                <button
                  type="search"
                  style={{
                    backgroundColor: "dodgerblue",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    padding: "7px 25px 7px 25px",
                    borderRadius: "7px",
                  }}
                  className="btn "
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
