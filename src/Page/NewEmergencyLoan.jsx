import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";

export default function NewEmergencyLoan() {
  
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
  useEffect(() => {
    // setApplicationDate(getCurrentDate());
    setLoanDate(getCurrentDate());
  }, []);
  const userRole = localStorage.getItem("role_name");
  const [member_id, setMember_Id] = useState();
  const [loan_date, setLoanDate] = useState();
  const [initial, setinitial] = useState("");
  const [name, setName] = useState();
  const [emp_no, setEmp_No] = useState();
  const [member_class, setMember_class] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [installment_period, setinstallment_period] = useState("");
  const [loan_amount, setloan_amount] = useState("");
  const [InterestRate, setInterestRate] = useState("");
  const [due_date, setdue_date] = useState("");
  const [installmentAmount, setinstallmentAmount] = useState("");
  const [first_due_date, setfirst_due_date] = useState("");

  const [coMemberNo, setCoMemberNo] = useState("");
  const [coLoaneeTitle, setCoLoaneeTitle] = useState("");
  const [CoName, setCoName] = useState("");
  const [coEmpCode, setCoEmpCode] = useState("");
  const [comember_class, setCoMember_class] = useState("");

  
  const [meetingNo, setMeetingNo] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [transferFrom, setTransferFrom] = useState("");
  const [oldLoanNo, setOldLoanNo] = useState("");
  const [interestDebited, setInterestDebited] = useState("");
  const [balanceLoan, setBalanceLoan] = useState("");
  const [interest, setInterest] = useState("");
  const [penalty, setPenalty] = useState("");
  const [miscAmount, setMiscAmount] = useState("");
  const [loanNo, setLoanNo] = useState("");
  const [sanctionAmount, setSanctionAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [lastPaidDate, setLastPaidDate] = useState("");
  const [specialRemark, setSpecialRemark] = useState("");

  const handleMemberIdChange = (member_id) => {
    if (member_id === undefined || member_id === "") {
      console.error("Value is undefined or empty");
      setEmp_No("");
      setName("");
      setinitial("");
      setMember_class("");
      setBranchName("");
      setAddress("");
      setCity("");
      setPinCode("");
      setMobileNumber("");
      setBalance("");
      return;
    }

    axios
      .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${member_id}/`)
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const memberData = ress.data.members[0];

          setEmp_No(memberData["emp_no"] || "");
          setName(
            `${memberData["first_name"] || ""} ${
              memberData["middle_name"] || ""
            } ${memberData["last_name"] || ""}`
          );
          setinitial(memberData["initial"] || "");
          setMember_class(memberData["member_class"] || "");
          setBranchName(memberData["branch_name"] || "");
          setBranchName(memberData["branch_name"] || "");
          setAddress(memberData["resident_address"] || "");
          setCity(memberData["resident_city"] || "");
          setPinCode(memberData["resident_pincode"] || "");
          setMobileNumber(memberData["mobile_no"] || "");
          setBalance(memberData["salary"] || "");


        } else {
          console.error("Unexpected response:", ress);
          console.error("Error: Unexpected response format or empty data");
    
          // Display a SweetAlert error when no member is found
          Swal.fire({
            icon: "error",
            title: "Member Not Found",
            text: "No member found with the specified member_id",
            customClass: {
              confirmButton: 'custom-swal-button',
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
    
        // Display a SweetAlert error for network or other errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No member found with the specified member_id.",
          customClass: {
            confirmButton: 'custom-swal-button',
          },
        });
      });

    setMember_Id(member_id);
  };
  useEffect(()=>{
    if(member_id==="")
    {
      // setCoMemberNo("");
      // setGarontor2Id("");
      // setGarontor3Id("");

    }
  },[member_id]);
  const handleColoneeMemberId = (coMemberNo) => {
    // No need for const member_id = e.target?.value; since member_id is already a parameter
    if (coMemberNo === undefined || coMemberNo === "") {
      console.error("Value is undefined or empty");
      setCoEmpCode("");
      setCoName("");
      setCoLoaneeTitle("");
      setCoMember_class("");

      return;
    }

    axios
      .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${coMemberNo}/`)
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const ColoneeData = ress.data.members[0];

          setCoEmpCode(ColoneeData["emp_no"] || "");
          setCoName(
            `${ColoneeData["first_name"] || ""} ${
              ColoneeData["middle_name"] || ""
            } ${ColoneeData["last_name"] || ""}`
          );
          setCoLoaneeTitle(ColoneeData["initial"] || "");
          setCoMember_class(ColoneeData["member_class"] || "");
        } else {
          console.error("Unexpected response:", ress);
          console.error("Error: Unexpected response format or empty data");
        }
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
    
        // Display a SweetAlert error for network or other errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No member found with the specified member_id.",
          customClass: {
            confirmButton: 'custom-swal-button',
          },
        });
      });

    setCoMemberNo(coMemberNo);
  };
  const eligibility = ( loan_amount, installment_period) => {
    const requestData = {
      ac_type: "Emergency Loan",
      member_id: member_id,
      loan_amount: loan_amount,
      installment_period: installment_period,
    };

    if (member_id !== "" && loan_amount !== "" && installment_period !== "") {
      fetch("http://bpcl.kolhapurdakshin.com:8000/loan_eligibility/", {
        method: "POST",
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
          if (data.status === "Not Eligible") {
            Swal.fire({
              icon: "warning",
              title: "Not Eligible",
              text: "This member is not eligible for a loan.",
              didOpen: () => {
                Swal.getPopup().style.borderRadius = "25px";
                const confirmButton = Swal.getConfirmButton();
                confirmButton.classList.add("custom-swal-button");
              },
            });
          } else {
            setdue_date(data.Due_date);
            setInterestRate(data.InterestRate);
            setinstallmentAmount(data.installmentAmount);
            // setMonths_to_retire(data.months_to_retire);
            setfirst_due_date(data.first_Due_date);
            setloan_amount(loan_amount);
            setinstallment_period(installment_period);
        
            // (Code for handling response)
          }
        })
        .catch((error) => {
          console.error("Error checking loan eligibility:", error);
        });
    } else {
      console.log(
        "Please provide valid member_id, loan_amount, and installment_period."
      );
    }
  };
  const handleSubmit = async () => {
    try {
      let temp = [];

      if (coMemberNo !== "") {
        temp.push(coMemberNo);
      }
      const requestData = {
        member_id,
        initial,
        name,
        emp_no,
        member_class,
        branchName,
        address,
        city,
        pinCode,
        mobileNumber,
        coMemberNo,
        coLoaneeTitle,
        CoName,
        coEmpCode,
        comember_class,
         ac_type: "Emergency Loan",
         due_date,
         first_due_date,
         installment_period,
         installmentAmount,
         loan_amount,
         InterestRate,
         loan_date,
         operator: userRole,
         guarantors: temp,
      };
      const response = await axios.post( "http://bpcl.kolhapurdakshin.com:8000/emergency_loan/", requestData);  
      console.log(response.data);
      let jsonData = response.data;
      if (jsonData.success) {
        Swal.fire({
          icon: "success",
          title: "Thank You! ",
          text: `Emergency loan Application Submitted`,
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });

        setMember_Id("");
        setEmp_No("");
        setName("");
        setinitial("");
        setMember_class("");
        setMobileNumber("");
        setinstallment_period("");
        setloan_amount("");
        setInterestRate("");
        setdue_date("");
        setinstallmentAmount("");
        setfirst_due_date("");
        setCoMemberNo("");
        setCoLoaneeTitle("");
        setCoName("");
        setCoEmpCode("");
        setCoMember_class("");
        setAddress("");
        setPinCode("");
        setCity("");
        setBalance("");
        // setSalary("");


      } else if (jsonData.error === "Member must repay at least 25% of the previous loan amount before borrowing again") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Member must repay at least 25% of the previous loan amount before borrowing again",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });

    } else if (jsonData.error === "Installment period must be 12 months for this loan") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Installment period must be 12 months for this loan",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });
    }
 else {
    const errorMessage =
      response.data?.error || "failed to submit data. please try again.";
    console.log(errorMessage);
    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      didOpen: () => {
        Swal.getPopup().style.borderRadius = "25px";
        const confirmButton = Swal.getConfirmButton();
        confirmButton.classList.add("custom-swal-button");
      },
    });
  }
} catch (error) {
  console.log(error);
  Swal.fire({
    title: "Error",
    text: "Failed to submit data. Please try again.",
    icon: "error",
    didOpen: () => {
      Swal.getPopup().style.borderRadius = "25px";
      const confirmButton = Swal.getConfirmButton();
      confirmButton.classList.add("custom-swal-button");
    },
  });
}
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
            <div className="H1-Heading-Main">New Emergency Loan </div>
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
                        id="member_class"
                        name="member_class"
                        placeholder="Class"
                        class="form-control small-label bg-white"
                        readOnly
                        value={member_class}
                        onChange={(e)=>{
                          setMember_class(e.target.value);
                        }}
                        min={0}
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
                        id="member_id"
                        name="member_id"
                        placeholder="Member No"
                        className="form-control small-placeholder"
                        value={member_id}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                          setMember_Id(numericValue);
                          handleMemberIdChange(numericValue);
                          // handleLoanEligibility(e.target.value);
                        }}
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
                        className="form-control small-placeholder bg-white"
                        id="initial"
                        name="initial"
                        placeholder="initial"
                        value={initial}
                        onChange={(e) => {
                          setinitial(e.target.value);
                        }}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text-start">
                    {/* <label htmlFor="name" className="small-label">
                      Name*
                    </label> */}
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        className="form-control small-placeholder bg-white"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        readOnly
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
                          id="emp_no"
                          name="emp_no"
                          placeholder="Emp No"
                          className="form-control small-placeholder bg-white"
                          value={emp_no}
                          onChange={(e) => {
                            setEmp_No(e.target.value);
                          }}
                          readOnly
                          min={0}
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
                        id="comember_class"
                        name="comember_class"
                        placeholder="Class"
                        className="form-control  small-placeholder"
                      value={comember_class}
                        onChange={(e)=>{
                          const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                          setCoMember_class(numericValue);
                        }}
                        min={0}
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
                        placeholder="coMemberNo"
                        className="form-control small-placeholder"
                        value={coMemberNo}
                        onChange={(e) => {
                          setCoMemberNo(e.target.value);
                          handleColoneeMemberId(e.target.value);
                        }}
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
                        placeholder="initial"
                        className="form-control small-placeholder"
                        value={coLoaneeTitle}
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
                        placeholder="CoName"
                        value={CoName}
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
                          placeholder="Emp No"
                          className="form-control small-placeholder"
                          value={coEmpCode}
                          min={0}
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
                        className="form-control bg-white"
                        type="text"
                        name="branchName"
                        value={branchName}
                        onChange={(e)=>{
                          setBranchName(e.target.value);
                        }}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Open Date*
                    </label>
                    <div>
                    <input
                          type="date"
                          className="form-control bg-white"
                          id="loan_date"
                          name="loan_date"
                          readOnly
                          value={loan_date}
                          onChange={(e) => {
                            setLoanDate(e.target.value);
                          }}
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
                        value={meetingNo}
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
                        value={meetingDate}
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
                        className="form-control bg-white"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e)=>{
                          setAddress(e.target.value);
                        }}
                        readOnly
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
                        className="form-control bg-white"
                        id="city"
                        name="city"
                        value={city}
                        onChange={(e)=>{
                          setCity(e.target.value);
                        }}
                        readOnly
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
                        
                        className="form-control bg-white"
                        id="pinCode"
                        name="pinCode"
                        value={pinCode}
                        onChange={(e)=>{
                          setPinCode(e.target.value);
                        }}
                        readOnly
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
                        class="form-control small-placeholder bg-white"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={mobileNumber}
                        readOnly
                        onChange={(e)=>{
                          setMobileNumber(e.target.value);
                        }}
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
                        Transfer Date*
                      </label>
                      <input
                        type="date"
                        id="transferDate"
                        name="transferDate"
                        className="form-control small-placeholder"
                        value={transferDate}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label htmlFor="transferFrom" className="small-label">
                        Transfer From*
                      </label>
                      <select
                        id="transferFrom"
                        name="transferFrom"
                        className="form-control small-placeholder form-select"
                        value={transferFrom}
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
                        Old Loan No.*
                      </label>
                      <input
                        type="text"
                        id="oldLoanNo"
                        name="oldLoanNo"
                        className="form-control small-placeholder"
                        value={oldLoanNo}
                        onChange={(e)=>{
                          setOldLoanNo(e.target.value);
                        }}
                        min={0}
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
                        Interest Debited*
                      </label>
                      <input
                        type="text"
                        id="interestDebited"
                        name="interestDebited"
                        className="form-control small-placeholder"
                        value={interestDebited}
                        onChange={(e)=>{
                          setInterestDebited(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Balance Loan  */}
                <div className="row ">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="balanceLoan" className="small-label">
                        Balance Loan*
                      </label>
                      <input
                        type="text"
                        id="balanceLoan"
                        name="balanceLoan"
                        className="form-control small-placeholder"
                        value={balanceLoan}
                        onChange={(e)=>{
                          const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                          setBalanceLoan(numericValue);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="interest" className="small-label">
                        Interest*
                      </label>
                      <input
                        type="text"
                        id="interest"
                        name="interest"
                        className="form-control small-placeholder"
                        value={interest}
                        onChange={(e)=>{
                          const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                          setInterest(numericValue);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="penalty" className="small-label">
                        Penalty*
                      </label>
                      <input
                        type="text"
                        id="penalty"
                        name="penalty"
                        className="form-control small-placeholder"
                        value={penalty}
                        onChange={(e)=>{
                          setPenalty(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start ">
                    <div className="">
                      <label htmlFor="miscAmount" className="small-label">
                        Misc Amount(₹)*
                      </label>
                      <input
                        type="text"
                        id="miscAmount"
                        name="miscAmount"
                        className="form-control small-placeholder"
                        placeholder="₹"
                        value={miscAmount}
                        onChange={(e)=>{
                          const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                          setMiscAmount(numericValue);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Loan No.*  */}
                <div className="Border-Black px-2 mt-2 pb-2">
                  <div className="row mt-3 mb-3">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start ">
                      <div className="">
                        <label
                          htmlFor="loanNo"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Loan No.
                        </label>
                        <input
                          type="text"
                          id="loanNo"
                          name="loanNo"
                          className="form-control small-placeholder bg-white"
                          value={loanNo}
                          onChange={(e)=>{
                            setLoanNo(e.target.value);
                          }}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start ">
                      <div className="">
                        <label
                          htmlFor="sanctionAmount"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Sanction Amount(₹)*
                        </label>
                        <input
                          type="text"
                          id="sanctionAmount"
                          name="sanctionAmount"
                          placeholder="₹"
                          className="form-control small-placeholder"
                          value={sanctionAmount}
                          onChange={(e)=>{
                            const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                            setSanctionAmount(numericValue);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start ">
                      <div className="">
                        <label
                          htmlFor="loanAmount"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Loan Amount(₹)*
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        // className={(invalid[1])?"form-control small-label border-danger":"form-control small-label"}
                        id="loan_amount"
                        name="loan_amount"
                        placeholder="₹"
                        value={loan_amount}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                          setloan_amount(numericValue);
                          // handleLoanEligibility();
                          eligibility(installment_period,numericValue);
                        }}
                      />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="period"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Period*
                        </label>
                        <input
                        type="text"
                        className="form-control"
                        id="installment_period"
                        name="installment_period"
                        onChange={(e) => {
                          
                          const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                          // handleLoanEligibility();
                          setinstallment_period(numericValue);
                          eligibility(loan_amount, numericValue);
                        }}
                        value={installment_period}
                      />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="LoanDate"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Loan Date*
                        </label>
                        <input
                          type="date"
                          className="form-control bg-white"
                          id="loan_date"
                          name="loan_date"
                          readOnly
                          value={loan_date}
                          onChange={(e) => {
                            setLoanDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="interestRate"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Interest Rate
                        </label>
                        <input
                        type="text"
                        className="form-control  bg-white"
                        id="InterestRate"
                        name="InterestRate"
                        placeholder=""
                        value={InterestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        step={0.01}
                        disabled
                      />
                      </div>
                    </div>
                   
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      {/* Installment */}
                      <div className="">
                        <label
                          htmlFor="loaneeInstallment"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Installment(₹)
                        </label>
                        <input
                        type="text"
                        className="form-control bg-white"
                        id="installmentAmount"
                        name="installmentAmount"
                        placeholder="₹"
                        value={installmentAmount}
                        onChange={(e) => setinstallmentAmount(e.target.value)}
                        disabled
                      />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="first_due_date"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          First Inst. Due Date
                        </label>
                        <input
                          type="date"
                          id="first_due_date"
                          name="first_due_date"
                          className="form-control small-placeholder"
                          value={first_due_date}
                          onChange={(e)=>{
                            setfirst_due_date(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                      <div className="">
                        <label
                          htmlFor="dueDate"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Due Date
                        </label>
                        <input
                          type="date"
                          id="due_date"
                          name="due_date"
                          className="form-control small-placeholder"
                          value={due_date}
                          onChange={(e)=>{
                            setdue_date(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Loan Security value  */}
                <div className="row pt-2">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="balance" className="small-label">
                        Balance(₹)*
                      </label>
                      <input
                        type="text"
                        id="balance"
                        name="balance"
                        placeholder="₹"
                        className="form-control small-placeholder"
                        value={balance}
                        onChange={(e)=>{
                          const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                            setBalance(numericValue);
                          }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  text-start">
                    <div className="">
                      <label htmlFor="lastPaidDate" className="small-label">
                        Last Paid Date*
                      </label>
                      <input
                        type="date"
                        id="lastPaidDate"
                        name="lastPaidDate"
                        className="form-control small-placeholder"
                        value={lastPaidDate}
                        onChange={(e)=>{
                          setLastPaidDate(e.target.value);
                        }}
                      />
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
                        value={specialRemark}
                        onChange={(e)=>{
                          setSpecialRemark(e.target.value);
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
                      onClick={handleSubmit}
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
