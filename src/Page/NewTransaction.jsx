import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function NewTransaction() {
  const [transactionDate, setTransactionDate] = useState("");
  const [amount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [description, setDescription] = useState("");
  const [memberId, setMemberId] = useState("");
  const [name, setName] = useState("");
  const [accountHead, setAccountHead] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [bankAmount, setBankAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [disableCash, setDisableCash] = useState(false);
  const [disableBank, setDisableBank] = useState(false);
  const [disableTransfer, setDisableTransfer] = useState(false);
  const userRole = localStorage.getItem("role_name");

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value);

    if (!isNaN(amount) && amount >= 0) {
      setTransactionAmount(amount);
    } else {
      setTransactionAmount("");
    }
  };
  const handleInputChange = (name, value) => {
    let updatedTransactionAmount = 0;

    if (!isNaN(value)) {
      const numericValue = parseFloat(value);

      if (name === "cashAmount") {
        setDisableBank(true);
        setDisableTransfer(true);
        updatedTransactionAmount = numericValue;
      } else if (name === "bankAmount") {
        setDisableCash(true);
        setDisableTransfer(true);
        updatedTransactionAmount = numericValue;
      } else if (name === "transferAmount") {
        setDisableBank(true);
        setDisableCash(true);
        updatedTransactionAmount = numericValue;
      }
    }

    if (value === "") {
      setDisableBank(false);
      setDisableCash(false);
      setDisableTransfer(false);
      updatedTransactionAmount = 0;
    }

    setTransactionAmount(updatedTransactionAmount);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedBankAmount = bankAmount;
    let updatedCashAmount = cashAmount;
    let updatedTransferAmount = transferAmount;

    if (bankAmount !== "") {
      updatedBankAmount = bankAmount;
    }

    if (cashAmount !== "") {
      updatedCashAmount = cashAmount;
    }

    if (transferAmount !== "") {
      updatedTransferAmount = transferAmount;
    }

    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/transaction/",
        {
          member_id: memberId,
          name: name,
          date: transactionDate,
          account_head: accountHead,
          cash_amount: updatedCashAmount,
          bank_amount: updatedBankAmount,
          transfer_amount: updatedTransferAmount,
          transaction_type: transactionType,
          naration: description,
          amount: amount,
        }
      );

      if (response.status === 200) {
        console.log("Transaction completed successfully");
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Transaction successful !",
          customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-button",
          },
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });

        // Resetting All Inputs
        // setTransactionDate("");
        setTransactionAmount("");
        setTransactionType("");
        setDescription("");
        setMemberId("");
        setName("");
        setAccountHead("");
        setCashAmount("");
        setBankAmount("");
        setTransferAmount("");
        setDisableCash(false);
        setDisableBank(false);
        setDisableTransfer(false);
      } else {
        console.error("Transaction failed with status code:", response.status);
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "Transaction Failed",
          customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-button",
          },
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with an error status:",
          error.response.status
        );
        console.error("Server error data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error(
          "An error occurred during the transaction:",
          error.message
        );
      }
    }
  };

  const reset = () => {
    // Resetting All Inputs
    //  setTransactionDate("");
    setTransactionAmount("");
    setTransactionType("");
    setDescription("");
    setMemberId("");
    setName("");
    setAccountHead("");
    setCashAmount(null);
    setBankAmount(null);
    setTransferAmount(null);
    setDisableCash(false);
    setDisableBank(false);
    setDisableTransfer(false);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setTransactionDate(currentDate);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (memberId !== undefined && memberId !== null && memberId !== '') {
        try {
          const response = await axios.get(
            `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`
          );
  
          if (response.data && response.data.members && response.data.members.length > 0) {
            const member = response.data.members[0];
            const fullName = `${member.first_name} ${member.middle_name} ${member.last_name}`.trim();
            setName(fullName);
          } else {
            setName('');
          }
        } catch (error) {
          console.error("Error fetching member name:", error);
        }
      } else {
        setName('');
      }
    };
  
    fetchData();
  }, [memberId]);
  


  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Receipt & Payment Entries
            </h3>
          </div>
          <div
            className="container py-3 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row w-100">
              <form>
                <div className="row mb-2 text-start d-flex align-items-center">
                  <div className="col-lg-6 col-md-12 col-sm-12 py-1 d-flex">
                    <div class="row mb-1">
                      <label
                        for="date"
                        class="col-lg-2 col-md-12 col-sm-12 col-form-label"
                      >
                        Date
                      </label>
                      <div class="col-lg-3 col-md-12 col-sm-12 col-sm-4">
                        <input
                          type="date"
                          class="form-control no-outline"
                          style={{ background: "white" }}
                          readOnly
                          value={transactionDate}
                          onChange={(e) => setTransactionDate(e.target.value)}
                        />
                      </div>
                      <label
                        for="vocher"
                        class="col-lg-5 col-md-12 col-sm-12 col-form-label"
                      >
                        Receipt/Voucher No*
                      </label>
                      <div class="col-lg-2 col-md-12 col-sm-12">
                        <input type="text" class="form-control no-outline" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-2 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-1 col-form-label">
                    Member*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-1 py-1">
                    <input
                      type="text"
                      className="form-control no-outline"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-2 py-1">
                    <input type="text" className="form-control no-outline" />
                  </div>
                  <label className="col-sm-12 col-md-12 col-lg-1 col-form-label">
                    Name*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-7">
                    <input
                      type="text"
                      required
                      className="form-control no-outline bg-white"
                      value={name}
                       readOnly
                    />
                  </div>
                </div>

                <div className="row mb-2 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Select Account Head*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <select
                      type="select"
                      className="form-select no-outline-login"
                      defaultValue={userRole}
                      onChange={(e) => setAccountHead(e.target.value)}
                    disabled
                    >
                      <option>{userRole}</option>
                      <option value="Admin">Admin</option>
                      <option value="Operator">Operator</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-2 text-start">
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <label for="inputEmail4" class="form-label">
                      Transaction Amt.
                    </label>
                    <input
                      type="text"
                      class="form-control no-outline"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <label for="inputEmail4" class="form-label">
                      Cash Amt.
                    </label>
                    <input
                      type="text"
                      class="form-control no-outline"
                      value={cashAmount}
                      onChange={(e) => {
                        setCashAmount(e.target.value);
                        handleInputChange("cashAmount", e.target.value);
                      }}
                      disabled={disableCash}
                    />
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <label for="inputEmail4" class="form-label">
                      Bank Amt.
                    </label>
                    <input
                      type="text"
                      class="form-control no-outline"
                      value={bankAmount}
                      onChange={(e) => {
                        setBankAmount(e.target.value);
                        handleInputChange("bankAmount", e.target.value);
                      }}
                      disabled={disableBank}
                    />
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <label for="inputEmail4" class="form-label">
                      Transfer Amt.
                    </label>
                    <input
                      type="text"
                      class="form-control no-outline"
                      value={transferAmount}
                      onChange={(e) => {
                        setTransferAmount(e.target.value);
                        handleInputChange("transferAmount", e.target.value);
                      }}
                      disabled={disableTransfer}
                    />
                  </div>
                </div>
                <div className="row mb-3 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Transaction Type*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <select
                      required
                      className="form-control no-outline"
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value)}
                    >
                      <option>Select One</option>
                      <option value="Deposit">Deposit</option>
                      <option value="Withdrawal">Withdrawal</option>
                      <option value="Transfer">Transfer</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-2 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Naration*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <textarea
                      className="form-control no-outline"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2 text-center">
                  <div className="col-1"></div>
                  <div className="col-sm-12 col-md-12 col-lg-3 py-1">
                    <button
                      type="submit"
                      // onClick={handleSubmit}
                      className="btn"
                      style={{
                        padding: "7px 25px 7px 25px",
                        backgroundColor: "#fd7e14f0",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "17px",
                      }}
                    >
                      Receipt Entry
                    </button>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-3 py-1">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn"
                      style={{
                        padding: "7px 19px 7px 19px",
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "17px",
                      }}
                    >
                      Payment Entry
                    </button>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-3 py-1">
                    <button
                      type="reset"
                      onClick={reset}
                      className="btn"
                      style={{
                        padding: "7px 57px 7px 57px",
                        backgroundColor: "#007bff",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "17px",
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="col-1"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
