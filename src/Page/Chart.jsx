import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Function to map numeric months to month names
const getMonthName = (month) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month - 1];
};

export default function App() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .post("http://bpcl.kolhapurdakshin.com:8000/chart/")
      .then((response) => {
        const depositCounts = response.data.deposit_counts || [];
        const withdrawalCounts = response.data.withdrawal_counts || [];

        // Combine deposit and withdrawal data for the same month
        const combinedData = depositCounts.map((depositCount) => {
          const withdrawalCount = withdrawalCounts.find(
            (item) => item.month === depositCount.month
          );
          return {
            month: getMonthName(depositCount.month),
            deposit_amount: depositCount.total_deposit_amount || 0,
            withdrawal_amount: withdrawalCount
              ? withdrawalCount.total_withdrawal_amount || 0
              : 0,
          };
        });

        // Generate a list of all months from the current year
        const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
        const allMonthsData = allMonths.map((month) => {
          const existingData = combinedData.find(
            (item) => item.month === getMonthName(month)
          );
          return {
            month: getMonthName(month),
            deposit_amount: existingData ? existingData.deposit_amount : 0,
            withdrawal_amount: existingData
              ? existingData.withdrawal_amount
              : 0,
          };
        });

        // Sort the data in chronological order
        const sortedData = allMonthsData.sort((a, b) => {
          return allMonths.indexOf(a.month) - allMonths.indexOf(b.month);
        });

        console.log("Fetched Data:", sortedData);
        setChartData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center w-100 pb-1">
        <div className="row d-flex justify-content-center align-items-center w-100">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    type="category" 
                    padding={{ left: 70, right: 70 }} 
                  />

                  <YAxis/>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="deposit_amount"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Deposit Amount"
                  />
                  <Line
                    type="monotone"
                    dataKey="withdrawal_amount"
                    stroke="#82ca9d"
                    name="Withdrawal Amount"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
