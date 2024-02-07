import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";

export default function ViewCashCertificate() {
  const [depositData, setDepositData] = useState([]);
  const [memberId, setMemberId] = useState("");
  let [acNo, setAcNo] = useState("");

  const handleAccountNumberChange = async (newRDID, type) => {
    let rd = "";
    let mId = "";

    if (!newRDID) {
      setDepositData("");
      setMemberId("");
      setAcNo("");

      return;
    }

    if (type === "accountNo") {
      rd = newRDID;
    }
    if (type === "memberNo") {
      mId = newRDID;
    }

    const data = {
      RDID: rd,
      member_id: mId,
      Account_type: "Cash Certificate",
    };

    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/rd_detail/",
        data
      );
      const jsonData = response.data;
      setDepositData(jsonData.result_set[0]);
      setMemberId(jsonData.result_set[0].member_id);
      setAcNo(jsonData.result_set[0].RDID);
      console.log(depositData);
    } catch (error) {
      // Swal.fire({
      //   title: "error",
      //   text: "Please Enter valid Account Number",
      //   icon: "error",
      //   didOpen: () => {
      //     Swal.getPopup().style.borderRadius = "25px";
      //     const confirmButton = Swal.getConfirmButton();
      //     confirmButton.classList.add("custom-swal-button");
      //   },
      // });
      console.error("modal save error:", error);
    }
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
            <div className="H1-Heading-Main">View Cash Certificate Deposit</div>
          </div>
          <div className="container">
            <div className="row First-Main-Row  pt-3 mb-1">
              <form>
                <div className="H2-Sub-Heading ">Basic Information</div>
                <div className="row mt-1 mb-1">
                <div className="col-xl-1 col-lg-1 col-md-6 col-sm-6 text-start">
                    <div className="mt-4">
                      <input
                        type="text"
                        id="member_class"
                        name="member_class"
                        class="form-control small-label"
                        readOnly
                        value={depositData && depositData.member_class}
                            disabled
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md col-sm-6 text-start">
                    <label for="memberId" className="small-label">
                      Member No*
                    </label>
                    <div class="">
                    <input
                            type="text"
                            id="member_id"
                            name="member_id"
                            className="form-control small-placeholder"
                            value={memberId} // Use memberId state for the input value
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(
                                /\D/g,
                                ""
                              );
                              setMemberId(numericValue);
                              handleAccountNumberChange(
                                numericValue,
                                "memberNo"
                              );
                            }}
                            maxLength={20}
                          />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md-6 col-sm-6 text-start">
                    <div class=" ">
                      <label for="employeeno" className="small-label">
                        Employee No
                      </label>
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label "
                        value={depositData && depositData.emp_no}
                        min={0}

                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="accountNumber" className="small-label">
                        Account No
                      </label>
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="accountNumber"
                        name="accountNumber"
                        value={acNo}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          setAcNo(numericValue);
                          handleAccountNumberChange(numericValue, "accountNo");
                        }}
                        maxLength={20}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md-6 col-sm-6 text-start">
                    <div className="no-outline-login">
                      <label htmlFor="certificate_no" className="small-label">
                        Certificate Number
                      </label>
                      <input
                        type="text"
                        className="form-control small-label"
                        id="certificate_no"
                        name="certificate_no"
                        // value={formData.certificate_no}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                       
                        }}
                        min={0}
                        readOnly
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
                      value={depositData && depositData.initial}
                      className="form-control small-label "
                      readOnly
                   
                    ></input>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="firstName" className="small-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        class="form-control small-label "
                        id="firstName"
                        value={depositData && depositData.first_name}
                        readOnly
                       
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="middleName" className="small-label">
                      Middle Name
                    </label>
                    <div>
                      <input
                        type="text"
                        name="middleName"
                        className="form-control small-label "
                        value={depositData && depositData.middle_name}
                        readOnly
                       
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="lastName" className="small-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        class="form-control small-label "
                        id="lastName"
                        value={depositData && depositData.last_name}
                        readOnly
                       
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="row">
                      <div className="col-sm-8">
                        <label for="birthDate" className="small-label">
                          BirthDate
                        </label>
                        <input
                          type="date"
                          class="form-control small-label "
                          id="birthDate"
                          name="birthDate"
                          value={depositData && depositData.birth_date}
                          readOnly
                        />
                      </div>
                      <div className="col-sm-4">
                      <label for="" className="small-label">
                        Age
                      </label>
                      <input
                        type="text"
                        class="form-control small-label "
                        id="age"
                        minLength={2}
                        maxLength={2}
                        name="memberAge"
                        value={depositData && depositData.age}
                        readOnly
                      />
                      </div>

                     
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
                      <input
                        type="text"
                        name="title"
                        class="form-control  small-label"
                        disabled
                      />
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
                        name="firstName"
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        class="form-control small-placeholder"
                        disabled
                        min={0}
                      />
                    </div>
                  </div>
                </div>
                {/* Joinee 2 */}
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Title
                    </label>
                    <input
                      name="title"
                 
                      className=" form-control small-placeholder"
                      disabled
                    />
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
                      disabled
               
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
                      disabled
                   
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
                      disabled
                 
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
                      disabled
               
                    />
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      class="form-control small-placeholder"
                      disabled
                      min={0}
                    />
                  </div>
                </div>

                <div className="H2-Sub-Heading pt-3">Address Details</div>
                {/* Address Details */}
                <div className="row mb-2">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label htmlFor="address" className="small-label">
                      Address
                    </label>
                    <div className="mb-1">
                      <input
                        type="text-area"
                        className="form-control"
                        id="address"
                        name="address"
                        value={depositData && depositData.nativeplace_address}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="city" className="small-label">
                      City
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={depositData && depositData.nativeplace_city}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="pinCode" className="small-label">
                      Pin Code
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="pinCode"
                        name="pinCode"
                        value={depositData && depositData.nativeplace_pincode}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label htmlFor="autoRenewal" className="small-label">
                        A/c Auto Renewal
                      </label>
                      <input
                        className="form-control small-label"
                        id="autoRenewal"
                        name="autoRenewalOption"
                        disabled
                      ></input>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="mobileNumber" className="small-label">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        class="form-control small-placeholder"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={depositData && depositData.mobile_no}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="H2-Sub-Heading pt-2 mb-3">
                  Member Bank Account Details
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label
                      className="small-label"
                      htmlFor="accountOpeningType"
                      style={{ color: "red" }}
                    >
                      Account Opening Type
                    </label>
                    <div className="">
                      <input
                        className="form-control  small-label"
                        id="accountOpeningType"
                        name="accountOpeningType"
                        disabled
                      />
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
                      <input
                        className="form-control  small-label"
                        id="depositorCategory"
                        name="depositorCategory"
                        disabled
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
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        min={0}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="panNo" className="small-label">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        class="form-control small-placeholder"
                        id="panNo"
                        name="panNo"
                        value={depositData && depositData.pan_no}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank Name
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        name="bankName"
                        value={depositData && depositData.bank_name}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank A/c No
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="bankAcNo"
                        value={depositData && depositData.bank_ac_no}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Branch Name
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        name="branchName"
                        value={depositData && depositData.branch_name}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      IFSC CODE
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="rName"
                        value={depositData && depositData.IFSC_code}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      MICR Code
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        value={depositData && depositData.MICR_no}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start mb-3">
                    <label className="small-label" htmlFor="floatingInput">
                      UID No
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="uidNo"
                        disabled
                      />
                    </div>
                  </div>
                </div>

              
                <div className="Border-Black mt-1 mb-2 px-2">
                  <div className="row pt-1">
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
                          value={depositData && depositData.StartDate}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Installment Amount
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label"
                          id="floatingInput"
                          name="MonthlyDeposit"
                          value={depositData && depositData.MonthlyDeposit}
                          min={0}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Deposit Period
                      </label>
                      <div>
                        <div className="row">
                          <div className="col-sm-6 mb-2">
                            <input
                              className="form-control small-label  small-label"
                              id="floatingInput"
                              name="deposit_period"
                              value={depositData && depositData.deposit_period}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6">
                            <label
                              className="form-control small-label Background-color-text"
                              id="floatingInput"
                              style={{ width: "100%" }}
                              aria-disabled
                            >
                              Months
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Interest Rate
                      </label>
                      <div>
                        <input
                          type="text"
                          step={0.01}
                          className="form-control small-label"
                          id="floatingInput"
                          name="InterestRate"
                          value={depositData && depositData.InterestRate}
                          min={0}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Maturity On
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label"
                          id="floatingInput"
                          name="maturityOn"
                          value={depositData && depositData.EndDate}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Maturity Amount
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label"
                          id="floatingInput"
                          name="MaturityAmt"
                          value={depositData && depositData.MaturityAmt}
                          disabled
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Interest Amount
                      </label>
                      <div>
                        <input
                          type="text"
                          step={0.01}
                          className="form-control small-label"
                          id="floatingInput"
                          name="interestAmount"
                          value={depositData && depositData.InterestAmt}
                          min={0}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Paid Date
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label"
                          id="floatingInput"
                          name="paidDate"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Border-Black px-2 py-2 mb-3">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Effect Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="effectDate"
                        value={depositData && depositData.StartDate}
                        disabled
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Effect Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="effectAmount"
                        value={depositData && depositData.MonthlyDeposit}
                        disabled
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "#ffc109" }}
                      >
                        Interest Provision Date*
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="interestProvisionDate"
                        disabled
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "#ffc109" }}
                      >
                        Interest Pro. Amt
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="interestProvisionAmount"
                        min={0}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Renewed On
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="effectDate"
                        disabled
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
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
                        name="effectAmount"
                        disabled
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
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
                        name="closedAmount"
                        disabled
            
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
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
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Nominee Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="nomineeName"
                      value={depositData && depositData.nominee_name}
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      BirthDate
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="floatingInput"
                      name="nomineeBirthdate"
                      value={depositData && depositData.nominee_birthdate}
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control no-outline"
                      id="floatingInput"
                      name="age"
                      value={depositData && depositData.nominee_age}
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Relation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="relation"
                      value={depositData && depositData.relation}
                      disabled
                    />
                  </div>
                </div>
                <div className="row mb-3" >
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
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
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Deposit Ag Loan Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="type"
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
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
                      name="number"
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
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
                      name="amount"
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
