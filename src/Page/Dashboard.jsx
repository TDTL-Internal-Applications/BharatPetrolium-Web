import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { TbBuildingBank } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import "../Style/Dashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Chart from "../Page/Chart";
import { IoPersonSharp } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";
import loan_img from "../Images/money-bag_3149899.png"
import neft_img from "../Images/bank-transfer_4140803.png"
import share_img from "../Images/contribution_5431386.png"


export default function Dashboard() {
  const [data, setData] = useState({
    totalMembers: 0,
  withdrawalCount: 0,
  depositCount: 0,
  depositAmount: 0,
  withdrawalAmount: 0,
  });

  const userRole = localStorage.getItem("role_name");
  const adminName = localStorage.getItem("name");

  useEffect(() => {
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/Member_dashboard/")
      .then((response) => {
        console.log("Response from API:", response.data);
        setData({
          totalMembers: response.data.countMembers[0]["count(member_id)"],
          withdrawalCount: response.data.WithdrawalCount,
          depositCount: response.data.DepositCount,
          depositAmount: response.data.DepositAmount,
          withdrawalAmount: response.data.WithdrawalAmount,
        });
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  return ( 
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area dashboard-area-2 d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />

          {userRole === "Admin" && (
            <>
              <div className="p-3">
                <div className="row py-1 component-2">
                  <div
                    className="col-lg-4 col-md-6 col-sm-12 py-1"
                    style={{ border: "4px solid white" }}
                  >
                    <Link to="">
                      <div
                        className="col"
                        style={{
                          outline: "4px solid #0d6efd",
                          borderRadius: "10px",
                          paddingTop: "1.8rem",
                          paddingBottom: "1.8rem",
                          border: "4px solid white",
                          height:"11rem",

                        }}
                      >
                        <IoPersonSharp
                          className="component-icon py-1"
                          style={{ fontSize: "4rem" }}
                        />
                        <span
                          className="custom-span"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Total Members
                          <br />
                          {data.totalMembers}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div
                    className="col-lg-4 col-md-6 col-sm-12 py-1"
                    style={{ border: "4px solid white" }}
                  >
                    <Link to="">
                      <div
                        className="col"
                        style={{
                          outline: "4px solid #0d6efd",
                          borderRadius: "10px",
                          paddingTop: "2rem",
                          paddingBottom: "2rem",
                          height:"11rem"
                        }}
                      >
                        <BiMoneyWithdraw
                          className="component-icon py-1"
                          style={{ fontSize: "4rem" }}
                        />
                        <span
                          className="custom-span"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Today's Withdrawal <br /> {data.withdrawalAmount}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div
                    className="col-lg-4 col-md-6 col-sm-12 py-1"
                    style={{ border: "4px solid white" }}
                  >
                    <Link to="">
                      <div
                        className="col"
                        style={{
                          outline: "4px solid #0d6efd",
                          borderRadius: "10px",
                          paddingTop: "2rem",
                          paddingBottom: "2rem",
                          height:"11rem"
                        }}
                      >
                        <TbBuildingBank
                          className="component-icon py-1"
                          style={{ fontSize: "4rem" }}
                        />
                        <span
                          className="custom-span"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Today's Deposits
                          <br /> {data.depositAmount}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="pt-2 chart">
                  <Chart />
                </div>
              </div>
            

              
            </>
          )}
          {userRole === "Member" && (
            <>
              <h4 className="text-start" style={{ color: "dodgerblue" }}>
                Hello, {adminName}!
              </h4>
              <div className="row py-3">
                <div
                  className="col-lg-3 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/members-bank-details">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3rem",
                        paddingBottom: "3rem",
                        border: "4px solid white",
                      }}
                    >
                      <IoPersonSharp
                        className="component-icon py-1"
                        style={{ fontSize: "4rem" }}
                      />
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Bank Details
                      </span>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-3 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/members-nominee-details">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3.3rem",
                        paddingBottom: "3.3rem",
                        
                      }}
                    >
                      <BiMoneyWithdraw
                        className="component-icon py-1"
                        style={{ fontSize: "4rem" }}
                      />
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Nominee
                      </span>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-3 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/members-bank-balance">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3.3rem",
                        paddingBottom: "3.3rem",
                      }}
                    >
                      <TbBuildingBank
                        className="component-icon py-1"
                        style={{ fontSize: "4rem" }}
                      />
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Balance
                      </span>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-3 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/profile">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3rem",
                        paddingBottom: "3rem",
                        border: "4px solid white",
                      }}
                    >
                      <IoPersonSharp
                        className="component-icon py-1"
                        style={{ fontSize: "4rem" }}
                      />
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Profile
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
             
            </>
          )}
          {userRole === "Branch Manager" && (
            <>
              <h4 className="text-start" style={{ color: "dodgerblue" }}>
                Hello, {adminName}!
              </h4>
              <div className="row py-3">
                <div
                  className="col-lg-4 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/loan-approvals">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3rem",
                        paddingBottom: "3rem",
                        border: "4px solid white",
                      }}
                    >
                      <img src={loan_img} alt=""/>
                      
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Loan Approvals&nbsp;<FcApproval/>
                      </span>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-4 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/shares-approvals">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3.3rem",
                        paddingBottom: "3.3rem",
                      }}
                    >
                      <img src={share_img} alt=""/>
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Share Approvals&nbsp;<FcApproval/>
                      </span>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-4 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/neft-approvals">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3.3rem",
                        paddingBottom: "3.3rem",
                      }}
                    >
                     <img src={neft_img} alt=""/>
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        NEFT Approvals&nbsp;<FcApproval/>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
             
            </>
          )}
          {userRole === "Trustee" && (
            <>
              <h4 className="text-start" style={{ color: "dodgerblue" }}>
                Hello, {adminName}!
              </h4>
              <div className="row py-3">
                <div
                  className="col-lg-4 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/final-loan-approvals">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3rem",
                        paddingBottom: "3rem",
                        border: "4px solid white",
                      }}
                    >
                      <img src={loan_img} alt=""/>
                      
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Loan Approvals&nbsp;<FcApproval/>
                      </span>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-4 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/final-share-approvals">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3.3rem",
                        paddingBottom: "3.3rem",
                      }}
                    >
                      <img src={share_img} alt=""/>
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Share Approvals&nbsp;<FcApproval/>
                      </span>
                    </div>
                  </Link>
                </div>
                <div
                  className="col-lg-4 col-md-6 col-sm-12 py-1"
                  style={{ border: "4px solid white" }}
                >
                  <Link to="/final-neft-approvals">
                    <div
                      className="col"
                      style={{
                        outline: "4px solid #0d6efd",
                        borderRadius: "10px",
                        paddingTop: "3.3rem",
                        paddingBottom: "3.3rem",
                      }}
                    >
                     <img src={neft_img} alt=""/>
                      <span
                        className="custom-span"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        NEFT Approvals&nbsp;<FcApproval/>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
             
            </>
          )}
        </div>
      </div>
      <footer>
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content d-flex align-items-center ps-4 pe-4 pb-0 pt-0">
         <Footer/>
        </div>
      </div>
      </footer>
   
    </>
  );
}
