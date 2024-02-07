import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import "../Style/collection.css";
import Footer from "../components/Footer";

export default function Collection() {
  const [propertyType, setPropertyType] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [pethId, setPethId] = useState("");
  const [accountNo, setAccountNo] = useState("");

  const clearFields = () => {
    setPropertyType("");
    setSectionId("");
    setPethId("");
    setAccountNo("");
  };

  const handlePropertyTypeChange = (e) => setPropertyType(e.target.value);
  const handleSectionIdChange = (e) => setSectionId(e.target.value);
  const handlePethIdChange = (e) => setPethId(e.target.value);
  const handleAccountNoChange = (e) => setAccountNo(e.target.value);

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-2">
            <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Collection <MdOutlineKeyboardArrowDown />
            </h2>
          </div>
          {/* Section 1 */}
          <div className="container d-flex justify-content-center">
      <div className="row w-100">
        <div
          className="col-12 py-3"
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: "20px",
            textAlign: "start",
          }}
        >
          <h4 style={{ fontWeight: "bold" }}>Property Tax Dues Details</h4>
          <div className="row d-flex align-items-center py-3">
            <div className="col-lg-4 col-md-12 col-sm-12 pt-2 ps-2">
              <label htmlFor="propertyType" style={{ paddingLeft: "5px" }}>
                Property Type
              </label>
              <input
                type="text"
                id="propertyType"
                value={propertyType}
                onChange={handlePropertyTypeChange}
                className="form-control no-outline no-outline"
                style={{
                  backgroundColor: "white",
                  borderColor: "none",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pt-2">
              <label htmlFor="sectionId" style={{ paddingLeft: "5px" }}>
                Section ID
              </label>
              <input
                type="text"
                id="sectionId"
                value={sectionId}
                onChange={handleSectionIdChange}
                className="form-control no-outline no-outline"
                style={{
                  backgroundColor: "white",
                  borderColor: "none",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pt-2">
              <label htmlFor="pethId" style={{ paddingLeft: "5px" }}>
                Peth ID
              </label>
              <input
                type="text"
                id="pethId"
                value={pethId}
                onChange={handlePethIdChange}
                className="form-control no-outline no-outline"
                style={{
                  backgroundColor: "white",
                  borderColor: "none",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 pt-2">
              <label htmlFor="accountNo" style={{ paddingLeft: "5px" }}>
                Account No
              </label>
              <input
                type="text"
                id="accountNo"
                value={accountNo}
                onChange={handleAccountNoChange}
                className="form-control no-outline no-outline"
                style={{
                  backgroundColor: "white",
                  borderColor: "none",
                  borderRadius: "15px",
                }}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 pt-4 clear-btn">
              <button className="clear-collection" onClick={clearFields}>
                Clear
              </button>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 pt-4 otp-btn">
              <button className="get-otp-collection">Get OTP</button>
            </div>
          </div>
        </div>
      </div>
    </div>

          {/* Section 2 */}
          <div className="container d-flex justify-content-center pt-4">
            <div
              className="row w-100 py-3"
              style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
            >
              <div
                class="col-lg-6 col-md-12 scrollbar col-sm-12 d-flex justify-content-center text-start align-items-center scrollspy-example overflow-auto"
                data-spy="scroll"
                data-target="#list-example"
                data-offset="0"
              >
                <form className="Property-owner-form">
                  <div
                    className="d-flex justify-content-center py-3 text-center"
                    style={{
                      color: "dodgerblue",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Property Owner Details
                  </div>
                  <div class="form-group row">
                    <label
                      for="text"
                      class="col-sm-3 col-form-label text-start"
                    >
                      Name
                    </label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control no-outline" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-3 col-form-label">
                      Ward
                    </label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control no-outline" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-3 col-form-label">
                      Address
                    </label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control no-outline" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-3 col-form-label">
                      Previos Owner
                    </label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control no-outline" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-3 col-form-label">
                      Another field
                    </label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control no-outline" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center text-start ">
                <form
                  style={{
                    paddingTop: "10px",
                    textAlign: "start",
                    fontWeight: "bold",
                  }}
                >
                  <div
                    className="d-flex justify-content-center pt-0 pb-3 text-center"
                    style={{
                      color: "dodgerblue",
                      fontWeight: "bold",
                      fontSize: "22px",
                    }}
                  >
                    Property Dues Details
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-6 col-form-label">
                      I want to Pay:
                    </label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control no-outline" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-6 col-form-label">
                      Applicant Mobile No:
                    </label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control no-outline" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-6 col-form-label">
                      Applicantmail Id:
                    </label>
                    <div class="col-sm-6">
                      <input type="text" class="form-control no-outline" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="text" class="col-sm-6 col-form-label">
                      Select Payment Mode:
                    </label>
                    <div class="col-sm-6">
                      <select type="text" class="form-control no-outline">
                        <option></option>
                        <option>UPI</option>
                        <option>Net Banking</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
}
