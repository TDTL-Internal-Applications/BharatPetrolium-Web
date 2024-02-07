import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdPrint } from "react-icons/md";

export default function VoucherPrinting() {
  const [data, setData] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/voucher_printing/",
          {
            current_date: selectedDate,
          }
        );

        setData(response.data.deposit_transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDate]); // Empty dependency array to run the effect only once on mount

  const columns = [
    { name: "Member ID", selector: "member_id" },
    { name: "Employee Number", selector: "emp_no" },
    { name: "Name", selector: "name" },
    { name: "Transaction Date", selector: "transaction_date" },
    { name: "Transaction Type", selector: "transaction_type" },
    { name: "Particular", selector: "particular" },
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
    if (!Array.isArray(data) || data.length === 0) {
      console.error("No data to export.");
      return;
    }

    const fileName = "Voucherprinting";

    const exportData = data.map((row, index) => {
      const rowData = {
        "Sr. No.": index + 1,
        "Member ID": row.member_id,
        "Full Name": row.name,
        "Transaction Date": row.transaction_date,
        "Transaction Type": row.transaction_type,
        "Particular": row.particular,
      };

      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  let [forPagination, setForPagination] = useState(true);

  const handlePrint = () => {
    setForPagination(!forPagination);
    // console.log(forPagination);
    setTimeout(() => {
      let printContents = document.getElementById("printable").innerHTML;
      let originalContents = document.body.innerHTML;
      const style = document.createElement("style");
      style.innerHTML = `
        @media print {
          .printbutton {
            display: none;
          }
        }
      `;
      document.head.appendChild(style);
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }, 0);
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container-fluid d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Voucher Printing</div>
          </div>
          <div className="container-fluid d-flex text-start">
            <div className="row w-100 py-2">
              <div className="col-3">
                <div>Enter Transaction Date</div>
              </div>
              <div className="col-3">
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="col-6 text-end">
                <div className="row">
                  <div className="col-10">
                    <MdPrint
                      onClick={handlePrint}
                      style={{
                        cursor: "pointer",
                        color: "darkblue",
                        fontSize: "1.5em",
                        marginLeft: "10px",
                      }}
                    />
                  </div>
                  <div className="col-2">
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
            </div>
          </div>

          <div className="row py-2">
            <div className="col-12">
              <div id="printable">
                <DataTable
                  columns={columns}
                  data={data}
                  pagination={forPagination}
                  customStyles={customStyles}
                  striped
                  dense
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
