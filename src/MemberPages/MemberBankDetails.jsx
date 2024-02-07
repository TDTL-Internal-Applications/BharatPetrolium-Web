import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import "../Style/memberbankdetails.css"

export default function MemberBankDetails() {
  const [bankDetails, setBankDetails] = useState({});
  const member_id = localStorage.getItem("member_id");

  useEffect(() => {
    // Check if member_id exists in local storage
    if (!member_id) {
      console.error("Member ID not found in local storage");
      return;
    }

    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/member_bank_details/", {
        member_id: member_id,
      })
      .then((response) => {
        setBankDetails(response.data.bank_details);
      })
      .catch((error) => {
        console.error("Error fetching member bank details:", error);
      });
  }, [member_id]);

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container-fluid ps-0 d-flex text-start w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-6 text-start">
                <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Member Bank Details
                </h3>
              </div>
            </div>
          </div>
          <div className="container d-flex justify-content-start py-3">
            <div className="">
              {Object.keys(bankDetails).length > 0 ? (
                <div className="member-bank-details-container row w-100 text-start ">
                  <div className="col-lg-4 col-md-6 col-sm-12 py-2">Member Name:</div>
                  <div className="col-lg-8 col-md-6 col-sm-12 py-2">{bankDetails.member_name}</div>
                  <div className="col-lg-4 col-md-6 col-sm-12 py-2">Bank Name:</div>
                  <div className="col-lg-8 col-md-6 col-sm-12 py-2">{bankDetails.bank_name}</div>
                  <div className="col-lg-4 col-md-6 col-sm-12 py-2">Branch Name:</div>
                  <div className="col-lg-8 col-md-6 col-sm-12 py-2">{bankDetails.branch_name}</div>
                  <div className="col-lg-4 col-md-6 col-sm-12 py-2">IFSC Code:</div>
                  <div className="col-lg-8 col-md-6 col-sm-12 py-2">{bankDetails.IFSC_code}</div>
                  <div className="col-lg-4 col-md-6 col-sm-12 py-2">MICR No:</div>
                  <div className="col-lg-8 col-md-6 col-sm-12 py-2">{bankDetails.MICR_no}</div>
                </div>
              ) : (
                <p className="no-details-message">
                  No bank details found for the Member... 
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
