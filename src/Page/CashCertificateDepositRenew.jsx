import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";
import { Link } from "react-router-dom";
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { MdEventRepeat } from "react-icons/md";

export default function CashCertificateDepositRenew() {
  const [memberNumbers, setMemberNumbers] = useState([]);
  let[invalid,setInvalid]=useState(
    Array.from({ length: 4 }, () => false)
);

let requiredArr=[
  'member_id',
  'StartDate',
  'MonthlyDeposit',
  'deposit_period',
];

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


  let isNotificationShown = false;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    isNotificationShown = false;

    console.log("Form Data:", formData);

    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/rd_submit/", formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: "Cash Certificate deposit created successfully!",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });

        let temp=[...invalid];

        for(let i=0;i<requiredArr.length;i++)
        {
         
            temp[i]=false;
          
        }
        setInvalid(temp);

        setFormData({
          accountType: "Cash Certificate",
          RDID: "",
          initial:"",
          MonthlyDeposit: "",
          InterestRate: "",
          deposit_period: "",
          StartDate: getCurrentDate(),
          maturity_amount: "",
          EndDate: "",
          InterestAmt: "",
          firstName: "",
          middleName: "",
          lastName: "",
          gender: "",
          address: "",
          //   StartDate: "",
          member_id: "",
          birthDate: "",
          age: "",
          bloodGroup: "",
          joinDate: "",
          confirmDate: "",
          email: "",
          panNo: "",
          mobileNumber: "",
          maritalStatus: "",

          employeeno: "",
          // Form 2 fields

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
          bankAcNo: "",
          bankName: "",
          branchName: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
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
                Swal.getPopup().style.borderRadius = "25px";
                const confirmButton = Swal.getConfirmButton();
                confirmButton.classList.add("custom-swal-button");
              },
            });
            let temp=[...invalid];

            for(let i=0;i<requiredArr.length;i++)
            {
              if(formData[requiredArr[i]]==="")
              {
                temp[i]=true;
              }
              else{
                temp[i]=false;
              }
            }
            setInvalid(temp);
          }
        } else {
          // doesn't have the expected structure
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to submit data. Please try again.",
            didOpen: () => {
              Swal.getPopup().style.borderRadius = "25px";
              const confirmButton = Swal.getConfirmButton();
              confirmButton.classList.add("custom-swal-button");
            },
          });
          let temp=[...invalid];

          for(let i=0;i<requiredArr.length;i++)
          {
            if(formData[requiredArr[i]]==="")
            {
              temp[i]=true;
            }
            else{
              temp[i]=false;
            }
          }
          setInvalid(temp);
        }
      });
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    accountType: "Cash Certificate",
    accountNumber: "",
    StartDate: getCurrentDate(),
    initial: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    age: "",
    member_id: "",
    address: "",
    city: "",
    pinCode: "",
    mobileNumber: "",
    panNo: "",
    accountOpeningType: "",
    depositorCategory: "",
    autoRenewalExtraPercentage: "",
    transactionDate: "",
    oldAccountNumber: "",
    transferDetail: "",
    openDate: "",
    MonthlyDeposit: "",
    deposit_period: "",
    InterestRate: "",
    maturity_date: "",
    maturity_amount: "",
    interestAmount: "",
    paidDate: "",
    employeeno: "",
    certificate_no: "",
    extra: "",
    MICR_no: "",
    old_acc_no: "",

    bankName: "",
    branchName: "",
    memberNo: "",
    memberName: "",
    bankAcNo: "",
    ifscCode: "",
    uidNo: "",
    effectDate: "",
    effectAmount: "",
    interestProvisionDate: "",
    interestProvisionAmount: "",
    nomineeName: "",
    nomineeBirthdate: "",
    nomineeAge: "",
    nomineeRelation: "",
    contributedBy: "",
    introducerNo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      let updatedFormData = { ...prevData, [name]: value };
      if (name === "birthDate") {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
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

  const handleInputChangeFor = (MonthlyDeposit, deposit_period, StartDate) => {
    setFormData({
      ...formData,
      MonthlyDeposit: MonthlyDeposit,
      deposit_period: deposit_period,
      StartDate: StartDate || getCurrentDate(),
      accountType: "Cash Certificate",
    });
    const requestData = {
      MonthlyDeposit: MonthlyDeposit,
      deposit_period: deposit_period,
      StartDate: StartDate || getCurrentDate(),
      accountType: "Cash Certificate",
    };

    if (MonthlyDeposit !== undefined && MonthlyDeposit !== "") {
      if (deposit_period !== undefined && deposit_period !== "") {
        if (StartDate !== undefined && StartDate !== "") {
          fetch("http://bpcl.kolhapurdakshin.com:8000/Calculate_amt/", {
            method: "POST", // or 'PUT' or 'PATCH' depending on your API
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
              // Handle the API response and update the state with the new fields
              setFormData({
                ...formData,
                MonthlyDeposit: MonthlyDeposit,
                // InterestRate: InterestRate,
                deposit_period: deposit_period,
                StartDate: StartDate,
                maturityOn: data.maturity_date,
                MaturityAmt: data.total_value,
                interestAmount: data.interest_amount,
                InterestRate: data.interest_rate,
              });
            })
            .catch((error) => {
              // Log more detailed information about the error
              console.error("Error:", error);
              console.error("Error Details:", error.message, error.stack);
            });
        }
      }
    }
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
        initial:"",
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
        autoRenewalOption: '', 
        resident_city: "",
        address: "",
        bankName: "",
        branchName: "",
        MICR_no:"",
        bankAcNo: "",
        ifscCode: "",
        nomineeName: "",
        nomineeBirthdate: "",
        nomineeAge: "",
        nomineeRelation: "",
        employeeno: "",
        cetificate_no: "",
      }));
      return;
    }
    axios
      .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`)
      .then((ress) => {
        if (ress.data.members && ress.data.members.length > 0) {
          const memberData = ress.data.members[0];
  
          if (memberData["status"] === "N") {
            Swal.fire({
              icon: "warning",
              title: "Retire Member",
              text: "This member is inactive.",
              didOpen: () => {
                Swal.getPopup().style.borderRadius = "25px";
                const confirmButton = Swal.getConfirmButton();
                confirmButton.classList.add("custom-swal-button");
              },
            });
          }

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
            resident_pincode: memberData["resident_pincode"],
            resident_city: memberData["resident_city"],
            address: memberData["resident_address"],
            MICR_no: memberData["MICR_no"],
            bankName: memberData["bank_name"],
            branchName: memberData["branch_name"],
            bankAcNo: memberData["bank_ac_no"],
            ifscCode: memberData["IFSC_code"],
            nomineeName: memberData["nominee_name"],
            nomineeBirthdate: memberData["nominee_birthdate"],
            nomineeAge: memberData["nominee_age"],
            nomineeRelation: memberData["relation"],
            employeeno: memberData["emp_no"],
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
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  const [joinName1Data, setJoinName1Data] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
    age: "",
  });
  const [joinName2Data, setJoinName2Data] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
    age: "",
  });
  const [joinName3Data, setJoinName3Data] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
    age: "",
  });
  const [joinName4Data, setJoinName4Data] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
    age: "",
  });
  const handleJoinName1Change = (e) => {
    const { name, value } = e.target;
    const newJoinName1Data = { ...joinName1Data, [name]: value };

    if (name === "birthdate") {
      newJoinName1Data.age = calculateAge(value);
    }

    setJoinName1Data(newJoinName1Data);
  };
  const handleJoinName2Change = (e) => {
    const { name, value } = e.target;
    const newJoinName2Data = { ...joinName2Data, [name]: value };
  
    if (name === "birthdate2") {
      newJoinName2Data.age2 = calculateAge(value);
    }
  
    setJoinName2Data(newJoinName2Data);
  };
  const handleJoinName3Change = (e) => {
    const { name, value } = e.target;
    const newJoinName3Data = { ...joinName3Data, [name]: value };
  
    if (name === "birthdate3") {
      newJoinName3Data.age3 = calculateAge(value);
    }
    setJoinName3Data(newJoinName3Data);
  };
  const handleJoinName4Change = (e) => {
    const { name, value } = e.target;
    const newJoinName4Data = { ...joinName4Data, [name]: value };
    if (name === "birthdate4") {
      newJoinName4Data.age4 = calculateAge(value);
    }
    setJoinName4Data(newJoinName4Data);
  };

  let [forJoinee2, setForJoinee2] = useState(false);
  let [forJoinee3, setForJoinee3] = useState(false);
  let [forJoinee4, setForJoinee4] = useState(false);

  function handleJoinee() {
    if (!forJoinee2) {
      setForJoinee2(true);
    } else if (!forJoinee3) {
      setForJoinee3(true);
    } else if (!forJoinee4) {
      setForJoinee4(true);
    }
  }
 
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading1 Main */}
          <div className="container d-flex text-start w-100 pb-1">
          <div className="H1-Heading-Main d-flex align-items-center">
          <MdEventRepeat style={{fontSize:"32px",color:"orange"}}/>&nbsp;Cash Certificate Deposit Renew
            </div>
          </div>

          <div className="container">
            {/* Your first form code */}
            <div className="row First-Main-Row  pt-3 mb-3">
              {/* Basic Information  */}
              <form>
              <div className="H2-Sub-Heading ">Basic Information</div>
                <div className="row">
                  <div className="col-xl-1 col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="">
                      <label for="memberId" className="small-label">
                        Class
                      </label>
                      <input
                        type="text"
                        id="member_class"
                        name="member_class"
                        class="form-control small-label bg-white"
                        readOnly
                        value={formData.member_class}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <label for="memberId" className="small-label">
                      Member No*
                    </label>
                    <div class="">
                      <input
                        type="text"
                        id="memberId"
                        name="member_id"
                        class={
                          invalid[0]
                            ? "form-control small-label border-danger"
                            : "form-control small-label"
                        }
                        // placeholder="Enter Member No"
                        value={formData.member_id}
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
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class=" ">
                      <label for="employeeno" className="small-label">
                        Employee No
                      </label>
                      <input
                        type="text"
                        id="rdId"
                        name="employeeno"
                        class="form-control small-label bg-white"
                        value={formData.employeeno}
                        readOnly
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div className="no-outline-login">
                      <label htmlFor="certificate_no" className="small-label">
                        Certificate Number
                      </label>
                      <input
                        type="text"
                        className="form-control small-label"
                        id="certificate_no"
                        name="certificate_no"
                        value={formData.certificate_no}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "certificate_no",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="accountNumber" className="small-label">
                        Account No
                      </label>
                      <input
                        type="text"
                        class="form-control small-label"
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "accountNumber",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                        maxLength={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label htmlFor="" className="small-label">
                      Initial
                    </label>
                    <input
                      name="initial"
                      value={formData.initial}
                      onChange={handleInputChange}
                      className="form-control small-label bg-white"
                      readOnly
                    ></input>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="firstName" className="small-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        class="form-control small-label bg-white"
                        id="firstName"
                        value={formData.firstName}
                        readOnly
                        // onChange={(e) => {
                        //   const alphaValue = e.target.value.replace(
                        //     /[^A-z.]/g,
                        //     ""
                        //   );
                        //   handleInputChange({
                        //     target: { name: "firstName", value: alphaValue },
                        //   });
                        // }}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start ">
                    <label htmlFor="middleName" className="small-label">
                      Middle Name
                    </label>
                    <div>
                      <input
                        type="text"
                        name="middleName"
                        className="form-control small-label bg-white"
                        value={formData.middleName}
                        readOnly
                        // onChange={(e) => {
                        //   const alphaValue = e.target.value.replace(
                        //     /[^A-z.]/g,
                        //     ""
                        //   );
                        //   handleInputChange({
                        //     target: { name: "middleName", value: alphaValue },
                        //   });
                        // }}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="">
                      <label for="lastName" className="small-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        class="form-control small-label bg-white"
                        id="lastName"
                        value={formData.lastName}
                        readOnly
                        // onChange={(e) => {
                        //   const alphaValue = e.target.value.replace(
                        //     /[^A-z.]/g,
                        //     ""
                        //   );
                        //   handleInputChange({
                        //     target: { name: "lastName", value: alphaValue },
                        //   });
                        // }}
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="row">
                      <div className="col-sm-8">
                        <label for="birthDate" className="small-label">
                          BirthDate
                        </label>
                        <input
                          type="date"
                          class="form-control small-label bg-white"
                          id="birthDate"
                          name="birthDate"
                          value={formData.birthDate}
                          readOnly
                        />
                      </div>
                      <div className="col-sm-4">
                        <label for="" className="small-label">
                          Age
                        </label>
                        <input
                          type="text"
                          class="form-control small-label bg-white"
                          id="age"
                          minLength={2}
                          maxLength={2}
                          name="memberAge"
                          value={formData.age}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="H2-Sub-Heading pt-3">Joinee Details</div>
                {/* Joinee 1  */}
                <div className="py-2 joinee-bg">
                  <div className="row">
                    <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                      <div className=" mb-1">
                        <label for="firstName" className="small-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="firstName"
                          value={joinName1Data.firstName}
                          onChange={(e) => {
                            const alphaValue = e.target.value.replace(
                              /[^A-z.]/g,
                              ""
                            );
                            handleJoinName1Change({
                              target: { name: "firstName", value: alphaValue },
                            });
                          }}
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
                          value={joinName1Data.middleName}
                          onChange={(e) => {
                            const alphaValue = e.target.value.replace(
                              /[^A-z.]/g,
                              ""
                            );
                            handleJoinName1Change({
                              target: { name: "middleName", value: alphaValue },
                            });
                          }}
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
                          value={joinName1Data.lastName}
                          onChange={(e) => {
                            const alphaValue = e.target.value.replace(
                              /[^A-z.]/g,
                              ""
                            );
                            handleJoinName1Change({
                              target: { name: "lastName", value: alphaValue },
                            });
                          }}
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
                          value={joinName1Data.birthdate}
                          onChange={handleJoinName1Change}
                          // placeholder="name@example.com"
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
                          minLength={2}
                          maxLength={2}
                          class="form-control small-placeholder"
                          value={joinName1Data.age}
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-center">
                      <div className="">
                        <label for="" className="small-label"></label>
                        <br />
                        <span
                          type="button"
                          className="btn "
                          onClick={() => {
                            handleJoinee();
                          }}
                          style={{ padding: "2px 10px 2px 10px" }}
                        >
                          <FaPlusCircle
                            style={{
                              fontSize: "25px",
                              color: "#3ff0bc",
                              outline: "none",
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  {forJoinee2 ? (
                    <div className="row">
                      <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                        <div className=" mb-1">
                          <label for="firstName2" className="small-label">
                            First Name
                          </label>

                          <input
                            type="text"
                            class="form-control"
                            name="firstName2"
                            value={joinName2Data.firstName2}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName2Change({
                                target: {
                                  name: "firstName2",
                                  value: alphaValue,
                                },
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                        <div className=" mb-1">
                          <label for="middleName2" className="small-label">
                            Middle Name
                          </label>

                          <input
                            type="text"
                            name="middleName2"
                            class="form-control small-placeholder"
                            value={joinName2Data.middleName2}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName2Change({
                                target: {
                                  name: "middleName2",
                                  value: alphaValue,
                                },
                              });
                            }}
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
                            value={joinName2Data.lastName2}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName2Change({
                                target: { name: "lastName2", value: alphaValue },
                              });
                            }}
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
                            name="birthdate2"
                            value={joinName2Data.birthdate2}
                            onChange={handleJoinName2Change}
                          />
                        </div>
                      </div>
                      <div className="col-xl-1 col-lg-2 col-md-6 col-sm-6 text-start">
                        <div className=" mb-1">
                          <label for="age2" className="small-label">
                            Age
                          </label>
                          <input
                            type="text"
                            name="age2"
                            minLength={2}
                            maxLength={2}
                            class="form-control small-placeholder"
                            value={joinName2Data.age2}
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-center">
                        <div className="row">
                          <div className="col-xl-6 text-end">
                            <label for="" className="small-label"></label>
                            <br />
                            <span
                              type="button"
                              className="btn"
                              onClick={() => {
                                setForJoinee2(false);
                              }}
                              style={{ padding: "2px 10px 2px 10px" }}
                            >
                              <FaMinusCircle
                                style={{ fontSize: "25px", color: "#ffc107" }}
                              />
                            </span>
                          </div>
                          <div className="col-xl-6 text-start">
                            <label for="" className="small-label"></label>
                            <br />
                            <span
                              type="button"
                              className="btn "
                              onClick={() => {
                                handleJoinee();
                              }}
                              style={{ padding: "2px 10px 2px 10px" }}
                            >
                              <FaPlusCircle
                                style={{
                                  fontSize: "25px",
                                  color: "#3ff0bc",
                                  outline: "none",
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {forJoinee3 ? (
                    <div className="row">
                      <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                        <div className=" mb-1">
                          <label for="firstName3" className="small-label">
                            First Name
                          </label>

                          <input
                            type="text"
                            class="form-control"
                            name="firstName3"
                            value={joinName3Data.firstName3}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName3Change({
                                target: {
                                  name: "firstName3",
                                  value: alphaValue,
                                },
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                        <div className="mb-1">
                          <label for="" className="small-label">
                            Middle Name
                          </label>

                          <input
                            type="text"
                            name="middleName3"
                            class="form-control small-placeholder"
                            value={joinName3Data.middleName3}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName3Change({
                                target: {
                                  name: "middleName3",
                                  value: alphaValue,
                                },
                              });
                            }}
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
                            name="lastName3"
                            class="form-control small-placeholder"
                            id="floatingInput"
                            value={joinName3Data.lastName3}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName3Change({
                                target: { name: "lastName3", value: alphaValue },
                              });
                            }}
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
                            name="birthdate3"
                            value={joinName3Data.birthdate3}
                            onChange={handleJoinName3Change}
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
                            name="age3"
                            minLength={2}
                            maxLength={2}
                            class="form-control small-placeholder"
                            value={joinName3Data.age3}
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                        <div className="row">
                        <div className="col-xl-6 text-end">
                            <label for="" className="small-label"></label>
                            <br />
                            <span
                              type="button"
                              className="btn "
                              onClick={() => {
                                setForJoinee3(false);
                              }}
                              style={{ padding: "2px 10px 2px 10px" }}
                            >
                              <FaMinusCircle
                                style={{ fontSize: "25px", color: "#ffc107" }}
                              />
                            </span>
                          </div>
                          <div className="col-xl-6 text-start">
                            <label for="" className="small-label"></label>
                            <br />
                            <span
                              type="button"
                              className="btn "
                              onClick={() => {
                                handleJoinee();
                              }}
                              style={{ padding: "2px 10px 2px 10px" }}
                            >
                              <FaPlusCircle
                                style={{
                                  fontSize: "25px",
                                  color: "#3ff0bc",
                                  outline: "none",
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {forJoinee4 ? (
                   <div className="row">
                      <div className="col-xl col-lg-2 col-md-6 col-sm-6 text-start">
                        <div className=" mb-1">
                          <label for="firstName3" className="small-label">
                            First Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="firstName4"
                            value={joinName4Data.firstName4}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName4Change({
                                target: {
                                  name: "firstName4",
                                  value: alphaValue,
                                },
                              });
                            }}
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
                            name="middleName4"
                            class="form-control small-placeholder"
                            value={joinName4Data.middleName4}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName4Change({
                                target: {
                                  name: "middleName4",
                                  value: alphaValue,
                                },
                              });
                            }}
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
                            value={joinName1Data.lastName}
                            onChange={(e) => {
                              const alphaValue = e.target.value.replace(
                                /[^A-z.]/g,
                                ""
                              );
                              handleJoinName1Change({
                                target: { name: "lastName", value: alphaValue },
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                        <div className=" mb-1">
                          <label for="birthdate4" className="small-label">
                            BirthDate
                          </label>
                          <input
                            type="date"
                            class="form-control small-placeholder"
                            id="floatingInput"
                            name="birthdate4"
                            // value={joinName1Data.birthdate}
                            onChange={handleJoinName4Change}
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
                            name="age4"
                            minLength={2}
                            maxLength={2}
                            class="form-control small-placeholder"
                            value={joinName4Data.age4}
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-center">
                  
                        <div className="">
                            <label for="" className="small-label"></label>
                            <br />
                            <span
                              type="button"
                              className="btn "
                              onClick={() => {
                                setForJoinee4(false);
                              }}
                              style={{ padding: "2px 10px 2px 10px" }}
                            >
                              <FaMinusCircle
                                style={{ fontSize: "25px", color: "#ffc107" }}
                              />
                            </span>
                          </div>        
                      
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="H2-Sub-Heading pt-2">Address Details</div>
                {/* Address Details */}
                <div className="row mb-2">
                  <div className="col-xl-4   col-lg-4 col-md-6 col-sm-12 text-start">
                    <label htmlFor="address" className="small-label">
                      Address
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 text-start">
                    <label htmlFor="nativeplace_city" className="small-label">
                      City
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="nativeplace_city"
                        name="nativeplace_city"
                        value={formData.nativeplace_city}
                      />
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 text-start">
                    <label
                      htmlFor="nativeplace_pincode"
                      className="small-label"
                    >
                      Pin Code
                    </label>
                    <div className="mb-1">
                      <input
                        type="text"
                        className="form-control"
                        id="nativeplace_pincode"
                        name="nativeplace_pincode"
                        value={formData.nativeplace_pincode}
                      />
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 text-start">
                    <div className="">
                      <label htmlFor="autoRenewal" className="small-label">
                        A/c Auto Renewal
                      </label>
                      <select
                        className="form-select small-label"
                        id="autoRenewal"
                        name="autoRenewalOption"
                        value={formData.autoRenewalOption}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select Option
                        </option>

                        <option value="NO">NO</option>
                        <option value="With Interest">With Interest</option>
                        <option value="Without Interest">
                          Without Interest
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <div class="no-outline-login">
                      <label for="mobileNumber" className="small-label">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        class="form-control small-label"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                      />
                    </div>
                  </div>
                </div>
                <div className="H2-Sub-Heading">
                  Member Bank Account Details
                </div>
                <div className="row mb-3">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 text-start">
                    <label
                      className="small-label"
                      htmlFor="accountOpeningType"
                      style={{ color: "red" }}
                    >
                      Account Opening Type
                    </label>
                    <div className="">
                      <select
                        className="form-select  small-label"
                        id="accountOpeningType"
                        name="accountOpeningType"
                        value={formData.accountOpeningType}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          SELF
                        </option>
                        <option value="SELF">Other</option>
                      </select>
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
                      <select
                        className="form-select  small-label"
                        id="depositorCategory"
                        name="depositorCategory"
                        value={formData.depositorCategory}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          GENERAL
                        </option>
                        <option value="GENERAL">GENERAL</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12 text-start">
                    <div class="no-outline-login">
                      <label for="panNo" className="small-label">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        class="form-control small-label bg-white"
                        id="panNo"
                        name="panNo"
                        value={formData.panNo}
                        readOnly
                  
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
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="extrapercentage"
                        value={formData.extrapercentage}
                        min={0}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "extrapercentage",
                              value: numericValue,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Bank Name
                    </label>
                    <div className="">
                      <input
                        className="form-control bg-white"
                        id="floatingInput"
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        readOnly
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
                        className="form-control bg-white"
                        id="floatingInput"
                        name="bankAcNo"
                        value={formData.bankAcNo}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      Branch Name
                    </label>
                    <div className="">
                      <input
                        className="form-control bg-white"
                        id="floatingInput"
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        readOnly
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
                        className="form-control bg-white"
                        id="floatingInput"
                        name="rName"
                        value={formData.ifscCode}
                        readOnly
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
                        name="MICR_no"
                        className="form-control bg-white"
                        id="floatingInput"
                        maxLength={9}
                        value={formData.MICR_no}
                        readOnly
                        
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 text-start">
                    <label className="small-label" htmlFor="floatingInput">
                      UID No
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        name="uidNo"
                        value={formData.uidNo}
                        maxLength={12}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "uidNo", value: numericValue },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

              
                <div className="Border-Black px-2 py-2 mb-3">
                  <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Deposit Date*
                      </label>
                      <div>
                        <input
                          type="date"
                          className={(invalid[1])?"form-control small-label border-danger":"form-control small-label"}
                          id="floatingInput"
                          name="StartDate"
                          value={formData.StartDate}
                          onChange={(e) => {
                            handleInputChangeFor(
                              formData.MonthlyDeposit,
                           
                              formData.deposit_period,
                              e.target.value
                            );
                          }}
                          min={getCurrentDate()}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Deposit Amount*
                      </label>
                      <div>
                        <input
                          type="text"
                          className={(invalid[2])?"form-control small-label border-danger":"form-control small-label"}
                          id="floatingInput"
                          name="MonthlyDeposit"
                          value={formData.MonthlyDeposit}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChangeFor(
                              numericValue,
                           
                              formData.deposit_period,
                              formData.StartDate
                            );
                          }}
                          min={0}
                          required
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
                            <select
                              className={(invalid[3])?"form-select small-label border-danger":"form-select small-label"}
                              id="floatingInput"
                              name="deposit_period"
                              value={formData.deposit_period}
                              onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                handleInputChangeFor(
                                  formData.MonthlyDeposit,
                                  numericValue,
                                  formData.StartDate,
                              
                                );
                              }}
                              required
                            >
                              <option>Select Period</option>
                              <option value="12">12</option>
                              <option value="24">24</option>
                              <option value="36">36</option>
                              <option value="48">48</option>

                            </select>
                          </div>
                          <div className="col-sm-6">
                            <label
                              className="form-control small-label"
                              id="floatingInput"
                              style={{ width: "100%" }}
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
                          className="form-control small-label bg-white "
                          id="floatingInput"
                          name="InterestRate"
                          value={formData.InterestRate}
                          readOnly
                          maxLength={3}
                        />
                      </div>
                    </div>

                 
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                      >
                        Maturity On
                      </label>
                      <div>
                        <input
                          type="date"
                          className="form-control small-label bg-white"
                          id="floatingInput"
                          name="maturityOn"
                          value={formData.maturityOn}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Maturity Amount
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control small-label bg-white"
                          id="floatingInput"
                          name="MaturityAmt"
                          value={formData.MaturityAmt}
                          readOnly
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label htmlFor="floatingInput" className="small-label">
                        Interest Amount/Paid Date
                      </label>
                      <div>
                        <input
                          type="text"
                          step={0.01}
                          className="form-control small-label bg-white"
                          id="floatingInput"
                          name="interestAmount"
                          value={formData.interestAmount}
                          readOnly
                          min={0}
                        />
                      </div>
                    </div>
                    {/* </div> */}
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
                        value={formData.effectDate}
                        onChange={handleInputChange}
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
                        value={formData.effectAmount}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "effectAmount",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                      />
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                      <label
                        htmlFor="floatingInput"
                        className="small-label"
                        style={{ color: "#ffc109" }}
                      >
                        Interest Provision Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="floatingInput"
                        name="interestProvisionDate"
                        value={formData.interestProvisionDate}
                        onChange={handleInputChange}
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
                        value={formData.interestProvisionAmount}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "interestProvisionAmount",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Nominee Name
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white"
                      id="floatingInput"
                      name="nomineeName"
                      value={formData.nomineeName}
                      
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      BirthDate
                    </label>
                    <input
                      type="date"
                      className="form-control bg-white"
                      id="floatingInput"
                      name="nomineeBirthdate"
                      value={formData.nomineeBirthdate}
                      readOnly
                   
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control no-outline bg-white"
                      id="floatingInput"
                      name="age"
                      value={formData.nomineeAge}
                      readOnly
                      maxLength={2}
                     
                    />
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                    <label htmlFor="floatingInput" className="small-label">
                      Relation
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white"
                      id="floatingInput"
                      name="relation"
                      value={formData.nomineeRelation}
                      readOnly
                   
                    />
                  </div>
                </div>

               
              </form>
              <div className="row mt-2 mb-3">
            <div className="col-sm d-flex justify-content-center">
              <button
                type="button"
                className="mt-2 mx-2"
                onClick={handleFormSubmit}
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
             
            </div>
           
          </div>
            </div>
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
      </div>
    </>
  );
}
