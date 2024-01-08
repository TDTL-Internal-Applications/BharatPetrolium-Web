import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";
import { Link } from "react-router-dom";

export default function TermDepositRenew() {
  const [memberNumbers, setMemberNumbers] = useState([]);

  useEffect(() => {
    // axios.get("http://127.0.0.1:8000/emp_data/").then((res)=>{
    //   console.log(res.data)
    // })
    const fetchMemberNumbers = async () => {
      try {
        const response = await axios.get(
          "http://bpcl.kolhapurdakshin.com:8000/member_names/"
        );
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
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/rd_submit/", formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Term deposit successfully renewed!",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });

        setFormData({
          accountType: "Term Deposit",
          RDID: "",
          MonthlyDeposit: "",
          InterestRate: "",
          deposit_period: "",
          StartDate: getCurrentDate(),
          MaturityAmt: "",
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

          nativeplace_city: "",
          nativeplace_pincode: "",
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
              Swal.getPopup().style.borderRadius = "25px";
              const confirmButton = Swal.getConfirmButton();
              confirmButton.classList.add("custom-swal-button");
            },
          });
        }
      });
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    accountType: "Term Deposit",
    accountNumber: "",
    StartDate: getCurrentDate(),
    initial: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    age: "",
    member_id: "",
    address: "",
    nativeplace_city: "",
    autoRenewalOption: 'Select', 

    nativeplace_pincode: "",
    mobileNumber: "",
    panNo: "",
    accountOpeningType: "",
    depositorCategory: "",
    autoRenewalExtraPercentage: "",
    transactionDate: "",
    oldAccountNumber: "",
    transferDetail: "",
    openDate: "",
    MonthlyDeposit: "",
    deposit_period: "",
    InterestRate: "",
    maturity_date: "",
    MaturityAmt: "",
    interestAmount: "",
    paidDate: "",
    employeeno: "",
    certificate_no: "",
    extra: "",
    MICR_no: "",
    old_acc_no: "",
    closed_on: "",
    close_amt: "",
    interestpaid: "",
    loan_type: "",
    Loan_amt: "",
    Loan_no: "",
    balance: "",

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

  const handleInputChangeFor = (MonthlyDeposit, deposit_period, StartDate) => {
    // const { name, value } = event.target;

    setFormData({
      ...formData,
      MonthlyDeposit: MonthlyDeposit,
      deposit_period: deposit_period,
      StartDate: StartDate || getCurrentDate(),
      accountType: "Term Deposit",
    });
    const requestData = {
      MonthlyDeposit: MonthlyDeposit,
      deposit_period: deposit_period,
      StartDate: StartDate || getCurrentDate(),
      accountType: "Term Deposit",
    };

    if (MonthlyDeposit !== undefined && MonthlyDeposit !== "") {
      if (deposit_period !== undefined && deposit_period !== "") {
        if (StartDate !== undefined && StartDate !== "") {
          fetch("http://bpcl.kolhapurdakshin.com:8000/Calculate_amt/", {
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
              console.log(data);
              // Handle the API response and update the state with the new fields
              if (data.error === "Not Eligible") {
                setFormData({
                  ...formData,
                  MonthlyDeposit: MonthlyDeposit,
                  // InterestRate: InterestRate,
                  deposit_period: deposit_period,
                  StartDate: StartDate,
                  maturityOn: "",
                  MaturityAmt: "",
                  interestAmount: 0,
                  InterestRate: "",
                });
              } else {
                setFormData({
                  ...formData,
                  MonthlyDeposit: MonthlyDeposit,
                  // InterestRate: InterestRate,
                  deposit_period: deposit_period,
                  StartDate: StartDate,
                  maturityOn: data.maturity_date,
                  MaturityAmt: data.total_value,
                  interestAmount: data.interest_amount,
                  InterestRate: data.interest_rate,
                });
              }
            })

            .catch((error) => {
              // Log more detailed information about the error
              console.error("Error:", error);
              console.error("Error Details:", error.message, error.stack);
            });
        }
      }
    }
  };

  const handleMemberIdChange = (e) => {
    const memberId = e.target.value;
    // Update the state immediately, so the input reflects the changes
    setFormData((prevData) => ({
      ...prevData,
      member_id: memberId,
    }));
    if (!memberId) {
      // Clear other form fields if memberId is empty
      setFormData((prevData) => ({
        ...prevData,
        initial:"",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        age: "",
        email: "",
        panNo: "",
        mobileNumber: "",
        nativeplace_pincode: "",
    autoRenewalOption: '', 

        nativeplace_city: "",
        address: "",
        bankName: "",
        branchName: "",
        MICR_no:"",
        bankAcNo: "",
        ifscCode: "",
        nomineeName: "",
        nomineeBirthdate: "",
        nomineeAge: "",
        nomineeRelation: "",
        employeeno: "",
        cetificate_no: "",
      }));
      return;
    }
    axios
      .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`)
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const memberData = ress.data.members[0];
  
          if (memberData["status"] === "N") {
            // Show Swal if the member is inactive
            Swal.fire({
              icon: "warning",
              title: "Retire Member",
              text: "This member is inactive.",
              didOpen: () => {
                Swal.getPopup().style.borderRadius = "25px";
                const confirmButton = Swal.getConfirmButton();
                confirmButton.classList.add("custom-swal-button");
              },
            });
          }

          setFormData((prevData) => ({
            ...prevData,
            initial: memberData["initial"],
            firstName: memberData["first_name"],
            middleName: memberData["middle_name"],
            lastName: memberData["last_name"],
            gender: memberData["gender"],
            birthDate: memberData["birth_date"],
            age: memberData["age"],
            email: memberData["email"],
            panNo: memberData["pan_no"],
            mobileNumber: memberData["mobile_no"],
            nativeplace_pincode: memberData["nativeplace_pincode"],
            nativeplace_city: memberData["nativeplace_city"],
            address: memberData["nativeplace_address"],
            MICR_no: memberData["MICR_no"],
            bankName: memberData["bank_name"],
            branchName: memberData["branch_name"],
            bankAcNo: memberData["bank_ac_no"],
            ifscCode: memberData["IFSC_code"],
            nomineeName: memberData["nominee_name"],
            nomineeBirthdate: memberData["nominee_birthdate"],
            nomineeAge: memberData["nominee_age"],
            nomineeRelation: memberData["relation"],
            employeeno: memberData["emp_no"],
            autoRenewalOption: memberData["autoRenewalOption"],

          }));
        } else {
          console.error("Unexpected response:", ress);
          console.error("Error: Unexpected response format or empty data");
        }
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
      });
  };
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading1 Main */}
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Renew Term Deposit</div>
          </div>

          <div className="container">
            {/* Your first form code */}
            <div className="row First-Main-Row  pt-3 mb-3">
              {/* Basic Information  */}
              <form>
                <div className="H2-Sub-Heading ">Basic Information</div>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="memberId" className="small-label">
                        Member No*
                      </label>
                      <div className="row">
                        <div className="col-sm-3">
                          <input
                            type="text"
                            id="memberId"
                            name="member_id"
                            class="form-control small-label"
                            // placeholder="Enter Member No"
                            // value={formData.member_id}
                            // onChange={handleMemberIdChange}
                            min={0}
                          />
                        </div>
                        <div className="col-sm-9 ">
                          <input
                            type="text"
                            id="memberId"
                            name="member_id"
                            class="form-control small-label"
                            // placeholder="Enter Member No"
                            value={formData.member_id}
                            // onChange={handleMemberIdChange}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                              );
                              handleMemberIdChange({
                                target: {
                                  name: "member_id",
                                  value: numericValue,
                                },
                              });
                            }}
                            min={0}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class=" ">
                      <label for="employeeno" className="small-label">
                        Employee No*
                      </label>
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label"
                        // placeholder="Enter Employee No"
                        value={formData.employeeno}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "employeeno", value: numericValue },
                          });
                        }}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="cetificate_no" className="small-label">
                        Certificate Number*
                      </label>
                      <input
                        type="text"
                        class="form-control small-label"
                        id="certificate_no"
                        name="certificate_no"
                        value={formData.certificate_no}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "certificate_no",
                              value: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="accountNumber" className="small-label">
                        Account No*
                      </label>
                      <input
                        type="text"
                        class="form-control small-label"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "accountNumber",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Initial
                    </label>
                    <input
                      name="initial"
                      value={formData.initial}
                      // onChange={handleJoinName2Change}
                      className="form-control small-label bg-white"
                      // id="floatingInput"
                      readOnly
                      //   required
                    ></input>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="firstName" className="small-label">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        class="form-control small-label"
                        id="firstName"
                        value={formData.firstName}
                        // onChange={(e) => {
                        //   const alphaValue = e.target.value.replace(
                        //     /[^A-z.]/g,
                        //     ""
                        //   );
                        //   handleInputChange({
                        //     target: { name: "firstName", value: alphaValue },
                        //   });
                        // }}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="middleName" className="small-label">
                      Middle Name*
                    </label>
                    <div>
                      <input
                        type="text"
                        name="middleName"
                        className="form-control small-label"
                        value={formData.middleName}
                        // onChange={(e) => {
                        //   const alphaValue = e.target.value.replace(
                        //     /[^A-z.]/g,
                        //     ""
                        //   );
                        //   handleInputChange({
                        //     target: { name: "middleName", value: alphaValue },
                        //   });
                        // }}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="lastName" className="small-label">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        class="form-control small-label"
                        id="lastName"
                        value={formData.lastName}
                        // onChange={(e) => {
                        //   const alphaValue = e.target.value.replace(
                        //     /[^A-z.]/g,
                        //     ""
                        //   );
                        //   handleInputChange({
                        //     target: { name: "lastName", value: alphaValue },
                        //   });
                        // }}
                      />
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="birthDate" className="small-label">
                        BirthDate*
                      </label>
                      <input
                        type="date"
                        class="form-control small-label"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        // placeholder="Enter BirthDate"
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="birthDate" className="small-label">
                        Age*
                      </label>
                      <input
                        type="text"
                        class="form-control small-label"
                        id="age"
                        minLength={2}
                        maxLength={2}
                        name="memberAge"
                        value={formData.age}
                        // onChange={(e) => {
                        //   const numericValue = e.target.value.replace(
                        //     /[^0-9.]/g,
                        //     ""
                        //   );
                        //   handleInputChange({
                        //     target: { name: "age", value: numericValue },
                        //   });
                        // }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Joinee Details  */}
                <div className="H2-Sub-Heading pt-3">Joinee Details 1 & 2</div>
                {/* Joinee 1  */}
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label for="" className="small-label">
                        Title
                      </label>
                      <select
                        type="text"
                        name="title"
                        class="form-select small-label"
                        // id="floatingInput"
                        value={joinName1Data.title}
                        onChange={handleJoinName1Change}
                      >
                        <option>Select</option>
                        <option>Mr.</option>
                        <option>Miss.</option>
                        <option>Mrs.</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="firstName" className="small-label">
                        First Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        // placeholder="name@example.com"
                        name="firstName"
                        value={joinName1Data.firstName}
                        onChange={(e) => {
                          const alphaValue = e.target.value.replace(
                            /[^A-z.]/g,
                            ""
                          );
                          handleJoinName1Change({
                            target: { name: "firstName", value: alphaValue },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Middle Name
                      </label>

                      <input
                        type="text"
                        name="middleName"
                        class="form-control small-placeholder"
                        value={joinName1Data.middleName}
                        onChange={(e) => {
                          const alphaValue = e.target.value.replace(
                            /[^A-z.]/g,
                            ""
                          );
                          handleJoinName1Change({
                            target: { name: "middleName", value: alphaValue },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        class="form-control small-placeholder"
                        id="floatingInput"
                        value={joinName1Data.lastName}
                        onChange={(e) => {
                          const alphaValue = e.target.value.replace(
                            /[^A-z.]/g,
                            ""
                          );
                          handleJoinName1Change({
                            target: { name: "lastName", value: alphaValue },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        BirthDate
                      </label>

                      <input
                        type="date"
                        class="form-control small-placeholder"
                        id="floatingInput"
                        name="birthdate"
                        value={joinName1Data.birthdate}
                        onChange={handleJoinName1Change}
                        // placeholder="name@example.com"
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Age
                      </label>

                      <input
                        type="text"
                        name="age"
                        minLength={2}
                        maxLength={2}
                        class="form-control small-placeholder"
                        value={joinName1Data.age}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleJoinName1Change({
                            target: { name: "age", value: numericValue },
                          });
                        }}
                        min={0}
                      />
                    </div>
                  </div>
                </div>
                {/* Joinee 2 */}
                <div className="row mb-2">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Title
                    </label>
                    <select
                      name="title"
                      value={joinName2Data.title}
                      onChange={handleJoinName2Change}
                      className="form-select small-label"
                      // id="floatingInput"
                    >
                      <option>Select Title</option>
                      <option>Mr.</option>
                      <option>Miss.</option>
                      <option>Mrs.</option>
                    </select>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="firstName"
                      value={joinName2Data.firstName}
                      onChange={(e) => {
                        const alphaValue = e.target.value.replace(
                          /[^A-z.]/g,
                          ""
                        );
                        handleJoinName2Change({
                          target: { name: "firstName", value: alphaValue },
                        });
                      }}
                    />
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="middleName"
                      value={joinName2Data.middleName}
                      onChange={(e) => {
                        const alphaValue = e.target.value.replace(
                          /[^A-z.]/g,
                          ""
                        );
                        handleJoinName2Change({
                          target: { name: "middleName", value: alphaValue },
                        });
                      }}
                    />
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="lastName"
                      value={joinName2Data.lastName}
                      onChange={(e) => {
                        const alphaValue = e.target.value.replace(
                          /[^A-z.]/g,
                          ""
                        );
                        handleJoinName2Change({
                          target: { name: "lastName", value: alphaValue },
                        });
                      }}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      BirthDate
                    </label>
                    <input
                      type="date"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="birthdate"
                      value={joinName2Data.birthdate}
                      onChange={handleJoinName2Change}
                    />
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      minLength={2}
                      maxLength={2}
                      value={joinName2Data.age}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9.]/g,
                          ""
                        );
                        handleJoinName2Change({
                          target: { name: "age", value: numericValue },
                        });
                      }}
                      className="form-control small-placeholder"
                      id="floatingInput"
                      min={0}
                    />
                  </div>
                </div>
                <div className="H2-Sub-Heading">Address Details</div>
                {/* Address Details */}
                <div className="row mb-2">
                  <div className="col-xl-4   col-lg-4 col-md-6 col-sm-12 text-start">
                    <label htmlFor="address" className="small-label">
                      Address*
                    </label>
                    <div className="mb-1">
                      <textarea
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
                    <label htmlFor="nativeplace_city" className="small-label">
                    City
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="nativeplace_city"
                        name="nativeplace_city"
                        value={formData.nativeplace_city}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
                    <label htmlFor="nativeplace_pincode" className="small-label">
                      Pin Code*
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="nativeplace_pincode"
                        name="nativeplace_pincode"
                        value={formData.nativeplace_pincode}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label htmlFor="autoRenewal" className="small-label">
                        A/c Auto Renewal
                      </label>
                      <select
                        className="form-select small-label"
                        id="autoRenewal"
                        name="autoRenewalOption"
                        value={formData.autoRenewalOption}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select Option
                        </option>
                      
                        <option value="NO">NO</option>
                        <option value="With Interest">With Interest</option>
                        <option value="Without Interest">Without Interest</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="mobileNumber" className="small-label">
                        Mobile Number*
                      </label>
                      <input
                        type="text"
                        class="form-control small-label"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        // placeholder="Enter Mobile Number"
                      />
                    </div>
                  </div>
                </div>


                <div className="H2-Sub-Heading">
                  Member Bank Account Details
                </div>

                <div className="row mb-3">
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label
                      className="small-label"
                      htmlFor="accountOpeningType"
                      style={{ color: "red" }}
                    >
                      Account Opening Type
                    </label>
                    <div className="">
                      <select
                        className="form-select  small-label"
                        id="accountOpeningType"
                        name="accountOpeningType"
                        value={formData.accountOpeningType}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          SELF
                        </option>
                        <option value="SELF">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label
                      className="small-label"
                      htmlFor="depositorCategory"
                      style={{ color: "red" }}
                    >
                      Depositor Category
                    </label>
                    <div className="">
                      <select
                        className="form-select  small-label"
                        id="depositorCategory"
                        name="depositorCategory"
                        value={formData.depositorCategory}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          GENERAL
                        </option>
                        <option value="GENERAL">GENERAL</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 text-start">
                    <div class="no-outline-login">
                      <label for="panNo" className="small-label">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        class="form-control small-label bg-white"
                        id="panNo"
                        name="panNo"
                        value={formData.panNo}
                        readOnly
                        // placeholder="Enter PAN Number"
                      />
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label
                      className="small-label"
                      htmlFor="floatingInput"
                      style={{ color: "red" }}
                    >
                     Extra %
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="extrapercentage"
                        value={formData.extrapercentage}
                        min={0}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "extrapercentage", value: numericValue },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank Name
                    </label>
                    <div className="">
                      <input
                        className="form-control bg-white"
                        id="floatingInput"
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        readOnly
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank A/c No*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        // placeholder="name@example.com"
                        name="bankAcNo"
                        value={formData.bankAcNo}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Branch Name*
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      IFSC CODE*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="rName"
                        value={formData.ifscCode}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      MICR Code*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        maxLength={9}
                        value={formData.MICR_no}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "MICR_no",
                              value: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      UID No*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        // placeholder="name@example.com"
                        name="uidNo"
                        value={formData.uidNo}
                        maxLength={12}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "uidNo",
                              value: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="Border-Red px-2 py-2 mb-3">
                  <div className=" mb-1" style={{ color: "red" }}>
                    USE ONLY, IF DEPOSIT TRANSFER FROM OTHER BRANCH
                  </div>
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "red" }}
                      >
                        Transaction Date
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label"
                          id="floatingInput"
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "red" }}
                      >
                        Old A/c No
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label"
                          id="floatingInput"
                          min={0}
                          value={formData.old_acc_no}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "old_acc_no",
                                value: numericValue,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start"
                      style={{ color: "red" }}
                    >
                      <label htmlFor="floatingInput" className="small-label">
                        Transfer Detail
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label"
                          id="floatingInput"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Border-Black px-2 py-2 mb-3">
                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Deposit Date*
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label"
                          id="floatingInput"
                          name="StartDate"
                          value={formData.StartDate}
                          onChange={(e) => {
                            handleInputChangeFor(
                              formData.MonthlyDeposit,
                              formData.InterestRate,
                              formData.deposit_period,
                              e.target.value
                            );
                          }}
                          min={getCurrentDate()}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Deposit Amount*
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label"
                          id="floatingInput"
                          name="MonthlyDeposit"
                          value={formData.MonthlyDeposit}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChangeFor(
                              numericValue,
                              formData.InterestRate,
                              formData.deposit_period,
                              formData.StartDate
                            );
                          }}
                          min={0}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Deposit Period*
                      </label>
                      <div>
                        <div className="row">
                          <div className="col-sm-6 mb-2">
                            <input
                              className="form-control small-label"
                              id="floatingInput"
                              name="deposit_period"
                              value={formData.deposit_period}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                handleInputChangeFor(
                                  formData.MonthlyDeposit,
                                  numericValue,
                                  formData.StartDate,
                                  formData.accountType
                                );
                              }}
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <label
                              className="form-control small-label"
                              id="floatingInput"
                              style={{ width: "100%" }}
                            >
                              Days
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Interest Rate*
                      </label>
                      <div>
                        <input
                          type="text"
                          step={0.01}
                          className="form-control small-label"
                          id="floatingInput"
                          name="InterestRate"
                          value={formData.InterestRate}
                          // onChange={(e) => {
                          //     const numericValue = e.target.value.replace(
                          //         /[^0-9.]/g,
                          //         ""
                          //     );
                          //     handleInputChange({
                          //         target: {
                          //             name: "InterestRate",
                          //             value: numericValue,
                          //         },
                          //     });
                          // }}
                          min={0}
                        />
                      </div>
                    </div>

                    {/* <div className="row"> */}
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Maturity On*
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label"
                          id="floatingInput"
                          name="maturityOn"
                          value={formData.maturityOn}
                          // onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Maturity Amount*
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label"
                          id="floatingInput"
                          name="MaturityAmt"
                          value={formData.MaturityAmt}
                          // onChange={(e) => {
                          //     const numericValue = e.target.value.replace(
                          //         /[^0-9.]/g,
                          //         ""
                          //     );
                          //     handleInputChange({
                          //         target: {
                          //             name: "MaturityAmt",
                          //             value: numericValue,
                          //         },
                          //     });
                          // }}
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Interest Amount*/Paid Date
                      </label>
                      <div>
                        <input
                          type="text"
                          step={0.01}
                          className="form-control small-label"
                          id="floatingInput"
                          name="interestAmount"
                          value={formData.interestAmount}
                          // onChange={(e) => {
                          //     const numericValue = e.target.value.replace(
                          //         /[^0-9.]/g,
                          //         ""
                          //     );
                          //     handleInputChange({
                          //         target: {
                          //             name: "interestAmount",
                          //             value: numericValue,
                          //         },
                          //     });
                          // }}
                          min={0}
                        />
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div className="Border-Black px-2 py-2 mb-3">
                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Effect Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="effectDate"
                        value={formData.effectDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Effect Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="effectAmount"
                        value={formData.effectAmount}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "effectAmount",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "red" }}
                      >
                        Interest Provision Date*
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="interestProvisionDate"
                        value={formData.interestProvisionDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "red" }}
                      >
                        Interest Pro. Amt
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="interestProvisionAmount"
                        value={formData.interestProvisionAmount}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "interestProvisionAmount",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Renewed On
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="effectDate"
                        value={formData.effectDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Closed On
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="closed_on"
                        value={formData.closed_on}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Closed Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="close_amt"
                        value={formData.close_amt}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "close_amt",
                              value: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Interest Paid
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="interestpaid"
                        value={formData.interestpaid}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "interestpaid",
                              value: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Nominee Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="nomineeName"
                      value={formData.nomineeName}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      BirthDate*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="floatingInput"
                      name="nomineeBirthdate"
                      value={formData.nomineeBirthdate}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control no-outline"
                      id="floatingInput"
                      name="age"
                      value={formData.nomineeAge}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Relation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="relation"
                      value={formData.nomineeRelation}
                      // onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Balance
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="balance"
                      value={formData.balance}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9.]/g,
                          ""
                        );
                        handleInputChange({
                          target: { name: "balance", value: numericValue },
                        });
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Deposit Against Loan Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="loan_type"
                      value={formData.loan_type}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Loan Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="Loan_no"
                      value={formData.Loan_no}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9.]/g,
                          ""
                        );
                        handleInputChange({
                          target: { name: "Loan_no", value: numericValue },
                        });
                      }}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Loan Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="Loan_amt"
                      value={formData.Loan_amt}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9.]/g,
                          ""
                        );
                        handleInputChange({
                          target: { name: "Loan_amt", value: numericValue },
                        });
                      }}
                    />
                  </div>
                </div>

                <div class="text-start">
                  <label for="memberId" className="small-label">
                    Introducer No.
                  </label>

                  <div className="row">
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="introducerNo"
                        value={formData.introducerNo}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "introducerNo",
                              value: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="col-sm-1">
                      <input
                        type="text"
                        class="form-control small-label"
                        // placeholder="Enter Member No"

                        min={0}
                      />
                    </div>
                    <div className="col-sm-8 ">
                      <input
                        type="text"
                        id="memberId"
                        name="member_id"
                        class="form-control small-label"
                        // placeholder="Enter Member No"
                        min={0}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="row mt-2 mb-3">
            <div className="col-sm d-flex justify-content-center">
              <button
                type="button"
                className="mt-2 mx-2"
                onClick={handleFormSubmit}
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
                Submit
              </button>
              <Link to="/Home">
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
              </Link>
            </div>
            {/* <></> */}
          </div>
            </div>
          </div>

          {/* <recurring></recurring> */}
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
      </div>
    </>
  );
}
