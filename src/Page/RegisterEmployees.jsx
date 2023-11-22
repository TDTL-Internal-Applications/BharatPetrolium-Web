import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterEmployees() {
    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    // const [selectedMember, setSelectedMember] = useState("");
    const [selectedMemberData, setSelectedMemberData] = useState({});
    const [updatedMemberData, setUpdatedMemberData] = useState({});
    const [roles, setRoles] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [role_id, setSelectedRoleId] = useState(null);
    const [emp_id, setselectedempId] = useState(null);
    
    const handleCheckboxChange = (role_id) => {
        setUpdatedMemberData((prevData) => ({
            ...prevData,
            [role_id]: !prevData[role_id], // Toggle the checkbox value
        }));
        setSelectedRoleId(role_id);
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/role_data/");
                const jsonData = response.data;
                setRoles(jsonData.roles);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        if (isPopupOpen) {
            fetchRoles();
        }
    }, [isPopupOpen]);

    const handleAssignRole = async (row) => {
        setselectedempId(row.emp_no);
        console.log(row);

        // Fetch roles if needed
        try {
            const response = await axios.get("http://127.0.0.1:8000/role_data/");
            const jsonData = response.data;
            setRoles(jsonData.roles);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }

        // Open the modal and set the selected member data
        setSelectedMemberData(row);

        // Set the modal title dynamically using the employee's name
        document.getElementById("exampleModalLongTitle").innerText = `Assign Role to ${row.first_name} ${row.last_name}`;

        // If you need to fetch member data, uncomment the following lines
        // try {
        //     const response = await axios.get(`http://127.0.0.1:8000/all_memberdata/${row.member_id}/`);
        //     const jsonData = response.data;
        //     const resultArray = jsonData.members[0];
        //     setUpdatedMemberData({ ...resultArray });
        // } catch (error) {
        //     console.error("Error fetching member data:", error);
        // }

        setPopupOpen(true);
    };

    const handleInputChange = (e) => {
        setUpdatedMemberData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            console.log(role_id);
            console.log(emp_id);

            await axios.post(
                `http://127.0.0.1:8000/assign_roles/`,
                {
                    // Include other data properties as needed
                    role_id: role_id,
                    emp_id: emp_id,
                    // ... other properties
                }
            );

            setPopupOpen(false);
            await fetchData();

            Swal.fire({
                title: "Success",
                text: "Role Assigned successfully.",
                icon: "success",
            });
        } catch (error) {
            console.error("Error updating member:", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred while saving changes.",
                icon: "error",
            });
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/emp_data/");
            const jsonData = await response.data;
            const resultArray = jsonData.employes;
            const filteredData = resultArray.filter((item) => item.status === "Y");
            setData(resultArray);
            console.log(filteredData);
            const data1 = jsonData.data.member_id;
            localStorage.setItem("membersData", data1);

            console.log(localStorage.getItem("membersData"));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData()
            .then(() => setDataLoaded(true))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    const columns = [
        {
            name: "Sr. No.",
            selector: (row) => row.emp_no,
            sortable: true,
            width: "100px",
            center: true,
        },
        {
            name: "Name",
            selector: (row) => row.first_name + " " + row.last_name,
            sortable: true,
            width: "250px",
            center: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            width: "400px",
            center: true,
        },
        {
            name: "Mobile Number",
            selector: (row) => row.mobile_no,
            sortable: true,
            width: "350px",
            center: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => handleAssignRole(row)}
                >
                    Assign Role
                </button>
            ),
            width: "200px",
            center: true,
        },
    ];

    const tableCustomStyles = {
        headRow: {
            style: {
                color: "white",
                backgroundColor: "darkblue",
                fontSize: "17px",
                fontWeight: "300",
                borderBottom: "1px solid #fff",
                textAlign: "center",
            },
        },
        rows: {
            style: {
                color: "black",
                // backgroundColor: "#2B2D3F",
                fontSize: "14px",
                fontWeight: "normal",
                textAlign: "center",
                borderBottom: "3px solid #fff",
            },
        },
        headCells: {
            style: {
                paddingLeft: "5px",
                paddingRight: "5px",
                textAlign: "center",
            },
        },
        cells: {
            style: {
                paddingLeft: "5px",
                paddingRight: "5px",
                textAlign: "center",
            },
        },
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div
                        style={{
                            fontFamily: "poppins",
                            padding: "20px",
                            textAlign: "center",
                        }}
                    >
                        <h2
                            style={{
                                color: "darkblue",
                                fontSize: "28px",
                                fontWeight: "bold",
                                paddingBottom: "15px",
                            }}
                        >
                            Employees List
                        </h2>
                        {dataLoaded ? (
                            <DataTable
                                data={data}
                                columns={columns}
                                style={{ textAlign: "center" }}
                                customStyles={tableCustomStyles}
                                pagination
                            />
                        ) : (
                            <p>Loading data...</p>
                        )}
                    </div>
                </div>
            </div>

            <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                    style={{ maxWidth: "400px" }}
                >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">
                                <strong>Update Details</strong>
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div
                                data-spy="scroll"
                                data-target="#list-example"
                                data-offset="0"
                                class="scrollspy-example overflow-auto"
                                style={{ maxHeight: "250px", padding: "13px" }}
                            >
                                <form>
                                    <div className="form-group" style={{ marginBottom: "15px", textAlign: "left" }}>
                                        <label
                                            htmlFor="roles"
                                            style={{ display: "block", marginBottom: "5px" }}
                                        >
                                      <strong>Select Roles:</strong>    
                                        </label>
                                        {roles.map((role) => (
                                            <div key={role.role_id} style={{ marginBottom: "5px" }}>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`role_${role.role_id}`}
                                                    checked={role_id === role.role_id}
                                                    onChange={() => handleCheckboxChange(role.role_id)}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`role_${role.role_id}`}
                                                    style={{ display: "inline-block", marginLeft: "5px" }}
                                                >
                                                    {role.role_name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        data-spy="scroll"
                                        data-target="#list-example"
                                        data-offset="0"
                                        className="scrollspy-example overflow-auto"
                                        style={{ maxHeight: "250px", padding: "13px" }}
                                    >
                                        {/* Additional content if needed */}
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                                style={{ width: "140px" }}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                class="btn btn-primary"
                                onClick={handleSaveChanges}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
