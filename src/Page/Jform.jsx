// MemberDataTable.js
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import { RiPrinterLine } from "react-icons/ri";

const MemberDataTable = () => {
  const [memberId, setMemberId] = useState("");
  const [memberData, setMemberData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`
        );
        const jsondata = response.data;
        const data = jsondata.members[0];
        setMemberData(data);
        setError(null);
      } catch (error) {
        setMemberData(null);
        setError("Error fetching member data");
      }
    };

    // Trigger API call when memberId changes
    if (memberId) {
      fetchMemberData();
    }
  }, [memberId]);

  const columns = [
    { name: "Member ID", selector: "member_id" },
    {
      name: "Full Name",
      cell: (row) => `${row.first_name} ${row.middle_name} ${row.last_name}`,
    },
    { name: "Address", selector: "resident_address" },
    { name: "Class of Member", selector: "status" },
  ];

  const tableData = memberData
    ? [
        {
          member_id: memberData.member_id,
          first_name: memberData.first_name,
          middle_name: memberData.middle_name,
          last_name: memberData.last_name,
          resident_address: memberData.resident_address,
          status: memberData.status,
        },
      ]
    : [];

  const handlePrint = () => {
    let printContents = document.getElementById("printable").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          <div className="row">
            <div className="col-2 text-start " style={{ width: "120px" }}>
              <label>Member ID:</label>
            </div>
            <div className="col-3">
              <input
                className="form-control no-outline-login "
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
            </div>
          </div>

          <div id="printable" className="py-3">
            {error && <p>{error}</p>}

            {memberData && (
              <DataTable
                title={
                  <strong
                    style={{
                      fontSize: "24px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    THE B P C Employee's Co-op. Credit Society Ltd.
                  </strong>
                }
                subHeader
                subHeaderComponent={
                  <div style={{ textAlign: "center" }}>
                    <strong style={{ fontSize: "20px" }}>FORM 'J'</strong>
                    <br />
                    [See rule 33]
                  </div>
                }
                subHeaderAlign="center"
                titleAlign="center"
                columns={columns}
                data={tableData}
                customStyles={{
                  rows: {
                    style: {
                      minHeight: "50px",
                    },
                  },
                  headCells: {
                    style: {
                      border: "1px solid #D3D3D3",
                      backgroundColor: "skyblue",
                      color: "white",
                    },
                  },
                  cells: {
                    style: {
                      border: "1px solid #ddd",
                    },
                  },
                }}
              />
            )}
            <div className="pt-2">
              {memberData && (
                <button
                  className="printbutton"
                  style={{
                    color: "white",
                    backgroundColor: "#019e55",
                    padding: "5px 10px",
                    borderRadius: "7px",
                    border: "none",
                  }}
                  onClick={handlePrint}
                >
                  <RiPrinterLine /> Print
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDataTable;
