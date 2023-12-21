import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";

export default function NewStaffEmergencyLoan() {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad month and day with leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
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
        firstName: "",
        middleName: "",
        lastName: "",
      }));
      return;
    }
    axios
      .get(`http://127.0.0.1:8000/all_memberdata/${memberId}/`)
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const memberData = ress.data.members[0];

          setFormData((prevData) => ({
            ...prevData,
            firstName: memberData["first_name"],
            middleName: memberData["middle_name"],
            lastName: memberData["last_name"],
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
  const [formData, setFormData] = useState({
    StartDate: getCurrentDate(),
    memberNo: 0,
    loaneeTitle: "",
    loanneName: "",
    loaneeEmpCode: "",

    coMemberNo: "",
    coLoaneeTitle: "",
    CoName: "",
    coEmpCode: "",
    branchName: "",
    // StartDate: '',
    meetingNo: "",
    meetingDate: "",
    address: "",
    city: "",
    pinCode: "",
    mobileNumber: "",
    transferDate: "",
    transferFrom: "",
    oldLoanNo: "",
    interestDebited: "",
    balanceLoan: "",
    interest: "",
    penalty: "",
    miscAmount: "",
    recoveryUser: "",

    loanNo: "",
    sanctionAmount: "",
    loanAmount: "",
    loanDate: "",
    interestRate: "",
    period: "",
    loaneeInstallment: "",
    firstInstDueDate: "",
    dueDate: "",

    loanPurpose: "",
    sanctionCommittee: "",
    suretyNumber1: "",
    Surety1: "",
    employeeno: "",
    fieldName1: "",
    SEmpCode1: "",
    suretyNumber2: "",
    S2Member: "",
    Semployeeno2: "",
    fieldName2: "",
    SEmpCode2: "",
    suretyNumber3: "",
    S3Member: "",
    employeeno3: "",
    fieldName3: "",
    SEmpCode3: "",
    suretyNumber4: "",
    S4Member: "",
    employeeno4: "",
    fieldName4: "",
    SEmpCode4: "",
    specialRemark: "",
  });
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
    // if (isAnyFieldEmpty() && !isNotificationShown) {
    //   toast.error("Please fill out all required fields");
    //   isNotificationShown = true;
    //   return;
    // }
    // isNotificationShown = false;

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
          StartDate: getCurrentDate(),
          memberNo: 0,
          loaneeTitle: "",
          loanneName: "",
          loaneeEmpCode: "",

          coMemberNo: "",
          coLoaneeTitle: "",
          CoName: "",
          coEmpCode: "",
          branchName: "",
          // StartDate: '',
          meetingNo: "",
          meetingDate: "",
          address: "",
          city: "",
          pinCode: "",
          mobileNumber: "",
          transferDate: "",
          transferFrom: "",
          oldLoanNo: "",
          interestDebited: "",
          balanceLoan: "",
          interest: "",
          penalty: "",
          miscAmount: "",
          recoveryUser: "",
          loanNo: "",
          sanctionAmount: "",
          loanAmount: "",
          loanDate: "",
          interestRate: "",
          periodInstallment: "",
          firstInstDueDate: "",
          dueDate: "",

          loanPurpose: "",
          sanctionCommittee: "",
          suretyNumber1: "",
          Surety1: "",
          employeeno: "",
          fieldName1: "",
          SEmpCode1: "",
          suretyNumber2: "",
          S2Member: "",
          employeeno2: "",
          fieldName2: "",
          SEmpCode2: "",
          suretyNumber3: "",
          S3Member: "",
          employeeno3: "",
          fieldName3: "",
          SEmpCode3: "",
          suretyNumber4: "",
          S4Member: "",
          employeeno4: "",
          fieldName4: "",
          SEmpCode4: "",
          specialRemark: "",
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
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">New Staff Emergency Loan</div>
          </div>
          <div className="container ">
            <div className="row First-Main-Row  pt-2 mb-1">
              <form>
                {/* Loanee  */}
                <div className="row">
                  <div className="col-xl col-lg col-md-2 col-sm-2 text-start">
                    <div class="mt-2 mb-1">
                      <label for="" className="" style={{ color: "red" }}>
                        Loanee
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-1 col-md-4 col-sm-6 text-start">
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        id=""
                        name=""
                        className="form-control  small-placeholder"
                        placeholder="A"
                        min={0}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md-4 col-sm-6 col-6 text-start">
                    {/* <label htmlFor="memberNo" className="small-label">
                      Member No.
                    </label> */}
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        id="memberNo"
                        name="memberNo"
                        // placeholder="Member No"
                        className="form-control small-placeholder"
                        value={formData.memberNo}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only numeric values (no decimal points)
                          handleInputChange({
                            target: { name: "memberNo", value: numericValue },
                          });
                        }}
                        min={0}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 text-start">
                    {/* <label htmlFor="loaneeTitle" className="small-label">
                      Loanee Title*
                    </label> */}
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="loaneeTitle"
                        name="loaneeTitle"
                        value={formData.loaneeTitle}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          ); // Allow only alphabetical characters
                          handleInputChange({
                            target: {
                              name: "loaneeTitle",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text-start">
                    {/* <label htmlFor="loanneName" className="small-label">
                      Name*
                    </label> */}
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="loanneName"
                        name="loanneName"
                        value={formData.loanneName}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          ); // Allow only alphabetical characters
                          handleInputChange({
                            target: {
                              name: "loanneName",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 text-start">
                    <div className="">
                      {/* <label htmlFor="loaneeEmpCode" className="small-label">
                        Emp Code*
                      </label> */}
                      <div class="mt-2 mb-1">
                        <input
                          type="text"
                          id="loaneeEmpCode"
                          name="loaneeEmpCode"
                          className="form-control small-placeholder"
                          value={formData.loaneeEmpCode}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "loaneeEmpCode",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Co-loanee  */}
                <div className="row mb-2">
                  <div className="col-xl col-lg col-md-2 col-sm-2 text-start">
                    <div class="mt-2">
                      <label for="" className="" style={{ color: "red" }}>
                        Co-Loanee
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-1 col-md-4 col-sm-6 text-start">
                    <div class="mt-2">
                      <input
                        type="text"
                        id="memberId"
                        name="member_id"
                        className="form-control  small-placeholder"
                        placeholder="A"
                        min={0}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md-4 col-sm-6 col-6 text-start">
                    {/* <label htmlFor="coMemberNo" className="small-label">
                      Member No.
                    </label> */}
                    <div className="mt-2">
                      <input
                        type="text"
                        id="coMemberNo"
                        name="coMemberNo"
                        className="form-control small-placeholder"
                        value={formData.coMemberNo}
                        onChange={(e) => {
                          const numericValue =
                            parseInt(e.target.value, 10) || ""; // Parse as integer or set to an empty string if not a valid number
                          handleInputChange({
                            target: {
                              name: "coMemberNo",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                        // required
                        style={{
                          appearance: "textfield",
                          MozAppearance: "textfield",
                        }} // Hides arrows in Firefox
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-3 text-start">
                    {/* <label htmlFor="coLoaneeTitle" className="small-label">
                      Title*
                    </label> */}
                    <div className="mt-2">
                      <input
                        type="text"
                        id="coLoaneeTitle"
                        name="coLoaneeTitle"
                        className="form-control small-placeholder"
                        value={formData.coLoaneeTitle}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "coLoaneeTitle",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text-start">
                    {/* <label htmlFor="CoName" className="small-label">
                      Name*
                    </label> */}
                    <div className="mt-2">
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="CoName"
                        name="CoName"
                        value={formData.CoName}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "CoName", value: alphabeticValue },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 text-start">
                    <div className="mt-2">
                      {/* <label htmlFor="coEmpCode" className="small-label">
                        Emp Code*
                      </label> */}
                      <div className="mt-2">
                        <input
                          type="text"
                          id="coEmpCode"
                          name="coEmpCode"
                          className="form-control small-placeholder"
                          value={formData.coEmpCode}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "coEmpCode",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Branch  */}
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="">
                      Branch Name
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        // id="floatingInput"
                        // placeholder="name@example.com"
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        // onChange={handleInputChange}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "branchName",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Open Date
                    </label>
                    <div>
                      <input
                        type="date"
                        className="form-control small-label"
                        id="floatingInput"
                        name="StartDate"
                        value={formData.StartDate}
                        //   onChange={(e) => {
                        //     handleInputChangeFor(
                        //       formData.MonthlyDeposit,
                        //       formData.InterestRate,
                        //       formData.deposit_period,
                        //       e.target.value
                        //     );
                        //   }}
                        min={getCurrentDate()}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <div className="">
                      <label htmlFor="meetingNo" className="small-label">
                        Meeting No
                      </label>
                      <input
                        type="text"
                        id="meetingNo"
                        name="meetingNo"
                        className="form-control small-placeholder"
                        value={formData.meetingNo}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "meetingNo",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label htmlFor="meetingDate" className="small-label">
                        Meeting Date
                      </label>
                      <input
                        type="date"
                        id="meetingDate"
                        name="meetingDate"
                        className="form-control small-placeholder"
                        value={formData.meetingDate}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "meetingDate",
                              value: e.target.value,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                </div>

                {/* Address  */}
                <div className="row mb-2">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="address" className="small-label">
                      Address
                    </label>
                    <div className="mb-1">
                      <textarea
                        type="text-area"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="city" className="small-label">
                      City
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="pinCode" className="small-label">
                      Pin Code
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        maxLength="6"
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "pinCode",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="mobileNumber" className="small-label">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        class="form-control small-placeholder"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        maxLength="10"
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "mobileNumber",
                              value: numericValue,
                            },
                          });
                        }}
                        // placeholder="Enter Mobile Number"
                        // required
                      />
                    </div>
                  </div>
                </div>
                {/* Transfer DAte  */}
                <div className="row">
                  <div
                    className="text-start"
                    style={{ fontWeight: "bold", color: "red" }}
                  >
                    Loan Transfer Details, change it if Loan is transfered from
                    any other Branch
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <div className="">
                      <label htmlFor="transferDate" className="small-label">
                        Transfer Date
                      </label>
                      <input
                        type="date"
                        id="transferDate"
                        name="transferDate"
                        className="form-control small-placeholder"
                        value={formData.transferDate}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "transferDate",
                              value: e.target.value,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label htmlFor="transferFrom" className="small-label">
                        Transfer From
                      </label>
                      <select
                        id="transferFrom"
                        name="transferFrom"
                        className="form-control small-placeholder form-select"
                        value={formData.transferFrom}
                        onChange={handleInputChange}
                        // required
                      >
                        {/* Add options for the select dropdown based on your requirements */}
                        <option value="">Select Transfer From</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <div className="">
                      <label htmlFor="oldLoanNo" className="small-label">
                        Old Loan No.
                      </label>
                      <input
                        type="text"
                        id="oldLoanNo"
                        name="oldLoanNo"
                        className="form-control small-placeholder"
                        value={formData.oldLoanNo}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "oldLoanNo",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label
                        htmlFor="interestDebited"
                        className="small-label"
                        style={{ color: "red" }}
                      >
                        Interest Debited
                      </label>
                      <input
                        type="text"
                        id="interestDebited"
                        name="interestDebited"
                        className="form-control small-placeholder"
                        value={formData.interestDebited}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "interestDebited",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                </div>

                {/* Balance Loan  */}
                <div className="row ">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="balanceLoan" className="small-label">
                        Balance Loan
                      </label>
                      <input
                        type="text"
                        id="balanceLoan"
                        name="balanceLoan"
                        className="form-control small-placeholder"
                        value={formData.balanceLoan}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "balanceLoan",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="interest" className="small-label">
                        Interest
                      </label>
                      <input
                        type="text"
                        id="interest"
                        name="interest"
                        className="form-control small-placeholder"
                        value={formData.interest}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "interest", value: numericValue },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="penalty" className="small-label">
                        Penalty
                      </label>
                      <input
                        type="text"
                        id="penalty"
                        name="penalty"
                        className="form-control small-placeholder"
                        value={formData.penalty}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "penalty", value: numericValue },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start ">
                    <div className="">
                      <label htmlFor="miscAmount" className="small-label">
                        Misc Amount (₹)
                      </label>
                      <input
                        type="text"
                        id="miscAmount"
                        name="miscAmount"
                        className="form-control small-placeholder"
                        placeholder="₹"
                        value={formData.miscAmount}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "miscAmount", value: numericValue },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                </div>

                {/* Loan No.*  */}
                <div className="Border-Black px-2 mt-3 pb-2">
                  <div className="row mt-3 mb-3">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start ">
                      <div className="">
                        <label
                          htmlFor="loanNo"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Loan No.
                        </label>
                        <input
                          type="text"
                          id="loanNo"
                          name="loanNo"
                          className="form-control small-placeholder"
                          value={formData.loanNo}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "loanNo", value: numericValue },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start ">
                      <div className="">
                        <label
                          htmlFor="sanctionAmount"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Sanction Amount(₹)
                        </label>
                        <input
                          type="text"
                          id="sanctionAmount"
                          name="sanctionAmount"
                          placeholder="₹"
                          className="form-control small-placeholder"
                          value={formData.sanctionAmount}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "sanctionAmount",
                                value: numericValue,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start ">
                      <div className="">
                        <label
                          htmlFor="loanAmount"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Loan Amount(₹)
                        </label>
                        <input
                          type="text"
                          id="loanAmount"
                          name="loanAmount"
                          placeholder="₹"
                          className="form-control small-placeholder"
                          value={formData.loanAmount}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "loanAmount",
                                value: numericValue,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="loanDate"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Loan Date
                        </label>
                        <input
                          type="date"
                          id="loanDate"
                          name="loanDate"
                          className="form-control small-placeholder"
                          value={formData.loanDate}
                          onChange={(e) => {
                            handleInputChange({
                              target: {
                                name: "loanDate",
                                value: e.target.value,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="interestRate"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Interest Rate
                        </label>
                        <input
                          type="text"
                          id="interestRate"
                          name="interestRate"
                          className="form-control small-placeholder"
                          value={formData.interestRate}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "interestRate",
                                value: numericValue,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="period"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          No. of Inst
                        </label>
                        <input
                          type="text"
                          id="period"
                          name="period"
                          className="form-control small-placeholder"
                          value={formData.period}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "period",
                                value: numericValue,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg col-md-6 col-sm-6 text-start">
                      {/* Installment */}
                      <div className="">
                        <label
                          htmlFor="loaneeInstallment"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Installment (₹)
                        </label>
                        <input
                          type="text"
                          id="loaneeInstallment"
                          name="loaneeInstallment"
                          placeholder="₹"
                          className="form-control small-placeholder"
                          value={formData.loaneeInstallment}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "loaneeInstallment",
                                value: numericValue,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="firstInstDueDate"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          First Inst. Due Date
                        </label>
                        <input
                          type="date"
                          id="firstInstDueDate"
                          name="firstInstDueDate"
                          className="form-control small-placeholder"
                          value={formData.firstInstDueDate}
                          onChange={(e) => {
                            handleInputChange({
                              target: {
                                name: "firstInstDueDate",
                                value: e.target.value,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="dueDate"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Due Date
                        </label>
                        <input
                          type="date"
                          id="dueDate"
                          name="dueDate"
                          className="form-control small-placeholder"
                          value={formData.dueDate}
                          onChange={(e) => {
                            handleInputChange({
                              target: {
                                name: "dueDate",
                                value: e.target.value,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Loan Security value  */}
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="balance" className="small-label">
                        Balance(₹)
                      </label>
                      <input
                        type="text"
                        id="balance"
                        name="balance"
                        placeholder="₹"
                        className="form-control small-placeholder"
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
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="lastPaidDate" className="small-label">
                        Last Paid Date
                      </label>
                      <input
                        type="date"
                        id="lastPaidDate"
                        name="lastPaidDate"
                        className="form-control small-placeholder"
                        value={formData.lastPaidDate}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "lastPaidDate",
                              value: e.target.value,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                </div>

                <div className="Border-Black px-2 mt-3 pb-2">
                  <div className="H2-Sub-Heading mt-2 ">SURETY</div>

                  {/* No.1 Section */}
                  <div className="row">
                    <div className="col-xl-1 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="suretyNumber1" className="small-label">
                        No.1
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="suretyNumber1"
                          name="suretyNumber1"
                          value={formData.suretyNumber1}
                          className="form-control small-placeholder"
                          placeholder="A"
                          min={0}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "suretyNumber1",
                                value: numericValue,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="Surety1" className="small-label">
                        Member No
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="Surety1"
                          name="Surety1"
                          value={formData.Surety1}
                          className="form-control small-placeholder"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Allow only numeric values
                            handleInputChange({
                              target: {
                                name: "Surety1",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="employeeno"
                        className="small-label"
                      ></label>
                      <input
                        type="text"
                        name="employeeno"
                        className="form-control small-placeholder"
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
                        // required
                      />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-start">
                      <label htmlFor="fieldName1" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="fieldName1"
                        name="fieldName1"
                        value={formData.fieldName1}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          ); // Allow only alphabetical characters
                          handleInputChange({
                            target: {
                              name: "fieldName1",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label htmlFor="SEmpCode1" className="small-label">
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="SEmpCode1"
                          name="SEmpCode1"
                          value={formData.SEmpCode1}
                          className="form-control small-placeholder"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "SEmpCode1",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                  </div>

                  {/* No.2 Section */}
                  <div className="row">
                    <div className="col-xl-1 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="suretyNumber2" className="small-label">
                        No.2
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="suretyNumber2"
                          name="suretyNumber2"
                          className="form-control small-placeholder"
                          placeholder="A"
                          min={0}
                          value={formData.suretyNumber2}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "suretyNumber2",
                                value: numericValue,
                              },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="S2Member" className="small-label">
                        Member No
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="S2Member"
                          name="S2Member"
                          value={formData.S2Member}
                          className="form-control small-placeholder"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "S2Member",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="Semployeeno2"
                        className="small-label"
                      ></label>
                      <input
                        type="text"
                        id="Semployeeno2"
                        name="Semployeeno2"
                        className="form-control small-placeholder"
                        value={formData.Semployeeno2}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "Semployeeno2",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                        // required
                      />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-start">
                      <label htmlFor="fieldName2" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="fieldName2"
                        name="fieldName2"
                        value={formData.fieldName2}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          ); // Allow only alphabetical characters
                          handleInputChange({
                            target: {
                              name: "fieldName2",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label htmlFor="SEmpCode2" className="small-label">
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="SEmpCode2"
                          name="SEmpCode2"
                          value={formData.SEmpCode2}
                          className="form-control small-placeholder"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "SEmpCode2",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                  {/* No.3 Section */}
                  <div className="row">
                    <div className="col-xl-1 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="suretyNumber3" className="small-label">
                        No.3
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="suretyNumber3"
                          name="suretyNumber3"
                          className="form-control small-placeholder"
                          placeholder="A"
                          min={0}
                          value={formData.suretyNumber3}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "suretyNumber3",
                                value: numericValue,
                              },
                            });
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="S3Member" className="small-label">
                        Member No
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="S3Member"
                          name="S3Member"
                          value={formData.S3Member}
                          className="form-control small-placeholder"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "S3Member",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="employeeno3"
                        className="small-label"
                      ></label>
                      <input
                        type="text"
                        id="employeeno3"
                        name="employeeno3"
                        className="form-control small-placeholder"
                        value={formData.employeeno3}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "employeeno3",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                        // required
                      />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-start">
                      <label htmlFor="fieldName3" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="fieldName3"
                        name="fieldName3"
                        value={formData.fieldName3}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          ); // Allow only alphabetical characters
                          handleInputChange({
                            target: {
                              name: "fieldName3",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label htmlFor="SEmpCode3" className="small-label">
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="SEmpCode3"
                          name="SEmpCode3"
                          value={formData.SEmpCode3}
                          className="form-control small-placeholder"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "SEmpCode3",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                  </div>

                  {/* No.4 Section */}
                  <div className="row">
                    <div className="col-xl-1 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="suretyNumber4" className="small-label">
                        No.4
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="suretyNumber4"
                          name="suretyNumber4"
                          value={formData.suretyNumber4}
                          className="form-control small-placeholder"
                          placeholder="A"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "suretyNumber4",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="S4Member" className="small-label">
                        Member No
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="S4Member"
                          name="S4Member"
                          value={formData.S4Member}
                          className="form-control small-placeholder"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "S4Member",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="employeeno4"
                        className="small-label"
                      ></label>
                      <input
                        type="text"
                        id="employeeno4"
                        name="employeeno4"
                        className="form-control small-placeholder"
                        value={formData.employeeno4}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "employeeno4",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                        // required
                      />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-start">
                      <label htmlFor="fieldName4" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="fieldName4"
                        name="fieldName4"
                        value={formData.fieldName4}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          ); // Allow only alphabetical characters
                          handleInputChange({
                            target: {
                              name: "fieldName4",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label htmlFor="SEmpCode4" className="small-label">
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="SEmpCode4"
                          name="SEmpCode4"
                          value={formData.SEmpCode4}
                          className="form-control small-placeholder"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "SEmpCode4",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Remark  */}
                <div className="row">
                  <div className="H2-Sub-Heading mt-2 ">Introduce By :</div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-start">
                    <div className="">
                      <label htmlFor="specialRemark" className="small-label">
                        Special Remark
                      </label>
                      <textarea
                        id="specialRemark"
                        name="specialRemark"
                        className="form-control"
                        rows="3"
                        value={formData.specialRemark}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "specialRemark",
                              value: e.target.value,
                            },
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row mt-2 mb-2">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
