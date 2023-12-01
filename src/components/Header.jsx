import React from "react";
import { FaBell } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";

export default function Header() {

  const adminName = localStorage.getItem("email");

  return (
    <div>
      {/* Search */}
      <div className="container d-flex w-100">
        <div className="row w-100 d-flex header-content">
          {/* Right side (Profile content) */}
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 pb-0 pt-0 ">
            <div className="nav-right d-flex align-items-center justify-content-end">
              <div className="icon-container d-flex align-items-center pe-2">
                <FaBell className="icon" />
              </div>
              <div className="icon-container d-flex align-items-center ps-2">
                {adminName}
                <IoPersonSharp className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}
