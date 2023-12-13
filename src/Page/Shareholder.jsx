import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Shareholder() {
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
        `http://127.0.0.1:8000/all_memberdata/${memberId}/`
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

  //   useEffect(() => {
  //     const currentDate = new Date().toISOString().split("T")[0];
  //     setPurchaseDate(currentDate);
  //   }, []);

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

    const { value: confirmPurchase } = await Swal.fire({
      title: "Confirm Purchase",
      text: "Are you sure you want to purchase shares?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Purchase",
      didOpen: () => {
        Swal.getPopup().style.borderRadius = "25px";
        const confirmButton = Swal.getConfirmButton();
        confirmButton.classList.add("custom-swal-button-share");
      },
    });

    if (confirmPurchase) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/shares_reg/${formData.employeeNO}/`,

          {
            memberData: formData,
            NumberOfShares: formData.NumberOfShares,
            SharePrice: formData.NumberOfShares * 500,
            PurchaseDate: formData.PurchaseDate,
          }
        );
        console.log("API response:", response.data);

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
          NumberOfShares: 0,
          SharePrice: 0,
        });

        Swal.fire({
          title: "Shares Purchased!",
          text: "Your purchase was successful.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
          },
        });
      } catch (error) {
        console.error("Error while making API call:", error);
        toast.error("Error processing your purchase. Please try again.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const [transactions, setTransactions] = useState([]);

  const [memberId, setMemberId] = useState("");
  useEffect(() => {
    // Fetch data from the API and update the state
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/shares/", {
          member_id: formData.employeeNO,
        });
        console.log("API Response:", response.data);
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };

    fetchData();
  }, [formData.employeeNO]);

  const [totalSavingBalance, setTotalSavingBalance] = useState("");
  const response = "http://127.0.0.1:8000/saving_history/";

  const fetchTotalSavingBalance = () => {
    fetch(response, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: formData.employeeNO,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        const totalSavingBalance = data[1]?.total_saving_balance;

        if (totalSavingBalance !== undefined) {
          console.log("Total Saving Balance:", totalSavingBalance);
          setTotalSavingBalance(totalSavingBalance);
        } else {
          console.error(
            "total_saving_balance is undefined in the API response."
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching total saving balance:", error);
      });
  };

  useEffect(() => {
    fetchTotalSavingBalance();
  }, [formData.employeeNO]);

  const columns = [
    {
      name: "Shareholder ID",
      selector: "ShareholderID",
      sortable: true,
    },
    {
      name: "Member ID",
      selector: "member_id",
      sortable: true,
    },
    {
      name: "Number of Shares",
      selector: "NumberOfShares",
      sortable: true,
    },
    {
      name: "Share Price",
      selector: "SharePrice",
      sortable: true,
    },
    {
      name: "Purchase Date",
      selector: "PurchaseDate",
      sortable: true,
    },
  ];

  const [transactionformData, setTransactionformData] = useState({
    member_id: formData.employeeNO,
    totalSavingBalance: "",
    transactionType: "",
    transactionAmount: "",
    transactionDate: "",
    transactionDetails: "",
    receiptVoucherNo: "",
    cashAmount: "",
    bankAmount: "",
    transferAmount: "",
    selectedBankTransfer: "",
    chequeNo: "",
    micrCode: "",
    ifscCode: "",
    selectedBankName: "",
    selectedBankBranch: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0];

    try {
      // Make the POST request
      const response = await axios.post(
        "http://127.0.0.1:8000/shares_purchase/",
        {
          ...transactionformData,
          transactionDate: currentDate,
          member_id: formData.employeeNO,
          SharePrice: transactionformData.transactionAmount,
        }
      );

      console.log("API Response:", response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Transaction successful!',
      });

      // Clear the form data after successful submission
      setTransactionformData((prevFormData) => ({
        ...prevFormData,
        totalSavingBalance: "",
        transactionType: "",
        transactionAmount: "",
        transactionDate: "",
        transactionDetails: "",
        receiptVoucherNo: "",
        cashAmount: "",
        bankAmount: "",
        transferAmount: "",
        selectedBankTransfer: "",
        chequeNo: "",
        micrCode: "",
        ifscCode: "",
        selectedBankName: "",
        selectedBankBranch: "",
      }));
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handletransactionpurchase = (event) => {
    const { name, value } = event.target;
    setTransactionformData((prevTransactionformData) => ({
      ...prevTransactionformData,
      [name]: value,
    }));
  };

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Shares Registration
            </h2>
          </div>
          <div className="container d-flex justify-content-center">
            <div className="row w-100">
              <div className="col-12">
                <form>
                  {/* 1st Row */}
                  <div className="row pb-2">
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Member ID*</label>
                      <input
                        type="number"
                        name=""
                        className="form-control no-outline"
                        value={formData.memberId}
                        onChange={handleMemberIdChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        min={0}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control no-outline"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control no-outline"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>
                  </div>
                  {/* 2nd Row */}
                  <div className="row py-3">
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Gender*</label>
                      <select
                        name="gender"
                        className="form-control no-outline"
                        value={formData.gender}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      >
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Birth Date*</label>
                      <input
                        type="date"
                        name="birthDate"
                        className="form-control no-outline"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Age</label>
                      <input
                        type="number"
                        name="age"
                        className="form-control no-outline"
                        value={formData.age}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                      />
                    </div>
                  </div>
                  {/* 3rd Row */}
                  <div className="row py-3">
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Join Date*</label>
                      <input
                        type="date"
                        name="joinDate"
                        className="form-control no-outline"
                        value={formData.joinDate}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Confirm Date*</label>
                      <input
                        type="date"
                        name="confirmDate"
                        className="form-control no-outline"
                        value={formData.confirmDate}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                          cursor: "pointer",
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Email*</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control no-outline"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>
                  </div>
                  {/* 5th Row */}
                  <div className="row py-3">
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">PAN No.*</label>
                      <input
                        type="text"
                        name="panNo"
                        className="form-control no-outline"
                        value={formData.panNo}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Mobile Number*</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        className="form-control no-outline"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>
                    {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Marital Status</label>
                      <select
                        name="maritalStatus"
                        className="form-control no-outline"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                      >
                        <option></option>
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    </div> */}
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Bank Saving A/c No.*</label>
                      <input
                        type="number"
                        name="bankSavingAcNo"
                        className="form-control no-outline"
                        value={formData.bankSavingAcNo}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div class="row py-3 ">
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">IFSC Code*</label>
                      <input
                        type="text"
                        name="ifscCode"
                        className="form-control no-outline"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>

                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Bank Name*</label>
                      <input
                        type="text"
                        name="bankName"
                        class="form-control no-outline"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                      <label for="text">Branch Name*</label>
                      <input
                        type="text"
                        name="branchName"
                        class="form-control no-outline"
                        value={formData.branchName}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div
                    className="row pt-3 pb-4 d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "#17a2b8",
                      color: "white",
                      borderRadius: "7px",
                    }}
                  >
                    <div className="col-lg-3 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Number of Shares*</label>
                      <input
                        type="number"
                        name="NumberOfShares"
                        className="form-control no-outline"
                        value={Math.max(
                          0,
                          Math.min(20, formData.NumberOfShares)
                        )}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                        max={20}
                        required
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Total Amount (Rs)</label>
                      <input
                        type="number"
                        name="SharePrice"
                        className="form-control no-outline"
                        value={Math.max(0, formData.NumberOfShares) * 500}
                        readOnly
                        style={{
                          backgroundColor: "whitesmoke",
                          borderColor: "none",
                        }}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 form-fields">
                      <label htmlFor="text">Purchase Date</label>
                      <input
                        type="date"
                        name="PurchaseDate"
                        className="form-control no-outline"
                        value={formData.PurchaseDate}
                        style={{ backgroundColor: "white" }}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            PurchaseDate: new Date(
                              e.target.value
                            ).toLocaleDateString(),
                          })
                        }
                        readOnly
                      />
                    </div>

                    <div
                      className="col-lg-3 col-md-12 col-sm-12 form-fields d-flex justify-content-center"
                      style={{ paddingTop: "30px" }}
                    >
                      <button
                        type="button"
                        className="btn"
                        onClick={handleTransaction}
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: "8px 20px",
                          borderRadius: "7px",
                          boxShadow:
                            "1px solid white, 5px 1px 5px 0px var(--bs-gray-600)",
                        }}
                      >
                        <FaShoppingCart style={{ marginRight: "8px" }} />
                        Purchase Shares
                      </button>
                    </div>
                    <div className="text-start pt-2">
                      <small className="text-white">
                        1 share = 500 Rs, Minimum purchase: 1 share & Maximum
                        purchase: 20 shares
                      </small>
                    </div>
                  </div> */}
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
                <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Transaction History
                </h2>
                  <DataTable
                    columns={columns}
                    data={transactions}
                    noHeader
                    pagination={false}
                    striped
                    dense
                    responsive
                    customStyles={{
                      rows: {
                        style: {
                          maxHeight: "65px", // Adjust as needed
                        },
                      },
                    }}
                  />
              </div>
              <div className="col-12 d-flex justify-content-start py-3">
                <button
                  type="button"
                  class="btn"
                  style={{ backgroundColor: "green", color: "white" }}
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Transfer
                </button>

                <div
                  class="modal fade"
                  id="exampleModalCenter"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header pb-0">
                        <h6 class="modal-title" id="exampleModalCenterTitle">
                          Transaction Details
                        </h6>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body py-0">
                        <div className="row w-100">
                          <div class="modal-body text-start">
                            <div className="row mb-1 mt-0 pt-0">
                              <label
                                for="inputCash3"
                                class="col-sm-4 col-form-label"
                              >
                                Balance in A/c
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputBalance3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputCash3"
                                class="col-sm-4 col-form-label"
                              >
                                Transaction Type
                              </label>
                              <div class="col-sm-8">
                                <select
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputEmail3"
                                >
                                  <option>Select Type</option>

                                  <option>Credit</option>
                                  <option>Cheque</option>
                                  <option>Bank Transfer</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputEmail3"
                                class="col-sm-4 col-form-label"
                              >
                                Transaction Amount
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputBank3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                Transaction Date
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="date"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                Transaction Details
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                Reciept/Voucher No.
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <hr className="pt-1 pb-1 m-0" />
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                Cash Amount
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                Bank Amount
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                Transfer Amount
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>

                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label text-start"
                              >
                                Select Bank Transfer
                              </label>
                              <div class="col-sm-8">
                                <select
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                >
                                  <option>Select Bank A/C</option>
                                  <option>SBI Current A/C 2352665</option>
                                  <option>SBI Saving A/C 2352665</option>
                                  <option>Axis Current A/C 2352665</option>
                                  <option>Transfer</option>
                                  <option>Transfer to/from Saving</option>
                                </select>
                              </div>
                            </div>
                            <div className="row pb-1 mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                Cheque No.
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <hr className="m-0 pt-2"/>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                MICR Code
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label"
                              >
                                IFSC Code
                              </label>
                              <div class="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                />
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label text-start"
                              >
                                Select Bank Name
                              </label>
                              <div class="col-sm-8">
                                <select
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                >
                                  <option>Select Bank A/C</option>
                                  <option>SBI Current A/C 2352665</option>
                                  <option>SBI Saving A/C 2352665</option>
                                  <option>Axis Current A/C 2352665</option>
                                  <option>Transfer</option>
                                  <option>Transfer to/from Saving</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-1">
                              <label
                                for="inputTransfer3"
                                class="col-sm-4 col-form-label text-start"
                              >
                                Select Bank Branch
                              </label>
                              <div class="col-sm-8">
                                <select
                                  type="text"
                                  class="form-control no-outline-login"
                                  id="inputTransfer3"
                                >
                                  <option>Select Bank A/C</option>
                                  <option>SBI Current A/C 2352665</option>
                                  <option>SBI Saving A/C 2352665</option>
                                  <option>Axis Current A/C 2352665</option>
                                  <option>Transfer</option>
                                  <option>Transfer to/from Saving</option>
                                </select>
                              </div>
                            </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
