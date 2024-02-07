import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "../Style/Global_Classes.css";
// import "../Style/Global_Classes.scss";
export default function MediumTermLoan() {
  const userRole = localStorage.getItem("role_name");
  const [member_id, setMember_Id] = useState();
  const [emp_no, setEmp_No] = useState();
  const [name, setName] = useState();
  const [member_class, setMember_class] = useState("");
  const [salary, setSalary] = useState("");
  const [MICR_no, setMICR_no] = useState("");
  const [applicationdate, setApplicationDate] = useState();
  const [application_amount, setApplicationAmount] = useState();
  const [loanNo, setLoanNo] = useState();
  const [loan_date, setLoanDate] = useState();

  const [garontor1Id, setGarontor1Id] = useState("");
  const [garontor1EmpCode, setGarontor1EmpCode] = useState("");
  const [garontor1FullName, setGarontor1FullName] = useState("");
  const [garontor1Member_C, setGarontor1Member_C] = useState("");

  const [garontor2Id, setGarontor2Id] = useState("");
  const [garontor2EmpCode, setGarontor2EmpCode] = useState("");
  const [garontor2FullName, setGarontor2FullName] = useState("");
  const [garontor2Member_C, setGarontor2Member_C] = useState("");

  const [garontor3Id, setGarontor3Id] = useState("");
  const [garontor3EmpCode, setGarontor3EmpCode] = useState("");
  const [garontor3FullName, setGarontor3FullName] = useState("");
  const [garontor3Member_C, setGarontor3Member_C] = useState("");

  const [due_date, setdue_date] = useState("");
  const [first_due_date, setfirst_due_date] = useState("");
  const [installment_period, setinstallment_period] = useState("");
  const [installmentAmount, setinstallmentAmount] = useState("");
  const [loan_amount, setloan_amount] = useState("");
  const [InterestRate, setInterestRate] = useState("");
  const [months_to_retire, setMonths_to_retire] = useState("");
  const [bondno, setBondNo] = useState("");
  const [deduction, setDeduction] = useState("");
  const [cash, setcash] = useState("");
  const [bank, setbank] = useState("");
  const [transfer, settransfer] = useState("");
  const [operator, setOperator] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [remark, setRemark] = useState([]);

  const handleMemberIdChange = (member_id) => {
    if (member_id === undefined || member_id === "") {
      console.error("Value is undefined or empty");
      setEmp_No("");
      setName("");
      setMember_class("");
      setSalary("");
      setMICR_no("");
      setMember_Id(""); // Assuming you also want to clear the Member_Id state when it's empty
  
      return;
    }
  
    axios
    .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${member_id}/`)
    .then((ress) => {
      if (ress.data.members && ress.data.members.length > 0) {
        const memberData = ress.data.members[0];
  
        setEmp_No(memberData["emp_no"] || "");
        setName(
          `${memberData["first_name"] || ""} ${memberData["middle_name"] || ""} ${memberData["last_name"] || ""}`
        );
        setSalary(memberData["salary"] || "");
        setMICR_no(memberData["MICR_no"] || "");
        setMember_class(memberData["member_class"] || "");
        setMember_Id(member_id); // Set Member_Id after successful fetch
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
  
  };
  
  
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    setApplicationDate(getCurrentDate());
    setLoanDate(getCurrentDate());
  }, []);

  useEffect(() => {
    if (member_id === "") {
      setGarontor1Id("");
      setGarontor2Id("");
      setGarontor3Id("");
    }
  }, [member_id]);

  const handleGuarantor1IdChange = (guarantor1Id) => {
    if (guarantor1Id === undefined || guarantor1Id === "") {
      console.error("Guarantor ID is undefined or empty");
      setGarontor1EmpCode("");
      setGarontor1FullName("");
      setGarontor1Member_C("");
      return;
    }

    axios
      .get(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${guarantor1Id}/`
      )
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const guarantorData = ress.data.members[0];

          setGarontor1EmpCode(guarantorData["emp_no"] || "");
          setGarontor1FullName(
            `${guarantorData["first_name"] || ""} ${
              guarantorData["middle_name"] || ""
            } ${guarantorData["last_name"] || ""}`
          );
          setGarontor1Member_C(guarantorData["member_class"] || "");

          // ... (set other guarantor fields based on API response)
        } else {
          console.error("Unexpected response:", ress);
          console.error("Error: Unexpected response format or empty data");
        }
      })
      .catch((error) => {
        console.error("Error fetching guarantor data:", error);
      });

    setGarontor1Id(guarantor1Id);
  };
  const handleGuarantor2IdChange = (guarantor2Id) => {
    if (guarantor2Id === undefined || guarantor2Id === "") {
      console.error("Guarantor 2 ID is undefined or empty");
      setGarontor2EmpCode("");
      setGarontor2FullName("");
      setGarontor2Member_C("");

      return;
    }

    axios
      .get(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${guarantor2Id}/`
      )
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const guarantorData = ress.data.members[0];

          setGarontor2EmpCode(guarantorData["emp_no"] || "");
          setGarontor2FullName(
            `${guarantorData["first_name"] || ""} ${
              guarantorData["middle_name"] || ""
            } ${guarantorData["last_name"] || ""}`
          );
          setGarontor2Member_C(guarantorData["member_class"] || "");
          // setGarontor2Member_C("");
          // ... (set other guarantor 2 fields based on API response)
        } else {
          console.error("Unexpected response:", ress);
          console.error("Error: Unexpected response format or empty data");
        }
      })
      .catch((error) => {
        console.error("Error fetching guarantor 2 data:", error);
      });

    setGarontor2Id(guarantor2Id);
  };
  const handleGuarantor3IdChange = (garontor3Id) => {
    if (garontor3Id === undefined || garontor3Id === "") {
      console.error("Guarantor 3 ID is undefined or empty");
      setGarontor3EmpCode("");
      setGarontor3FullName("");
      setGarontor3Member_C("");

      return;
    }
    axios
      .get(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${garontor3Id}/`
      )
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const guarantorData = ress.data.members[0];

          setGarontor3EmpCode(guarantorData["emp_no"] || "");
          setGarontor3FullName(
            `${guarantorData["first_name"] || ""} ${
              guarantorData["middle_name"] || ""
            } ${guarantorData["last_name"] || ""}`
          );
          setGarontor3Member_C(guarantorData["member_class"] || "");

          // ... (set other guarantor 2 fields based on API response)
        } else {
          console.error("Unexpected response:", ress);
          console.error("Error: Unexpected response format or empty data");
        }
      })
      .catch((error) => {
        console.error("Error fetching guarantor 2 data:", error);
      });

    setGarontor3Id(garontor3Id);
  };

  const eligibility = (loan_amount, installment_period) => {
    const requestData = {
      member_id: member_id,
      loan_amount: loan_amount,
      installment_period: installment_period,
      ac_type:"Medium Term Loan",
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
            setMonths_to_retire(data.months_to_retire);
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

      if (garontor1Id !== "") {
        temp.push(garontor1Id);
      }
      if (garontor2Id !== "") {
        temp.push(garontor2Id);
      }
      if (garontor3Id !== "") {
        temp.push(garontor3Id);
      }
      const updatedFormData = {
        member_id: member_id,
        emp_no: emp_no,
        due_date: due_date,
        first_due_date: first_due_date,
        installment_period: installment_period,
        installmentAmount: installmentAmount,
        name: name,
        loan_amount: loan_amount,
        deduction: deduction,
        InterestRate: InterestRate,
        cash: cash,
        bank: bank,
        transfer: transfer,
        operator: userRole,
        loan_date: loan_date,
        ac_type: "Medium Term Loan",
        guarantors: temp,
      };
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/loan_submit_new/",
        updatedFormData
      );

      let jsonData = response.data;
      if (jsonData.success) {
        Swal.fire({
          icon: "success",
          title: "Thank You! ",
          text: ` Your bond number is ${jsonData.Bonad_number}`,
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });

        setMember_Id("");
        setEmp_No("");
        setName("");
        setSalary("");
        setMICR_no("");
        setloan_amount("");
        setApplicationAmount("");
        // setLoanDate("");
        setinstallment_period("");
        setinstallmentAmount("");
        setInterestRate("");
        setMonths_to_retire("");
        setDeduction("");
        setcash("");
        setbank("");
        setOperator("");
        setGarontor1Id("");
        setVoucherNo("");
        setChequeNo("");
        settransfer("");
        setMember_class("");
        setGarontor1Member_C("");
        setGarontor2Member_C("");

      } else if (jsonData.gau_error === "guarantors is retired") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "guarantors is retired",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      } else if (jsonData.error === "Member is retired") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Member is retired.",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      } else if (
        jsonData.error === "Loan amount exceeds the eligible limit (0 Rs.)"
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Loan amount exceeds the maximum limit of 2000000 Rs.",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      } else if (
        jsonData.error ===
        "Loan amount exceeds the eligible limit (60000.00 Rs.)"
      ) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Loan amount exceeds the eligible limit (60000.00 Rs.)",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      } else if (
        jsonData.error ===
        "Member has not repaid one-fourth of the previous loan"
      ) {
        console.log(jsonData.error); // You can choose to log the error message if needed
        Swal.fire({
          title: "Error",
          text: "Member has not repaid one-fourth of the previous loan",
          icon: "error",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      } else {
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
            <div className="H1-Heading-Main"> Medium Term Loan Application</div>
          </div>
          <div className="container ">
            <div className="row First-Main-Row  pt-3 mb-1">
              <form>
                <div className="H2-Sub-Heading ">Basic Information</div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div className="">
                     
                      <div className="row">
                        <div className="col-sm-3 mb-1">
                        <label htmlFor="member_id" className="small-label">
                        Class
                      </label>
                          <input
                            type="text"
                            id="member_class"
                            name="member_class"
                            className="form-control   small-placeholder bg-white"
                            value={member_class}
                            onChange={(e) => {
                              setMember_class(e.target.value);
                            }}
                            min={0}
                            readOnly
                          />
                        </div>
                        <div className="col-sm-9">
                        <label htmlFor="member_id" className="small-label">
                        Member No*
                      </label>
                          <input
                            type="text"
                            id="member_id"
                            name="member_id"
                            placeholder="Member No."
                            className="form-control small-placeholder"
                            value={member_id}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              setMember_Id(numericValue);
                              handleMemberIdChange(numericValue);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label htmlFor="emp_no" className="small-label">
                        Emp Code
                      </label>
                      <input
                        type="text"
                        id="emp_no"
                        name="emp_no"
                        className="form-control small-placeholder  bg-white"
                        value={emp_no}
                        onChange={(e) => setEmp_No(e.target.value)}
                        readOnly
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12 text-start">
                    <label htmlFor="name" className="small-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder  bg-white"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="openingDate"
                        style={{ color: "dodgerblue" }}
                      >
                        Application Date*
                      </label>
                      <input
                        type="date"
                        className="form-control bg-white"
                        id="openingDate"
                        name="applicationdate"
                        value={applicationdate}
                        onChange={(e) => setApplicationDate(e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="loan_amt"
                        style={{ color: "dodgerblue" }}
                      >
                        Application Amount(₹)*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="application_amount"
                        name="application_amount"
                        placeholder="₹"
                        value={application_amount}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9]/g, "");
                          setApplicationAmount(numericValue);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="eligibleAmount"
                        style={{ color: "dodgerblue" }}
                      >
                        Eligiable Amount(₹)*
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
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9]/g, "");
                          setloan_amount(numericValue);
                          eligibility(e.target.value,installment_period);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="installment_period"
                        style={{ color: "black" }}
                      >
                        No. of Installments*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="installment_period"
                        name="installment_period"
                        value={installment_period}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          setinstallment_period(numericValue);
                          // handleLoanEligibility();
                          eligibility(loan_amount, numericValue);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        htmlFor="InterestRate"
                        className="small-label"
                        style={{ color: "dodgerblue" }}
                      >
                        Interest Rate(%)
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
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="installmentAmount"
                        style={{ color: "dodgerblue" }}
                      >
                        Installment Amount(₹)
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
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="months_to_retire"
                        style={{ color: "red" }}
                      >
                        Months to Retire
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white"
                        id="months_to_retire"
                        name="months_to_retire"
                        value={months_to_retire}
                        onChange={(e) => setMonths_to_retire(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="callDate"
                        style={{ color: "dodgerblue" }}
                      >
                        Call Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="callDate"
                        name="calldate"
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="bondno"
                        style={{ color: "dodgerblue" }}
                      >
                        Bond No.
                      </label>
                      <input
                        type="text"
                        className="form-control bg-white"
                        id="bondno"
                        name="bondno"
                        value={bondno}
                        onChange={(e) => setBondNo(e.target.value)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12  text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="deduction"
                        style={{ color: "dodgerblue" }}
                      >
                        Deduction*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="deduction"
                        name="deduction"
                        value={deduction}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9.]/g, "");
                          setDeduction(numericValue);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="operator"
                        style={{ color: "dodgerblue" }}
                      >
                        Added By*
                      </label>
                      <select
                        className="form-control  bg-white"
                        id="operator"
                        name="operator"
                        value={operator}
                        defaultValue={userRole}
                        disabled
                        onChange={(e) => {
                          setOperator(e.target.value);
                        }}
                      >
                         <option>{userRole}</option>
                      <option value="Admin">Admin</option>
                      <option value="Operator">Operator</option>
                      </select>
                      
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="salary"
                        style={{ color: "dodgerblue" }}
                      >
                        Basic Salary(₹)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="salary"
                        name="salary"
                        placeholder="₹"
                        value={salary}
                        onChange={(e) => {
                          setOperator(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        htmlFor="salary"
                        className="small-label"
                        style={{ color: "dodgerblue" }}
                      >
                        Salary(₹)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="salary"
                        name="salary"
                        placeholder="₹"
                        value={salary}
                        onChange={(e) => {
                          setSalary(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="Border-Black px-2 mt-3 pb-2">
                  <div className="H2-Sub-Heading-loan mt-2 ">GUARANTER</div>
                  <div className="row">
                    {/* No.1 Field */}
                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 text-start">
                      <div className="">
                        <label htmlFor="number1" className="small-label">
                          No.1 
                        </label>
                        <input
                          type="text"
                          id="garontor1Member_C"
                          name="garontor1Member_C"
                          value={garontor1Member_C}
                          onChange={(e) => {
                            setGarontor1Member_C(e.target.value);
                          }}
                          className="form-control small-placeholder bg-white"
                          readOnly
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label
                        htmlFor="guarantor1MemberId"
                        className="small-label"
                      >
                        Member No*
                      </label>
                      <input
                        type="text"
                        id="guarantor1MemberId"
                        name="guarantor1MemberId"
                        className="form-control small-placeholder"
                        value={garontor1Id}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9.]/g, "");
                          setGarontor1Id(e.target.value);
                          handleGuarantor1IdChange(numericValue);
                        }}
                      />
                    </div>

                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label
                          htmlFor="garontor1EmpCode"
                          className="small-label"
                        >
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="garontor1EmpCode"
                          name="garontor1EmpCode"
                          className="form-control small-placeholder bg-white"
                          readOnly
                          value={garontor1Id === "" ? "" : garontor1EmpCode}
                          onChange={(e) => {
                            setGarontor1EmpCode(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-xl col-lg col-md col-sm text-start">
                      <label
                        htmlFor="garontor1FullName"
                        className="small-label"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="garontor1FullName"
                        name="garontor1FullName"
                        className="form-control small-placeholder bg-white"
                        readOnly
                        value={garontor1Id === "" ? "" : garontor1FullName}
                        onChange={(e) => {
                          setGarontor1FullName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* No.2 Field */}
                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 text-start">
                      <div className="">
                        <label
                          htmlFor="garontor2Member_C"
                          className="small-label"
                        >
                          No.2
                        </label>
                        <input
                          type="text"
                          id="garontor2Member_C"
                          name="garontor2Member_C"
                          className="form-control small-placeholder bg-white"
                          readOnly
                          value={garontor2Member_C}
                          onChange={(e) => {
                            const value = e.target.value;
                            const numericValue = value.replace(/[^0-9.]/g, "");
                            setGarontor2Member_C(numericValue);
                          }}
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label
                        htmlFor="guarantor2MemberId"
                        className="small-label"
                      >
                        Member No*
                      </label>
                      <input
                        type="text"
                        id="guarantor2MemberId"
                        name="guarantor2MemberId"
                        className="form-control small-placeholder"
                        value={garontor2Id}
                        onChange={(e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9.]/g, "");
    setGarontor2Id(numericValue);
    handleGuarantor2IdChange(numericValue);
  }}
                      />
                    </div>
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label
                          htmlFor="garontor2EmpCode"
                          className="small-label"
                        >
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="garontor2EmpCode"
                          name="garontor2EmpCode"
                          className="form-control small-placeholder bg-white"
                          readOnly
                          value={garontor2Id === "" ? "" : garontor2EmpCode}
                          onChange={(e) => {
                            setGarontor2EmpCode(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg col-md col-sm text-start">
                      <label
                        htmlFor="garontor2FullName"
                        className="small-label"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="garontor2FullName"
                        name="garontor2FullName"
                        className="form-control small-placeholder bg-white"
                        readOnly
                        value={garontor2Id === "" ? "" : garontor2FullName}
                        onChange={(e) => {
                          setGarontor2FullName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* No.3 Field */}
                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 text-start">
                      <div className="">
                        <label
                          htmlFor="garontor3Member_C"
                          className="small-label"
                        >
                          No.3
                        </label>
                        <input
                          type="text"
                          id="garontor3Member_C"
                          name="garontor3Member_C"
                          className="form-control small-placeholder bg-white"
                          value={garontor3Member_C}
                          onChange={(e) => {
                            const value = e.target.value;
                            const numericValue = value.replace(/[^0-9.]/g, "");
                            setGarontor3Member_C(numericValue);
                          }}
                          readOnly
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label
                        htmlFor="guarantor3MemberId"
                        className="small-label"
                      >
                        Member No*
                      </label>
                      <input
                        type="text"
                        id="guarantor3MemberId"
                        name="guarantor3MemberId"
                        className="form-control small-placeholder"
                        value={garontor3Id}
                        onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9.]/g, "");
                          setGarontor3Id(numericValue);
                          handleGuarantor3IdChange(numericValue);
                        }}
                      />
                    </div>
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label
                          htmlFor="garontor2EmpCode"
                          className="small-label"
                        >
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="garontor3EmpCode"
                          name="garontor3EmpCode"
                          className="form-control small-placeholder bg-white"
                          readOnly
                          value={garontor3Id === "" ? "" : garontor3EmpCode}
                          onChange={(e) => {
                            setGarontor3EmpCode(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg col-md col-sm text-start">
                      <label
                        htmlFor="garontor3FullName"
                        className="small-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="garontor3FullName"
                        name="garontor3FullName"
                        className="form-control small-placeholder bg-white"
                        readOnly
                        value={garontor3Id === "" ? "" : garontor3FullName}
                        onChange={(e) => {
                          setGarontor3FullName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* Rec. By No. Field */}
                    <div className="col-xl-1 col-lg-1 col-md-3 col-sm-3 text-start">
                      <div className="">
                        <label htmlFor="guarantor1Name" className="small-label">
                          Rec.By
                        </label>
                        <input
                          type="text"
                          id="recByNumber"
                          name="recByNumber"
                          // placeholder="A"
                          className="form-control small-placeholder"
                          min={0}
                        />
                      </div>
                    </div>
                    {/* Rec. By Member No. Field */}
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label htmlFor="guarantor1Name" className="small-label">
                        {" "}
                        Member No.
                      </label>
                      <input
                        type="number"
                        id="recByMemberNo"
                        name="recByMemberNo"
                        className="form-control small-placeholder"
                      />
                    </div>
                    {/* Rec. By Emp Code Field */}
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label htmlFor="guarantor1Name" className="small-label">
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="recByEmpCode"
                          name="recByEmpCode"
                          className="form-control small-placeholder"
                        />
                      </div>
                    </div>
                    {/* Rec. By Name Field */}
                    <div className="col-xl col-lg col-md col-sm text-start">
                      <label htmlFor="guarantor1Name" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="recByName"
                        name="recByName"
                        className="form-control small-placeholder"
                      />
                    </div>
                  </div>
                </div>
                {/* Sanctioning Details */}
                <div className="row mt-1 mb-2">
                  {/* Sanctioning Date Field */}
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label
                        htmlFor="sanctioningDate"
                        className="small-label"
                        style={{ color: "red" }}
                      >
                        Sanctioning Date
                      </label>
                      <input
                        type="date"
                        id="openingDate"
                        name="sanctioningDate"
                        className="form-control bg-white"

                        // onChange={(e) => {
                        //   setFormData({
                        //     ...formData,
                        //     sanctioningDate: e.target.value,
                        //   });
                        // }}
                        // readOnly
                      />
                    </div>
                  </div>
                  {/* Sanctioned By Field */}
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label
                        htmlFor="sanctionedBy"
                        className="small-label"
                        style={{ color: "red" }}
                      >
                        Sanctioned Date
                      </label>
                      <input
                        type="date"
                        id="sanctionedDate"
                        name="sanctionedDate"
                        className="form-control small-placeholder"

                        // onChange={(e) => {
                        //   handleInputChange({
                        //     target: {
                        //       name: "sanctionedDate",
                        //       value: e.target.value,
                        //     },
                        //   });
                        // }}
                      />
                    </div>
                  </div>
                  {/* Sanctioned Amount Field */}
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label
                        htmlFor="sanctionedAmount"
                        className="small-label"
                        style={{ color: "red" }}
                      >
                        Sanctioned Amount(₹)
                      </label>
                      <input
                        type="number"
                        id="sanctionedAmount"
                        name="sanctionedAmount"
                        placeholder="₹"
                        className="form-control small-placeholder"
                        min={0}
                        // value={sanctionedAmount}
                  
                        // onChange={(e) => {
                        //   const value = e.target.value;
                        //   const numericValue = value.replace(/[^0-9.]/g, "");
                        //   setsan(e.target.value);
                         
                        // }}
                      />
                    </div>
                  </div>
                </div>
                <div className="Border-Black px-2 mt-3 mb-2">
                  <div className="row">
                    {/* Loan No. Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="loanNo"
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
                          onChange={(e) => {
                            setLoanNo(e.target.value);
                          }}
                          readOnly
                        />
                      </div>
                    </div>
                    {/* Loan Date Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="loan_date"
                          // style={{ color: "blue" }}
                        >
                          Loan Date
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
                    {/* Loan Amount Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="loan_amount"
                          // style={{ color: "blue" }}
                        >
                          Loan Amount(₹)
                        </label>
                        <input
                          type="text"
                          id="loan_amount"
                          name="loan_amount"
                          placeholder="₹"
                          className="form-control small-placeholder"
                          value={loan_amount}
                          onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9]/g, "");
                          setloan_amount(numericValue);
                        
                        }}
                        />
                      </div>
                    </div>
                    {/* MICR No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="MICR_no"
                          // style={{ color: "red" }}
                        >
                          MICR No.
                        </label>
                        <input
                          type="text"
                          id="MICR_no"
                          name="MICR_no"
                          className="form-control small-placeholder"
                          value={MICR_no}
                          onChange={(e) => {
                            setMICR_no(e.target.value);
                          }}
                          maxLength="9"
                        />
                      </div>
                    </div>
                    {/* ECS No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="ecsNo"
                          // style={{ color: "red" }}
                        >
                          ECS No.
                        </label>
                        <input
                          type="number"
                          id="ecsNo"
                          name="ecsNo"
                          className="form-control small-placeholder"
                          // value={ecsNo}
                          min={0}
                        />
                      </div>
                    </div>
                    {/* Voucher No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="voucherNo"
                          // style={{ color: "black" }}
                        >
                          Voucher No.
                        </label>
                        <input
                          type="text"
                          id="voucherNo"
                          name="voucherNo"
                          className="form-control small-placeholder"
                          value={voucherNo}
                          onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9]/g, "");
                          setVoucherNo(numericValue);
                        }}
                        />
                      </div>
                    </div>
                    {/* Cash Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="cash"
                          // style={{ color: "blue" }}
                        >
                          Cash *
                        </label>
                        <input
                          type="text"
                          id="cash"
                          name="cash"
                          className="form-control small-placeholder"
                          value={cash}                 
                          onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9]/g, "");
                          setcash(numericValue);
                        }}
                        />
                      </div>
                    </div>
                    {/* Bank Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          htmlFor="bank"
                          className="small-label"
                          // style={{ color: "blue" }}
                        >
                          Bank *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="bank"
                          name="bank"
                          value={bank}
                          onChange={(e) => {
                          const value = e.target.value;
                          const numericValue = value.replace(/[^0-9]/g, "");
                          setbank(numericValue);
                        }}
                        />
                      </div>
                    </div>

                    {/* Cheque No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="chequeNo"
                          // style={{ color: "blue" }}
                        >
                          Cheque No.
                        </label>
                        <input
                          type="text"
                          id="chequeNo"
                          name="chequeNo"
                          className="form-control"
                          value={chequeNo}
                          onChange={(e) => {
                          // const value = e.target.value;
                          // const numericValue = value.replace(/[^0-9]/g, "");
                          setChequeNo(e.target.value);
                        }}
                        />
                      </div>
                    </div>
                    {/* Transfer Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="transfer"
                          // style={{ color: "blue" }}
                        >
                          Transfer *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="transfer"
                          name="transfer"
                          value={transfer}
                          onChange={(e) => {
                            settransfer(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* Disbursed By Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="disbursedBy"
                          // style={{ color: "blue" }}
                        >
                          Disbursed By
                        </label>
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <input
                              type="text"
                              className="form-control"
                              id="field1"
                              name="field1"
                              // value={formData.field1}
                              // onChange={(e) => {
                              //   handleInputChange({
                              //     target: {
                              //       name: "field1",
                              //       value: e.target.value,
                              //     },
                              //   });
                              // }}
                            />
                          </div>
                          <div className="col-md-6 mb-2">
                            <input
                              type="text"
                              className="form-control"
                              id="field2"
                              name="field2"
                              // value={formData.field2}
                              // onChange={(e) => {
                              //   handleInputChange({
                              //     target: {
                              //       name: "field2",
                              //       value: e.target.value,
                              //     },
                              //   });
                              // }}
                              // required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Sanction By Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="mb-2">
                        <label
                          className="small-label"
                          htmlFor="sanctionedBy"
                          // style={{ color: "blue" }}
                        >
                          Sanctioned By
                        </label>
                        <select
                          className="form-control form-select"
                          id="sanctionedBy"
                          name="sanctionedBy"
                          // value={formData.sanctionedBy}
                          // onChange={(e) => {
                          //   handleInputChange({
                          //     target: {
                          //       name: "sanctionedBy",
                          //       value: e.target.value,
                          //     },
                          //   });
                          // }}
                        >
                          <option value="">Select Sanctioned By</option>
                          <option value="M1">M1</option>
                          <option value="M2">M2</option>
                          <option value="M3">M3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Remark Field */}
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-start">
                    <div className="">
                      <label
                        htmlFor="remark"
                        className="small-label"
                        style={{ color: "dodgerblue" }}
                      >
                        Remark
                      </label>
                      <textarea
                        id="remark"
                        name="remark"
                        className="form-control"
                        rows="2"
                        value={remark}
                        onChange={(e) => {
                         setRemark(e.target.value);
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
                      onClick={() => {
                        handleSubmit();
                      }}
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
