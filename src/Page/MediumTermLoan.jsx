import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";

// import "../Style/Global_Classes.scss";

export default function MediumTermLoan() {

  let [LoanDate, setLoanDate] = useState();
  // guarantor1MemberId: "",
  // guarantor1EmpCode: "",
  // guarantor1FullName: "",
  let [garontor1Id, setGarontor1Id] = useState("");
  let [garontor1EmpCode, setGarontor1EmpCode] = useState("");
  let [garontor1FullName, setGarontor1FullName] = useState("");

  let [garontor2Id, setGarontor2Id] = useState("");
  let [garontor2EmpCode, setGarontor2EmpCode] = useState("");
  let [garontor2FullName, setGarontor2FullName] = useState("");

  let [garontor3Id, setGarontor3Id] = useState("");
  let [garontor3EmpCode, setGarontor3EmpCode] = useState("");
  let [garontor3FullName, setGarontor3FullName] = useState("");

  let [due_date, setdue_date] = useState("");
  let [first_due_date, setfirst_due_date] = useState("");
  let [installment_period, setinstallment_period] = useState("");
  let [installmentAmount, setinstallmentAmount] = useState("");
  let [loan_amount, setloan_amount] = useState("");
  let [deduction, setdeduction] = useState("");
  let [InterestRate, setInterestRate] = useState("");
  let [cash, setcash] = useState("");
  let [bank, setbank] = useState("");
  let [transfer, settransfer] = useState("");
  let [operator, setoperator] = useState("");

  let [garontorArray, setGarontorArray] = useState([]);


  useEffect(() => {
    setLoanDate(getCurrentDate());
  }, [])
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Ensure month and day are always two digits
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }
  const [formData, setFormData] = useState({
    member_id: "",
    emp_no: "",
    applicationdate: getCurrentDate(), // Make sure to set the correct default value
    loan_amount: "",
    bondno: "",
    // calldate: "",
    MICR_no: "",
    application_amount: "",
    eligibleAmount: "",
    deduction: "",
    monthsToRetire: "",
    // number_of_installments: "",
    InterestRate: "",
    installmentAmount: "",
    // addedBy: "Select Operator",
    salary: "",
    sanctioningDate: getCurrentDate(),

    // loan_date: getCurrentDate(),
    // due_date: "",
    first_due_date: "",
    // installment_period: "",
    name: "",
    ac_type: "Medium Term Loan",
    // principle: "10",
    // loan_amt: "",
    cash: "",
    bank: "",
    transfer: "",
    operator: "Select Operator",
    debit: "",


    recByNumber: "",
    recByMemberNo: "",
    recByEmpCode: "",
    recByName: "",
    sanctionedDate: "",
    sanctionedAmount: "",
    loanNo: "",
    ecsNo: "",
    voucherNo: "",
    // disbursedBy: {
    //   field1: "",
    //   field2: "",
    // },
    sanctionedBy: "",
    remark: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'operator') { setoperator(formData.operator) }
    if (name === 'cash') { setcash(formData.cash) }
    if (name === 'transfer') { settransfer(formData.transfer) }
    if (name === 'bank') { setbank(formData.bank) }



  };
  const handleMemberIdChange = (e) => {
    const member_id = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      member_id: member_id,
    }));
    if (!member_id) {
      // Clear other form fields if memberId is empty
      setFormData({
        member_id: "",
        name: "",
        emp_no: "",
        salary: "",
        MICR_no: "",
      });
      return;
    }
    axios
      .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${member_id}/`)
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const memberData = ress.data.members[0];

          setFormData((prevData) => ({
            ...prevData,
            name:
              (memberData["first_name"] || "") +
              " " +
              (memberData["middle_name"] || "") +
              " " +
              (memberData["last_name"] || ""),
            emp_no: memberData["emp_no"] || "",
            salary: memberData["salary"] || "",
            // MICR_no: memberData["MICR_no"] || "",
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

  //Loan Eligibility
  const handleLoanEligibilityChange = (loanAmount, numberOfInstallments) => {
    setFormData({
      ...formData,
      loan_amount: loanAmount,
      installment_period: numberOfInstallments,
    });

    const requestData = {
      member_id: formData.member_id,
      loan_amount: loanAmount,
      installment_period: numberOfInstallments,
    };

    if (loanAmount !== undefined && loanAmount !== "") {
      if (numberOfInstallments !== undefined && numberOfInstallments !== "") {
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
              // Show Swal for not eligible
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
              // Handle the API response and update the state with the new fields
              setdue_date(data.Due_date);
              setInterestRate(data.InterestRate);
              setinstallmentAmount(data.installmentAmount);
              setfirst_due_date(data.first_Due_date);
              setloan_amount(loanAmount);
              setinstallment_period(numberOfInstallments);


              setFormData({
                ...formData,
                loan_amount: loanAmount,
                installment_period: numberOfInstallments,
                InterestRate: data.InterestRate,
                installmentAmount: data.installmentAmount,
                first_due_date: data.first_Due_date,
                due_date: data.Due_date,
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
  };




  async function handleGarontor(member_id, garontorIndex) {
    try {
      let response = await axios.get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${member_id}/`);
      let result = response.data.members[0];

      let name = result.first_name + " ";
      let middleName = result.middle_name + " ";
      let lastName = result.last_name;

      if (garontorIndex === 1) {

        setGarontor1FullName(name + middleName + lastName);
        setGarontor1EmpCode(result.emp_no);
      }
      if (garontorIndex === 2) {

        setGarontor2FullName(name + middleName + lastName);
        setGarontor2EmpCode(result.emp_no);
      }
      if (garontorIndex === 3) {

        setGarontor3FullName(name + middleName + lastName);
        setGarontor3EmpCode(result.emp_no);

      }
    }
    catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (garontor1Id !== "") {
      handleGarontor(garontor1Id, 1);
    }
  }, [garontor1Id]);

  useEffect(() => {
    if (garontor2Id !== "") {
      handleGarontor(garontor2Id, 2)
    }

  }, [garontor2Id]);

  useEffect(() => {
    if (garontor3Id !== "") {
      handleGarontor(garontor3Id, 3)
    }

  }, [garontor3Id]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(formData.ac_type);
    try {
      console.log("Form Data:", formData);
      let temp = [];
      // temp=[];
      if (garontor1Id !== "") { temp.push(garontor1Id) }
      if (garontor2Id !== "") { temp.push(garontor2Id) }
      if (garontor3Id !== "") { temp.push(garontor3Id) }


      // Add the guarantor member_id to the guarantors array
      const updatedFormData = {
        // ...formData,
        member_id: formData.member_id,
        emp_no: formData.emp_no,
        due_date: due_date,
        first_due_date: first_due_date,
        installment_period: installment_period,
        installmentAmount: installmentAmount,
        name: formData.name,
        loan_amount: loan_amount,
        deduction: deduction,

        // principle:formData.installmentAmount,
        InterestRate: InterestRate,
        cash: cash,
        bank: bank,
        transfer: transfer,
        operator: operator,
        loan_date: LoanDate,
        ac_type: 'Medium Term Loan',
        guarantors: temp

      };

      // Make the API request to submit the form data
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/loan_submit/",
        updatedFormData

      );

      console.log("Data submitted successfully:", response.data);

      // Check if the response contains a success message
      if (response.data?.success) {
        // Display a success message using SweetAlert or another notification library
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: response.data.success,
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });

        // Reset the form data to clear the fields after successful submission
        setFormData({
          // Reset other form fields as needed
          member_id: "",
          emp_no: "",
          name: "",
          applicationdate: getCurrentDate(),
          loan_amount: "",
          bondno: "",
          calldate: "",
          MICR_no: "",
          eligibleAmount: "",
          deduction: "",
          monthsToRetire: "",
          application_amount: "",

          // number_of_installments: "",
          InterestRate: "",
          installmentAmount: "",
          salary: "",
          sanctioningDate: getCurrentDate(),
          loan_date: getCurrentDate(),
          due_date: "",
          first_due_date: "",
          installment_period: "",
          name: "",
          ac_type: "Medium Term Loan",
          cash: "",
          bank: "",
          transfer: "",
          operator: "Select Operator",
          guarantors: [],
          // guarantor1MemberId: "",
          // guarantor2MemberId: "",
          // guarantor3MemberId: "",
          // number2: "",

          // number3: "",
          // memberNo3: "",

          recByNumber: "",
          recByMemberNo: "",
          recByEmpCode: "",
          recByName: "",
          sanctionedDate: "",
          sanctionedAmount: "",
          loanNo: "",
          ecsNo: "",
          voucherNo: "",
          disbursedBy: {
            field1: "",
            field2: "",
          },
          sanctionedBy: "",
          remark: "",
        });


        setGarontor1Id("");
        setGarontor1EmpCode("");
        setGarontor1FullName("");

        setGarontor2Id("");
        setGarontor2EmpCode("");
        setGarontor2FullName("");


        setGarontor3Id("");
        setGarontor3EmpCode("");
        setGarontor3FullName("");




      } else if (response.data?.Fail) {
        const specificFailMessage = response.data.Fail;
        if (specificFailMessage === "guarantors is retired") {
          console.warn('name 1 :', formData.guarantor1MemberId, ' name 2: ', formData.guarantor2MemberId, 'installment :', formData.loan_amount, ' period :', formData.installment_period);

          Swal.fire({
            icon: "error",
            title: "Error",
            text: specificFailMessage,
            didOpen: () => {
              Swal.getPopup().style.borderRadius = "25px";
              const confirmButton = Swal.getConfirmButton();
              confirmButton.classList.add("custom-swal-button");
            },
          });
        } else if (specificFailMessage.includes("Member is retired")) {
          console.warn('name 1 :', formData.guarantor1MemberId, ' name 2: ', formData.guarantor2MemberId, 'installment :', formData.loan_amount, ' period :', formData.installment_period);

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
          specificFailMessage.includes("Loan amount exceeds 2000000 Rs.")
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
        }
        // Add more conditions as needed
      } else {
        // Display a generic error message if the response does not contain a success message
        console.warn('name 1 :', formData.guarantor1MemberId, ' name 2: ', formData.guarantor2MemberId, 'installment :', formData.loan_amount, ' period :', formData.installment_period);

        const errorMessage =
          response.data?.error || "Failed to submit data. Please try again.";

        console.error(
          "Server Error:",
          response.data?.error || "Unknown Server Error"
        );

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
        return;
      }
    } catch (error) {
      console.error("Error submitting data:", error);

      console.warn('name 1 :', formData.guarantor1MemberId, ' name 2: ', formData.guarantor2MemberId, 'installment :', formData.loan_amount, ' period :', formData.installment_period);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.error ||
          "Failed to submit data. Please try again.",
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
                      <label htmlFor="member_id" className="small-label">
                        Member No
                      </label>
                      <div className="row">
                        <div className="col-sm-3 mb-1">
                          <input
                            type="text"
                            id="member_id"
                            name="member_id"
                            className="form-control   small-placeholder"
                            placeholder="A"
                            min={0}
                            readOnly
                          // required
                          />
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            id="member_id"
                            name="member_id"
                            className="form-control small-placeholder"
                            value={formData.member_id}
                            onChange={handleMemberIdChange}

                          // required
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
                        className="form-control small-placeholder"
                        value={formData.emp_no}
                        // onChange={(e) => {
                        //   const numericValue = e.target.value.replace(
                        //     /[^0-9.]/g,
                        //     ""
                        //   );
                        //   handleInputChange({
                        //     target: { name: "emp_no", value: numericValue },
                        //   });
                        // }}
                        min={0}
                      // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12 text-start">
                    <label htmlFor="name" className="small-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="name"
                      name="name"
                      value={formData.name}
                    // onChange={(e) => {
                    //   handleInputChange({
                    //     target: { name: "name", value: e.target.value },
                    //   });
                    // }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="openingDate"
                        style={{ color: "dodgerblue" }}
                      >
                        Application Date
                      </label>
                      <input
                        type="date"
                        className="form-control bg-white"
                        id="openingDate"
                        name="applicationdate"
                        value={formData.applicationdate}
                        readOnly

                      // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="loan_amt"
                        style={{ color: "dodgerblue" }}
                      >
                        Application Amount(₹)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="application_amount"
                        name="application_amount"
                        placeholder="₹"
                        // onChange={handleLoanEligibilityChange}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only numbers
                          handleInputChange({
                            target: {
                              name: "application_amount",
                              value: numericValue,
                            },
                          });
                        }}
                        value={formData.application_amount}
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
                        Eligible Amount(₹)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="loan_amount"
                        name="loan_amount"
                        placeholder="₹"
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                          handleLoanEligibilityChange(
                            numericValue,
                            formData.installment_period
                          );
                        }}
                        value={formData.loan_amount}
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="installment_period"
                        style={{ color: "black" }}
                      >
                        No. of Installments
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="installment_period"
                        name="installment_period"
                        // onChange={handleLoanEligibilityChange}
                        value={formData.installment_period}
                        onChange={(e) =>
                          handleLoanEligibilityChange(
                            formData.loan_amount,
                            e.target.value
                          )
                        }
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
                        className="form-control"
                        id="InterestRate"
                        name="InterestRate"
                        placeholder=""
                        value={formData.InterestRate}
                        step={0.01}
                      // onChange={(e) => {
                      //   const numericValue = e.target.value.replace(
                      //     /[^0-9.]/g,
                      //     ""
                      //   );
                      //   handleInputChange({
                      //     target: {
                      //       name: "InterestRate",
                      //       value: numericValue,
                      //     },
                      //   });
                      // }}
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
                        className="form-control"
                        id="installmentAmount"
                        name="installmentAmount"
                        placeholder="₹"
                        value={formData.installmentAmount}
                      // onChange={(e) => {
                      //   const numericValue = e.target.value.replace(
                      //     /[^0-9.]/g,
                      //     ""
                      //   );
                      //   handleInputChange({
                      //     target: {
                      //       name: "installmentAmount",
                      //       value: numericValue,
                      //     },
                      //   });
                      // }}
                      // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="monthsToRetire"
                        style={{ color: "red" }}
                      >
                        Months to Retire
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="monthsToRetire"
                        name="monthsToRetire"
                        value={formData.monthsToRetire}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only numbers
                          handleInputChange({
                            target: {
                              name: "monthsToRetire",
                              value: numericValue,
                            },
                          });
                        }}
                      // required
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
                      // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
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
                        className="form-control"
                        id="bondno"
                        name="bondno"
                        value={formData.bondno}
                      // onChange={(e) => {
                      //   const numericValue = e.target.value.replace(
                      //     /[^0-9.]/g,
                      //     ""
                      //   );
                      //   handleInputChange({
                      //     target: { name: "bondno", value: numericValue },
                      //   });
                      // }}
                      // min={0}
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
                        Deduction
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="deduction"
                        name="deduction"
                        value={formData.deduction}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          setdeduction(numericValue);
                          handleInputChange({
                            target: {
                              name: "deduction",
                              value: numericValue,
                            },
                          });
                        }}
                      // required
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
                        Added By
                      </label>
                      <select
                        className="form-control form-select"
                        id="operator"
                        name="operator"
                        value={formData.operator}
                        onChange={handleInputChange}
                      // required
                      >
                        <option value="Select Operator">Select Operator</option>
                        <option value="M1">M1</option>
                        <option value="M2">M2</option>
                        <option value="M3">M3</option>
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
                        value={formData.salary}
                      // onChange={(e) => {
                      //   const numericValue = e.target.value.replace(
                      //     /[^0-9.]/g,
                      //     ""
                      //   );
                      //   handleInputChange({
                      //     target: {
                      //       name: "salary",
                      //       value: numericValue,
                      //     },
                      //   });
                      // }}
                      // required
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
                        value={formData.salary}
                      // onChange={(e) => {
                      //   const numericValue = e.target.value.replace(
                      //     /[^0-9.]/g,
                      //     ""
                      //   );
                      //   handleInputChange({
                      //     target: {
                      //       name: "salary",
                      //       value: numericValue,
                      //     },
                      //   });
                      // }}
                      // required
                      />
                    </div>
                  </div>
                </div>
                <div className="Border-Black px-2 mt-3 pb-2">
                  <div className="H2-Sub-Heading mt-2 ">GUARANTER</div>
                  <div className="row">
                    {/* No.1 Field */}
                    <div className="col-xl-1 col-lg-3 col-md-3 col-sm-3 text-start">
                      <div className="">
                        <label htmlFor="number1" className="small-label">
                          No.1
                        </label>
                        <input
                          type="text"
                          id="number1"
                          name="number1"
                          placeholder="A"
                          className="form-control small-placeholder"
                          min={0}
                        />
                      </div>
                    </div>
                    {/* Guarantor 1 Member No. Field */}
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label
                        htmlFor="guarantor1MemberId"
                        className="small-label"
                      >
                        Member No.
                      </label>
                      <input
                        type="text"
                        id="guarantor1MemberId"
                        name="guarantor1MemberId"
                        className="form-control small-placeholder"
                        // value={guarantor1FormData.member_id}
                        value={garontor1Id}
                        onChange={(e) => { setGarontor1Id(e.target.value) }}
                      // onChange={(e) => handleGuarantor1IdChange(e)}
                      />
                    </div>

                    {/* Guarantor 1 Emp Code Field */}
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label
                          htmlFor="guarantor1EmpCode"
                          className="small-label"
                        >
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="guarantor1EmpCode"
                          name="guarantor1EmpCode"
                          className="form-control small-placeholder"
                          value={
                            garontor1Id === ""

                              // Guranter1FormData.member_id === ""
                              ? ""
                              : garontor1EmpCode
                          }
                        //  value={formData.guarantor1EmpCode}
                        // onChange={handleGuarantor1IdChange}
                        />
                      </div>
                    </div>

                    {/* Name Field (Guarantor 1) */}
                    <div className="col-xl col-lg-3 col-md col-sm text-start">
                      <label
                        htmlFor="guarantor1FullName"
                        className="small-label"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="guarantor1FullName"
                        name="guarantor1FullName"
                        className="form-control small-placeholder"
                        value={
                          garontor1Id === ""
                            // Guranter1FormData.member_id === ""
                            ? ""
                            : garontor1FullName
                        }
                      // value={formData.guarantor1FullName}

                      // onChange={handleGuarantor1IdChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* No.2 Field */}
                    <div className="col-xl-1 col-lg-3 col-md-3 col-sm-3 text-start">
                      <div className="">
                        <label htmlFor="number2" className="small-label">
                          No.2
                        </label>
                        <input
                          type="text"
                          id="number2"
                          name="number2"
                          className="form-control small-placeholder"
                          placeholder="A"
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label
                        htmlFor="guarantor2MemberId"
                        className="small-label"
                      >
                        Member No.
                      </label>
                      <input
                        type="text"
                        id="guarantor2MemberId"
                        name="guarantor2MemberId"
                        className="form-control small-placeholder"
                        // value={.member_id}
                        value={garontor2Id}
                        // onChange={handleGuarantor2IdChange}
                        onChange={(e) => { setGarontor2Id(e.target.value) }}

                      // onChange={(e) => handleGuranter2IdChange(e)}
                      />
                    </div>
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label
                          htmlFor="guarantor2EmpCode"
                          className="small-label"
                        >
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="guarantor2EmpCode"
                          name="guarantor2EmpCode"
                          className="form-control small-placeholder"
                          value={
                            garontor2Id === ""
                              // Guranter2FormData.member_id === ""
                              ? ""
                              : garontor2EmpCode
                          }
                        // onChange={handleGuranter2IdChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg-3 col-md col-sm text-start">
                      <label
                        htmlFor="guarantor2FullName"
                        className="small-label"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="guarantor2FullName"
                        name="guarantor2FullName"
                        className="form-control small-placeholder"
                        value={
                          garontor2Id === ""
                            // Guranter2FormData.member_id === ""
                            ? ""
                            : garontor2FullName
                        }
                      // onChange={handleGuranter2IdChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* No.3 Field */}
                    <div className="col-xl-1 col-lg-3 col-md-3 col-sm-3 text-start">
                      <div className="">
                        <label htmlFor="number3" className="small-label">
                          No.3
                        </label>
                        <input
                          type="text"
                          id="number3"
                          name="number3"
                          placeholder="A"
                          className="form-control small-placeholder"
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label
                        htmlFor="guarantor2MemberId"
                        className="small-label"
                      >
                        Member No.
                      </label>
                      <input
                        type="text"
                        id="guarantor2MemberId"
                        name="guarantor2MemberId"
                        className="form-control small-placeholder"
                        value={garontor3Id}
                        // value={Guranter3FormData.member_id}
                        onChange={(e) => { setGarontor3Id(e.target.value) }}
                      />
                    </div>
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label
                          htmlFor="guarantor2EmpCode"
                          className="small-label"
                        >
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="guarantor2EmpCode"
                          name="guarantor2EmpCode"
                          className="form-control small-placeholder"
                          value={
                            garontor3Id === ""
                              // Guranter3FormData.member_id === ""
                              ? ""
                              : garontor3EmpCode
                          }
                        // onChange={handleGuranter3IdChange}
                        />
                      </div>
                    </div>

                    <div className="col-xl col-lg-3 col-md col-sm text-start">
                      <label
                        htmlFor="guarantor3FullName"
                        className="small-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="guarantor3FullName"
                        name="guarantor3FullName"
                        className="form-control small-placeholder"
                        value={
                          garontor3Id === ""

                            // Guranter3FormData.member_id === ""
                            ? ""
                            : garontor3FullName
                        }
                      // onChange={handleGuranter3IdChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {/* Rec. By No. Field */}
                    <div className="col-xl-1 col-lg-3 col-md-3 col-sm-3 text-start">
                      <div className="">
                        <label htmlFor="guarantor1Name" className="small-label">
                          Rec.By
                        </label>
                        <input
                          type="text"
                          id="recByNumber"
                          name="recByNumber"
                          placeholder="A"
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
                        type="text"
                        id="recByMemberNo"
                        name="recByMemberNo"
                        className="form-control small-placeholder"
                        value={formData.recByMemberNo}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "recByMemberNo",
                              value: numericValue,
                            },
                          });
                        }}
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
                          value={formData.recByEmpCode}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "recByEmpCode",
                                value: numericValue,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                    {/* Rec. By Name Field */}
                    <div className="col-xl col-lg-3 col-md col-sm text-start">
                      <label htmlFor="guarantor1Name" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="recByName"
                        name="recByName"
                        className="form-control small-placeholder"
                        value={formData.recByName}
                        onChange={(e) => {
                          const cleanedValue = e.target.value.replace(
                            /[^A-Za-z. ]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "recByName",
                              value: cleanedValue,
                            },
                          });
                        }}
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
                        value={formData.sanctioningDate}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            sanctioningDate: e.target.value,
                          });
                        }}
                        readOnly
                      // required
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
                        value={formData.sanctionedDate}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "sanctionedDate",
                              value: e.target.value,
                            },
                          });
                        }}
                      // required
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
                        type="text"
                        id="sanctionedAmount"
                        name="sanctionedAmount"
                        placeholder="₹"
                        className="form-control small-placeholder"
                        value={formData.sanctionedAmount}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "sanctionedAmount",
                              value: numericValue,
                            },
                          });
                        }}
                      // required
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
                    {/* Loan Date Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="loan_date"
                          style={{ color: "dodgerblue" }}
                        >
                          Loan Date
                        </label>
                        <input
                          type="date"
                          className="form-control bg-white"
                          id="loan_date"
                          name="loan_date"
                          readOnly
                          value={LoanDate}
                        // value={formData.loan_date}
                        // onChange={(e) => {
                        //   handleInputChange({
                        //     target: {
                        //       name: "loan_date",
                        //       value: e.target.value,
                        //     },
                        //   });
                        // }}
                        // required
                        />
                      </div>
                    </div>

                    {/* Loan Amount Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="loan_amount"
                          style={{ color: "dodgerblue" }}
                        >
                          Loan Amount(₹)
                        </label>
                        <input
                          type="text"
                          id="loan_amount"
                          name="loan_amount"
                          placeholder="₹"
                          className="form-control small-placeholder"
                          value={formData.loan_amount}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "loan_amount",
                                value: numericValue,
                              },
                            });
                          }}
                        // required
                        />
                      </div>
                    </div>

                    {/* MICR No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="MICR_no"
                          style={{ color: "red" }}
                        >
                          MICR No.
                        </label>
                        <input
                          type="text"
                          id="MICR_no"
                          name="MICR_no"
                          className="form-control small-placeholder"
                          value={formData.MICR_no}
                          // max="999999999"
                          maxLength="9"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "MICR_no", value: numericValue },
                            });
                          }}
                        // required
                        />
                      </div>
                    </div>
                    {/* ECS No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="ecsNo"
                          style={{ color: "red" }}
                        >
                          ECS No.
                        </label>
                        <input
                          type="text"
                          id="ecsNo"
                          name="ecsNo"
                          className="form-control small-placeholder"
                          value={formData.ecsNo}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "ecsNo", value: numericValue },
                            });
                          }}
                        // required
                        />
                      </div>
                    </div>
                    {/* Voucher No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="voucherNo"
                          style={{ color: "black" }}
                        >
                          Voucher No.
                        </label>
                        <input
                          type="text"
                          id="voucherNo"
                          name="voucherNo"
                          className="form-control small-placeholder"
                          value={formData.voucherNo}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "voucherNo",
                                value: numericValue,
                              },
                            });
                          }}
                        // required
                        />
                      </div>
                    </div>
                    {/* Field 1 */}
                    {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-2 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      id="field1"
                      name="field1"
                      value={formData.field1}
                      onChange={(e) => {
                        handleInputChange({
                          target: { name: "field1", value: e.target.value },
                        });
                      }}
                    />
                  </div> */}

                    {/* Field 2 */}
                    {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-2 mt-2">
                    <input
                      type="text"
                      className="form-control"
                      id="field2"
                      name="field2"
                      value={formData.field2}
                      onChange={(e) => {
                        handleInputChange({
                          target: { name: "field2", value: e.target.value },
                        });
                      }}
                    />
                  </div> */}

                    {/* Cash Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="cash"
                          style={{ color: "dodgerblue" }}
                        >
                          Cash
                        </label>
                        <input
                          type="text"
                          id="cash"
                          name="cash"
                          className="form-control small-placeholder"
                          value={formData.cash}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "cash", value: numericValue },
                            });
                          }}
                        // required
                        />
                      </div>
                    </div>
                    {/* Select Field */}
                    {/* <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          htmlFor="selectField"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Select Field
                        </label>
                        <select
                          id="selectField"
                          name="selectField"
                          className="form-control"
                          // onChange={handleSelectChange}
                          value={formData.selectField}
                        >
                          <option value="select">Select </option>

                          <option value="bank">Bank</option>
                          <option value="chequeNo">Cheque No.</option>
                          <option value="transfer">Transfer</option>
                        </select>
                      </div>
                    </div> */}

                    {/* Bank Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          htmlFor="bank"
                          className="small-label"
                          style={{ color: "dodgerblue" }}
                        >
                          Bank
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="bank"
                          name="bank"
                          value={formData.bank}
                          onChange={handleInputChange}
                        // disabled={formData.selectField !== "bank"}
                        />
                      </div>
                    </div>

                    {/* Cheque No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="chequeNo"
                          style={{ color: "dodgerblue" }}
                        >
                          Cheque No.
                        </label>
                        <input
                          type="text"
                          id="chequeNo"
                          name="chequeNo"
                          className="form-control"
                          value={formData.chequeNo}
                          onChange={handleInputChange}
                        // disabled={formData.selectField !== "chequeNo"}
                        />
                      </div>
                    </div>

                    {/* Transfer Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="transfer"
                          style={{ color: "dodgerblue" }}
                        >
                          Transfer
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="transfer"
                          name="transfer"
                          value={formData.transfer}
                          onChange={handleInputChange}
                        // disabled={formData.selectField !== "transfer"}
                        />
                      </div>
                    </div>

                    {/* Disbursed By Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="disbursedBy"
                          style={{ color: "dodgerblue" }}
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
                              value={formData.field1}
                              onChange={(e) => {
                                handleInputChange({
                                  target: {
                                    name: "field1",
                                    value: e.target.value,
                                  },
                                });
                              }}
                            // required
                            />
                          </div>
                          <div className="col-md-6 mb-2">
                            <input
                              type="text"
                              className="form-control"
                              id="field2"
                              name="field2"
                              value={formData.field2}
                              onChange={(e) => {
                                handleInputChange({
                                  target: {
                                    name: "field2",
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
                    {/* Sanction By Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="mb-2">
                        <label
                          className="small-label"
                          htmlFor="sanctionedBy"
                          style={{ color: "dodgerblue" }}
                        >
                          Sanctioned By
                        </label>
                        <select
                          className="form-control form-select"
                          id="sanctionedBy"
                          name="sanctionedBy"
                          value={formData.sanctionedBy}
                          onChange={(e) => {
                            handleInputChange({
                              target: {
                                name: "sanctionedBy",
                                value: e.target.value,
                              },
                            });
                          }}
                        // required
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
                        value={formData.remark}
                        onChange={(e) => {
                          handleInputChange({
                            target: { name: "remark", value: e.target.value },
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
                      onClick={handleSubmit}
                      // onClick={handleFormSubmit}
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
