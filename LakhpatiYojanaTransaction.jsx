import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Recurring() {
  const [recurringDeposits, setRecurringDeposits] = useState([]);
  const [showTransactionsTable, setShowTransactionsTable] = useState(false);
  const [memberTransactions, setMemberTransactions] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [RDID, setRDID] = useState("");

  const handleBack = () => {
    setShowTransactionsTable(false);
    setMemberTransactions([]);
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
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    // Update the selected option
    setSelectedOption(selectedValue);
    openModal();

    switch (selectedValue) {
      case "":
        closeModal();
        break;
      case "Transfer":
      case "By Cash":
      case "To Account":
        setTotalAmount(totalAmount);
        openModal(true);
        break;
      default:
        setTotalAmount("");
        openModal(false);

        break;
    }
  };

  const handleSearch = () => {};

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "black",

        fontSize: "15px",
        fontWeight: "400",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        color: "black",
        fontSize: "12px",
        fontWeight: "normal",
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        backgroundColor: "whitesmoke",
        color: "black",
        paddingLeft: "5px",
        paddingRight: "5px",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        paddingLeft: "5px",
        paddingRight: "5px",
        textAlign: "center",
      },
    },
  };

  const totalRows = memberTransactions.length;
  const customFooter = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div>
        <strong>Total Rows:</strong> {totalRows}
      </div>
    </div>
  );

  const transactionColumns = [
    {
      name: "Date",
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

  const [selectedRDID, setSelectedRDID] = useState("");

  const [totalAmount, setTotalAmount] = useState("");

  const handleViewTransactions = (member_id, RDID) => {
    setMemberIdForTransfer(member_id);

    const data = {
      member_id,
      RDID,
    };
    localStorage.setItem("member_id", member_id);

    axios
      .post(`http://127.0.0.1:8000/rd_history_closure/`, data)
      .then((response) => {
        const data = response.data || [];
        console.log(data);

        if (Array.isArray(data) && data.length > 0) {
          setMemberTransactions(data);
          setShowTransactionsTable(true);
          const lastItem = response.data[response.data.length - 1] || {};
          setTotalAmount(lastItem.total_amount || "");
          setSelectedRDID(lastItem.RDID);
          console.log("RD Closure Transactions fetched successfully");
        } else {
          console.error("Invalid data format received from the API");
          showNoTransactionsToast();
        }
      })
      .catch((error) => {
        console.error("Error fetching RD closure transactions:", error);
      });
  };

  const showNoTransactionsToast = () => {
    toast.error("No transactions found!", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const columns = [
    {
      name: "RDID",
      selector: "RDID",
      sortable: true,
    },
    {
      name: "Monthly Deposit",
      selector: "MonthlyDeposit",
      sortable: true,
    },
    {
      name: "Interest Rate",
      selector: "InterestRate",
      sortable: true,
    },
    {
      name: "Maturity Amount",
      selector: "MaturityAmt",
      sortable: true,
    },
    {
      name: "Start Date",
      selector: "StartDate",
      sortable: true,
    },
    {
      name: "End Date",
      selector: "EndDate",
      sortable: true,
    },
    {
      name: "Status",
      selector: "Status",
      sortable: true,
    },
    {
      name: "Interest Amount",
      selector: "InterestAmt",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <span
          key={`transactions-button-${row.RDID}`}
          className="btn "
          style={{ fontSize: "12px", backgroundColor: "green", color: "white" }}
          onClick={() => handleViewTransactions(row.member_id, row.RDID)}
        >
          Transactions
        </span>
      ),
    },
  ];

  const navigate = useNavigate();

  const handleConfirmation = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, close it!",
      didOpen: () => {
        Swal.getPopup().style.borderRadius = "25px";
        const confirmButton = Swal.getConfirmButton();
        confirmButton.classList.add("custom-swal-button-share");
      },
    });

    if (result.isConfirmed) {
      const memberId = 17;
      const rdId = 2;
      try {
        const memberDetails = await closeDepositAndFetchDetails(memberId, rdId);
        navigate("/close-recurring-deposit", { state: { memberDetails } });
      } catch (error) {
        console.error("Error closing deposit:", error);
      }
    }
  };
  const closeDepositAndFetchDetails = async (memberId, rdId) => {
    const response = await fetch("http://127.0.0.1:8000/close_rd/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        member_id: memberId,
        rd_id: rdId,
      }),
    });
    const data = await response.json();
    return data.memberDetails;
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

  const [data, setData] = useState("");

  const handleMemberIdChange = async (event) => {
    const memberId = event.target.value;

    if (memberId.trim() !== "") {
      axios
        .post(`http://127.0.0.1:8000/rd_history/`, { 
            member_id: memberId,
            Account_type:"Lakhpati Yojana"

         })
        .then((response) => {
          const data = response.data.Output;

          if (Array.isArray(data) && data.slice) {
            setRecurringDeposits(data.slice());
            setShowTransactionsTable(false);
            console.log("Member data fetched successfully");

            // Assuming the first member in the result is selected
            if (data.length > 0) {
              setMemberIdForTransfer(data[0].member_id);
            }
          } else {
            console.error("Invalid data format received from the API");
          }
        })
        .catch((error) => {
          console.error("Error fetching member data:", error);
        });
    } else {
      console.error("Member ID is required for search");
    }

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
        `http://127.0.0.1:8000/all_memberdata/${memberId}/`
      );

      const jsondata = response.data;
      const data = jsondata.members[0];
      console.log(data);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/rd_history_closure/",
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

  const [member_Id, setMember_Id] = useState("");

  const handleTransfer = () => {
    axios
      .post("http://127.0.0.1:8000/close_rd/", {
        selectedOption,
        totalAmount,
        member_id: member_Id,
        RDID: selectedRDID,
      })
      .then((response) => {
        // Handle success
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "The transfer was successful.",
          didOpen: () => {
            closeModal();
          },
        });
        setSelectedOption("");
      })

      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred during the transfer.",
          didOpen: () => {
            closeModal();
          },
        });
      });
  };

  const setMemberIdForTransfer = (selectedMemberId) => {
    setMember_Id(selectedMemberId);
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container-fluid d-flex text-start w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-6 text-start">
                <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Lakhpati Yojana Transaction
                </h2>
              </div>
            </div>
          </div>

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
                  />
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 text-start">
                <div className="form-group">
                  <label htmlFor="accountOpeningType">A/c Opening Type</label>
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
          {showTransactionsTable && (
            <div className="row py-1">
              <div className="col-12">
                {memberTransactions && (
                  <DataTable
                    columns={transactionColumns}
                    data={memberTransactions}
                    customStyles={tableCustomStyles}
                    highlightOnHover
                    customFooter={customFooter}
                    // pagination
                  />
                )}
              </div>
              <div className="row mx-2 text-start">
                <div className="row d-flex justify-content-center align-items-center">
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
                                htmlFor="inputCash3"
                                className="col-sm-4 col-form-label"
                              >
                                Enter Cash Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputEmail3"
                                  value={
                                    selectedOption === "By Cash"
                                      ? totalAmount
                                      : ""
                                  }
                                  disabled={selectedOption !== "By Cash"}
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-4 col-form-label"
                              >
                                Enter Bank Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputBank3"
                                  value={
                                    selectedOption === "To Account"
                                      ? totalAmount
                                      : ""
                                  }
                                  disabled={selectedOption !== "To Account"}
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                Enter Transfer Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  value={
                                    selectedOption === "Transfer"
                                      ? totalAmount
                                      : ""
                                  }
                                  disabled={selectedOption !== "Transfer"}
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
                                  value={totalAmount}
                                  readOnly
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
                                Transfer Amount
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
                            <button
                              type="button"
                              class="btn btn-success"
                              onClick={handleTransfer}
                            >
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
                        // value={chequeNo}
                        // onChange={(e) => setChequeNo(e.target.value)}
                      />
                    </div>
                    <div class="col-1 py-1 d-flex justify-content-center pb-4">
                      <input
                        type="text"
                        // value={debit}
                        // onChange={(e) => setDebit(e.target.value)}
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
                        // value={credit}
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
                </div>
                <div className="col-xl-1 col-lg-2 col-md-4 col-sm-12 pt-2">
                  <button
                    type="btn"
                    style={{
                      backgroundColor: "dodgerblue",
                      borderRadius: "7px",
                      border: "none",
                      color: "white",
                      padding: "5px 17px 5px 17px",
                    }}
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>

                <div className="col-xl-1 col-lg-2 col-md-4 col-sm-12 pt-2">
                  {/* <button
                    type="btn"
                    onClick={handleConfirmation}
                    style={{
                      backgroundColor: "red",
                      borderRadius: "7px",
                      border: "none",
                      color: "white",
                      padding: "5px 15px 5px 15px",
                    }}
                  >
                    Close
                  </button> */}
                </div>
              </div>
            </div>
          )}

          <div className="row py-1">
            <div className="col-12">
              {recurringDeposits && !showTransactionsTable && (
                <DataTable
                  columns={columns}
                  data={recurringDeposits}
                  customStyles={tableCustomStyles}
                  // pagination
                  fixedHeader
                  fixedHeaderScrollHeight="300px"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
