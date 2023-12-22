import React from "react";
import Header from "../components/Header";
import Sidebar from "./Sidebar";
import UnderDev from "../Images/220880-P1KV8M-746.jpg"

export default function Under_Development() {
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container d-flex text-start w-100 pb-1 ms-0 ps-0">
           
            <div>
              <h3 style={{ fontWeight: "bold", color: "#3498db" }}>
                Under Development...
              </h3>
              <p style={{ color: "#777" }}>
                This page is currently under development. Please check back
                later for updates.
              </p>
            </div>
          </div>
          <div className="container d-flex justify-content-center align-items-center py-3">
          <img
              src={UnderDev}
              alt="Under Development"
            />
          </div>
        </div>
      </div>
    </>
  );
}
