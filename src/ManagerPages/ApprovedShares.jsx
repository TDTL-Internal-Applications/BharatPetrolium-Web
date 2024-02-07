import React, { useState, useEffect } from 'react';
import Sidebar from '../Page/Sidebar';
import Header from '../components/Header';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { FcApproval } from "react-icons/fc";

const ApprovedShares = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      name: 'Shareholder ID',
      selector: 'shareholder_id',
      sortable: true,
    },
    {
      name: 'Member ID',
      selector: 'member_id',
      sortable: true,
    },
    {
      name: 'No of Shares',
      selector: 'no_of_shares',
      sortable: true,
    },
    {
      name: 'Share Price',
      selector: 'share_price',
      sortable: true,
    },
    {
      name: 'Approved By',
      selector: 'approved_by',
      sortable: true,
    },
    {
      name: 'Share Status',
      selector: 'share_status',
      sortable: true,
    },
    {
      name: 'Approval Date',
      selector: 'approve_date',
      sortable: true,
    },
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

  const fetchData = async () => {
    try {
      const response = await axios.post('http://bpcl.kolhapurdakshin.com:8000/all_approved_shares/');
      setData(response.data.shareholders_data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <>
        <Sidebar />
        <div className="container-fluid dashboard-area d-flex">
          <div className="main-content p-4">
            {/* Navbar */}
            <Header />
            {/* Heading */}
            <div className="container d-flex text-start w-100 ps-0 pb-1">
              <h2
                className="d-flex align-items-center"
                style={{ fontWeight: "bold", color: "dodgerblue" }}
              >
                Approved Shares&nbsp;
                  <FcApproval />
              </h2>
            </div>
            {/* Data Table */}
            <DataTable
              columns={columns}
              data={data}
              customStyles={customStyles}
              pagination
              highlightOnHover
              dense
              striped
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default ApprovedShares;
