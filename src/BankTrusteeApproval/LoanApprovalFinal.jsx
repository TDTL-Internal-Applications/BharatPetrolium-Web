import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import loan_img from "../Images/money-bag_3149899.png";

const FinalLoanApprovals = () => {
  const [loanData, setLoanData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/loan_approval_trustee/"
        );
        setLoanData(response.data.data);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means useEffect will only run on mount and unmount

  const handleApprove = async (row) => {
    try {
      setLoading(true);

      // Get the current date and time for approveDate
      const currentDate = new Date();
      const approveDate = currentDate.toISOString();

      // Example API endpoint for approving a loan
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/loan_approval/",
        {
          loan_no: row.loan_no,
          member_id: row.member_id,
          status: "Approved",
          user:"Trustee",
          approveDate,
        }
      );

      // Example success message using SweetAlert2
      await Swal.fire({
        title: "Loan Approved!",
        text: `Loan ${row.loan_no} for Member ID ${row.member_id} has been approved.`,
        icon: "success",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });

      // Assuming the API response contains the updated loan data, update the state
      setLoanData(response.data);
    } catch (error) {
      console.error("Error approving loan:", error);

      // Example error message using SweetAlert2
      await Swal.fire({
        title: "Error",
        text: "An error occurred while approving the loan.",
        icon: "error",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (row) => {
    try {
      setLoading(true);

      // Example API endpoint for declining a loan
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/loan_approval/",
        {
          loan_no: row.loan_no,
          member_id: row.member_id,
          status: "Declined",
          user:"Trustee",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        }
      );

      // Example success message using SweetAlert2
      await Swal.fire({
        title: "Loan Declined!",
        text: `Loan ${row.loanNo} for Member ID ${row.memberId} has been declined.`,
        icon: "success",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });

      // Assuming the API response contains the updated loan data, update the state
      setLoanData(response.data);
    } catch (error) {
      console.error("Error declining loan:", error);

      // Example error message using SweetAlert2
      await Swal.fire({
        title: "Error",
        text: "An error occurred while declining the loan.",
        icon: "error",
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
          const confirmButton = Swal.getConfirmButton();
          confirmButton.classList.add("custom-swal-button");
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Define columns for the data table
  const columns = [
    {
      name: "Member ID",
      selector: "member_id",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      width: "300px"
    },
    {
      name: "Loan No",
      selector: "loan_no",
      sortable: true,
    },
    {
      name: "Loan Amount",
      selector: "loan_amt",
      sortable: true,
    },
    {
      name: "Loan Type",
      selector: "ac_type",
      sortable: true,
    },
    // {
    //   name: "Approved By",
    //   selector: "approved_by",
    //   sortable: true,
    // },
    // {
    //   name: "Approve Date",
    //   selector: "approveDate",
    //   sortable: true,
    // },
    // Action column with buttons
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center py-2">
          <button
            style={{
              backgroundColor: "green",
              marginRight: "5px",
              color: "white",
              padding: "2px 5px",
              border: "none",
            }}
            onClick={() => handleApprove(row)}
          >
            Approve
          </button>
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "2px 5px",
              border: "none",
            }}
            onClick={() => handleDecline(row)}
          >
            Decline
          </button>
        </div>
      ),
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

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <h2
              className="d-flex align-items-center"
              style={{ fontWeight: "bold", color: "dodgerblue" }}
            >
              <img src={loan_img} alt="" style={{ height: "40px" }} />
              &nbsp;Loan Approvals
            </h2>
          </div>
          {/* Data Table */}
          <DataTable columns={columns} data={loanData} customStyles={customStyles} dense striped />
        </div>
      </div>
    </>
  );
};

export default FinalLoanApprovals;
