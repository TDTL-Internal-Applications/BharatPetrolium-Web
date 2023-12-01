import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Loaninterest() {
  const [selectedOption, setSelectedOption] = useState("");

  const [formData, setFormData] = useState({
    accountType: "",
    TermInMonths: 0,
    InterestRate: 0,
    EffectiveStartDate: "",
    EffectiveEndDate: "",
    // installments: 0,
    // bClassFee: "",
    // shareDeduction: "",
    // depositDeduction: "",
  });

//   const handleClear = () => {
//     setFormData({
//       TermInMonths: "",
//       InterestRate: "",
//       EffectiveStartDate: "",
//       EffectiveEndDate: "",
//     });
//   };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "EffectiveStartDate" || name === "EffectiveEndDate") {
      const otherDateName =
        name === "EffectiveStartDate"
          ? "EffectiveEndDate"
          : "EffectiveStartDate";
      const otherDateValue = formData[otherDateName];

      if (
        otherDateValue &&
        new Date(value).getTime() <= new Date(otherDateValue).getTime()
      ) {
        console.error("End date should be greater than the start date");
        // toast.error("End date should be greater than the start date");
        toast.info('End date should be greater than the start date', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        return;
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API = "http://127.0.0.1:8000/set_interest/";

    try {
      const response = await axios.post(API, {
        ...formData,
        accountType: selectedOption,
      });
      console.log(response.data);
    //   toast.success("Loan interest submitted successfully!");
      toast.success('Interest Detail Submitted Successfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setFormData({
            TermInMonths: "",
            InterestRate: "",
            EffectiveStartDate: "",
            EffectiveEndDate: "",
          });
    } catch (error) {
      console.error("Error while submitting:", error);
    //   toast.error("Error submitting loan interest. Please try again.");
      toast.error('Error submitting Interest Detail. Please try again.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "Deposit Loan":
        return (
          <form
            className="mt-3 py-3"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveStartDate">Effective Start Date</label>
                <input
                  type="date"
                  name="EffectiveStartDate"
                  className="form-control no-outline"
                  value={formData.EffectiveStartDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveEndDate">Effective End Date</label>
                <input
                  type="date"
                  name="EffectiveEndDate"
                  className="form-control no-outline"
                  value={formData.EffectiveEndDate || ""}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                <label htmlFor="installments">No. of Installment:</label>
                <input
                  type="number"
                  id="installments"
                  name="installments"
                  className="form-control no-outline"
                  value={formData.installments}
                  onChange={handleChange}
                />
              </div> */}
            </div>

            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="InterestRate">Interest Rate</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  step="0.01"
                  className="form-control no-outline"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="TermInMonths">Term In Month</label>
                <input
                  type="number"
                  name="TermInMonths"
                  className="form-control no-outline"
                  value={formData.TermInMonths}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                <label htmlFor="bClassFee">'B' class fee:</label>
                <input
                  type="text"
                  id="bClassFee"
                  name="bClassFee"
                  className="form-control no-outline"
                  value={formData.bClassFee}
                  onChange={handleChange}
                />
              </div> */}
            </div>
            {/* <div className="row pb-2">
              <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                <label htmlFor="shareDeduction">Share Deduction:</label>
                <input
                  type="text"
                  id="shareDeduction"
                  name="shareDeduction"
                  className="form-control no-outline"
                  value={formData.shareDeduction}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                <label htmlFor="depositDeduction">Deposit Deduction:</label>
                <input
                  type="text"
                  id="depositDeduction"
                  name="depositDeduction"
                  className="form-control no-outline"
                  value={formData.depositDeduction}
                  onChange={handleChange}
                />
              </div>
            </div> */}
            <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
              <div className="col-12 d-flex w-50">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    onClick={handleSubmit}
                    style={{
                      padding: "7px 35px 7px 35px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    // onClick={handleClear}
                    style={{
                      padding: "7px 27px 7px 27px",
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        );
      case "Emergency Loan":
        return (
          <form
            className="mt-3 py-3"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveStartDate">Effective Start Date</label>
                <input
                  type="date"
                  name="EffectiveStartDate"
                  className="form-control no-outline"
                  value={formData.EffectiveStartDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveEndDate">Effective End Date</label>
                <input
                  type="date"
                  name="EffectiveEndDate"
                  className="form-control no-outline"
                  value={formData.EffectiveEndDate || ""}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="installments">No. of Installment:</label>
                    <input
                      type="number"
                      id="installments"
                      name="installments"
                      className="form-control no-outline"
                      value={formData.installments}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>

            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="InterestRate">Interest Rate</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  step="0.01"
                  className="form-control no-outline"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="TermInMonths">Term In Month</label>
                <input
                  type="number"
                  name="TermInMonths"
                  className="form-control no-outline"
                  value={formData.TermInMonths}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="bClassFee">'B' class fee:</label>
                    <input
                      type="text"
                      id="bClassFee"
                      name="bClassFee"
                      className="form-control no-outline"
                      value={formData.bClassFee}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>
            {/* <div className="row pb-2">
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="shareDeduction">Share Deduction:</label>
                    <input
                      type="text"
                      id="shareDeduction"
                      name="shareDeduction"
                      className="form-control no-outline"
                      value={formData.shareDeduction}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="depositDeduction">Deposit Deduction:</label>
                    <input
                      type="text"
                      id="depositDeduction"
                      name="depositDeduction"
                      className="form-control no-outline"
                      value={formData.depositDeduction}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
            <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
              <div className="col-12 d-flex w-50">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    onClick={handleSubmit}
                    style={{
                      padding: "7px 35px 7px 35px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    // onClick={handleClear}
                    style={{
                      padding: "7px 27px 7px 27px",
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        );

      case "Medium Term Loan":
        return (
          <form
            className="mt-3 py-3"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveStartDate">Effective Start Date</label>
                <input
                  type="date"
                  name="EffectiveStartDate"
                  className="form-control no-outline"
                  value={formData.EffectiveStartDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveEndDate">Effective End Date</label>
                <input
                  type="date"
                  name="EffectiveEndDate"
                  className="form-control no-outline"
                  value={formData.EffectiveEndDate || ""}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="installments">No. of Installment:</label>
                    <input
                      type="number"
                      id="installments"
                      name="installments"
                      className="form-control no-outline"
                      value={formData.installments}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>

            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="InterestRate">Interest Rate</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  step="0.01"
                  className="form-control no-outline"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="TermInMonths">Term In Month</label>
                <input
                  type="number"
                  name="TermInMonths"
                  className="form-control no-outline"
                  value={formData.TermInMonths}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="bClassFee">'B' class fee:</label>
                    <input
                      type="text"
                      id="bClassFee"
                      name="bClassFee"
                      className="form-control no-outline"
                      value={formData.bClassFee}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>
            {/* <div className="row pb-2">
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="shareDeduction">Share Deduction:</label>
                    <input
                      type="text"
                      id="shareDeduction"
                      name="shareDeduction"
                      className="form-control no-outline"
                      value={formData.shareDeduction}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="depositDeduction">Deposit Deduction:</label>
                    <input
                      type="text"
                      id="depositDeduction"
                      name="depositDeduction"
                      className="form-control no-outline"
                      value={formData.depositDeduction}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
            <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
              <div className="col-12 d-flex w-50">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    onClick={handleSubmit}
                    style={{
                      padding: "7px 35px 7px 35px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    // onClick={handleClear}
                    style={{
                      padding: "7px 27px 7px 27px",
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        );

      case "Staff Emergency Loan":
        return (
          <form
            className="mt-3 py-3"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveStartDate">Effective Start Date</label>
                <input
                  type="date"
                  name="EffectiveStartDate"
                  className="form-control no-outline"
                  value={formData.EffectiveStartDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveEndDate">Effective End Date</label>
                <input
                  type="date"
                  name="EffectiveEndDate"
                  className="form-control no-outline"
                  value={formData.EffectiveEndDate || ""}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="installments">No. of Installment:</label>
                    <input
                      type="number"
                      id="installments"
                      name="installments"
                      className="form-control no-outline"
                      value={formData.installments}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>

            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="InterestRate">Interest Rate</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  step="0.01"
                  className="form-control no-outline"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="TermInMonths">Term In Month</label>
                <input
                  type="number"
                  name="TermInMonths"
                  className="form-control no-outline"
                  value={formData.TermInMonths}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="bClassFee">'B' class fee:</label>
                    <input
                      type="text"
                      id="bClassFee"
                      name="bClassFee"
                      className="form-control no-outline"
                      value={formData.bClassFee}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>
            {/* <div className="row pb-2">
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="shareDeduction">Share Deduction:</label>
                    <input
                      type="text"
                      id="shareDeduction"
                      name="shareDeduction"
                      className="form-control no-outline"
                      value={formData.shareDeduction}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="depositDeduction">Deposit Deduction:</label>
                    <input
                      type="text"
                      id="depositDeduction"
                      name="depositDeduction"
                      className="form-control no-outline"
                      value={formData.depositDeduction}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
            <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
              <div className="col-12 d-flex w-50">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    onClick={handleSubmit}
                    style={{
                      padding: "7px 35px 7px 35px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    // onClick={handleClear}
                    style={{
                      padding: "7px 27px 7px 27px",
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        );

      case "Staff Medium Term Loan":
        return (
          <form
            className="mt-3 py-3"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveStartDate">Effective Start Date</label>
                <input
                  type="date"
                  name="EffectiveStartDate"
                  className="form-control no-outline"
                  value={formData.EffectiveStartDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveEndDate">Effective End Date</label>
                <input
                  type="date"
                  name="EffectiveEndDate"
                  className="form-control no-outline"
                  value={formData.EffectiveEndDate || ""}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="installments">No. of Installment:</label>
                    <input
                      type="number"
                      id="installments"
                      name="installments"
                      className="form-control no-outline"
                      value={formData.installments}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>

            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="InterestRate">Interest Rate</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  step="0.01"
                  className="form-control no-outline"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="TermInMonths">Term In Month</label>
                <input
                  type="number"
                  name="TermInMonths"
                  className="form-control no-outline"
                  value={formData.TermInMonths}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="bClassFee">'B' class fee:</label>
                    <input
                      type="text"
                      id="bClassFee"
                      name="bClassFee"
                      className="form-control no-outline"
                      value={formData.bClassFee}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>
            {/* <div className="row pb-2">
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="shareDeduction">Share Deduction:</label>
                    <input
                      type="text"
                      id="shareDeduction"
                      name="shareDeduction"
                      className="form-control no-outline"
                      value={formData.shareDeduction}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="depositDeduction">Deposit Deduction:</label>
                    <input
                      type="text"
                      id="depositDeduction"
                      name="depositDeduction"
                      className="form-control no-outline"
                      value={formData.depositDeduction}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
            <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
              <div className="col-12 d-flex w-50">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    onClick={handleSubmit}
                    style={{
                      padding: "7px 35px 7px 35px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    // onClick={handleClear}
                    style={{
                      padding: "7px 27px 7px 27px",
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        );

      case "Ek Laksha Yojana Deposit":
        return (
          <form
            className="mt-3 py-3"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveStartDate">Effective Start Date</label>
                <input
                  type="date"
                  name="EffectiveStartDate"
                  className="form-control no-outline"
                  value={formData.EffectiveStartDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveEndDate">Effective End Date</label>
                <input
                  type="date"
                  name="EffectiveEndDate"
                  className="form-control no-outline"
                  value={formData.EffectiveEndDate || ""}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="installments">No. of Installment:</label>
                    <input
                      type="number"
                      id="installments"
                      name="installments"
                      className="form-control no-outline"
                      value={formData.installments}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>

            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="InterestRate">Interest Rate</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  step="0.01"
                  className="form-control no-outline"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="TermInMonths">Term In Month</label>
                <input
                  type="number"
                  name="TermInMonths"
                  className="form-control no-outline"
                  value={formData.TermInMonths}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="bClassFee">'B' class fee:</label>
                    <input
                      type="text"
                      id="bClassFee"
                      name="bClassFee"
                      className="form-control no-outline"
                      value={formData.bClassFee}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>
            {/* <div className="row pb-2">
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="shareDeduction">Share Deduction:</label>
                    <input
                      type="text"
                      id="shareDeduction"
                      name="shareDeduction"
                      className="form-control no-outline"
                      value={formData.shareDeduction}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="depositDeduction">Deposit Deduction:</label>
                    <input
                      type="text"
                      id="depositDeduction"
                      name="depositDeduction"
                      className="form-control no-outline"
                      value={formData.depositDeduction}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
            <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
              <div className="col-12 d-flex w-50">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    onClick={handleSubmit}
                    style={{
                      padding: "7px 35px 7px 35px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    // onClick={handleClear}
                    style={{
                      padding: "7px 27px 7px 27px",
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        );

      case "Lakhpati Yojana Deposit":
        return (
          <form
            className="mt-3 py-3"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveStartDate">Effective Start Date</label>
                <input
                  type="date"
                  name="EffectiveStartDate"
                  className="form-control no-outline"
                  value={formData.EffectiveStartDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveEndDate">Effective End Date</label>
                <input
                  type="date"
                  name="EffectiveEndDate"
                  className="form-control no-outline"
                  value={formData.EffectiveEndDate || ""}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="installments">No. of Installment:</label>
                    <input
                      type="number"
                      id="installments"
                      name="installments"
                      className="form-control no-outline"
                      value={formData.installments}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>

            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="InterestRate">Interest Rate</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  step="0.01"
                  className="form-control no-outline"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="TermInMonths">Term In Month</label>
                <input
                  type="number"
                  name="TermInMonths"
                  className="form-control no-outline"
                  value={formData.TermInMonths}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="bClassFee">'B' class fee:</label>
                    <input
                      type="text"
                      id="bClassFee"
                      name="bClassFee"
                      className="form-control no-outline"
                      value={formData.bClassFee}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>
            {/* <div className="row pb-2">
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="shareDeduction">Share Deduction:</label>
                    <input
                      type="text"
                      id="shareDeduction"
                      name="shareDeduction"
                      className="form-control no-outline"
                      value={formData.shareDeduction}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="depositDeduction">Deposit Deduction:</label>
                    <input
                      type="text"
                      id="depositDeduction"
                      name="depositDeduction"
                      className="form-control no-outline"
                      value={formData.depositDeduction}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
            <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
              <div className="col-12 d-flex w-50">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    onClick={handleSubmit}
                    style={{
                      padding: "7px 35px 7px 35px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    // onClick={handleClear}
                    style={{
                      padding: "7px 27px 7px 27px",
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        );

      case "Saving Deposit":
        return (
          <form
            className="mt-3 py-3"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveStartDate">Effective Start Date</label>
                <input
                  type="date"
                  name="EffectiveStartDate"
                  className="form-control no-outline"
                  value={formData.EffectiveStartDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="EffectiveEndDate">Effective End Date</label>
                <input
                  type="date"
                  name="EffectiveEndDate"
                  className="form-control no-outline"
                  value={formData.EffectiveEndDate || ""}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="installments">No. of Installment:</label>
                    <input
                      type="number"
                      id="installments"
                      name="installments"
                      className="form-control no-outline"
                      value={formData.installments}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>

            <div className="row pb-2">
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="InterestRate">Interest Rate</label>
                <input
                  type="number"
                  id="InterestRate"
                  name="InterestRate"
                  step="0.01"
                  className="form-control no-outline"
                  value={formData.InterestRate}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 form-fields">
                <label htmlFor="TermInMonths">Term In Month</label>
                <input
                  type="number"
                  name="TermInMonths"
                  className="form-control no-outline"
                  value={formData.TermInMonths}
                  onChange={handleChange}
                  min={0}
                />
              </div>
              {/* <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="bClassFee">'B' class fee:</label>
                    <input
                      type="text"
                      id="bClassFee"
                      name="bClassFee"
                      className="form-control no-outline"
                      value={formData.bClassFee}
                      onChange={handleChange}
                    />
                  </div> */}
            </div>
            {/* <div className="row pb-2">
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="shareDeduction">Share Deduction:</label>
                    <input
                      type="text"
                      id="shareDeduction"
                      name="shareDeduction"
                      className="form-control no-outline"
                      value={formData.shareDeduction}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 form-fields">
                    <label htmlFor="depositDeduction">Deposit Deduction:</label>
                    <input
                      type="text"
                      id="depositDeduction"
                      name="depositDeduction"
                      className="form-control no-outline"
                      value={formData.depositDeduction}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}
            <div className="row w-100 d-flex justify-content-center pt-4 pb-3">
              <div className="col-12 d-flex w-50">
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    onClick={handleSubmit}
                    style={{
                      padding: "7px 35px 7px 35px",
                      backgroundColor: "dodgerblue",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Ok
                  </button>
                </div>
                <div className="col-6 d-flex justify-content-center">
                  <button
                    type="btn"
                    // onClick={handleClear}
                    style={{
                      padding: "7px 27px 7px 27px",
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      border: "none",
                      borderRadius: "7px",
                      fontSize: "20px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        );
      default:
        return null;
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
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Interest Details
            </h3>
          </div>
          <div className="container d-flex ">
            <div className="row w-100 d-flex justify-content-start text-start">
              <select
                className="form-select no-outline-login w-25"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Select Account Type</option>
                <option value="Deposit Loan">Deposit Loan</option>
                <option value="Emergency Loan">Emergency Loan</option>
                <option value="Medium Term Loan">Medium Term Loan</option>
                <option value="Staff Emergency Loan">
                  Staff Emergency Loan
                </option>
                <option value="Staff Medium Term Loan">
                  Staff Medium Term Loan
                </option>
                <option value="Ek Laksha Yojana Deposit">
                  Ek Laksha Yojana Deposit
                </option>
                <option value="Lakhpati Yojana Deposit">
                  Lakhpati Yojana Deposit
                </option>
                <option value="Saving Deposit">Saving Deposit</option>
              </select>
              {selectedOption && renderForm()}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
