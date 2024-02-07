import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import "../Style/intereste.css";

export default function EditInterest() {
  //Current Date Function Hai Bhai
  //   const currentDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  //Selected Options Ke Liye Hai Bhai
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelected = (e) => {
    setSelectedOption(e.target.value);
  };

  const [data, setData] = useState("");
  const [newData, setNewData] = useState("");

  
  useEffect(() => {
    if (selectedOption) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://bpcl.kolhapurdakshin.com:8000/interestrates_fetch/",
            {
              accountType: selectedOption,
              date: selectedDate,
            }
          );
          setData(response.data.response_data.previous_interest_info);
          setNewData(response.data.response_data.latest_interest_info);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData(); 
  
      const intervalId = setInterval(() => {
        fetchData(); 
      }, 5000);
  
      return () => clearInterval(intervalId); 
    }
  }, [selectedOption, selectedDate]);
  

  const columns = [

    {
      name: "Account Type",
      selector: "accountType",
      sortable: true,
      center: true,
  },
  {
      name: "Effective Start Date",
      selector: "EffectiveEndDate",
      sortable: true,
      center: true,
  },
  {
      name: "Effective End Date",
      selector: "EffectiveEndDate",
      sortable: true,
      center: true,
  },
  {
      name: "Interest Rate",
      selector: "InterestRate",
      sortable: true,
      center: true,
  },
  {
      name: "Period",
      selector: "TermInMonths",
      sortable: true,
      center: true,
  },
  {
      name: "Unit",
      selector: "unite",
      sortable: true,
      center: true,
  },  ];

  const NewDatacolumns = [
    {
        name: "Account Type",
        selector: "accountType",
        sortable: true,
        center: true,
    },
    {
        name: "Effective Start Date",
        selector: "new_EffectiveStartDate",
        sortable: true,
        center: true,
    },
    {
        name: "Effective End Date",
        selector: "new_EffectiveEndDate",
        sortable: true,
        center: true,
    },
    {
        name: "Interest Rate",
        selector: "new_InterestRate",
        sortable: true,
        center: true,
    },
    {
        name: "Period",
        selector: "new_TermInMonths",
        sortable: true,
        center: true,
    },
    {
        name: "Unit",
        selector: "new_unite",
        sortable: true,
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

  //Second Data Table

  const [insert, setInsert] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [intRate, setIntRate] = useState("");
  const [termInMonth, setTermInMonth] = useState("");

  // Function to handle changes in the modal form
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;

    // Update state based on the input name
    switch (name) {
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
      case "intRate":
        setIntRate(value);
        break;
      case "termInMonth":
        setTermInMonth(value);
        break;
      default:
        break;
    }
  };

  const saveNewInterest = async () => {
    try {
      // Validate the input fields
      if (!startDate || !endDate || !intRate) {
        Swal.fire({
          title: "Error!",
          text: "Please fill in all the required fields.",
          icon: "error",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button-share");
          },
        });
        return; // Stop further execution if validation fails
      }

      // If all fields are filled, proceed with the axios request
      await axios.post("http://bpcl.kolhapurdakshin.com:8000/deposit_insert/", {

        accountType: selectedOption,
        EffectiveStartDate: startDate,
        EffectiveEndDate: endDate,
        InterestRate: intRate,
        TermInMonths: termInMonth,

      });

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "New interest details have been saved.",
        icon: "success",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button-share");
        },
      });

      // Reset form fields
      setStartDate("");
      setEndDate("");
      setIntRate("");
      setTermInMonth("");

      closeModal();
    } catch (error) {
      console.error("Error saving interest details:", error);

      // Show error message
      Swal.fire({
        title: "Error!",
        text: "Failed to save interest details. Please try again.",
        icon: "error",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button-share");
        },
      });
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("staticBackdrop");
    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    modalBackdrop.remove();
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading1 Main */}
          <div className="container-fluid d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Interest Details</div>
          </div>
          <div className="container-fluid d-flex align-items-center" style={{flexDirection:"column"}}>
            <div className="row d-flex w-100">
              <div className="col-4">
                <select
                  className="form-select"
                  value={selectedOption}
                  onChange={handleSelected}
                >
                  <option>Select Deposit Type</option>
                  <option value="Term Deposit">Term Deposit</option>
                  <option value="Ek Laksh Yojana">Ek Laksh Yojana</option>
                  <option value="Dam Duppat">Dam Duppat</option>
                  <option value="Lakhpati Yojana">Lakhpati Yojana</option>
                  <option value="Cash Certificate">Cash Certificate</option>
                  <option value="Recurring Deposit">Recurring Deposit</option>
                  <option value="Medium Term Loan">Medium Term Loan</option>
                  <option value="Emergency Loan">Emergency Loan</option>
                  <option value="Staff Medium Term Loan">
                    Staff Medium Term Loan
                  </option>
                  <option value="Staff Emergency Loan"></option>
                </select>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-6">With Effect From</div>
                  <div className="col-6">
                    <input
                      type="date"
                      className="form-control"
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-4 text-end pe-4">
                <button
                  type="button"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >
                  Add New Interest
                </button>
            </div>
          </div>
          <div className="container-fluid d-flex">
            <div className="row w-100 py-2">
              {/* <div className="col-12 text-start">
                Interest Rate Changes from Date
              </div> */}
              <div className="col-12 ">
                <DataTable
                  title="Previous Interest Details"
                  columns={columns}
                  data={data}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={5}
                  striped
                  dense
                />
              </div>
            </div>
          </div>
          <div className="container-fluid d-flex">
            <div className="row w-100 py-2">
              <div className="col-12">
                <DataTable
                  title="New Interest Details"
                  data={newData}
                  columns={NewDatacolumns}
                  customStyles={customStyles}
                  dense
                  striped
                  pagination
                />
              </div>
              {/* Button trigger modal  */}
              
              </div>

              {/* Pop-Up  */}
              <div
                class="modal fade"
                id="staticBackdrop"
                data-backdrop="static"
                data-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">
                        Add New Interest
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
                    <div className="modal-body">
                      <div className="row pb-2">
                        <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                          <label htmlFor="StartDate">
                            Effective Start Date
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            className="form-control no-outline"
                            value={startDate}
                            onChange={handleModalInputChange}
                          />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                          <label htmlFor="EndDate">Effective End Date</label>
                          <input
                            type="date"
                            name="endDate"
                            className="form-control no-outline"
                            value={endDate}
                            onChange={handleModalInputChange}
                          />
                        </div>
                      </div>

                      <div className="row pb-2">
                        <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                          <label htmlFor="InterestRate">Interest Rate</label>
                          <input
                            type="number"
                            id="InterestRate"
                            name="intRate"
                            step="0.01"
                            className="form-control no-outline"
                            min={0}
                            value={intRate}
                            onChange={handleModalInputChange}
                          />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                          <label htmlFor="TermInMonths">Term In Month</label>
                          <input
                            type="number"
                            name="termInMonth"
                            className="form-control no-outline"
                            min={0}
                            value={termInMonth}
                            onChange={handleModalInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="modal-footer">
                      <span
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                      >
                        Close
                      </span>
                      <button
                        type="button"
                        onClick={saveNewInterest}
                        class="btn btn-success"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
