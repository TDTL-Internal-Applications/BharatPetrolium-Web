import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Style/deposit.css";

export default function RDTansactions() {
  const [recurringDeposits, setRecurringDeposits] = useState([]);
  const [showTransactionsTable, setShowTransactionsTable] = useState(false);
  const [memberTransactions, setMemberTransactions] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [RDID, setRDID] = useState("");
  const [data, setData] = useState("");
  const [memberDetails, setMemberDetails] = useState("");
  const [deposit, setDeposit] = useState("");

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
    setSelectedOption("");
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
  const [selectedBankOption, setSelectedBankOption] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case "":
        closeModal();
        break;
      case "Transfer":
      case "By Cash":
      case "To Account":
        openModal(true);
        setSelectedBankOption(memberDetails?.bank_name || "");
        break;
      default:
        openModal(false);
        break;
    }
  };

  const handleBankOptionChange = (event) => {
    const selectedBank = event.target.value;
    setSelectedBankOption(selectedBank);
    // Handle the selected bank logic as needed
    console.log("Selected Bank:", selectedBank);
  };

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

  const transactionColumns = [
    {
      name: "Date",
      selector: (row) => row.transactionDate,
      sortable: true,
    },
    {
      name: "RV. No",
      selector: (row) => row.rvno,
      sortable: true,
    },
    {
      name: "Particular",
      selector: (row) => row.particular,
      sortable: true,
    },
    {
      name: "Cheque No",
      selector: (row) => row.chequeno,
      sortable: true,
    },
    {
      name: "Debit",
      selector: (row) => row.debit,
      sortable: true,
    },
    {
      name: "Credit",
      selector: (row) => row.original_amount,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row) => row.total_amount,
      sortable: true,
    },

    {
      name: "Transaction By",
      selector: (row) => row.TransactionType,

      sortable: true,
    },
  ];

  const [selectedRDID, setSelectedRDID] = useState("");

  const [totalAmount, setTotalAmount] = useState("");

  const handleViewTransactions = (member_id, RDID) => {
    let dataArray = [];
    let inputObject = {
      transactionDate: (
        <input
          type="date"
          className="inputFields"
          value={getCurrentDate()}
          required
        />
      ),
      rvno: <input type="text" className="inputFields" required />,
      particular: (
        <select
          type="text"
          className="inputFields"
          required
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="">Select an option</option>
          <option value="Transfer">Transfer</option>
          <option value="By Cash">By Cash</option>
          <option value="To Account">To Account</option>
        </select>
      ),
      chequeno: <input type="text" className="inputFields" required />,
      debit: <input type="text" className="inputFields" required />,
      original_amount: <input type="text" className="inputFields" required />,
      total_amount: (
        <input
          type="text"
          id="Balance"
          value={totalAmount}
          className="inputFields"
          required
        />
      ),
      TransactionType: <input type="text" className="inputFields" required />,
    };
    setMemberIdForTransfer(member_id);

    const data = {
      member_id,
      RDID,
    };
    localStorage.setItem("member_id", member_id);

    axios
      .post(`http://bpcl.kolhapurdakshin.com:8000/rd_history_closure/`, data)
      .then((response) => {
        const data = response.data["result"];
        console.log(data);
        const lastTransaction = data[data.length - 1];
        const atotalAmount = lastTransaction.total_amount || "";
        const selectedRDID = lastTransaction.RDID || "";
        setSelectedRDID(selectedRDID);
        setTotalAmount(atotalAmount);
        console.log("totalAmount", atotalAmount);

        if (Array.isArray(data) && data.length > 0) {
          dataArray = data;
          dataArray.push(inputObject);

          setMemberTransactions(dataArray);
          setShowTransactionsTable(true);

          console.log("RD Closure Transactions fetched successfully");
        } else {
          console.error("Invalid data format received from the API");
          showNoTransactionsToast();
        }
      })
      .catch((error) => {
        console.error("Error fetching RD closure transactions:", error);
        showNoTransactionsToast();

      });
  };

  useEffect(() => {
    // Updating the input field with the latest totalAmount
    const inputField = document.getElementById("Balance"); 
    if (inputField) {
      inputField.value = totalAmount;
    }
  }, [totalAmount]);

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
      selector: (row) => row.RDID,
      sortable: true,
    },
    {
      name: "Monthly Deposit",
      selector: (row) => row.MonthlyDeposit,
      sortable: true,
    },
    {
      name: "Interest Rate",
      selector: (row) => row.InterestRate,
      sortable: true,
    },
    {
      name: "Maturity Amount",
      selector: (row) => row.MaturityAmt,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.StartDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.EndDate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: "Interest Amount",
      selector: (row) => row.InterestAmt,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <span
          key={`transactions-button-${row.RDID}`}
          className="btn "
          style={{ fontSize: "12px", backgroundColor: "green", color: "white",padding:"3px 9px" }}
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
    const response = await fetch(
      "http://bpcl.kolhapurdakshin.com:8000/close_rd/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member_id: memberId,
          rd_id: rdId,
        }),
      }
    );
    const data = await response.json();
    return data.memberDetails;
  };

  const [rdStatus, setRdStatus] = useState ("")

  const handleMemberIdChange = async (event) => {
    const memberId = event.target.value;

    if (memberId.trim() !== "") {
      axios
        .post(`http://bpcl.kolhapurdakshin.com:8000/rd_history/`, {
          member_id: memberId,
          Account_type: "Recurring Deposit",
        })
        .then((response) => {
          const data = response.data.Output;
          setDeposit(data[0]);
          // console.log(deposit);

          if (Array.isArray(data) && data.slice) {
            setRecurringDeposits(data.slice());
            setShowTransactionsTable(false);
            console.log("Member data fetched successfully", recurringDeposits);

            // Assuming the first member in the result is selected
            if (data.length > 0) {
              setMemberIdForTransfer(data[0].member_id);
            }
          } else {
            console.error("Invalid data format received from the API");
          }
          if (Array.isArray(data) && data.length > 0) {
            const rdStatus = data[0].Status || "";
    
            // Save rdStatus to state or a variable
            setRdStatus(rdStatus);
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
        setMemberDetails("");
        setDeposit("");
        return;
      }

      const response = await axios.get(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`
      );

      const jsondata = response.data;
      const data = jsondata.members[0];
      setMemberDetails(data);
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

        const lastItem = responseData[responseData.length - 1] || {};
        // setTotalAmount(lastItem.total_amount || "");

        setData(responseData);
      } catch (error) {
        console.error("Error fetching RD closure history:", error);
      }
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const [member_Id, setMember_Id] = useState("");

  const handleTransfer = () => {
    if (rdStatus === "Inactive") {
      Swal.fire({
        icon: "info",
        title: "Inactive RD",
        text: "The selected RD is already inactive.",
        didOpen: () => {
          // Swal.getPopup().style.background = "darkblue";
          Swal.getPopup().style.color = "black";
          Swal.getPopup().style.borderRadius = "25px";
        },
      });
      return;
    }
  
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/close_rd/", {
        selectedOption,
        totalAmount,
        member_id: member_Id,
        RDID: selectedRDID,
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "The transfer was successful.",
          didOpen: () => {
            closeModal();
            Swal.getPopup().style.color = "black";
            Swal.getPopup().style.borderRadius = "25px";
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
            Swal.getPopup().style.color = "black";
            Swal.getPopup().style.borderRadius = "25px";
          },
        });
      });
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        minHeight: "40px",
        backgroundColor: "#4db3c8",
        fontSize: "14px",
        fontWeight: "400",
        color: "white",
      },
    },
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
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Recurring Deposit</div>
          </div>

          <div className="container">
            {/* Your first form code */}
            <div className="row First-Main-Row  pt-3 mb-3">
              {/* Basic Information  */}
              <form>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="memberId" className="small-label">
                        Member No*
                      </label>
                      <div className="row">
                        <div className="col-sm-3">
                          <input
                            type="text"
                            id="memberId"
                            name="member_id"
                            class="form-control small-label"
                            // placeholder="Enter Member No"
                            // value={formData.member_id}
                            // onChange={handleMemberIdChange}
                            min={0}
                            required
                          />
                        </div>
                        <div className="col-sm-9 ">
                          <input
                            type="text"
                            id="memberId"
                            name="member_id"
                            class="form-control small-label"
                            // placeholder="Enter Member No"
                            // value={formData.memberId}
                            onChange={handleMemberIdChange}
                            min={0}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class=" ">
                      <label for="rdId" className="small-label">
                        Employee No*
                      </label>
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        value={memberDetails && memberDetails.emp_no}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start"></div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="accountNumber" className="small-label">
                        Account No*
                      </label>
                      <input
                        type="text"
                        class="form-control small-label"
                        id="accountNumber"
                        name="accountNumber"
                        value={deposit && deposit.RDID}
                        // min={0}
                        maxLength={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label for="" className="small-label">
                        Title
                      </label>
                      <select
                        type="text"
                        name="title"
                        class="form-select small-label"
                        // id="floatingInput"
                      >
                        <option>Select</option>
                        <option>Mr.</option>
                        <option>Miss.</option>
                        <option>Mrs.</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="firstName" className="small-label">
                        First Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        // placeholder="name@example.com"
                        name="firstName"
                        value={memberDetails && memberDetails.first_name}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Middle Name
                      </label>

                      <input
                        type="text"
                        name="middleName"
                        class="form-control small-placeholder"
                        value={memberDetails && memberDetails.middle_name}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        class="form-control small-placeholder"
                        id="floatingInput"
                        value={memberDetails && memberDetails.last_name}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        BirthDate
                      </label>

                      <input
                        type="date"
                        class="form-control small-placeholder"
                        id="floatingInput"
                        name="birthdate"
                        value={memberDetails && memberDetails.birth_date}
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Age
                      </label>

                      <input
                        type="number"
                        name="age"
                        class="form-control small-placeholder"
                        value={memberDetails && memberDetails.age}
                        min={0}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label for="" className="small-label">
                        Title
                      </label>
                      <select
                        type="text"
                        name="title"
                        class="form-select small-label"
                      >
                        <option>Select</option>
                        <option>Mr.</option>
                        <option>Miss.</option>
                        <option>Mrs.</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="firstName" className="small-label">
                        First Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        // placeholder="name@example.com"
                        name="firstName"
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Middle Name
                      </label>

                      <input
                        type="text"
                        name="middleName"
                        class="form-control small-label"
                        // id="floatingInput"
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        class="form-control small-placeholder"
                        id="floatingInput"
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        BirthDate
                      </label>

                      <input
                        type="date"
                        class="form-control small-placeholder"
                        id="floatingInput"
                        name="birthdate"
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Age
                      </label>

                      <input
                        type="number"
                        name="age"
                        class="form-control small-placeholder"
                        min={0}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Title
                    </label>
                    <select
                      name="title"
                      className="form-select small-label"
                      // id="floatingInput"
                    >
                      <option>Select Title</option>
                      <option>Mr.</option>
                      <option>Miss.</option>
                      <option>Mrs.</option>
                    </select>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="firstName"
                    />
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="middleName"
                    />
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="lastName"
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      BirthDate
                    </label>
                    <input
                      type="date"
                      className="form-control small-label"
                      id="floatingInput"
                      name="birthdate"
                    />
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      min={0}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank Name*
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        name="bankName"
                        value={memberDetails && memberDetails.bank_name}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank A/c No*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="bankAcNo"
                        value={memberDetails && memberDetails.bank_ac_no}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Branch Name*
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        name="branchName"
                        value={memberDetails && memberDetails.branch_name}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      MICR Code*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"

                        // placeholder="name@example.com"
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      IFSC CODE*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="rName"
                        value={memberDetails && memberDetails.IFSC_code}
                      />
                    </div>
                  </div>

                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start ">
                    <label className="small-label" htmlFor="floatingInput">
                      UID No*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="uidNo"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Open Date
                    </label>
                    <div>
                      <input
                        type="date"
                        className="form-control small-label"
                        id="floatingInput"
                        name="StartDate"
                        value={deposit && deposit.StartDate}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Installment
                    </label>
                    <div>
                      <input
                        type="text"
                        className="form-control small-label"
                        id="floatingInput"
                        name="MonthlyDeposit"
                        value={deposit && deposit.MonthlyDeposit}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Period
                    </label>
                    <div>
                      <input
                        type="text"
                        step={0.01}
                        className="form-control small-label"
                        id="floatingInput"
                        name="InterestRate"
                        min={0}
                        value={deposit && deposit.deposit_period}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Maturity
                    </label>
                    <div>
                      <input
                        type="text"
                        step={0.01}
                        className="form-control small-label"
                        id="floatingInput"
                        name="InterestRate"
                        value={deposit && deposit.EndDate}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Amount
                    </label>
                    <div>
                      <input
                        type="text"
                        step={0.01}
                        className="form-control small-label"
                        id="floatingInput"
                        value={deposit && deposit.MaturityAmt}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      A/C opening Mode
                    </label>
                    <div>
                      <input
                        type="text"
                        step={0.01}
                        className="form-control small-label"
                        id="floatingInput"
                        name="InterestRate"
                        min={0}
                      />
                    </div>
                  </div>
                </div>
              </form>

              {showTransactionsTable && (
                <div className="row py-1 mt-3">
                  <div className="col-12">
                    <>
                      {memberTransactions && (
                        <DataTable
                          columns={transactionColumns}
                          data={memberTransactions}
                          customStyles={customStyles}
                          highlightOnHover
                          striped
                          responsive
                          dense
                        />
                      )}
                      <div className="text-start pt-2">
                        <button
                          onClick={handleBack}
                          className="btn btn-success"
                        >
                          Back
                        </button>
                      </div>
                    </>
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
                                className="col-sm-4 col-form-label small-label"
                              >
                                Enter Cash Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputBank3"
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
                                className="col-sm-4 col-form-label small-label"
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
                                className="col-sm-4 col-form-label small-label"
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
                                  value={selectedBankOption}
                                  disabled={
                                    selectedOption === "By Cash" ||
                                    selectedOption === "Transfer"
                                  }
                                  onChange={handleBankOptionChange} //
                                >
                                  <option>
                                    {memberDetails && memberDetails.bank_name}
                                  </option>
                                  <option value="SBI Current A/C 2352665">
                                    SBI Current A/C 2352665
                                  </option>
                                  <option value="SBI Saving A/C 2352665">
                                    SBI Saving A/C 2352665
                                  </option>
                                  <option value="Axis Current A/C 2352665">
                                    Axis Current A/C 2352665
                                  </option>
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
                              onClick={handleTransfer}
                              type="button"
                              class="btn btn-success"
                            >
                              Transfer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="row py-1 mt-3">
                <div className="col-12">
                  {recurringDeposits && !showTransactionsTable && (
                    <>
                      <DataTable
                        columns={columns}
                        data={recurringDeposits}
                        customStyles={customStyles}
                        striped
                        responsive
                        dense
                        // pagination
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
