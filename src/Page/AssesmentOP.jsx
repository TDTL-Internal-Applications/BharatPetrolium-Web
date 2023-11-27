import React from "react";
import Header from "../components/Header";
import Sidebar from "./Sidebar";
import "../Style/AssesmentOP.css";
import Footer from "../components/Footer";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function AssesmentOP() {
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex w-100 pb-4">
            <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
            Assesment Of Property <MdOutlineKeyboardArrowDown />
            </h2>
          </div>
          {/* Form */}
          <div className="container d-flex justify-content-center">
            <div className="row w-100">
              <div className="col-12">
                <form>
                  {/* 1st Row */}
                  <div className="row pb-2">
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Select Path</label>

                      <select
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none" }}
                      >
                        <option></option>
                        <option>Select</option>
                      </select>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Assesment Type</label>
                      <select
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none" }}
                      >
                        <option></option>
                        <option>Select</option>
                      </select>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Property Type / Sub Type</label>
                      <select
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none" }}
                      >
                        <option></option>
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  {/* 2nd Row */}
                  <div class="row py-3">
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Area Of Property (SQFT)</label>
                      <select
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none" }}
                      >
                        <option></option>
                        <option>Select</option>
                      </select>
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">House No/Survey No/Flat No</label>
                      <input
                        type="text"
                        class="form-control no-outline "
                        style={{ backgroundColor: "whitesmoke", borderColor:"none" }}
                        aria-label="First name"
                      />
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Building Name</label>
                      <input
                        type="text"
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none" }}
                        aria-label="Last name"
                      />
                    </div>
                  </div>
                  {/* 3rd Row */}
                  <div class="row py-3">
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Property Detailed Address</label>
                      <input
                        type="text"
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none"}}
                        aria-label="First name"
                      />
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Landmark Old Property ID</label>
                      <input
                        type="text"
                        class="form-control no-outline "
                        style={{ backgroundColor: "whitesmoke", borderColor:"none"}}
                        aria-label="First name"
                      />
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Pin Code</label>
                      <input
                        type="text"
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none"}}
                        aria-label="Last name"
                      />
                    </div>
                  </div>
                  {/* 4th Row */}
                  <div class="row py-3">
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Email Address</label>
                      <input
                        type="text"
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none"}}
                        aria-label="First name"
                      />
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Mobile Number</label>
                      <input
                        type="text"
                        class="form-control no-outline "
                        style={{ backgroundColor: "whitesmoke", borderColor:"none" }}
                        aria-label="First name"
                      />
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Owner Name</label>
                      <input
                        type="text"
                        class="form-control no-outline"
                        style={{ backgroundColor: "whitesmoke", borderColor:"none"}}
                        aria-label="Last name"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* OTP */}
          <div className="container d-flex w-100 pb-3 pt-4">
            <div className="row">
              <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 ">
                <div>
                  Our Area Inspector will visit your property, take
                  measurements, and then proceed to levy tax.
                </div>
              </div>
              <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 py-3">
                <button className="clear">Clear</button>
              </div>
              <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 py-3">
                <button className="get-otp">Get OTP</button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
