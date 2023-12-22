import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import { FiUpload } from "react-icons/fi";
import { MdRemoveCircle } from "react-icons/md";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const size = 2 * 20; // 2rem converted to pixels (assuming 1rem = 16px)
          canvas.width = size;
          canvas.height = size;
          ctx.drawImage(image, 0, 0, size, size);
          const resizedImage = canvas.toDataURL("image/jpeg");
          setSelectedImage(resizedImage);
        };
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleRemoveimage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const memberId = localStorage.getItem("member_id");

    axios
      .get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`, {
        // member_id: memberId,
      })
      .then((response) => {
        setUserData(response.data.members[0]);
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />
          {/* Heading */}
          <div className="container d-flex text-start w-100 pb-1">
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              User Profile
            </h3>
          </div>
          {/* Display user details */}
          <div>
            {userData ? (
              <div
                className="container d-flex py-2"
                style={{ backgroundColor: "#4db3c8", borderRadius: "15px" }}
              >
                <form
                  class="row pe-3 ps-3 py-3 g-3 text-start text-white"
                  style={{ fontWeight: "500" }}
                >
                  {/* User information */}
                  <div className="container d-flex justify-content-center py-1">
                    {/* <div className="row">
                      <img src={img1} alt="" style={{ borderRadius: "50%" }} />
                    </div> */}
                    <div>
                      <div className="row pb-2">
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt=""
                            style={{ borderRadius: "50%" }}
                          />
                        ) : (
                          <p>No image selected</p>
                        )}
                      </div>

                      <label
                        htmlFor="uploadInput"
                        className="text-center d-flex justify-content-center"
                      >
                        <input
                          type="file"
                          id="uploadInput"
                          accept="image/jpeg, image/jpg"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <button
                          type="button"
                          className="text-center d-flex justify-content-center"
                          style={{
                            padding: "7px 20px 7px 20px",
                            backgroundColor: "dodgerblue",
                            color: "white",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            document.getElementById("uploadInput").click()
                          }
                        >
                          <FiUpload
                            style={{ marginRight: "8px", fontSize: "1rem" }}
                          />
                          Upload
                        </button>
                      </label>
                      <div className="col-12 text-center">
                      {selectedImage ? (
                        <span
                          className="btn btn-danger"
                          onClick={handleRemoveimage}
                          style={{
                            padding: "7px 18px 7px 18px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <MdRemoveCircle style={{marginRight:"8px",fontSize:"1rem"}}/>Remove
                        </span>
                      ) : null}
                      </div>
                     
                    </div>
                  </div>

                  <div className="row text-center">
                    <h3>
                      <strong>
                        {userData.first_name} {userData.last_name}
                      </strong>
                    </h3>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputAddress" class="form-label">
                      Email
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="email"
                      class="form-control"
                      value={userData.email}
                      onChange={(e) => {
                        const newEmail = e.target.value;
                        setUserData((prevUserData) => ({ ...prevUserData, email: newEmail }));
                      }}
                      
                    />
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputPassword4" class="form-label">
                      Birth Date
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="date"
                      class="form-control"
                      value={userData.birth_date}
                      id="inputPassword4"
                      readOnly
                    />
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputAddress2" class="form-label">
                      PAN No.
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="text"
                      class="form-control"
                      value={userData.pan_no}
                      readOnly
                    />
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputCity" class="form-label">
                      Nominee Name
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="text"
                      value={userData.nominee_name}
                      class="form-control"
                      readOnly
                    />
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputCity" class="form-label">
                      Nominee Relation
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="text"
                      value={userData.relation}
                      class="form-control"
                      readOnly
                    />
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputCity" class="form-label">
                      Nominee Age
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="text"
                      value={userData.nominee_age}
                      class="form-control"
                      readOnly
                    />
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputCity" class="form-label">
                      City
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="text"
                      value={userData.city}
                      class="form-control"
                      readOnly
                    />
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputCity" class="form-label">
                      Gender
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="text"
                      value={userData.gender}
                      class="form-control"
                      readOnly
                    />
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                    <label for="inputZip" class="form-label">
                      Mobile No.
                    </label>
                    <input
                      style={{ backgroundColor: "white" }}
                      type="tel"
                      class="form-control"
                      value={userData.mobile_no}
                      onChange={(e) => {
                        const newMobileNo = e.target.value;
                        setUserData((prevUserData) => ({ ...prevUserData, mobile_no: newMobileNo }));
                      }}
                      maxLength={10}
                      
                    />
                  </div>
                  <div className="row pt-3 d-flex justify-content-center text-center">
                    <div className="col-2 ">
                    <span type="btn" className="btn btn-success">Save Changes</span>

                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
