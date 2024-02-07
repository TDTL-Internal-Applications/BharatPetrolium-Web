import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Style/Global_Classes.css";

export default function RDTansactions() {
  const [recurringDeposits, setRecurringDeposits] = useState([]);
  const [showTransactionsTable, setShowTransactionsTable] = useState(false);
  const [memberTransactions, setMemberTransactions] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [RDID, setRDID] = useState("");
  const [data, setData] = useState("");
  const [memberDetails, setMemberDetails] = useState("");
  const [deposit, setDeposit] = useState("");

  let RvNo = useRef();
  let cheque = useRef();

  //Total Amount for not blink
  const totalAmountRef = useRef();

  //Back Button
  const handleBack = () => {
    setShowTransactionsTable(false);
    setMemberTransactions([]);
  };

  //Close Button
  const closeModal = () => {
    const modal = document.getElementById("exampleModalCenter");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
    }
    setSelectedOption("");
  };

  //Open Button
  const openModal = () => {
    const modal = document.getElementById("exampleModalCenter");
    if (modal) {
      modal.classList.add("show");
      modal.style.display = "block";
    }
  };

  //Current Date
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //Selected Option
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

  //Bank Options
  const handleBankOptionChange = (event) => {
    const selectedBank = event.target.value;
    setSelectedBankOption(selectedBank);
    // Handle the selected bank logic as needed
    console.log("Selected Bank:", selectedBank);
  };

  const transactionColumns = [
    {
      name: "Date",
      selector: (row) => row.transactionDate,
      sortable: true,
    },
    {
      name: "RV. No",
      selector: (row) => row.RV_no,
      sortable: true,
    },
    {
      name: "Particular",
      selector: (row) => row.TransactionType,

      sortable: true,
    },
    // {
    //   name: "Transaction Type",
    //   selector: (row) => row.particular,
    //   sortable: true,
    // },
    {
      name: "Cheque No",
      selector: (row) => row.cheque_no,
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
  ];

  const [selectedRDID, setSelectedRDID] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  let [rowObj, setRowObj] = useState({});

  let inputObject = {
    transactionDate: (
      <input
        type="date"
        className="inputFields"
        value={getCurrentDate()}
        required
        style={{ fontSize: "0.9em" }}
      />
    ),
    RV_no: (
      <input
        type="text"
        name="rv_no"
        placeholder="Rv No"
        className="inputFields"
        style={{ width: "90%" }}
        ref={RvNo}
      />
    ),
    particular: (
      <select
        type="text"
        className="inputFields"
        required
        onChange={handleSelectChange}
        value={selectedOption}
        style={{ width: "90%" }}
      >
        <option value="">Select an option</option>
        <option value="To Cash">To Cash</option>
        <option value="To Cheque Return">To Cheque Return</option>
        <option value="To Transfer">To Transfer</option>
        <option value="To Cheque">To Cheque</option>
        <option value="To NEFT">To NEFT</option>
        <option value="By Cash">By Cash</option>
        <option value="By Cheque">By Cheque</option>
        <option value="By Cheque Return">By Cheque Return</option>
        <option value="By Transfer">By Transfer</option>
        <option value="By NEFT">By NEFT</option>
      </select>
    ),
    cheque_no: (
      <input
        type="text"
        placeholder="Cheque NO"
        name="cheque_no"
        className="inputFields"
        ref={cheque}
        style={{ width: "90%" }}
      />
    ),
    debit: (
      <input
        type="text"
        placeholder="Debit"
        className="inputFields"
        style={{ width: "90%" }}
      />
    ),
    original_amount: (
      <input
        type="text"
        className="inputFields"
        required
        value={deposit && deposit.MonthlyDeposit}
        style={{ width: "90%" }}
      />
    ),
    total_amount: (
      <input
        type="text"
        id="Balance"
        value={totalAmount}
        className="inputFields"
        style={{ width: "90%" }}
      />
    ),
    TransactionType: (
      <select
        type="text"
        className="inputFields"
        style={{ width: "90%" }}
        required
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <option value="">Select an option</option>
        <option value="To Cash">To Cash</option>
        <option value="To Cheque Return">To Cheque Return</option>
        <option value="To Transfer">To Transfer</option>
        <option value="To Cheque">To Cheque</option>
        <option value="To NEFT">To NEFT</option>
        <option value="By Cash">By Cash</option>
        <option value="By Cheque">By Cheque</option>
        <option value="By Cheque Return">By Cheque Return</option>
        <option value="By Transfer">By Transfer</option>
        <option value="By NEFT">By NEFT</option>
      </select>
    ),
  };

  //To Show Transaction Of That RD 2nd Table
  const fetchData = (data) => {
    axios
      .post(`http://bpcl.kolhapurdakshin.com:8000/rd_history_closure/`, data)
      .then((response) => {
        const data = response.data["result"];
        console.log(data);
        const lastTransaction = data[data.length - 1];
        const atotalAmount = lastTransaction.total_amount || "";
        const selectedRDID = lastTransaction.RDID || "";
        setSelectedRDID(selectedRDID);

        // Set the total amount using the ref
        totalAmountRef.current = atotalAmount;

        // Update the state for other changes
        setTotalAmount(atotalAmount);
        console.log("totalAmount", atotalAmount);

        if (Array.isArray(data) && data.length > 0) {
          const dataArray = [...data, inputObject];

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
  // const handleViewTransactions = (member_id, RDID) => {
  //Button Function For Showing the Transaction
  const handleViewTransactions = async (row) => {
    let temp = row;
    setRowObj(temp);
    console.log("rowObj :", rowObj);
    let dataArray = [];

    setMemberIdForTransfer(rowObj.member_id);

    const payloaddata = {
      member_id: row.member_id,
      RDID: row.RDID,
    };
    console.log("data :", payloaddata);
    localStorage.setItem("member_id", rowObj.member_id);

    fetchData(payloaddata);
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
      selector: (row) => (
        <span
          key={`transactions-button-${row.RDID}`}
          className="btn "
          style={{
            fontSize: "12px",
            backgroundColor: "green",
            color: "white",
            padding: "2px 5px",
            borderRadius: "0px",
          }}
          // onClick={() => handleViewTransactions(row.member_id, row.RDID)}
          onClick={() => handleViewTransactions(row)}
        >
          Transactions
        </span>
      ),
    },
  ];

  const [rdStatus, setRdStatus] = useState("");

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
        setShowTransactionsTable(false);
        setRecurringDeposits(false);
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
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/rd_transaction/", {
        amount: deposit && deposit.MonthlyDeposit,
        member_id: member_Id,
        RDID: selectedRDID,
        transaction_type: selectedOption,
        transaction_date: Date,
        cheque_no: cheque.current.value,
        rv_no: RvNo.current.value,
      })
      .then((response) => {
        console.log(response.data);
        // Check if there is an error message in the response
        if (response.data && response.data.error) {
          handleSwalError(response.data.error);
        } else {
          // Success Swal
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "The transfer was successful.",
            didOpen: () => {
              closeModal();
              Swal.getPopup().style.borderRadius = "25px";
              const confirmButton = Swal.getConfirmButton();
              confirmButton.classList.add("custom-swal-button");
            },
          });

          const payloaddata = {
            member_id: rowObj.member_id,
            RDID: rowObj.RDID,
          };

          fetchData(payloaddata);

          if (RvNo.current) {
            RvNo.current.value = "";
          }

          if (cheque.current) {
            cheque.current.value = "";
          }
          setSelectedOption("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        handleSwalError("An unknown error occurred");
      });
  };

  const handleSwalError = (errorMessage) => {
    Swal.fire({
      icon: "info",
      title: "info!",
      text: errorMessage,
      didOpen: () => {
        closeModal();
        Swal.getPopup().style.borderRadius = "25px";
        const confirmButton = Swal.getConfirmButton();
        confirmButton.classList.add("custom-swal-button");
      },
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

  const [chequeNo, setChequeNo] = useState('');

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Recurring Deposit</div>
          </div>

          <div className="container" style={{ flexDirection: "column" }}>
            {/* Your first form code */}
            <div className="row First-Main-Row w-100  pt-3 mb-1">
              {/* Basic Information  */}
              <form>
                <div className="row">
                  <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 text-start d-flex align-items-center">
                    <div class="">
                      <div className="row">
                        <div className="col-sm-3">
                          <label for="class" className="small-label">
                            Class
                          </label>
                          <input
                            type="text"
                            id="class"
                            name="class"
                            class="form-control small-label"
                            min={0}
                            required
                          />
                        </div>
                        <div className="col-sm-9 ">
                          <label for="memberId" className="small-label">
                            Member No*
                          </label>
                          <input
                            type="text"
                            id="memberId"
                            name="member_id"
                            class="form-control small-label"
                            onChange={handleMemberIdChange}
                            min={0}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 text-start">
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
                  {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start"></div> */}
                  <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 text-start">
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
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
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
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
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
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
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
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
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
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
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
            </div>
            <div className="row w-100">
              {showTransactionsTable && (
                <div className="row py-1 mt-3">
                  <div className="col-12">
                    <>
                      {memberTransactions && (
                        <DataTable
                          columns={transactionColumns}
                          data={memberTransactions.sort(
                            (a, b) => b.timestamp - a.timestamp
                          )}
                          customStyles={customStyles}
                          highlightOnHover
                          pagination
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
                                Cash Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputBank3"
                                  value={
                                    selectedOption === "By Cash"
                                      ? deposit && deposit.MonthlyDeposit
                                      : selectedOption === "To Cash"
                                      ? totalAmount
                                      : ""
                                  }
                                  disabled={
                                    !(
                                      selectedOption === "By Cash" ||
                                      selectedOption === "To Cash"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-4 col-form-label small-label"
                              >
                                Bank Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputBank3"
                                  value={
                                    selectedOption === "By Cheque" ||
                                    selectedOption === "By Cheque Return"
                                      ? deposit && deposit.MonthlyDeposit
                                      : selectedOption === "To Cheque" ||
                                        selectedOption === "To Cheque Return"
                                      ? totalAmount
                                      : ""
                                  }
                                  disabled={
                                    !(
                                      selectedOption === "By Cheque" ||
                                      selectedOption === "To Cheque" ||
                                      selectedOption === "By Cheque Return" ||
                                      selectedOption === "To Cheque Return"
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label small-label"
                              >
                               Transfer Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  value={
                                    selectedOption === "By Transfer"
                                      ? deposit && deposit.MonthlyDeposit
                                      : selectedOption === "To Transfer"
                                      ? totalAmount
                                      : selectedOption === "By NEFT"
                                      ? deposit && deposit.MonthlyDeposit
                                      : selectedOption === "To NEFT"
                                      ? totalAmount
                                      : ""
                                  }
                                  disabled={
                                    !(
                                      selectedOption === "By Transfer" ||
                                      selectedOption === "To Transfer" ||
                                      selectedOption === "By NEFT" ||
                                      selectedOption === "To NEFT"
                                    )
                                  }
                                  
                                />
                              </div>
                            </div>
                            <hr />
                            <div className="row mb-1">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-4 col-form-label small-label"
                              >
                                Enter Cheque No.
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  placeholder="Cheque NO"
                                  name="cheque_no"
                                  ref={cheque}                                
                                  disabled={
                                    !(
                                      selectedOption === "By Cheque" ||
                                      selectedOption === "To Cheque" ||
                                      selectedOption === "By Cheque Return" ||
                                      selectedOption === "To Cheque Return"
                                    )
                                  }
                                />
                              </div>
                            </div>
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
                                  value={
                                    (selectedOption.startsWith("By"))
                                      ? deposit && deposit.MonthlyDeposit
                                      : (selectedOption.startsWith("To"))
                                      ? totalAmount
                                      : ""
                                  }
                                  readOnly
                                />
                              </div>
                            </div>
                            <hr />
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-12 col-form-label text-start"
                                style={{
                                  color: "blue",
                                  fontWeight: "600",
                                  fontSize: "16px",
                                }}
                              >
                                Transfer By
                              </label>
                              <div class="col-sm-12">
                                <select
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                  value={selectedBankOption}
                                  disabled={
                                    selectedOption === "By Cash" ||
                                    // selectedOption === "By Cheque" ||
                                    // selectedOption === "By Cheque Return" ||
                                    // selectedOption === "By Transfer" ||
                                    selectedOption === "To Cash" ||
                                    // selectedOption === "To Cheque" ||
                                    // selectedOption === "To Cheque Return" ||
                                    selectedOption === "To Transfer" 
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
                        pagination
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
