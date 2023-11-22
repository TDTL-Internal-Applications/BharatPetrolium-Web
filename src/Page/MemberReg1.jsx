import React, { useState,useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function MemberReg1() {
  const [currentForm, setCurrentForm] = useState(1);
  
  const [employeeNumbers, setEmployeeNumbers] = useState([]);

  useEffect(() => {
    const fetchEmployeeNumbers = async () => {
      try {
        const response = await axios.fetch("http://127.0.0.1:8000/emp_data");
        setEmployeeNumbers(response.data);
      } catch (error) {
        console.error("Error fetching employee numbers:", error);
      }
    };

    // Fetch employee numbers on component mount
    fetchEmployeeNumbers();
  }, []); // Th
  const handleNextClick = () => {
    setCurrentForm((prevForm) => prevForm + 1);
  };

  const handleBackClick = () => {
    setCurrentForm((prevForm) => prevForm - 1);
  };

  const isAnyFieldEmpty = () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && !formData[key]) {
        return true;
      }
    }
    return false;
  };

  let isNotificationShown = false;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isAnyFieldEmpty() && !isNotificationShown) {
      toast.error("Please fill out all required fields");

      // Set the flag to true after showing the notification
      isNotificationShown = true;

      return;
    }

    // Reset the flag if the form is submitted again
    isNotificationShown = false;

    console.log("Form Data:", formData);

    axios
      .post("http://127.0.0.1:8000/member_reg/", formData)
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
          firstName: "",
          middleName: "",
          lastName: "",
          gender: "",
          openingDate: "",
          employeeNo: "",
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
          photoId: "",
          issuedAt: "",
          issuedOn: "",
          addressProof: "",
          addressIssuedAt: "",
          addressIssuedOn: "",
          residentAddress: "",
          nativePlaceAddress: "",
          city: "",
          pinCode: "",
          phoneNo: "",
          nomineeName: "",
          nomineeBirthDate: "",
          nomineeAge: "",
          nomineeRelation: "",

          // Form 3 fields
          memberNo: "",
          memberName: "",
          ifscCode: "",
          bankSavingAcNo: "",
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

  const [formData, setFormData] = useState({
    // Form 1 fields
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    openingDate: "",
    employeeNo: "",
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
    photoId: "",
    issuedAt: "",
    issuedOn: "",
    addressProof: "",
    addressIssuedAt: "",
    addressIssuedOn: "",
    residentAddress: "",
    nativePlaceAddress: "",
    city: "",
    pinCode: "",
    phoneNo: "",
    nomineeName: "",
    nomineeBirthDate: "",
    nomineeAge: "",
    nomineeRelation: "",

    // Form 3 fields
    memberNo: "",
    memberName: "",
    ifscCode: "",
    bankSavingAcNo: "",
    bankName: "",
    branchName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      let updatedFormData = { ...prevData, [name]: value };
  
      // Calculate age if birthDate is provided
      if (name === 'birthDate') {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
  
        // Adjust age if birthday hasn't occurred yet this year
        if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
          updatedFormData = { ...updatedFormData, age: age - 1 };
        } else {
          updatedFormData = { ...updatedFormData, age };
        }
      }
  
      return updatedFormData;
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
            <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Member Registration Form <MdOutlineKeyboardArrowDown />
            </h2>
          </div>

          {currentForm === 1 && (
            <div className="container d-flex justify-content-center">
              <div className="row w-100">
                <div className="col-12">
                  {/* Your first form code */}
                  <form>
                    {/* 1st Row */}
                    <div className="row pb-2">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">First Name*</label>

                        <input
                          type="text"
                          name="firstName"
                          className="form-control no-outline"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Middle Name</label>

                        <input
                          type="text"
                          name="middleName"
                          className="form-control no-outline"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Last Name*</label>

                        <input
                          type="text"
                          name="lastName"
                          className="form-control no-outline"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                    </div>
                    {/* 2nd Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Gender*</label>
                        <select
                          name="gender"
                          className="form-control no-outline"
                          value={formData.gender}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        >
                          <option></option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Opening Date*</label>
                        <input
                          name="openingDate"
                          type="date"
                          className="form-control no-outline "
                          value={formData.openingDate}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
          <label htmlFor="text">Employee No.*</label>
          <select
            name="employeeNo"
            className="form-control no-outline"
            value={formData.employeeNo}
            onChange={(e) => setFormData({ ...formData, employeeNo: e.target.value })}
            style={{
              backgroundColor: "whitesmoke",
              borderColor: "none",
            }}
            required
          >
            <option value=""></option>
            {employeeNumbers.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
                    </div>
                    {/* 3rd Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Birth Date*</label>
                        <input
                          type="date"
                          name="birthDate"
                          className="form-control no-outline"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Age</label>
                        <input
                          type="number"
                          name="age"
                          className="form-control no-outline "
                          value={formData.age}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Blood Group</label>
                        {/* <input
                          type="text"
                          name="bloodGroup"
                          className="form-control no-outline"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                        /> */}
                        <select
                          name="bloodGroup"
                          className="form-control no-outline"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
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
                    {/* 4th Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Join Date*</label>
                        <input
                          type="date"
                          name="joinDate"
                          className="form-control no-outline"
                          value={formData.joinDate}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Confirm Date*</label>
                        <input
                          type="date"
                          name="confirmDate"
                          className="form-control no-outline "
                          value={formData.confirmDate}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Email*</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control no-outline"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                    </div>
                    {/* 5th Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">PAN No.*</label>
                        <input
                          type="text"
                          name="panNo"
                          className="form-control no-outline"
                          value={formData.panNo}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Mobile Number*</label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          className="form-control no-outline "
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Marital Status</label>
                        <select
                          className="form-control no-outline"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                        >
                          <option></option>
                          <option>Single</option>
                          <option>Married</option>
                          {/* <option>Divorce</option> */}
                        </select>
                      </div>
                    </div>
                  </form>
                  <button
                    type="button"
                    onClick={handleNextClick}
                    style={{
                      padding: "10px 30px 10px 30px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentForm === 2 && (
            <div className="container d-flex justify-content-center">
              <div className="row w-100">
                <div className="col-12">
                  <form>
                    {/* 1st Row */}
                    <div className="row pb-2">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Photo ID*</label>
                        <select
                          className="form-control no-outline"
                          name="photoId"
                          value={formData.photoId}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        >
                          <option></option>
                          <option>Adhar Card</option>
                          <option>PAN Card</option>
                          <option>Driving Licence</option>
                        </select>
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Issued At*</label>

                        <input
                          type="time"
                          name="issuedAt"
                          className="form-control no-outline"
                          value={formData.issuedAt}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Issued On*</label>

                        <input
                          type="date"
                          name="issuedOn"
                          className="form-control no-outline"
                          value={formData.issuedOn}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                    </div>
                    {/* 2nd Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Address Proof*</label>
                        <select
                          className="form-control no-outline"
                          name="addressProof"
                          value={formData.addressProof}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        >
                          <option></option>
                          <option>Adhar Card</option>
                          <option>PAN Card</option>
                        </select>
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Address Issued At*</label>
                        <input
                          type="time"
                          className="form-control no-outline"
                          name="addressIssuedAt"
                          value={formData.addressIssuedAt}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Address Issued On*</label>
                        <input
                          type="date"
                          className="form-control no-outline"
                          name="addressIssuedOn"
                          value={formData.addressIssuedOn}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                    </div>
                    {/* 3rd Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Resident Address*</label>
                        <input
                          type="text-area"
                          name="residentAddress"
                          className="form-control no-outline"
                          value={formData.residentAddress}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Native Place Address</label>
                        <input
                          type="text-area"
                          name="nativePlaceAddress"
                          className="form-control no-outline"
                          value={formData.nativePlaceAddress}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">City*</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control no-outline"
                          value={formData.city}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                    </div>
                    {/* 4th Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">PIN Code*</label>
                        <input
                          type="number"
                          name="pinCode"
                          className="form-control no-outline"
                          value={formData.pinCode}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Phone No.*</label>
                        <input
                          type="number"
                          name="phoneNo"
                          className="form-control no-outline"
                          value={formData.phoneNo}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Nominee Name*</label>
                        <input
                          type="text"
                          name="nomineeName"
                          className="form-control no-outline"
                          value={formData.nomineeName}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                    </div>
                    {/* 5th Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Nominee Birth Date*</label>
                        <input
                          type="date"
                          name="nomineeBirthDate"
                          className="form-control no-outline"
                          value={formData.nomineeBirthDate}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Nominee Age</label>
                        <input
                          type="number"
                          name="nomineeAge"
                          className="form-control no-outline"
                          value={formData.nomineeAge}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Nominee Relation*</label>
                        <select
                          className="form-control no-outline"
                          name="nomineeRelation"
                          value={formData.nomineeRelation}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        >
                          <option></option>
                          <option>Father</option>
                          <option>Mother</option>
                          <option>Brother</option>
                          <option>Sister</option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <button
                    type="button"
                    onClick={handleBackClick}
                    style={{
                      margin: "0 10px",
                      padding: "10px 30px 10px 30px",
                      backgroundColor: "gray",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextClick}
                    style={{
                      padding: "10px 30px 10px 30px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentForm === 3 && (
            <div className="container d-flex justify-content-center">
              <div className="row w-100">
                <div className="col-12">
                  <form>
                    {/* 1st Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Member No*</label>
                        <input
                          type="number"
                          name="memberNo"
                          className="form-control no-outline"
                          value={formData.memberNo}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Member Name*</label>
                        <input
                          type="text"
                          name="memberName"
                          className="form-control no-outline"
                          value={formData.memberName}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">IFSC Code*</label>
                        <input
                          type="text"
                          name="ifscCode"
                          className="form-control no-outline"
                          value={formData.ifscCode}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                    </div>

                    {/* 2nd Row */}
                    <div class="row py-3">
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Bank Saving A/c No.*</label>
                        <input
                          type="number"
                          name="bankSavingAcNo"
                          className="form-control no-outline"
                          value={formData.bankSavingAcNo}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Bank Name*</label>
                        <input
                          type="text"
                          name="bankName"
                          class="form-control no-outline"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                      <div class="col-lg-4 col-md-12 col-sm-12 form-fields">
                        <label for="text">Branch Name*</label>
                        <input
                          type="text"
                          name="branchName"
                          class="form-control no-outline"
                          value={formData.branchName}
                          onChange={handleInputChange}
                          style={{
                            backgroundColor: "whitesmoke",
                            borderColor: "none",
                          }}
                          required
                        />
                      </div>
                    </div>
                  </form>
                  <button
                    type="button"
                    onClick={handleBackClick}
                    style={{
                      margin: "0 10px",
                      padding: "10px 30px 10px 30px",
                      backgroundColor: "gray",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    style={{
                      padding: "10px 30px 10px 30px",
                      backgroundColor: "green",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
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
    </>
  );
}
