import React, { useState, useEffect } from "react";
import "../Style/sidebar.css";
import { SiMoneygram } from "react-icons/si";
import { FaWallet } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { RiLuggageDepositLine } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import Logo from "../Images/LOGO.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const adminName = localStorage.getItem("name");
  const userRole = localStorage.getItem("role_name");
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
    setIsOpen(true);
  };

  const toggleSubmenus = () => {
    setShowSubmenus(!showSubmenus);
    setShowLoanSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(false);
    setIsOpen(true);
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
    setIsOpen(true);
  };

  const toggleDepositmenus = () => {
    setShowDepositmenus(!showDepositmenus);
    setShowSubmenus(false);
    setShowLoanSubmenus(false);
    setShowMemberSubmenus(false);
    setIsOpen(true);
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

  const renderDropdownIcon = (shouldRender) => {
    if (!shouldRender) return null;
    return <FaAngleDown />;
  };

  console.log("User Role:", {adminName});

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo_details">
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
      {userRole === "Admin" && (
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
              <i
                className={`dropdown-icon ${showMemberSubmenus ? "open" : ""}`}
              >
                {renderDropdownIcon(isOpen)}
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
                <li>
                  <Link to="/purchase-shares" className="submenu link">
                    <div className="ps-2">Shareholder Members</div>
                  </Link>
                </li>
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
                {renderDropdownIcon(isOpen)}
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
                {renderDropdownIcon(isOpen)}
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
                {renderDropdownIcon(isOpen)}
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
          <li>
            <Link to="/loan-interest" className="link">
              <i>
                <RiAdminLine />
              </i>
              <span className="link_name">Administrator</span>
            </Link>
            <span className="tooltip">Administrator</span>
          </li>
         
        </ul>
      )}

      {userRole === "Member" && (
        <ul className="nav-list">
          <li>
            <Link to="/Home" className="link">
              <i className="bx bx-home"></i>
              <span className="link_name">Home</span>
            </Link>
            <span className="tooltip">Home</span>
          </li>
          <li>
            <Link to="/profile" className="link">
              <i className="bx bx-user"></i>
              <span className="link_name">Profile</span>
            </Link>
            <span className="tooltip">Profile</span>
          </li>
          <li onClick={stopPropagation}>
            <Link to="" className="link" onClick={toggleDepositmenus}>
              <i>
                <RiLuggageDepositLine />
              </i>
              <span className="link_name">Deposits</span>
              <i className={`dropdown-icon ${showDepositmenus ? "open" : ""}`}>
                {renderDropdownIcon(isOpen)}
              </i>
            </Link>
            <span className="tooltip">Deposits</span>

            {showDepositmenus && (
              <ul>
                <li>
                  <Link to="/fd" className="submenu link">
                    <div className="ps-2">Fixed Deposit</div>
                  </Link>
                </li>
                <li>
                  <Link to="/member-rd" className="submenu link">
                    <div className="ps-2">Recurring Deposit</div>
                  </Link>
                </li>
                <li>
                  <Link to="/cash-certificate" className="submenu link">
                    <div className="ps-2">Cash Certificate</div>
                  </Link>
                </li>
                <li>
                  <Link to="/daam-duppat" className="submenu link">
                    <div className="ps-2">Daam Duppat</div>
                  </Link>
                </li>
                <li>
                  <Link to="/ek-lakh" className="submenu link">
                    <div className="ps-2">Ek Laskh Yojana</div>
                  </Link>
                </li>
                <li>
                  <Link to="/lakhpati-yojana" className="submenu link">
                    <div className="ps-2">Lakhpati Yojana</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/shares" className="link">
              <i>
                <SiMoneygram />
              </i>
              <span className="link_name">Shares</span>
            </Link>
            <span className="tooltip">Shares</span>
          </li>
          <li onClick={stopPropagationloan}>
            <Link to="" className="link" onClick={toggleLoanSubmenus}>
              <i>
                <GiReceiveMoney />
              </i>
              <span className="link_name">Loans</span>
              <i className={`dropdown-icon ${showLoanSubmenus ? "open" : ""}`}>
                {renderDropdownIcon(isOpen)}
              </i>
            </Link>
            <span className="tooltip">Loans</span>

            {/* Submenus for Loans */}
            {showLoanSubmenus && (
              <ul>
                <li>
                  <Link to="/medium-term-loan" className="submenu link">
                    <div className="ps-2">Medium Term</div>
                  </Link>
                </li>
                <li>
                  <Link to="/emergency-loan" className="submenu link">
                    <div className="ps-2">Emergency Loan</div>
                  </Link>
                </li>
                <li>
                  <Link to="/deposit-loan" className="submenu link">
                    <div className="ps-2">Deposit</div>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
        </ul>
      )}
       <li className="profile">
            <div className="profile_details">
              <div className="profile_content">
                <div className="name">{adminName}</div>
                <div className="designation">{userRole}</div>
              </div>
            </div>
            <i
              className="bx bx-log-out"
              id="log_out"
              onClick={handleLogout}
            ></i>
          </li>
    </div>
  );
};

export default Sidebar;
