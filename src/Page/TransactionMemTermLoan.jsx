import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "../Style/Global_Classes.css";
import DataTable from "react-data-table-component";

export default function TransactionMemTermLoan() {
  let [loanNo, setLoanNo] = useState("");
  let [sanction, setSanction] = useState("");
  let [loanAmount, setLoanAmount] = useState("");
  let [loanDate, setLoanDate] = useState("");
  let [interestRate, setInterestRate] = useState("");
  let [period, setPeriod] = useState("");
  let [installment, setInstallment] = useState("");
  let [firstDueDate, setFirstDueDate] = useState("");
  let [dueDate, setDueDate] = useState("");
  let [MemberIdForDataTable, setMemberIdForDataTable] = useState("");
  let [fullName, setFullName] = useState("");

  //************************ */
  let [transactionDate, settansactionDate] = useState("");
  let [receiptVoucherNo, setreceiptVoucherNo] = useState("");
  let [particular, setparticular] = useState("");
  let [debit, setdebit] = useState("");
  let [principle, setprinciple] = useState("");
  let [interest, setinterest] = useState("");
  let [penalty, setpenalty] = useState("");
  let [misc, setmisc] = useState("");
  let [total, settotal] = useState("");
  let [balance, setbalance] = useState("");
  let [operator, setoperator] = useState("");
  let [chequeNo, setchequeNo] = useState("");

  useEffect(() => {
    settansactionDate(getCurrentDate());
  }, []);

  useEffect(() => {
    modalApi(loanNo);
  }, [loanNo]);

  //************** */
  const transactionDetails = [
    {
      name: "Transaction Date ",
      selector: "transaction_date",
      sortable: true,
      center: true,
    },
    {
      name: "Receipt/Vourcher No ",
      selector: "rv_no",
      sortable: true,
      center: true,
    },
    {
      name: "Particular ",
      selector: "particular",
      sortable: true,
      center: true,
    },
    {
      name: "Debit ",
      selector: "debit",
      sortable: true,
      center: true,
    },
    {
      name: "Principle ",
      selector: "principle",
      sortable: true,
      center: true,
    },
    {
      name: "Interest ",
      selector: "interest",
      sortable: true,
      center: true,
    },
    {
      name: "Penalty ",
      selector: "penalty",
      sortable: true,
      center: true,
    },
    {
      name: "Misc ",
      selector: "misc",
      sortable: true,
      center: true,
    },
    {
      name: "Total ",
      selector: "total",
      sortable: true,
      center: true,
    },
    {
      name: "Balance ",
      selector: "balance",
      sortable: true,
      center: true,
    },
    {
      name: "Operator ",
      selector: "operator",
      sortable: true,
      center: true,
    },
    {
      name: "chequeNo ",
      selector: "chequeNo",
      sortable: true,
      center: true,
    },
  ];

  //chequeNo
  async function modalApi(newRDID) {
    const dataPost = {
      loan_no: newRDID,
      // Account_type: "Term Deposit",
    };
    if (!newRDID) {
      setData("");
      return;
    }
    try {
      const responseNew = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/loan_repayment/",
        dataPost
      );
      let jsonData = responseNew.data.data;

      console.log(jsonData);
      settansactionDate(jsonData.transaction_date);
      setreceiptVoucherNo(jsonData.receiptVoucherNo);
      setparticular(jsonData.particular);
      setdebit(jsonData.debit);
      setprinciple(jsonData.principle);
      setinterest(jsonData.interest);
      setpenalty(jsonData.penalty);
      setmisc(jsonData.misc);
      settotal(jsonData.total);
      setbalance(jsonData.balance);
      setoperator(jsonData.operator);
      setchequeNo(jsonData.chequeNo);

      // dataArray.push(inputObject)

      // setFullName(jsonData.full_name);
      // dataArray = jsonData.result;
      // dataArray.push(inputObject);
      // setData(dataArray);
      // console.log(depositData);
    } catch (error) {
      console.error("Error fetching employee numbers:", error);
    }
  }
  // }

  useEffect(() => {
    handleAccountNumberChange(MemberIdForDataTable);
  }, [MemberIdForDataTable]);

  const columns2 = [
    {
      name: "Loan No",
      selector: "loan_no",
      sortable: true,

      center: true,
    },
    {
      name: "Sanction",
      selector: "member_id",
      sortable: true,
      center: true,
    },
    {
      name: "Loan Amnt",
      selector: "loan_amt",
      sortable: true,
      center: true,
    },
    {
      name: "Loan Date",
      selector: "loan_date",
      sortable: true,
      center: true,
    },
    {
      name: "Interest Rate",
      selector: "interest_rate",
      sortable: true,
      center: true,
    },
    {
      name: "period",
      selector: "installment_period",
      sortable: true,
      center: true,
    },
    {
      name: "Installment",
      selector: "principle",
      sortable: true,
      center: true,
    },
    {
      name: "1st Due Date",
      selector: "first_due_date",
      sortable: true,
      center: true,
    },
    {
      name: "Due Date",
      selector: "due_date",
      sortable: true,
      center: true,
    },
  ];

  const [data, setData] = useState([]);
  // let inputObject = {

  //     RDID:loanNo,
  //     member_id:sanction,
  //     MonthlyDeposit:loanAmount,
  //     InterestRate:loanDate,
  //     deposit_period: interestRate,
  //     MonthlyDeposit:period,
  //     MonthlyDeposit:installment,
  //     MonthlyDeposit:firstDueDate,
  //     MonthlyDeposit:dueDate
  // }
  let input2 = {
    loan_no: (
      <input
        type="number"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : loanNo}
        // onChange={(e)=>{setLoanNo(e.target.value)}}
        readOnly
      />
    ),
    member_id: (
      <input
        type="number"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : loanAmount}
        // onChange={(e) => {
        //   setSanction(e.target.value);
        // }}
        readOnly
      />
    ),
    loan_amt: (
      <input
        type="number"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : loanAmount}
        // onChange={(e) => {
        //   setLoanAmount(e.target.value);
        // }}
        readOnly
      />
    ),
    loan_date: (
      <input
        type="date"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : loanDate}
        onChange={(e) => {
          setLoanDate(e.target.value);
        }}
        readOnly
      />
    ),
    interest_rate: (
      <input
        type="number"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : interestRate}
        onChange={(e) => {
          setInterestRate(e.target.value);
        }}
        readOnly
      />
    ),
    principle: (
      <input
        type="number"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : period}
        onChange={(e) => {
          setPeriod(e.target.value);
        }}
        readOnly
      />
    ),
    installment_period: (
      <input
        type="number"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : installment}
        onChange={(e) => {
          setInstallment(e.target.value);
        }}
        readOnly
      />
    ),
    first_due_date: (
      <input
        type="date"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : firstDueDate}
        onChange={(e) => {
          setFirstDueDate(e.target.value);
        }}
        readOnly
      />
    ),
    due_date: (
      <input
        type="date"
        style={{ width: "100%", textAlign: "center" }}
        value={MemberIdForDataTable === "" ? "" : dueDate}
        // onChange={(e) => {
        //   setDueDate(e.target.value);
        // }}
        readOnly
      />
    ),
  };
  const dataArray2 = [input2];

  let [selectTagValue, setSelectTagValue] = useState("Repayment Entry");
  //   const columns = [
  //     {
  //         name: "Date",
  //         selector: "transaction_date",
  //         sortable: true,
  //         center: true,
  //         style: {
  //             backgroundColor: "red"
  //         }
  //     },
  //     // Add more columns as needed
  // ];

  const columns = [
    {
      name: "Date",
      selector: "transaction_date",
      sortable: true,
      center: true,
    },
    {
      name: "RV No.",
      selector: "rv_no",
      sortable: true,
      center: true,
    },
    {
      name: "Particular",
      selector: "particular",
      sortable: true,
      center: true,
    },

    {
      name: "Debit",
      selector: "debit",
      sortable: true,
      center: true,
    },
    {
      name: "Principle",
      selector: "principle",
      sortable: true,
      center: true,
    },
    {
      name: "Interest",
      selector: "interest",
      sortable: true,
      center: true,
    },
    {
      name: "Penalty",
      selector: "penalty",
      sortable: true,
      center: true,
    },
    {
      name: "Misc.",
      selector: "misc",
      sortable: true,
      center: true,
    },
    {
      name: "Total",
      selector: "total",
      sortable: true,
      center: true,
    },
    {
      name: "Balance",
      selector: "balance",
      sortable: true,
      center: true,
    },
    {
      name: "OPT",
      selector: "operator",
      sortable: true,
      center: true,
    },
  ];
  const customStyless = {
    rows: {
      style: {
        minHeight: "48px",
        textAlign: "center",
      },
    },
    headCells: {
      style: {
        minHeight: "40px",
        backgroundColor: "#FAF884",
        fontSize: "14px",
        fontWeight: "400",
        color: "black",

        textAlign: "center",
      },
    },
  };
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
  const handleAccountNumberChange = async (newRDID) => {
    let dataArray = [];

    const dataPost = {
      member_id: newRDID,
      // Account_type: "Term Deposit",
    };
    if (!newRDID) {
      setData("");
      return;
    }
    try {
      const response = await axios.post(
        //"http://bpcl.kolhapurdakshin.com:8000/rd_history/",

        "http://bpcl.kolhapurdakshin.com:8000/loan_transaction/",
        dataPost
      );
      let jsonData = response.data;

      console.log(jsonData);
      setFullName(jsonData.full_name);

      setLoanNo(jsonData.loan_no);
      setLoanAmount(jsonData.loan_amt);
      setLoanDate(jsonData.loan_date);
      setInterestRate(jsonData.interest_rate);
      setPeriod(jsonData.principle);
      setInstallment(jsonData.installment_period);
      setFirstDueDate(jsonData.first_due_date);
      setDueDate(jsonData.due_date);

      dataArray = jsonData.transactions;
      // dataArray.push(inputObject)
      setData(dataArray);

      // setFullName(jsonData.full_name);
      // dataArray = jsonData.result;
      // dataArray.push(inputObject);
      // setData(dataArray);
      // console.log(depositData);
    } catch (error) {
      console.error("Error fetching employee numbers:", error);
    }
  };

  useEffect(() => {
    handleAccountNumberChange(MemberIdForDataTable);
  }, [MemberIdForDataTable]);

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
    StartDate: getCurrentDate(),
    memberNo: 0,
    loaneeTitle: "",
    loanneName: "",
    loaneeEmpCode: "",

    coMemberNo: "",
    coLoaneeTitle: "",
    CoName: "",
    coEmpCode: "",
    branchName: "",
    // StartDate: '',
    meetingNo: "",
    meetingDate: "",
    address: "",
    city: "",
    pinCode: "",
    mobileNumber: "",
    transferDate: "",
    transferFrom: "",
    oldLoanNo: "",
    interestDebited: "",
    balanceLoan: "",
    interest: "",
    penalty: "",
    miscAmount: "",
    recoveryUser: "",

    loanNo: "",
    sanctionAmount: "",
    loanAmount: "",
    loanDate: "",
    interestRate: "",
    period: "",
    loaneeInstallment: "",
    firstInstDueDate: "",
    dueDate: "",

    loanPurpose: "",
    sanctionCommittee: "",
    suretyNumber1: "",
    Surety1: "",
    employeeno: "",
    fieldName1: "",
    SEmpCode1: "",
    suretyNumber2: "",
    S2Member: "",
    employeeno2: "",
    fieldName2: "",
    SEmpCode2: "",
    suretyNumber3: "",
    S3Member: "",
    employeeno3: "",
    fieldName3: "",
    SEmpCode3: "",
    suretyNumber4: "",
    S4Member: "",
    employeeno4: "",
    fieldName4: "",
    SEmpCode4: "",
    specialRemark: "",
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

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">
              {" "}
              Transaction Medium Term Loan{" "}
            </div>
          </div>
          <div className="container-fluid ">
            <div className="row First-Main-Row  pt-2 mb-1">
              <form>
                {/* Loanee  */}
                <div className="row">
                  <div className="col-xl col-lg col-md-2 col-sm-2 text-start">
                    <div class="mt-2 mb-1">
                      <label for="" className="" style={{ color: "red" }}>
                        Loanee
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-1 col-md-4 col-sm-6 text-start">
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        id=""
                        name=""
                        className="form-control  small-placeholder"
                        placeholder="A"
                        min={0}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md-4 col-sm-6 col-6 text-start">
                    {/* <label htmlFor="memberNo" className="small-label">
                      Member No.
                    </label> */}
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        id="memberNo"
                        name="memberNo"
                        // placeholder="Member No"
                        className="form-control small-placeholder"
                        // value={formData.memberNo}
                        value={MemberIdForDataTable}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only numeric values (no decimal points)
                          //   handleInputChange({
                          //     target: { name: "memberNo", value: numericValue },
                          //   });
                          setMemberIdForDataTable(numericValue);
                        }}
                        min={0}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 text-start">
                    {/* <label htmlFor="loaneeTitle" className="small-label">
                      Loanee Title*
                    </label> */}
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="loaneeTitle"
                        name="loaneeTitle"
                        value={formData.loaneeTitle}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          ); // Allow only alphabetical characters
                          handleInputChange({
                            target: {
                              name: "loaneeTitle",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text-start">
                    {/* <label htmlFor="loanneName" className="small-label">
                      Name*
                    </label> */}
                    <div class="mt-2 mb-1">
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="loanneName"
                        name="loanneName"
                        value={MemberIdForDataTable === "" ? "" : fullName}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          ); // Allow only alphabetical characters
                          handleInputChange({
                            target: {
                              name: "loanneName",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 text-start">
                    <div className="">
                      {/* <label htmlFor="loaneeEmpCode" className="small-label">
                        Emp Code*
                      </label> */}
                      <div class="mt-2 mb-1">
                        <input
                          type="text"
                          id="loaneeEmpCode"
                          name="loaneeEmpCode"
                          className="form-control small-placeholder"
                          value={formData.loaneeEmpCode}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            handleInputChange({
                              target: {
                                name: "loaneeEmpCode",
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

                {/* Co-loanee  */}
                <div className="row mb-5">
                  <div className="col-xl col-lg col-md-2 col-sm-2 text-start">
                    <div class="mt-2">
                      <label for="" className="" style={{ color: "red" }}>
                        Co-Loanee
                      </label>
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-1 col-md-4 col-sm-6 text-start">
                    <div class="mt-2">
                      <input
                        type="text"
                        id="memberId"
                        name="member_id"
                        className="form-control  small-placeholder"
                        placeholder="A"
                        min={0}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl col-lg col-md-4 col-sm-6 col-6 text-start">
                    {/* <label htmlFor="coMemberNo" className="small-label">
                      Member No.
                    </label> */}
                    <div className="mt-2">
                      <input
                        type="text"
                        id="coMemberNo"
                        name="coMemberNo"
                        className="form-control small-placeholder"
                        value={formData.coMemberNo}
                        onChange={(e) => {
                          const numericValue =
                            parseInt(e.target.value, 10) || ""; // Parse as integer or set to an empty string if not a valid number
                          handleInputChange({
                            target: {
                              name: "coMemberNo",
                              value: numericValue,
                            },
                          });
                        }}
                        min={0}
                        required
                        style={{
                          appearance: "textfield",
                          MozAppearance: "textfield",
                        }} // Hides arrows in Firefox
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-3 text-start">
                    <div className="mt-2">
                      <input
                        type="text"
                        id="coLoaneeTitle"
                        name="coLoaneeTitle"
                        className="form-control small-placeholder"
                        value={formData.coLoaneeTitle}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          );
                          handleInputChange({
                            target: {
                              name: "coLoaneeTitle",
                              value: alphabeticValue,
                            },
                          });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text-start">
                    <div className="mt-2">
                      <input
                        type="text"
                        className="form-control small-placeholder"
                        id="CoName"
                        name="CoName"
                        value={formData.CoName}
                        onChange={(e) => {
                          const alphabeticValue = e.target.value.replace(
                            /[^A-Za-z]/g,
                            ""
                          );
                          handleInputChange({
                            target: { name: "CoName", value: alphabeticValue },
                          });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 text-start">
                    <div className="mt-2"></div>
                  </div>
                </div>

                <div className="my-5">
                  <DataTable
                    columns={columns2}
                    data={dataArray2}
                    customStyles={customStyless}
                    striped
                    dense
                    responsive
                  />
                </div>
                <div className="mt-3">
                  <DataTable
                    columns={columns}
                    data={data}
                    customStyles={customStyles}
                    striped
                    dense
                    responsive
                    pagination
                  />
                </div>

                <div className="row mt-4 mb-2">
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
                      // data-toggle="modal"
                      // data-target="#staticBackdrop"
                      data-toggle="modal"
                      data-target=".bd-example-modal-lg"
                    >
                      Repayment
                    </button>
                    <div
                      class="modal fade bd-example-modal-lg"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="myLargeModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="staticBackdropLabel"
                            >
                              {" "}
                              Transaction Details...
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="modal-body-inner-main-div">
                              {/* <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Receipt Voucher No
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={
                                      loanNo === "" ? "" : receiptVoucherNo
                                    }
                                    onChange={(e) => {
                                      setreceiptVoucherNo(e.target.value);
                                    }}
                                  />
                                </div>
                              </div> */}
                              {/* 
                              // <div className="row mb-1">
                              //   <label
                              //     htmlFor="inputCash3"
                              //     className="col-sm-4 col-form-label small-label"
                              //   >
                              //     Transaction Date
                              //   </label>
                              //   <div className="col-sm-8">
                              //     <input
                              //       type="text"
                              //       className="form-control no-outline-login"
                              //       id="inputBank3"
                                    
                              //       value={loanNo === "" ? "" : transactionDate}
                              //     />
                              //   </div>
                              // </div>
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Receipt Voucher No
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={
                                      loanNo === "" ? "" : receiptVoucherNo
                                    }
                                    onChange={(e) => {
                                      setreceiptVoucherNo(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                             
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Debit
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : debit}
                                  />
                                </div>
                              </div>
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Principle
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : principle}
                                  />
                                </div>
                              </div>
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Interest
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : interest}
                                  />
                                </div>
                              </div>
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Penalty
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : penalty}
                                  />
                                </div>
                              </div>
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Misc
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : misc}
                                  />
                                </div>
                              </div>
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Total
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : total}
                                  />
                                </div>
                              </div>
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Balance
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : balance}
                                  />
                                </div>
                              </div>
                              <div className="row mb-1">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Operator
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : operator}
                                  />
                                </div>
                              </div>

                              <div className="row">
                                <label className=" col-sm-4 col-form-label small-label">
                                  Transaction Type
                                </label>
                                <div className="col-sm-8">
                                  <select
                                    type="text"
                                    className="form-control no-outline-login bg-white"
                                    required
                                  >
                                    <option value="" disabled>
                                      Select an option
                                    </option>
                                    <option value="Transfer">
                                      Repayment Entry
                                    </option>
                                    <option value="By Cash">
                                      Additional loan disbursement
                                    </option>
                                    <option value="To Account">
                                      Check Return Entry
                                    </option>
                                  </select>
                                </div>
                                
                              </div>

                              <div className="row mb-1 py-2">
                                <label
                                  htmlFor="inputCash3"
                                  className="col-sm-4 col-form-label small-label"
                                >
                                  Balance
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    className="form-control no-outline-login"
                                    id="inputBank3"
                                    value={loanNo === "" ? "" : balance}
                                  />
                                </div>
                              </div> */}

                              {/* //value={
                                      MemberIdForDataTable === "" ? "" : debit
                                    } */}

                              <div className="row ">
                                <div className="col ">
                                  <div className="row d-flex align-items-center mt-2">
                                    <div className="col text-start">
                                      Loan A/C. No.
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={MemberIdForDataTable === "" ? "" : loanNo}
                                        />
                                    </div>
                                    <div className="col text-start">
                                      Loan Amount
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="loanAmount"
                                        value={
                                          MemberIdForDataTable === ""
                                            ? ""
                                            : loanAmount
                                        }
                                        onChange={(e) => {
                                          const numericValue =
                                            e.target.value.replace(
                                              /[^0-9]/g,
                                              ""
                                            );
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div className="col text-start">
                                      Loan Date
                                    </div>
                                    <div className="col">
                                      <input
                                        type="date"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={
                                          MemberIdForDataTable === ""
                                            ? ""
                                            : loanDate
                                        }

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div className="col text-start">
                                      Loan Due Date
                                    </div>
                                    <div className="col">
                                      <input
                                        type="date"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={MemberIdForDataTable === "" ? "" : dueDate}

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div className="col text-start">
                                      Installment Amount
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={MemberIdForDataTable === "" ? "" : period}

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div className="col text-start">
                                      Last Paid Date
                                    </div>
                                    <div className="col">
                                      <input
                                        type="date"
                                        className="form-control no-outline-login"
                                        id="inputBank3"

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div className="col text-start">
                                      No. of Installment
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={MemberIdForDataTable === "" ? "" : installment}

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div className="col text-start">Cheque</div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div
                                      className="col text-start"
                                      style={{ color: "blue" }}
                                    >
                                      Over Dues
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={loanNo === "" ? "" : principle}
                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div
                                      className="col text-start"
                                      style={{ color: "red" }}
                                    >
                                      Repayment Date
                                    </div>
                                    <div className="col">
                                      <input
                                        type="date"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={
                                          loanNo === "" ? "" : transactionDate
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="row d-flex align-items-center mt-2">
                                    <div
                                      className="col text-start"
                                      style={{ color: "blue" }}
                                    >
                                      Interest Amount
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={loanNo === "" ? "" : interest}
                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div
                                      className="col text-start "
                                      style={{ color: "red" }}
                                    >
                                      Amount to pay
                                    </div>
                                    <div className="col">
                                      <input
                                        type="number"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        readOnly
                                        value={loanNo === "" ? "" : total}
                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div
                                      className="col text-start"
                                      style={{ color: "blue" }}
                                    >
                                      Balance Interest
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={loanNo === "" ? "" : balance}
                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div className="col text-start">
                                      Over Dues
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={loanNo === "" ? "" : principle}
                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div
                                      className="col text-start"
                                      style={{ color: "blue" }}
                                    >
                                      Penalty Amount
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div className="col text-start">
                                      Interest Amount
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={loanNo === "" ? "" : interest}
                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div
                                      className="col text-start"
                                      style={{ color: "blue" }}
                                    >
                                      Balance Penalty{" "}
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div className="col text-start">
                                      Penalty Amount
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                  </div>
                                  <div className="row d-flex align-items-center mt-2">
                                    <div
                                      className="col text-start"
                                      style={{ color: "blue" }}
                                    >
                                      Recovery Charge
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div className="col text-start">
                                      Recovery Charge
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"

                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row d-flex align-items-center mt-2">
                                    <div
                                      className="col  text-start"
                                      style={{ color: "blue" }}
                                    >
                                      Total Amount
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={loanNo === "" ? "" : total}
                                        //value={loanNo === "" ? "" : transactionDate}
                                      />
                                    </div>
                                    <div
                                      className="col text-start"
                                      style={{ color: "red" }}
                                    >
                                      Closing Amount
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                        value={loanNo === "" ? "" : balance}
                                      />
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="row d-flex align-items-center mt-2">
                                    <div
                                      className="col text-start"
                                      style={{ color: "red" }}
                                    >
                                      Balance Interest penalty
                                    </div>

                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                      />
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                      />
                                    </div>
                                    <div className="col">
                                      <input
                                        type="text"
                                        className="form-control no-outline-login"
                                        id="inputBank3"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-success"
                              data-dismiss="modal"
                            >
                              OK
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

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
/////////////////////////////////////
// const transactons = async () => {
//   try {
//     const response = await axios.get(
//       "http://bpcl.kolhapurdakshin.com:8000/member_saving_dep_trans/"
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

/////////////////////
