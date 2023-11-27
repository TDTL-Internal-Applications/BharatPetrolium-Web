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
        "http://127.0.0.1:8000/new_transaction/",
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
      .post("http://127.0.0.1:8000/member_names/")
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
        .post(`http://127.0.0.1:8000/fetch_member/`, {
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
            <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              New Transaction
            </h2>
          </div>
          <div
            className="container py-3 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row w-75">
              <form>
                <div className="row mb-3 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Date*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <input
                      required
                      disabled
                      type="date"
                      className="form-control no-outline"
                      value={transaction_date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{ background: "white" }}
                    />
                  </div>
                </div>
                <div className="row mb-3 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Member*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <select
                      required
                      className="form-select no-outline"
                      value={selectedMember}
                      onChange={(e) => setSelectedMember(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Member
                      </option>
                      {members.map((member, index) => (
                        <option key={index} value={member.full_name}>
                          {member.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Account ID*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <input
                      required
                      disabled
                      type="number"
                      className="form-control no-outline"
                      value={account_id}
                      onChange={(e) => setAccountId(e.target.value)}
                      style={{ background: "white" }}
                    />
                  </div>
                </div>
                <div className="row mb-3 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Amount*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <input
                      required
                      type="number"
                      className="form-control no-outline"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>
                {/* <div className="row mb-3 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Debit/Credit*
                  </label>
                  <div className="col-sm-12 col-md-12 col-lg-10">
                    <select
                      className="form-control no-outline"
                      value={debitCredit}
                      onChange={(e) => setDebitCredit(e.target.value)}
                    >
                      <option>Select One</option>
                      <option>Credit</option>
                      <option>Debit</option>
                    </select>
                  </div>
                </div> */}
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

                <div className="row mb-3 text-start">
                  <label className="col-sm-12 col-md-12 col-lg-2 col-form-label">
                    Description*
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
                <div className="row mb-3 text-center">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="btn"
                      style={{
                        padding: "10px 30px 10px 30px",
                        backgroundColor: "dodgerblue",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "20px",
                      }}
                    >
                      Complete Transaction
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
