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
import { IoIosBook } from "react-icons/io";
import Logo from "../Images/Credit-Logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const adminName = localStorage.getItem("name");
  const userRole = localStorage.getItem("role_name");
  const navigate = useNavigate();
  const [showRecurringDepositMenus, setShowRecurringDepositMenus] =
    useState(false);

  const [showSubmenus, setShowSubmenus] = useState(false);
  const [showMemberSubmenus, setShowMemberSubmenus] = useState(false);
  const [showLoanSubmenus, setShowLoanSubmenus] = useState(false);
  const [showDepositmenus, setShowDepositmenus] = useState(false);
  const [showTermDepositmenus, setShowTermDepositmenus] = useState(false);
  const [showLakshaDepositmenus, setShowLakshaDepositmenus] = useState(false);
  const [showDamDepositmenus, setShowDamDepositmenus] = useState(false);
  const [showLakhpatiDepositmenus, setShowLakhpatiDepositmenus] =
    useState(false);
  const [showCashmenus, setShowCashmenus] = useState(false);
  const [showLoanMenus, setShowLoanMenus] = useState(false);
  const [showMedTermLoanMenus, setShowMedTermLoanMenus] = useState(false);
  const [showEmergencyLoanMenus, setShowEmergencyLoanMenus] = useState(false);
  const [showStaffEmergencyLoanMenus, setShowStaffEmergencyLoanMenus] =
    useState(false);
  const [showStaffMedTermLoanMenus, setShowStaffMedTermLoanMenus] =
    useState(false);
  const [showMemberDetailSubmenus, setShowMemberDetailSubmenus] =
    useState(false);

  const [showShareSubmenus, setShowShareSubmenus] = useState(false);
  const [showDividendSubmenus, setShowDividendSubmenus] = useState(false);

  const toggleCashtMenus = () => {
    setShowSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(true);
    setShowTermDepositmenus(false);
    setShowRecurringDepositMenus(false);
    setShowDamDepositmenus(false);
    setShowLakhpatiDepositmenus(false);
    setShowCashmenus(!showCashmenus);
    setIsOpen(true);
    setShowLakshaDepositmenus(false);
  };

  const toggleLakhpatiDepositMenus = () => {
    setShowSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(true);
    setShowTermDepositmenus(false);
    setShowRecurringDepositMenus(false);
    setShowDamDepositmenus(false);
    setShowLakhpatiDepositmenus(!showLakhpatiDepositmenus);
    setIsOpen(true);
    setShowRecurringDepositMenus(false);
    setShowCashmenus(false);
    setShowLakshaDepositmenus(false);
  };

  const toggleDamDepositMenus = () => {
    setShowSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(true);
    setShowTermDepositmenus(false);
    setShowRecurringDepositMenus(false);
    setShowDamDepositmenus(!showDamDepositmenus);
    setIsOpen(true);
    setShowRecurringDepositMenus(false);
    setShowLakhpatiDepositmenus(false);
    setShowCashmenus(false);
    setShowLakshaDepositmenus(false);
  };

  const toggleRecurringDepositMenus = () => {
    setShowSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(true);
    setShowRecurringDepositMenus(!showRecurringDepositMenus);
    setIsOpen(true);
    // setShowTermDepositmenus(false)
    setShowCashmenus(false);
    setShowTermDepositmenus(false);
    setShowLakshaDepositmenus(false);
    setShowDamDepositmenus(false);
    setShowLakhpatiDepositmenus(false);
  };
  const toggleTermDepositMenus = () => {
    setShowSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(true);
    setShowTermDepositmenus(!showTermDepositmenus);
    setShowRecurringDepositMenus(false);
    setIsOpen(true);
    setShowRecurringDepositMenus(false);
    setShowLakshaDepositmenus(false);
    setShowLakhpatiDepositmenus(false);
    setShowDamDepositmenus(false);
    setShowCashmenus(false);
  };
  const toggleLakshaDepositMenus = () => {
    setShowSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(true);
    setShowTermDepositmenus(false);
    setShowLakshaDepositmenus(!showLakshaDepositmenus);
    setShowRecurringDepositMenus(false);
    setIsOpen(true);
    setShowRecurringDepositMenus(false);
    setShowCashmenus(false);
    setShowDamDepositmenus(false);
    setShowLakhpatiDepositmenus(false);
  };

  const toggleMemberSubmenus = () => {
    setShowMemberSubmenus(!showMemberSubmenus);
    setShowSubmenus(false);
    setShowLoanSubmenus(false);
    setShowDepositmenus(false);
    setShowLoanMenus(false);
    setShowDividendSubmenus(false);
    setIsOpen(true);
  };

  const toggleShareMenus = () => {
    setShowShareSubmenus(!showShareSubmenus);
    setShowMemberSubmenus(true);
    setShowSubmenus(false);
    setShowLoanSubmenus(false);
    setShowDepositmenus(false);
    setShowMemberDetailSubmenus(false);
    setShowDividendSubmenus(false);
    setIsOpen(true);
  };

  const toggleDividendSubmenus = () => {
    setShowDividendSubmenus(!showDividendSubmenus);
    closeSubmenus();
    setIsOpen(true);
    setShowMemberSubmenus(true);
    setShowShareSubmenus(false);
  };
  const toggleMemberDetailSubmenus = () => {
    setShowMemberDetailSubmenus(!showMemberDetailSubmenus);
    setShowShareSubmenus(false);
  };

  const toggleSubmenus = () => {
    setShowSubmenus(!showSubmenus);
    setShowLoanSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(false);
    setShowLoanMenus(false);
    setIsOpen(true);
  };
  const closeSubmenus = () => {
    setShowSubmenus(false);
    setShowLoanSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(false);
  };
  const toggleLoanSubmenus = () => {
    setShowLoanMenus(!showLoanMenus);
    setShowSubmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(false);
    setShowMemberSubmenus(false);
    setShowDepositmenus(false);
    setIsOpen(true);
  };

  const toggleDepositmenus = () => {
    setShowDepositmenus(!showDepositmenus);
    setShowSubmenus(false);
    setShowLoanSubmenus(false);
    setShowMemberSubmenus(false);
    setShowLoanMenus(false);
    setIsOpen(true);
  };

  const toggleMedTermLoanMenus = () => {
    closeSubmenus();
    setShowMedTermLoanMenus(!showMedTermLoanMenus);
    setIsOpen(true);
    setShowEmergencyLoanMenus(false);
    setShowStaffEmergencyLoanMenus(false);
    setShowStaffMedTermLoanMenus(false);
  };

  const toggleEmergencyLoanMenus = () => {
    closeSubmenus();
    setShowEmergencyLoanMenus(!showEmergencyLoanMenus);
    setIsOpen(true);
    setShowMedTermLoanMenus(false);
    setShowStaffEmergencyLoanMenus(false);
    setShowStaffMedTermLoanMenus(false);
    setShowMedTermLoanMenus(false);
  };

  const toggleStaffEmergencyLoanMenus = () => {
    closeSubmenus();
    setShowStaffEmergencyLoanMenus(!showStaffEmergencyLoanMenus);
    setIsOpen(true);
    setShowMedTermLoanMenus(false);
    setShowStaffMedTermLoanMenus(false);
    setShowEmergencyLoanMenus(false);
  };

  const toggleStaffMedTermLoanMenus = () => {
    closeSubmenus();
    setShowStaffMedTermLoanMenus(!showStaffMedTermLoanMenus);
    setIsOpen(true);
    setShowMedTermLoanMenus(false);
    setShowEmergencyLoanMenus(false);
    setShowStaffEmergencyLoanMenus(false);
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
    if (windowWidth <= 992) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [windowWidth]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
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

  const stopPropagationRecurringDeposit = (e) => {
    if (!e.target.closest(".submenu-recurring-deposit")) {
      e.stopPropagation();
    }
  };

  const renderDropdownIcon = (shouldRender) => {
    if (!shouldRender) return null;
    return <FaAngleDown />;
  };

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""}`}
      style={{ height: "260px", overflow: "auto" }}
    >
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
                  <Link
                    className="submenu link"
                    onClick={toggleMemberDetailSubmenus}
                  >
                    <div className="ps-2">Member</div>
                    <i
                      className={`dropdown-icon ${
                        showMemberDetailSubmenus ? "open" : ""
                      }`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showMemberDetailSubmenus && (
                    <ul>
                      <li>
                        <Link
                          to="/new-member-registration"
                          className="submenu link"
                        >
                          <div className="ps-1">Add New</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/member-list" className="submenu link">
                          <div className="ps-1">Member List</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/view-member-details"
                          className="submenu link"
                        >
                          <div className="ps-1">View Member</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/kyc-update" className="submenu link">
                          <div className="ps-1 text-start">KYC Update</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/bank-details-update" className="submenu link">
                          <div className="ps-1 text-start">Bank Details Update</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/member-settlement-account-receipt" className="submenu link">
                          <div className="ps-1 text-start">Settlement A/c Receipt</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/member-saving-deposit-receipt-payment-entry" className="submenu link">
                          <div className="ps-1 text-start">Saving Deposit Reciept</div>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                {/* New Shareholder Option */}
                <li>
                  <Link className="submenu link" onClick={toggleShareMenus}>
                    <div className="ps-2">Shareholder</div>
                    <i
                      className={`dropdown-icon ${
                        showShareSubmenus ? "open" : ""
                      }`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showShareSubmenus && (
                    <ul>
                      <li>
                        <Link to="/I-form" className="submenu link">
                          <div className="ps-1">I Form</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/J-form" className="submenu link">
                          <div className="ps-1">J Form</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/shareholder-list" className="submenu link">
                          <div className="ps-1">All Balance Book</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/purchase-shares" className="submenu link">
                          <div className="ps-1">Purchase Share</div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/cumulative-receipt-payment-entries" className="submenu link">
                          <div className="ps-1 text-start">Cumulative Receipt & Payment Entries</div>
                        </Link>
                      </li>
                    
                    </ul>
                  )}
                </li>

                <li>
                  <Link
                    className="submenu link"
                    onClick={toggleDividendSubmenus}
                  >
                    <div className="ps-2">Divident</div>
                    <i
                      className={`dropdown-icon ${
                        showDividendSubmenus ? "open" : ""
                      }`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showDividendSubmenus && (
                    <ul>
                      <li>
                        <Link to="/divident-payment" className="submenu link">
                          <div className="ps-1">Payment</div>
                        </Link>
                      </li>
                      {/* Add more submenu items as needed */}
                    </ul>
                  )}
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
                <li
                  onClick={stopPropagationRecurringDeposit}
                  className="submenu-recurring-deposit"
                >
                  <Link
                    to=""
                    className="submenu link"
                    onClick={toggleTermDepositMenus}
                  >
                    <div className="ps-2">Term Deposit</div>
                    <i
                      className={`dropdown-icon ${
                        toggleTermDepositMenus ? "open" : ""
                      }`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showTermDepositmenus && (
                    <ul>
                      <li>
                        <Link to="/term-deposit/new" className="submenu link">
                          <div className="ps-2">New </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/term-deposit/renew" className="submenu link">
                          <div className="ps-2">Renew</div>
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/term-deposit/payment"
                          className="submenu link"
                        >
                          <div className="ps-2">Payment</div>
                        </Link>
                      </li> */}
                      <li>
                        <Link to="/term-deposit/view" className="submenu link">
                          <div className="ps-2">View</div>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onClick={stopPropagationRecurringDeposit}
                  className="submenu-recurring-deposit"
                >
                  <Link
                    to=""
                    className="submenu link"
                    onClick={toggleLakshaDepositMenus}
                  >
                    <div className="ps-2">Ek Laksha Yojana </div>
                    <i
                      className={`dropdown-icon ${
                        showLakshaDepositmenus ? "open" : ""
                      }`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showLakshaDepositmenus && (
                    <ul>
                      <li>
                        <Link to="/ek-laksha/new" className="submenu link">
                          <div className="ps-2">New </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/ek-laksha/renew" className="submenu link">
                          <div className="ps-2">Renew</div>
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="/ek-lakshya/payment" className="submenu link">
                          <div className="ps-2">Payment</div>
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/ek-laksha-yojana/view"
                          className="submenu link"
                        >
                          <div className="ps-2">View</div>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onClick={stopPropagationRecurringDeposit}
                  className="submenu-recurring-deposit"
                >
                  <Link
                    to=""
                    className="submenu link"
                    onClick={toggleDamDepositMenus}
                  >
                    <div className="ps-2">Dam Duppat </div>
                    <i
                      className={`dropdown-icon ${
                        showDamDepositmenus ? "open" : ""
                      }`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showDamDepositmenus && (
                    <ul>
                      <li>
                        <Link to="/dam-duppat/new" className="submenu link">
                          <div className="ps-2">New </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/dam-duppat/renew" className="submenu link">
                          <div className="ps-2">Renew</div>
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="/dam-duppat/payment" className="submenu link">
                          <div className="ps-2">Payment</div>
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/dam-duppat-yojana/view"
                          className="submenu link"
                        >
                          <div className="ps-2">View</div>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onClick={stopPropagationRecurringDeposit}
                  className="submenu-recurring-deposit"
                >
                  <Link
                    to=""
                    className="submenu link"
                    onClick={toggleLakhpatiDepositMenus}
                  >
                    <div className="ps-2">Lakhpati Yojana</div>
                    <i
                      className={`dropdown-icon ${
                        showLakhpatiDepositmenus ? "open" : ""
                      }`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showLakhpatiDepositmenus && (
                    <ul>
                      <li>
                        <Link to="/lakhpati/new" className="submenu link">
                          <div className="ps-2">New </div>
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="/lakhpati/payment" className="submenu link">
                          <div className="ps-2">Payment </div>
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/lakhpati-deposit/view"
                          className="submenu link"
                        >
                          <div className="ps-2">View</div>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onClick={stopPropagationRecurringDeposit}
                  className="submenu-recurring-deposit"
                >
                  <Link
                    to=""
                    className="submenu link"
                    onClick={toggleCashtMenus}
                  >
                    <div className="ps-2">Cash Certificate</div>
                    <i
                      className={`dropdown-icon ${showCashmenus ? "open" : ""}`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showCashmenus && (
                    <ul>
                      <li>
                        <Link
                          to="/cash-certificate/new"
                          className="submenu link"
                        >
                          <div className="ps-2">New </div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/cash-certificate/renew"
                          className="submenu link"
                        >
                          <div className="ps-2">Renew</div>
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/cash-certificate/payment"
                          className="submenu link"
                        >
                          <div className="ps-2">Payment</div>
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          to="/cash-certificate-deposit/view"
                          className="submenu link"
                        >
                          <div className="ps-2">View</div>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li
                  onClick={stopPropagationRecurringDeposit}
                  className="submenu-recurring-deposit"
                >
                  <Link
                    to=""
                    className="submenu link"
                    onClick={toggleRecurringDepositMenus}
                  >
                    <div className="ps-2">Recurring </div>
                    <i
                      className={`dropdown-icon ${
                        showRecurringDepositMenus ? "open" : ""
                      }`}
                    >
                      {renderDropdownIcon(isOpen)}
                    </i>
                  </Link>

                  {showRecurringDepositMenus && (
                    <ul>
                      <li>
                        <Link
                          to="/recurring-deposit/new"
                          className="submenu link"
                        >
                          <div className="ps-2">New RD</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/recurring-deposit/payment"
                          className="submenu link"
                        >
                          <div className="ps-2">Payment</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/recurring-deposit/view"
                          className="submenu link"
                        >
                          <div className="ps-2">View</div>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          <li onClick={stopPropagation}>
            <Link to="" className="link" onClick={toggleSubmenus}>
              <i>
                <FaWallet />
              </i>
              <span className="link_name">Accounts</span>
              <i className={`dropdown-icon ${showSubmenus ? "open" : ""}`}>
                {renderDropdownIcon(isOpen)}
              </i>
            </Link>
            <span className="tooltip">Accounts</span>

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
          {showLoanMenus && (
            <ul>
              <li onClick={stopPropagation} className="submenu-loan">
                <Link
                  to=""
                  className="submenu link"
                  onClick={toggleMedTermLoanMenus}
                >
                  <div className="ps-2">Med Term Loan</div>
                  <i
                    className={`dropdown-icon ${
                      showMedTermLoanMenus ? "open" : ""
                    }`}
                  >
                    {renderDropdownIcon(isOpen)}
                  </i>
                </Link>

                {showMedTermLoanMenus && (
                  <ul>
                    <li>
                      <Link to="/medium-term-loan" className="submenu link">
                        <div className="ps-2">Med Term Loan</div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/new-medium-term-loan" className="submenu link">
                        <div className="ps-2">New Med Term</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/view-medium-term-loan"
                        className="submenu link"
                      >
                        <div className="ps-2">View Med Term</div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li onClick={stopPropagation} className="submenu-loan">
                <Link
                  to=""
                  className="submenu link"
                  onClick={toggleEmergencyLoanMenus}
                >
                  <div className="ps-2">Emergency Loan</div>
                  <i
                    className={`dropdown-icon ${
                      showEmergencyLoanMenus ? "open" : ""
                    }`}
                  >
                    {renderDropdownIcon(isOpen)}
                  </i>
                </Link>

                {showEmergencyLoanMenus && (
                  <ul>
                    <li>
                      <Link to="/new-emergency-loan" className="submenu link">
                        <div
                          className="ps-1 text-start"
                          style={{ fontSize: "15px" }}
                        >
                          New Emergency Loan
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/view-emergency-loan" className="submenu link">
                        <div
                          className="ps-1 text-start"
                          style={{ fontSize: "15px" }}
                        >
                          View Emergency Loan
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li onClick={stopPropagation} className="submenu-loan">
                <Link
                  to=""
                  className="submenu link"
                  onClick={toggleStaffEmergencyLoanMenus}
                >
                  <div className="ps-2 text-start">Staff Emergency Loan</div>
                  <i
                    className={`dropdown-icon ${
                      showStaffEmergencyLoanMenus ? "open" : ""
                    }`}
                  >
                    {renderDropdownIcon(isOpen)}
                  </i>
                </Link>

                {showStaffEmergencyLoanMenus && (
                  <ul>
                    <li>
                      <Link
                        to="/new-staff-emergency-loan"
                        className="submenu link"
                      >
                        <div
                          className="ps-1 text-start"
                          style={{ fontSize: "15px" }}
                        >
                          New Emergency Loan
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/view-staff-emergency-loan"
                        className="submenu link"
                      >
                        <div
                          className="ps-1 text-start"
                          style={{ fontSize: "15px" }}
                        >
                          View Emergency Loan
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li onClick={stopPropagation} className="submenu-loan">
                <Link
                  to=""
                  className="submenu link"
                  onClick={toggleStaffMedTermLoanMenus}
                >
                  <div className="ps-1 text-start">Staff Med Term Loan</div>
                  <i
                    className={`dropdown-icon ${
                      showStaffMedTermLoanMenus ? "open" : ""
                    }`}
                  >
                    {renderDropdownIcon(isOpen)}
                  </i>
                </Link>

                {showStaffMedTermLoanMenus && (
                  <ul>
                    <li>
                      <Link
                        to="/new-staff-medium-term-loan"
                        className="submenu link"
                      >
                        <div className="ps-1 text-start">
                          New Staff Med Term
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/view-staff-medium-term-loan"
                        className="submenu link"
                      >
                        <div className="ps-1 text-start">
                          View Staff Med Term
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/staff-medium-term-loan-transaction"
                        className="submenu link"
                      >
                        <div className="ps-1 text-start">
                          Staff Med Term Transaction
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}

          {/* Submenus for Loans */}
          {/* {showLoanSubmenus && (
            <ul>
              <li>
                <Link to="/medium-term-loan" className="submenu link">
                  <div className="ps-2">Med Term Loan</div>
                </Link>
              </li>
              <li>
                <Link to="/view-medium-term-loan" className="submenu link">
                  <div className="ps-2">View Med Term Loan</div>
                </Link>
              </li>
              <li>
                <Link to="/new-medium-term-loan" className="submenu link">
                  <div className="ps-2">New Med Term Loan</div>
                </Link>
              </li>
              <li>
                <Link to="/new-staff-emergency-loan" className="submenu link">
                  <div className="ps-2">Staff Emergency Loan</div>
                </Link>
              </li>
              <li>
                <Link to="/view-staff-emergency-loan" className="submenu link">
                  <div className="ps-2 text-start">View Staff Emergency<br/> Loan</div>
                </Link>
              </li>
              
            </ul>
          )} */}

          {/* <li>
                <Link to="/loan-history" className="submenu link">
                  <div className="ps-2">Loan History</div>
                </Link>
              </li> */}

          {/* <li>
            <Link to="/loan-scheme" className="link">
              <i class="bx bxs-offer"></i>
              <span className="link_name">Scheme</span>
            </Link>
            <span className="tooltip">Scheme</span>
          </li> */}
          {/* <li>
            <Link to="/share-deposit" className="link">
              <i>
                <SiMoneygram />
              </i>
              <span className="link_name">Share & Deposit</span>
            </Link>
            <span className="tooltip">Share & Deposit</span>
          </li> */}
          <li>
            <Link to="/print-passbook" className="link">
              <i>
                <IoIosBook />
              </i>
              <span className="link_name">Print Passbook</span>
            </Link>
            <span className="tooltip">Print Passbook</span>
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
                  <Link to="/term-deposit-transaction" className="submenu link">
                    <div className="ps-2">Fixed Deposit</div>
                  </Link>
                </li>
                <li>
                  <Link to="/recurring-transaction" className="submenu link">
                    <div className="ps-2">Recurring Deposit</div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cash-certificate-transaction"
                    className="submenu link"
                  >
                    <div className="ps-2">Cash Certificate</div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dam-duppat-yojana-transaction"
                    className="submenu link"
                  >
                    <div className="ps-2">Dam Duppat</div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ek-laksha-yojana-transaction"
                    className="submenu link"
                  >
                    <div className="ps-2">Ek Laksha Yojana</div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lakhpati-yojana-transaction"
                    className="submenu link"
                  >
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
              <i className={`dropdown-icon ${showLoanMenus ? "open" : ""}`}>
                {renderDropdownIcon(isOpen)}
              </i>
            </Link>
            <span className="tooltip">Loans</span>

            {/* Submenus for Loans */}
            {showLoanMenus && (
              <ul>
                <li>
                  <Link to="/under-development" className="submenu link">
                    <div className="ps-2">Medium Term</div>
                  </Link>
                </li>
                <li>
                  <Link to="/under-development" className="submenu link">
                    <div className="ps-2">Emergency Loan</div>
                  </Link>
                </li>
                <li>
                  <Link to="/under-development" className="submenu link">
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
        <i className="bx bx-log-out" id="log_out" onClick={handleLogout}></i>
      </li>
    </div>
  );
};

export default Sidebar;
