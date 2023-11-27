// import React from "react";
// import Sidebar from "./Sidebar";
// import { BsPersonSquare } from "react-icons/bs";
// import { CgFileDocument } from "react-icons/cg";
// import { GiTakeMyMoney } from "react-icons/gi";
// import "../Style/Dashboard.css";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { Link } from "react-router-dom";
// import Chart from "../Page/Chart";

// export default function Dashboard() {
//   return (
//     <>
//       <Sidebar />
//       <div className="container-fluid dashboard-area d-flex">
//         <div className="main-content p-4">
//           {/* Navbar */}
//           <Header />

//           {/* Components row 1*/}
//           <div className="p-3">
//             <div class="row py-1 component-2">
//               <div
//                 className="col-lg-4 col-md-6 col-sm-12 py-1"
//                 style={{ border: "4px solid white" }}
//               >
//                 <Link to="">
//                   <div
//                     class="col"
//                     style={{
//                       outline: "4px solid whitesmoke",
//                       borderRadius: "10px",
//                       paddingTop: "2rem",
//                       paddingBottom: "2rem",
//                       border: "4px solid white",
//                     }}
//                   >
//                     <CgFileDocument
//                       className="component-icon py-1"
//                       style={{ fontSize: "4rem" }}
//                     />
//                     <span
//                       className="custom-span"
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       Total Members
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//               <div
//                 className="col-lg-4 col-md-6 col-sm-12 py-1"
//                 style={{ border: "4px solid white" }}
//               >
//                 <Link to="">
//                   <div
//                     class="col"
//                     style={{
//                       outline: "4px solid whitesmoke",
//                       borderRadius: "10px",
//                       paddingTop: "3rem",
//                       paddingBottom: "3rem",
//                     }}
//                   >
//                     <BsPersonSquare
//                       className="component-icon py-1"
//                       style={{ fontSize: "4rem" }}
//                     />
//                     <span
//                       className="custom-span"
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                      Total Withdrwal
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//               <div
//                 className="col-lg-4 col-md-6 col-sm-12 py-1"
//                 style={{ border: "4px solid white" }}
//               >
//                 <Link to="">
//                   <div
//                     class="col"
//                     style={{
//                       outline: "4px solid whitesmoke",
//                       borderRadius: "10px",
//                       paddingTop: "2rem",
//                       paddingBottom: "2rem",
//                     }}
//                   >
//                     <GiTakeMyMoney
//                       className="component-icon py-1"
//                       style={{ fontSize: "4rem" }}
//                     />
//                     <span
//                       className="custom-span"
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       Total Deposits 
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//             </div>

//             {/* Components row 2*/}
//             {/* <div class="row py-1 component-1">
//               <div
//                 className="col-lg-4 col-md-6 col-sm-12 py-1"
//                 style={{ border: "4px solid white" }}
//               >
//                 <Link to="/assesment-of-property">
//                   <div
//                     class="col "
//                     style={{
//                       outline: "4px solid whitesmoke",
//                       borderRadius: "10px",
//                       paddingTop: "3rem",
//                       paddingBottom: "3rem",
//                       border: "4px solid white",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <FaClipboardList
//                       className="component-icon py-1"
//                       style={{ fontSize: "4rem" }}
//                     />
//                     <span
//                       className="custom-span"
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       Assesment of
//                       <br /> Property
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//               <div
//                 className="col-lg-4 col-md-6 col-sm-12 py-1"
//                 style={{ border: "4px solid white" }}
//               >
//                 <Link to="/collection">
//                   <div
//                     class="col"
//                     style={{
//                       outline: "4px solid whitesmoke",
//                       borderRadius: "10px",
//                       paddingTop: "4rem",
//                       paddingBottom: "4rem",
//                     }}
//                   >
//                     <MdCollectionsBookmark
//                       className="component-icon py-1"
//                       style={{ fontSize: "4rem" }}
//                     />
//                     <span
//                       className="custom-span"
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       Collection
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//               <div
//                 className="col-lg-4 col-md-6 col-sm-12 py-1"
//                 style={{ border: "4px solid white" }}
//               >
//                 <Link to="/title-transfer-of-property">
//                   <div
//                     class="col"
//                     style={{
//                       outline: "4px solid whitesmoke",
//                       borderRadius: "10px",
//                       paddingTop: "3rem",
//                       paddingBottom: "3rem",
//                     }}
//                   >
//                     <BiTransferAlt
//                       className="component-icon py-1"
//                       style={{ fontSize: "4rem" }}
//                     />
//                     <span
//                       className="custom-span"
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       Title Transfer of
//                       <br /> Property
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//             </div> */}
//             <div className="pt-2">
//               <Chart />
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { TbBuildingBank } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import "../Style/Dashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Chart from "../Page/Chart";
import { IoPersonSharp } from "react-icons/io5";

export default function Dashboard() {
  const [data, setData] = useState({
    totalMembers: 0,
    totalWithdrawalMembers: 0,
    totalDeposits: 0,
  });

  useEffect(() => {
    axios.post("http://127.0.0.1:8000/Member_dashboard/")
      .then(response => {
        console.log("Response from API:", response.data); 
        setData({
          totalMembers: response.data.countMembers[0]['count(member_id)'],
          totalWithdrawalMembers: response.data.WithdrawalCount[0]['count(transaction_id)'],
          totalDeposits: response.data.DepositCount[0]['count(transaction_id)'],
        });
      })
      .catch(error => {
        console.error("Error fetching data from API:", error);
      });
  }, []);
  

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          {/* Navbar */}
          <Header />

          {/* Components row 1*/}
          <div className="p-3">
            <div className="row py-1 component-2">
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="">
                  <div
                    className="col"
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "1.8rem",
                      paddingBottom: "1.8rem",
                      border: "4px solid white",
                    }}
                  >
                    <IoPersonSharp
                      className="component-icon py-1"
                      style={{ fontSize: "4rem" }}
                    />
                    <span
                      className="custom-span"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Total Members<br/>{data.totalMembers} 
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="">
                  <div
                    className="col"
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "2rem",
                      paddingBottom: "2rem",
                    }}
                  >
                    <BiMoneyWithdraw
                      className="component-icon py-1"
                      style={{ fontSize: "4rem" }}
                    />
                    <span
                      className="custom-span"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Total Withdrawal <br/> {data.totalWithdrawalMembers}
                    </span>
                  </div>
                </Link>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-12 py-1"
                style={{ border: "4px solid white" }}
              >
                <Link to="">
                  <div
                    className="col"
                    style={{
                      outline: "4px solid whitesmoke",
                      borderRadius: "10px",
                      paddingTop: "2rem",
                      paddingBottom: "2rem",
                    }}
                  >
                    <TbBuildingBank
                      className="component-icon py-1"
                      style={{ fontSize: "4rem" }}
                    />
                    <span
                      className="custom-span"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Total Deposits<br/> {data.totalDeposits}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="pt-2">
              <Chart />
            </div>
          </div>


          
          <Footer />
        </div>
      </div>
    </>
  );
}
