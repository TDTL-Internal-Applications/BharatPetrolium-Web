import React, { useEffect, useState } from "react";
import Sidebar from "../Page/Sidebar";
import Header from "../components/Header";
import { AnimatedCounter } from "react-animated-counter";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";

const BankBalance = () => {
  const [balance, setBalance] = useState(0);
  const member_id = localStorage.getItem("member_id");

  useEffect(() => {
    if (!member_id) {
      console.error("Member ID not found in localStorage");
      return;
    }

    // Simulate fetching the data from the API
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://bpcl.kolhapurdakshin.com:8000/member_bank_details/",
          {
            member_id: member_id,
          }
        );

        // Assuming your response has a property 'data'
        const data = response.data;

        // Set the balance from the fetched data
        setBalance(data.bank_details.total_saving_balance);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [member_id]);

  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container-fluid ps-0 d-flex text-start w-100 pb-1">
            <div className="row w-100 align-items-center">
              <div className="col-6 text-start">
                <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
                  Bank Balance
                </h3>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-baseline">
            <div className="d-inline">
              <AnimatedCounter
                value={balance}
                color="black"
                fontSize="6rem"
                fontStyle={{ fontWeight: "bold" }}
                animationDuration={1500}
                delay={0}
                easing="easeInQuad"
              />
            </div>
            <FaRupeeSign style={{ fontSize: "30px", marginLeft:"5px", color:"red" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BankBalance;
