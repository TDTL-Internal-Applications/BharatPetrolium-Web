import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "../Style/Global_Classes.css";
import { Link } from "react-router-dom";

export default function TermDepositClose() {
  const [depositData, setDepositData] = useState([]);
  let [ACCOUNTNo, setACCOUNTNO] = useState("");

  async function handleModalClick() {
    let data = {
      RDID: ACCOUNTNo,
      account_type: "Term Deposit",
    };

    if (ACCOUNTNo === "") {
      Swal.fire({
        title: "error",
        text: "Please Enter Account Number",
        icon: "question",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });

      return;
    }

    try {
      let response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/close_rd/",
        data
      );
      let jsonData = response.data;

      if ("message" in jsonData && jsonData.message.length > 1) {
        Swal.fire({
          title: "success",
          text: "Deposit Succesfully Closed!",
          icon: "success",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
        setDepositData({
          ...depositData,
          member_id: "",
          emp_no: "",
          initial: "",
          first_name: "",
          middle_name: "",
          last_name: "",
          birth_date: "",
          age: "",
          nativeplace_address: "",
          nativeplace_city: "",
          nativeplace_pincode: "",
          mobile_no: "",
          pan_no: "",
          bank_name: "",
          bank_ac_no: "",
          branch_name: "",
          IFSC_code: "",
          MICR_no: "",
          StartDate: "",
          MonthlyDeposit: "",
          deposit_period: "",
          InterestRate: "",
          EndDate: "",
          MaturityAmt: "",
          InterestAmt: "",
          nominee_name: "",
          nominee_birthdate: "",
          nominee_age: "",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "error",
        text: "Please Enter valid Account Number",
        icon: "error",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });
      console.error("modal save error:", error);
    }
  }

  const handleAccountNumberChange = async (newRDID) => {
    const data = {
      RDID: newRDID,
      Account_type: "Term Deposit",
    };

    if (!newRDID) {
      setDepositData("");
    }

    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/fetch_closing_details/",
        data
      );

      const jsonData = response.data.result_set[0];

      if (jsonData.Status === "Inactive") {
        Swal.fire({
          icon: "info",
          title: "Term deposit Already Closed ",
          text: `The Term deposit ID: ${newRDID} is already Closed.`,
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
        return;
      }
      // const { RD_data, member_data } = jsonData;

      // Assuming Status is a property of RD_data
      // const { Status } = jsonData;

      // Handle RD_data and member_data as needed
      // console.log("RD Data:", RD_data);
      // // console.log("Member Data:", member_data);

      // Update the state with the fetched data
      setDepositData(jsonData);
    } catch (error) {
      console.error("Error fetching closing details:", error);
      if (newRDID === "") {
        return;
      }
      Swal.fire({
        icon: "info",
        title: "Invalid Account No",
        text: `Please Enter Valid Account No`,
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });
      return;
    }
  };

  const [memberNumbers, setMemberNumbers] = useState([]);

  useEffect(() => {
    const fetchMemberNumbers = async () => {
      try {
        const response = await axios.get(
          "http://bpcl.kolhapurdakshin.com:8000/member_names/"
        );
        setMemberNumbers(response.data.members);
      } catch (error) {
        console.error("Error fetching employee numbers:", error);
      }
    };

    fetchMemberNumbers();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    accountType: "Term Deposit",
    ACCOUNTNo: "",
    RDID: "",
    member_id: "",
    emp_no: "",
    initial: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    age: "",
    nativeplace_address: "",
    nativeplace_city: "",
    nativeplace_pincode: "",
    mobile_no: "",
    pan_no: "",
    bank_name: "",
    bank_ac_no: "",
    branch_name: "",
    IFSC_code: "",
    MICR_no: "",
    StartDate: "",
    MonthlyDeposit: "",
    deposit_period: "",
    InterestRate: "",
    EndDate: "",
    MaturityAmt: "",
    InterestAmt: "",
    nominee_name: "",
    nominee_birthdate: "",
    nominee_age: "",
    StartDate: getCurrentDate(),
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
      .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`)
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

  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  // State to manage visibility of the second modal
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);

  // Function to handle "Save changes" button click in the first modal
  const handleSaveChanges = () => {
    // Add your logic here for saving changes or any other action

    // Close the first modal using the closeModal function
    closeModal();

    document.getElementById("forSecondModal").click();

    // Open the second modal
    // setSecondModalVisible(true);
  };
  const closeModal = () => {
    const modal = document.getElementById("exampleModal");
    const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];

    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
    }

    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }

    // Reset form data
    setFormData({
      depositAmount: "",
      interestPaid: "",
      // Add other form fields and their initial values as needed
    });
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading1 Main */}
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Close Term Deposit</div>
          </div>

          <div className="container">
            {/* Your first form code */}
            <div className="row First-Main-Row  pt-3 mb-1">
              {/* Basic Information  */}
              <form>
                <div className="H2-Sub-Heading ">Basic Information</div>

                <div className="row">
                  <div className="col-xl-1 col-lg-1 col-md-6 col-sm-6 text-start">
                  <label for="memberId" className="small-label">
                   Class
                    </label>
                    <div className="">
                      <input
                        type="text"
                        id="member_class"
                        name="member_class"
                        class="form-control small-label"
                        readOnly
                        value={depositData && depositData.member_class}
                        disabled
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md col-sm-6 text-start">
                  <label for="memberId" className="small-label">
                      Member No*
                    </label>
                    <div className=" ">
                      <input
                        type="text"
                        id="memberId"
                        name="member_id"
                        class="form-control small-placeholder"
                        value={depositData && depositData.member_id}
                        min={0}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class=" ">
                      <label for="rdId" className="small-label">
                        Employee No*
                      </label>
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-placeholder"
                        value={depositData && depositData.emp_no}
                        min={0}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label htmlFor="ACCOUNTNo" className="small-label">
                        Account No*
                      </label>
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="ACCOUNTNo"
                        name="ACCOUNTNo"
                        defaultValue={depositData && depositData.RDID}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          setACCOUNTNO(numericValue);

                          // Check if the numericValue is empty
                          if (!numericValue) {
                            // Show an error message for empty account number
                            Swal.fire({
                              icon: "error",
                              title: "Account ID Required",
                              text: "Please enter an Account ID.",
                              didOpen: () => {
                                Swal.getPopup().style.borderRadius = "25px";
                                const confirmButton = Swal.getConfirmButton();
                                confirmButton.classList.add(
                                  "custom-swal-button"
                                );
                              },
                            });
                            // Optionally, you might want to reset depositData here
                            setDepositData("");
                            return;
                          }

                          // If the numericValue is not empty, handle the account number change
                          handleAccountNumberChange(numericValue);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label htmlFor="certificateNo" className="small-label">
                        Certificate No*
                      </label>
                      <input
                        type="text"
                        id="certificateNo"
                        name="certificateNo"
                        className="form-control small-placeholder"
                        min={0}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label for="" className="small-label">
                        Title
                      </label>
                      <input
                        type="text"
                        name="initial"
                        class="form-control small-label"
                        value={depositData && depositData.initial}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="firstName" className="small-label">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        class="form-control small-placeholder"
                        id="firstName"
                        value={depositData && depositData.first_name}
                        disabled
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
                        className="form-control small-placeholder"
                        value={depositData && depositData.middle_name}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="lastName" className="small-label">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        class="form-control small-placeholder"
                        id="lastName"
                        value={depositData && depositData.last_name}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="birthDate" className="small-label">
                        BirthDate*
                      </label>
                      <input
                        type="date"
                        class="form-control small-placeholder"
                        id="birthDate"
                        name="birthDate"
                        value={depositData && depositData.birth_date}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="no-outline-login">
                      <label htmlFor="age" className="small-label">
                        Age*
                      </label>
                      <input
                        type="number"
                        className="form-control small-placeholder"
                        id="age"
                        name="age"
                        value={depositData && depositData.age}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                {/* Joinee Details  */}
                <div className="H2-Sub-Heading pt-3">Joinee Details 1 & 2</div>
                {/* Joinee 1  */}
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label for="" className="small-label">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        class="form-control  small-label"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="firstName" className="small-label">
                        First Name
                      </label>

                      <input
                        type="text"
                        class="form-control"
                        name="firstName"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Middle Name
                      </label>

                      <input
                        type="text"
                        name="middleName"
                        class="form-control small-placeholder"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Last Name
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        class="form-control small-placeholder"
                        id="floatingInput"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        BirthDate
                      </label>

                      <input
                        type="date"
                        class="form-control small-placeholder"
                        id="floatingInput"
                        name="birthdate"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div className=" mb-1">
                      <label for="" className="small-label">
                        Age
                      </label>

                      <input
                        type="text"
                        name="age"
                        class="form-control small-placeholder"
                        disabled
                        min={0}
                      />
                    </div>
                  </div>
                </div>
                {/* Joinee 2 */}
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Title
                    </label>
                    <input
                      name="title"
                      //value={joinName2Data.title}
                      className=" form-control small-placeholder"
                      disabled
                    />
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="firstName"
                      disabled
                      //   value={joinName2Data.firstName}
                    />
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="middleName"
                      disabled
                      //   value={joinName2Data.middleName}
                    />
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="lastName"
                      disabled
                      //   value={joinName2Data.lastName}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      BirthDate
                    </label>
                    <input
                      type="date"
                      className="form-control small-placeholder"
                      id="floatingInput"
                      name="birthdate"
                      disabled
                      //   value={joinName2Data.birthdate}
                    />
                  </div>
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      class="form-control small-placeholder"
                      disabled
                      min={0}
                    />
                  </div>
                </div>

                <div className="H2-Sub-Heading pt-3">Address Details</div>
                {/* Address Details */}
                <div className="row mb-2">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label htmlFor="address" className="small-label">
                      Address
                    </label>
                    <div className="mb-1">
                      <input
                        type="text-area"
                        className="form-control"
                        id="address"
                        name="address"
                        value={depositData && depositData.nativeplace_address}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="city" className="small-label">
                      City
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={depositData && depositData.nativeplace_city}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="pinCode" className="small-label">
                      Pin Code
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="pinCode"
                        name="pinCode"
                        value={depositData && depositData.nativeplace_pincode}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label htmlFor="autoRenewal" className="small-label">
                        A/c Auto Renewal
                      </label>
                      <input
                        className="form-control small-label"
                        id="autoRenewal"
                        name="autoRenewalOption"
                        disabled
                      ></input>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="mobileNumber" className="small-label">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        class="form-control small-placeholder"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={depositData && depositData.mobile_no}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="H2-Sub-Heading pt-2 mb-3">
                  Member Bank Account Details
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label
                      className="small-label"
                      htmlFor="accountOpeningType"
                      style={{ color: "red" }}
                    >
                      Account Opening Type
                    </label>
                    <div className="">
                      <input
                        className="form-control  small-label"
                        id="accountOpeningType"
                        name="accountOpeningType"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label
                      className="small-label"
                      htmlFor="depositorCategory"
                      style={{ color: "red" }}
                    >
                      Depositor Category
                    </label>
                    <div className="">
                      <input
                        className="form-control  small-label"
                        id="depositorCategory"
                        name="depositorCategory"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label
                      className="small-label"
                      htmlFor="floatingInput"
                      style={{ color: "red" }}
                    >
                      Extra %
                    </label>
                    <div className="">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        min={0}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="panNo" className="small-label">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        class="form-control small-placeholder"
                        id="panNo"
                        name="panNo"
                        value={depositData && depositData.pan_no}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank Name
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        name="bankName"
                        value={depositData && depositData.bank_name}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank A/c No
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="bankAcNo"
                        value={depositData && depositData.bank_ac_no}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Branch Name
                    </label>
                    <div className="">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="text"
                        name="branchName"
                        value={depositData && depositData.branch_name}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      IFSC CODE
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="rName"
                        value={depositData && depositData.IFSC_code}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      MICR Code
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        value={depositData && depositData.MICR_no}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start mb-3">
                    <label className="small-label" htmlFor="floatingInput">
                      UID No
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="uidNo"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="Border-Black mt-1 mb-2 px-2">
                  <div className="row pt-1">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Open Date*
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label"
                          id="floatingInput"
                          name="StartDate"
                          value={depositData && depositData.StartDate}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Installment Amount*
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label"
                          id="floatingInput"
                          name="MonthlyDepositmonthly_deposit"
                          value={depositData && depositData.MonthlyDeposit}
                          min={0}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Deposit Period*
                      </label>
                      <div>
                        <div className="row">
                          <div className="col-sm-6 mb-2">
                            <input
                              className="form-control small-label  small-label"
                              id="floatingInput"
                              name="deposit_period"
                              value={depositData && depositData.deposit_period}
                              disabled
                            />
                          </div>
                          <div className="col-sm-6">
                            <label
                              className="form-control small-label Background-color-text"
                              id="floatingInput"
                              style={{ width: "100%" }}
                              aria-disabled
                            >
                              Months
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Interest Rate*
                      </label>
                      <div>
                        <input
                          type="text"
                          step={0.01}
                          className="form-control small-label"
                          id="floatingInput"
                          name="InterestRate"
                          value={depositData && depositData.InterestRate}
                          min={0}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Maturity On*
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label"
                          id="floatingInput"
                          name="maturityOn"
                          value={depositData && depositData.EndDate}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Maturity Amount*
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label"
                          id="floatingInput"
                          name="MaturityAmt"
                          value={depositData && depositData.MaturityAmt}
                          disabled
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Interest Amount*
                      </label>
                      <div>
                        <input
                          type="text"
                          step={0.01}
                          className="form-control small-label"
                          id="floatingInput"
                          name="interestAmount"
                          value={depositData && depositData.InterestAmt}
                          min={0}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Paid Date
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label"
                          id="floatingInput"
                          name="paidDate"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Border-Black px-2 py-2 mb-3">
                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Effect Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="effectDate"
                        value={depositData && depositData.StartDate}
                        disabled
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Effect Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="effectAmount"
                        value={
                          depositData &&
                          depositData.MonthlyDepositmonthly_deposit
                        }
                        disabled
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "#ffc109" }}
                      >
                        Interest Provision Date*
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="interestProvisionDate"
                        disabled
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "#ffc109" }}
                      >
                        Interest Pro. Amt
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="interestProvisionAmount"
                        min={0}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Renewed On
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="effectDate"
                        disabled
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Closed On
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="effectAmount"
                        disabled
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Closed Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="closedAmount"
                        disabled
                        // value={formData.interestProvisionDate}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "blue" }}
                      >
                        Interest Paid
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="interestpaid"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Nominee Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="nomineeName"
                      value={depositData && depositData.nominee_name}
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      BirthDate*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="floatingInput"
                      name="nomineeBirthdate"
                      value={depositData && depositData.nominee_birthdate}
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control no-outline"
                      id="floatingInput"
                      name="age"
                      value={depositData && depositData.nominee_age}
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Relation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="relation"
                      value={depositData && depositData.relation}
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Balance
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="balance"
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Deposit Against Loan Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="type"
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Loan Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="number"
                      disabled
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label
                      htmlFor="floatingInput"
                      className="small-label"
                      style={{ color: "red" }}
                    >
                      Loan Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      name="amount"
                      disabled
                    />
                  </div>
                </div>

                <div className="row mt-2 mb-2">
                  <div className="col-sm d-flex justify-content-center">
                    <button
                      type="button"
                      className="mt-2 mx-2"
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
                      Close Account
                    </button>
                    <button
                      type="button"
                      className="mt-2 mx-2"
                      data-toggle="modal"
                      data-target={ACCOUNTNo ? "#exampleModal" : ""}
                      style={{
                        padding: "7px 25px 7px 25px",
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "16px",
                      }}
                      onClick={() => {
                        if (!ACCOUNTNo) {
                          Swal.fire({
                            icon: "error",
                            title: "Account ID Required",
                            text: "Please enter an Account ID.",
                            didOpen: () => {
                              Swal.getPopup().style.borderRadius = "25px";
                              const confirmButton = Swal.getConfirmButton();
                              confirmButton.classList.add("custom-swal-button");
                            },
                          });
                          return;
                        }
                      }}
                    >
                      Next Account
                    </button>

                    <div
                      className={`modal fade ${
                        isFirstModalVisible ? "show" : ""
                      }`}
                      id="exampleModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden={!isFirstModalVisible}
                      style={{
                        display: isFirstModalVisible ? "block" : "none",
                      }}
                    >
                      <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        role="document"
                      >
                        <div class="modal-content">
                          <div class="modal-header px-2 py-2">
                            <p class="modal-title px-1" id="exampleModalLabel">
                              <strong>
                                {" "}
                                Deposit Amount And Interest Paid By...
                              </strong>
                            </p>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>

                          <div class="modal-body py-1">
                            <form>
                              {/* First Row  */}
                              <div className="row d-flex align-items-center">
                                <div className="col-sm-6">
                                  <div className="row d-flex align-items-center">
                                    <div
                                      className="col-sm-6"
                                      style={{ fontSize: "18px", color: "red" }}
                                    >
                                      Deposit Amount
                                    </div>
                                    <div className="col-sm-6">
                                      <div
                                        id="MonthlyDepositmonthly_deposit"
                                        name="MonthlyDepositmonthly_deposit"
                                        className="form-control no-outline-login no-border bg-white"
                                        style={{
                                          fontSize: "18px",
                                          padding: "8px",
                                          color: "red",
                                        }}
                                      >
                                        {depositData &&
                                          depositData.MonthlyDeposit}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-sm-1 px-0"
                                  style={{ color: "red" }}
                                >
                                  +
                                </div>
                                <div className="col-sm-5">
                                  <div className="row d-flex align-items-center">
                                    <div
                                      className="col-sm-4"
                                      style={{ fontSize: "18px", color: "red" }}
                                    >
                                      Interest
                                    </div>
                                    <div className="col-sm-8">
                                      <input
                                        type="text"
                                        id="InterestAmt"
                                        name="InterestAmt"
                                        step="0.01"
                                        style={{
                                          fontSize: "18px",
                                          padding: "px",
                                          color: "red",
                                        }}
                                        value={
                                          depositData && depositData.InterestAmt
                                        }
                                        readOnly
                                        className="form-control no-outline-login no-border bg-white"
                                        min={0}
                                        pattern="[0-9]*"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Second  Row*/}
                              <div className="row d-flex align-items-center mt-2 mb-2">
                                <div className="col-sm-1">
                                  <div className="">Cash </div>
                                </div>
                                <div className="col-sm">
                                  <input
                                    type="text"
                                    id="CashAmount"
                                    name="CashAmount"
                                    className="form-control no-outline-login"
                                    onKeyPress={(e) => {
                                      // Allow only numeric characters (0-9)
                                      const isNumeric = /^[0-9]*$/.test(e.key);
                                      if (!isNumeric) {
                                        e.preventDefault();
                                      }
                                    }}
                                    min={0}
                                    pattern="[0-9]*"
                                  />
                                </div>

                                <div className="col-sm-1">
                                  <div className="">Bank </div>
                                </div>
                                <div className="col-sm">
                                  <input
                                    type="text"
                                    id="BankAmount"
                                    name="BankAmount"
                                    step="0.01"
                                    className="form-control no-outline-login"
                                    onKeyPress={(e) => {
                                      // Allow only numeric characters and dots (for decimal point)
                                      const isNumeric = /^[0-9.]*$/.test(e.key);
                                      if (!isNumeric) {
                                        e.preventDefault();
                                      }
                                    }}
                                    min={0}
                                    pattern="[0-9.]*"
                                  />
                                </div>

                                <div className="col-sm-2">
                                  <div className="">Transfer </div>
                                </div>
                                <div className="col-sm">
                                  <input
                                    type="text"
                                    id="TransferAmount"
                                    name="TransferAmount"
                                    step="0.01"
                                    className="form-control no-outline-login"
                                    onKeyPress={(e) => {
                                      // Allow only numeric characters and dots (for decimal point)
                                      const isNumeric = /^[0-9.]*$/.test(e.key);
                                      if (!isNumeric) {
                                        e.preventDefault();
                                      }
                                    }}
                                    min={0}
                                    pattern="[0-9.]*"
                                  />
                                </div>
                              </div>
                              {/* Third Row  */}
                              <div className="row d-flex align-items-center mt-2 px-2">
                                <select
                                  className="form-select  small-label no-outline-login"
                                  id="depositorCategory"
                                  name="depositorCategory"
                                  // value={formData.depositorCategory}
                                  //onChange={handleInputChange}
                                >
                                  <option value="GENERAL">
                                    TRANSFER TO / FORM SAVING
                                  </option>
                                  <option value="">
                                    M S C Saving 50368-Bank
                                  </option>
                                  <option value="">
                                    HD CC Saving A/C STY -13{" "}
                                  </option>
                                  <option value="">Transfer Bank</option>

                                  <option value="">
                                    HD CC Current A/C STY -13
                                  </option>
                                  <option value="GENERAL">Axis Bank</option>
                                </select>
                              </div>
                              {/* Four Row  */}
                              <div className="row d-flex align-items-center mt-2">
                                <div className="col-sm-6">
                                  <div className="row d-flex align-items-start ">
                                    <div
                                      className="col-sm-6  px-3"
                                      style={{ fontSize: "16px", color: "red" }}
                                    >
                                      Interest Paid
                                    </div>
                                    <div className="col-sm-6">
                                      <input
                                        type="text"
                                        id="InterestPaid"
                                        name="InterestPaid"
                                        step="0.01"
                                        className="form-control"
                                        value={formData.InterestPaid}
                                        onChange={(e) => {
                                          const numericValue =
                                            e.target.value.replace(
                                              /[^0-9.]/g,
                                              ""
                                            );
                                          handleInputChange({
                                            target: {
                                              name: "InterestPaid",
                                              value: numericValue,
                                            },
                                          });
                                        }}
                                        min={0}
                                        pattern="[0-9]*[.]?[0-9]*"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="">Cash </div>
                                    </div>
                                    <div className="col-sm-6 ">
                                      <input
                                        type="text"
                                        id="CashAmount"
                                        name="CashAmount"
                                        className="form-control no-outline-login"
                                        onKeyPress={(e) => {
                                          // Allow only numeric characters (0-9)
                                          const isNumeric = /^[0-9]*$/.test(
                                            e.key
                                          );
                                          if (!isNumeric) {
                                            e.preventDefault();
                                          }
                                        }}
                                        min={0}
                                        pattern="[0-9]*"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Fifth Row  */}
                              <div className="row d-flex align-items-center mt-2">
                                <div className="col-sm-3">
                                  <div className="">Bank </div>
                                </div>
                                <div className="col-sm-3">
                                  <input
                                    type="text"
                                    id="BankAmount"
                                    name="BankAmount"
                                    step="0.01"
                                    className="form-control no-outline-login"
                                    onKeyPress={(e) => {
                                      // Allow only numeric characters and dots (for decimal point)
                                      const isNumeric = /^[0-9.]*$/.test(e.key);
                                      if (!isNumeric) {
                                        e.preventDefault();
                                      }
                                    }}
                                    min={0}
                                    pattern="[0-9.]*"
                                  />
                                </div>
                                <div className="col-sm-3">
                                  <div className="">Transfer</div>
                                </div>
                                <div className="col-sm-3">
                                  <input
                                    type="text"
                                    id="TransferAmount"
                                    name="TransferAmount"
                                    step="0.01"
                                    className="form-control no-outline-login"
                                    onKeyPress={(e) => {
                                      // Allow only numeric characters and dots (for decimal point)
                                      const isNumeric = /^[0-9.]*$/.test(e.key);
                                      if (!isNumeric) {
                                        e.preventDefault();
                                      }
                                    }}
                                    min={0}
                                    pattern="[0-9.]*"
                                  />
                                </div>
                              </div>
                              {/* Six Row  */}
                              <div className="row d-flex align-items-center mt-2 px-2">
                                <select
                                  className="form-select  small-label no-outline-login"
                                  id="depositorCategory"
                                  name="depositorCategory"
                                  // value={formData.depositorCategory}
                                  //onChange={handleInputChange}
                                >
                                  <option value="GENERAL">
                                    TRANSFER TO / FORM SAVING
                                  </option>
                                  <option value="">
                                    M S C Saving 50368-Bank
                                  </option>
                                  <option value="">
                                    HD CC Saving A/C STY -13{" "}
                                  </option>
                                  <option value="">Transfer Bank</option>

                                  <option value="">
                                    HD CC Current A/C STY -13
                                  </option>
                                  <option value="GENERAL">Axis Bank</option>
                                </select>
                              </div>
                              {/* Seven  */}
                              <div className="row d-flex align-items-center mt-2">
                                <div className="col-sm-6">
                                  <div className="row d-flex align-items-start ">
                                    <div
                                      className="col-sm-6  px-3"
                                      style={{ fontSize: "16px", color: "red" }}
                                    >
                                      Interest Provision
                                    </div>
                                    <div className="col-sm-6">
                                      <input
                                        type="text"
                                        id="InterestProvision"
                                        name="InterestProvision"
                                        step="0.01"
                                        className="form-control"
                                        value={formData.InterestProvision}
                                        onChange={(e) => {
                                          const numericValue =
                                            e.target.value.replace(
                                              /[^0-9.]/g,
                                              ""
                                            );
                                          handleInputChange({
                                            target: {
                                              name: "InterestProvision",
                                              value: numericValue,
                                            },
                                          });
                                        }}
                                        min={0}
                                        pattern="[0-9]*[.]?[0-9]*"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <div className="">Cash </div>
                                    </div>
                                    <div className="col-sm-6 ">
                                      <input
                                        type="text"
                                        id="CashAmount"
                                        name="CashAmount"
                                        className="form-control no-outline-login"
                                        onKeyPress={(e) => {
                                          // Allow only numeric characters (0-9)
                                          const isNumeric = /^[0-9]*$/.test(
                                            e.key
                                          );
                                          if (!isNumeric) {
                                            e.preventDefault();
                                          }
                                        }}
                                        min={0}
                                        pattern="[0-9]*"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Eight  */}
                              <div className="row d-flex align-items-center mt-2">
                                <div className="col-sm-3">
                                  <div className="">Bank </div>
                                </div>
                                <div className="col-sm-3">
                                  <input
                                    type="text"
                                    id="BankAmount"
                                    name="BankAmount"
                                    step="0.01"
                                    className="form-control no-outline-login"
                                    onKeyPress={(e) => {
                                      // Allow only numeric characters and dots (for decimal point)
                                      const isNumeric = /^[0-9.]*$/.test(e.key);
                                      if (!isNumeric) {
                                        e.preventDefault();
                                      }
                                    }}
                                    min={0}
                                    pattern="[0-9.]*"
                                  />
                                </div>
                                <div className="col-sm-3">
                                  <div className="">Transfer</div>
                                </div>
                                <div className="col-sm-3">
                                  <input
                                    type="text"
                                    id="TransferAmount"
                                    name="TransferAmount"
                                    step="0.01"
                                    className="form-control no-outline-login"
                                    onKeyPress={(e) => {
                                      // Allow only numeric characters and dots (for decimal point)
                                      const isNumeric = /^[0-9.]*$/.test(e.key);
                                      if (!isNumeric) {
                                        e.preventDefault();
                                      }
                                    }}
                                    min={0}
                                    pattern="[0-9.]*"
                                  />
                                </div>
                              </div>
                              {/* Nine  */}
                              <div className="row d-flex align-items-center mt-2 px-2">
                                <select
                                  className="form-select  small-label no-outline-login"
                                  id="depositorCategory"
                                  name="depositorCategory"
                                  // value={formData.depositorCategory}
                                  //onChange={handleInputChange}
                                >
                                  <option value="GENERAL">
                                    TRANSFER TO / FORM SAVING
                                  </option>
                                  <option value="">
                                    M S C Saving 50368-Bank
                                  </option>
                                  <option value="">
                                    HD CC Saving A/C STY -13{" "}
                                  </option>
                                  <option value="">Transfer Bank</option>

                                  <option value="">
                                    HD CC Current A/C STY -13
                                  </option>
                                  <option value="GENERAL">Axis Bank</option>
                                </select>
                              </div>

                              <div className="row d-flex align-items-center mt-2">
                                <div className="col-sm-6">
                                  <div className="row">
                                    <div className="col-sm-6 ">Particular</div>
                                    <div className="col-sm-6">
                                      <input
                                        id="Particular"
                                        name="Particular"
                                        className="form-control no-outline-login"
                                        value={formData.particular}
                                        onChange={(e) => {
                                          handleInputChange({
                                            target: {
                                              name: "Particular",
                                              value: e.target.value,
                                            },
                                          });
                                        }}
                                      ></input>
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div className="col">Voucher No.</div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        id="InterestRate"
                                        name="InterestRate"
                                        step="0.01"
                                        className="form-control no-outline-login"
                                        //value={MemberId}
                                        //onChange={handleMemberIdChange}
                                        min={0}
                                        pattern="[0-9]*"
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div className="col">Cheque No.</div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        id="InterestRate"
                                        name="InterestRate"
                                        step="0.01"
                                        className="form-control no-outline-login"
                                        min={0}
                                        pattern="[0-9]*"
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6"></div>
                              </div>
                              <div className="col"></div>
                            </form>
                          </div>
                          <div className="modal-footer py-1">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
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
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleSaveChanges}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      style={{ display: "none" }}
                      id="forSecondModal"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Launch demo modal
                    </button>
                    <div
                      className="modal fade "
                      id="exampleModalCenter"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenterTitle"
                      // aria-hidden={!isSecondModalVisible}
                      // style={{
                      //   display: isSecondModalVisible ? "block" : "none",
                      // }}
                    >
                      <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        role="document"
                      >
                        <div className="modal-content">
                          {/* Second modal header */}
                          <div className="modal-header">
                            <p
                              className="modal-title"
                              id="exampleModalCenterTitle"
                            >
                              <strong>Closing Status...</strong>
                            </p>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              // onClick={() => setSecondModalVisible(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div className="row mt-1 mb-2">
                                <div className=" col-sm">
                                  <label
                                    htmlFor=""
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Opening Date
                                  </label>
                                </div>
                                <div className=" col-sm">
                                  <span className=" ">
                                    <input
                                      type="date"
                                      id="StartDate"
                                      name="StartDate"
                                      step="0.01"
                                      value={
                                        depositData && depositData.StartDate
                                      }
                                      readOnly
                                      className="form-control bg-white"
                                      //value={MemberId}
                                      // onChange={handleMemberIdChange}
                                      min={0}
                                      pattern="[0-9]*"
                                    />{" "}
                                  </span>
                                </div>
                                <div className="col-sm">
                                  <label
                                    htmlFor=""
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Opening Amount
                                  </label>
                                </div>
                                <div className="col-sm-3">
                                  <input
                                    type="text"
                                    id="MonthlyDepositmonthly_deposit"
                                    name="MonthlyDeposit"
                                    step="0.01"
                                    className="form-control no-outline-login"
                                    value={
                                      depositData && depositData.MonthlyDeposit
                                    }
                                    // value={formData.openingAmount}
                                    onChange={handleInputChange}
                                    min={0}
                                    pattern="[0-9]*[.]?[0-9]*"
                                  />
                                </div>
                              </div>
                              <div className="row mt-1 mb-2">
                                <div className="col">
                                  <label
                                    htmlFor=""
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Maturity Date
                                  </label>
                                </div>
                                <div className="col">
                                  <div>
                                    <input
                                      type="date"
                                      className="form-control small-label bg-white"
                                      id="floatingInput"
                                      name="maturityOn"
                                      value={depositData && depositData.EndDate}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <label
                                    htmlFor=""
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Due Amount
                                  </label>
                                </div>
                                <div className="col">
                                  <input
                                    type="text"
                                    className="form-control small-label bg-white"
                                    id="floatingInput"
                                    name="MaturityAmt"
                                    value={
                                      depositData && depositData.MaturityAmt
                                    }
                                    disabled
                                    min={0}
                                  />
                                </div>
                              </div>
                              <hr />
                              <div className="row mt-1">
                                <div className="col-sm-8">
                                  <div className="row">
                                    <div className="col-sm">
                                      <label
                                        htmlFor=""
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Close Date
                                      </label>
                                    </div>
                                    <div className="col-sm py-1">
                                      <input
                                        type="date"
                                        className="form-control bg-white"
                                        id="floatingInput"
                                        name="StartDate"
                                        value={getCurrentDate()}
                                        readOnly
                                        min={getCurrentDate()}
                                      />
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col">
                                      <label
                                        htmlFor=""
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Period
                                      </label>
                                    </div>
                                    <div className="col py-1">
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <input
                                            className="form-control  small-label bg-white"
                                            id="floatingInput"
                                            name="deposit_period"
                                            value={
                                              depositData &&
                                              depositData.deposit_period
                                            }
                                            disabled
                                          />
                                        </div>
                                        <div className="col-sm-6">
                                          <input
                                            type="text"
                                            id="InterestRate"
                                            name="InterestRate"
                                            step="0.01"
                                            className="form-control no-outline-login"
                                            //value={MemberId}
                                            placeholder="DAYS"
                                            // onChange={handleMemberIdChange}
                                            min={0}
                                            pattern="[0-9]*"
                                          />{" "}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mb-1">
                                    <div className="col ">
                                      <label
                                        htmlFor=""
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Interest
                                      </label>
                                    </div>
                                    <div className="col py-1">
                                      <input
                                        type="text"
                                        step={0.01}
                                        className="form-control small-label bg-white"
                                        id="floatingInput"
                                        name="InterestRate"
                                        value={
                                          depositData &&
                                          depositData.InterestRate
                                        }
                                        min={0}
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  <div className="row mb-2">
                                    <div className="col py-1 ">
                                      <label
                                        htmlFor=""
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "bold",
                                          color: "red",
                                        }}
                                      >
                                        Amount To Withdraw
                                      </label>
                                    </div>
                                    <div className="col">
                                      <input
                                        type="number"
                                        id="MaturityAmt"
                                        name="MaturityAmt"
                                        step="0.01"
                                        className="form-control no-outline-login"
                                        value={
                                          depositData && depositData.MaturityAmt
                                        }
                                        onChange={handleMemberIdChange}
                                        min={0}
                                        pattern="[0-9]*"
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-4"></div>
                                <hr />
                              </div>

                              <div className="row">
                                <div className="col">
                                  <label
                                    htmlFor=""
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      color: "red",
                                    }}
                                  >
                                    Deposit to pay
                                  </label>
                                </div>
                                <div className="col">
                                  <div>
                                    <input
                                      type="number"
                                      id="MonthlyDeposit"
                                      name="MonthlyDeposit"
                                      step="0.01"
                                      className="form-control no-outline-login"
                                      value={
                                        depositData &&
                                        depositData.MonthlyDeposit
                                      }
                                      // value={formData.openingAmount}
                                      onChange={handleInputChange}
                                      min={0}
                                      pattern="[0-9]*[.]?[0-9]*"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <label
                                    htmlFor=""
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      color: "red",
                                    }}
                                  >
                                    Interest to pay*
                                  </label>
                                </div>
                                <div className="col">
                                  <div>
                                    <span className=" ">
                                      <input
                                        type="number"
                                        id="InterestAmt"
                                        name="InterestAmt"
                                        step="0.01"
                                        className="form-control bg-white"
                                        value={
                                          depositData && depositData.InterestAmt
                                        }
                                        onChange={handleMemberIdChange}
                                        min={0}
                                        pattern="[0-9]*"
                                        required
                                      />{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-primary"
                              style={{
                                padding: "7px 25px 7px 25px",
                                // backgroundColor: "Blue",
                                color: "white",
                                fontWeight: "bold",
                                border: "none",
                                borderRadius: "7px",
                                fontSize: "15px",
                              }}
                              onClick={handleModalClick}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-dismiss="modal"
                              style={{
                                padding: "7px 25px 7px 25px",
                                backgroundColor: "red",
                                color: "white",
                                fontWeight: "bold",
                                border: "none",
                                borderRadius: "7px",
                                fontSize: "15px",
                              }}
                              // onClick={() => setSecondModalVisible(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* //////////////////////// */}
                    <Link to="/Home">
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
                    </Link>
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
