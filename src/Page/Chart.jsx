// import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  //   PieChart,
  //   Pie,
  ResponsiveContainer,
} from "recharts";
// import Sidebar from "./Sidebar";
// import Header from "../components/Header";

const data = [
  {
    name: "A",
   data2: 4000,
    data1: 2400,
    amt: 2400,
  },
  {
    name: "B",
   data2: 3000,
    data1: 1398,
    amt: 2210,
  },
  {
    name: "C",
   data2: 2000,
    data1: 9800,
    amt: 2290,
  },
  {
    name: "D",
   data2: 2780,
    data1: 3908,
    amt: 2000,
  },
  {
    name: "E",
   data2: 1890,
    data1: 4800,
    amt: 2181,
  },
  {
    name: "F",
   data2: 2390,
    data1: 3800,
    amt: 2500,
  },
  {
    name: "G",
   data2: 3490,
    data1: 8580,
    amt: 2100,
  },
  {
    name: "H",
   data2: 4821,
    data1: 3641,
    amt: 8476,
  },
  {
    name: "I",
   data2: 6415,
    data1: 2654,
    amt: 9654,
  },
  {
    name: "J",
   data2: 4869,
    data1: 6954,
    amt: 4051,
  },
  {
    name: "K",
   data2: 3000,
    data1: 1200,
    amt: 2000,
  },
  {
    name: "L",
   data2: 4200,
    data1: 1800,
    amt: 2800,
  },
  {
    name: "M",
   data2: 1800,
    data1: 3500,
    amt: 1500,
}
];

//Piechart
// const data01 = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];
// const data02 = [
//   { name: "A1", value: 100 },
//   { name: "A2", value: 300 },
//   { name: "B1", value: 100 },
//   { name: "B2", value: 80 },
//   { name: "B3", value: 40 },
//   { name: "B4", value: 30 },
//   { name: "B5", value: 50 },
//   { name: "C1", value: 100 },
//   { name: "C2", value: 200 },
//   { name: "D1", value: 150 },
//   { name: "D2", value: 50 },
// ];

export default function App() {
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
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="data1"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="data2" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                    <PieChart width={600} height={600}>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    outerRadius={60}
                    fill="#8884d8"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx={200}
                    cy={200}
                    innerRadius={70}
                    outerRadius={90}
                    fill="#82ca9d"
                    label
                  />
                </PieChart>
                    </ResponsiveContainer>
                </div>
               
              </div> */}
        </div>
      </div>
    </>
  );
}
