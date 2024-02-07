import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Share from "../Images/statistics_5277005.png";

export default function Shareholder() {
  const [formData, setFormData] = useState({
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
    NumberOfShares: 0,
    share_price: 0,
    PurchaseDate: new Date().toISOString().split("T")[0],
  });

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
      setFormData({
        ...formData,
        employeeNO: memberId,
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

  //   useEffect(() => {
  //     const currentDate = new Date().toISOString().split("T")[0];
  //     setPurchaseDate(currentDate);
  //   }, []);

  const closeModal = () => {
    const modal = document.getElementById("exampleModalCenter");
    const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];

    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
    }

    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }

    setTransactionformData((prevFormData) => ({
      ...prevFormData,
      totalSavingBalance: "",
      transactionType: "",
      transactionAmount: "",
      transactionDate: "",
      transactionDetails: "",
      receiptVoucherNo: "",
      cashAmount: "",
      bankAmount: "",
      transferAmount: "",
      selectedBankTransfer: "",
      chequeNo: "",
      micrCode: "",
      ifscCode: "",
      selectedBankName: "",
      selectedBankBranch: "",
    }));
  };


  const [transactions, setTransactions] = useState([]);
  const [selectedTransactionType, setSelectedTransactionType] = useState("");
  const [selectedBankTransfer, setSelectedBankTransfer] = useState('');

  const handleBankTransferSelect = (event) => {
    const { value } = event.target;
    setSelectedBankTransfer(value);
  };



  const handleTransactionTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedTransactionType(selectedType);
  };

  useEffect(() => {
    // Fetch data from the API and update the state
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/shares/",
          {
            member_id: formData.employeeNO,
          }
        );
        console.log("API Response:", response.data);
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [formData.employeeNO]);

  const [totalSavingBalance, setTotalSavingBalance] = useState("");

  const apiUrl = "http://bpcl.kolhapurdakshin.com:8000/saving_history/";

  const fetchTotalSavingBalance = () => {
    axios
      .post(apiUrl, {
        account_id: formData.employeeNO,
      })
      .then((response) => {
        const data = response.data;
        console.log("API Response:", data);

        const totalSavingBalanceObject = data.find(
          (item) => item.total_saving_balance !== undefined
        );

        if (totalSavingBalanceObject) {
          const totalSavingBalance =
            totalSavingBalanceObject.total_saving_balance;
          console.log("Total Saving Balance:", totalSavingBalance);
          setTotalSavingBalance(totalSavingBalance);
        } else {
          console.error(
            "total_saving_balance is not present in the API response."
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching total saving balance:", error);
      });
  };

  useEffect(() => {
    fetchTotalSavingBalance();
  }, [formData.employeeNO]);

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "100px",
      center: true,
    },
    {
      name: "Shareholder ID",
      selector: "shareholder_id",
      sortable: true,
      center: true,
    },
    // {
    //   name: "Member ID",
    //   selector: "member_id",
    //   sortable: true,
    //   center:true

    // },
    {
      name: "Number of Shares",
      selector: "no_of_shares",
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
      name: "Purchase Date",
      selector: "purchase_date",
      sortable: true,
      center: true,
    },
  ];

  const [transactionformData, setTransactionformData] = useState({
    member_id: formData.employeeNO,
    totalSavingBalance: "",
    transactionType: selectedTransactionType,
    transactionAmount: "",
    transactionDate: "",
    transactionDetails: "",
    receiptVoucherNo: "",
    cashAmount: "",
    bankAmount: "",
    transferAmount: "",
    selectedBankTransfer: "",
    chequeNo: "",
    micrCode: "",
    ifscCode: "",
    selectedBankName: "",
    selectedBankBranch: "",
  });

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredAmount = transactionformData.transactionAmount;

    if (
      enteredAmount % 500 !== 0 ||
      enteredAmount < 500 ||
      enteredAmount > 10000
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

    const enteredAmountsTotal =
      parseFloat(transactionformData.cashAmount || 0) +
      parseFloat(transactionformData.bankAmount || 0) +
      parseFloat(transactionformData.transferAmount || 0);

    if (
      enteredAmountsTotal !==
      parseFloat(transactionformData.transactionAmount || 0)
    ) {
      Swal.fire({
        title: "Error",
        text: "Entered amounts do not match Transaction Amount.",
        icon: "error",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    const data = {
      transactionDate: currentDate,
      member_id: formData.employeeNO,
      share_price: transactionformData.transactionAmount,
      transaction_type: selectedBankTransfer
    };
    if (transactionformData.bankAmount !== "") {
      data.bankAmount = transactionformData.bankAmount;
    }

    if (transactionformData.cashAmount !== "") {
      data.cashAmount = transactionformData.cashAmount;
    }

    if (transactionformData.transferAmount !== "") {
      data.transferAmount = transactionformData.transferAmount;
    }

    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/shares_purchase/",
        data
      );

      console.log("API Response:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Share Purchase Transaction successful!",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button-share");
        },
      });

      closeModal();

      formRef.current.reset();

      setTransactionformData((transactionformData) => ({
        ...transactionformData,
        transactionType: "",
        transactionAmount: "",
        transactionDate: "",
        transactionDetails: "",
        receiptVoucherNo: "",
        cashAmount: "",
        bankAmount: "",
        transferAmount: "",
        // selectedBankTransfer: "",
        chequeNo: "",
        micrCode: "",
        ifscCode: "",
        selectedBankName: "",
        selectedBankBranch: "",
      }));

      setSelectedBankTransfer("")

      setdisablecash(false);
      setdisablebank(false);
      setdisabletransfer(false);

      console.log("After state update:", transactionformData);
    } catch (error) {
      console.error("Error submitting form:", error);
    
      if (error.response && error.response.status === 400) {
        // Assuming 400 status code is for insufficient balance error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Insufficient balance to purchase shares",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button-share");
          },
        });
      } else if (error.response && error.response.status === 403) {
        // Assuming 403 status code is for exceeding share limit error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "You have already taken 20 shares. To further increase your shareholding, consider exploring cumulative deposits!",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button-share");
          },
        });
      } else {
        // For other errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button-share");
          },
        });
      }
    }
  };

  const handletransactionpurchase = (event) => {
    const { name, value } = event.target;
    const enteredAmount = parseInt(value, 10);

    if (
      enteredAmount >= 0 &&
      enteredAmount <= 10000 &&
      enteredAmount % 500 === 0
    ) {
      setTransactionformData((prevTransactionformData) => ({
        ...prevTransactionformData,
        [name]: enteredAmount,
      }));
    } else {
      setTransactionformData((prevTransactionformData) => ({
        ...prevTransactionformData,
        [name]: "",
      }));
    }
  };

  const [disablecash, setdisablecash] = useState(false);
  const [disablebank, setdisablebank] = useState(false);
  const [disabletransfer, setdisabletransfer] = useState(false);

  const handleAmount = (event) => {
    const { name, value } = event.target;
    setTransactionformData((prevTransactionformData) => ({
      ...prevTransactionformData,
      [name]: value,
    }));

    if (name === "cashAmount") {
      // setdisablecash(true);
      setdisablebank(true);
      setdisabletransfer(true);
    }
    if (name === "bankAmount") {
      // setdisablebank(true);
      setdisablecash(true);
      setdisabletransfer(true);
    }
    if (name === "transferAmount") {
      setdisablebank(true);
      setdisablecash(true);
      // setdisabletransfer(true);
    }
    if (value === "") {
      setdisablebank(false);
      setdisablecash(false);
      setdisabletransfer(false);
    }
  };

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    // Disable other fields based on the updated state
    if (formData.cashAmount !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bankAmount: "",
        transferAmount: "",
      }));
    } else if (formData.bankAmount !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cashAmount: "",
        transferAmount: "",
      }));
    } else if (formData.transferAmount !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cashAmount: "",
        bankAmount: "",
      }));
    }
  }, [formData]);

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

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <h2
              className="d-flex align-items-center"
              style={{ fontWeight: "bold", color: "dodgerblue" }}
            >
              <img src={Share} alt="" style={{ height: "35px" }} />
              &nbsp;Shares Registration
            </h2>
          </div>
          <div className="container d-flex justify-content-center">
            <div
              className="row py-2 w-100"
              style={{ backgroundColor: "whitesmoke", borderRadius: "10px" }}
            >
              <div className="col-12">
                <form className="small-label">
                  {/* 1st Row */}
                  <div className="row pb-1">
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Member ID*</label>
                      <input
                        type="text"
                        name=""
                        className="form-control no-outline"
                        value={formData.memberId}
                        onChange={handleMemberIdChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        min={0}
                        required
                      />
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control no-outline"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control no-outline"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Gender*</label>
                      <select
                        name="gender"
                        className="form-select no-outline"
                        value={formData.gender}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                          fontSize: "12px",
                        }}
                        required
                        disabled
                      >
                        <option></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Email*</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control no-outline"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Opening Date*</label>
                      <input
                        type="date"
                        name="date"
                        className="form-control no-outline"
                        value={currentDate}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  {/* 3rd Row */}
                  <div className="row pb-1">
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Posting*</label>
                      <select
                        type="text"
                        name="posting"
                        className="form-select no-outline"
                        style={{
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        required
                        disabled
                      >
                        <option value="">Select an Option</option>
                        <option value="Account">Account</option>
                        <option value="Society">Society</option>
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Division*</label>
                      <select
                        type="text"
                        name="posting"
                        className="form-select no-outline"
                        style={{
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        required
                        disabled
                      >
                        <option value="BPCL">BPCL</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Post*</label>
                      <select
                        type="text"
                        name="posting"
                        className="form-select no-outline"
                        style={{
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        required
                        disabled
                      >
                        <option value=""></option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="container d-flex">
            <div
              className="row py-2 w-100"
              style={{
                backgroundColor: "",
                borderRadius: "10px",
              }}
            >
              <div className="col-12">
                <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Transaction History
                </h3>
                {formData.employeeNO !== "" ? (
                  <DataTable
                    columns={columns}
                    data={transactions}
                    noHeader
                    pagination
                    striped
                    dense
                    responsive
                    customStyles={customStyles}
                  />
                ) : (
                  <p style={{ textAlign: "center" }}>
                    No data available, Please Insert The Member ID!
                  </p>
                )}
              </div>
              <div className="col-12 d-flex justify-content-start py-3">
                {formData.employeeNO !== "" ? (
                  <button
                    type="button"
                    class="btn"
                    style={{ backgroundColor: "green", color: "white" }}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={fetchTotalSavingBalance}
                  >
                    Transfer
                  </button>
                ) : (
                  ""
                )}

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
                      <div class="modal-header pb-0">
                        <h6 class="modal-title" id="exampleModalCenterTitle">
                          Transaction Details
                        </h6>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body small-label py-0">
                        <div className="row w-100">
                          <div className="modal-body text-start">
                            <form ref={formRef} onSubmit={handleSubmit}>
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
                                    value={totalSavingBalance}
                                    id="inputBalance3"
                                    name="totalSavingBalance"
                                    onChange={handletransactionpurchase}
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
                                    value={currentDate}
                                    required
                                    onChange={(e) =>
                                      setCurrentDate(e.target.value)
                                    }
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
                                    onChange={handletransactionpurchase}
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
                                    // value={}
                                    required
                                    onChange={handletransactionpurchase}
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
                                    <option value="TRANSFER TO/FROM SAVING">
                                    TRANSFER TO/FROM SAVING
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
                                    required={
                                      selectedTransactionType ===
                                      "CHEQUE RETURN ENTRY"
                                    }
                                    className="form-control no-outline-login"
                                    id="inputTransfer3"
                                    name="selectedBankName"
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
                        >
                          Close
                        </button>

                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleSubmit}
                        >
                          Transfer
                        </button>
                      </div>
                    </div>
                  </div>
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
