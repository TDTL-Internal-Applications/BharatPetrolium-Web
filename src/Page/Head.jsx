import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../Style/Global_Classes.css";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Head() {
  const [formData, setFormData] = useState({
    officeEquipment: "",
    head_code: "",
    head_name: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://bpcl.kolhapurdakshin.com:8000/fetch_accounthead/"
      );
      setTableData(response.data.data);
    } catch (error) {
      console.error(error);
      // Show a user-friendly error message
      // toast.error("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://bpcl.kolhapurdakshin.com:8000/insert_accounthead/",
        formData
      );

      // Update tableData by fetching data again
      await fetchData();

      // Reset the form
      resetForm();

      // Display success message using Swal
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Data submitted successfully!",
      });
    } catch (error) {
      console.error(error);
      // Show a user-friendly error message
      // toast.error("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  function resetForm() {
    setFormData({
      officeEquipment: "",
      head_code: "",
      head_name: "",
      date: new Date().toISOString().split("T")[0],
    });
  }

  const columns = [
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Head Code",
      selector: "head_code",
      sortable: true,
    },
    {
      name: "Head Name",
      selector: "head_name",
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

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4 ">
          <Header />

          <div className="container d-flex text-start w-100 pb-1">
            <div className="H1-Heading-Main">Add Account Head</div>
          </div>

          <div className="container">
            <div
              className="row First-Main-Row d-flex justify-content-center align-items-center pt-3 mb-1"
              style={{ width: "100%" }}
            >
              <form onSubmit={handleSubmit} className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-3 col-md-6 col-sm-12  text-start">
                  <label htmlFor="head_code" className="form-label">
                    Head Code :
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="head_code"
                    name="head_code"
                    value={formData.head_code}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12  text-start">
                  <label htmlFor="head_name" className="form-label">
                    Head :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="head_name"
                    name="head_name"
                    value={formData.head_name}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12  text-start">
                  <label htmlFor="officeEquipment" className="form-label ">
                    Office Equipment :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="officeEquipment"
                    name="officeEquipment"
                    //  value={formData.officeEquipment}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12  text-start">
                  <div className="row">
                    <div className="col-6">
                    <label htmlFor="date" className="form-label">
                    Date :
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                    </div>
                    <div className="col-6">
                    <button type="submit" className="btn btn-success mt-4">
                    Submit
                  </button>
                    </div>
                  </div>
                 
                </div>

                {/* <div className="col-lg-3 col-md-6 col-sm-12 text-start">
                 
                </div> */}
              </form>

              <div className="mt-4">
                <DataTable
                  title="Account Heads"
                  columns={columns}
                  data={tableData || []}
                  pagination
                  striped
                  dense
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
