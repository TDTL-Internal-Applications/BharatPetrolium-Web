import React, { useState, useEffect } from "react";
import "../Style/sidebar.css";
import { SiMoneygram } from "react-icons/si";
import { FaWallet } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { RiLuggageDepositLine } from "react-icons/ri";
import Logo from "../Images/LOGO.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const adminName = localStorage.getItem("membersData");
  const navigate = useNavigate();
  const [showSubmenus, setShowSubmenus] = useState(false);
  const [showMemberSubmenus, setShowMemberSubmenus] = useState(false);
  const [showLoanSubmenus, setShowLoanSubmenus] = useState(false);
  const [showDepositmenus, setShowDepositmenus] = useState(false);

  const toggleMemberSubmenus = () => {
    setShowMemberSubmenus(!showMemberSubmenus);
    setShowSubmenus(false);
    setShowLoanSubmenus(false);
    setShowDepositmenus(false);
  };

  const toggleSubmenus = () => {
    setShowSubmenus(!showSubmenus);
    setShowLoanSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(false);
  };

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
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const closeSubmenus = () => {
    setShowSubmenus(false);
    setShowLoanSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(false);
  };
  const toggleLoanSubmenus = () => {
    setShowLoanSubmenus(!showLoanSubmenus);
    setShowSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(false);
  };

  const toggleDepositmenus = () => {
    setShowDepositmenus(!showDepositmenus);
    setShowSubmenus(false);
    setShowLoanSubmenus(false);
    setShowMemberSubmenus(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeSubmenus);

    return () => {
      document.removeEventListener("click", closeSubmenus);
    };
  }, []);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  const stopPropagationloan = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo_details">
        {/* <i class="bx bxs-dashboard"></i> */}
        {/* <div className="logo_name">BPCL</div> */}
        <img
          className="sidebar-logo"
          src={Logo}
          alt="logo"
          style={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "8rem" : "0",
            transition: "opacity 0.3s ease, height 0.3s ease",
          }}
        />
        <i
          className={`bx ${isOpen ? "bx-menu-alt-right" : "bx-menu"}`}
          id="btn"
          onClick={menuBtnChange}
        ></i>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/Home" className="link">
            <i className="bx bx-home"></i>
            <span className="link_name">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li onClick={stopPropagation}>
          <Link to="" className="link" onClick={toggleMemberSubmenus}>
            <i>
              <BsPersonSquare />
            </i>
            <span className="link_name">Members</span>
            <i className={`dropdown-icon ${showMemberSubmenus ? "open" : ""}`}>
              <FaAngleDown />
            </i>
          </Link>
          <span className="tooltip">Members</span>

          {showMemberSubmenus && (
            <ul>
              <li>
                <Link to="/new-member-registration" className="submenu link">
                  <div className="ps-2">Add New</div>
                </Link>
              </li>
              <li>
                <Link to="/member-list" className="submenu link">
                  <div className="ps-2">Member List</div>
                </Link>
              </li>
              {/* <li>
                <Link to="/employer-registration-form" className="submenu link">
                  <div className="ps-2">Employer Form</div>
                </Link>
              </li> */}
            </ul>
          )}
        </li>
        <li onClick={stopPropagation}>
          <Link to="" className="link" onClick={toggleDepositmenus}>
            <i>
              <RiLuggageDepositLine />
            </i>
            <span className="link_name">Deposits</span>
            <i className={`dropdown-icon ${showDepositmenus ? "open" : ""}`}>
              <FaAngleDown />
            </i>
          </Link>
          <span className="tooltip">Deposits</span>

          {showDepositmenus && (
            <ul>
              <li>
                <Link to="/term-deposit" className="submenu link">
                  <div className="ps-2">Term Deposit</div>
                </Link>
              </li>
              <li>
                <Link to="/cash-certificate-deposit" className="submenu link">
                  <div className="ps-2">Cash Certificate</div>
                </Link>
              </li>
              <li>
                <Link to="/recurring-deposit" className="submenu link">
                  <div className="ps-2">Recurring Deposit</div>
                </Link>
              </li>
              {/* Add more deposit submenu items as needed */}
            </ul>
          )}
        </li>

        <li onClick={stopPropagation}>
          <Link to="" className="link" onClick={toggleSubmenus}>
            <i>
              <FaWallet />
            </i>
            <span className="link_name">Transactions</span>
            <i className={`dropdown-icon ${showSubmenus ? "open" : ""}`}>
              <FaAngleDown />
            </i>
          </Link>
          <span className="tooltip">Transactions</span>

          {showSubmenus && (
            <ul>
              <li>
                <Link to="/new-transaction" className="submenu link ">
                  <div className="ps-2">New Transaction</div>
                </Link>
              </li>
              <li>
                <Link to="/transaction-history" className="submenu link">
                  <div className="ps-2">Transaction History</div>
                </Link>
              </li>
              {/* <li>
                <Link to="/transaction-categories" className="submenu link">
                  Transaction Categories
                </Link>
              </li> */}
            </ul>
          )}
        </li>
        <li onClick={stopPropagationloan}>
          <Link to="" className="link" onClick={toggleLoanSubmenus}>
            <i>
              <GiReceiveMoney />
            </i>
            <span className="link_name">Loans</span>
            <i className={`dropdown-icon ${showSubmenus ? "open" : ""}`}>
              <FaAngleDown />
            </i>
          </Link>
          <span className="tooltip">Loans</span>
        </li>

        {/* Submenus for Loans */}
        {showLoanSubmenus && (
          <ul>
            <li>
              <Link to="/add-new-loan" className="submenu link">
                <div className="ps-2">Add New Loan</div>
              </Link>
            </li>
            <li>
              <Link to="/loan-history" className="submenu link">
                <div className="ps-2">Loan History</div>
              </Link>
            </li>
          </ul>
        )}

        <li>
          <Link to="/loan-scheme" className="link">
            <i class="bx bxs-offer"></i>
            <span className="link_name">Scheme</span>
          </Link>
          <span className="tooltip">Scheme</span>
        </li>
        <li>
          <Link to="/share-deposit" className="link">
            <i>
              <SiMoneygram />
            </i>
            <span className="link_name">Share & Deposit</span>
          </Link>
          <span className="tooltip">Share & Deposit</span>
        </li>
        {/* <li>
          <Link to="/about" className="link">
            <i>
              <FcAbout style={{ color: "white" }} />
            </i>
            <span className="link_name">About</span>
          </Link>
          <span className="tooltip">About</span>
        </li> */}
        <li className="profile">
          <div className="profile_details">
            {/* <img src="" alt="profile image" /> */}
            <div className="profile_content">
              <div className="name">{adminName}</div>
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
