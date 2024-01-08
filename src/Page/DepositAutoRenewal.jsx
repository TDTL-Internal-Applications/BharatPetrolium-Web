import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import "../Style/intereste.css"

export default function DepositAutoRenewal() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  // const [selectedMember, setSelectedMember] = useState("");
  const [selectedMemberData, setSelectedMemberData] = useState({});
  const [updatedMemberData, setUpdatedMemberData] = useState({});

  const handleSaveChanges = async () => {
    try {
      await axios.post(
        ` http://bpcl.kolhapurdakshin.com:8000/update_member/${selectedMemberData.member_id}/`,
        updatedMemberData
      );
      setPopupOpen(false);
      await fetchData();
      Swal.fire({
        title: "Success",
        text: "Changes saved successfully.",
        icon: "success",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });
    } catch (error) {
      console.error("Error updating member:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while saving changes.",
        icon: "error",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });
    }
  };

  useEffect(() => {
    fetchData()
      .then(() => setDataLoaded(true))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    {
      name: "Sr. No",
      cell: (row, index) => <div style={{ textAlign: "center" }}>{index + 1}</div>,
      sortable: false,
      center: true,
      width: "60px",
      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center",
      },
    },
    
    {
      name: "AC_Type",
      selector: (row) => row.Account_type,
      sortable: true,
      width: "150px",
      center: true,
    },
    {
      name: "Fdno",
      selector: (row) => row.RDID,
      sortable: true,
      width: "80px",
      center: true,
    },
    {
      name: "E_no",
      selector: (row) => row.emp_no,
      sortable: true,
      width: "80px",
      center: true,
    },
    {
      name: "M_no",
      selector: (row) => row.member_id,
      sortable: true,
      width: "80px",
      center: true,
    },
    {
      name: "Class",
      // selector: (row) => row.emp_no,
      sortable: true,
      width: "80px",
      center: true,
    },
    {
      name: "Acno",
      selector: (row) => row.emp_no,
      sortable: true,
      width: "80px",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "100px",
      center: true,
    },
    {
      name: "Date",
      selector: (row) => row.StartDate,
      sortable: true,
      width: "100px",
      center: true,
    },
    {
      name: "Amount",
      selector: (row) => row.MonthlyDeposit,
      sortable: true,
      width: "100px",
      center: true,
    },

    {
      name: "Ring_rate",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Rperiod",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Rdaymonth",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "M_date",
      selector: (row) => row.EndDate,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "M_amount",
      selector: (row) => row.MaturityAmt,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Rundate",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Operator",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Lupdate",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile_no,
      sortable: true,
      width: "120px",
      center: true,
    },
    {
      name: "Mr_mrs",
      selector: (row) => row.initial,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Renewed",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Remark",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Filename",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "TotalInterest",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },
    {
      name: "Payment",
      // selector: (row) => row.email,
      sortable: true,
      width: "110px",
      center: true,
    },

    {
      name: "Action",
      cell: (row, rowIndex) => (
        <button
          className="btn"
          style={{backgroundColor:"green",padding:"1px 8px",color:"white"}}
            onClick={() => handleRenewDeposit(row.member_id)}
        >
          Renew
        </button>
      ),
      center: true,
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
  const handleRenewDeposit = async (member_id) => {
    const result = await Swal.fire({
      title: "Renew Deposit",
      text: "Are you sure you want to renew this deposit?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, renew it!",
      didOpen: () => {
        Swal.getPopup().style.borderRadius = "25px";
      },
    });
  
    if (result.isConfirmed) {
      try {
        // Perform the renew deposit action (update API endpoint accordingly)
        // await axios.patch(`http://bpcl.kolhapurdakshin.com:8000/renew_deposit/${member_id}/`);
  
        // Optionally, fetch updated data or update state as needed
        await fetchData();
  
        // Display success message
        Swal.fire({
          title: "Deposit Renewed!",
          text: "The deposit has been successfully renewed.",
          icon: "success",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      } catch (error) {
        console.error("Error renewing deposit:", error);
  
        Swal.fire({
          title: "Error",
          text: "An error occurred while renewing the deposit.",
          icon: "error",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      }
    }
  };
  
  const exportToExcel = () => {
    if (!Array.isArray(data)) {
      console.error("Invalid data format. Please provide an array.");
      return;
    }
  
    const columnsForExport = columns.filter((column) => column.selector); // Exclude columns without a selector
    const fileName = "DepositAutoRenewal";
  
    // Include column headers
    const exportData = [
      columnsForExport.map((column) => column.name),
      ...data.map((row) =>
        columnsForExport.map((column) => column.selector(row))
      ),
    ];
  
    const ws = XLSX.utils.aoa_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };
  
  const handleInputChange = (e) => {
    // console.log("Input changed:", e.target.name, e.target.value);
    setUpdatedMemberData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [data, setData] = useState([]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    fetchData(newDate);
  };
  
  const fetchData = async (date) => {
    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/renew_list/",
        {
          current_date: date,
        }
      );

      const jsonData = response.data;
      const maturityMembers = jsonData.maturity_members;

      // Assuming maturity_members is an array of objects
      const filteredData = maturityMembers.filter((item) => item.Status === "Active" || item.Status === "active");
      setData(filteredData);

      // Save member_id data to local storage
      const memberIds = filteredData.map((item) => item.member_id);
      localStorage.setItem("membersData", JSON.stringify(memberIds));

      console.log(filteredData);
      console.log(localStorage.getItem("membersData"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Automatically fetch data when the component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    fetchData(currentDate);
  }, []); 

  return (
    <div>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-12 text-start">
                <h4 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Deposit Auto Renewal
                </h4>
              </div>
             
            </div>
          </div>
          <div className="container w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-3 text-start">
                <h6 style={{ fontWeight: "bold", color: "black" }}>
                  Auto Renewal Date
                </h6>
              </div>
              <div className="col-2">
                <input
                  type="date"
                  className="form-control"
                  id="currentDateInput"
                  name="currentDate"
                  value={selectedDate}
                  onChange={handleDateChange}
                  max="9999-12-31"
                  style={{
                    padding: "8px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div className="col-4 text-start centered-text">
                <h5 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Generated renewal detail...
                </h5>
              </div>
              <div className="col-3 text-end">
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
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-sm-12 py-2 data-table-interest"
                
              >
                {dataLoaded ? (
                  <DataTable
                    data={data}
                    columns={columns}
                    style={{ textAlign: "center", width: "100%" }}
                    customStyles={customStyles}
                    pagination
                    striped
                    dense
                  />
                ) : (
                  <p>Loading data...</p>
                )}
                
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
