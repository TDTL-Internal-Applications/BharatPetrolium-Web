import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function NewTransaction() {
  const [transaction_date, setDate] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [account_id, setAccountId] = useState("");
  const [amount, setTransactionAmount] = useState("");
  // const [debitCredit, setDebitCredit] = useState("");
  const [transaction_type, setTransactionType] = useState("");
  const [Status, setStatus] = useState("In Progress");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value);

    if (!isNaN(amount) && amount >= 0) {
      setTransactionAmount(amount);
    } else {
      setTransactionAmount("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMember) {
      console.error("Selected member is required");
      return;
    }

    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/new_transaction/",
        {
          transaction_date,
          member: selectedMember,
          account_id,
          amount,
          transaction_type,
          Status,
          description,
        }
      );

      if (response.status === 200) {
        console.log("Transaction completed successfully");
        toast.success("Transaction Successfull");
      } else {
        console.error("Transaction failed with status code:", response.Status);
        toast.error("Transaction Successfull");
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with an error status:",
          error.response.Status
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

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDate(currentDate);
  }, []);

  useEffect(() => {
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/member_names/")
      .then((response) => {
        // Assuming the member names are in response.data.members
        const memberNamesArray = response.data.members || [];
        console.log("membernamearray", memberNamesArray);
        setMembers(memberNamesArray);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);
  console.log("selected", selectedMember);
  useEffect(() => {
    if (selectedMember) {
      axios
        .post(`http://bpcl.kolhapurdakshin.com:8000/fetch_member/`, {
          member_name: selectedMember,
        })
        .then((response) => {
          const jsondata = response.data.member_id["0"];
          const member_id = jsondata.member_id;
          setAccountId(member_id);
          console.log("member id:", member_id);
        })
        .catch((error) => {
          console.error("Error fetching account number:", error);
        });
    } else {
      setAccountId("");
    }
  }, [selectedMember]);

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
                          value={transaction_date}
                          onChange={(e) => setDate(e.target.value)}
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
                    <input type="text" className="form-control no-outline" />
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
                      className="form-control no-outline"
                    />
                  </div>
                </div>

                <div className="row mb-2 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Select Account Head*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <select
                      required
                      type="number"
                      className="form-control no-outline"
                      value={amount}
                      onChange={handleAmountChange}
                    >
                      <option>Select</option>

                      <option>Admin</option>
                      <option>Operator</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-2 text-start">
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <label for="inputEmail4" class="form-label">
                      Transaction Amt.
                    </label>
                    <input type="text" class="form-control no-outline" />
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <label for="inputEmail4" class="form-label">
                      Cash Amt.
                    </label>
                    <input type="text" class="form-control no-outline" />
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <label for="inputEmail4" class="form-label">
                      Bank Amt.
                    </label>
                    <input type="text" class="form-control no-outline" />
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-12">
                    <label for="inputEmail4" class="form-label">
                      Transfer Amt.
                    </label>
                    <input type="text" class="form-control no-outline" />
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
                      value={transaction_type}
                      onChange={(e) => setTransactionType(e.target.value)}
                    >
                      <option>Select One</option>
                      <option>Deposit</option>
                      <option>Withdrawal</option>
                      <option>Transfer</option>
                    </select>
                  </div>
                </div>
                {/* <div className="row mb-3 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Status*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <select
                      required
                      className="form-control no-outline"
                      value={Status}
                      readOnly
                    >
                      <option>Select One</option>
                      <option>Completed</option>
                      <option>In Progress</option>
                      <option>Failed</option>
                    </select>
                  </div>
                </div> */}

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
                  <div className="col-sm-12 col-md-12 col-lg-4 py-1">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn"
                      style={{
                        padding: "7px 25px 7px 25px",
                        backgroundColor: "green",
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
                  <div className="col-sm-12 col-md-12 col-lg-4 py-1">
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
                  <div className="col-sm-12 col-md-12 col-lg-4 py-1">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn"
                      style={{
                        padding: "7px 57px 7px 57px",
                        backgroundColor: "grey",
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
