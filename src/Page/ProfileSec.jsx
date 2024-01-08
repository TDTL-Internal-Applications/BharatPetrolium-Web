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
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  let [MemberId, setMemberId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
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
        name: "",
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
        name: "",
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
  const profileContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const profileImageContainerStyle = {
    width: "100px",
    height: "100px",
    overflow: "hidden",
    borderRadius: "50%",
    marginRight: "20px",
  };

  const profileInfoStyle = {
    display: "flex",
    flexDirection: "column",
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
            <div className="H1-Heading-Main">Profile Section</div>
          </div>

          <div className="container">
            <div
              className="row First-Main-Row  pt-3 mb-1"
              style={{ width: "100%" }}
            >
              <form>
                <div className="row pb-1">
                  <div className="col-xl-5 col-lg-1 col-md-6 col-sm-6 text-start">
                    <div className="col" width="20%">
                      <label htmlFor="imageInput" style={{ display: "none" }}>
                        Upload Images
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      {image && (
                        <img
                          src={image}
                          alt="Uploaded"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                           
                          }}
                        />
                      )}
                      <label
                        htmlFor="imageInput"
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                          padding: "2px",
                          border: "1px solid #ccc",
                        }}
                      >
                        Choose Image
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Member ID*
                    </label>

                    <input
                      type="number"
                      name="memberId"
                      className="form-control small-label"
                      value={MemberId}
                      onChange={handleMemberIdChange}
                      style={{
                        backgroundColor: "white",
                        borderColor: "none",
                      }}
                      min={0}
                    />
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 form-fields">
                    <label htmlFor="text" className="small-label">
                      Initial
                    </label>
                    <div>
                      <span className=" "> {updatedMemberData.initial}</span>
                    </div>
                  </div>
                  <div className=" col-xl-4 col-lg-4 col-md-6 col-sm-6 form-fields">
                    <label htmlFor="text" className="small-label">
                      Full Name
                    </label>
                    <div>
                      <span className=" "> {formData.fullName}</span>
                    </div>
                    {/* <input
                      type="text"
                      name="initial"
                      className="form-control small-label"
                      onChange={handleInputChange}
                      value={formData.fullName}
                      readOnly
                    /> */}
                  </div>
                  <div className=" col-xl-4 col-lg-4 col-md-6 col-sm-6 form-fields">
                    <label htmlFor="text " className="small-label">
                      Address
                    </label>
                    <div>
                      <span className=" ">
                        {" "}
                        {updatedMemberData.resident_address}
                      </span>
                    </div>
                    {/* <textarea
                      type="text"
                      name="initial"
                      className="form-control small-label"
                      onChange={handleInputChange}
                      value={updatedMemberData.resident_address}
                      // readOnly
                    /> */}
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
