// MemberDataTable.js
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import { RiPrinterLine } from "react-icons/ri";

const MemberDataTable = () => {
  const [memberId, setMemberId] = useState("");
  const [memberData, setMemberData] = useState([]);  
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchMemberData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`
  //       );
  //       const jsondata = response.data;
  //       const data = jsondata.members[0];
  //       setMemberData(data);
  //       setError(null);
  //     } catch (error) {
  //       setMemberData(null);
  //       setError("Error fetching member data");
  //     }
  //   };

  //   if (memberId) {
  //     fetchMemberData();
  //   }
  // }, [memberId]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllMembersData = async () => {
    try {
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/member_data/"
      );
      const jsonData = response.data;
      setMemberData(jsonData.members);
      setError(null);
    } catch (error) {
      setMemberData([]);
      setError("Error fetching members data");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const filteredMembers = memberData.filter((member) =>
  Object.values(member).some((value) =>
    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  )
);


  useEffect(() => {
    fetchAllMembersData();
  }, []);

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "100px",
      center: true,
    },
    { name: "Member ID", selector: "member_id" ,center: true,},
    {
      name: "Full Name",
      cell: (row) => `${row.first_name} ${row.middle_name} ${row.last_name}`,center: true,
    },
    { name: "Address", selector: "resident_address",center: true, },
    { name: "Class of Member", selector: "member_class" ,center: true,},
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

  const tableData = filteredMembers.map((member) => ({
    member_id: member.member_id,
    first_name: member.first_name,
    middle_name: member.middle_name,
    last_name: member.last_name,
    resident_address: member.resident_address,
    member_class: member.member_class,
  }));

  let [forPagination,setForPagination]=useState(true);

  const handlePrint = () => {
    setForPagination(!forPagination);
    // console.log(forPagination);
    setTimeout(()=>{
      let printContents = document.getElementById("printable").innerHTML;
      let originalContents = document.body.innerHTML;
      const style = document.createElement("style");
      style.innerHTML = `
        @media print {
          .printbutton {
            display: none;
          }
        }
      `;
      document.head.appendChild(style);
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    },0)
   
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          <div className="row d-flex align-items-center">
            <div className="col-4 text-start " style={{ width: "150px" }}>
              <label>Search Name</label>
            </div>
            <div className="col-3">
              <input
                className="form-control no-outline-login "
                type="text"
                value={searchTerm}
                onChange={handleSearch}
               
              />
            </div>
            {/* <div className="col-3">
              <button className="btn btn-success" onClick={fetchAllMembersData}>
                Get All Members Data
              </button>
            </div> */}
          </div>

          <div id="printable" className="py-3 ">
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
                    The B P C Employee's Co-op. Credit Society Ltd.
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
                pagination={forPagination}
                customStyles={customStyles}
                striped
                dense
              />
            )}
            <div className="pt-1">
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
                  Print
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
