import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../Style/Header-style.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Header() {

  const adminName = localStorage.getItem("email");
  let[logOutVisibility,setLogOutVisibility]=useState(false);


  let navigate=useNavigate();

  function handleLogOut()
  {
      localStorage.removeItem("authToken");
      navigate("/");
  }

  return (
    <div>
      {/* Search */}
      <div className="container d-flex w-100">
        <div className="row w-100 d-flex header-content">
          {/* Right side (Profile content) */}
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 pb-0 pt-0 ">
            <div className="nav-right d-flex align-items-center justify-content-end  position-relative">
              <div className="icon-container d-flex align-items-center pe-2">
                <FaBell className="icon" />
              </div>
              <div className="icon-container d-flex align-items-center ps-2">
                {adminName}
                <IoPersonSharp />
                {(!logOutVisibility)?<FaAngleDown className="icon" style={{cursor:'pointer'}} onClick={()=>{setLogOutVisibility(!logOutVisibility)}}/>
                :<FaAngleUp className="icon" style={{cursor:'pointer'}} onClick={()=>{setLogOutVisibility(!logOutVisibility)}}/>}
              </div>
              <div className={(logOutVisibility)?'bg-light logout-home-container logout-home-container-visible':'bg-light logout-home-container'} >
                 
                 <div className='d-flex align-items-center home-box ' style={{gap:'0.9em'}} >
                   <FontAwesomeIcon icon={faHouse} style={{color: "#1E90FF",}} />
                   <Link to='/Home' className="text-decoration-none home-link" >Home</Link>
                 </div> 

                 <div className='d-flex align-items-center logout-box ' style={{gap:'0.9em'}} > 
                   <FontAwesomeIcon icon={faRightFromBracket} rotation={180} style={{color: "#1E90FF",}}  />
                   <span onClick={()=>{handleLogOut()}} className="text-decoration-none p-0 logout-link">Log out</span>
                 </div> 
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}
