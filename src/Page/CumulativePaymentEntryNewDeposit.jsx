import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/cumulativeDeposit.css";
import DataTable from "react-data-table-component";

export default function CumulativePaymentEntryNewDeposit() {
  const [depositData, setDepositData] = useState([]);
  const [newData, setNewData] = useState("");
  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState("");
  let [accountNo, setAccountNo] = useState("");
  let [contribution, setContribution] = useState("");
  let [employeeNumber, setEmployeeNumber] = useState("");
  let [totalBalance, setTotalBalance] = useState("");
  let [TransactionAmount, setTransactionAmount] = useState("");
  let [count, setCount] = useState("");

  let [BottomselectedOption, setBottomselectedOption] = useState("");
  let forSelectTagValues = useRef();
  //   let[payloadState,setPayloadState]=useState

  // let[]

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [transactions, setTransactions] = useState([]);

  // function updateTotalValue(newBalance)
  // {
  //     setTotalBalance(newBalance)
  // }

  // useEffect(()=>{
  //     handleAccountNumberChange(employeeNumber);
  // },[employeeNumber]);

  useEffect(() => {
    handleAccountNumberChange(employeeNumber);
  }, [totalBalance]);

  function handleBottomselectedOption(e) {
    // setBottomselectedOption(e.target.value);
    // if (forSelectTagValues.current.value !== "") {
    //   document.getElementById("cummulative-modal-button").click();
    //   setBottomselectedOption(forSelectTagValues.current.value);
    // }
    const selectedValue = e.target.value;

    if (selectedValue !== "") {
      document.getElementById("cummulative-modal-button").click();
      setBottomselectedOption(selectedValue);
    }
  }

  // useEffect(()=>{
  //     if(BottomselectedOption==="Purchase Cummulative")
  //     {
  //         document.getElementById('cummulative-modal-button').click();
  //     }
  // },[BottomselectedOption]);

  useEffect(() => {
    if (employeeNumber === "") {
      setBottomselectedOption("");
    }
  }, [employeeNumber]);

  useEffect(() => {
    if (count > 0) {
      // let temp=employeeNumber;
      // handleAccountNumberChange("");
      console.log("count is :", count);
      // setBottomselectedOption("");
      setTransactionAmount("");
      forSelectTagValues.current.value = "";
      handleAccountNumberChange(employeeNumber);
    }
  }, [count]);

  // useEffect(()=>{
  //     if(forSelectTagValues.target.value!==null&&forSelectTagValues.target.value==='Purchase Cummulative')
  //     {
  //         document.getElementById('cummulative-modal-button').click();
  //     }
  // },[forSelectTagValues])

  const handleAccountNumberChange = async (newRDID) => {
    setEmployeeNumber(newRDID);
    let dataArray = [];
    let inputObject = {
      purchase_date: (
        <input
          type="date"
          className="inputFields text-center inputf"
          style={{ fontSize: "0.9em" }}
          value={getCurrentDate()}
        />
      ),
      RV_No: (
        <input
          type="number"
          className="inputFields inputf"
          style={{ width: "90%" }}
        />
      ),
      // purchase_type: <input type="text" className="inputFields inputf" style={{ width: '90%' }} />,
      // purchase_type: <select  className="inputFields text-center inputf" required onChange={handleBottomselectedOption}  >
      purchase_type: (
        <select
          className="inputFields text-start inputf"
          required
          onChange={handleBottomselectedOption}
          ref={forSelectTagValues}
          style={{ width: "90%" }}
        >
          <option value="">Select an option</option>
          <option value="To NEFT">To NEFT</option>
          <option value="cheque return">Cheque Return</option>
          <option value="To member settlement">To Member Settlement A/c</option>
          <option value="To cheque">To Cheque</option>
          <option value="To Transfer">To Transfer</option>
          <option value="By cash">By Cash</option>
          <option value="By cheque">By Cheque</option>
          <option value="By Transfer">By Transfer</option>
        </select>
      ),
      cheque_no: (
        <input
          type="number"
          className="inputFields inputf"
          style={{ width: "90%" }}
        />
      ),
      debit: (
        <input
          type="number"
          className="inputFields inputf"
          style={{ width: "90%" }}
        />
      ),
      credit: (
        <input
          type="number"
          className="inputFields inputf"
          style={{ width: "90%" }}
        />
      ),
      share_price: (
        <input
          type="number"
          className="inputFields inputf"
          style={{ width: "90%" }}
        />
      ),
      balance: (
        <input
          type="number"
          className="inputFields text-center inputf"
          value={totalBalance}
          style={{ width: "90%" }}
        />
      ),
      User: (
        <input
          type="text"
          className="inputFields inputf"
          style={{ width: "90%" }}
        />
      ),
    };
    const dataPost = {
      member_id: newRDID,
      purchase_type: "Cumulative",
    };
    if (!newRDID) {
      setData("");
      return;
    }
    try {
      let response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/cumulative/",
        dataPost
      );
      let jsonData = response.data.result_set;
      console.log(jsonData);
      jsonData.map((element) => {
        element.RV_No = element.RV_No || "";
        if(element.transaction_method==='Withdrawal')
        {
          element.debit = element.share_price;
        }
        else{
          element.debit = 0;
        }
         if(element.transaction_method==='Deposit')
        {
          element.credit = element.share_price;
        }
        else{
          element.credit = 0;
        }
        
        element.User = element.User || "";
      });
      dataArray = jsonData;
      dataArray.push(inputObject);
      console.log(dataArray);

      const lastTransaction = dataArray[dataArray.length - 1];
      const atotalAmount = lastTransaction.balance || "";

      let forMemberDetails = response.data.member_info;

      setData(dataArray);
      setFullName(forMemberDetails.name);
      setAccountNo(forMemberDetails.account_id);
      setContribution(forMemberDetails.monthly_contribution);
      setTotalBalance(response.data.total_saving_balance);
    } catch (error) {
      setData([]);
      setFullName("");
      setAccountNo("");
      setContribution("");
      setTotalBalance("");
      console.error("Error fetching employee numbers:", error);
    }
  };

  const [cashAmount, setCashAmount] = useState("");
  const [bankAmount, setBankAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  const formRef = useRef(null);

  const handletransactionpurchase = (event) => {
    let value = event.target.value;
    const enteredAmount = parseInt(value, 10);
    // let enteredAmount = event.target.value;

    if (
      enteredAmount >= 0 &&
      enteredAmount <= 10000 &&
      enteredAmount % 500 === 0
    ) {
      setTransactionAmount(enteredAmount);
    } else {
      setTransactionAmount("");
    }
  };

  async function handleTransferModal() {
    if (
      TransactionAmount % 500 !== 0 ||
      TransactionAmount < 500 ||
      TransactionAmount > 10000
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Amount",
        text: "Please enter a valid share amount: 500, 1000, 1500, ..., 10000",
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-button",
        },
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
        },
      });
      return;
    }

    if (
        TransactionAmount !== parseFloat(cashAmount) &&
        TransactionAmount !== parseFloat(bankAmount) &&
        TransactionAmount !== parseFloat(transferAmount)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Amount Mismatch",
        text: "Transaction amount should be the same for Cash, Bank, and Transfer",
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-button",
        },
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
        },
      });
      return;
    }

    try {
      let response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/cumulative_purchase/",
        {
          member_id: employeeNumber,
          share_price: TransactionAmount,
          payment_method: BottomselectedOption,
          transaction_type: selectedBankTransfer,
        }
      );
      if (
        "message" in response.data &&
        response.data.message === "Share taken successfully"
      ) {
        Swal.fire({
          icon: "success",
          title: "Amount succesully shared",
          text: "shared",
          customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-button",
          },
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
          },
        });


        handleAccountNumberChange(employeeNumber);
        // setEmployeeNumber("");
        setTransactionAmount("");
        setBottomselectedOption("");
        setSelectedTransactionType("");
        setReceiptVoucherNo("");
        setTransactionDetails("");
        setdisablecash(false);
        setdisablebank(false);
        setdisabletransfer(false);

        formRef.current.reset();

        return;
      } else if (
        "error_message" in response.data &&
        response.data.error_message.length > 2
      ) {
        Swal.fire({
          icon: "warning",
          title: "Member has not completed 20 shares.",
          text: " To complete your shareholding, consider exploring shares deposits.",
          customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-button",
          },
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
          },
        });
        return;
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      name: "Date",
      selector: "purchase_date",
      sortable: true,
      center: true,
    },
    {
      name: "RV No.",
      selector: "RV_No",
      sortable: true,
      center: true,
    },
    {
      name: "Particular",
      selector: "purchase_type",
      sortable: true,
      center: true,
    },
    {
      name: "Cheque No.",
      selector: "cheque_no",
      sortable: true,
      center: true,
    },
    {
      name: "Debit",
      selector: "debit",  
      sortable: true,
      center: true,
      
    },
    {
      name: "Credit",
      selector: "credit",  
      sortable: true,
      center: true,
    },
    {
      name: "Share Price",
      selector: "share_price",
      sortable: true,
      center: true,
    },
    {
      name: "Balance",
      selector: "balance",
      sortable: true,
      center: true,
    },
    {
      name: "User",
      selector: "User",
      sortable: true,
      center: true,
    },
  ];

  const showInputRow = true;

  const handleInputChange = (columnName, value) => {
    setNewData((prevData) => ({
      ...prevData,
      [columnName]: value,
    }));
  };

  const handleSave = () => {
    // Add logic to save newData to your data array
    // Reset newData state
    setNewData({});
    console.log(newData);
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "48px",
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        minHeight: "40px",
        backgroundColor: "#4db3c8",
        fontSize: "14px",
        fontWeight: "400",
        color: "white",
        textAlign: "center",
      },
    },
  };

  const [disablecash, setdisablecash] = useState(false);
  const [disablebank, setdisablebank] = useState(false);
  const [disabletransfer, setdisabletransfer] = useState(false);

  const handleAmount = (event) => {
    const { name, value } = event.target;

    if (name === "cashAmount") {
      setCashAmount(value)
      setdisablebank(true);
      setdisabletransfer(true);
    }
    if (name === "bankAmount") {
      setBankAmount(value)
      setdisablecash(true);
      setdisabletransfer(true);
    }
    if (name === "transferAmount") {
      setTransferAmount(value)
      setdisablebank(true);
      setdisablecash(true);
    }
    if (value === "") {
      setdisablebank(false);
      setdisablecash(false);
      setdisabletransfer(false);
    }
  };

  const [selectedTransactionType, setSelectedTransactionType] =
    useState("Select Type");

  const handleTransactionTypeChange = (event) => {
    setSelectedTransactionType(event.target.value);
  };

  const [transactionDetails, setTransactionDetails] = useState("");

  const handleTransactionDetailsChange = (event) => {
    setTransactionDetails(event.target.value);
  };

  const [receiptVoucherNo, setReceiptVoucherNo] = useState("");

  const handleReceiptVoucherNoChange = (event) => {
    setReceiptVoucherNo(event.target.value);
  };

  const [selectedBankTransfer, setSelectedBankTransfer] = useState("");

  const handleBankTransferSelect = (event) => {
    const { value } = event.target;
    setSelectedBankTransfer(value);
  };


  const [processedTransactions, setProcessedTransactions] = useState([]);

  useEffect(() => {
    const processTransactions = () => {
      if (Array.isArray(data)) {
        const updatedTransactions = data.map((item) => {
          const newItem = { ...item };
  
          if (
            item.payment_method === "By cash" ||
            item.payment_method === "By cheque" ||
            item.payment_method === "By Transfer"
          ) {
            newItem.transaction_method = "Deposit";
            newItem.credit = (item.amount); 
            newItem.debit = 0; 
          } else if (
            item.payment_method === "To Transfer" ||
            item.payment_method === "To cheque" ||
            item.payment_method === "cheque return" ||
            item.payment_method === "To NEFT" ||
            item.payment_method === "To member settlement"
          ) {
            newItem.transaction_method = "Withdrawal";
            newItem.debit = (item.amount); 
            newItem.credit = 0; 
          }
  
          return newItem;
        });
  
        setProcessedTransactions(updatedTransactions);
      }
    };
  
    processTransactions();
  
    const intervalId = setInterval(() => {
      processTransactions();
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [data]);
  
  console.log(processedTransactions);
  
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading1 Main */}
          <div className="container-fluid d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">
              Cummulative Deposit Receipt/Payment Entry
            </div>
          </div>

          <div className="container-fluid">
            {/* Your first form code */}
            <div className="row First-Main-Row  pt-3 pb-3">
              {/* Basic Information  */}
              <form>
                <div className="Border-Black p-2 mb-4">
                  <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-9 col-sm-9 text-start ">
                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "0.5em" }}
                      >
                        <div for="rdId" className="small-label ms-1">
                          Employee No.
                        </div>
                        <input
                          type="text"
                          id="rdId"
                          name="employeeno"
                          class="form-control small-placeholder mx-0"
                          value={employeeNumber}
                          // onChange={(e) => handleAccountNumberChange(e.target.value)}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            );
                            handleAccountNumberChange(numericValue);
                            // setEmployeeNumber(numericValue);
                          }}
                          min={0}
                          style={{ width: "37%" }}
                        />
                      </div>

                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div class="no-outline-login my-1 ms-1 d-flex ">
                        <div for="" className="labels me-5">
                          Name
                        </div>
                        <div>: {employeeNumber === "" ? "" : fullName}</div>
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-1 col-md-6 col-sm-9 text-start "></div>

                    <div className="col-xl-4 col-lg-5 col-md-9 col-sm-9 text-start ">
                      <label htmlFor="" className="labels ms-1">
                        Lock Amount : 0
                      </label>
                      <br />
                      <label htmlFor="" className="labels ms-1">
                        Account No. : {employeeNumber === "" ? "" : accountNo}
                      </label>
                      <br />
                      <label htmlFor="" className="labels ms-1">
                        Contribution :{" "}
                        {employeeNumber === "" ? "" : contribution}
                      </label>
                    </div>
                  </div>
                </div>
              </form>

              <button
                data-target="#exampleModalCenter"
                style={{ display: "none" }}
                data-toggle="modal"
                id="cummulative-modal-button"
              >
                click
              </button>

              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header pb-0">
                      <h6 class="modal-title" id="exampleModalCenterTitle">
                        Transaction Details
                      </h6>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body small-label py-0">
                      <div className="row w-100">
                        <div className="modal-body text-start">
                          <form ref={formRef}>
                            <div className="row mb-1 mt-0 pt-0">
                              <label
                                htmlFor="inputBalance3"
                                className="col-sm-4 col-form-label"
                              >
                                Balance in A/c
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  value={totalBalance}
                                  id="inputBalance3"
                                  name="totalSavingBalance"
                                  // onChange={}
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-4 col-form-label"
                              >
                                Transaction Type
                              </label>
                              <div className="col-sm-8">
                                <select
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputEmail3"
                                  name="transactionType"
                                  required
                                  value={selectedTransactionType}
                                  onChange={handleTransactionTypeChange}
                                >
                                  <option>Select Type</option>
                                  <option value="CREDIT/RECEIPT ENTRY">
                                    CREDIT/RECEIPT ENTRY
                                  </option>
                                  <option value="CHEQUE RETURN ENTRY">
                                    CHEQUE RETURN ENTRY
                                  </option>
                                  <option value="RECOVERY ENTRY">
                                    RECOVERY ENTRY
                                  </option>
                                  <option value="TRANSFER CREDIT ENTRY">
                                    TRANSFER CREDIT ENTRY
                                  </option>
                                  <option value="TRANSFER DEBIT ENTRY">
                                    TRANSFER DEBIT ENTRY
                                  </option>
                                  <option value="OTHER CREDIT ENTRY">
                                    OTHER CREDIT ENTRY
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputBank3"
                                className="col-sm-4 col-form-label"
                                style={{ fontSize: "12px" }}
                              >
                                Transaction Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  className="form-control no-outline-login"
                                  id="inputBank3"
                                  step={500}
                                  name="transactionAmount"
                                  required
                                  // value={TransactionAmount}
                                  onChange={handletransactionpurchase}
                                  min={0}
                                  max={10000}
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                Transaction Date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="date"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="transactionDate"
                                  style={{ backgroundColor: "white" }}
                                  value={getCurrentDate()}
                                  required
                                  // onChange={(e) =>
                                  //     setCurrentDate(e.target.value)
                                  // }
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                Transaction Details
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="transactionDetails"
                                  required
                                  value={transactionDetails}
                                  onChange={handleTransactionDetailsChange}
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                                style={{ fontSize: "12px" }}
                              >
                                Reciept/Voucher No.
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="receiptVoucherNo"
                                  required
                                  value={receiptVoucherNo}
                                  onChange={handleReceiptVoucherNoChange}
                                />
                              </div>
                            </div>

                            <hr className="pt-1 pb-1 m-0" />

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                Cash Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="cashAmount"
                                  onChange={handleAmount}
                                  disabled={disablecash}
                                  min={0}
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                Bank Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="bankAmount"
                                  onChange={handleAmount}
                                  disabled={disablebank}
                                  min={0}
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                Transfer Amount
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="transferAmount"
                                  onChange={handleAmount}
                                  disabled={disabletransfer}
                                  min={0}
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label text-start"
                                style={{ fontSize: "12px" }}
                              >
                                Select Bank Transfer
                              </label>
                              <div className="col-sm-8">
                                <select
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="selectedBankTransfer"
                                  required
                                  onChange={handleBankTransferSelect}
                                  value={selectedBankTransfer}
                                >
                                  <option value="">Select Method</option>
                                  <option value="CASH IN HAND">
                                    CASH IN HAND
                                  </option>
                                  <option value="TRANSFER TO / FROM SAVING">
                                    TRANSFER TO / FROM SAVING
                                  </option>
                                  <option value="MEMBER SETTLEMENT ACCOUNT">
                                    MEMBER SETTLEMENT ACCOUNT
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="row pb-1 mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                Cheque No.
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="chequeNo"
                                  required={
                                    selectedTransactionType ===
                                    "CHEQUE RETURN ENTRY"
                                  }
                                  onChange={handletransactionpurchase}
                                  disabled={
                                    selectedTransactionType !==
                                    "CHEQUE RETURN ENTRY"
                                  }
                                />
                              </div>
                            </div>

                            <hr className="m-0 pt-2" />

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                MICR Code
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="micrCode"
                                  required={
                                    selectedTransactionType ===
                                    "CHEQUE RETURN ENTRY"
                                  }
                                  onChange={handletransactionpurchase}
                                  disabled={
                                    selectedTransactionType !==
                                    "CHEQUE RETURN ENTRY"
                                  }
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label"
                              >
                                IFSC Code
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="ifscCode"
                                  required={
                                    selectedTransactionType ===
                                    "CHEQUE RETURN ENTRY"
                                  }
                                  onChange={handletransactionpurchase}
                                  disabled={
                                    selectedTransactionType !==
                                    "CHEQUE RETURN ENTRY"
                                  }
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label text-start"
                              >
                                Select Bank Name
                              </label>
                              <div className="col-sm-8">
                                <select
                                  type="text"
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="selectedBankName"
                                  required={
                                    selectedTransactionType ===
                                    "CHEQUE RETURN ENTRY"
                                  }
                                  onChange={handletransactionpurchase}
                                  disabled={
                                    selectedTransactionType !==
                                    "CHEQUE RETURN ENTRY"
                                  }
                                >
                                  <option>Select Bank Name</option>
                                  <option>SBI Current A/C 2352665</option>
                                  <option>SBI Saving A/C 2352665</option>
                                  <option>Axis Current A/C 2352665</option>
                                </select>
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                htmlFor="inputTransfer3"
                                className="col-sm-4 col-form-label text-start"
                              >
                                Select Bank Branch
                              </label>
                              <div className="col-sm-8">
                                <select
                                  type="text"
                                  required={
                                    selectedTransactionType ===
                                    "CHEQUE RETURN ENTRY"
                                  }
                                  className="form-control no-outline-login"
                                  id="inputTransfer3"
                                  name="selectedBankBranch"
                                  onChange={handletransactionpurchase}
                                  disabled={
                                    selectedTransactionType !==
                                    "CHEQUE RETURN ENTRY"
                                  }
                                >
                                  <option>Select Bank Branch</option>
                                  <option>Mumbai</option>
                                  <option>Pune</option>
                                  <option>Andheri</option>
                                  <option>Ghatkopar</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center align-items-center py-1">
                      <button
                        type="button"
                        class="btn btn-primary text-white "
                        data-dismiss="modal"
                        style={{ padding: "6px 18px" }}
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        Close
                      </button>

                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleTransferModal}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <DataTable
                columns={columns}
                data={processedTransactions}
                customStyles={customStyles}
                pagination
                striped
                dense
                responsive
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
