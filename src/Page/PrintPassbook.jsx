import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";
import axios from "axios";

export default function PrintPassbook() {
  const [memberId, setMemberId] = useState("");
  const [passbookType, setPassbookType] = useState("");
  const [memberInfo, setMemberInfo] = useState({});
  const [transactionData, setTransactionData] = useState([]);
  const [forPagination, setForPagination] = useState(true);
  const [printing, setPrinting] = useState(false);

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "100px",
      center: true,
    },
    { name: "Date", selector: "transactionDate", sortable: true, center: true },
    {
      name: "Amount",
      selector: "original_amount",
      sortable: true,
      center: true,
    },
    { name: "Type", selector: "TransactionType", sortable: true, center: true },
  ];

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

  const fetchMemberInfo = () => {
    const data = {
      member_id: memberId,
    };
    console.log("Sending request with data:", data);

    axios
      .post(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`,
        {
          member_id: memberId,
        }
      )
      .then((response) => {
        const jsondata = response.data;
        const data = jsondata.members[0];
        setMemberInfo(data);

        localStorage.setItem("member_id", memberId);
      })
      .catch((error) => {
        console.error("Member Info Error:", error);
      });
  };

  const fetchRDTransactions = () => {
    const data = {
      member_id: memberId,
      RDID: true,
    };

    localStorage.setItem("member_id", memberId);

    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/rd_history_closure/", data)
      .then((response) => {
        const result = response.data["result"];
        setTransactionData(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSavingsTransactions = () => {
    const data = {
      account_id: memberId,
    };

    localStorage.setItem("member_id", memberId);

    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/saving_history/", data)
      .then((response) => {
        console.log("Saving History Response:", response.data);
        const result = response.data;
        setTransactionData(result);
      })
      .catch((error) => {
        console.error("Saving History Error:", error);
      });
  };

  useEffect(() => {
    if (memberId && passbookType) {
      fetchMemberInfo(); 
      if (passbookType === "RD Passbook") {
        fetchRDTransactions(); 
      } else if (passbookType === "Savings Passbook") {
        fetchSavingsTransactions(); 
      }
    }
  }, [memberId, passbookType]);

  // const handlePrint = () => {
  //   setForPagination(!forPagination);
  //   setTimeout(() => {
  //     let printContents = document.getElementById("printable").innerHTML;
  //     let originalContents = document.body.innerHTML;
  //     const style = document.createElement("style");
  //     style.innerHTML = `
  //       @media print {
  //         .Passbookprint {
  //           display: none;
  //         }
  //       }
  //     `;
  //     document.head.appendChild(style);
  //     document.body.innerHTML = printContents;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //     window.location.reload();
  //   }, 0);
  // };

  const handlePrint = (elementId) => {
    setPrinting(true);
    setForPagination(!forPagination);
    setTimeout(() => {
      let printContents = document.getElementById(elementId).innerHTML;
      let originalContents = document.body.innerHTML;
      const style = document.createElement("style");
      style.innerHTML = `
      @media print {
        body {
          width: 14cm;
          height: 9.5cm;
        }
        .Passbookprint {
          display: none;
        }
      }
    `;
      document.head.appendChild(style);
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      setPrinting(false);
      window.location.reload();
    }, 0);
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container d-flex text-start w-100 pb-1 ms-0 ps-0">
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Passbook Printing
            </h3>
          </div>
          <div className="row d-flex justify-content-start align-items-center">
            <div className="col-3 text-start">
              <div className="mb-3">
                <label htmlFor="memberId" className="form-label">
                  Member ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="memberId"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                />
              </div>
            </div>
            <div className="col-3 text-start">
              <div className="mb-3">
                <label htmlFor="passbookType" className="form-label">
                  Passbook Type
                </label>
                <select
                  className="form-select"
                  id="passbookType"
                  style={{ fontSize: "12px" }}
                  value={passbookType}
                  onChange={(e) => setPassbookType(e.target.value)}
                >
                  <option value="">Select Passbook</option>
                  <option value="RD Passbook">RD Passbook</option>
                  <option value="Savings Passbook">Savings Passbook</option>
                </select>
              </div>
            </div>
          </div>

          <div id="frontPagePrintable">
            {memberId && passbookType && memberInfo && (
              <>
                {/* Front Page - Member Information */}
                <div className="mt-4 text-start">
                  <p>
                    Name:
                    {`${memberInfo.first_name} ${memberInfo.middle_name} ${memberInfo.last_name}`}
                  </p>
                  <p>Reference No.:{memberInfo.emp_no}</p>
                  <p>Member No: {memberInfo.member_id}</p>
                  <p>Mobile No.: {memberInfo.mobile_no}</p>
                  <p>Issued Date : {memberInfo.Issued_on}</p>
                </div>
                <div className="row justify-content-center align-items-center">
                  <div className="col-3">
                    <button
                      className="btn btn-success Passbookprint"
                      onClick={() => handlePrint("frontPagePrintable")}
                    >
                      PRINT
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Back Page - Transaction History */}
          <div id="backPagePrintable" className="mt-4">
            {memberId && passbookType && transactionData && transactionData.length > 0 && (
              <>
                <DataTable
                  columns={columns}
                  data={transactionData}
                  pagination={forPagination}
                  striped
                  responsive
                  dense
                  highlightOnHover
                  customStyles={customStyles}
                />
                <div className="row justify-content-center align-items-center">
                  <div className="col-3">
                    <button
                      className="btn btn-success Passbookprint"
                      onClick={() => handlePrint("backPagePrintable")}
                    >
                      PRINT
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
