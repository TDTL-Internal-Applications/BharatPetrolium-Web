import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import "../Style/Global_Classes.css";
import { Link } from "react-router-dom";

export default function MemberSettlementAccountReceipt() {
  let [MemberId, setMemberID] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    employeeNO: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    age: "",
    joinDate: "",
    confirmDate: "",
    email: "",
    panNo: "",
    mobileNumber: "",
    maritalStatus: "",
    ifscCode: "",
    bankSavingAcNo: "",
    bankName: "",
    branchName: "",
    NumberOfShares: 0,
    SharePrice: 0,
    PurchaseDate: new Date().toISOString().split("T")[0],
  });

  const handleMemberIdChange = async (event) => {
    const memberId = event.target.value;
    setMemberID(memberId);
    try {
      if (!memberId) {
        setFormData({
          employeeNO: "",
          firstName: "",
          lastName: "",
          gender: "",
          birthDate: "",
          age: "",
          joinDate: "",
          confirmDate: "",
          email: "",
          panNo: "",
          mobileNumber: "",
          maritalStatus: "",
          ifscCode: "",
          bankSavingAcNo: "",
          bankName: "",
          branchName: "",
        });
        return;
      }

      const response = await axios.get(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`
      );

      const jsondata = response.data;
      const data = jsondata.members[0];
      console.log(data);
      setFormData({
        ...formData,
        employeeNO: memberId,
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        gender: data.gender || "",
        birthDate: data.birth_date || "",
        age: data.age || "",
        joinDate: data.join_date || "",
        confirmDate: data.confirmed_on || "",
        email: data.email || "",
        panNo: data.pan_no || "",
        mobileNumber: data.mobile_no || "",
        maritalStatus: data.marital_status || "",
        ifscCode: data.IFSC_code || "",
        bankSavingAcNo: data.bank_ac_no || "",
        bankName: data.bank_name || "",
        branchName: data.branch_name || "",
      });
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTransaction = async () => {
    if (!formData.employeeNO) {
      // Handle the case where employeeNO is not defined
      console.error("Employee number is missing.");
      return;
    }

    if (isNaN(formData.NumberOfShares) || formData.NumberOfShares === 0) {
      toast.warning("Invalid number of shares.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  };
  const [transactions, setTransactions] = useState([]);

  const [memberId, setMemberId] = useState("");
  useEffect(() => {
    // Fetch data from the API and update the state
    let dataArray = [];
    let inputObject = {
      RDID: (
        <input type="date" className="inputFields" value={getCurrentDate()} />
      ),
      member_id: (
        <input type="number" className="inputFields" style={{ width: "90%" }} />
      ),
      MonthlyDeposit: (
        <input type="text" className="inputFields" style={{ width: "90%" }} />
      ),
      InterestRate: (
        <input type="number" className="inputFields" style={{ width: "90%" }} />
      ),
      deposit_period: (
        <input type="number" className="inputFields" style={{ width: "90%" }} />
      ),
      MonthlyDeposit: (
        <input type="number" className="inputFields" style={{ width: "90%" }} />
      ),
      MonthlyDeposit: (
        <input type="number" className="inputFields" style={{ width: "90%" }} />
      ),
      MonthlyDeposit: (
        <input type="text" className="inputFields" style={{ width: "90%" }} />
      ),
    };

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/rd_history/",
          {
            member_id: formData.employeeNO,
            Account_type: "Term Deposit",
            // RDID : RDID
          }
        );
        console.log("API Response:", response.data);
        dataArray = response.data.Output;
        dataArray.push(inputObject);
        console.log("dataArray", dataArray);
        setTransactions(dataArray);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchData();
  }, [formData.employeeNO]);

  const [totalSavingBalance, setTotalSavingBalance] = useState("");

  const apiUrl = "http://bpcl.kolhapurdakshin.com:8000/saving_history/";

  const columns = [
    {
      name: "Date",
      selector: "RDID",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "RV No",
      selector: "member_id",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Particular",
      selector: "MonthlyDeposit",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Cheque No",
      selector: "InterestRate",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Debit",
      selector: "deposit_period",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "Credit",
      selector: "deposit_period",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "Balance",
      selector: "deposit_period",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "User",
      selector: "deposit_period",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = [
      "transactionType",
      "transactionAmount",
      "transactionDetails",
      "receiptVoucherNo",
      "selectedBankTransfer",
      "chequeNo",
      "micrCode",
      "ifscCode",
      "selectedBankName",
      "selectedBankBranch",
    ];

    const currentDate = new Date().toISOString().split("T")[0];
  };

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    // Disable other fields based on the updated state
    if (formData.cashAmount !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        bankAmount: "",
        transferAmount: "",
      }));
    } else if (formData.bankAmount !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cashAmount: "",
        transferAmount: "",
      }));
    } else if (formData.transferAmount !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cashAmount: "",
        bankAmount: "",
      }));
    }
  }, [formData]);

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="H1-Heading-Main">
            Member Settlement Account Receipt / Payment Entry
          </div>

          <div className="container-fluid First-Main-Row border">
            <div className="row    pt-3 pb-3 w-100">
              <form
                className="mt-3 py-3"
                style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
              >
                <div className="Border-Black p-2 mb-4">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label for="rdId" className="small-label ms-1">
                        Employee No.
                      </label>
                      <input
                        type="text"
                        id="InterestRate"
                        name="InterestRate"
                        step="0.01"
                        className="form-control no-outline"
                        value={MemberId}
                        onChange={handleMemberIdChange}
                        min={0}
                        pattern="[0-9]*"
                      />

                      {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                      <div className="no-outline-login mt-1 ms-1">
                        <label htmlFor="" className="labels">
                          Name :
                        </label>
                        <span className=" ">{formData.firstName}</span>
                      </div>
                    </div>
                    <div className="col-xl-7 col-lg-6 col-md-8 col-sm-6 text-start "></div>

                    <div className="col-xl-2 col-lg-3 col-md-8 col-sm-6 text-start ">
                      <label htmlFor="" className="labels ms-1">
                        Lock Amount : 0
                      </label>
                      <br />
                      <label htmlFor="" className="labels ms-1">
                        Account No. : 4836
                      </label>
                      <br />
                      <label htmlFor="" className="labels ms-1">
                        Contribution : 13000
                      </label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="container-fluid d-flex">
                <div
                  className="row py-2 w-100"
                  style={{
                    backgroundColor: "",
                    borderRadius: "10px",
                  }}
                >
                  <div className="col-12">
                    <div className="H1-Heading-Main">
                      Cummulative Deposit Receipt/Payment Entry
                    </div>
                    {formData.employeeNO !== "" ? (
                      <div>
                        <DataTable
                          columns={columns}
                          data={transactions}
                          noHeader
                          pagination={false}
                          striped
                          dense
                          responsive
                          customStyles={customStyles}
                          // customStyles={{
                          //   rows: {
                          //     style: {
                          //       maxHeight: "65px",
                          //     },
                          //   },
                          // }}
                        />
                        <div className="row mt-3 mb-3">
                          <div className="col-sm d-flex justify-content-center">
                            <button
                              type="button"
                              className="mt-2 mx-2"
                              // onClick={handleFormSubmit}
                              style={{
                                padding: "7px 25px 7px 25px",
                                backgroundColor: "green",
                                color: "white",
                                fontWeight: "bold",
                                border: "none",
                                borderRadius: "7px",
                                fontSize: "16px",
                              }}
                            >
                              Save
                            </button>
                            {/* </div>
                                    <div className="col-sm d-flex justify-content-center"> */}
                            <button
                              type="button"
                              className="mt-2 mx-2"
                              // onClick={handleCancel}
                              style={{
                                padding: "7px 25px 7px 25px",
                                backgroundColor: "red",
                                color: "white",
                                fontWeight: "bold",
                                border: "none",
                                borderRadius: "7px",
                                fontSize: "16px",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                          {/* <></> */}
                        </div>
                      </div>
                    ) : (
                      <p style={{ textAlign: "center" }}>
                        No data available, Please Insert The Member ID!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
