import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "./Sidebar";
import Header from "../components/Header";

export default function AllLoanTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (memberId.trim() !== "") {
      fetchAllTransactions();
    }
  }, [memberId, startDate, endDate]);

  const fetchAllTransactions = () => {
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/all_loan_transaction/", {
        member_id: memberId,
        date_from: startDate,
        date_to: endDate,
      })
      .then((response) => {
        const data = response.data.loan_details;
        if (data) {
          setTransactions(data);
        } else {
          console.error("Data is undefined:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleMemberIdChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) || input === "") {
      setMemberId(input);
    }
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const columns = [
    { name: "Loan ID", selector: "loan_no", sortable: true },
    { name: "A/c Type", selector: "ac_type", sortable: true },
    { name: "Loan Amt", selector: "loan_amt", sortable: true },
    { name: "Interest Rate", selector: "interest_rate", sortable: true },
    { name: "Start Date", selector: "loan_date", sortable: true },
    { name: "Due Date", selector: "due_date", sortable: true },
    { name: "Penalty", selector: "penalty", sortable: true },
  ];

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
          {/* Heading1 Main */}
          <div className="container-fluid ps-0 d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">All Loan Transaction</div>
          </div>

          {/* Member ID Input */}
          <div className="row w-100 py-3">
            <div className="col-3 text-start" style={{ width: "10rem" }}>
              <label htmlFor="memberIdFilter" className="form-label">
                Member ID:
              </label>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control no-outline-login"
                id="memberId"
                value={memberId}
                onChange={handleMemberIdChange}
              />
            </div>
            <div className="col-3">
              <input type="date" className="form-control" id="startDate"
            value={startDate}
            onChange={handleStartDateChange}/>
            </div>
            <div className="col-3">
              <input type="date" className="form-control"  id="endDate"
            value={endDate}
            onChange={handleEndDateChange}/>
            </div>
          </div>

          {/* DataTable */}
          {memberId.trim() !== "" && transactions.length > 0 && (
            <DataTable
              columns={columns}
              data={transactions}
              customStyles={customStyles}
              pagination
              highlightOnHover
              striped
              dense
              responsive
            />
          )}
        </div>
      </div>
    </>
  );
}
