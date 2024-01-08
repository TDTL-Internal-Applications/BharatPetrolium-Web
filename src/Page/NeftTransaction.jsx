import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

export default function NeftTransaction() {
  const [neftTransactions, setNeftTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchNeftTransactions();
  }, [startDate, endDate]);

  const fetchNeftTransactions = () => {
    const requestData = {
      date_from: startDate,
      date_to: endDate,
    };

    axios
      .post(
        "http://bpcl.kolhapurdakshin.com:8000/neft_transaction/",
        requestData
      )
      .then((response) => {
        console.log(response.data);
        const data = response.data.result;
        if (data) {
          setNeftTransactions(data);
        } else {
          console.error("Data is undefined:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching NEFT transactions:", error);
      });
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "100px",
      center: true,
    },
    { name: "Type", selector: "transaction_type", sortable: true },
    { name: "IFSC Code", selector: "IFSC_code", sortable: true },
    { name: "Cheque no", selector: "cheque_no", sortable: true },
    { name: "Bank Name", selector: "bank_name", sortable: true },
    { name: "Branch Name", selector: "branch_name", sortable: true },
    { name: "Account No", selector: "bank_ac_no", sortable: true },
    { name: "Amount", selector: "amount", sortable: true },
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

  const exportToExcel = () => {
    const columnsForExport = columns.filter((column) => column.selector);
    const fileName = "NEFT_Transactions";

    const exportData = neftTransactions.map((row, index) => {
      const rowData = {
        "Sr. No.": index + 1,
      };

      columnsForExport.forEach((column) => {
        if (column.name !== "Sr. No.") {
          rowData[column.name] = row[column.selector];
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
          <Header />
          <div className="container d-flex text-start w-100 pb-1 ps-0">
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              NEFT Transactions
            </h3>
          </div>
          {/* Date Filters */}
          <div className="row w-100 py-3 d-flex align-items-center">
            <div className="col-6 d-flex">
              <div class="form-group col-6 text-start ps-0">
                <label htmlFor="startDateFilter">Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              <div class="form-group col-6 text-start ps-0">
                <label htmlFor="endDateFilter">End Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end pe-0">
              <div className="col-2">
                <span
                  onClick={exportToExcel}
                  style={{
                    cursor: "pointer",
                    color: "green",
                    fontSize: "1.5em",
                  }}
                  title="Export Excel"
                >
                  <SiMicrosoftexcel />
                </span>
              </div>
            </div>
          </div>
          {/* DataTable */}
          {neftTransactions.length > 0 && (
            <>
              <DataTable
                columns={columns}
                data={neftTransactions}
                customStyles={customStyles}
                pagination
                highlightOnHover
                striped
                dense
                responsive
              />
              {/* Export to Excel Button */}
              <div className="row w-100 py-3">
                <div className="col-2"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
