import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
export default function KYCUpdation() {
  const [fullName, setFullName] = useState("");
  let [MemberId, setMemberId] = useState("");

  const [formData, setFormData] = useState({
    initial: "",
    fullName: "",
    employeeNo: "",
    firstName: "",
    lastName: "",
    email: "",
    pan_no: "",
    photoId: "",
    photono: "",
    posting: "",
    division: "",
    post: "",
    Issued_at: "",
    address_proof: "",
    addressno: "",
    Issued_on: "",
    address_issued_at: "",
    address_issued_on: "",
  });
  useEffect(() => {
    // Fetch data based on MemberId or perform any other necessary actions
    if (MemberId !== "") {
      handleUpdate(MemberId);
    } else {
      // If MemberId is empty, set all fields to blank
      setUpdatedMemberData({
        initial: "",
        fullName: "",
        emp_no: "",
        firstName: "",
        lastName: "",
        email: "",
        pan_no: "",
        photoId: "",
        photono: "",
        posting: "",
        division: "",
        post: "",
        Issued_at: "",
        address_proof: "",
        addressno: "",
        Issued_on: "",
        address_issued_at: "",
        address_issued_on: "",
      });
      setFormData({
        initial: "",
        fullName: "",
        addressno: "",
        Issued_at: "",
        Issued_on: "",
        division: "",

        // ... other fields
      });
    }
  }, [MemberId]); // Include dependencies as needed

  const handleUpdate = async (member_id) => {
    try {
      const response = await axios.get(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${member_id}/`
      );

      const jsonData = response.data;

      if (jsonData.members && jsonData.members.length > 0) {
        const resultArray = jsonData.members[0];
        setSelectedMemberData(resultArray);
        setUpdatedMemberData({ ...resultArray });
        // Set formData based on updatedMemberData
        setFormData({
          initial: resultArray.initial,
          fullName: `${resultArray.first_name} ${resultArray.middle_name} ${resultArray.last_name}`,
          // ... other fields
        });
      } else {
        console.error("Unexpected response format or empty data");
      }
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const handleMemberIdChange = (e) => {
    const memberId = e.target.value;
    setMemberId(memberId);
    // Call handleUpdate with the new memberId
    handleUpdate(memberId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update both updatedMemberData and formData
    setUpdatedMemberData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [selectedMemberData, setSelectedMemberData] = useState({});
  const [updatedMemberData, setUpdatedMemberData] = useState({});


  const handleSaveChanges = async () => {
    try {
      // Check if MemberId is empty before making the request
      if (MemberId === "") {
        Swal.fire({
          title: "Error",
          text: "MemberId cannot be empty.",
          icon: "error",
        });
        return; // Exit the function if MemberId is empty
      }
  
      await axios.post(
        `http://bpcl.kolhapurdakshin.com:8000/kyc_update/`,
        updatedMemberData
      );
  
      Swal.fire({
        title: "Success",
        text: "Changes saved successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating member:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while saving changes.",
        icon: "error",
      });
    }
  };
  
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4 ">
          {/* Navbar */}
          <Header />
          {/* Heading1 Main */}
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">KYC Updation</div>
          </div>

          <div className="container">
            {/* Your first form code */}
            <div
              className="row First-Main-Row  pt-3 mb-1"
              style={{ width: "100%" }}
            >
              {/* Basic Information  */}
              <form>
                <div className="Border-Black px-2 py-2 mb-3">
                  <div className="row mb-2">
                    <div className="col-xl-4 col-lg-4 col-md-5 col-sm-5 text-start">
                      <div class=" ">
                        <label for="employeeNo" className="small-label">
                          Employee No*
                        </label>
                        <input
                          type="text"
                          id="rdId"
                          name="emp_no"
                          class="form-control small-label"
                          // placeholder="Enter Employee No"
                          value={updatedMemberData.emp_no}
                          readOnly
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleMemberIdChange({
                              target: {
                                name: "employeeNo",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md col-sm text-start"></div>
                    <div className="col-lg-4 col-lg-4 col-md-5 col-sm-5 form-fields">
                      <label htmlFor="text" className="small-label">
                        Member ID*
                      </label>
                      <input
                        type="number"
                        name="memberId"
                        className="form-control no-outline"
                        value={MemberId}
                        onChange={handleMemberIdChange}
                        style={{
                          backgroundColor: "white",
                          borderColor: "none",
                        }}
                        min={0}
                      />
                    </div>
                  </div>
                </div>
                <div className="row pb-1">
                  <div className="col-xl-1 col-lg-1 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Initial
                    </label>
                    <input
                      type="text"
                      name="initial"
                      className="form-control small-label"
                      onChange={handleInputChange}
                      value={updatedMemberData.initial}
                      readOnly
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control small-label"
                      onChange={handleInputChange}
                      value={formData.fullName}
                      readOnly
                      // value={
                      //   MemberId == ""
                      //     ? ""
                      //     : `${updatedMemberData.first_name}  ${updatedMemberData.middle_name} ${updatedMemberData.last_name}`
                      // }
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="text" className="small-label">
                      Posting*
                    </label>
                    <select
                      type="text"
                      name="posting"
                      value={updatedMemberData.posting}
                      onChange={handleInputChange}
                      className="form-select no-outline small-label"
                      style={{
                        backgroundColor: "white",
                        borderColor: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select an Option</option>
                      <option value="Account">Account</option>
                      <option value="Society">Society</option>
                    </select>
                  </div>
                  <div className=" col-xl-2 col-lg-2 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="text" className="small-label">
                      Division*
                    </label>
                    <select
                      type="text"
                      name="division"
                      value={updatedMemberData.division}
                      onChange={handleInputChange}
                      className="form-select small-label"
                      style={{
                        backgroundColor: "white",
                        borderColor: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="BPCL">BPCL</option>
                      <option value="Sub BPCL">Sub BPCL</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className=" col-xl-2 col-lg-2 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="text " className="small-label">
                      Post*
                    </label>
                    <select
                      type="text"
                      name="post"
                      value={updatedMemberData.post}
                      onChange={handleInputChange}
                      className="form-select small-label"
                      style={{
                        backgroundColor: "white",
                        borderColor: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value=""></option>
                      <option value="11">11</option>

                      <option value="10">10</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Photo ID*
                    </label>
                    <select
                      type="text"
                      name="photoId"
                      className="form-select small-label"
                      id="photoId"
                      value={updatedMemberData.photoId}
                      onChange={handleInputChange}
                      required
                    >
                      <option>Select</option>
                      <option value="PASSPORT">Passport</option>
                      <option value="VOTER_ID_CARD">Voter ID Card</option>
                      <option value="PAN_CARD">PAN Card</option>
                      <option value="GOVT_DEFENCE_ID_CARD">
                        Govt. Defence ID Card
                      </option>
                      <option value="ID_CARD_OF_REPUTED_EMPLOYER">
                        ID Card of Reputed Employer
                      </option>
                      <option value="DRIVING_LICENCE">Driving Licence</option>
                      <option value="PHOTO_ID_CARD_ISSUED_BY_POST_OFFICE">
                        Photo-ID Card Issued by Post Office
                      </option>
                      <option value="PHOTO_ID_CARD_ISSUED_BY_UNIVERSITIES_UGC">
                        Photo-ID Card Issued by Universities/UGC
                      </option>
                      <option value="LETTER_FROM_RECOGNIZED_PUBLIC_AUTHORITY">
                        Letter from Recognized Public Authority
                      </option>
                      <option value="UID_CARD">UID Card</option>
                      <option value="NONE">None</option>
                    </select>
                  </div>
                  <div className="col-xl col-lg col-md-6 col-sm-6 text-start">
                    <div className="no-outline-login">
                      <label htmlFor="photono" className="small-label">
                        No.*
                      </label>
                      <input
                        type="text"
                        name="photono"
                        maxLength={20}
                        className="form-control small-label"
                        value={updatedMemberData.photono}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="Issued_at" className="small-label">
                      Issued At.
                    </label>
                    <div>
                      <input
                        type="time"
                        name="Issued_at"
                        className="form-control small-label"
                        value={updatedMemberData.Issued_at}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="Issued_on" className="small-label">
                        Issued On
                      </label>
                      <input
                        type="date"
                        name="Issued_on"
                        class="form-control small-label"
                        id="Issued_on"
                        value={updatedMemberData.Issued_on}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Address Proof*
                    </label>
                    <select
                      type="text"
                      name="address_proof"
                      class="form-select small-label"
                      id="address_proof"
                      value={updatedMemberData.address_proof}
                      onChange={handleInputChange}
                      required
                    >
                      <option>Select</option>
                      <option value="PASSPORT">Passport</option>
                      <option value="CREDIT_CARD_STATEMENT">
                        Credit Card Statement
                      </option>
                      <option value="INCOME_TAX_WEALTH_TAX_ASSESMENT_ORDER">
                        Income Tax/Wealth Tax Assessment Order
                      </option>
                      <option value="SALARY_SLIP_WITH_ADDRESS">
                        Salary Slip with Address
                      </option>
                      <option value="ELECTRICITY_BILL">Electricity Bill</option>
                      <option value="TELEPHONE_BILL">Telephone Bill</option>
                      <option value="BANK_ACCOUNT_PASSBOOK_STATEMENT">
                        Bank Account Passbook/Statement
                      </option>
                      <option value="LETTER_FROM_EMPLOYER">
                        Letter from Employer
                      </option>
                      <option value="LETTER_FROM_ANY_AUTHORIZED_PUBLIC_AUTHORITY">
                        Letter from Any Authorized Public Authority
                      </option>
                      <option value="RATION_CARD">Ration Card</option>
                      <option value="COPIES_OF_REGISTERED_LEAVE_AND_LICENCE_SALES_DEED">
                        Copies of Registered Leave & Licence/Sales Deed
                      </option>
                      <option value="CERTIFICATE_ISSUED_BY_UNIVERSITY_INSTITUTE">
                        Certificate Issued by University/Institute
                      </option>
                      <option value="FOR_STUDENT_RESIDING_WITH_RELATIVE_ADDRESS_PROOF">
                        For Student Residing with Relative Address Proof
                      </option>
                      <option value="UID_CARD">UID Card</option>
                      <option value="SOCIETY_MAINTENANCE_RECEIPT">
                        Society Maintenance Receipt
                      </option>
                      <option value="PIPED_GAS_UTILITY_BILL">
                        Piped Gas Utility Bill
                      </option>
                      <option value="VOTERS_ID">Voter's ID</option>
                      <option value="DRIVING_LICENSE">Driving License</option>
                      <option value="NONE">None</option>
                    </select>
                  </div>
                  <div className="col-xl col-lg col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="addressno" className="small-label">
                        No.*
                      </label>
                      <input
                        type="text"
                        name="addressno"
                        class="form-control small-label"
                        id="addressno"
                        maxLength={20}
                        value={updatedMemberData.addressno}
                        // onChange={handleInputChange}

                        onChange={(e) => {
                          const newAddressno = e.target.value;
                          console.log("Input changed:", newAddressno);
                          handleInputChange({
                            target: {
                              name: "addressno",
                              value: newAddressno, // Update the value with the changed value
                            },
                          });
                        }}
                        required
                        
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="address_issued_at" className="small-label">
                      Issued At.
                    </label>
                    <div>
                      <input
                        type="time"
                        name="address_issued_at"
                        className="form-control small-label"
                        value={updatedMemberData.address_issued_at}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="address_issued_on" className="small-label">
                        Issued On
                      </label>
                      <input
                        type="date"
                        name="address_issued_on"
                        class="form-control small-label"
                        id="address_issued_on"
                        value={updatedMemberData.address_issued_on}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="no-outline-login">
                      <label htmlFor="panNo" className="small-label">
                        PAN No.*
                      </label>
                      <input
                        type="text"
                        name="pan_no"
                        className="form-control small-label"
                        id="pan_no"
                        maxLength={10}
                        value={updatedMemberData.pan_no}
                        // onChange={handleInputChange}
                        pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
                        onChange={(e) => {
                          const panValue = e.target.value
                            .toUpperCase()
                            .replace(/[^A-Za-z0-9]/g, "");

                          // Ensure the PAN number is limited to 10 characters
                          const trimmedPan = panValue.slice(0, 10);

                          handleInputChange({
                            target: {
                              name: "pan_no",
                              value: trimmedPan,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Form 60
                    </label>
                    <select
                      type="text"
                      className="form-select small-label"
                      id="floatingInput"
                      onChange={handleInputChange}
                    >
                      <option>Select an Option</option>
                      <option>Yes</option>
                      <option>No</option>

                    </select>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      UID No.
                    </label>
                    <input
                      type="text"
                      disabled
                      className="form-control small-placeholder"
                      id="floatingInput"
                      onChange={handleInputChange}
                      maxLength={12}
                      
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-sm d-flex justify-content-center">
              <button
                type="button"
                className="mt-2 mx-2"
                onClick={handleSaveChanges}
                style={{
                  padding: "5px 25px 5px 25px",
                  backgroundColor: "green",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "7px",
                  fontSize: "16px",
                }}
              >
                KYC Update
              </button>

              <Link to="/Home">
                <button
                  type="button"
                  className="mt-2 mx-2"
                  //   onClick={handleExit}
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
                  Exit
                </button>
              </Link>
            </div>
            {/* <></> */}
          </div>
        </div>
      </div>
    </>
  );
}
