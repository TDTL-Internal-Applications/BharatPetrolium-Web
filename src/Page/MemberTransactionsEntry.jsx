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


export default function MemberTransactionsEntry(props) {
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
    division:"",
    post : "",


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
          mobileNumber: "",
          maritalStatus: "",
          ifscCode: "",
          bankSavingAcNo: "",
          bankName: "",
          branchName: "",
          division:"",
          post:"",
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
        posting: data.posting || "",
        division: data.division || "",
        
        post: data.post || "",


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
      name: "Date",
      selector: "transaction_date",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "RV No",
      selector: "transaction_id",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Particular",
      selector: "particular",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Cheque No",
      selector: "cheque_no",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Debit",
      selector: "debit",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "Credit",
      selector: "credit",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "Balance",
      selector: "balance",
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
      // transaction_date: (
      //   <input
      //     type="date"
      //     className="inputFields text-center"
      //     value={getCurrentDate()}
      //   />
      // ),
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
      // balance: (
      //   <input
      //     type="text"
      //     id="Balance"
      //     className="inputFields text-center"
      //     style={{ margin: "auto", width: "90%" }}
      //     value={totalAmount}
      //   />
      // ),
      user: (
        <input type="text" className="inputFields" style={{ width: "90%" }} />
      ),
    };

    //Deposit_receipt
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/member_saving_deposit/",
         
          {
            account_id: formData.employeeNO,
            Account_type: "Term Deposit",
            // RDID : RDID
          }
        );
        const dataArray = response.data.result_set || [];
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
            <div className="H1-Heading-Main">Member Transactions Entries</div>
          </div>
          <div className="container d-flex justify-content-center">
            <div
              className="row py-2 w-100"
              style={{ backgroundColor: "whitesmoke", borderRadius: "10px" }}
            >
              <div className="col-12">
                <form>
                  {/* 1st Row */}
                  <div className="row pb-1">
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">Member ID*</label>
                      <input
                        type="number"
                        name="memberId"
                        className="form-control no-outline"
                        value={formData.employeeNO}
                        // onChange={handleMemberIdChange}
                        onChange={(e)=>{handleMemberIdChange(e.target.value)}}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        min={0}
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">First Name*</label>
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
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">Last Name*</label>
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
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">Gender*</label>
                      <select
                        name="gender"
                        className="form-select no-outline"
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
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">Email*</label>
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
                    <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">Opening Date*</label>
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
                  <div className="row pb-1">
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">Posting*</label>
                      <input
                        type="text"
                        name="posting"
                        className="form-control no-outline small-label"
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        required
                        disabled
                        value={formData.posting}

                      >
                        
                      </input>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text" className="small-label">Division*</label>
                      <input
                        type="text"
                        name="division"
                        className="form-control small-label"
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        required
                        disabled
                        value={formData.division}

                      >
                        
                      </input>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text " className="small-label">Post*</label>
                      <input
                        type="text"
                        name="post"
                        className="form-control small-label"
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        value={formData.post}

                        required
                        disabled
                      >
                        {/* <option value=""></option> */}
                      </input>
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
              <div className="col-12">
                <div className="H1-Heading-Main">Transaction History</div>
                {formData.employeeNO !== "" ? (
                  <DataTable
                    columns={columns}
                    data={processedTransactions}
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
