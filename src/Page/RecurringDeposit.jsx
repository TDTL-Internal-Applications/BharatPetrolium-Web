import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function RecurringDeposit() {
  const [currentForm, setCurrentForm] = useState(1);
  const [memberNumbers, setMemberNumbers] = useState([]);
  const [showJoinNameForm, setShowJoinNameForm] = useState(false);

  useEffect(() => {
    // axios.get("http://127.0.0.1:8000/emp_data/").then((res)=>{
    //   console.log(res.data)
    // })
    const fetchMemberNumbers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/member_names/");
        setMemberNumbers(response.data.members);
      } catch (error) {
        console.error("Error fetching employee numbers:", error);
      }
    };

    fetchMemberNumbers();
  }, []); // Th

  const isAnyFieldEmpty = () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && !formData[key]) {
        return true;
      }
    }
    return false;
  };

  let isNotificationShown = false;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isAnyFieldEmpty() && !isNotificationShown) {
      toast.error("Please fill out all required fields");

      isNotificationShown = true;

      return;
    }

    // Reset the flag if the form is submitted again
    isNotificationShown = false;

    console.log("Form Data:", formData);

    axios
      .post("http://127.0.0.1:8000/rd_submit/", formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Data submitted successfully!",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });

        setFormData({
          RDID: "",
          MonthlyDeposit: 0,
          InterestRate: "",
          depositPeriod: "",
          StartDate: "",
          maturity_amount: "",
          EndDate: "",
          InterestAmt: "",
          firstName: "",
          middleName: "",
          lastName: "",
          gender: "",
          address: "",
          //   StartDate: "",
          member_id: "",
          birthDate: "",
          age: "",
          bloodGroup: "",
          joinDate: "",
          confirmDate: "",
          email: "",
          panNo: "",
          mobileNumber: "",
          maritalStatus: "",

          // Form 2 fields

          city: "",
          pinCode: "",
          phoneNo: "",
          nomineeName: "",
          nomineeBirthDate: "",
          nomineeAge: "",
          nomineeRelation: "",

          // Form 3 fields
          memberNo: "",
          memberName: "",
          ifscCode: "",
          bankAcNo: "",
          bankName: "",
          branchName: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);

        // Display Toastify notification for missing required fields
        if (isAnyFieldEmpty()) {
          toast.error("Please fill out all required fields");
          return;
        }

        if (error.response && error.response.data) {
          if (error.response.data.error_message) {
            const errorMessage = error.response.data.error_message;

            if (errorMessage.includes("Member already exists")) {
              // existing member
              Swal.fire({
                icon: "info",
                title: "Member Already Exists",
                text: errorMessage,
                didOpen: () => {
                  Swal.getPopup().style.background = "darkblue";
                  Swal.getPopup().style.color = "#fff";
                  Swal.getPopup().style.borderRadius = "25px";
                  const confirmButton = Swal.getConfirmButton();
                  confirmButton.classList.add("custom-swal-button");
                },
              });
            } else {
              // specific error message
              Swal.fire({
                icon: "info",
                title: "Already Exists",
                text: errorMessage,
                didOpen: () => {
                  Swal.getPopup().style.background = "darkblue";
                  Swal.getPopup().style.color = "#fff";
                  Swal.getPopup().style.borderRadius = "25px";
                  const confirmButton = Swal.getConfirmButton();
                  confirmButton.classList.add("custom-swal-button");
                },
              });
            }
          } else {
            // "error_message" is not present
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to submit data. Please try again.",
              didOpen: () => {
                Swal.getPopup().style.background = "darkblue";
                Swal.getPopup().style.color = "#fff";
                Swal.getPopup().style.borderRadius = "25px";
                const confirmButton = Swal.getConfirmButton();
                confirmButton.classList.add("custom-swal-button");
              },
            });
          }
        } else {
          // doesn't have the expected structure
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to submit data. Please try again.",
            didOpen: () => {
              Swal.getPopup().style.background = "darkblue";
              Swal.getPopup().style.color = "#fff";
              Swal.getPopup().style.borderRadius = "25px";
              const confirmButton = Swal.getConfirmButton();
              confirmButton.classList.add("custom-swal-button");
            },
          });
        }
      });
  };

  const [formData, setFormData] = useState({
    accountNumber: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    age: "",
    member_id: "",
    address: "",
    city: "",
    pinCode: "",
    mobileNumber: "",
    panNo: "",
    accountOpeningType: "",
    depositorCategory: "",
    autoRenewalExtraPercentage: "",
    transactionDate: "",
    oldAccountNumber: "",
    transferDetail: "",
    openDate: "",
    MonthlyDeposit: 0,
    depositPeriod: "",
    InterestRate: "",
    maturity_date: "",
    maturity_amount: "",
    interestAmount: "",
    paidDate: "",

    bankName: "",
    branchName: "",
    memberNo: "",
    memberName: "",
    bankAcNo: "",
    ifscCode: "",
    uidNo: "",
    effectDate: "",
    effectAmount: "",
    interestProvisionDate: "",
    interestProvisionAmount: "",
    nomineeName: "",
    nomineeBirthdate: "",
    nomineeAge: "",
    nomineeRelation: "",
    contributedBy: "",
    introducerNo: "",
  });
  const [joinName1Data, setJoinName1Data] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
    age: "",
  });

  const handleJoinName1Change = (e) => {
    const { name, value } = e.target;
    setJoinName1Data({
      ...joinName1Data,
      [name]: value,
    });
  };
  const [joinName2Data, setJoinName2Data] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
    age: "",
  });

  // Handle change for Join Name 2
  const handleJoinName2Change = (e) => {
    const { name, value } = e.target;
    setJoinName2Data({
      ...joinName2Data,
      [name]: value,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      let updatedFormData = { ...prevData, [name]: value };

      // Calculate age if birthDate is provided
      if (name === "birthDate") {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        if (
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
        ) {
          updatedFormData = { ...updatedFormData, age: age - 1 };
        } else {
          updatedFormData = { ...updatedFormData, age };
        }
      }

      return updatedFormData;
    });
  };

  const handleInputChangeFor = (
    MonthlyDeposit,
    InterestRate,
    depositPeriod,
    StartDate
  ) => {
    // const { name, value } = event.target;

    setFormData({
      ...formData,
      MonthlyDeposit: MonthlyDeposit,
      InterestRate: InterestRate,
      depositPeriod: depositPeriod,
      StartDate: StartDate,
    });

    // Update the formData state
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });

    // const requestData = {
    //   MonthlyDeposit: formData.MonthlyDeposit,
    //   InterestRate: formData.InterestRate,
    //   depositPeriod: formData.depositPeriod,
    //   StartDate: formData.StartDate,
    // };
    const requestData = {
      MonthlyDeposit: MonthlyDeposit,
      InterestRate: InterestRate,
      depositPeriod: depositPeriod,
      StartDate: StartDate,
    };

    // console.log(
    //   + " === " + MonthlyDeposit
    //   + " === " + InterestRate
    //   + " === " + depositPeriod
    //   + " === " + StartDate
    // )
    // Make the API request
    if (MonthlyDeposit !== undefined && MonthlyDeposit !== "") {
      if (InterestRate !== undefined && InterestRate !== "") {
        if (depositPeriod !== undefined && depositPeriod !== "") {
          if (StartDate !== undefined && StartDate !== "") {
            fetch("http://127.0.0.1:8000/rd_api/", {
              method: "POST", // or 'PUT' or 'PATCH' depending on your API
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                // Handle the API response and update the state with the new fields
                setFormData({
                  ...formData,
                  MonthlyDeposit: MonthlyDeposit,
                  InterestRate: InterestRate,
                  depositPeriod: depositPeriod,
                  StartDate: StartDate,
                  maturityOn: data.maturity_date,
                  MaturityAmt: data.maturity_amount,
                  interestAmount: data.interest_amount,
                });
              })
              .catch((error) => {
                // Log more detailed information about the error
                console.error("Error:", error);
                console.error("Error Details:", error.message, error.stack);
              });
          }
        }
      }
    }
  };
  // const handleDepositTransferClick = () => {
  //   setShowJoinNameForm(!showJoinNameForm);
  // };
  // const handleJoinNameClick = () => {
  //   setShowJoinNameForm(!showJoinNameForm);
  // };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Recurring Deposit Form
            </h3>
          </div>

          <div className="container d-flex justify-content-center">
            <div className="row w-100">
              <div className="col-12">
                {/* Your first form code */}
                <form>
                  {/* 1st Row */}
                  <div
                    className="row mb-3 pt-2"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  >
                  <h6 className="d-flex text-start pt-2" style={{color:"var(--primary)"}}><strong>Basic Information</strong></h6>

                    <div className="row py-1 d-flex align-items-center">
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            style={{ height: "2rem" }}
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Member No*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="rdId"
                            name="rd_id"
                            placeholder="Member No"
                          />
                          <label for="floatingInput">Employee*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Account No*</label>
                        </div>
                      </div>

                   
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">PAN Number</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">First Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Last Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Mobile Number</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Birth Date*</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row mb-3 pt-2"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  >
                    {/* Join Name form 1*/}
                  <h6 className="d-flex text-start pt-2" style={{color:"var(--primary)"}}><strong>Joinee Details</strong></h6>

                    <div className="row pt-2">
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <select
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          >
                            <option>Select Title</option>

                            <option>Mr.</option>
                            <option>Miss.</option>
                            <option>Mrs.</option>
                          </select>
                          <label for="floatingInput">Title</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">First Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Middle Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Last Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Birth Date*</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Age*</label>
                        </div>
                      </div>
                    </div>
                    {/* Join Name form 2*/}
                    <div className="row py-1">
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <select
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          >
                            <option>Select Title</option>

                            <option>Mr.</option>
                            <option>Miss.</option>
                            <option>Mrs.</option>
                          </select>
                          <label for="floatingInput">Title</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">First Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Middle Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Last Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Birth Date*</label>
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Age*</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row py-2 mb-3"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  > 
                  <h6 className="d-flex text-start pt-2" style={{color:"var(--primary)"}}><strong>Address Details</strong></h6>

                    {/* Address Details */}
                    <div className="row py-1">
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Address</label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">City</label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Pin Code</label>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                  <div
                    className="row pt-2 my-2"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  >
                  <h6 className="d-flex text-start pt-2" style={{color:"var(--primary)"}}><strong>Member Account Details</strong></h6>

                    <div className="row py-1">
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label
                            for="floatingInput"
                            style={{ fontSize: "15px" }}
                          >
                            A/c Opening Type*
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label
                            for="floatingInput"
                            style={{ fontSize: "15px" }}
                          >
                            Depositor Category*
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Renewal-Extra %*</label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Bank Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Branch Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">IFSC CODE*</label>
                        </div>
                      </div>
                    </div>
                    <div class="row py-1">
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">MICR Code*</label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Bank A/c No*</label>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">UID No*</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="row py-2 mt-3"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  >
                    <h6 style={{ color: "red" }}>
                      IF DEPOSIT TRANSFER FROM OTHER BRANCH
                    </h6>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <div class="form-floating no-outline-login mb-3">
                        <input
                          type="date"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput">Transaction Date*</label>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <div class="form-floating no-outline-login mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput">Old A/c No*</label>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                      <div class="form-floating no-outline-login mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput">Transfer Detail*</label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row mt-3"
                    style={{
                      backgroundColor: "whitesmoke",
                      borderRadius: "10px",
                    }}
                  >

                    <div className="row pt-3">
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Opening Date*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Installment Amount*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Deposit Period*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Interest Rate*</label>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Maturity On*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Maturity Amount*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Interest Amount*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Paid Date*</label>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Effect Date*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Effect Amount*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">
                            Interest Provision Date*
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Interest Pro. Amt*</label>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Nominee Name*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Birth Date*</label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <select
                            type="date"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          >
                            <option>Demo</option>
                            <option>Demo</option>
                          </select>
                          <label for="floatingInput">
                            Contributed Amount By*
                          </label>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-floating no-outline-login mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                          />
                          <label for="floatingInput">Introducer No*</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <button
                  type="button"
                  className="mt-2"
                  onClick={handleFormSubmit}
                  style={{
                    padding: "10px 30px 10px 30px",
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "7px",
                    fontSize: "18px",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
