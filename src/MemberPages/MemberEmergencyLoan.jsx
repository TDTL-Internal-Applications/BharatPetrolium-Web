import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";

export default function MemberMedTerm() {
  const [transactions, setTransactions] = useState([]);
  const member_id = localStorage.getItem("member_id");

  useEffect(() => {
    // Check if member_id exists in local storage
    if (!member_id) {
      console.error("Member ID not found in local storage");
      return;
    }

    // Replace 'your_api_endpoint' with the actual API endpoint for fetching member loan transactions
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/mem_loan_transaction/", {
        member_id: member_id,
        ac_type: "emergency loan",
      })
      .then((response) => {
        setTransactions(response.data.result); // Assuming your API response is an array of transactions
      })
      .catch((error) => {
        console.error("Error fetching member loan transactions:", error);
      });
  }, [member_id]);

  const columns = [
    { name: "Transaction ID", selector: "loan_transaction_ID", sortable: true },
    { name: "Loan Number", selector: "loan_no", sortable: true },
    // { name: "RV Number", selector: "rv_no", sortable: true },
    { name: "Transaction Date", selector: "transaction_date", sortable: true },
    { name: "Balance", selector: "balance", sortable: true },
    { name: "Debit", selector: "debit", sortable: true },
    { name: "Interest", selector: "interest", sortable: true },
    // { name: "Misc", selector: "misc", sortable: true },
    // { name: "Operator", selector: "operator", sortable: true },
    { name: "Particular", selector: "particular", sortable: true },
    { name: "Penalty", selector: "penalty", sortable: true },
    { name: "Principle", selector: "principle", sortable: true },
    { name: "Total", selector: "total", sortable: true },
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
          <Header />
          <div className="container-fluid ps-0 d-flex text-start w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-6 text-start">
                <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Emergency Loan Transaction
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12" >
              <DataTable
             
                columns={columns}
                pagination
                data={transactions}
                customStyles={customStyles}
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
