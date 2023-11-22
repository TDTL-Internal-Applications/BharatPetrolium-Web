import React from "react";
import Sidebar from "./Sidebar";
import { FaClipboardList, FaFileSignature } from "react-icons/fa";

import { MdCollectionsBookmark } from "react-icons/md";
import { BiTransferAlt } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { GiTakeMyMoney } from "react-icons/gi";
import { ImSearch } from "react-icons/im";
import "../Style/Dashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />

          {/* Search */}
          <div className="containter">
            <div className="row py-1 px-3 d-flex justify-content-center">
              <div className="col-12">
                <input
                  type="search"
                  placeholder="Search here anything..."
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "15px",
                    outline: "none",
                    border: "none",
                    backgroundColor: "whitesmoke",
                  }}
                />
                <ImSearch
                  style={{
                    position: "absolute",
                    right: "40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Components row 1*/}
          <div className="p-3">
            <div class="row py-1 component-1">
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="/assesment-of-property">
                  <div
                    class="col "
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "3rem",
                      paddingBottom: "3rem",
                      border: "4px solid white",
                      cursor: "pointer",
                    }}
                  >
                    <FaClipboardList
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
                      Assesment of
                      <br /> Property
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="/collection">
                  <div
                    class="col"
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "4rem",
                      paddingBottom: "4rem",
                    }}
                  >
                    <MdCollectionsBookmark
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
                      Collection
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="/title-transfer-of-property">
                  <div
                    class="col"
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "3rem",
                      paddingBottom: "3rem",
                    }}
                  >
                    <BiTransferAlt
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
                      Title Transfer of
                      <br /> Property
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Components row 2*/}
            <div class="row py-1 component-2">
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="/new-member-registration">
                  <div
                    class="col"
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "3rem",
                      paddingBottom: "3rem",
                      border: "4px solid white",
                    }}
                  >
                    <CgFileDocument
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
                      {/* Property
                      <br /> Tax Report */}
                      New Member<br/>
                      Registration
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="/register-members">
                  <div
                    class="col"
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "4rem",
                      paddingBottom: "4rem",
                    }}
                  >
                    <FaFileSignature
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
                    Registered Members List
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="/employee-registration">
                  <div
                    class="col"
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "3rem",
                      paddingBottom: "3rem",
                    }}
                  >
                    <GiTakeMyMoney
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
                      Employee- <br /> Registration
                     
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
// style={{paddingTop:"10px", paddingLeft:"1rem", paddingBottom:"1rem",paddingRight:"1rem"}}
