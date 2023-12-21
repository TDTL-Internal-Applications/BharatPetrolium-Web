import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import "../Style/Deposit.css";
import DataTable from 'react-data-table-component';

export default function CumulativePaymentEntryNew() {
    const [depositData, setDepositData] = useState([]);
    const [newData, setNewData] = useState("");
    const [data, setData] = useState([]);
    const [fullName , setFullName]=useState("")
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const day = today.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    const [transactions, setTransactions] = useState([]);


    const handleAccountNumberChange = async (newRDID) => {

        let dataArray = [];
        let inputObject = {
            RDID: <input type="date" className="inputFields " value={getCurrentDate()} />,
            member_id: <input type="number" className="inputFields " style={{ width: '90%' }} />,
            MonthlyDeposit: <input type="text" className="inputFields " style={{ width: '90%' }} />,
            InterestRate: <input type="number" className="inputFields " style={{ width: '90%' }} />,
            deposit_period: <input type="number" className="inputFields " style={{ width: '90%' }} />,
            MonthlyDeposit: <input type="number" className="inputFields " style={{ width: '90%' }} />,
            MonthlyDeposit: <input type="number" className="inputFields " style={{ width: '90%' }} />,
            MonthlyDeposit: <input type="text" className="inputFields " style={{ width: '90%' }} />,
        }
        const dataPost = {
          member_id: newRDID,
          Account_type: "Term Deposit"
        }
        if (!newRDID) {
            setData("");
            return;
        }
        try {
            const response = await axios.post("http://bpcl.kolhapurdakshin.com:8000/rd_history/", dataPost);
            const jsonData = response.data.Output;
            dataArray=jsonData;
            dataArray.push(inputObject)
            setData(dataArray)

            setFullName(jsonData.full_name);
            // dataArray = jsonData.result;
            // dataArray.push(inputObject);
            // setData(dataArray);
            // console.log(depositData);
        } catch (error) {
            console.error("Error fetching employee numbers:", error);
        }
    };




   
 

    const columns = [
        {
            name: 'Date',
            selector: 'RDID',
            sortable: true,
            center:true
        },
        {
            name: 'RV No.',
            selector: 'member_id',
            sortable: true,
            center:true

        },
        {
            name: 'Particular',
            selector: 'MonthlyDeposit',
            sortable: true,
            center:true

        },
        {
            name: 'Cheque No.',
            selector: 'InterestRate',
            sortable: true,
            center:true

        },
        {
            name: 'Debit',
            selector: 'deposit_period',
            sortable: true,
            center:true

        },
        {
            name: 'Credit',
            selector: 'deposit_period',
            sortable: true,
            center:true

        },
        {
            name: 'Balance',
            selector: 'deposit_period',
            sortable: true,
            center:true

        },
        {
            name: 'User',
            selector: 'deposit_period',
            sortable: true,
            center:true

        },
    ];
    // const data = [
    //     {
    //         Date: '2023-01-01',
    //         RDID: 'RV001',
    //         Particular: 'ABC123',
    //         cheque: '12345',
    //         Debit: 1000,
    //         credit: 500,
    //         Balance: 1500,
    //         User: 'John Doe',
    //     },
    //     {
    //         Date: '2023-01-01',
    //         RDID: 'RV001',
    //         Particular: 'ABC123',
    //         cheque: '12345',
    //         Debit: 1500,
    //         credit: 700,
    //         Balance: 2200,
    //         User: 'John Doe',
    //     },

    //     // Add more data objects as needed
    // ];
    const showInputRow = true;

    const handleInputChange = (columnName, value) => {
        setNewData((prevData) => ({
            ...prevData,
            [columnName]: value,
        }));
    };

    const handleSave = () => {
        // Add logic to save newData to your data array
        // Reset newData state
        setNewData({});
        console.log(newData);
    };


    // const customStyles = {
    //     rows: {
    //         style: {
    //             minHeight: "48px",
    //         },
    //     },
    //     headCells: {
    //         style: {
    //             minHeight: "40px",
    //             backgroundColor: "#4db3c8",
    //             fontSize: "14px",
    //             fontWeight: "400",
    //             color: "white",
    //         },
    //     },
    // };
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


    return (
        <>
            <Sidebar />
            <div className="container-fluid dashboard-area d-flex">
                <div className="main-content p-4">
                    {/* Navbar */}
                    <Header />
                    {/* Heading1 Main */}
                    <div className="container-fluid d-flex text-start w-100 pb-1">
                        <div className="H1-Heading-Main">Cummulative Deposit Receipt/Payment Entry</div>
                    </div>

                    <div className="container-fluid">
                        {/* Your first form code */}
                        <div className="row First-Main-Row  pt-3 pb-3"  >
                            {/* Basic Information  */}
                            <form>

                                {/* <div className="row mb-3">
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <div class="mt-4" >
                                            <label for="" className="">
                                                Search By any :
                                            </label>

                                        </div>
                                    </div>

                                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <div class=" ">
                                            <label for="rdId" className="small-label">
                                                Member No.
                                            </label>
                                            <input
                                                type="text"
                                                id="rdId"
                                                name="employeeno"
                                                class="form-control small-placeholder"
                                                min={0}
                                                onChange={(e) => handleAccountNumberChange(e.target.value)}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <div class=" ">
                                            <label for="rdId" className="small-label">
                                                Employee No.
                                            </label>
                                            <input
                                                type="text"
                                                id="rdId"
                                                name="employeeno"
                                                class="form-control small-placeholder"
                                                // value=
                                                onChange={(e) => handleAccountNumberChange(e.target.value)}
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                </div> */}

                                <div className="Border-Black p-2 mb-4">
                                    <div className="row">
                                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-start">
                                        <label for="rdId" className="small-label ms-1">
                                                Employee No.
                                            </label>
                                            <input
                                                type="text"
                                                id="rdId"
                                                name="employeeno"
                                                class="form-control small-placeholder mx-0"
                                                // value=
                                                onChange={(e) => handleAccountNumberChange(e.target.value)}
                                                min={0}
                                            />
                                            {/* <div className="col-xl-6 col-lg-3 col-md-6 col-sm-6 text-start"> */}
                                            <div class="no-outline-login mt-1 ms-1">
                                                <label for="" className="labels">
                                                    Name  :  {fullName}
                                                </label>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div className="col-xl-7 col-lg-6 col-md-8 col-sm-6 text-start ">
                                        </div>


                                        <div className="col-xl-2 col-lg-3 col-md-8 col-sm-6 text-start ">
                                            <label htmlFor="" className="labels ms-1">
                                                Lock Amount : 0
                                            </label><br/>
                                            <label htmlFor="" className="labels ms-1">
                                                Account No. : 4836
                                            </label><br/>
                                            <label htmlFor="" className="labels ms-1">
                                                Contribution : 13000
                                            </label>
                                        </div>



                                    </div>
                                </div>

                            </form>

                            <DataTable
                                columns={columns}
                                data={data}
                                customStyles={customStyles}
                                striped
                                dense
                                responsive
                            />
                          
                            {/* {renderInputFields()} */}
                        </div>


                    </div>
                    <div className="row">
                        <div className="col-sm d-flex justify-content-center">
                            <button
                                type="button"
                                className="mt-2 mx-2"
                                onClick={handleSave}
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

                            <button
                                type="button"
                                className="mt-2 mx-2"
                                // onClick={handleCancel}
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
                        </div>
                        {/* <></> */}
                    </div>

                </div>

            </div>
        </>
    );
}
