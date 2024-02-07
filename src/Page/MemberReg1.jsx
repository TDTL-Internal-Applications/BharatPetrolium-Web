import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Form from "../Images/resume_942748.png";

export default function MemberReg1() {
  const [currentForm, setCurrentForm] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  let [photono, setPhotono] = useState("");
  let [addressno, setAddressno] = useState("");
  // let [nativeplace_address, setNativeplace_address] = useState("");

  let PHOTONO = "";
  let ADDRESSNO = "";
  // let NATIVEADDRESSNO = "";

  let [invalid, setInvalid] = useState(Array.from({ length: 29 }, () => false));

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function setUPData() {
    setFormData((prevData) => {
      return {
        ...prevData,
        photono: photono,
        // nativeplace_address: nativeplace_address,
        addressno: addressno,
      };
    });
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    if (isAnyFieldEmpty()) {
      console.log(formData);
      Swal.fire({
        icon: "error",
        title: "Please fill out all required fields",
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-button",
        },
        didOpen: () => {
          Swal.getPopup().style.color = "black";
          Swal.getPopup().style.borderRadius = "25px";
        },
      });
      console.log(formData);
      let reqiuredFieldArr = returningRequired();
      let temp = [...invalid];
      for (let i = 0; i < reqiuredFieldArr.length; i++) {
        if (formData[reqiuredFieldArr[i]] === "") {
          temp[i] = true;
        } else if (formData[reqiuredFieldArr[i]] === "Select") {
          temp[i] = true;
        } else if (formData[reqiuredFieldArr[i]] === "Select Gender") {
          temp[i] = true;
        } else {
          temp[i] = false;
        }
      }

      setInvalid(temp);

      return;
    }

    // returing reqiured MdTextFields
    function returningRequired() {
      let reqiuredFieldArr = [
        "initial",
        "firstName",
        "middleName",
        "lastName",
        "gender",
        "openingDate",
        "employeeNo",
        "birthDate",
        "age",
        "email",
        "panNo",
        "mobileNumber",
        "maritalStatus",
        "monthly_contri",
        "photoId",
        "photono",
        "addressProof",
        "addressno",
        "residentAddress",
        "resident_city",
        "resident_pincode",
        "nomineeName",
        "nomineeBirthDate",
        "nomineeAge",
        "nomineeRelation",
        "bankName",
        "branchName",
        "ifscCode",
        "bankSavingAcNo",
        "salary",
      ];
      return reqiuredFieldArr;
    }

    setIsLoading(true);
    console.log("Form Data:", formData);

    try {
      const ProfileData = new FormData();
      ProfileData.append("imagefile", file1);
      Object.keys(formData).forEach((key) => {
        ProfileData.append(key, formData[key]);
      });
      // ProfileData.append("formData", JSON.stringify(formData));

      const response = await axios.post(
        "http://127.0.0.1:8000/member_reg/",
        ProfileData
        // photono:photono,
      );
      console.log("Data submitted successfully:", response.data);
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Data submitted successfully!",
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-button",
        },
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
        },
      });
      setFormData({
        applicationDate: getCurrentDate(),
        shareappAmount: 500,
        memberShipFee: 100,
        totalAppAmount: 0,
        app_no: "",
        initial: "Select",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "Select Gender",
        openingDate: getCurrentDate(),
        mmemapp_no: "",
        posting: "Select",
        division: "",
        post: "",
        meeting_NO: "",
        meeting_date: "",
        resolution_No: "",
        resolutionDate: "",
        employeeNo: "",
        birthDate: "",
        age: "",
        bloodGroup: "",
        joinDate: "",
        confirmDate: "",
        retire_on: "",
        email: "",
        panNo: "",
        mobileNumber: "",
        maritalStatus: "",
        monthly_contri: "",
        saving_contri: "",
        salary: "",
        photoId: "",
        photono: "",
        addressProof: "",
        addressno: "",
        addressIssuedAt: "",
        addressIssuedOn: "",
        residentAddress: "",
        resident_city: "",
        nativeplace_city: "",
        resident_pincode: "",
        phoneNo: "",
        nativeplace_address: "",
        nativeplace_pincode: "",
        nomineeName: "",
        nomineeBirthDate: "",
        nomineeAge: "",
        nomineeRelation: "",
        bankName: "",
        branchName: "",
        ifscCode: "",
        bankSavingAcNo: "",
        setFile:null,
        setFile1:null,
        
      });

      let reqiuredFieldArr = returningRequired();
      let temp = [...invalid];
      for (let i = 0; i < reqiuredFieldArr.length; i++) {
        temp[i] = false;
      }

      setInvalid(temp);
    } catch (error) {
      console.error("Error submitting data:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.error_message
      ) {
        const errorMessage = error.response.data.error_message;

        let title, text;

        if (errorMessage.includes("Member already exists")) {
          title = "Member Already Exists";
          text = errorMessage;
        } else {
          title = "Error";
          text = errorMessage;
        }

        Swal.fire({
          icon: "info",
          title: title,
          text: text,
          customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-button",
          },
          didOpen: () => {
            // Swal.getPopup().style.background = "darkblue";
            Swal.getPopup().style.color = "black";
            Swal.getPopup().style.borderRadius = "25px";
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit data. Please try again.",
          customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-button",
          },
          didOpen: () => {
            // Swal.getPopup().style.background = "darkblue";
            Swal.getPopup().style.color = "black";
            Swal.getPopup().style.borderRadius = "25px";
          },
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isAnyFieldEmpty = () => {
    return (
      formData.initial === "Select" ||
      formData.firstName === "" ||
      formData.middleName === "" ||
      formData.lastName === "" ||
      formData.gender === "Select Gender" ||
      formData.openingDate === "" ||
      formData.employeeNo === "" ||
      formData.birthDate === "" ||
      formData.age === "" ||
      formData.email === "" ||
      formData.panNo === "" ||
      formData.mobileNumber === "" ||
      formData.mobileNumber.length < 10 ||
      formData.maritalStatus === "" ||
      formData.monthly_contri === "" ||
      formData.photoId === "" ||
      formData.photono === "" ||
      // photono === "" ||
      // addressno=== "" ||

      formData.addressProof === "" ||
      formData.addressno === "" ||
      formData.residentAddress === "" ||
      formData.resident_city === "" ||
      formData.resident_pincode === "" ||
      formData.nomineeName === "" ||
      formData.nomineeBirthDate === "" ||
      formData.nomineeAge === "" ||
      formData.nomineeRelation === "" ||
      formData.bankName === "" ||
      formData.branchName === "" ||
      formData.ifscCode === "" ||
      formData.bankSavingAcNo === "" ||
      formData.salary === ""
    );
  };
  const [formData, setFormData] = useState({
    applicationDate: getCurrentDate(),
    shareappAmount: 500,
    memberShipFee: 100,
    totalAppAmount: 0,
    app_no: "",
    initial: "Select",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Select Gender",
    openingDate: getCurrentDate(),
    mmemapp_no: "",
    posting: "Select",
    division: "",
    post: "",
    meeting_no: "",
    meeting_date: "",
    resolution_No: "",
    resolutionDate: "",
    employeeNo: "",
    birthDate: "",
    age: "",
    bloodGroup: "",
    joinDate: "",
    confirmDate: "",
    retire_on: "",
    email: "",
    panNo: "",
    mobileNumber: "",
    maritalStatus: "",
    monthly_contri: "",
    saving_contri: "",
    salary: "",
    photoId: "",
    photono: "",

    addressProof: "",
    addressno: "",
    addressIssuedAt: "",
    addressIssuedOn: "",
    residentAddress: "",
    resident_city: "",
    nativeplace_city: "",
    resident_pincode: "",
    phoneNo: "",
    nativeplace_address: "",
    nativeplace_pincode: "",
    nomineeName: "",
    nomineeBirthDate: "",
    nomineeAge: "",
    nomineeRelation: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    bankSavingAcNo: "",
    
  });

  useEffect(() => {
    updateTotalAppAmount(formData.shareappAmount, formData.memberShipFee);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "photono") {
      PHOTONO = formData.photono;
    }
    if (name === "addressno") {
      ADDRESSNO = formData.addressno;
    }

    setFormData((prevData) => {
      let updatedFormData = { ...prevData, [name]: value };

      // Calculate age if birthDate or nomineeBirthDate is provided
      if (name === "birthDate" || name === "nomineeBirthDate") {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        if (
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
        ) {
          updatedFormData = {
            ...updatedFormData,
            [`${name === "birthDate" ? "age" : "nomineeAge"}`]: age - 1,
          };
        } else {
          updatedFormData = {
            ...updatedFormData,
            [`${name === "birthDate" ? "age" : "nomineeAge"}`]: age,
          };
        }
        // Calculate retire_on
        // const retireDate = new Date(birthDate);
        // retireDate.setFullYear(birthDate.getFullYear() + 60);

        // updatedFormData = {
        //   ...updatedFormData,
        //   retire_on: retireDate.toISOString().split("T")[0],
        // };
      }

      return updatedFormData;
    });
  };

  const updateTotalAppAmount = (shareAmount, membershipFee) => {
    const totalAmount =
      (parseFloat(shareAmount) || 0) + (parseFloat(membershipFee) || 0);
    handleInputChange({
      target: {
        name: "totalAppAmount",
        value: totalAmount.toFixed(2),
      },
    });
  };

  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);

  const placeholderImage =
    "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"; // Provide the path to your placeholder image

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const validImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/heic",
        "image/png",
      ];

      if (validImageTypes.includes(selectedFile.type)) {
        setFile(URL.createObjectURL(selectedFile));
        setFile1(selectedFile);
      } else {
        console.error(
          "Please select a valid image file (jpg, jpeg, heic, or png)."
        );
      }
    } else {
      setFile(null);
    }
  };

  function handleRemove() {
    // Function to remove the uploaded image
    console.log("Handling remove...");
    setFile(null);
  }

  function handlePlaceholderClick() {
    // Trigger the click event on the file input when the placeholder image is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />

          <div className="container d-flex text-start w-100 pb-1">
            <div className="row w-100">
              <div className="H1-Heading-Main">
                <img src={Form} alt="" /> Member Registration
              </div>
            </div>
          </div>
          <div className="container">
            {/* Your first form code */}
            <div className="row ">
              {/* Basic Information  */}
              <form>
                <div className="p-2">
                  <div className="H2-Sub-Heading ">Basic Information</div>
                  <div
                    className="row basic-info py-2"
                    style={{
                      backgroundColor: "#3498db",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
                      <div className="row mb-1">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <div class="">
                            <label
                              for="applicationDate"
                              className="small-label"
                            >
                              Application Date
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="date"
                              name="applicationDate"
                              className="form-control small-label bg-white"
                              value={formData.applicationDate}
                              onChange={handleInputChange}
                              min={getCurrentDate()}
                              required
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                          <div class=" ">
                            <label for="shareappAmount" className="small-label">
                              Share Application Amt
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              id="shareappAmount"
                              name="shareappAmount"
                              class="form-control small-label bg-white"
                              value={formData.shareappAmount}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                handleInputChange({
                                  target: {
                                    name: "shareappAmount",
                                    value: numericValue,
                                  },
                                });
                                updateTotalAppAmount(
                                  numericValue,
                                  formData.memberShipFee
                                );
                              }}
                              min={0}
                              required
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <div class="no-outline-login">
                            <label for="memberShipFee" className="small-label">
                              Entrance Fee
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control small-label bg-white"
                              id="memberShipFee"
                              name="memberShipFee"
                              value={formData.memberShipFee}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                handleInputChange({
                                  target: {
                                    name: "memberShipFee",
                                    value: numericValue,
                                  },
                                });
                                updateTotalAppAmount(
                                  formData.shareappAmount,
                                  numericValue
                                );
                              }}
                              min={0}
                              readOnly
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <div class="">
                            <label for="totalAppAmount" className="small-label">
                              Total Application Amt
                            </label>
                            <input
                              type="text"
                              class="form-control small-label bg-white"
                              id="totalAppAmount"
                              name="totalAppAmount"
                              value={formData.totalAppAmount}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                handleInputChange({
                                  target: {
                                    name: "totalAppAmount",
                                    value: numericValue,
                                  },
                                });
                              }}
                              min={0}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <label htmlFor="" className="small-label">
                            Initial<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            type="text"
                            name="initial"
                            class={
                              invalid[0]
                                ? "form-select small-label border-danger"
                                : "form-select small-label "
                            }
                            // id="floatingInput"
                            onChange={handleInputChange}
                            value={formData.initial}
                            required
                          >
                            <option>Select</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Shri">Shri</option>
                            <option value="Smt.">Smt.</option>
                            <option value="M/s.">M/s.</option>
                            <option value="Miss.">Miss.</option>
                            <option value="M.s">M.s</option>
                            <option value="Kumar">Kumar</option>
                            <option value="Kumari">Kumari</option>
                            <option value="Master">Master</option>
                          </select>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <div className="no-outline-login">
                            <label htmlFor="firstName" className="small-label">
                              First Name<span style={{ color: "red" }}>*</span>
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
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                const filteredValue = inputValue
                                  .replace(/[^A-Za-z ]/g, "")
                                  .slice(0, 20);

                                const capitalizedValue =
                                  filteredValue.charAt(0).toUpperCase() +
                                  filteredValue.slice(1);

                                handleInputChange({
                                  target: {
                                    name: "firstName",
                                    value: capitalizedValue,
                                  },
                                });
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                          <label htmlFor="middleName" className="small-label">
                            Middle Name<span style={{ color: "red" }}>*</span>
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
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                const filteredValue = inputValue
                                  .replace(/[^A-Za-z ]/g, "")
                                  .slice(0, 20);

                                const capitalizedValue =
                                  filteredValue.charAt(0).toUpperCase() +
                                  filteredValue.slice(1);

                                handleInputChange({
                                  target: {
                                    name: "middleName",
                                    value: capitalizedValue,
                                  },
                                });
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <div class="">
                            <label htmlFor="lastName" className="small-label">
                              Last Name<span style={{ color: "red" }}>*</span>
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
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                const filteredValue = inputValue
                                  .replace(/[^A-Za-z ]/g, "")
                                  .slice(0, 20);

                                const capitalizedValue =
                                  filteredValue.charAt(0).toUpperCase() +
                                  filteredValue.slice(1);

                                handleInputChange({
                                  target: {
                                    name: "lastName",
                                    value: capitalizedValue,
                                  },
                                });
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <label htmlFor="" className="small-label">
                            Email ID<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            class={
                              invalid[9]
                                ? "form-control small-label border-danger"
                                : "form-control small-label"
                            }
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <div className="no-outline-login">
                            <label htmlFor="panNo" className="small-label">
                              PAN No.<span style={{ color: "red" }}>*</span>
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
                              pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"
                              onChange={(e) => {
                                const panValue = e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Za-z0-9]/g, "");

                                // Ensure the PAN number is limited to 10 characters
                                const trimmedPan = panValue.slice(0, 10);

                                handleInputChange({
                                  target: {
                                    name: "panNo",
                                    value: trimmedPan,
                                  },
                                });
                              }}
                              required
                            />
                            {formData.panNo.length > 1 &&
                            formData.panNo.length < 10 ? (
                              <span
                                className="text-danger"
                                style={{ fontSize: "0.88em" }}
                              >
                                PAN No. must be 10 digits
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                          <label
                            htmlFor="mobileNumber
                    
                    "
                            className="small-label"
                          >
                            Mobile No.<span style={{ color: "red" }}>*</span>
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
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );

                                const trimmedValue = numericValue.slice(0, 10);

                                handleInputChange({
                                  target: {
                                    name: "mobileNumber",
                                    value: trimmedValue,
                                  },
                                });
                              }}
                            />
                            {formData.mobileNumber.length > 1 &&
                            formData.mobileNumber.length < 10 ? (
                              <span
                                className="text-danger"
                                style={{ fontSize: "0.88em" }}
                              >
                                Phone No. must be 10 digits
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                          <div class="">
                            <label for="maritalStatus" className="small-label">
                              Marital Status
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                              type="text"
                              name="maritalStatus"
                              class={
                                invalid[12]
                                  ? "form-select small-label border-danger"
                                  : "form-select small-label"
                              }
                              id="maritalStatus"
                              value={formData.maritalStatus}
                              onChange={handleInputChange}
                              required
                            >
                              <option>Select </option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                      <div className="Profile-img">
                        <div
                          onClick={handlePlaceholderClick}
                          style={{ cursor: "pointer" }}
                        >
                          {!file && (
                            <img src={placeholderImage} alt="Placeholder" />
                          )}
                        </div>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .heic, .png"
                          onChange={handleChange}
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          key={file}
                        />
                        {file && (
                          <>
                            <img src={file} alt="Uploaded" />
                            <button
                              onClick={handleRemove}
                              className="remove-button"
                              style={{ border: "none", background: "none" }}
                            >
                              <FaTimes
                                style={{
                                  background: "none",
                                  color: "red",
                                  cursor: "pointer",
                                }}
                              />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="H2-Sub-Heading ">Additional Information</div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="no-outline-login">
                        <label for="birthDate" className="small-label">
                          Gender<span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          name="gender"
                          className={
                            invalid[4]
                              ? "form-select small-label border-danger"
                              : "form-select small-label"
                          }
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                        >
                          <option>Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="no-outline-login">
                        <label for="openingDate" className="small-label">
                          Opening Date<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="date"
                          name="openingDate"
                          class="form-control small-label bg-white"
                          value={formData.openingDate}
                          onChange={handleInputChange}
                          required
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="">
                        <label for="mmemapp_no" className="small-label">
                          mmemapp No.
                        </label>
                        <input
                          type="text"
                          class="form-control small-label"
                          id="mmemapp_no"
                          name="mmemapp_no"
                          value={formData.mmemapp_no}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "mmemapp_no",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          maxLength={30}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="">
                        <label for="app_no" className="small-label">
                          Application No.
                        </label>
                        <input
                          type="text"
                          class="form-control small-label bg-white"
                          id="app_no"
                          name="app_no"
                          value={formData.app_no}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "app_no",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          maxLength={10}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class=" ">
                        <label for="employeeNo" className="small-label">
                          Emp No.<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          id="rdIemployeeNod"
                          name="employeeNo"
                          class={
                            invalid[6]
                              ? "form-control small-label border-danger"
                              : "form-control small-label"
                          }
                          value={formData.employeeNo}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "employeeNo",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label for="birthDate" className="small-label">
                        Birth Date<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        class={
                          invalid[7]
                            ? "form-control small-label border-danger"
                            : "form-control small-label"
                        }
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        min={0}
                        required
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label for="age" className="small-label">
                        Age<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        class="form-control small-label bg-white"
                        value={formData.age}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "age", value: numericValue },
                          });
                        }}
                        min={0}
                        maxLength={2}
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="bloodGroup" className="small-label">
                        Blood Group
                      </label>
                      <select
                        id="bloodGroup"
                        name="bloodGroup"
                        className="form-control small-label form-select"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address Proof */}
                <div className="p-2">
                  <div className="H2-Sub-Heading ">Address Proof</div>

                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="" className="small-label">
                        Photo ID<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        type="text"
                        name="photoId"
                        class={
                          invalid[14]
                            ? "form-select small-label border-danger"
                            : "form-select small-label"
                        }
                        id="photoId"
                        value={formData.photoId}
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
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div className="no-outline-login">
                        <label htmlFor="photono" className="small-label">
                          No.<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="photono"
                          className={
                            invalid[15]
                              ? "form-control small-label border-danger"
                              : "form-control small-label"
                          }
                          value={formData.photono}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="" className="small-label">
                        Address Proof<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        type="text"
                        name="addressProof"
                        class={
                          invalid[16]
                            ? "form-select small-label border-danger"
                            : "form-select small-label"
                        }
                        id="addressProof"
                        value={formData.addressProof}
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
                        <option value="ELECTRICITY_BILL">
                          Electricity Bill
                        </option>
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
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <div class="no-outline-login">
                        <label for="addressno" className="small-label">
                          No.<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="addressno"
                          class={
                            invalid[17]
                              ? "form-control small-label border-danger"
                              : "form-control small-label"
                          }
                          id="addressno"
                          value={formData.addressno}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="issuedAt" className="small-label">
                      Issued At.
                    </label>
                    <div>
                      <input
                        type="time"
                        name="issuedAt"
                        className="form-control small-label"
                        value={formData.issuedAt}
                        onChange={handleInputChange}
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
                        value={formData.issuedOn}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div> */}
                  </div>
                  {/* <div className="row"> */}

                  {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="addressIssuedAt" className="small-label">
                      Issued At.
                    </label>
                    <div>
                      <input
                        type="time"
                        name="addressIssuedAt"
                        className="form-control small-label"
                        value={formData.addressIssuedAt}
                        onChange={handleInputChange}
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
                        value={formData.addressIssuedOn}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div> */}
                  {/* </div> */}
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="row">
                        <div className="col-xl col-lg-12 col-md-12 col-sm-12 text-start">
                          <label
                            htmlFor="residentAddress"
                            className="small-label"
                          >
                            Residential Address
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div className="mb-1">
                            <textarea
                              type="text"
                              className={
                                invalid[18]
                                  ? "form-control border-danger"
                                  : "form-control"
                              }
                              id="residentAddress"
                              name="residentAddress"
                              value={formData.residentAddress}
                              // onChange={handleInputChange}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                const alphabeticValue = inputValue
                                  .replace(/[^A-Za-z]/g, "")
                                  .slice(0, 20);

                                handleInputChange({
                                  target: {
                                    name: "residentAddress",
                                    value: alphabeticValue,
                                  },
                                });
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-3 text-start">
                          <label htmlFor="city" className="small-label">
                            City<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="resident_city"
                            className={
                              invalid[19]
                                ? "form-control small-label border-danger"
                                : "form-control small-label"
                            }
                            id="resident_city"
                            value={formData.resident_city}
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              const alphabeticValue = inputValue
                                .replace(/[^A-Za-z]/g, "")
                                .slice(0, 20);

                              handleInputChange({
                                target: {
                                  name: "resident_city",
                                  value: alphabeticValue,
                                },
                              });
                            }}
                            required
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-3 text-start">
                          <div class="no-outline-login">
                            <label
                              for="resident_pincode"
                              className="small-label"
                            >
                              PinCode<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              name="resident_pincode"
                              class={
                                invalid[20]
                                  ? "form-control small-label border-danger"
                                  : "form-control small-label"
                              }
                              id="resident_pincode"
                              value={formData.resident_pincode}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                handleInputChange({
                                  target: {
                                    name: "resident_pincode",
                                    value: numericValue,
                                  },
                                });
                              }}
                              maxLength={6}
                              required
                            />
                          </div>
                        </div>
                        {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm text-start ">
                        <label htmlFor="phoneNo" className="small-label">
                          Phone No.
                        </label>
                        <div>
                          <input
                            type="tel"
                            name="phoneNo"
                            className="form-control small-label"
                            pattern="[0-9]*"
                            value={formData.phoneNo}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );

                              const trimmedValue = numericValue.slice(0, 10);

                              handleInputChange({
                                target: {
                                  name: "phoneNo",
                                  value: trimmedValue,
                                },
                              });
                            }}
                          />
                        </div>
                      </div> */}
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="row">
                        <div className="col-xl col-lg-12 col-md-12 col-sm-12 text-start">
                          <label
                            htmlFor="nativeplace_address"
                            className="small-label"
                          >
                            Native Place Address
                          </label>
                          <div className="mb-1">
                            <textarea
                              type="text"
                              className="form-control"
                              id="nativeplace_address"
                              name="nativeplace_address"
                              value={formData.nativeplace_address}
                              // onChange={(e) => {
                              //   const inputValue = e.target.value;

                              //   const alphabeticValue = inputValue
                              //     .replace(/[^A-Za-z]/g, "")
                              //     .slice(0, 20);

                              // }}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                const alphabeticValue = inputValue
                                  .replace(/[^A-Za-z]/g, "")
                                  .slice(0, 20);

                                handleInputChange({
                                  target: {
                                    name: "nativeplace_address",
                                    value: alphabeticValue,
                                  },
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 text-start">
                          <label htmlFor="" className="small-label">
                            City
                          </label>
                          <input
                            type="text"
                            name="nativeplace_city"
                            class="form-control small-label"
                            id="nativeplace_city"
                            value={formData.nativeplace_city}
                            // onChange={(e) => {
                            //   const inputValue = e.target.value;

                            //   const alphabeticValue = inputValue
                            //     .replace(/[^A-Za-z]/g, "")
                            //     .slice(0, 20);

                            //   handleInputChange({
                            //     target: {
                            //       name: "nativeplace_city",
                            //       value: alphabeticValue,
                            //     },
                            //   });
                            // }}
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              const alphabeticValue = inputValue
                                .replace(/[^A-Za-z]/g, "")
                                .slice(0, 20);

                              handleInputChange({
                                target: {
                                  name: "nativeplace_city",
                                  value: alphabeticValue,
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 text-start">
                          <div class="no-outline-login">
                            <label
                              for="nativeplace_pincode"
                              className="small-label"
                            >
                              PinCode
                            </label>
                            <input
                              type="text"
                              name="nativeplace_pincode"
                              class="form-control small-label"
                              id="nativeplace_pincode"
                              value={formData.nativeplace_pincode}
                              // onChange={handleInputChange}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );

                                handleInputChange({
                                  target: {
                                    name: "nativeplace_pincode",
                                    value: numericValue,
                                  },
                                });
                              }}
                              maxLength={6}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-2">
                  <div className="H2-Sub-Heading ">Service Details</div>

                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div class="no-outline-login">
                        <label htmlFor="" className="small-label">
                          Posting
                        </label>
                        <select
                          type="text"
                          name="posting"
                          class="form-select small-label"
                          value={formData.posting}
                          // id="floatingInput"
                          onChange={handleInputChange}
                        >
                          <option value="Account">Account</option>
                          <option value="Society">Society</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div class="no-outline-login">
                        <label for="" className="small-label">
                          Division
                        </label>
                        <select
                          type="text"
                          name="division"
                          class="form-select small-label"
                          // id="floatingInput"
                          onChange={handleInputChange}
                        >
                          <option>Select</option>
                          <option value="BPCL">BPCL</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start ">
                      <div class="no-outline-login">
                        <label htmlFor="post" className="small-label">
                          Post
                        </label>
                        <select
                          type="text"
                          name="post"
                          class="form-select small-label"
                          // id="floatingInput"
                          onChange={handleInputChange}
                        >
                          <option>Select</option>
                          <option value="BPCL">BPCL</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Meeting No. and Date
                      </label>
                      <div>
                        <div className="row">
                          <div className="col-sm-5 mb-2">
                            <input
                              className="form-control small-label"
                              id="meeting_no"
                              name="meeting_no"
                              value={formData.meeting_no}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                handleInputChange({
                                  target: {
                                    name: "meeting_no",
                                    value: numericValue,
                                  },
                                });
                              }}
                            />
                          </div>
                          <div className="col-sm-7">
                            <input
                              type="date"
                              className="form-control small-label"
                              id="meeting_date"
                              name="meeting_date"
                              style={{ width: "100%" }}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label for="joinDate" className="small-label">
                        Join Date
                      </label>
                      <input
                        type="date"
                        id="joinDate"
                        name="joinDate"
                        class="form-control small-label"
                        value={formData.joinDate}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label for="confirmDate" className="small-label">
                        Confirmed On
                      </label>
                      <input
                        type="date"
                        id="confirmDate"
                        name="confirmDate"
                        class="form-control small-label"
                        value={formData.confirmDate}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label for="retire_on" className="small-label">
                        Retire On
                      </label>
                      <input
                        type="date"
                        id="retire_on"
                        name="retire_on"
                        class="form-control small-label"
                        // placeholder="Enter Employee No"
                        value={formData.retire_on}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Resolution No. and Date
                      </label>
                      <div>
                        <div className="row">
                          <div className="col-sm-5 mb-2">
                            <input
                              type="text"
                              className="form-control small-label"
                              id="resolution_No"
                              name="resolution_No"
                              value={formData.resolution_No}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                handleInputChange({
                                  target: {
                                    name: "resolution_No",
                                    value: numericValue,
                                  },
                                });
                              }}
                            />
                          </div>
                          <div className="col-sm-7">
                            <input
                              type="date"
                              className="form-control small-label"
                              id="resolutionDate"
                              name="resolutionDate"
                              value={formData.resolutionDate}
                              style={{ width: "100%" }}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly Contribution */}
                <div
                  className="p-2"
                  style={{
                    backgroundColor: "#3498db",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  <div className="row pb-2">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="monthly_contri" className="small-label ">
                        Monthly Contribution
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="monthly_contri"
                        className={
                          invalid[13]
                            ? "form-control small-label border-danger"
                            : "form-control small-label "
                        }
                        value={formData.monthly_contri}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );

                          handleInputChange({
                            target: {
                              name: "monthly_contri",
                              value: numericValue,
                            },
                          });
                        }}
                        required
                        maxLength={6}
                      />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                      <div className="no-outline-login">
                        <label htmlFor="saving_contri" className="small-label ">
                          Saving Contribution
                        </label>
                        <input
                          type="text"
                          name="saving_contri"
                          className="form-control small-label"
                          id="saving_contri"
                          value={formData.saving_contri}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Allow only numeric values

                            handleInputChange({
                              target: {
                                name: "saving_contri",
                                value: numericValue,
                              },
                            });
                          }}
                          maxLength={6}
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                      <label htmlFor="salary" className="small-label ">
                        Salary<span style={{ color: "red" }}>*</span>
                      </label>
                      <div>
                        <input
                          type="text"
                          name="salary"
                          className={
                            invalid[29]
                              ? "form-control small-label border-danger"
                              : "form-control small-label"
                          }
                          // className="form-control small-label"
                          value={formData.salary}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Allow only numeric values

                            handleInputChange({
                              target: {
                                name: "salary",
                                value: numericValue,
                              },
                            });
                          }}
                          maxLength={8}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="row">
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
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        const alphabeticValue = inputValue
                          .replace(/[^A-Za-z ]/g, "")
                          .slice(0, 20);

                        handleInputChange({
                          target: {
                            name: "memberName",
                            value: alphabeticValue,
                          },
                        });
                      }}
                    />
                  </div>
                </div> */}

                {/* Bank Details */}
                <div className="p-2">
                  <div className="H2-Sub-Heading ">Bank Details</div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="bankName" className="small-label">
                        Bank Name<span style={{ color: "red" }}>*</span>
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
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          const alphabeticValue = inputValue
                            .replace(/[^A-Za-z ]/g, "")
                            .slice(0, 30);

                          handleInputChange({
                            target: {
                              name: "bankName",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="branchName" className="small-label">
                        Branch Name<span style={{ color: "red" }}>*</span>
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
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          const alphabeticValue = inputValue
                            .replace(/[^A-Za-z ]/g, "")
                            .slice(0, 30);

                          handleInputChange({
                            target: {
                              name: "branchName",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="ifscCode" className="small-label">
                        IFSC Code<span style={{ color: "red" }}>*</span>
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
                        onChange={(e) => {
                          const alphanumericValue = e.target.value
                            .toUpperCase()
                            .replace(/[^A-Z0-9]/g, "");

                          handleInputChange({
                            target: {
                              name: "ifscCode",
                              value: alphanumericValue,
                            },
                          });
                        }}
                        required
                        maxLength={11}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="bankSavingAcNo" className="small-label">
                        Bank Saving A/c No.
                        <span style={{ color: "red" }}>*</span>
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
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only numeric values

                          handleInputChange({
                            target: {
                              name: "bankSavingAcNo",
                              value: numericValue,
                            },
                          });
                        }}
                        maxLength={17}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Nominee Details */}
                <div className="p-2">
                  <div className="H2-Sub-Heading ">Nominee Details</div>
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="nomineeName" className="small-label">
                        Nominee Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className={
                          invalid[21]
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        id="nomineeName"
                        name="nomineeName"
                        value={formData.nomineeName}
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          // Remove numeric characters and limit to 30 characters
                          const nonNumericValue = inputValue
                            .replace(/[^A-Za-z ]/g, "")
                            .slice(0, 20);

                          handleInputChange({
                            target: {
                              name: "nomineeName",
                              value: nonNumericValue,
                            },
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="nomineeBirthDate" className="small-label">
                        BirthDate<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="date"
                        className={
                          invalid[22]
                            ? "form-control border-danger"
                            : "form-control"
                        }
                        id="nomineeBirthDate"
                        name="nomineeBirthDate"
                        value={formData.nomineeBirthDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="nomineeAge" className="small-label ">
                        Age<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="number"
                        // className={(invalid[23])?"form-control no-outline bg-white border-danger":"form-control no-outline bg-white"}
                        className="form-control bg-white"
                        id="nomineeAge"
                        name="nomineeAge"
                        value={formData.nomineeAge}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          const limitedValue = numericValue.slice(0, 2);

                          handleInputChange({
                            target: {
                              name: "nomineeAge",
                              value: limitedValue,
                            },
                          });
                        }}
                        readOnly
                        required
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                      <label htmlFor="nomineeRelation" className="small-label">
                        Relation<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        type="text"
                        className={
                          invalid[24]
                            ? "form-control form-select border-danger"
                            : "form-control form-select"
                        }
                        id="nomineeRelation"
                        name="nomineeRelation"
                        value={formData.nomineeRelation}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Husband">Husband</option>
                        <option value="Wife">Wife</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Friend">Friend</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>

              <div className="row mt-2 mb-3">
                <div className="col-12 d-flex justify-content-center">
                  {!isLoading && (
                    <button
                      type="button"
                      className="mt-2 mx-2"
                      onClick={handleFormSubmit}
                      style={{
                        padding: "10px 25px 10px 25px",
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "16px",
                        position: "relative",
                      }}
                      disabled={isLoading}
                    >
                      Submit
                    </button>
                  )}

                  {isLoading && (
                    <div className="overlay">
                      <span className="submit-loader"></span>
                      <div className="loading-text mt-4">Please Wait...</div>
                    </div>
                  )}

                  {/* <Link to="/Home">
                    <button
                      type="button"
                      className="mt-2 mx-2"
                      // onClick={handleCancel}
                      style={{
                        padding: "10px 25px 10px 25px",
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
                  </Link> */}
                </div>
                {/* <></> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
