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

export default function MemberLoanTransactionsEntries(props) {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [bankAmounts, setBankAmounts] = useState("");
  const handleBankAmountsChange = (event) => {
    setBankAmounts(event.target.value);
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
    division: "",
    post: "",
    posting: "",
    meeting_no: "",
    meeting_date: "",
    resolution_no: "",
    resolution_date: "",
    monthly_contribution: "",
    employeeNo: "",
    blood_group: "",
    retire_on: "",

    salary: "",
    PurchaseDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    let ID = props.memberIdNo;
    // let tempForm = { ...formData };
    // tempForm["employeeNO"] = props.memberIdNo;
    // setFormData(tempForm);
    handleMemberIdChange(ID);
    // RDHistory(ID);
  }, [props.memberIdNo]); // Added formData as a dependency

  const handleMemberIdChange = async (event) => {
    // const memberId = event.target.value;
    const memberId = event;

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
          employeeNo: "",

          mobileNumber: "",
          maritalStatus: "",
          ifscCode: "",
          bankSavingAcNo: "",
          bankName: "",
          branchName: "",
          division: "",
          post: "",
          posting: "",
          meeting_no: "",
          meeting_date: "",
          resolution_no: "",
          resolution_date: "",
          monthly_contribution: "",
          blood_group: "",
          salary: "",
          retire_on: "",
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
        posting: data.posting || "",
        division: data.division || "",
        bloodGroup: data["blood_group"],
        retire_on: data["retire_on"],

        post: data.post || "",
        meeting_no: data["meeting_no"],
        meeting_date: data["meeting_date"],
        resolution_no: data["resolution_no"],
        resolution_date: data["resolution_date"],
        monthly_contribution: data["monthly_contribution"],
        salary: data["salary"],
        employeeNo: data["emp_no"],
      });
      console.log(formData.employeeNO);
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    console.log("useEffect is running");
    const inputField = document.getElementById("Balance");
    if (inputField) {
      inputField.value = totalAmount;
    }
  }, [totalAmount]);

  const columns = [
    {
      name: "Sr. No",
      selector: (row, index) => index + 1,
      sortable: false,
      center: true,
      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center",
      },
    },
    {
      name: "G. Emp No",
      selector: "guranter_emp_no",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "G. member No",
      selector: "guranter_member_no",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
   
    {
      name: "Guranter Name",
      selector: "guranter_name",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "Loan Type",
      // selector: "guranter_name",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "Loan No",
      selector: "loan_no",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Loan Date",
      // selector: "guranter_name",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "Total Guaranters",
      // selector: "guranter_name",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    
   

    // {
    //   name: "User",
    //   selector: "deposit_period",
    //   sortable: true,
    //   center: true,

    //   style: {
    //     borderRight: "1px solid #ddd",
    //     textAlign: "center", // Add a right border to the column
    //   },
    // },
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

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const processedTransactions = transactions.map((item) => {
    const newItem = { ...item };
    if (item.transaction_type === "Deposit") {
      newItem.credit = item.amount;
      newItem.debit = "0";
    } else if (item.transaction_type === "Withdrawal") {
      newItem.debit = item.amount;
      newItem.credit = "0";
    }

    return newItem;
  });
  useEffect(() => {
    // Fetch data from the API and update the state
    let dataArray = [];
    let inputObject = {
      transaction_date: (
        <input
          type="date"
          className="inputFields text-center"
          value={getCurrentDate()}
        />
      ),
      // transaction_id: (
      //   <input
      //     type="text"
      //     className="inputFields text-center"
      //     style={{ width: "90%" }}
      //     min={0}
      //   />
      // ),
      // particular: (

      //   <select
      //     type="text"
      //     className="inputFields "
      //     required

      //   >
      //     <option value="">Select an option</option>

      //     <option value="By NEFT ">To NEFT</option>
      //     <option value="By interest">By Interest</option>
      //   </select>
      // ),

      // cheque_no: (
      //   <input
      //     type="text"
      //     className="inputFields text-center"
      //     style={{ width: "90%" }}
      //   />
      // ),
      // debit: (
      //   <input
      //     type="text"
      //     className="inputFields text-center"
      //     style={{ margin: "auto", width: "90%", display: "block" }}
      //     min={0}
      //   />
      // ),
      // credit: (
      //   <input
      //     type="text"
      //     className="inputFields text-center"
      //     style={{ margin: "auto", width: "90%", display: "block" }}
      //     min={0}
      //   />
      // ),
      balance: (
        <input
          type="text"
          id="Balance"
          className="inputFields text-center"
          style={{ margin: "auto", width: "90%" }}
          value={totalAmount}
        />
      ),
      user: (
        <input type="text" className="inputFields" style={{ width: "90%" }} />
      ),
    };

    //Deposit_receipt
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/guarenters/",

          {
            member_id: formData.employeeNO,
            Account_type: "Term Deposit",
            // RDID : RDID
          }
        );
        const dataArray = response.data.guranter || [];
        const lastTransaction = dataArray[dataArray.length - 1];
        const atotalAmount = lastTransaction
          ? lastTransaction.balance || ""
          : "";

        dataArray.push(inputObject);
        console.log("dataArray", dataArray);

        setTotalAmount(() => atotalAmount);
        setTransactions([...dataArray]);

        // console.log("API Response:", response.data);
        // dataArray = response.data.result_set;
        // // const myAmount = response.data.total_saving_balance;

        // // console.log("Total Saving Balance:", myAmount);
        // dataArray.push(inputObject);
        // console.log("dataArray", dataArray);
        // setTotalAmount(atotalAmount);
        // setTransactions(dataArray);
        // const lastTransaction = dataArray[dataArray.length - 1];useEffect
        // const atotalAmount = lastTransaction.total_amount || "";

        // if (resultSetLength > 0) {
        //   const firstElement = resultSet[0];
        //   console.log("First Element:", firstElement);
        // } else {
        //   console.log("No elements in the result set.");
        // }

        // const resultSet = response.data.result_set;
        // const resultSetLength = resultSet.length;

        // if (resultSetLength > 0) {
        //   const firstElement = resultSet[0];
        //   console.log("First Element:", firstElement);
        // }
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchData();
  }, [formData.employeeNO]);

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
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Member Guarantees</div>
          </div>
          <div className="container d-flex justify-content-center">
            <div
              className="row py-2 w-100"
              style={{ backgroundColor: "whitesmoke", borderRadius: "10px" }}
            >
              <div className="col-12">
                <form>
                  {/* 1st Row */}
                  <div className="row pb-1 ">
                    <div className="col-xl col-lg col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">
                        Member ID*
                      </label>
                      <input
                        type="number"
                        name="memberId"
                        className="form-control no-outline"
                        value={formData.employeeNO}
                        // onChange={handleMemberIdChange}
                        onChange={(e) => {
                          handleMemberIdChange(e.target.value);
                        }}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        min={0}
                        required
                        readOnly
                      />
                    </div>
                    <div className=" col-xl-2 col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control no-outline"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control no-outline"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">
                        Gender*
                      </label>
                      <select
                        name="gender"
                        className="form-control no-outline"
                        value={formData.gender}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                          fontSize: "12px",
                        }}
                        required
                        disabled
                      >
                        <option></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className=" col-xl col-lg col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">
                        Email*
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control no-outline"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-xl col-lg col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">
                        Opening Date*
                      </label>
                      <input
                        type="date"
                        name="date"
                        className="form-control no-outline"
                        value={currentDate}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  {/* 3rd Row */}
                  <div className="row">
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div class="no-outline-login">
                        <label htmlFor="" className="small-label">
                          Posting*
                        </label>
                        <input
                          type="text"
                          name="posting"
                          class="form-control small-label"
                          value={formData.posting}
                          disabled
                          style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}

                          // id="floatingInput"
                          // onChange={handleInputChange}
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div class="no-outline-login">
                        <label for="" className="small-label">
                          Division*
                        </label>
                        <input
                          type="text"
                          name="division"
                          class="form-control small-label"
                          value={formData.division}
                          disabled
                          style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                          // id="floatingInput"
                          // onChange={handleInputChange}
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start ">
                      <div class="no-outline-login">
                        <label htmlFor="post" className="small-label">
                          Post*
                        </label>
                        <input
                          type="text"
                          name="post"
                          class="form-control small-label"
                          value={formData.post}
                          style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                          disabled
                          // id="floatingInput"
                          // onChange={handleInputChange}
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Meeting No. and Date*
                      </label>
                      <div>
                        <div className="row">
                          <div className="col-sm-5 mb-2">
                            <input
                              className="form-control small-label"
                              id="meeting_no"
                              name="meeting_no"
                              value={formData.meeting_no}
                              disabled
                              style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                              // onChange={(e) => {
                            />
                          </div>
                          <div className="col-sm-7">
                            <input
                              type="date"
                              className="form-control small-label"
                              id="meeting_date"
                              name="meeting_date"
                              // style={{ width: "100%" }}
                              value={formData.meeting_date}
                              style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                              disabled
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Resolution No. and Date*
                      </label>
                      <div>
                        <div className="row">
                          <div className="col-sm-5 mb-2">
                            <input
                              type="text"
                              className="form-control small-label"
                              id="resolution_no"
                              name="resolution_no"
                              value={formData.resolution_no}
                              disabled
                              style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                            />
                          </div>
                          <div className="col-sm-7">
                            <input
                              type="date"
                              className="form-control small-label"
                              id="resolution_date"
                              name="resolution_date"
                              value={formData.resolution_date}
                              // style={{ width: "100%" }}
                              disabled
                              style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                              // onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class=" ">
                        <label for="employeeNo" className="small-label">
                          Emp No.*
                        </label>
                        <input
                          type="text"
                          id="rdId"
                          name="employeeNo"
                          class="form-control small-label"
                          style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                          // placeholder="Enter Employee No"
                          value={formData.employeeNo}
                          disabled
                          
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label for="birthDate" className="small-label">
                        Birth Date*
                      </label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        className="form-control small-label"
                        value={formData.birthDate}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        min={0}
                        readOnly
                      />
                    </div>
                    <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label for="age" className="small-label">
                        Age*
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        class="form-control small-label "
                        value={formData.age}
                        min={0}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        maxLength={2}
                        readOnly
                      />
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="bloodGroup" className="small-label">
                        Blood Group*
                      </label>
                      <input
                        id="bloodGroup"
                        name="bloodGroup"
                        className="form-control small-label "
                        value={formData.bloodGroup}
                        readOnly
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        //   onChange={handleInputChange}
                      ></input>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label for="joinDate" className="small-label">
                        Join Date*
                      </label>
                      <input
                        type="date"
                        id="joinDate"
                        name="joinDate"
                        class="form-control small-label"
                        value={formData.joinDate}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        readOnly
                        //   onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label for="confirmDate" className="small-label">
                        Confirmed On
                      </label>
                      <input
                        type="date"
                        id="confirmDate"
                        name="confirmDate"
                        class="form-control small-label"
                        value={formData.confirmDate}
                        readOnly
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        //   onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label for="retire_on" className="small-label">
                        Retire On*
                      </label>
                      <input
                        type="date"
                        id="retire_on"
                        name="retire_on"
                        class="form-control small-label"
                        readOnly
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        // placeholder="Enter Employee No"
                        value={formData.retire_on}
                        //   onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl col-lg col-md-6 col-sm-6 text-start">
                      <label htmlFor="" className="small-label">
                        Email ID*
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control small-label"
                        readOnly
                        value={formData.email}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        //   onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="no-outline-login">
                        <label htmlFor="panNo" className="small-label">
                          PAN No.*
                        </label>
                        <input
                          type="text"
                          name="panNo"
                          className="form-control small-label"
                          id="panNo"
                          value={formData.panNo}
                          readOnly
                          style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg col-md-6 col-sm-6 text-start ">
                      <label
                        htmlFor="mobileNumber       "
                        className="small-label"
                      >
                        Mobile No.*
                      </label>
                      <div>
                        <input
                          type="text"
                          name="mobileNumber"
                          className="form-control small-label"
                          value={formData.mobileNumber}
                          pattern="[0-9]*"
                          readOnly
                          style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="">
                        <label for="maritalStatus" className="small-label">
                          Marital Status*
                        </label>
                        <input
                          type="text"
                          name="maritalStatus"
                          className="form-control small-label "
                          id="maritalStatus"
                          value={formData.maritalStatus}
                          readOnly
                          style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2" >
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="monthly_contribution"
                        className="small-label"
                      >
                        Monthly Contribution*
                      </label>
                      <input
                        type="text"
                        name="monthly_contribution"
                        className="form-control small-label"
                        value={formData.monthly_contribution}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        readOnly
                        maxLength={6}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="balance" className="small-label">
                        Balance*
                      </label>
                      <input
                        type="text"
                        name="balance"
                        className="form-control small-label"
                        // value={formData.balance}
                        readOnly
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        maxLength={6}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="resignation_date" className="small-label">
                        Resign Date*
                      </label>
                      <input
                        type="date"
                        name="resignation_date"
                        readOnly
                        className="form-control small-label"
                        // value={formData.resignation_date}

                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="salary" className="small-label">
                        Salary*
                      </label>
                      <div>
                        <input
                          type="text"
                          name="salary"
                          className="form-control small-label"
                          value={formData.salary}
                          readOnly
                          maxLength={8}
                          style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="container d-flex">
            <div
              className="row py-2 w-100"
              style={{
                backgroundColor: "",
                borderRadius: "10px",
              }}
            >
              <div className="col-12 mt-3">
                {/* <div className="H1-Heading-Main">Transaction History</div> */}
                {formData.employeeNO !== "" ? (
                  <DataTable
                    columns={columns}
                    data={processedTransactions}
                    noHeader
                    pagination
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
                ) : (
                  <p style={{ textAlign: "center" }}>
                    No data available, Please Insert The Member ID!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="row mt-1 mb-1">
            <div className="col-sm d-flex justify-content-center">
              {/* <Link to="/member-transactions-entries">
                <button
                  type="button"
                  className="mt-2 mx-2"
                  //   onClick={handleShowDetails}
                  style={{
                    padding: "5px 25px 5px 25px",
                    backgroundColor: "blue", // Choose a color for "Show Details" button
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "7px",
                    fontSize: "16px",
                  }}
                >
                  Show Entry
                </button>
              </Link> */}
              <Link to="/member-loan-transactions-entries">
                <button
                  type="button"
                  className="mt-2 mx-2"
                  // onClick={handleShowGuarantees}
                  style={{
                    padding: "5px 25px 5px 25px",
                    backgroundColor: "orange",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "7px",
                    fontSize: "16px",
                  }}
                >
                  Show Guarantees
                </button>
              </Link>
              {/* <Link to="/member-nomination-details">
              <button
                type="button"
                className="mt-2 mx-2"
                //   onClick={handleNomination}
                style={{
                  padding: "5px 25px 5px 25px",
                  backgroundColor: "purple", // Choose a color for "Nomination" button
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "7px",
                  fontSize: "16px",
                }}
              >
                Nomination
              </button>
              </Link> */}
              <Link to="/view-member-details">
                <button
                  type="button"
                  className="mt-2 mx-2"
                  //   onClick={handleCancel}
                  style={{
                    padding: "5px 25px 5px 25px",
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
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
