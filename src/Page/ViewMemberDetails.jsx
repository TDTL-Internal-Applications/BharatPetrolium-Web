// import React from 'react'
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";
import { Link } from "react-router-dom";
import { MdTextFields } from "react-icons/md";
import DataTable from "react-data-table-component";

export default function ViewMemberDetails(props) {
  let [invalid, setInvalid] = useState(Array.from({ length: 29 }, () => false));
  const [formData, setFormData] = useState({
    // accountType: "Term Deposit",
    // accountNumber: "",
    StartDate: "",
    initial: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    age: "",
    member_id: "",
    address: "",
    resident_city: "",
    resident_pincode: "",
    mobileNumber: "",
    panNo: "",
    employeeNo: "",
    balance: "",
    posting: "",
    division: "",
    post: "",
    bankName: "",
    branchName: "",
    memberNo: "",
    memberName: "",
    // bankAcNo: "",
    bankSavingAcNo: "",
    ifscCode: "",
    uidNo: "",
    nomineeName: "",
    nomineeBirthDate: "",
    nomineeAge: "",
    nomineeRelation: "",
    contributedBy: "",
    introducerNo: "",
    meetingDate: "",
    resolutionDate: "",
    joinDate: "",
    bloodGroup: "",
    email: "",
    maritalStatus: "",
    photoId: "",
    photono: "",
    addressProof: "",
    addressProof_No: "",
    residentAddress: "",
    nativePlaceAddress: "",
    phoneNo: "",
    opening_date: " ",
    post: "",
    meeting_no: "",
    meeting_date: "",
    resolution_no: "",
    resolution_date: "",
    monthly_contribution: "",
    salary: "",
    nativeplace_city: "",
    nativeplace_pincode: "",
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
  const handleMemberIdChange = (e) => {
    const memberId = e.target.value;
    props.toChangeMemberId(memberId);
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
        resident_pincode: "",
        resident_city: "",
        address: "",
        bankName: "",
        branchName: "",
        bankSavingAcNo: "",
        ifscCode: "",
        nomineeName: "",
        nomineeBirthDate: "",
        nomineeAge: "",
        nomineeRelation: "",
        employeeNo: "",
        bloodGroup: "",
        maritalStatus: "",
        photoId: "",
        photono: "",
        addressProof: "",
        addressProof_No: "",
        residentAddress: "",
        nativePlaceAddress: "",
        phoneNo: "",
        opening_date: " ",
        division: "",
        post: "",
        meeting_no: "",
        meeting_date: "",
        resolution_no: "",
        resolution_date: "",
        monthly_contribution: "",
        salary: "",
        nativeplace_city: "",
        nativeplace_pincode: "",
      }));
      return;
    }

    axios
      .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`)
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const memberData = ress.data.members[0];

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
            pinCode: memberData["pincode"],
            city: memberData["city"],
            address: memberData["nativeplace_address"],
            bankName: memberData["bank_name"],
            branchName: memberData["branch_name"],
            bankAcNo: memberData["bank_ac_no"],
            ifscCode: memberData["IFSC_code"],
            nomineeName: memberData["nominee_name"],
            nomineeBirthDate: memberData["nominee_birthdate"],
            nomineeAge: memberData["nominee_age"],
            nomineeRelation: memberData["relation"],
            bloodGroup: memberData["blood_group"],
            joinDate: memberData["join_date"],
            confirmDate: memberData["confirmed_on"],
            maritalStatus: memberData["marital_status"],
            photoId: memberData["photoId"],
            photono: memberData["photono"],
            addressProof: memberData["address_proof"],
            addressProof_No: memberData["addressno"],
            residentAddress: memberData["resident_address"],
            nativePlaceAddress: memberData["nativeplace_address"],
            bankSavingAcNo: memberData["bank_ac_no"],
            phoneNo: memberData["phoneno"],
            openingDate: memberData["opening_date"],
            posting: memberData["posting"],
            division: memberData["division"],
            post: memberData["post"],
            meeting_no: memberData["meeting_no"],
            meeting_date: memberData["meeting_date"],
            resolution_no: memberData["resolution_no"],
            resolution_date: memberData["resolution_date"],
            monthly_contribution: memberData["monthly_contribution"],
            salary: memberData["salary"],
            resident_pincode: memberData["resident_pincode"],
            resident_city: memberData["resident_city"],
            nativeplace_city: memberData["nativeplace_city"],
            nativeplace_pincode: memberData["nativeplace_pincode"],
            employeeNo: memberData["emp_no"],
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

  //for modal
  useEffect(() => {
    if (formData.member_id) {
      fetchData();
    }
  }, [formData.member_id]);

  const columns = [
    // {
    //   name: "Sr No.",
    //   selector: "RDID",
    //   sortable: true,
    //   center: true,
    //   style: {
    //     borderRight: "1px solid #ddd",
    //   },
    // },
    {
      name: "Mr_mrs",
      selector: "member_id",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Name",
      selector: "MonthlyDeposit",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Gender",
      selector: "InterestRate",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
      },
    },
    {
      name: "Relation",
      selector: "deposit_period",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "D_o_b",
      selector: "deposit_period",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    {
      name: "Age",
      selector: "deposit_period",
      sortable: true,
      center: true,

      style: {
        borderRight: "1px solid #ddd",
        textAlign: "center", // Add a right border to the column
      },
    },
    // {
    //   name: "Percentage",
    //   selector: "deposit_period",
    //   sortable: true,
    //   center: true,

    //   style: {
    //     borderRight: "1px solid #ddd",
    //     textAlign: "center", // Add a right border to the column
    //   },
    // },
    // {
    //   name: "Guardian",
    //   selector: "deposit_period",
    //   sortable: true,
    //   center: true,

    //   style: {
    //     borderRight: "1px solid #ddd",
    //     textAlign: "center", // Add a right border to the column
    //   },
    // },
    // {
    //   name: "Address",
    //   selector: "deposit_period",
    //   sortable: true,
    //   center: true,

    //   style: {
    //     borderRight: "1px solid #ddd",
    //     textAlign: "center", // Add a right border to the column
    //   },
    // },
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
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [transactions, setTransactions] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/rd_history/",
        {
          member_id: formData.member_id,
          Account_type: "Term Deposit",
          // RDID : RDID
        }
      );
      console.log("API Response:", response.data);
      setTransactions(response.data.Output);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />

          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">View Member Details</div>
          </div>
          <div className="container">
            {/* Your first form code */}
            <div className="row First-Main-Row  pt-3 mb-3 pb-2">
              {/* Basic Information  */}
              <form>
                <div className="H2-Sub-Heading ">Basic Information</div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div class=" ">
                      <label for="employeeNo" className="small-label">
                        Employee No*
                      </label>
                      <input
                        type="text"
                        id="rdId"
                        name="employeeNo"
                        class="form-control small-label"
                        // placeholder="Enter Employee No"
                        value={formData.employeeNo}
                        readOnly
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "employeeNo", value: numericValue },
                          });
                        }}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="memberId" className="small-label">
                        Member No*
                      </label>

                      <div className=" ">
                        <input
                          type="text"
                          id="memberId"
                          name="member_id"
                          class="form-control small-label"
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

                <div className="row">
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Initial*
                    </label>
                    <input
                      type="text"
                      name="initial"
                      className="form-control small-label"
                      // id="floatingInput"
                      //   onChange={handleInputChange}
                      value={formData.initial}
                      readOnly
                      required
                    ></input>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="no-outline-login">
                      <label htmlFor="firstName" className="small-label">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className={
                          invalid[1]
                            ? "form-control small-label border-danger"
                            : "form-control small-label"
                        }
                        id="firstName"
                        value={formData.firstName}
                        // onChange={(e) => {
                        //   const inputValue = e.target.value;

                        //   const filteredValue = inputValue
                        //     .replace(/[^A-Za-z ]/g, "")
                        //     .slice(0, 20);

                        //   const capitalizedValue =
                        //     filteredValue.charAt(0).toUpperCase() +
                        //     filteredValue.slice(1);

                        //   handleInputChange({
                        //     target: {
                        //       name: "firstName",
                        //       value: capitalizedValue,
                        //     },
                        //   });
                        // }}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="middleName" className="small-label">
                      Middle Name*
                    </label>
                    <div>
                      <input
                        type="text"
                        name="middleName"
                        className={
                          invalid[2]
                            ? "form-control small-label border-danger"
                            : "form-control small-label"
                        }
                        value={formData.middleName}
                        readOnly
                        // onChange={(e) => {
                        //   const inputValue = e.target.value;

                        //   const filteredValue = inputValue
                        //     .replace(/[^A-Za-z ]/g, "")
                        //     .slice(0, 20);

                        //   const capitalizedValue =
                        //     filteredValue.charAt(0).toUpperCase() +
                        //     filteredValue.slice(1);

                        //   handleInputChange({
                        //     target: {
                        //       name: "middleName",
                        //       value: capitalizedValue,
                        //     },
                        //   });
                        // }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label htmlFor="lastName" className="small-label">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className={
                          invalid[3]
                            ? "form-control small-label border-danger"
                            : "form-control small-label"
                        }
                        id="lastName"
                        value={formData.lastName}
                        readOnly
                        // onChange={(e) => {
                        //   const inputValue = e.target.value;

                        //   const filteredValue = inputValue
                        //     .replace(/[^A-Za-z ]/g, "")
                        //     .slice(0, 20);

                        //   const capitalizedValue =
                        //     filteredValue.charAt(0).toUpperCase() +
                        //     filteredValue.slice(1);

                        //   handleInputChange({
                        //     target: {
                        //       name: "lastName",
                        //       value: capitalizedValue,
                        //     },
                        //   });
                        // }}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="birthDate" className="small-label">
                        Gender*
                      </label>
                      <input
                        name="gender"
                        className="form-control small-label"
                        value={formData.gender}
                        readOnly
                        // onChange={handleInputChange}
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="openingDate" className="small-label">
                        Opening Date*
                      </label>
                      <input
                        type="date"
                        name="openingDate"
                        class="form-control small-label "
                        value={formData.openingDate}
                        // onChange={handleInputChange}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-4 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="memberId" className="small-label">
                        Member No*
                      </label>

                      <div className=" ">
                        <input
                          type="text"
                          id="memberId"
                          name="member_id"
                          class="form-control small-label"
                          value={formData.member_id}
                          // onChange={handleMemberIdChange}
                          // onChange={(e) => {
                          //   const numericValue = e.target.value.replace(
                          //     /[^0-9.]/g,
                          //     ""
                          //   );
                          //   handleMemberIdChange({
                          //     target: {
                          //       name: "member_id",
                          //       value: numericValue,
                          //     },
                          //   });
                          // }}
                          min={0}
                          readOnly
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label htmlFor="" className="small-label">
                        Posting*
                      </label>
                      <input
                        type="text"
                        name="posting"
                        class="form-control small-label"
                        value={formData.posting}
                        readOnly

                        // id="floatingInput"
                        // onChange={handleInputChange}
                      ></input>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="" className="small-label">
                        Division*
                      </label>
                      <input
                        type="text"
                        name="division"
                        class="form-control small-label"
                        value={formData.division}
                        readOnly
                        // id="floatingInput"
                        // onChange={handleInputChange}
                      ></input>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start ">
                    <div class="no-outline-login">
                      <label htmlFor="post" className="small-label">
                        Post*
                      </label>
                      <input
                        type="text"
                        name="post"
                        class="form-control small-label"
                        value={formData.post}
                        readOnly
                        // id="floatingInput"
                        // onChange={handleInputChange}
                      ></input>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Meeting No. and Date*
                    </label>
                    <div>
                      <div className="row">
                        <div className="col-sm-5 mb-2">
                          <input
                            className="form-control small-label"
                            id="meeting_no"
                            name="meeting_no"
                            value={formData.meeting_no}
                            readOnly
                            // onChange={(e) => {
                          />
                        </div>
                        <div className="col-sm-7">
                          <input
                            type="date"
                            className="form-control small-label"
                            id="meeting_date"
                            name="meeting_date"
                            style={{ width: "100%" }}
                            value={formData.meeting_date}
                            readOnly
                            // onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Resolution No. and Date*
                    </label>
                    <div>
                      <div className="row">
                        <div className="col-sm-5 mb-2">
                          <input
                            type="text"
                            className="form-control small-label"
                            id="resolution_no"
                            name="resolution_no"
                            value={formData.resolution_no}
                            readOnly
                          />
                        </div>
                        <div className="col-sm-7">
                          <input
                            type="date"
                            className="form-control small-label"
                            id="resolution_date"
                            name="resolution_date"
                            value={formData.resolution_date}
                            style={{ width: "100%" }}
                            readOnly
                            // onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class=" ">
                      <label for="employeeNo" className="small-label">
                        Emp No.*
                      </label>
                      <input
                        type="text"
                        id="rdId"
                        name="employeeNo"
                        class="form-control small-label"
                        // placeholder="Enter Employee No"
                        value={formData.employeeNo}
                        readOnly
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "employeeNo", value: numericValue },
                          });
                        }}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label for="birthDate" className="small-label">
                      Birth Date*
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      class={
                        invalid[7]
                          ? "form-control small-label "
                          : "form-control small-label"
                      }
                      value={formData.birthDate}
                      min={0}
                      readOnly
                      required
                    />
                  </div>
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label for="age" className="small-label">
                      Age*
                    </label>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      class="form-control small-label "
                      value={formData.age}
                      min={0}
                      maxLength={2}
                      readOnly
                    />
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="bloodGroup" className="small-label">
                      Blood Group*
                    </label>
                    <input
                      id="bloodGroup"
                      name="bloodGroup"
                      className="form-control small-label "
                      value={formData.bloodGroup}
                      readOnly
                      //   onChange={handleInputChange}
                    ></input>
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label for="joinDate" className="small-label">
                      Join Date*
                    </label>
                    <input
                      type="date"
                      id="joinDate"
                      name="joinDate"
                      class="form-control small-label"
                      value={formData.joinDate}
                      readOnly
                      //   onChange={handleInputChange}
                      min={0}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label for="confirmDate" className="small-label">
                      Confirmed On
                    </label>
                    <input
                      type="date"
                      id="confirmDate"
                      name="confirmDate"
                      class="form-control small-label"
                      value={formData.confirmDate}
                      readOnly
                      //   onChange={handleInputChange}
                      min={0}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label for="retire_on" className="small-label">
                      Retire On*
                    </label>
                    <input
                      type="date"
                      id="retire_on"
                      name="retire_on"
                      class="form-control small-label"
                      readOnly
                      // placeholder="Enter Employee No"
                      value={formData.retire_on}
                      //   onChange={handleInputChange}
                      min={0}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Email ID*
                    </label>
                    <input
                      type="email"
                      name="email"
                      class={
                        invalid[9]
                          ? "form-control small-label border-danger"
                          : "form-control small-label"
                      }
                      readOnly
                      value={formData.email}
                      //   onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="no-outline-login">
                      <label htmlFor="panNo" className="small-label">
                        PAN No.*
                      </label>
                      <input
                        type="text"
                        name="panNo"
                        className={
                          invalid[10]
                            ? "form-control small-label border-danger"
                            : "form-control small-label"
                        }
                        id="panNo"
                        value={formData.panNo}
                        readOnly
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <label
                      htmlFor="mobileNumber       "
                      className="small-label"
                    >
                      Mobile No.*
                    </label>
                    <div>
                      <input
                        type="text"
                        name="mobileNumber"
                        className={
                          invalid[11]
                            ? "form-control small-label border-danger"
                            : "form-control small-label"
                        }
                        value={formData.mobileNumber}
                        pattern="[0-9]*"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="maritalStatus" className="small-label">
                        Marital Status*
                      </label>
                      <input
                        type="text"
                        name="maritalStatus"
                        className="form-control small-label "
                        id="maritalStatus"
                        value={formData.maritalStatus}
                        readOnly
                        required
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="monthly_contribution"
                      className="small-label"
                    >
                      Monthly Contribution*
                    </label>
                    <input
                      type="text"
                      name="monthly_contribution"
                      className={
                        invalid[13]
                          ? "form-control small-label border-danger"
                          : "form-control small-label"
                      }
                      value={formData.monthly_contribution}
                      required
                      readOnly
                      maxLength={6}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="balance" className="small-label">
                      Balance*
                    </label>
                    <input
                      type="text"
                      name="balance"
                      className={
                        invalid[14]
                          ? "form-control small-label border-danger"
                          : "form-control small-label"
                      }
                      // value={formData.balance}
                      readOnly
                      required
                      maxLength={6}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="resignation_date" className="small-label">
                      Resign Date*
                    </label>
                    <input
                      type="date"
                      name="resignation_date"
                      readOnly
                      className={
                        invalid[15]
                          ? "form-control small-label border-danger"
                          : "form-control small-label"
                      }
                      // value={formData.resignation_date}

                      required
                    />
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="salary" className="small-label">
                      Salary*
                    </label>
                    <div>
                      <input
                        type="text"
                        name="salary"
                        className="form-control small-label"
                        value={formData.salary}
                        readOnly
                        maxLength={8}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Photo ID*
                    </label>
                    <input
                      type="text"
                      name="photoId"
                      className="form-control small-label"
                      id="photoId"
                      value={formData.photoId}
                      readOnly
                      //   onChange={handleInputChange}
                      required
                    ></input>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="no-outline-login">
                      <label htmlFor="photono" className="small-label">
                        No.*
                      </label>
                      <input
                        type="text"
                        name="photono"
                        className="form-control small-label"
                        value={formData.photono}
                        readOnly
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="issuedAt" className="small-label">
                      Issued At.
                    </label>
                    <div>
                      <input
                        type="time"
                        name="issuedAt"
                        className="form-control small-label"
                        readOnly
                        // value={formData.issuedAt}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="issuedOn" className="small-label">
                        Issued On
                      </label>
                      <input
                        type="date"
                        name="issuedOn"
                        class="form-control small-label"
                        id="issuedOn"
                        readOnly
                        // value={formData.issuedOn}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Address Proof*
                    </label>
                    <input
                      type="text"
                      name="addressProof"
                      className="form-control small-label"
                      value={formData.addressProof}
                      readOnly
                      required
                    ></input>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="addressProof_No" className="small-label">
                        No.*
                      </label>
                      <input
                        type="text"
                        name="addressProof_No"
                        className="form-control"
                        id="addressProof_No"
                        value={formData.addressProof_No}
                        readOnly
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="addressIssuedAt" className="small-label">
                      Issued At.
                    </label>
                    <div>
                      <input
                        type="time"
                        name="addressIssuedAt"
                        className="form-control small-label"
                        readOnly

                        // value={formData.addressIssuedAt}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="addressIssuedOn" className="small-label">
                        Issued On
                      </label>
                      <input
                        type="date"
                        name="addressIssuedOn"
                        class="form-control small-label"
                        id="addressIssuedOn"
                        readOnly
                        // value={formData.addressIssuedOn}
                        // onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="row">
                      <div className="col-xl col-lg-12 col-md-12 col-sm-12 text-start">
                        <label
                          htmlFor="residentAddress"
                          className="small-label"
                        >
                          Residential Address*
                        </label>
                        <div className="mb-1">
                          <textarea
                            type="text"
                            className="form-control"
                            id="residentAddress"
                            name="residentAddress"
                            value={formData.residentAddress}
                            // onChange={handleInputChange}
                            required
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-3 text-start">
                        <label htmlFor="resident_city" className="small-label">
                          City*
                        </label>
                        <input
                          type="text"
                          name="resident_city"
                          className={
                            invalid[19]
                              ? "form-control small-label "
                              : "form-control small-label"
                          }
                          id="resident_city"
                          value={formData.resident_city}
                          required
                          readOnly
                        />
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-3 text-start">
                        <div class="no-outline-login">
                          <label for="resident_pincode" className="small-label">
                            PinCode*
                          </label>
                          <input
                            type="text"
                            name="resident_pincode"
                            className="form-control"
                            id="resident_pincode"
                            value={formData.resident_pincode}
                            readOnly
                            maxLength={6}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm text-start ">
                        <label htmlFor="phoneNo" className="small-label">
                          Phone No.
                        </label>
                        <div>
                          <input
                            type="tel"
                            name="phoneNo"
                            className="form-control small-label"
                            pattern="[0-9]*"
                            readOnly
                            value={formData.phoneNo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="row">
                      <div className="col-xl col-lg-12 col-md-12 col-sm-12 text-start">
                        <label
                          htmlFor="nativePlaceAddress"
                          className="small-label"
                        >
                          Native Place Address *
                        </label>
                        <div className="mb-1">
                          <textarea
                            type="text"
                            className="form-control"
                            id="nativePlaceAddress"
                            name="nativePlaceAddress"
                            value={formData.nativePlaceAddress}
                            readOnly
                            // onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 text-start">
                        <label htmlFor="" className="small-label">
                          City*
                        </label>
                        <input
                          type="text"
                          name="nativeplace_city"
                          class="form-control small-label"
                          id="nativeplace_city"
                          value={formData.nativeplace_city}
                          readOnly
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 text-start">
                        <div class="no-outline-login">
                          <label
                            for="nativeplace_pincode"
                            className="small-label"
                          >
                            PinCode*
                          </label>
                          <input
                            type="text"
                            name="nativeplace_pincode"
                            class="form-control small-label"
                            id="nativeplace_pincode"
                            value={formData.nativeplace_pincode}
                            readOnly
                            maxLength={6}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="nomineeName" className="small-label">
                      Nominee Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nomineeName"
                      name="nomineeName"
                      value={formData.nomineeName}
                      readOnly
                      required
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="nomineeBirthDate" className="small-label">
                      BirthDate*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="nomineeBirthDate"
                      name="nomineeBirthDate"
                      value={formData.nomineeBirthDate}
                      //   onChange={handleInputChange}
                      readOnly
                      required
                    />
                  </div>
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="nomineeAge" className="small-label">
                      Age*
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="nomineeAge"
                      name="nomineeAge"
                      value={formData.nomineeAge}
                      readOnly
                      required
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="nomineeRelation" className="small-label">
                      Relation*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nomineeRelation"
                      name="nomineeRelation"
                      value={formData.nomineeRelation}
                      //   onChange={handleInputChange}
                      readOnly
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-xl-2 col-lg-2 col-md-2 col-sm-3 text-start"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <label className="small-label mt-3 ">Introduced By :</label>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-4 col-sm-3 text-start">
                    <label htmlFor="memberNo" className="small-label">
                      Member No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="memberNo"
                      name="memberNo"
                      value={formData.memberNo}
                      readOnly
                    />
                  </div>
                  <div className="col-xl-7 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="memberName" className="small-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control no-outline"
                      id="memberName"
                      name="memberName"
                      value={formData.memberName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="bankName" className="small-label">
                      Bank Name*
                    </label>
                    <input
                      type="text"
                      className={
                        invalid[25]
                          ? "form-control border-danger"
                          : "form-control"
                      }
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      readOnly
                      required
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="branchName" className="small-label">
                      Branch Name*
                    </label>
                    <input
                      type="text"
                      className={
                        invalid[26]
                          ? "form-control border-danger"
                          : "form-control"
                      }
                      id="branchName"
                      name="branchName"
                      value={formData.branchName}
                      readOnly
                      required
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="ifscCode" className="small-label">
                      IFSC Code*
                    </label>
                    <input
                      type="text"
                      className={
                        invalid[27]
                          ? "form-control no-outline border-danger"
                          : "form-control no-outline"
                      }
                      id="ifscCode"
                      name="ifscCode"
                      value={formData.ifscCode}
                      required
                      readOnly
                      maxLength={11}
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="bankSavingAcNo" className="small-label">
                      Bank Saving A/c No.*
                    </label>
                    <input
                      type="text"
                      className={
                        invalid[28]
                          ? "form-control border-danger"
                          : "form-control"
                      }
                      id="bankSavingAcNo"
                      name="bankSavingAcNo"
                      value={formData.bankSavingAcNo}
                      maxLength={20}
                      readOnly
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row mt-1 mb-1">
            <div className="col-sm d-flex justify-content-center">
              <Link to="/member-transactions-entries">
                <button
                  type="button"
                  className="mt-2 mx-2"
                  //   onClick={handleShowDetails}
                  style={{
                    padding: "5px 25px 5px 25px",
                    backgroundColor: "blue", // Choose a color for "Show Details" button
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "7px",
                    fontSize: "16px",
                  }}
                >
                  Show Entry
                </button>
              </Link>
              {/* <Link to="/member-loan-transactions-entries">
                <button
                  type="button"
                  className="mt-2 mx-2"
                  // onClick={handleShowGuarantees}
                  style={{
                    padding: "5px 25px 5px 25px",
                    backgroundColor: "orange",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "7px",
                    fontSize: "16px",
                  }}
                >
                  Show Guarantees
                </button>
              </Link> */}

              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                  style={{ maxWidth: "800px" }}
                >
                  <div class="modal-content">
                    <div class="modal-header" style={{background:'#004F83'}}>
                      <h5
                        class="modal-title text-light"
                        id="exampleModalLongTitle"
                      >
                        <strong>Member Nomination Details</strong>
                      </h5>
                      <button
                        type="button"
                        class="close text-light"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body ">
                      <div
                        data-spy="scroll"
                        data-target="#list-example"
                        data-offset="0"
                        class="scrollspy-example overflow-auto"
                        style={{ padding: "13px" }}
                      >
                        <div className="container d-flex justify-content-center">
                          <div
                            className="row py-2 w-100"
                            style={{
                              backgroundColor: "whiteSmoke",
                              borderRadius: "10px",
                            }}
                          >
                            <div className="col-12">
                              <form>
                                {/* 1st Row */}
                                <div className="row pb-1">
                                  <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text"
                                      className="small-label"
                                    >
                                      Member ID*
                                    </label>
                                    <input
                                      type="number"
                                      name="memberId"
                                      className="form-control no-outline"
                                      value={formData.member_id}
                                      onChange={(e) => {
                                        handleMemberIdChange(e.target.value);
                                      }}
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                      }}
                                      min={0}
                                      required
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text"
                                      className="small-label"
                                    >
                                      First Name*
                                    </label>
                                    <input
                                      type="text"
                                      name="firstName"
                                      className="form-control no-outline"
                                      value={formData.firstName}
                                      onChange={handleInputChange}
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                      }}
                                      required
                                      disabled
                                    />
                                  </div>
                                  <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text"
                                      className="small-label"
                                    >
                                      Last Name*
                                    </label>
                                    <input
                                      type="text"
                                      name="lastName"
                                      className="form-control no-outline"
                                      value={formData.lastName}
                                      onChange={handleInputChange}
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                      }}
                                      required
                                      disabled
                                    />
                                  </div>
                                  <div className="col-lg-2 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text"
                                      className="small-label"
                                    >
                                      Gender*
                                    </label>
                                    <select
                                      name="gender"
                                      className="form-select no-outline"
                                      value={formData.gender}
                                      onChange={handleInputChange}
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                        fontSize: "12px",
                                      }}
                                      required
                                      disabled
                                    >
                                      <option></option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  </div>
                                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text"
                                      className="small-label"
                                    >
                                      Email*
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      className="form-control no-outline"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                      }}
                                      required
                                      disabled
                                    />
                                  </div>
                                </div>

                                {/* 3rd Row */}
                                <div className="row pb-1">
                                  <div className="col-lg-3 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text"
                                      className="small-label"
                                    >
                                      Opening Date*
                                    </label>
                                    <input
                                      type="date"
                                      name="date"
                                      className="form-control no-outline"
                                      value={currentDate}
                                      onChange={handleInputChange}
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                      }}
                                      required
                                      disabled
                                    />
                                  </div>
                                  <div className="col-lg-3 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text"
                                      className="small-label"
                                    >
                                      Posting*
                                    </label>
                                    <select
                                      type="text"
                                      name="posting"
                                      className="form-select no-outline small-label"
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                        cursor: "pointer",
                                      }}
                                      required
                                      disabled
                                    >
                                      <option value="">Select an Option</option>
                                      <option value="Account">Account</option>
                                      <option value="Society">Society</option>
                                    </select>
                                  </div>
                                  <div className="col-lg-3 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text"
                                      className="small-label"
                                    >
                                      Division*
                                    </label>
                                    <select
                                      type="text"
                                      name="posting"
                                      className="form-select small-label"
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                        cursor: "pointer",
                                      }}
                                      required
                                      disabled
                                    >
                                      <option value="BPCL">BPCL</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                  <div className="col-lg-3 col-md-12 col-sm-12 form-fields">
                                    <label
                                      htmlFor="text "
                                      className="small-label"
                                    >
                                      Post*
                                    </label>
                                    <select
                                      type="text"
                                      name="posting"
                                      className="form-select small-label"
                                      style={{
                                        backgroundColor: "white",
                                        borderColor: "none",
                                        cursor: "pointer",
                                      }}
                                      required
                                      disabled
                                    >
                                      <option value=""></option>
                                    </select>
                                  </div>
                                </div>
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
                            <div className="col-12 pt-3">
                             
                              <div className="H1-Heading-Main">
                                {/* Transaction History */}
                              </div>
                              {formData.member_id !== "" ? (
                                <DataTable
                                  columns={columns}
                                  data={transactions}
                                  noHeader
                                  pagination={false}
                                  striped
                                  dense
                                  responsive
                                  customStyles={customStyles}
                                  // customStyles={{
                                  //   rows: {
                                  //     style: {
                                  //       maxHeight: "65px",
                                  //     },
                                  //   },
                                  // }}
                                />
                              ) : (
                                <p style={{ textAlign: "center" }}>
                                  No data available, Please Insert The Member
                                  ID!
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        style={{ width: "140px" }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        // onClick={handleSaveChanges}
                      >
                        Save changes
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="mt-2 mx-2"
                //   onClick={handleNomination}
                style={{
                  padding: "5px 25px 5px 25px",
                  backgroundColor: "purple", // Choose a color for "Nomination" button
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "7px",
                  fontSize: "16px",
                }}
                data-toggle="modal"
                data-target="#exampleModalCenter"
                // onClick={() => handleUpdate(row.member_id)}
              >
                Nomination
              </button>

              {/* <Link to="/member-nomination-details"> */}

              {/* </Link> */}
              <Link to="/Home">
                <button
                  type="button"
                  className="mt-2 mx-2"
                  //   onClick={handleCancel}
                  style={{
                    padding: "5px 25px 5px 25px",
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
