import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default function NewOperator() {
  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (memberId !== undefined && memberId !== null && memberId !== '') {
        try {
          const response = await axios.get(
            `http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`
          );
  
          if (response.data && response.data.members && response.data.members.length > 0) {
            const member = response.data.members[0];
            const fullName = `${member.first_name} ${member.middle_name} ${member.last_name}`.trim();
            const email = member.email;
            setEmail(email)
            setName(fullName);
          } else {
            setName('');
            setEmail('')
          }
        } catch (error) {
          console.error("Error fetching member name:", error);
        }
      } else {
        setName('');
        setEmail('')

      }
    };
  
    fetchData();
  }, [memberId]);
  

  const handleSubmit = () => {
    if(!memberId){
      return;
    }

    const requestData = {
      member_id: memberId,
      role_name: selectedOption,
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/operators/", requestData)
      .then((response) => {
        console.log("API Response:", response.data);
        setName("");
        setEmail("");
        setMemberId("");
        setPassword("");

        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Operator Details Saved Successfully.",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      })
      .catch((error) => {
        console.error("API Error:", error);

        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to save Operator Details. Please try again.",
          didOpen: () => {
            Swal.getPopup().style.borderRadius = "25px";
            const confirmButton = Swal.getConfirmButton();
            confirmButton.classList.add("custom-swal-button");
          },
        });
      });
  };

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container d-flex text-start w-100 pb-1">
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Add New Operator
            </h3>
          </div>
          <div className="container d-flex py-3">
            <div className="">
              <select
                className="form-select"
                onChange={handleSelectChange}
                value={selectedOption}
              >
                <option value="">Select an Operator</option>
                <option value="Branch Manager">Branch Manager</option>
                <option value="Operator">Operator</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>
          <div className="container">
            <form
              className="mt-3 py-3 w-100 p-2"
              style={{ backgroundColor: "whitesmoke", borderRadius: "15px" }}
            >
              <div className="row pb-2">
                <div className="col-md-12 form-fields">
                  <label htmlFor="Name">Member ID</label>
                  <input
                    type="text"
                    name="Name"
                    className="form-control no-outline-login"
                    value={memberId}
                    onChange={handleMemberIdChange}
                  />
                </div>
              </div>
              <div className="row pb-2">
                <div className="col-md-12 form-fields ">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    name="FullName"
                    className="form-control no-outline-login bg-white"
                    value={name}
                    readOnly
                    onChange={handleNameChange}
                  />
                </div>
              </div>

              <div className="row pb-2">
                <div className="col-md-12 form-fields">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="Email"
                    className="form-control no-outline-login"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <div className="row pb-2">
                <div className="col-md-12 form-fields">
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    name="Password"
                    className="form-control no-outline-login"
                    value={password}
                    onChange={handlePasswordChange}
                    maxLength={15}
                  />
                </div>
              </div>

              <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
                <div className="col-12 d-flex w-50">
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      style={{
                        padding: "7px 35px 7px 35px",
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "7px",
                        fontSize: "20px",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
