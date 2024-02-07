import Sidebar from "./Sidebar";
import Header from "../components/Header";
import "../Style/AdminForgotPassword.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

function AdminForgotPassword() {
  let [selectTagValue, setSelectTagValue] = useState("");

  let [memberId, setmemberId] = useState("");
  let [name, setName] = useState("");
  let [Email, setEmail] = useState("");
  let [currentPassword, SetCurrentPassword] = useState("");
  let [newPassword, SetNewPassword] = useState("");

  async function GetMemberDetails() {
    try {
      let response = await axios.get(
        `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`
      );
      let firstName = response.data.members[0].first_name + " ";
      let middleName = response.data.members[0].middle_name + " ";
      let lastName = response.data.members[0].last_name;
      setName(firstName + middleName + lastName);
      setEmail(response.data.members[0].email);
      SetCurrentPassword(response.data.members[0].password);
    } catch (error) {
      console.log("change password error :", error);
    }
  }

  async function handleChangePassword() {
    if (memberId === "") {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Member Id",
        text: "Member Id is empty",
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-button",
        },
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
        },
      });
      return;
    } else if (newPassword.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Valid New Password",
        text: "New Password is empty",
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-button",
        },
        didOpen: () => {
          Swal.getPopup().style.borderRadius = "25px";
        },
      });
      return;
    }

    let payloadData = {
      member_id: memberId,
      new_password: newPassword,
    };

    try {
      let response = await axios.post(
        `http://bpcl.kolhapurdakshin.com:8000/update_pass/`,
        payloadData
      );

      if ("success" in response.data && response.data.success.length > 2) {
        Swal.fire({
          icon: "success",
          title: "Password Changed Successfully",
          text: "password successfully changed",
          customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-button",
          },
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
          },
        });
        SetNewPassword("");
        setmemberId("");
        return;
      }
    } catch (error) {
      console.log("change password error :", error);
    }
  }

  useEffect(() => {
    if (memberId !== "") {
      GetMemberDetails();
    }
  }, [memberId]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const DisableColumn = [
    { name: "Member ID", selector: "member_id", sortable: true },
    { name: "Role ID", selector: "role_id", sortable: true },
    { name: "Role Name", selector: "role_name_assigned", sortable: true },
    { name: "User", selector: "role_name", sortable: true },
    { name: "Email", selector: "email_id", sortable: true },
    {
      name: "Disable",
      cell: (row) => (
        <span
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "2px 5px",
            cursor: "pointer",
          }}
          onClick={() => showDisableConfirmation(row)}
        >
          Disable
        </span>
      ),
    },
  ];

  const showDisableConfirmation = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, disable it!",
      didOpen: () => {
        Swal.getPopup().style.borderRadius = "25px";
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDisableUser(row);
        Swal.fire({
          title: "Disabled!",
          text: "User has been disabled.",
          icon: "success",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
          },
        });
      }
    });
  };

  const handleDisableUser = (row) => {
    axios
      .post("http://127.0.0.1:8000/disable_role/", { 
        member_id: row.member_id ,
        role_id: row.role_id,

      })
      .then((response) => {
        // Update the data in the state or trigger a data refresh
        // Optionally, show a success message or handle any other UI updates
      })
      .catch((error) => console.error("Error disabling user:", error));
  };

  const columns = [
    { name: "Member ID", selector: "member_id", sortable: true },
    { name: "Role ID", selector: "role_id", sortable: true },
    { name: "Role Name", selector: "role_name_assigned", sortable: true },
    { name: "User", selector: "role_name", sortable: true },
    { name: "Email", selector: "email_id", sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <select
            value={row.role_id}
            onChange={(e) => handleRoleChange(e, row.member_id, row)}
          >
            <option value={row.role_id}>{row.role_name}</option>
            <option value="Trustee">Trustee</option>
            <option value="Branch Manager">Branch Manager</option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>
          {isLoading && (
            <div className="overlay">
              <span className="submit-loader"></span>
              <div className="loading-text mt-4">Please Wait...</div>
            </div>
          )}
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "48px",
        textAlign: "center",
        fontSize: "14px",
      },
    },
    headCells: {
      style: {
        minHeight: "40px",
        backgroundColor: "#4db3c8",
        fontSize: "16px",
        fontWeight: "400",
        color: "white",
        textAlign: "center",
      },
    },
  };

  const [data, setData] = useState([]);
  const [disableData, setDisableData] = useState([]);

  const fetchData = async () => {
    try {
      if (selectTagValue === "Change ADMIN Right") {
        const response = await axios.post(
          "http://127.0.0.1:8000/user_role_fetch/"
        );
        const responseData = response.data.data;
        setSelectedRole(responseData.role_name);
        setData(responseData);
        setDisableData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectTagValue]);

  const handleRoleChange = async (event, memberId, row) => {
    const newRoleId = event.target.value;
    setSelectedRole(newRoleId);
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4000));

      await axios.post("http://127.0.0.1:8000/update_role/", {
        member_id: memberId,
        role_id: row.role_id,
        value_to_update: newRoleId,
        current_role: row.role_name,
      });
      fetchData();
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading1 Main */}

          <div className="button-container d-flex  align-items-center flex-sm-row flex-column  text-start mb-5 mt-3">
            <span>Change Password Admin :</span>
            <select
              className="admin-select-tag ms-sm-2 "
              onChange={(e) => {
                setSelectTagValue(e.target.value);
              }}
            >
              <option value="">Select Option</option>
              <option value="Change Password">Change Password</option>
              {/* <option value="Forgot Password">Forgot Password</option> */}
              <option value="Enable/Disable Operator">
                Enable/Disable Operator
              </option>
              <option value="Change ADMIN Right">Change ADMIN Right</option>
              {/* <option value="Change CASHIER Right">Change CASHIER Right</option> */}
            </select>
          </div>
          {selectTagValue === "Change Password" ? (
            <>
              <div className="container-fluid d-flex text-start w-100 pb-1 px-0">
                <div className="H1-Heading-Main ">Change Password</div>
              </div>

              <div className="mt-4  d-flex align-items-center admin-change-password-memberId-box">
                <div className="change-password-info-first-content">
                  Member Id :{" "}
                </div>

                <input
                  type="text"
                  className=" no-outline-login  text-start change-password-memberId-input"
                  value={memberId}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9.]/g, "");
                    setmemberId(numericValue);
                  }}
                />
              </div>

              <div className="admin-change-password-info-box d-flex mt-4">
                <div className="change-password-info-first-content">
                  Name :{" "}
                </div>
                <div className="change-password-second-content text-start">
                  {memberId === "" ? "" : name}
                </div>
              </div>
              <div className="admin-change-password-info-box d-flex mt-4">
                <div className="change-password-info-first-content">
                  Email :{" "}
                </div>
                <div className="change-password-second-content text-start">
                  {memberId === "" ? "" : Email}
                </div>
              </div>
              <div className="admin-change-password-info-box d-flex mt-4">
                <div className="change-password-info-first-content">
                  Current Password :{" "}
                </div>
                <div className="change-password-second-content text-start">
                  {memberId === "" ? "" : currentPassword}
                </div>
              </div>
              <div className="admin-change-password-memberId-box d-flex mt-4">
                <div className="change-password-info-first-content">
                  Set New Password:{" "}
                </div>
                <input
                  type="text"
                  className=" no-outline-login  change-password-memberId-input"
                  value={memberId === "" ? "" : newPassword}
                  onChange={(e) => {
                    // const numericValue = e.target.value.replace(
                    //     /[^0-9.]/g,
                    //     ""
                    // );
                    SetNewPassword(e.target.value);
                  }}
                />
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary"
                  onClick={handleChangePassword}
                >
                  Change Passsword
                </button>
              </div>
            </>
          ) : null}
          {selectTagValue === "Change ADMIN Right" ? (
            <>
              <div className="container py-2">
                <div className="row w-100">
                  <div className="col-12">
                    <DataTable
                      data={data}
                      columns={columns}
                      customStyles={customStyles}
                      pagination
                      striped
                      dense
                    />
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {selectTagValue === "Enable/Disable Operator" ? (
            <>
              <DataTable
                columns={DisableColumn}
                data={disableData}
                customStyles={customStyles}
                striped
                dense
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AdminForgotPassword;
