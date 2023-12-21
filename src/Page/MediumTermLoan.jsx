import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";
// import "../Style/Global_Classes.scss";

export default function MediumTermLoan() {
  // Current Date
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
        gender: "",
        birthDate: "",
        age: "",
        email: "",
        panNo: "",
        mobileNumber: "",
        pinCode: "",
        city: "",
        address: "",
        bankName: "",
        branchName: "",
        bankAcNo: "",
        ifscCode: "",
        nomineeName: "",
        nomineeBirthdate: "",
        nomineeAge: "",
        nomineeRelation: "",
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
            gender: memberData["gender"],
            birthDate: memberData["birth_date"],
            age: memberData["age"],
            email: memberData["email"],
            panNo: memberData["pan_no"],
            mobileNumber: memberData["mobile_no"],
            pinCode: memberData["pincode"],
            city: memberData["city"],
            address: memberData["nativeplace_address"],
            bankName: memberData["bank_name"],
            branchName: memberData["branch_name"],
            bankAcNo: memberData["bank_ac_no"],
            ifscCode: memberData["IFSC_code"],
            nomineeName: memberData["nominee_name"],
            nomineeBirthdate: memberData["nominee_birthdate"],
            nomineeAge: memberData["nominee_age"],
            nomineeRelation: memberData["relation"],
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
    accountType: "Recurring Deposit",
    accountNumber: "",
    StartDate: getCurrentDate(),
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",

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
  useEffect(() => {
    // Set the default value and min attribute when the component mounts
    document.getElementById("openingDate").value = getCurrentDate();
    document.getElementById("openingDate").min = getCurrentDate();
  }, []);

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
                      <label htmlFor="memberId" className="small-label">
                        Member No
                      </label>
                      <div className="row">
                        <div className="col-sm-3 mb-1">
                          <input
                            type="text"
                            id="memberId"
                            name="member_id"
                            className="form-control   small-placeholder"
                            placeholder="A"
                            min={0}
                            // required
                          />
                        </div>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            id="memberId"
                            name="member_id"
                            className="form-control small-placeholder"
                            value={formData.member_id}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(
                                /[^0-9.]/g,
                                ""
                              );
                              handleInputChange({
                                target: {
                                  name: "member_id",
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
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label htmlFor="employeeno" className="small-label">
                        Emp Code
                      </label>
                      <input
                        type="text"
                        id="employeeno"
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
                  </div>
                  <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12 text-start">
                    <label htmlFor="fieldName" className="small-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="fieldName"
                      name="fieldName"
                      value={formData.fieldName}
                      onChange={(e) => {
                        handleInputChange({
                          target: { name: "fieldName", value: e.target.value },
                        });
                      }}
                      // required
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
                        className="form-control"
                        id="openingDate"
                        name="applicationdate"
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="applicationAmount"
                        style={{ color: "dodgerblue" }}
                      >
                        Application Amount(₹)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="applicationAmount"
                        name="applicationamount"
                        placeholder="₹"
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "applicationamount",
                              value: numericValue,
                            },
                          });
                        }}
                        value={formData.applicationamount} // Assuming you have formData in your state
                        min={0}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="bondNo"
                        style={{ color: "dodgerblue" }}
                      >
                        Bond No.
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="bondNo"
                        name="bondno"
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "bondno", value: numericValue },
                          });
                        }}
                        min={0}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 text-start">
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
                </div>
                <div className="row">
                  {/* Eligible Amount Field */}
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12  text-start">
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
                        id="eligibleAmount"
                        name="eligibleAmount"
                        placeholder="₹"
                        value={formData.eligibleAmount}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "eligibleAmount",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  {/* Deduction Field */}
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
                  {/* Months to Require Field */}
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12  text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="monthsToRequire"
                        style={{ color: "dodgerblue" }}
                      >
                        Months to Require
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="monthsToRequire"
                        name="monthsToRequire"
                        value={formData.monthsToRequire}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "monthsToRequire",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  {/* No of Installments Field */}
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12  text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="numberOfInstallments"
                        style={{ color: "black" }}
                      >
                        No. of Installments
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numberOfInstallments"
                        name="numberOfInstallments"
                        value={formData.numberOfInstallments}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "numberOfInstallments",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  {/* Interest Rate Field */}
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        htmlFor="interestRate"
                        className="small-label"
                        style={{color: "dodgerblue" }}
                      >
                        Interest Rate(%)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="interestRate"
                        name="interestRate"
                        placeholder="%"
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
                  {/* Installment Amount Field */}
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
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "installmentAmount",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  {/* Added By Dropdown */}
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="addedBy"
                        style={{ color: "red" }}
                      >
                        Added By
                      </label>
                      <select
                        className="form-control form-select"
                        id="addedBy"
                        name="addedBy"
                        value={formData.addedBy}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "addedBy",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      >
                        <option value="Select Operator">
                          Select Operator Name
                        </option>
                        <option value="M1">M1</option>
                        <option value="M2">M2</option>
                        <option value="M3">M3</option>
                      </select>
                    </div>
                  </div>
                  {/* Basic Salary Field */}
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label
                        className="small-label"
                        htmlFor="basicSalary"
                        style={{ color: "dodgerblue" }}
                      >
                        Basic Salary(₹)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="basicSalary"
                        name="basicSalary"
                        placeholder="₹"
                        value={formData.basicSalary}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "basicSalary",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                  {/* Salary Field */}
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
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "salary",
                              value: numericValue,
                            },
                          });
                        }}
                        // required
                      />
                    </div>
                  </div>
                </div>
                {/* Guarantor Section */}
                <div className="Border-Black px-2 mt-3 pb-2">
                  <div className="H2-Sub-Heading mt-2 ">GURANTER</div>
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
                          className="form-control small-placeholder"
                          min={0}
                        />
                      </div>
                    </div>

                    {/* Member No. Field */}
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label htmlFor="memberNo" className="small-label">
                        Member No.
                      </label>
                      <input
                        type="text"
                        id="memberNo"
                        name="memberNo"
                        className="form-control small-placeholder"
                        value={formData.memberNo}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "memberNo", value: numericValue },
                          });
                        }}
                      />
                    </div>

                    {/* Emp Code Field */}
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label htmlFor="empCode" className="small-label">
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="empCode"
                          name="empCode"
                          className="form-control small-placeholder"
                          value={formData.empCode}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "empCode", value: numericValue },
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* Name Field (Guarantor 1) */}
                    <div className="col-xl col-lg-3 col-md col-sm text-start">
                      <label htmlFor="guarantor1Name" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="guarantor1Name"
                        name="guarantor1Name"
                        className="form-control small-placeholder"
                        value={formData.guarantor1Name}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "guarantor1Name",
                              value: e.target.value,
                            },
                          });
                        }}
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
                          min={0}
                        />
                      </div>
                    </div>
                    {/* Member No. Field (Guarantor 2) */}
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label htmlFor="memberNo2" className="small-label">
                        Member No.
                      </label>
                      <input
                        type="text"
                        id="memberNo2"
                        name="memberNo2"
                        className="form-control small-placeholder"
                        value={formData.memberNo2}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "memberNo2", value: numericValue },
                          });
                        }}
                      />
                    </div>
                    {/* Emp Code Field (Guarantor 2) */}
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label htmlFor="empCode2" className="small-label">
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="empCode2"
                          name="empCode2"
                          className="form-control small-placeholder"
                          value={formData.empCode2}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "empCode2", value: numericValue },
                            });
                          }}
                        />
                      </div>
                    </div>
                    {/* Name Field (Guarantor 2) */}
                    <div className="col-xl col-lg-3 col-md col-sm text-start">
                      <label htmlFor="guarantor2Name" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="guarantor2Name"
                        name="guarantor2Name"
                        className="form-control small-placeholder"
                        value={formData.guarantor2Name}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "guarantor2Name",
                              value: e.target.value,
                            },
                          });
                        }}
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
                          className="form-control small-placeholder"
                          min={0}
                        />
                      </div>
                    </div>

                    {/* Member No. Field (Guarantor 3) */}
                    <div className="col-xl col-lg-3 col-md-3 col-sm-3 text-start">
                      <label htmlFor="memberNo3" className="small-label">
                        Member No.
                      </label>
                      <input
                        type="text"
                        id="memberNo3"
                        name="memberNo3"
                        className="form-control small-placeholder"
                        value={formData.memberNo3}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "memberNo3", value: numericValue },
                          });
                        }}
                      />
                    </div>

                    {/* Emp Code Field (Guarantor 3) */}
                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="">
                        <label htmlFor="empCode3" className="small-label">
                          Emp Code
                        </label>
                        <input
                          type="text"
                          id="empCode3"
                          name="empCode3"
                          className="form-control small-placeholder"
                          value={formData.empCode3}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "empCode3", value: numericValue },
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* Name Field (Guarantor 3) */}
                    <div className="col-xl col-lg-3 col-md col-sm text-start">
                      <label htmlFor="guarantor3Name" className="small-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="guarantor3Name"
                        name="guarantor3Name"
                        className="form-control small-placeholder"
                        value={formData.guarantor3Name}
                        onChange={(e) => {
                          handleInputChange({
                            target: {
                              name: "guarantor3Name",
                              value: e.target.value,
                            },
                          });
                        }}
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
                          handleInputChange({
                            target: {
                              name: "recByName",
                              value: e.target.value,
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
                        id="sanctioningDate"
                        name="sanctioningDate"
                        className="form-control"
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
                        style={{color: "red" }}
                      >
                        Sanctioned By
                      </label>
                      <input
                        type="text"
                        id="sanctionedBy"
                        name="sanctionedBy"
                        className="form-control small-placeholder"
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
                      />
                    </div>
                  </div>
                  {/* Sanctioned Amount Field */}
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label
                        htmlFor="sanctionedAmount"
                        className="small-label"
                        style={{color: "red" }}
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
                          style={{color: "dodgerblue" }}
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
                          htmlFor="loanDate"
                          style={{ color: "dodgerblue" }}
                        >
                          Loan Date
                        </label>
                        <input
                          type="date"
                          id="loanDate"
                          name="loanDate"
                          className="form-control"
                          // required
                        />
                      </div>
                    </div>
                    {/* Loan Amount Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="loanAmount"
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
                    {/* MICR No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="micrNo"
                          style={{ color: "dodgerblue" }}
                        >
                          MICR No.
                        </label>
                        <input
                          type="text"
                          id="micrNo"
                          name="micrNo"
                          className="form-control small-placeholder"
                          value={formData.micrNo}
                          // max="999999999"
                          maxLength="9"
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "micrNo", value: numericValue },
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
                          style={{color: "dodgerblue" }}
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
                          style={{ color: "dodgerblue" }}
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
                    {/* Bank Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          htmlFor="bank"
                          className="small-label"
                          style={{color: "dodgerblue" }}
                        >
                          Bank
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="bank"
                          name="bank"
                          value={formData.bank}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "bank", value: numericValue },
                            });
                          }}
                          // required
                        />
                      </div>
                    </div>
                    {/* Cheque No Field */}
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 text-start">
                      <div className="">
                        <label
                          className="small-label"
                          htmlFor="chequeNo"
                          style={{color: "dodgerblue" }}
                        >
                          Cheque No.
                        </label>
                        <input
                          type="text"
                          id="chequeNo"
                          name="chequeNo"
                          className="form-control"
                          value={formData.chequeNo}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "chequeNo", value: numericValue },
                            });
                          }}
                          // required
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
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: { name: "transfer", value: numericValue },
                            });
                          }}
                          // required
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
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "sanctionedBy",
                                value: numericValue,
                              },
                            });
                          }}
                          // required
                        >
                          <option value="Select Sanctioned By">
                            Select Sanctioned By
                          </option>
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
