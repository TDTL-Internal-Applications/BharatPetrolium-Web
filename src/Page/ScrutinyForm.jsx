import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Style/Scrunity.css";

export default function ScritinyForm() {
  const [depositData, setDepositData] = useState([]);
  const [newData, setNewData] = useState("");
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleAccountNumberChange = async (newRDID) => {
    let dataArray = [];

    const data = {
      RDID: newRDID,
      Account_type: "Term Deposit",
    };
    if (!newRDID) {
      setData("");
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/rd_detail/",
        data
      );
      const jsonData = response.data;
      dataArray = jsonData.result_set;
      setData(dataArray);
      console.log(depositData);
    } catch (error) {
      console.error("Error fetching employee numbers:", error);
    }
  };

  const columns = [
    {
      name: "Date",
      selector: "StartDate",
      sortable: true,
    },
    {
      name: "RV No.",
      selector: "RDID",
      sortable: true,
    },
    {
      name: "Particular",
      selector: "Particular",
      sortable: true,
    },
    {
      name: "Debit",
      selector: "Debit",
      sortable: true,
    },
    {
      name: "Principle",
      selector: "principle",
      sortable: true,
    },
    {
      name: "Interest",
      selector: "Interest",
      sortable: true,
    },
    {
      name: "Penalty",
      selector: "penalty",
      sortable: true,
    },
    {
      name: "MISC",
      selector: "misc",
      sortable: true,
    },
    {
      name: "Total",
      selector: "total",
      sortable: true,
    },
    {
      name: "Balance",
      selector: "balance",
      sortable: true,
    },
    {
      name: "Opt",
      selector: "opt",
      sortable: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "48px",
      },
    },
    headCells: {
      style: {
        minHeight: "40px",
        backgroundColor: "#4db3c8",
        fontSize: "14px",
        fontWeight: "400",
        color: "white",
      },
    },
  };
  useEffect(() => {});
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Loan Scrutiny Form</div>
          </div>

          <div className="container-fluid" style={{ width: "100%" }}>
            {/* Your first form code */}
            <div className="row First-Main-Row  pt-3 mb-3">
              {/* Basic Information  */}
              <form className="mb-3">
                <div className="Border-Black p-1 mb-3">
                  <div
                    className="row mb-3"
                  >
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="mt-4">
                        <label for="" className="">
                          Select Loan Type :
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="mt-3 ">
                        <select
                          type="text"
                          id="rdId"
                          name="employeeno"
                          class="form-select small-label"
                          min={0}
                          onChange={(e) =>
                            handleAccountNumberChange(e.target.value)
                          }
                        >
                          <option>Select Loan Type</option>
                          <option>Medium Term Loan</option>
                          <option>Emergency Loan</option>
                          <option>Staff Medium Term Loan</option>
                          <option>Staff Emergency Loan</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="mt-4">
                        <label for="" className="">
                          Loan Application No :
                        </label>
                      </div>
                    </div>

                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="mt-3 ">
                        <input
                          type="text"
                          id="rdId"
                          name="employeeno"
                          class="form-control small-label"
                          min={0}
                          onChange={(e) =>
                            handleAccountNumberChange(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="mt-4">
                      <div class="">
                        <label for="" className="">
                          Loanee
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="" className="">
                        Emp Code
                      </label>
                    </div>

                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="" className="">
                        Mem No.
                      </label>
                    </div>
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="" className="">
                        Show
                      </label>
                    </div>
                    <div class="">
                      <span className="btn btn-primary w-100">Sign</span>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="" className="">
                        Name
                      </label>
                    </div>
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm text-start">
                    <div class="">
                      <div class="">
                        <label for="" className="">
                          Salary
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-1 text-start">
                    <div class="">
                      <div class="">
                        {/* <button className="w-100">Sign</button> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 text-start">
                    <div className="row ">
                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="col-sm-6 text-start">
                        <div className="">
                          <label for="" className="">
                            Membership Application :
                          </label>
                        </div>
                      </div>

                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="col-sm-6 text-start">
                        <div className="">
                          <input
                            type="text"
                            id="rdId"
                            name="employeeno"
                            class="form-control small-label"
                            min={0}
                            onChange={(e) =>
                              handleAccountNumberChange(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <div class="">
                        <label for="" className="">
                          B+Da+Hra
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="d-flex justify-content-center align-item-center m-1">
                      <label>4 Deduct</label>
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <div class="">
                        {/* <button className="w-100">Sign</button> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 text-start">
                    <div className="row ">
                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="col-sm-6 text-start">
                        <div className="">
                          <label for="" className="">
                            Loan Demanded :
                          </label>
                        </div>
                      </div>

                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="col-sm-6 text-start">
                        <div className="">
                          <input
                            type="text"
                            id="rdId"
                            name="employeeno"
                            class="form-control small-label"
                            min={0}
                            onChange={(e) =>
                              handleAccountNumberChange(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <div class="">
                        <label for="" className="">
                          Net Pay
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <div class="">
                        {/* <button className="w-100">Sign</button> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 text-start">
                    <div className="row ">
                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="col-sm-6 text-start">
                        <div className="">
                          <label for="" className="">
                            Basic+Da+Hra Eligible :
                          </label>
                        </div>
                      </div>

                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="col-sm-6 text-start">
                        <div className="">
                          <input
                            type="text"
                            id="rdId"
                            name="employeeno"
                            class="form-control small-label"
                            min={0}
                            onChange={(e) =>
                              handleAccountNumberChange(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <div class="">
                        <label for="" className="">
                          Soc Deduct
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start"></div>
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <div class="">
                        {/* <button className="w-100">Sign</button> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 text-start">
                    <div className="row ">
                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="col-sm-6 text-start">
                        <div className="">
                          <label for="" className="">
                            Share+CD Eligible :
                          </label>
                        </div>
                      </div>

                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="col-sm-6 text-start">
                        <div className="">
                          <input
                            type="text"
                            id="rdId"
                            name="employeeno"
                            class="form-control small-label"
                            min={0}
                            onChange={(e) =>
                              handleAccountNumberChange(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    {/* <div className=""> */}
                    <div className="">
                      <label for="" className=""></label>
                    </div>
                    <div className="mt-2">
                      <label for="" className="">
                        Guarantor 1
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label for="" className="">
                        Emp Code
                      </label>
                    </div>

                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="" className="">
                        Mem No.
                      </label>
                    </div>
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="" className="">
                        Show
                      </label>
                    </div>
                    <div class="">
                      <span className="btn btn-primary w-100">Sign</span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="" className="">
                        Name
                      </label>
                    </div>
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="" className="">
                        Salary
                      </label>
                    </div>
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <div class="">
                      <div class="">
                        <label for="" className="">
                          Guarantor 2
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <div class="">
                        <span className="btn btn-primary w-100">Sign</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <div class="">
                      <div class="">
                        <label for="" className="">
                          Guarantor 3
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <div class="">
                        <span className="btn btn-primary w-100">Sign</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        min={0}
                        onChange={(e) =>
                          handleAccountNumberChange(e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row mt-3 justify-content-center">
            <div className="col-sm-3">
              <button type="button" className="btn btn-success saveButton mt-2">
                Process
              </button>
            </div>
            <div className="col-sm-3">
              <button
                type="button"
                className="btn btn-danger cancelButton mt-2"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
