import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FcApproval } from "react-icons/fc";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import { SiMicrosoftexcel } from "react-icons/si";
import * as XLSX from "xlsx";

const LoanApprovalReports = () => {
  const [approvedLoanData, setApprovedLoanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/approvedloan/",
          {
            start_date: startDate,
            end_date: endDate,
          }
        );
        const data = response.data.data;
        setApprovedLoanData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [startDate, endDate]);
  

  const columns = [
    { name: "Loan ID", selector: "loan_no", sortable: true },
    { name: "Member ID", selector: "member_id", sortable: true },
    { name: "Loan Date", selector: "loan_date", sortable: true },
    { name: "Customer Name", selector: "name", sortable: true },
    { name: "Account Type", selector: "ac_type", sortable: true },
    { name: "Loan Amount", selector: "loan_amt", sortable: true },
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
    if (!Array.isArray(approvedLoanData) || approvedLoanData.length === 0) {
      console.error("No data to export.");
      return;
    }

    const fileName = "Approved Loan";

    const exportData = approvedLoanData.map((row, index) => {
      const rowData = {
        "Sr. No.": index + 1,
        "Loan ID": row.loan_no,
        "Member ID": row.member_id,
        "Loan Date": row.loan_date,
        "Customer Name": row.name,
        "Account Type": row.ac_type,
        "Loan Amount": row.loan_amt,
      };

      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    filterData(searchValue, selectedLoanType);
  };

  // Handle loan type selection change
  const handleLoanTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedLoanType(selectedType);
    filterData(searchText, selectedType);
  };

  // Filter data based on search text and selected loan type
  const filterData = (search, loanType) => {
    let filteredResults = approvedLoanData;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredResults = filteredResults.filter(
        (row) =>
          row.name.toLowerCase().includes(searchLower) ||
          row.loan_no.toString().includes(searchLower) ||
          row.member_id.toString().includes(searchLower)
      );
    }

    if (loanType) {
      filteredResults = filteredResults.filter(
        (row) => row.ac_type === loanType
      );
    }

    setFilteredData(filteredResults);
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div
            className="container align-items-center d-flex text-start w-100 pb-1"
            style={{ flexDirection: "column" }}
          >
            <div className="row w-100 ">
              <div className="col-12">
                <h3
                  className="d-flex align-items-center"
                  style={{ fontWeight: "bold", color: "dodgerblue" }}
                >
                  Approved Loans&nbsp;
                  <FcApproval />
                </h3>
              </div>
            </div>
            <div className="row w-100 d-flex align-items-center justify-content-end">
              <div className="col-2">
                <input
                  type="date"
                  className="form-control"
                  name="startdate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-2">
                <input
                  type="date"
                  className="form-control"
                  name="enddate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="col-2">
                {/* Search Input By Customer name */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Name, Loan ID, Member ID"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="col-2">
                {/* Select input for loan type */}
                <select
                  className="form-select"
                  onChange={handleLoanTypeChange}
                  value={selectedLoanType}
                >
                  <option value="">All Loan</option>
                  {/* Add other loan types based on your data */}
                  <option value="Emergency Loan">Emergency Loan</option>
                  <option value="Medium Term Loan">Medium Term Loan</option>
                  <option value="Staff Med Term Loan">
                    Staff Medium Term Loan
                  </option>
                  <option value="Staff Emergency loan">
                    Staff Emergency Loan
                  </option>
                </select>
              </div>
              <div className="col-1 d-flex justify-content-end">
                <SiMicrosoftexcel
                  onClick={exportToExcel}
                  style={{
                    cursor: "pointer",
                    color: "green",
                    fontSize: "2em",
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <DataTable
              columns={columns}
              data={filteredData}
              customStyles={customStyles}
              dense
              striped
              pagination
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanApprovalReports;
