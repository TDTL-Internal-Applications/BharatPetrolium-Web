import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const columns = [
  {
    name: "Transaction ID",
    selector: (row) => row.transaction_id,
    sortable: true,
  },
  {
    name: "Account ID",
    selector: (row) => row.account_id,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    cell: (row) => {
      const amount = row.amount;
      const transactionType = row.transaction_type;

      let textColorClass;

      if (transactionType === "Withdrawal") {
        textColorClass = "text-danger";
      } else if (transactionType === "Deposit") {
        textColorClass = "text-success";
      } else {
        textColorClass = "";
      }

      return <span className={textColorClass}>{amount}</span>;
    },
    sortable: true,
  },
  {
    name: "Transaction Date",
    selector: (row) => row.transaction_date,
    sortable: true,
  },
  {
    name: "Transaction Type",
    selector: (row) => row.transaction_type,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
    cell: (row) => {
      const status = row.Status;
      let display, style;

      if (status === "'I' (inprogress)") {
        display = "In Progress";
        style = "text-white bg-warning p-1 rounded";
      } else if (status === "'C' (Completed)") {
        display = "Completed";
        style = "text-white bg-success p-1 rounded";
      } else if (status === "'N' (Cancelled)" || status === "'R' (Reject)") {
        display = "Cancelled";
        style = "text-white bg-danger p-1 rounded";
      } else {
        display = status;
        style = "text-muted p-1 rounded";
      }

      return <span className={style}>{display}</span>;
    },
    sortable: true,
  },
];

export default function TransactionHistory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/transaction_list/")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          console.error("API Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const exportToExcel = () => {
    if (!Array.isArray(data)) {
      console.error("Invalid data format. Please provide an array.");
      return;
    }
    const columnsForExport = [
      { name: "Transaction ID", selector: (row) => row.transaction_id },
      { name: "Account ID", selector: (row) => row.account_id },
      { name: "Amount", selector: (row) => row.amount },
      { name: "Transaction Date", selector: (row) => row.transaction_date },
      { name: "Transaction Type", selector: (row) => row.transaction_type },
      { name: "Status", selector: (row) => row.Status },
    ];
    const fileName = "transactionsheet";

    const exportData = data.map((row) => {
      const rowData = {};
      columnsForExport.forEach((column) => {
        if (column.selector) {
          rowData[column.name] = column.selector(row);
        }
      });
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
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
          <div className="row w-100 align-items-center">
              <div className="col-6 text-start">
                <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Transaction History
                </h2>
              </div>
              <div className="col-6 text-end">
                <SiMicrosoftexcel
                  onClick={exportToExcel}
                  style={{
                    cursor: "pointer",
                    color: "green",
                    fontSize: "1.5em",
                  }}
                />
              </div>
            </div>
          </div>


          {/* DataTable */}
          <DataTable
            // title="Transaction History"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>
    </>
  );
}
