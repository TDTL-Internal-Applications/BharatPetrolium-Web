import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import DataTable from "react-data-table-component";
// import axios from "axios";

const LoanHistory = () => {
  const [selectedLoan, setSelectedLoan] = useState("Loan (total no of loans)");
  const [data, setData] = useState([]);

  useEffect(() => {
    // Uncomment the following API code when you have a working API
    // const fetchData = async () => {
    //   try {
    //     // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch loan history data
    //     const response = await axios.get("YOUR_API_ENDPOINT");
    //     setData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();

    // For now, use dummy data
    const dummyData = [
      {
        id: 1,
        name: "Member 1",
        amount: 1000,
        loanPaid: 500,
        loanUnpaid: 500,
        interestPaid: 200,
      },
      {
        id: 2,
        name: "Member 2",
        amount: 1500,
        loanPaid: 1000,
        loanUnpaid: 500,
        interestPaid: 300,
      },

      // Add more dummy data as needed
    ];
    setData(dummyData);
  }, [selectedLoan]);

  const loanColumns = [
    { name: "Name", selector: "name", sortable: true },
    { name: "Amount", selector: "amount", sortable: true },
    { name: "Loan Paid", selector: "loanPaid", sortable: true },
    { name: "Loan Unpaid", selector: "loanUnpaid", sortable: true },
    { name: "Interest Paid", selector: "interestPaid", sortable: true },
  ];

  const loanDetailsColumns = [
    { name: "Installment", selector: "installment", sortable: true },
    { name: "Date", selector: "date", sortable: true },
    { name: "Payment Mode", selector: "paymentMode", sortable: true },
    { name: "Principle", selector: "principle", sortable: true },
    { name: "Interest", selector: "interest", sortable: true },
    { name: "Total", selector: "total", sortable: true },
  ];

  const loanInstallmentColumns = [
    { name: "Date", selector: "date", sortable: true },
    { name: "Amount", selector: "amount", sortable: true },
    { name: "Payment Mode", selector: "paymentMode", sortable: true },
  ];

  const getStyles = (loanType) => {
    return {
      color: selectedLoan === loanType ? "dodgerblue" : "black",
      ...(selectedLoan === loanType
        ? {
            borderBottom: "2px solid dodgerblue",
            boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.1)",
          }
        : {}),
    };
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex w-100 pb-1">
            <div className="row py-3 w-100 d-flex justify-content-center align-items-center">
              <div
                className="col-3 fs-4 column-heading"
                style={{
                  cursor: "pointer",
                  ...getStyles("Loan (total no of loans)"),
                }}
                onClick={() => setSelectedLoan("Loan (total no of loans)")}
              >
                Loan
              </div>
              <div
                className="col-3 fs-4 column-heading"
                style={{ cursor: "pointer", ...getStyles("Loan Details") }}
                onClick={() => setSelectedLoan("Loan Details")}
              >
                Loan Details
              </div>
              <div
                className="col-3 fs-4 column-heading"
                style={{ cursor: "pointer", ...getStyles("Loan Installment") }}
                onClick={() => setSelectedLoan("Loan Installment")}
              >
                Loan Installment
              </div>
              <div
                className="col-3 fs-4 column-heading"
                style={{ cursor: "pointer", ...getStyles("Loan Outstanding") }}
                onClick={() => setSelectedLoan("Loan Outstanding")}
              >
                Loan Outstanding
              </div>
            </div>
          </div>

          {/* Render the DataTable based on the selected loan */}
          {selectedLoan === "Loan (total no of loans)" && (
            <div className="py-3">
              <h2>Total No. Of Loan: {data.length}</h2>
              <DataTable
                title=""
                columns={loanColumns}
                data={data}
                pagination
                highlightOnHover
                responsive
              />
            </div>
          )}

          {selectedLoan === "Loan Details" && (
            <div className="py-3">
              <h2>Total No. Of Loan: {data.length}</h2>
              {/* <h2>Loan Details</h2> */}
              <DataTable
                title=""
                columns={loanDetailsColumns}
                data={data}
                pagination
                highlightOnHover
                responsive
              />
            </div>
          )}

          {selectedLoan === "Loan Installment" && (
            <div>
              {/* <h2>Loan Installment</h2> */}

              <DataTable
                title=""
                columns={loanInstallmentColumns}
                data={data}
                pagination
                highlightOnHover
                responsive
              />
            </div>
          )}

          {selectedLoan === "Loan Outstanding" && (
            <div>
              {/* <h2>Loan Outstanding</h2> */}
              <DataTable
                title=""
                columns={loanColumns}
                data={data}
                pagination
                highlightOnHover
                responsive
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoanHistory;
