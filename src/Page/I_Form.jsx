import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import "../Style/Global_Classes.css";
import "../Style/I_Form.css";

export default function ShareHolderColumn() {
 
    const [formData, setFormData] = useState({
        membershipNo: 2023,
        dateOfAdmission:'1979-12-07',
        dateOfEnteranceFee: '1979-12-07',
        fullName: 'V.V GANGAN',
        address: "16 MULUND SHREE MAHESHWARI CHS,BHAIR NAGAR,MULUND",
        permanentAddress: "16 MULUND SHREE MAHESHWARI CHS,BHAIR NAGAR,MULUND",
        occupation: "Service",
        ageAndDateOfMission: 59,
        nameAndAddOfNominee: 'alka V. GANGAN',
        dateOfNomination: '1979-12-07',
        dateOfCessationMembership: '1979-12-07',
        reasonOfCessation: "reason",
        remarks: "remarks",
      });

      const handlePrint = () => {
        let printContents = document.getElementById("printable").innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
      };

  return (
    <>
      <Sidebar />
          <div className="container-fluid dashboard-area d-flex">
              <div className="main-content p-4">
                  <Header />
                  <div  id="printable">

                      <div className="container d-flex text-start w-100 pb-1 ">
                          <div className=" d-flex flex-column justify-content-center mt-1  w-100 BPC-Employee-heading-box">
                              <h2 className="text-center mb-2">The BPC Employee's Co-op. Credit Society Ltd.</h2>
                              <h3 className="text-center">FORM 'l'</h3>
                              <p className="text-center">[See rule 32 and 65]</p>
                              <h3 className="text-center">Register of Members</h3>
                              <p className="text-center">(Section 38(1) of the Maharashtra Co-operative Societies Act. 1960)</p>
                          </div>
                      </div>
                      <hr />

                      <div className="container">
                          <div className="row  pt-3 mb-1">

                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">1. MemberShip No. </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start " >
                                      <input type="number" readOnly name="membershipNo" value={formData.membershipNo} readonly className="  share-holder-column-input" />
                                  </div>
                              </div>

                              <div className="row  mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">2. Date of Admission</span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start">
                                      <input type="date" readOnly name="dateOfAdmission" value={formData.dateOfAdmission} readonly className=" share-holder-column-input" />
                                  </div>
                              </div>

                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">3. Date of payment to Enterance Fee </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start">
                                      <input type="date" readOnly name="dateOfEnteranceFee" value={formData.dateOfEnteranceFee} readonly className="  share-holder-column-input" />
                                  </div>
                              </div>

                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">4. Full Name </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start">
                                      <input type="text" readOnly name="fullName" value={formData.fullName} className="  share-holder-column-input" />
                                  </div>
                              </div>

                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">5. Address </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start">
                                      <input type="text" readOnly name="address" value={formData.address} readonly className="  share-holder-column-input" />
                                  </div>
                              </div>

                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">Permanent Address </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start">
                                      <input type="text" readOnly name="permanentAddress" value={formData.permanentAddress} readonly className="  share-holder-column-input" />
                                  </div>
                              </div>
                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">6. Occupation </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start">
                                      <input type="text" readOnly name="occupation" value={formData.occupation} readonly className="  share-holder-column-input" />
                                  </div>
                              </div>
                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">7. Age on the Date of Admission </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start">
                                      <input type="number" readOnly name="ageAndDateOfMission" value={formData.ageAndDateOfMission} readonly className="  share-holder-column-input" />
                                  </div>
                              </div>
                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">8. Name & add. of Nominee Under Sec. 30(1) </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start">
                                      <input type="text" readOnly name="nameAndAddOfNominee" value={formData.nameAndAddOfNominee} readonly className="  share-holder-column-input" />
                                  </div>
                              </div>
                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">9. Date of Nomination </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start ">
                                      <input type="date" readOnly name="dateOfNomination" value={formData.dateOfNomination} readonly className=" share-holder-column-input" />
                                  </div>
                              </div>
                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">10. Date of Cessation of Membership </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start ">
                                      <input type="date" readOnly name="dateOfCessationMembership" value={formData.dateOfCessationMembership} readonly className=" share-holder-column-input" />
                                  </div>
                              </div>
                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">11. Reason for Censsation </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start ">
                                      <input type="text" readOnly name="reasonOfCessation" value={formData.reasonOfCessation} readonly className=" share-holder-column-input" />
                                  </div>
                              </div>
                              <div className="row mb-3">
                                  <div className="col-6 col-md-6 text-start d-flex justify-content-between mb-md-0 mb-2">
                                      <span className="first-column">12. Remarks </span>
                                      <span>:</span>
                                  </div>
                                  <div className="col-6 col-md-6 text-start ">
                                      <input type="text" readOnly name="remarks" value={formData.remarks} readonly className=" share-holder-column-input" />
                                  </div>
                              </div>

                          </div>
                      </div>

                      <hr />
                      <h3 className="text-center my-2">Particulars of share held</h3>
                      <div className="for-table-print">
                          <table class="table" border="1" >
                              <thead>
                                  <tr className="table-row">
                                      <th className="table-heading" rowSpan="2" scope="col">Date</th>
                                      <th className="table-heading" rowSpan="2" scope="col">Cash Book Folio</th>
                                      <th className="table-heading" colspan="2" scope="col">Application Allotment</th>
                                      <th className="table-heading" rowSpan="2" scope="col">Amount received on <br />1st call <br /> 2nd call</th>
                                      <th className="table-heading" rowSpan="2" scope="col">Total Amount Received</th>
                                      <th className="table-heading" rowSpan="2" scope="col">No. of Shares Held</th>
                                      <th className="table-heading" rowSpan="2" scope="col">Serial No. of Shares Certificate No.</th>
                                  </tr>
                                  <tr >
                                      <th className="table-heading">From</th>
                                      <th className="table-heading">TO</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr className="table-row">
                                      <td className="table-data">31/03/2014</td>
                                      <td className="table-data">cash</td>
                                      <td className="table-data">27461</td>
                                      <td className="table-data">27480</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">20</td>
                                      <td className="table-data">1374</td>
                                  </tr>
                                  <tr className="table-row">
                                      <td className="table-data">31/03/2014</td>
                                      <td className="table-data">cash</td>
                                      <td className="table-data">27461</td>
                                      <td className="table-data">27480</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">20</td>
                                      <td className="table-data">1374</td>
                                  </tr>
                                  {/* <tr className="table-row">
                                      <td className="table-data">31/03/2014</td>
                                      <td className="table-data">cash</td>
                                      <td className="table-data">27461</td>
                                      <td className="table-data">27480</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">20</td>
                                      <td className="table-data">1374</td>
                                  </tr> */}
                              </tbody>
                          </table>
                      </div>
                      <hr/>

                      <h3 className="text-center my-2">Particulars of share transferred of surrendered</h3>
                      <div className="for-table-print">
                          <table class="table" border="1" >
                              <thead>
                                  <tr className="table-row">
                                      <th className="table-heading" rowSpan="3" scope="col">Date</th>
                                      <th className="table-heading" rowSpan="3" scope="col">Cash Book Folio</th>
                                      <th className="table-heading" rowSpan="3" scope="col">Cash Book Transfer Folio or Share</th>
                                      <th className="table-heading" colspan="2" scope="col">No. of Shares Transferred</th>
                                      <th className="table-heading" rowSpan="3" scope="col">No. of Shares Transferred <br />Or  <br /> Refunded</th>
                                      <th className="table-heading" rowSpan="3" scope="col">No. of Shares Held</th>
                                      <th className="table-heading" rowSpan="3" scope="col">Serial No. of Shares Certificates</th>
                                      <th className="table-heading" rowSpan="3" scope="col">Amount</th>
                                  </tr>
                                  <tr className="table-row ">
                                      <th className="table-heading" colspan="2">Serial No. of Shares</th>
                                  </tr>
                                  <tr >
                                      <th className="table-heading">From</th>
                                      <th className="table-heading">TO</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr className="table-row ">
                                      <td className="table-data">31/03/2014</td>
                                      <td className="table-data">cash</td>
                                      <td className="table-data">27461</td>
                                      <td className="table-data">27480</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">20</td>
                                      <td className="table-data">1374</td>
                                      <td className="table-data">1374</td>

                                  </tr>
                                  <tr className="table-row">
                                      <td className="table-data">31/03/2014</td>
                                      <td className="table-data">cash</td>
                                      <td className="table-data">27461</td>
                                      <td className="table-data">27480</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">20</td>
                                      <td className="table-data">1374</td>
                                      <td className="table-data">1374</td>

                                  </tr>
                                  {/* <tr className="table-row border-dark">
                                      <td className="table-data">31/03/2014</td>
                                      <td className="table-data">cash</td>
                                      <td className="table-data">27461</td>
                                      <td className="table-data">27480</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">10000</td>
                                      <td className="table-data">20</td>
                                      <td className="table-data">1374</td>
                                      <td className="table-data">1374</td>

                                  </tr> */}
                              </tbody>
                          </table>
                      </div>
                        <button className="btn btn-primary print-btn" onClick={handlePrint}>Print</button>
                  </div>

              </div>




          </div>
    </>
  );
}
