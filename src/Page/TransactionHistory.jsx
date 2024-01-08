import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const columns = [
  {
    name: "Account ID",
    selector: (row) => row.account_id,
    // sortable: true,
  },
  {
    name: "Transaction Date",
    selector: (row) => row.transaction_date,
    // sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
    // cell: (row) => {
    //   const status = row.status;
    //   let display, style;

    //   if (status === "'I' (inprogress)") {
    //     display = "In Progress";
    //     style = "text-white bg-warning p-1 rounded";
    //   } else if (status === "'C' (Completed)") {
    //     display = "Completed";
    //     style = "text-white bg-success p-1 rounded";
    //   } else if (status === "'N' (Cancelled)" || status === "'R' (Reject)") {
    //     display = "Cancelled";
    //     style = "text-white bg-danger p-1 rounded";
    //   } else {
    //     display = status;
    //     style = "text-muted p-1 rounded";
    //   }

    //   return <span className={style}>{display}</span>;
    // },
    // sortable: true,
  },
  {
    name: "Particular",
    selector: (row) => row.particular,
    // sortable: true,
  },
  {
    name: "Cheque No",
    selector: (row) => row.cheque_no,
    // sortable: true,
  },
  {
    name: "Narration",
    selector: (row) => row.naration,
    // sortable: true,
  },
  {
    name: "Operator",
    selector: (row) => row.operator,
    // sortable: true,
  },
];

export default function TransactionHistory() {
  const [data, setData] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/transaction_list/", {
        member_id: memberId,
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
          setMemberData(response.data.data);
        } else {
          console.error("API Response data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [memberId]);

  const handleMemberIdChange = (e) => {
    const input = e.target.value;
    // Allow only numbers in the input
    if (/^\d*$/.test(input) || input === "") {
      setMemberId(input);
    }
  };

  const exportToExcel = () => {
    if (!Array.isArray(memberData)) {
      console.error("Invalid data format. Please provide an array.");
      return;
    }
    const fileName = "transactionsheet";

    const exportData = memberData.map((row) => {
      const rowData = {};
      columns.forEach((column) => {
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
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Member ID input */}
          <div className="mb-3 d-flex">
            <div className="col-3 text-start">
              <label htmlFor="memberId" className="form-label">
                Enter Member ID
              </label>
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                id="memberId"
                value={memberId}
                onChange={handleMemberIdChange}
              />
            </div>
          </div>

          {/* DataTable */}
          {memberData.length > 0 && (
            <DataTable
              columns={columns}
              data={memberData}
              customStyles={customStyles}
              striped
              dense
              pagination
            />
          )}
        </div>
      </div>
    </>
  );
}
