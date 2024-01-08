import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import "../Style/intereste.css"

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

  //Previos Interest Rate Changes Data Fetching
  // Previos Interest Rate Changes Data Fetching
  useEffect(() => {
    // Check if the admin has selected a valid option
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
          setData(response.data.result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [selectedOption, selectedDate]);

  const columns = [
    {
      name: "Date From",
      selector: "date_from",
      sortable: true,
    },
    {
      name: "Days/Months",
      selector: "days_months",
      sortable: true,
    },
    {
      name: "Days From",
      selector: "EffectiveStartDate",
      sortable: true,
    },
    {
      name: "Days To",
      selector: "EffectiveEndDate",
      sortable: true,
    },
    {
      name: "Month From",
      selector: "month_from",
      sortable: true,
    },
    {
      name: "Month To",
      selector: "month_to",
      sortable: true,
    },
    {
      name: "Rate",
      selector: "InterestRate",
      sortable: true,
    },
    {
      name: "Senior",
      selector: "senior",
      sortable: true,
    },
    {
      name: "Special",
      selector: "special",
      sortable: true,
    },
    {
      name: "Staff",
      selector: "staff",
      sortable: true,
    },
    {
      name: "Society",
      selector: "society",
      sortable: true,
    },
    {
      name: "Min Amount",
      selector: "min_amount",
      sortable: true,
    },
    {
      name: "Max Amount",
      selector: "max_amount",
      sortable: true,
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
  const [endtDate, setEndDate] = useState("");
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
      await axios.post("http://bpcl.kolhapurdakshin.com:8000/deposit_insert/", {
        EffectiveStartDate: startDate,
        EffectiveEndDate: endtDate,
        InterestRate: intRate,
      });

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

      setStartDate("");
      setEndDate("");
      setIntRate("");
      setTermInMonth("");

      // Fetch updated data after saving
      const response = await axios.get("http://example.com/api/get-interests");
      setInsert(response.data);

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Error saving interest details:", error);

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
          <div className="container-fluid d-flex align-items-center">
            <div className="row w-100">
              <div className="col-3">
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
            </div>
          </div>
          <div className="container-fluid d-flex">
            <div className="row w-100 py-2">
              <div className="col-12 text-start">
                Interest Rate Changes from Date
              </div>
              <div
                className="col-12 data-table-interest"
                
              >
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
                <DataTable title="New Interest Details" />
              </div>
              {/* Button trigger modal  */}
              <div className="col-2">
                <button
                  type="button"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >
                  Add New Interest
                </button>
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
                            value={endtDate}
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
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={saveNewInterest}
                        class="btn btn-primary"
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
