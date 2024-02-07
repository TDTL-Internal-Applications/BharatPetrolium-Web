import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import "../Style/Global_Classes.css";

export default function MemSavDeposit() {
  const [processedTransactions, setProcessedTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  const formRef = useRef(null);

  const handleAccept = async (event) => {
    event.preventDefault();
    const data = {
      // transactionDate: currentDate,
      memberId: formData.employeeNO,
      // amount_to_update: transactionAmount,
      // particular: selectedOption,
      cheque_no: chequeNoSaving,
    };
    if (transactionformData.bankAmount !== "") {
      data.bank_amount = transactionformData.bankAmount;
    }

    if (transactionformData.cashAmount !== "") {
      data.cash_amount = transactionformData.cashAmount;
    }

    if (transactionformData.transferAmount !== "") {
      data.transfer_amount = transactionformData.transferAmount;
    }

    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/member_saving_dep_trans/",
        data
      );

      console.log("API Response:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: " Transaction successful",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button-share");
        },
      });

      formRef.current.reset();

      ////////////
      setTransactionformData({
        cashAmount: "",
        bankAmount: "",
        transferAmount: "",
        transactionAmount: "",
        selectedBankName: "",
      });
      setChequeNOSaving("");
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        //text: "You have already taken 20 shares. To further increase your shareholding, consider exploring cumulative deposits!",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button-share");
        },
      });
    }
    // selectedOption("");
  };

  const [disablecash, setdisablecash] = useState(false);
  const [disablebank, setdisablebank] = useState(false);
  const [disabletransfer, setdisabletransfer] = useState(false);
  const [transactionformData, setTransactionformData] = useState({
    cashAmount: "",
    bankAmount: "",
    transferAmount: "",
    selectedBankTransfer: "",
    selectedBankName: "",
  });

  const [chequeNoSaving, setChequeNOSaving] = useState("");

  let [MemberId, setMemberID] = useState("");

  const [bankName, setBankName] = useState("");

  let [monthlyContribution, setmonthlyContribution] = useState("");

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
      const bankName = data.bank_name;
      console.log(bankName);
      setBankName(bankName);
      console.log(data);
      setmonthlyContribution(data.monthly_contribution);

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

  const [selectedOption, setSelectedOption] = useState("");

  const [transactions, setTransactions] = useState([]);

  let [lastTotalAmount, setLastTotalAmount] = useState("");

  const [intervalId, setIntervalId] = useState(null);

  const fetchData = async () => {
    let dataArray = [];
    let inputObject = {
      TransactionDate: (
        <input
          type="date"
          className="inputFields text-center"
          value={getCurrentDate()}
        />
      ),
      RV_no: (
        <input
          type="text"
          className="inputFields text-center"
          style={{ width: "90%" }}
          min={0}
        />
      ),
      particular: (
        <input
          type="text"
          className="inputFields text-center"
          style={{ width: "90%" }}
        />
      ),

      cheque_no: (
        <input
          type="text"
          className="inputFields text-center"
          style={{ width: "90%" }}
        />
      ),
      debit: (
        <input
          type="text"
          className="inputFields text-center"
          style={{ margin: "auto", width: "90%", display: "block" }}
          min={0}
        />
      ),
      amount: (
        <input
          type="text"
          className="inputFields text-center"
          style={{ margin: "auto", width: "90%", display: "block" }}
          min={0}
        />
      ),
      balance: (
        <input
          type="text"
          id="Balance"
          className="inputFields text-center"
          style={{ margin: "auto", width: "90%" }}
          value={lastTotalAmount}
          readOnly
        />
      ),
      user: (
        <input type="text" className="inputFields" style={{ width: "90%" }} />
      ),
    };
    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/member_settlement/",
        {
          member_id: formData.employeeNO,

          // RDID : RDID
        }
      );
      const dataArray = response.data.result_set || [];
      const lastTransaction = dataArray[dataArray.length - 1];
      const atotalAmount = lastTransaction ? lastTransaction.balance || "" : "";

      dataArray.push(inputObject);
      console.log("dataArray", dataArray);

      setTotalAmount(() => atotalAmount);
      setTransactions([...dataArray]);
      setLastTotalAmount(response.data.total_saving_balance);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [formData.employeeNO]);

  useEffect(() => {
    fetchData();
  }, [lastTotalAmount]);

  useEffect(() => {
    console.log("useEffect is running");
    const inputField = document.getElementById("Balance");
    if (inputField) {
      inputField.value = totalAmount;
    }
  }, [totalAmount]);

  //Fetching data after every 5 sec
  useEffect(() => {
    fetchData();
    const id = setInterval(() => {
      fetchData();
    }, 5000);
    setIntervalId(id);
    return () => {
      clearInterval(id);
    };
  }, [formData.employeeNO, lastTotalAmount, totalAmount]);

  const columns = [
    {
      name: "Date",
      selector: "TransactionDate",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "RV No",
      selector: "RV_no",
      sortable: true,
      center: true,
      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Particular",
      selector: "Account_type",
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
        textAlign: "center",
      },
    },
    {
      name: "Credit",
      selector: "amount",
      sortable: true,
      center: true,
      //amount
      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center",
      },
    },
    {
      name: "Balance",
      selector: "balance",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center",
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

  useEffect(() => {
    const processTransactions = () => {
      const updatedTransactions = transactions.map((item) => {
        const newItem = { ...item };
        if (item.transaction_type === "Deposit") {
          newItem.amount = item.amount;
          newItem.debit = "0";
        } else if (item.transaction_type === "Withdrawal") {
          newItem.debit = item.amount;
          newItem.amount = "0";
        }

        return newItem;
      });

      setProcessedTransactions(updatedTransactions);
    };

    processTransactions();

    const intervalId = setInterval(() => {
      processTransactions();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [transactions]);
  console.log(processedTransactions);

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="H1-Heading-Main">
            Member Settlement Account Receipt / Payment Entry{" "}
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
                      <div className="row">
                        <div className="col">
                          <label htmlFor="" className="labels">
                            Employee No
                          </label>
                        </div>
                        <div className="col">
                          <div>
                            <span className=" ">
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
                              />{" "}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <label htmlFor="" className="labels">
                            Name
                          </label>
                        </div>
                        <div className="col">
                          <div>
                            <span className=" "> : {formData.firstName} {formData.lastName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-5 col-md-8 col-sm-6 text-start "></div>

                    <div className="col-xl-3 col-lg-4 col-md-8 col-sm-6 text-start ">
                      <label htmlFor="" className="labels ms-1">
                        Lock Amount : 0
                      </label>
                      <br />
                      <label htmlFor="" className="labels ms-1">
                        Account No. :&#160;&#160;
                        <span>{formData.bankSavingAcNo}</span>
                      </label>
                      <br />
                      <label htmlFor="" className="labels ms-1">
                        Contribution : &#160;&#160;
                        {formData.employeeNO === "" ? "" : monthlyContribution}
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
                  {/* //processedTransactions */}
                  <div className="col-12">
                    {formData.employeeNO !== "" ? (
                      <div>
                        <DataTable
                          columns={columns}
                          data={processedTransactions}
                          noHeader
                          pagination
                          striped
                          dense
                          responsive
                          customStyles={customStyles}
                        />
                        <div className="row mt-3 mb-3">
                          <div className="col-sm d-flex justify-content-center">
                            <button
                              type="button"
                              className="mt-2 mx-2"
                              data-toggle="modal"
                              data-target=".bd-example-modal-lg"
                              style={{
                                padding: "7px 25px 7px 25px",
                                backgroundColor: "green",
                                color: "white",
                                fontWeight: "bold",
                                border: "none",
                                width: "15%",
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
                                width: "15%",
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
