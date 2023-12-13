import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";

export default function Recurring() {
  const [recurringDeposits, setRecurringDeposits] = useState([]);

  useEffect(() => {
    const memberId = localStorage.getItem("member_id");
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/rd_history/", {
        member_id: memberId,
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
      name: "RDID",
      selector: "RDID",
      sortable: true,
    },
    // {
    //   name: "Member ID",
    //   selector: "member_id",
    //   sortable: true,
    // },
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
    // {
    //   name: "Deposit Period",
    //   selector: "deposit_period",
    //   sortable: true,
    // },
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
  ];

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container d-flex text-start w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-6 text-start">
                <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Recurring Deposits
                </h2>
              </div>
            </div>
          </div>
          <DataTable
            title="Recurring Deposits"
            columns={columns}
            data={recurringDeposits}
            pagination
          />
        </div>
      </div>
    </>
  );
}
