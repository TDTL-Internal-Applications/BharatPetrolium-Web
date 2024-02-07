import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function NewLoan() {
  const [loanId, setLoanId] = useState("");
  const [loanProduct, setLoanProduct] = useState("");
  const [borrower, setBorrower] = useState("");
  const [currency, setCurrency] = useState("");
  const [firstPaymentDate, setFirstPaymentDate] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [appliedAmount, setAppliedAmount] = useState("");
  const [penalties, setPenalties] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("loanId", loanId);
      formData.append("loanProduct", loanProduct);
      formData.append("borrower", borrower);
      formData.append("currency", currency);
      formData.append("firstPaymentDate", firstPaymentDate);
      formData.append("releaseDate", releaseDate);
      formData.append("appliedAmount", appliedAmount);
      formData.append("penalties", penalties);
      formData.append("description", description);
      formData.append("remarks", remarks);

      const response = await axios.post("", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
            <h2 style={{ fontWeight: "bold", color: "dodgerblue" }}>
             Add New Loan
            </h2>
          </div>
          <div
            className="container py-3 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row w-100">
              <form class="row g-3 text-start">
                <div class="col-md-12 col-sm-12 col-lg-6">
                  <label class="form-label">Loan ID*</label>
                  <input
                    type="text"
                    class="form-control no-outline"
                    value={loanId}
                    onChange={(e) => setLoanId(e.target.value)}
                  />
                </div>
                <div class="col-md-12 col-sm-12 col-lg-6">
                  <label class="form-label">Loan Product*</label>
                  <select
                    class="form-control no-outline"
                    value={loanProduct}
                    onChange={(e) => setLoanProduct(e.target.value)}
                  >
                    <option>Select Product</option>
                    <option>Demo</option>
                    <option>Demo</option>
                  </select>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-6">
                  <label class="form-label">Borrower*</label>
                  <select
                    class="form-control no-outline"
                    value={borrower}
                    onChange={(e) => setBorrower(e.target.value)}
                  >
                    <option>Select Product</option>
                    <option>Demo</option>
                    <option>Demo</option>
                  </select>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-6">
                  <label className="form-label">Currency*</label>
                  <select
                    className="form-control no-outline"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="">Select Currency</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                    <option value="BRL">Brazilian Real (BRL)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="CNY">Chinese Yuan (CNY)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound Sterling (GBP)</option>
                    <option value="INR">Indian Rupee (INR)</option>
                    <option value="JPY">Japanese Yen (JPY)</option>
                    <option value="USD">United States Dollar (USD)</option>
                    <option value="ZAR">South African Rand (ZAR)</option>
                  </select>
                </div>
                <div class="col-md-12 col-sm-12 col-lg-6">
                  <label class="form-label">First Payment Date*</label>
                  <input
                    type="date"
                    class="form-control no-outline"
                    value={firstPaymentDate}
                    onChange={(e) => setFirstPaymentDate(e.target.value)}
                  />
                </div>
                <div class="col-md-12 col-sm-12 col-lg-6">
                  <label class="form-label">Release Date*</label>
                  <input
                    type="date"
                    class="form-control no-outline"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  />
                </div>
                <div class="col-md-12 col-sm-12 col-lg-6">
                  <label class="form-label">Applied Amount*</label>

                  <input
                    type="number"
                    class="form-control no-outline"
                    onChange={(e) => setAppliedAmount(e.target.value)}
                    value={appliedAmount}
                  />
                </div>
                <div class="col-md-12 col-sm-12 col-lg-6">
                  <label class="form-label">Late Payemnt Penalties*</label>
                  <div class="input-group flex-nowrap">
                    <div class="input-group">
                      <input
                        type="number"
                        value={penalties}
                        onChange={(e) => setPenalties(e.target.value)}
                        class="form-control no-outline"
                        aria-label="Percentage"
                        aria-describedby="addon-wrapping"
                      />
                      <span class="input-group-text" id="addon-wrapping">
                        %
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 py-5"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 text-center">
                          Drag and drop files here or click to browse.
                        </div>
                        <div className="col-12 text-center">
                          <ul>
                            {uploadedFiles.map((file) => (
                              <li
                                key={file.name}
                                style={{ listStyleType: "none" }}
                              >
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <label class="form-label">Description*</label>
                  <textarea
                    className="form-control no-outline"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label class="form-label">Remarks</label>
                  <textarea
                    className="form-control no-outline"
                    value={remarks}
                    onChange={(e) => setRemarks(e.targetvalue)}
                  />
                </div>

                <div className="col-12 text-center">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    style={{
                      padding: "10px 30px 10px 30px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
