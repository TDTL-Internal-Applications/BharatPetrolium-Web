import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

export default function RegisterMembers() {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  // const [selectedMember, setSelectedMember] = useState("");
  const [selectedMemberData, setSelectedMemberData] = useState({});
  const [updatedMemberData, setUpdatedMemberData] = useState({});

  const openPopup = () => {};
  // const  member_id = localStorage.getItem("membersData");
  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleUpdate = async (member_id) => {
    // const data = {
    //   member_id: member_id,
    // }
    console.log(data);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/all_memberdata/${member_id}/`
      );
      const jsonData = response.data;
      const resultArray = jsonData.members[0];
      setSelectedMemberData(resultArray);
      setUpdatedMemberData({ ...resultArray });
      console.log(selectedMemberData);
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
    // setSelectedMemberData(member);
    setPopupOpen(true);
  };

  const handleInputChange = (e) => {
    // console.log("Input changed:", e.target.name, e.target.value);
    setUpdatedMemberData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/update_member/${selectedMemberData.member_id}/`,
        updatedMemberData
      );
      setPopupOpen(false);
      await fetchData();
      Swal.fire({
        title: "Success",
        text: "Changes saved successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating member:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while saving changes.",
        icon: "error",
      });
    }
  };

  const handleDelete = async (member_id) => {
    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this member? You won't be able to revert this action.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // If the user confirmed the deletion
    console.log(member_id);
    if (result.isConfirmed) {
      try {
        await axios.patch(`http://127.0.0.1:8000/delete_member/${member_id}/`);
        // setSelectedMember("");
        setPopupOpen(false);
        await fetchData(); // Use await here to make sure state is updated
        Swal.fire({
          title: "Deleted!",
          text: "The Member has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting member:", error);

        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the member.",
          icon: "error",
        });
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/member_data/");
      const jsonData = await response.data;
      const resultArray = jsonData.members;
      const filteredData = resultArray.filter((item) => item.status === "Y");
      setData(filteredData);
      console.log(filteredData);
      const data1 = jsonData.data.member_id;
      localStorage.setItem("membersData", data1);

      console.log(localStorage.getItem("membersData"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData()
      .then(() => setDataLoaded(true))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    {
      name: "Sr.No.",
      selector: (row) => row.member_id,
      sortable: true,
      width: "90px",
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true,
      width: "250px",
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "300px",
      center: true,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile_no,
      sortable: true,
      width: "200px",
      center: true,
    },
    {
      name: "Update",
      cell: (row, rowIndex) => (
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={() => handleUpdate(row.member_id)}
        >
          Update
        </button>
      ),
      width: "200px",
      center: true,
    },
    {
      name: "Delete",
      cell: (row, rowIndex) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(row.member_id)}
        >
          Delete
        </button>
      ),
      center: true,
    },
  ];

  const exportToExcel = () => {
    if (!Array.isArray(data)) {
      console.error("Invalid data format. Please provide an array.");
      return;
    }

    const columnsForExport = columns.filter((column) => column.selector); // Exclude columns without a selector
    const fileName = "membersheet";

    const exportData = data.map((row) => {
      const rowData = {};
      columnsForExport.forEach((column) => {
        rowData[column.name] = column.selector(row);
      });
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const tableCustomStyles = {
    headRow: {
      style: {
        color: "black",
        borderBottom:"0.5px solid black",
        // backgroundColor: "darkblue",
        fontSize: "16px",
        fontWeight: "400",
        // borderBottom: "1px solid #fff",
        textAlign: "center",
      },
      
    },
    rows: {
      style: {
        color: "black",
        // backgroundColor: "#2B2D3F",
        fontSize: "13px",
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
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-6 text-start">
                <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Registered Members List
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 py-2">
                {dataLoaded ? (
                  <DataTable
                    data={data}
                    columns={columns}
                    style={{ textAlign: "center", width: "100%" }}
                    customStyles={tableCustomStyles}
                    pagination
                  />
                ) : (
                  <p>Loading data...</p>
                )}
                {/* <div className="col-12 ps-2 text-start">
                  <Link
                    to="/Home"
                    style={{
                      textDecoration: "underline 1px solid white",
                      color: "dodgerblue",
                    }}
                  >
                    Go To Home
                  </Link>
                </div> */}
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              style={{ maxWidth: "800px" }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    <strong>Update Details</strong>
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div
                    data-spy="scroll"
                    data-target="#list-example"
                    data-offset="0"
                    class="scrollspy-example overflow-auto"
                    style={{ maxHeight: "250px", padding: "13px" }}
                  >
                    <form>
                      {/* 1st Row */}
                      <div className="row pb-2">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">First Name</label>

                          <input
                            type="text"
                            name="first_name"
                            className="form-control no-outline"
                            value={updatedMemberData.first_name}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Middle Name</label>

                          <input
                            type="text"
                            name="middle_name"
                            className="form-control no-outline"
                            value={updatedMemberData.middle_name}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Last Name</label>

                          <input
                            type="text"
                            name="last_name"
                            className="form-control no-outline"
                            value={updatedMemberData.last_name}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* 2nd Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Gender</label>
                          <select
                            name="gender"
                            className="form-control no-outline"
                            value={updatedMemberData.gender}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          >
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Opening Date</label>
                          <input
                            name="opening_date"
                            type="date"
                            className="form-control no-outline "
                            value={updatedMemberData.opening_date}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Employee No.</label>
                          <input
                            type="number"
                            name="emp_no"
                            className="form-control no-outline"
                            value={updatedMemberData.emp_no}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* 3rd Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Birth Date</label>
                          <input
                            type="date"
                            name="birth_date"
                            className="form-control no-outline"
                            value={updatedMemberData.birth_date}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Age</label>
                          <input
                            type="number"
                            name="age"
                            className="form-control no-outline "
                            value={updatedMemberData.age}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Blood Group</label>
                          <input
                            type="text"
                            name="blood_group"
                            className="form-control no-outline"
                            value={updatedMemberData.blood_group}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* 4th Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Join Date</label>
                          <input
                            type="date"
                            name="join_date"
                            className="form-control no-outline"
                            value={updatedMemberData.join_date}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Confirm Date</label>
                          <input
                            type="date"
                            name="confirmed_on"
                            className="form-control no-outline "
                            value={updatedMemberData.confirmed_on}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control no-outline"
                            value={updatedMemberData.email}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* 5th Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">PAN No.</label>
                          <input
                            type="text"
                            name="pan_no"
                            className="form-control no-outline"
                            value={updatedMemberData.pan_no}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Mobile Number</label>
                          <input
                            type="tel"
                            name="mobile_no"
                            className="form-control no-outline "
                            value={updatedMemberData.mobile_no}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Marital Status</label>
                          <select
                            className="form-control no-outline"
                            name="marital_status"
                            value={updatedMemberData.marital_status}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          >
                            <option></option>
                            <option>Single</option>
                            <option>Married</option>
                            {/* <option>Divorce</option> */}
                          </select>
                        </div>
                      </div>

                      {/* 2nd Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Bank Saving A/c No.</label>
                          <input
                            type="number"
                            name="bank_ac_no"
                            className="form-control no-outline"
                            value={updatedMemberData.bank_ac_no}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Bank Name</label>
                          <input
                            type="text"
                            name="bank_name"
                            class="form-control no-outline"
                            value={updatedMemberData.bank_name}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Branch Name</label>
                          <input
                            type="text"
                            name="branch_name"
                            class="form-control no-outline"
                            value={updatedMemberData.branch_name}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>

                      {/* 1st Row */}
                      <div className="row pb-2">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Photo ID</label>
                          <select
                            className="form-control no-outline"
                            name="photoId"
                            type="text"
                            value={updatedMemberData.photoId}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          >
                            <option></option>
                            <option>Adhar Card</option>
                            <option>PAN Card</option>
                            <option>Driving Licence</option>
                          </select>
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Issued At</label>

                          <input
                            type="date"
                            name="Issued_at"
                            className="form-control no-outline"
                            value={updatedMemberData.Issued_at}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Issued On</label>

                          <input
                            type="date"
                            name="Issued_on"
                            className="form-control no-outline"
                            value={updatedMemberData.Issued_on}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* 2nd Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Address Proof</label>
                          <select
                            className="form-control no-outline"
                            type="text"
                            name="address_proof"
                            value={updatedMemberData.address_proof}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          >
                            <option></option>
                            <option>Adhar Card</option>
                            <option>PAN Card</option>
                          </select>
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Address Issued At</label>
                          <input
                            type="text"
                            className="form-control no-outline"
                            name="address_issued_at"
                            value={updatedMemberData.address_issued_at}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Address Issued On</label>
                          <input
                            type="date"
                            className="form-control no-outline"
                            name="address_issued_on"
                            value={updatedMemberData.address_issued_on}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* 3rd Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Resident Address</label>
                          <input
                            type="text-area"
                            name="resident_address"
                            className="form-control no-outline"
                            value={updatedMemberData.resident_address}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Native Place Address</label>
                          <input
                            type="text-area"
                            name="nativeplace_address"
                            className="form-control no-outline"
                            value={updatedMemberData.nativeplace_address}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">City</label>
                          <input
                            type="text"
                            name="city"
                            className="form-control no-outline"
                            value={updatedMemberData.city}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* 4th Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">PIN Code</label>
                          <input
                            type="number"
                            name="pincode"
                            className="form-control no-outline"
                            value={updatedMemberData.pincode}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Phone No.</label>
                          <input
                            type="number"
                            name="phoneno"
                            className="form-control no-outline"
                            value={updatedMemberData.phoneno}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Nominee Name</label>
                          <input
                            type="text"
                            name="nominee_name"
                            className="form-control no-outline"
                            value={updatedMemberData.nominee_name}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                      {/* 5th Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Nominee Birth Date</label>
                          <input
                            type="date"
                            name="nominee_birthdate"
                            className="form-control no-outline"
                            value={updatedMemberData.nominee_birthdate}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Nominee Age</label>
                          <input
                            type="number"
                            name="nominee_age"
                            className="form-control no-outline"
                            value={updatedMemberData.nominee_age}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Nominee Relation</label>
                          <select
                            className="form-control no-outline"
                            name="relation"
                            value={updatedMemberData.relation}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          >
                            <option></option>
                            <option>Father</option>
                            <option>Mother</option>
                            <option>Brother</option>
                            <option>Sister</option>
                          </select>
                        </div>
                      </div>
                      {/* 1st Row */}
                      <div class="row py-3">
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Member No</label>
                          <input
                            type="number"
                            name="member_no"
                            className="form-control no-outline"
                            value={updatedMemberData.member_no}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">Member Name</label>
                          <input
                            type="text"
                            name="member_name"
                            className="form-control no-outline"
                            value={updatedMemberData.member_name}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                        <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                          <label for="text">IFSC Code</label>
                          <input
                            type="text"
                            name="IFSC_code"
                            className="form-control no-outline"
                            value={updatedMemberData.IFSC_code}
                            onChange={handleInputChange}
                            style={{
                              backgroundColor: "whitesmoke",
                              borderColor: "none",
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    style={{ width: "140px" }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={handleSaveChanges}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
