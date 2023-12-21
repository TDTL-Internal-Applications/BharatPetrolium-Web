import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/deposit.css";

export default function ViewCashCertificate() {
    const [depositData, setDepositData] = useState([]);
    const [accountNumber, setAccountNumber] = useState("");


    const handleAccountNumberChange = async (newRDID) => {
        const data = {
            RDID: newRDID,
            Account_type:"Cash Certificate"
        }
        if (!newRDID) {
            setDepositData("");
        }
        try {
            const response = await axios.post("http://bpcl.kolhapurdakshin.com:8000/rd_detail/", data);
            const jsonData = response.data;
            setDepositData(jsonData.result_set[0]);
            console.log(depositData);
        } catch (error) {
            console.error("Error fetching employee numbers:", error);
        }
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
                        <div className="H1-Heading-Main">Cash Certificate Deposit</div>
                    </div>

                    <div className="container">
                        {/* Your first form code */}
                        <div className="row First-Main-Row  pt-3 mb-1">
                            {/* Basic Information  */}
                            <form>
                                <div className="H2-Sub-Heading ">Basic Information</div>

                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <div class="">
                                            <label for="memberId" className="small-label">
                                                Member No
                                            </label>
                                            <div className="row">
                                                <div className="col-sm-3 mb-1">
                                                    <input
                                                        type="text"
                                                        id="memberId"
                                                        name="member_id"
                                                        class="form-control small-label"
                                                        // value={memberNumbers.member_id}
                                                        min={0}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-sm-9 ">
                                                    <input
                                                        type="text"
                                                        id="memberId"
                                                        name="member_id"
                                                        class="form-control small-placeholder"
                                                        // placeholder="Enter Member No"
                                                        value={depositData && depositData.member_id}
                                                        min={0}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <div class=" ">
                                            <label for="rdId" className="small-label">
                                                Employee No
                                            </label>
                                            <input
                                                type="text"
                                                id="rdId"
                                                name="employeeno"
                                                class="form-control small-placeholder"
                                                // placeholder="Enter Employee No"
                                                value={depositData && depositData.emp_no}
                                                min={0}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <div class="">
                                            <label for="accountNumber" className="small-label">
                                                Account No*
                                            </label>
                                            <input
                                                type="text"
                                                class="form-control small-placeholder"
                                                id="RDID"
                                                name="RDID"
                                                value={accountNumber}
                                                onChange={(e) => {
                                                    const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                                    setAccountNumber(numericValue);
                                                    handleAccountNumberChange(numericValue);

                                                }}
                                            />


                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <div className="">
                                            <label htmlFor="certificateNo" className="small-label">
                                                Certificate No
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
                                                name="title"
                                                class="form-control small-label"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl col-lg-3 col-md-6 col-sm-6 text-start">
                                        <div class="no-outline-login">
                                            <label for="firstName" className="small-label">
                                                First Name
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
                                            Middle Name
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
                                                Last Name
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
                                                BirthDate
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
                                                Age
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
                                <div className="row">
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <label htmlFor="address" className="small-label">
                                            Address
                                        </label>
                                        <div className="mb-1">
                                            <textarea
                                                type="text-area"
                                                className="form-control"
                                                id="address"
                                                name="address"
                                                value={depositData && depositData.resident_address}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <label htmlFor="city" className="small-label">
                                            City
                                        </label>
                                        <div className="mb-1">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="city"
                                                name="city"
                                                value={depositData && depositData.city}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <label htmlFor="pinCode" className="small-label">
                                            Pin Code
                                        </label>
                                        <div className="mb-1">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="pinCode"
                                                name="pinCode"
                                                value={depositData && depositData.pincode}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
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

                                <div className="H2-Sub-Heading pt-2">
                                    Member Bank Account Details
                                </div>
                                <div className="row">
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
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
                                                // value={formData.accountOpeningType}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
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
                                                // value={formData.depositorCategory}
                                                disabled
                                            />

                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
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
                                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
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
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
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
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
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
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 text-start">
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
                                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
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
                                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start">
                                        <label className="small-label" htmlFor="floatingInput">
                                            MICR Code
                                        </label>
                                        <div className="">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingInput"
                                                disabled
                                            // placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 text-start mb-3">
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

                                <div className="Border-Red px-2 py-2 mb-2">
                                    <div className=" mb-1" style={{ color: "red" }}>
                                        USE ONLY, IF DEPOSIT TRANSFER FROM OTHER BRANCH
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 text-start">
                                            <label
                                                htmlFor="floatingInput"
                                                className="small-label"
                                                style={{ color: "red" }}
                                            >
                                                Transaction Date
                                            </label>
                                            <div>
                                                <input
                                                    type="date"
                                                    className="form-control small-label"
                                                    id="floatingInput"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 text-start">
                                            <label
                                                htmlFor="floatingInput"
                                                className="small-label"
                                                style={{ color: "red" }}
                                            >
                                                Old A/c No
                                            </label>
                                            <div>
                                                <input
                                                    type="number"
                                                    className="form-control small-label"
                                                    id="floatingInput"
                                                    min={0}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="col-xl-4 col-lg-4 col-md-4 col-sm-4 text-start"
                                            style={{ color: "red" }}
                                        >
                                            <label htmlFor="floatingInput" className="small-label">
                                                Transfer Detail
                                            </label>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="form-control small-label"
                                                    id="floatingInput"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Border-Black mt-1 mb-2 px-2">
                                    <div className="row pt-1">
                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                                            <label htmlFor="floatingInput" className="small-label">
                                                Open Date
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
                                                Installment Amount
                                            </label>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="form-control small-label"
                                                    id="floatingInput"
                                                    name="MonthlyDeposit"
                                                    value={depositData && depositData.MonthlyDeposit}
                                                    min={0}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                                            <label htmlFor="floatingInput" className="small-label">
                                                Deposit Period
                                            </label>
                                            <div>
                                                <div className="row">
                                                    <div className="col-sm-6 mb-2">
                                                        <input
                                                            className="form-control small-label "
                                                            id="floatingInput"
                                                            name="deposit_period"
                                                            value={depositData && depositData.deposit_period}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label
                                                            className="form-control small-label"
                                                            id="floatingInput"
                                                            style={{ width: "100%" }}
                                                            aria-disabled
                                                        >Months</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                                            <label htmlFor="floatingInput" className="small-label">
                                                Interest Rate
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
                                                Maturity On
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
                                                Maturity Amount
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
                                                style={{ color: "dodgerblue" }}
                                            >
                                                Interest Amount
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
                                                style={{ color: "dodgerblue" }}
                                            >
                                                Paid Date
                                            </label>
                                            <div>
                                                <input
                                                    type="date"
                                                    className="form-control small-label"
                                                    id="floatingInput"
                                                    name="paidDate"
                                                    //   value={formData.paidDate}
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
                                                disabled
                                                min={0}
                                            />
                                        </div>
                                        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 text-start">
                                            <label
                                                htmlFor="floatingInput"
                                                className="small-label"
                                                style={{ color: "red" }}
                                            >
                                                Interest Provision Date
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
                                                style={{ color: "red" }}
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
                                            <label htmlFor="floatingInput" className="small-label" >
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
                                            <label htmlFor="floatingInput" className="small-label" style={{ color: "blue" }}>
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
                                            Nominee Name
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
                                            BirthDate
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
                                        <label htmlFor="floatingInput" className="small-label" style={{ color: "red" }}>
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
                                        <label htmlFor="floatingInput" className="small-label" style={{ color: "red" }}>
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
                                        <label htmlFor="floatingInput" className="small-label" style={{ color: "red" }}>
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
                                        <label htmlFor="floatingInput" className="small-label" style={{ color: "red" }}>
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

                                <div className="row mb-3">
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <label htmlFor="floatingInput" className="small-label">
                                            Introducer No
                                        </label>
                                        <div className="row">
                                            <div className="col-sm-3 mb-1">
                                                <input
                                                    type="text"
                                                    id="memberId"
                                                    name="member_id"
                                                    class="form-control small-placeholder"
                                                    // placeholder="A"
                                                    // value={formData.member_id}
                                                    min={0}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-sm-9 ">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="floatingInput"
                                                    name="introducerNo"
                                                    //   value={formData.introducerNo}
                                                    min={0}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-9 col-lg-9 col-md-6 col-sm-6 text-start">
                                        <label htmlFor="" className="small-label"></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id=""
                                            name="introducerNo"
                                            readOnly

                                        />
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
