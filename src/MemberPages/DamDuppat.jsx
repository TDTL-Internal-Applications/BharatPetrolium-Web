import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


export default function Recurring() {
  const [recurringDeposits, setRecurringDeposits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showTransactionsTable, setShowTransactionsTable] = useState(false);

  useEffect(() => {
    const memberId = localStorage.getItem("member_id");
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/rd_history/", {
        member_id: memberId,
        Account_type: "Dam Duppat",
      })
      .then((response) => {
        const data = response.data.Output;

        if (Array.isArray(data) && data.slice) {
          setRecurringDeposits(data.slice());
          console.log("API RUN SUCCESSFULLY");
        } else {
          console.error("Invalid data format received from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching recurring deposits:", error);
      });
  }, []);

  const columns = [
    {
      name: "ID",
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

  const handleViewTransactions = (member_id, RDID) => {
    const data = {
      member_id,
      RDID,
      Account_type: "Dam Duppat",
    };
    localStorage.setItem("member_id", member_id);
    console.log("Data before API call:", data);
    axios
      .post(`http://bpcl.kolhapurdakshin.com:8000/rd_history_closure/`, data)
      .then((response) => {
        const responseData = response.data['result'];
        console.log(responseData[0]); 
        setTransactions(responseData);
        setShowTransactionsTable(true); 
      })
      .catch((error) => {
        console.error("Error fetching RD closure transactions:", error);
        toast.error("No Transactions Available!");

      });
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
                  Dam Duppat Transaction
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            {showTransactionsTable && (
            <div>
              
              <DataTable
                title="Transaction Details"
                columns={transactionColumns}
                data={transactions}
                customStyles={customStyles}
                pagination
                responsive
                striped
                dense
              />
              <button
                className="btn btn-success"
                onClick={() => setShowTransactionsTable(false)}
              >
                Back
              </button>
            </div>
          )}

          {!showTransactionsTable && recurringDeposits && (
            <DataTable
              columns={columns}
              data={recurringDeposits}
              customStyles={customStyles}
              // pagination
              fixedHeader
              fixedHeaderScrollHeight="400px"
              responsive
              striped
              dense
            />
          )}
            </div>
          </div>
         
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
