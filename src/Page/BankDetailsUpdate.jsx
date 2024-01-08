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
export default function BankDetailsUpdate() {
  const [fullName, setFullName] = useState("");
  let [MemberId, setMemberId] = useState("");

  const [formData, setFormData] = useState({
    initial: "",
    fullName: "",
    emp_no: "",
    firstName: "",
    lastName: "",
    bank_ac_no: "",
    IFSC_code: "",
    bank_name: "",
    branch_name: "",
    MICR_no: "",
  });
  useEffect(() => {
    // Fetch data based on MemberId or perform any other necessary actions
    if (MemberId !== "") {
      handleUpdate(MemberId);
    } else {
      // If MemberId is empty, set all fields to blank
      setUpdatedMemberData({
        initial: "",
        first_name: "",
        emp_no: "",
        firstName: "",
        bank_ac_no: "",
        IFSC_code: "",
        bank_name: "",
        branch_name: "",
        MICR_no: "",
      });
      setFormData({
        initial: "",
        fullName: "",
        bank_ac_no: "",
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
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button-share");
          },
        });
        return; // Exit the function if MemberId is empty
      }

      // Make the axios post request
      await axios.post(
        `http://bpcl.kolhapurdakshin.com:8000/bank_update/`,
        updatedMemberData
      );

      // Display success message
      Swal.fire({
        title: "Success",
        text: "Bank Details Updated Successfully.",
        icon: "success",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button-share");
        },
      });
    } catch (error) {
      // Handle errors
      console.error("Error updating member:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while Updating changes.",
        icon: "error",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button-share");
        },
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
            <div className="H1-Heading-Main">Bank Details Update</div>
          </div>

          <div className="container">
            <div
              className="row First-Main-Row  pt-3 mb-1"
              style={{ width: "100%" }}
            >
              {/* Basic Information  */}
              <form>
                <div className="Border-Black px-2 py-2 mb-3">
                  <div className="row mb-2">
                    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-5 text-start">
                      <div class=" ">
                        <label for="emp_no" className="small-label">
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
                                name: "emp_no",
                                value: numericValue,
                              },
                            });
                          }}
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md col-sm text-start"></div>
                    <div className=" col-xl-3 col-lg-3 col-md-5 col-sm-5 form-fields">
                      <label
                        htmlFor="text"
                        className="small-label"
                        style={{ color: "dodgerblue" }}
                      >
                        Member ID*
                      </label>
                      <input
                        type="number"
                        name="memberId"
                        className="form-control no-outline"
                        value={formData.memberId}
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
                      // id="floatingInput"
                      onChange={handleInputChange}
                      value={updatedMemberData.initial}
                      readOnly
                    ></input>
                  </div>
                  <div className=" col-xl-3 col-lg-3 col-md-6 col-sm-6 form-fields">
                    <label htmlFor="text" className="small-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={updatedMemberData.first_name}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="ifscCode"
                      className="small-label"
                      style={{ color: "dodgerblue" }}
                    >
                      IFSC Code*
                    </label>
                    <input
                      type="text"
                      className="form-control small-label"
                      id="IFSC_code"
                      name="IFSC_code"
                      value={updatedMemberData.IFSC_code}
                      onChange={handleInputChange}
                      maxLength={11}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="bank_ac_no"
                      className="small-label"
                      style={{ color: "dodgerblue" }}
                    >
                      Bank Saving A/c No.*
                    </label>
                    <input
                      type="text"
                      id="bank_ac_no"
                      className="form-control small-label"
                      name="bank_ac_no"
                      value={updatedMemberData.bank_ac_no}
                      maxLength={20}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        ); // Allow only numeric values

                        handleInputChange({
                          target: {
                            name: "bank_ac_no",
                            value: numericValue,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 text-start">
                    <label htmlFor="bank_name" className="small-label">
                      Bank Name*
                    </label>
                    <input
                      type="text"
                      className="form-control small-label"
                      id="bank_name"
                      name="bank_name"
                      maxLength={30}
                      value={updatedMemberData.bank_name}
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        const alphabeticValue = inputValue
                          .replace(/[^A-Za-z ]/g, "")
                          .slice(0, 30);

                        handleInputChange({
                          target: {
                            name: "bank_name",
                            value: alphabeticValue,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 text-start">
                    <label htmlFor="branch_name" className="small-label">
                      Branch Name*
                    </label>
                    <input
                      type="text"
                      maxLength={20}
                      className="form-control small-label"
                      id="branch_name"
                      name="branch_name"
                      value={updatedMemberData.branch_name}
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        const alphabeticValue = inputValue
                          .replace(/[^A-Za-z ]/g, "")
                          .slice(0, 30);

                        handleInputChange({
                          target: {
                            name: "branch_name",
                            value: alphabeticValue,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      MICR Code*
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        maxLength={9}
                        value={updatedMemberData.MICR_no}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "MICR_no",
                              value: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
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
                Save
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
          </div>
        </div>
      </div>
    </>
  );
}
