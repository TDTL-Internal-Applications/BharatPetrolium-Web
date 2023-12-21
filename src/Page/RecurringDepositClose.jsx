import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";

const columns = [
  // {
  //   name: "Sr. No",
  //   selector: "SerialNumber",
  //   sortable: true,
  //   cell: (row, index) => index + 1,
  // },
  {
    name: "Transaction Date",
    selector: "transactionDate",
    sortable: true,
  },
  {
    name: "RV. No",
    selector: "rvno",
    sortable: true,
  },
  {
    name: "Particular",
    selector: "particular",
    sortable: true,
  },
  {
    name: "Cheque No",
    selector: "chequeno",
    sortable: true,
  },
  {
    name: "Debit",
    selector: "debit",
    sortable: true,
  },
  {
    name: "Credit",
    selector: "original_amount",
    sortable: true,
  },
  {
    name: "Balance",
    selector: "total_amount",
    sortable: true,
  },

  {
    name: "Transaction By",
    selector: "TransactionType",
    sortable: true,
  },
];

export default function RecurringDepositClose() {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    // Open the modal for all options
    openModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("exampleModalCenter");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
    }
  };

  const openModal = () => {
    const modal = document.getElementById("exampleModalCenter");
    if (modal) {
      modal.classList.add("show");
      modal.style.display = "block";
    }
  };

  const [totalAmount, setTotalAmount] = useState("");

  const handleMemberIdChange = async (event) => {
    const memberId = event.target.value;

    try {
      if (!memberId) {
        setFormData({
          employeeNO: "",
          firstName: "",
          lastName: "",
          gender: "",
          birthDate: "",
          age: "",
          joinDate: "",
          confirmDate: "",
          email: "",
          panNo: "",
          mobileNumber: "",
          maritalStatus: "",
          ifscCode: "",
          bankSavingAcNo: "",
          bankName: "",
          branchName: "",
        });
        return;
      }

      const response = await axios.get(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`
      );

      const jsondata = response.data;
      const data = jsondata.members[0];
      console.log(data);
      try {
        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/rd_history_closure/",
          {
            member_id: memberId,
          }
        );

        const responseData = response.data || [];
        console.log("API Response:", responseData);

        // Assuming the array is ordered by transaction date, get the last item
        const lastItem = responseData[responseData.length - 1] || {};
        setTotalAmount(lastItem.total_amount || "");

        setData(responseData);
      } catch (error) {
        console.error("Error fetching RD closure history:", error);
      }
      setFormData({
        ...formData,
        employeeNO: memberId,
        eno: data.emp_no || "",
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        gender: data.gender || "",
        birthDate: data.birth_date || "",
        age: data.age || "",
        joinDate: data.join_date || "",
        confirmDate: data.confirmed_on || "",
        email: data.email || "",
        panNo: data.pan_no || "",
        mobileNumber: data.mobile_no || "",
        maritalStatus: data.marital_status || "",
        ifscCode: data.IFSC_code || "",
        bankSavingAcNo: data.bank_ac_no || "",
        bankName: data.bank_name || "",
        branchName: data.branch_name || "",
        bankAcNo: data.bank_ac_no || "",
        nomineeName: data.nominee_name || "",
        nomineeAge: data.nominee_age || "",
        middleName: data.middle_name || "",
      });
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [data, setData] = useState([]);

  const [rdId, setId] = useState("");
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, [rdId, memberId]);

  const customStyles = {
    rows: {
      style: {
        minHeight: "48px",
      },
    },
    headCells: {
      style: {
        minHeight: "40px",
        backgroundColor: "#4db3c8",
        fontSize: "14px",
        color: "white",
      },
    },
  };
  const [formData, setFormData] = useState({
    accountNumber: "",
    StartDate: getCurrentDate(),
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    age: "",
    member_id: "",
    address: "",
    city: "",
    pinCode: "",
    mobileNumber: "",
    panNo: "",
    accountOpeningType: "",
    depositorCategory: "",
    autoRenewalExtraPercentage: "",
    transactionDate: "",
    oldAccountNumber: "",
    transferDetail: "",
    openDate: "",
    MonthlyDeposit: 0,
    deposit_period: "",
    InterestRate: "",
    maturity_date: "",
    maturity_amount: "",
    interestAmount: "",
    paidDate: "",

    bankName: "",
    branchName: "",
    memberNo: "",
    memberName: "",
    bankAcNo: "",
    ifscCode: "",
    uidNo: "",
    effectDate: "",
    effectAmount: "",
    interestProvisionDate: "",
    interestProvisionAmount: "",
    nomineeName: "",
    nomineeBirthdate: "",
    nomineeAge: "",
    nomineeRelation: "",
    contributedBy: "",
    introducerNo: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [chequeNo, setChequeNo] = useState("");
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Receipt/Payment Entry
            </h3>
          </div>
          <div className="container">
            <div className="row  w-100">
              <div className="col-12">
                <form>
                  <div
                    className="row d-flex justify-content-center mb-1 py-1"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="row py-1 d-flex align-items-center">
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="number"
                          name="member_id"
                          className="form-control no-outline-login"
                          //   style={{ height: "2rem" }}
                          style={{ backgroundColor: "white" }}
                          placeholder="Member No*"
                          value={formData.memberId}
                          onChange={handleMemberIdChange}
                          required
                        />
                      </div>
                      <div className="col-xl-1 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="number"
                          className="form-control no-outline-login"
                          id="rdId"
                          name="employeeno"
                          placeholder="E No*"
                          style={{ backgroundColor: "white" }}
                          value={formData.eno}
                          onChange={handleInputChange}
                          readOnly
                          min={0}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="number"
                          className="form-control no-outline-login"
                          name="accountNumber"
                          placeholder="Account No*"
                          style={{ backgroundColor: "white" }}
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          readOnly
                          min={0}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="text"
                          name="firstName"
                          className="form-control no-outline-login"
                          placeholder="First Name*"
                          style={{ backgroundColor: "white" }}
                          value={formData.firstName}
                          onChange={handleInputChange}
                          readOnly
                          required
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="text"
                          name="lastName"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Last Name*"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          readOnly
                          required
                        />
                      </div>
                      <div className="col-xl-1 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="number"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          name="age"
                          placeholder="Age*"
                          value={formData.age}
                          onChange={handleInputChange}
                          readOnly
                          required
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="date"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          name="birthDate"
                          placeholder="BirthDate*"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          readOnly
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="row d-flex justify-content-center mb-1 pt-1"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="row pt-1">
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <select
                          type="text"
                          name="title"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Select Title"
                          onChange={handleInputChange}
                          readOnly
                          disabled
                        >
                          <option>Select Title</option>
                          <option>Mr.</option>
                          <option>Miss.</option>
                          <option>Mrs.</option>
                        </select>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="text"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="First Name"
                          name="firstName"
                          value={formData.nomineeName}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="text"
                          name="middleName"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Middle Name"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="text"
                          name="lastName"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Last Name"
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="date"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          name="birthdate"
                          placeholder="BirthDate"
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="number"
                          name="age"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Age*"
                          value={formData.nomineeAge}
                          onChange={handleInputChange}
                          min={0}
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Join Name form 2*/}

                    <div className="row py-2">
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <select
                          type="text"
                          name="title"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Select Title"
                          onChange={handleInputChange}
                          readOnly
                          disabled
                        >
                          <option>Select Title</option>
                          <option>Mr.</option>
                          <option>Miss.</option>
                          <option>Mrs.</option>
                        </select>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="text"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="First Name"
                          onChange={handleInputChange}
                          name="firstName"
                          readOnly
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="text"
                          name="middleName"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Middle Name"
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="text"
                          name="lastName"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Last Name"
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="date"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          name="birthdate"
                          placeholder="BirthDate"
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <input
                          type="number"
                          name="age"
                          className="form-control no-outline-login"
                          style={{ backgroundColor: "white" }}
                          placeholder="Age*"
                          onChange={handleInputChange}
                          min={0}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="row d-flex justify-content-center py-2 my-2"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  >
                    {/* <h6
                      className="d-flex text-start pt-1"
                      style={{ color: "var(--primary)" }}
                    >
                      <strong>Bank Account Details</strong>
                    </h6> */}

                    <div className="row pb-0">
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0">
                          <label htmlFor="bankName">Bank Name*</label>
                          <input
                            className="form-control"
                            type="text"
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            // placeholder="Enter Bank Name"
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0">
                          <label htmlFor="branchName">Branch Name*</label>
                          <input
                            className="form-control"
                            type="text"
                            id="branchName"
                            name="branchName"
                            value={formData.branchName}
                            onChange={handleInputChange}
                            // placeholder="Enter Branch Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0">
                          <label htmlFor="ifscCode">IFSC CODE*</label>
                          <input
                            className="form-control"
                            type="text"
                            id="ifscCode"
                            name="ifscCode"
                            value={formData.ifscCode}
                            onChange={handleInputChange}
                            // placeholder="Enter IFSC Code"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0 ">
                          <label htmlFor="micrCode">MICR Code*</label>
                          <input
                            className="form-control"
                            type="text"
                            id="micrCode"
                            name="micrCode"
                            onChange={handleInputChange}
                            // placeholder="Enter MICR Code"
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0 ">
                          <label htmlFor="bankAcNo">Bank A/c No*</label>
                          <input
                            className="form-control"
                            type="text"
                            id="bankAcNo"
                            name="bankAcNo"
                            value={formData.bankAcNo}
                            onChange={handleInputChange}
                            // placeholder="Enter Bank A/c No"
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0 ">
                          <label htmlFor="uidNo">UID No*</label>
                          <input
                            className="form-control"
                            type="text"
                            id="uidNo"
                            name="uidNo"
                            value={formData.uidNo}
                            onChange={handleInputChange}
                            // placeholder="Enter UID No"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row pb-0 mb-0">
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0 pb-0 ">
                          <label htmlFor="openDate">Open Date*</label>
                          <input
                            className="form-control"
                            type="date"
                            id="openDate"
                            name="openDate"
                            value={formData.openDate}
                            onChange={handleInputChange}
                            // placeholder="Open Date"
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0 ">
                          <label htmlFor="instalment">Instalment*</label>
                          <input
                            className="form-control"
                            type="number"
                            id="instalment"
                            name="instalment"
                            value={formData.instalment}
                            onChange={handleInputChange}
                            // placeholder="Enter Instalment"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <label htmlFor="period ">Period*</label>
                        <input
                          className="form-control no-outline-login"
                          type="number"
                          id="period"
                          name="period"
                          value={formData.period}
                          onChange={handleInputChange}
                          // placeholder="Period"
                          required
                        />
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0 ">
                          <label htmlFor="maturity">Maturity*</label>
                          <input
                            className="form-control"
                            type="date"
                            id="maturity"
                            name="maturity"
                            onChange={handleInputChange}
                            // placeholder="Maturity Date"
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group mb-0 ">
                          <label htmlFor="amount">Amount*</label>
                          <input
                            className="form-control"
                            type="text"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            // placeholder="Enter Amount"
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                        <div className="form-group">
                          <label htmlFor="accountOpeningType">
                            A/c Opening Type
                          </label>
                          <select
                            className="form-select"
                            id="accountOpeningType"
                            name="accountOpeningType"
                            value={formData.accountOpeningType}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="" disabled>
                              SELF
                            </option>
                            <option value="SELF">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                    //   pagination
                    //   paginationPerPage={10}
                    //   paginationRowsPerPageOptions={[10, 20, 30]}
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                  />
                  <div
                    class="row mt-2 py-2 d-flex align-items-center justify-content-between"
                    style={{
                      backgroundColor: "#4db3c8",
                      borderRadius: "7px",
                      paddingLeft: "5px",
                      outline: "none",
                    }}
                  >
                    <div class="col-1 py-1">
                      <input
                        type="date"
                        style={{
                          backgroundColor: "white",
                          border: "3px solid #4db3c8",
                          width: "8rem",
                          borderRadius: "7px",
                          paddingLeft: "5px",
                          outline: "none",
                        }}
                        // className="form-control no-outline-login"
                        value={getCurrentDate()}
                        readOnly
                      />
                    </div>
                    <div class="col-1 py-1">
                      <input
                        type="text"
                        style={{
                          backgroundColor: "white",
                          border: "3px solid #4db3c8",
                          width: "8rem",
                          borderRadius: "7px",
                          paddingLeft: "5px",
                          outline: "none",
                        }}
                        placeholder="RV. No"
                      />
                    </div>
                    <div class="col-2 py-1">
                      <select
                        className="no-outline-login"
                        style={{
                          backgroundColor: "white",
                          border: "3px solid #4db3c8",
                          borderRadius: "5px",
                          paddingLeft: "5px",
                          outline: "none",
                        }}
                        onChange={handleSelectChange}
                        value={selectedOption}
                      >
                        <option value="">Select an option</option>
                        <option value="Transfer">Transfer</option>
                        <option value="By Cash">By Cash</option>
                        <option value="To Account">To Account</option>
                      </select>
                    </div>
                    <div
                      class="modal fade"
                      id="exampleModalCenter"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenterTitle"
                      aria-hidden="true"
                    >
                      <div
                        class="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5
                              class="modal-title"
                              id="exampleModalCenterTitle"
                            >
                              Transaction Detail
                            </h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true" onClick={closeModal}>
                                &times;
                              </span>
                            </button>
                          </div>
                          <div class="modal-body text-start">
                            <div className="row mb-1">
                              <label
                                for="inputCash3"
                                class="col-sm-4 col-form-label"
                              >
                                Enter Cash Amount
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputEmail3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputEmail3"
                                class="col-sm-4 col-form-label"
                              >
                                Enter Bank Amount
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputBank3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                Enter Transfer Amount
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <hr />
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                                style={{
                                  color: "dodgerblue",
                                  fontWeight: "600",
                                  fontSize: "13px",
                                }}
                              >
                                Transaction Amount
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <hr />
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-12 col-form-label text-center"
                                style={{
                                  color: "blue",
                                  fontWeight: "600",
                                  fontSize: "13px",
                                }}
                              >
                                Transaction Amount
                              </label>
                              <div class="col-sm-12">
                                <select
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                >
                                  <option>Select Bank A/C</option>
                                  <option>SBI Current A/C 2352665</option>
                                  <option>SBI Saving A/C 2352665</option>
                                  <option>Axis Current A/C 2352665</option>
                                  <option>Transfer</option>
                                  <option>Transfer to/from Saving</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                              onClick={closeModal}
                            >
                              Close
                            </button>
                            <button type="button" class="btn btn-success">
                              Transfer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-1 d-flex justify-content-end"
                      style={{ paddingBottom: "1.8rem" }}
                    >
                      <input
                        type="text"
                        style={{
                          backgroundColor: "white",
                          border: "3px solid #4db3c8",
                          width: "7rem",
                          borderRadius: "7px",
                          paddingLeft: "5px",
                          outline: "none",
                          position: "absolute",
                          right: "30px",
                          top: "0",
                        }}
                        // class="form-control no-outline-login"
                        // className="w-75"
                        placeholder="Cheque No."
                        value={chequeNo}
                        onChange={(e) => setChequeNo(e.target.value)}
                      />
                    </div>
                    <div class="col-1 py-1 d-flex justify-content-center pb-4">
                      <input
                        type="text"
                        value={debit}
                        onChange={(e) => setDebit(e.target.value)}
                        style={{
                          backgroundColor: "white",
                          border: "3px solid #4db3c8",
                          width: "6rem",
                          borderRadius: "7px",
                          paddingLeft: "5px",
                          outline: "none",
                          position: "absolute",
                          right: "30px",
                          top: "0",
                        }}
                        // class="form-control no-outline-login"
                        placeholder="Debit"
                      />
                    </div>
                    <div class="col-2 py-1 d-flex justify-content-start">
                      <input
                        type="text"
                        // class="form-control no-outline-login"
                        style={{
                          backgroundColor: "white",
                          border: "3px solid #4db3c8",
                          width: "8rem",
                          borderRadius: "7px",
                          paddingLeft: "5px",
                          outline: "none",
                          position: "absolute",
                          left: "-20px",
                          top: "-10px",
                        }}
                        placeholder="Credit"
                        value={credit}
                      />
                    </div>
                    <div class="col-1 d-flex justify-content-end py-1 pb-4">
                      <input
                        type="text"
                        style={{
                          backgroundColor: "white",
                          border: "3px solid #4db3c8",
                          width: "8rem",
                          position: "absolute",
                          right: "60px",
                          top: "0",
                          borderRadius: "7px",
                          paddingLeft: "5px",
                          outline: "none",
                        }}
                        // class="form-control no-outline-login"
                        placeholder="Balance"
                        value={totalAmount}
                      />
                    </div>
                    <div class="col-1 py-1 d-flex justify-content-center pb-4">
                      <input
                        type="text"
                        style={{
                          backgroundColor: "white",
                          border: "3px solid #4db3c8",
                          width: "6rem",
                          position: "absolute",
                          right: "60px",
                          top: "0",
                          borderRadius: "7px",
                          paddingLeft: "5px",
                          outline: "none",
                        }}
                        // class="form-control no-outline-login"
                        placeholder="Type"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
