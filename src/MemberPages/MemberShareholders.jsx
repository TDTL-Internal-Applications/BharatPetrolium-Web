import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";

export default function ShareTable() {
  const [shares, setShares] = useState([]);
  const [totalShare, setTotalShare] = useState(0)
  const member_id = localStorage.getItem("member_id");

  useEffect(() => {
    if (!member_id) {
      console.error("Member ID not found in local storage");
      return;
    }
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/view_member_shares/", {
        member_id: member_id,
      })
      .then((response) => {
        setShares(response.data.shares); 
        setTotalShare(response.data.shares[0].total_approved_shares)
      })
      .catch((error) => {
        console.error("Error fetching member shares:", error);
      });
  }, [member_id]);

  const columns = [
    { name: "Member ID", selector: "member_id", sortable: true },
    { name: "Shareholder ID", selector: "shareholder_id", sortable: true },
    { name: "Purchase Date", selector: "purchase_date", sortable: true },
    { name: "Number of Shares", selector: "no_of_shares", sortable: true },
    { name: "Share Price", selector: "share_price", sortable: true },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <div
          style={{
            backgroundColor: row.status === "approved" ? "green" : "orange",
            color: "white",
            textAlign: "center",
            padding: row.status === "inprogress" ? "2px 7px" : "2px 9px",            // borderRadius: "5px",
          }}
        >
        {row.status === "approved" ? "Approved" : row.status === "inprogress" ? "Inprogress" : row.status}        </div>
      ),
    },
    { name: "Approved Date", selector: "T_approve_date", sortable: true },
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

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container-fluid ps-0 d-flex text-start w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-6 text-start">
                <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Shares
                </h3>
              </div>
              <div className="col-6 text-center">
                <div>Total Shares:&nbsp; <span style={{color:"darkblue", fontSize:"25px",fontWeight:"bold"}}>{totalShare}</span></div>
                <p style={{fontSize:'10px',color:'red'}}>Note: The total number of shares displayed includes only those approved by the Trustee.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <DataTable
                columns={columns}
                pagination
                data={shares}
                customStyles={customStyles}
                striped
                dense
                responsive
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
