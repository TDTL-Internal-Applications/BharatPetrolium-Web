import React, { useState,useRef } from "react";
import DataTable from "react-data-table-component";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx';
import "../Style/Dashboard.css";
import Sidebar from "./Sidebar";
import { IoIosDownload } from "react-icons/io";
import { SiMicrosoftexcel } from "react-icons/si";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import Header from "../components/Header";
import { useReactToPrint } from "react-to-print";

export default function LoanScheme() {
// const componentPDF = useRef()

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
    // Add more sample data as needed
  ]);

  const [dataLoaded, setDataLoaded] = useState(true); // Set to true since data is provided
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelected = (state) => {
    // Get the selected rows and update the state
    setSelectedRows(state.selectedRows);
  };

  const handleExportToExcel = () => {
    // Use selectedRows for exporting only the filtered data
    const filteredData = selectedRows.length > 0 ? selectedRows : data;

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
      console.error('Error exporting to Excel:', error);
    }
  };

  const handleDeleteSelected = () => {
    // Filter out the selected rows from the data
    const newData = data.filter((row) => !selectedRows.includes(row));

    // Update the data and reset selectedRows
    setData(newData);
    setSelectedRows([]);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
      center: true,
    },
    {
      name: "Scheme Name",
      selector: (row) => row.schemeName,
      sortable: true,
      width: "250px",
      center: true,
    },
    {
      name: "Maximum Loan Amount",
      selector: (row) => row.maximumAmount,
      sortable: true,
      width: "250px",
      center: true,
    },
    {
      name: "Interest Rate",
      selector: (row) => `${row.interestRate}%`,
      sortable: true,
      width: "150px",
      center: true,
    },
    {
      name: "Action",
      cell: (row, rowIndex) => (
        <div>
          <button
            type="button"
            className="btn btn-primary mr-2"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <TiEdit size={20} />
            {/* <AiFillEdit size={20} color="" /> */}
          </button>
          <button className="btn btn-danger">
            <RiDeleteBinLine size={20} color="" />
          </button>
        </div>
      ),
      width: "250px",
      center: true,
    },
  ];

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "white",
        backgroundColor: "darkblue",
        fontSize: "18px",
        fontWeight: "400",
        borderBottom: "1px solid #fff",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        color: "black",
        fontSize: "14px",
        fontWeight: "normal",
        textAlign: "center",
        borderBottom: "3px solid #fff",
      },
    },
    headCells: {
      style: {
        paddingLeft: "5px",
        paddingRight: "5px",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        paddingLeft: "5px",
        paddingRight: "5px",
        textAlign: "center",
      },
    },
  };

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
            <div className="col-6 text-end">
            <button
                type="button"
                className="btn btn-success mr-2"
                onClick={handleExportToExcel}
              >
                <SiMicrosoftexcel size={20} />
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteSelected}
              >
                <RiDeleteBinLine size={20} />
                {/* <AiFillDelete size={20} color="white" /> */}
              </button>
              </div>
        
         
            {dataLoaded ? (
              <DataTable
                data={data}
                columns={columns}
                style={{ textAlign: "center" }}
                customStyles={tableCustomStyles}
                pagination
                selectableRows
                onSelectedRowsChange={handleRowSelected}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>
     
    </>

  );
}
