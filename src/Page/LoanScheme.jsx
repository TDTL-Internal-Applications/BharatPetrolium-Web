import React, { useState, useRef } from "react";
import DataTable from "react-data-table-component";
// import XLSX from 'xlsx';
import * as XLSX from "xlsx";
import "../Style/Dashboard.css";
import Sidebar from "./Sidebar";
import { SiMicrosoftexcel } from "react-icons/si";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LuRefreshCcw } from "react-icons/lu";

export default function LoanScheme() {
  // const componentPDF = useRef()
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([
    {
      id: 1,
      schemeName: "Personal Loan",
      maximumAmount: 50000,
      interestRate: 5,
    },
    {
      id: 2,
      schemeName: "Personal Loan 2",
      maximumAmount: 50000,
      interestRate: 5,
    },
    {
      id: 3,
      schemeName: "Personal Loan",
      maximumAmount: 50000,
      interestRate: 5,
    },
    {
      id: 4,
      schemeName: "Personal Loan",
      maximumAmount: 50000,
      interestRate: 5,
    },
    {
      id: 5,
      schemeName: " Loan",
      maximumAmount: 50000,
      interestRate: 5,
    },
    {
      id: 6,
      schemeName: "Lakhapati Yojan",
      maximumAmount: 50000,
      interestRate: 5,
    },
    {
      id: 7,
      schemeName: "Dam DUppt Yojana",
      maximumAmount: 50000,
      interestRate: 5,
    },
    {
      id: 8,
      schemeName: "Midterm",
      maximumAmount: 50000,
      interestRate: 5,
    },

  ]);

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

  const [dataLoaded, setDataLoaded] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
    setSearchTerm("");
  };

  const handleExportToExcel = () => {
    const dataSet = [
      {
        columns: [
          { title: "ID", width: { wpx: 100 } },
          { title: "Scheme Name", width: { wpx: 200 } },
          { title: "Maximum Loan Amount", width: { wpx: 200 } },
          { title: "Interest Rate", width: { wpx: 100 } },
        ],
        data: filteredData.map((item) => ({
          ID: item.id,
          "Scheme Name": item.schemeName,
          "Maximum Loan Amount": item.maximumAmount,
          "Interest Rate": item.interestRate,
        })),
      },
    ];

    try {
      const ws = XLSX.utils.json_to_sheet(dataSet[0].data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "sheet");
      XLSX.writeFile(wb, "LoanScheme.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No rows selected",
        text: "Please select rows to delete.",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
        }
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the selected rows!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      didOpen: () => {
        Swal.getPopup().style.borderRadius = "25px";
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = data.filter((row) => !selectedRows.includes(row));
        setData(newData);
        setSelectedRows([]);
        setFilteredData(newData);
        Swal.fire("Deleted!", "Selected rows have been deleted.", "success");
        
      }
    });
  };
  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase().trim();

    if (searchTermLowerCase === "") {
      // If search term is empty, show all loan schemes
      setFilteredData(data);
    } else {
      // Otherwise, filter the list based on the search term
      const filtered = data.filter((row) =>
        row.schemeName.toLowerCase().includes(searchTermLowerCase)
      );
      setFilteredData(filtered);
    }
  };
  

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      // width: "150px",
      center: true,
    },
    {
      name: "Scheme Name",
      selector: (row) => row.schemeName,
      sortable: true,
      // width: "250px",
      center: true,
    },
    {
      name: "Maximum Loan Amount",
      selector: (row) => row.maximumAmount,
      sortable: true,
      // width: "250px",
      center: true,
    },
    {
      name: "Interest Rate",
      selector: (row) => `${row.interestRate}%`,
      sortable: true,
      // width: "150px",
      center: true,
    },
    {
      name: "Action",
      cell: (row, rowIndex) => (
        <div>
          <button
            type="button"
            className="btn mr-2"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <TiEdit size={20} color="#4db3c8" />
          </button>
          <button className="btn" onClick={handleDeleteSelected}>
            <RiDeleteBinLine size={20} color="#dc3545" />
          </button>
        </div>
      ),
      // width: "200px",
      center: true,
    },
  ];

  // const tableCustomStyles = {
  //   headRow: {
  //     style: {
  //       color: "white",
  //       backgroundColor: "darkblue",
  //       fontSize: "18px",
  //       fontWeight: "400",
  //       borderBottom: "1px solid #fff",
  //       textAlign: "center",
  //     },
  //   },
  //   rows: {
  //     style: {
  //       color: "black",
  //       fontSize: "14px",
  //       fontWeight: "normal",
  //       textAlign: "center",
  //       borderBottom: "3px solid #fff",
  //     },
  //   },
  //   headCells: {
  //     style: {
  //       paddingLeft: "5px",
  //       paddingRight: "5px",
  //       textAlign: "center",
  //     },
  //   },
  //   cells: {
  //     style: {
  //       paddingLeft: "5px",
  //       paddingRight: "5px",
  //       textAlign: "center",
  //     },
  //   },
  // };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="row main-content p-4">
          <Header />
          <div className="col-6 text-start">
            <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Loan Scheme
            </h2>
          </div>
          <div className="col-4 text-end px-0">
            <input
              type="text"
              placeholder="Search schemes"
              value={searchTerm}
              onInput={(e) => {
                setSearchTerm(e.target.value);
                handleSearch();
              }}
              className="form-control no-outline-login"
              style={{
                borderRadius: "4px", 
                padding: "8px", 
              }}
            />
          </div>

          <div className="col-2 text-end">
            <button
              type="button"
              className="btn mr-2" 
              onClick={() => window.location.reload()} 
            >
              <LuRefreshCcw size={20} color="#4db3c8" fontWeight="bold"/>
            </button>
            <button
              type="button"
              className="btn  mr-2"
              onClick={handleExportToExcel}
            >
              <SiMicrosoftexcel size={20} color="green" />
            </button>
            <button
              type="button"
              className="btn "
              onClick={handleDeleteSelected}
            >
              <RiDeleteBinLine size={20} color="#dc3545" />
            </button>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 py-2 w-100">
                {dataLoaded ? (
                  <DataTable
                    data={filteredData}
                    columns={columns}
                    style={{ textAlign: "center" }}
                    customStyles={customStyles}
                    striped
                    dense
                    pagination
                    selectableRows
                    onSelectedRowsChange={handleRowSelected}
                  />
                ) : (
                  <p>Loading data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
