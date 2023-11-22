// Sidebar.js
import React, { useState, useEffect } from "react";
import "../Style/sidebar.css";
import { IoTicketSharp } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { MdOutlineDesignServices } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  const menuBtnChange = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 767) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [windowWidth]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo_details">
        <i class="bx bxs-dashboard"></i>
        <div className="logo_name">BPCL</div>
        <i
          className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
          id="btn"
          onClick={menuBtnChange}
        ></i>
      </div>
      <ul className="nav-list">
        {/* <li>
          <i className="bx bx-search"></i>
          <input type="text" placeholder="Search..." />
          <span className="tooltip">Search</span>
        </li> */}
        <li>
          <Link to="/Home" className="link">
            <i className="bx bx-home"></i>
            <span className="link_name">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Link to="/services" className="link">
            <i>
              <MdOutlineDesignServices />
            </i>
            <span className="link_name">Services</span>
          </Link>
          <span className="tooltip">Services</span>
        </li>
        <li>
          <Link to="/quick-links" className="link">
            <i className="bx bx-link"></i>
            <span className="link_name">Quick Links</span>
          </Link>
          <span className="tooltip">Quick Links</span>
        </li>
        <li>
          <Link to="/tickets" className="link">
            <i>
              <IoTicketSharp />
            </i>
            <span className="link_name">Tickets</span>
          </Link>
          <span className="tooltip">Tickets</span>
        </li>
        <li>
          <Link to="/about" className="link">
            <i>
              <FcAbout style={{ color: "white" }} />
            </i>
            <span className="link_name">About</span>
          </Link>
          <span className="tooltip">About</span>
        </li>

        <li className="profile">
          <div className="profile_details">
            {/* <img src="" alt="profile image" /> */}
            <div className="profile_content">
              <div className="name">Suraj Tapase</div>
              <div className="designation">Admin</div>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out" onClick={handleLogout}></i>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
