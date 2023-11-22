import React from 'react'
import { FaBell, FaRegCircle, FaGlobe } from "react-icons/fa";

export default function Header() {
  return (
    <div>
         <div className="navbar d-flex justify-content-end">
            <div className="nav-right d-flex align-items-center">
              <div className="icon-container d-flex align-items-center p-3">
                <FaBell className="icon" />
              </div>
              <div className="icon-container d-flex align-items-center p-3">
                Profile Name
                <FaRegCircle className="icon" />
              </div>
              <div className="icon-container d-flex align-items-center p-3">
                English
                <FaGlobe className="icon" />
              </div>
            </div>
          </div>
          <hr />
    </div>
  )
}
