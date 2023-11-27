import React from "react";
import { FaBell, FaRegCircle, FaGlobe } from "react-icons/fa";
// import { ImSearch } from "react-icons/im";

export default function Header() {

  const adminName = localStorage.getItem("membersData");

  return (
    <div>
      {/* Search */}
      <div className="container d-flex w-100">
        <div className="row w-100 py-1 px-3 d-flex justify-content-center align-items-center">
          {/* Left side (Search) */}
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className="row">
               {/* <ImSearch
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              /> */}
              <input
                type="search"
                placeholder="Search Your Needs"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "15px",
                  outline: "none",
                  border: "none",
                  backgroundColor: "whitesmoke",
                }}
              />
             
            </div>
          </div>

          {/* Right side (Profile content) */}
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 d-flex justify-content-center pb-0 pt-0">
            <div className="nav-right d-flex align-items-center">
              <div className="icon-container d-flex align-items-center p-3">
                <FaBell className="icon" />
              </div>
              <div className="icon-container d-flex align-items-center p-3">
                {adminName}
                <FaRegCircle className="icon" />
              </div>
              {/* <div className="icon-container d-flex align-items-center p-3">
                English
                <FaGlobe className="icon" />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}
