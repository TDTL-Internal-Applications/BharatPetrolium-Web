import React from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";

export default function JournelEntries() {
  return (
    <>
      <Sidebar />
      <div className="container-fluid dashboard-area d-flex">
        <div className="main-content p-4">
          <Header />
          <div className="container d-flex text-start w-100 pb-1 ms-0 ps-0">
            <h3 style={{ fontWeight: "bold", color: "dodgerblue" }}>
              Journel Entries
            </h3>
          </div>
          <div className="container text-start d-flex">
            <div className="row d-flex w-100" >
              <div className="col-6 d-flex">
                <div className="col-6 ps-0 pe-0">
                  <label className="small-label">
                    Enter The Journel Entry Date
                  </label>
                </div>
                <div className="col-6">
                  <input type="date" className="form-control small-label" />
                </div>
              </div>

              <div className="col-6 ps-0 pe-0 d-flex">
                <div className="col-6 text-center">
                  <label>JE No :</label>
                </div>
                <div className="col-6">
                  <input type="text" className="form-control small-label" />
                </div>
              </div>
            </div>
          </div>
          <div className="container justify-content-center d-flex pt-4">
            <div
              className="row d-flex justify-content-center w-100"
           
              style={{ border: "1px solid grey"}}
            >
              <div
                className="col-6 py-3"
                style={{ borderRight: "1px solid grey" }}
              >
                <div style={{color:"dodgerblue"}}>Particular</div>
                <div className="inputs py-1">
                  <input
                    type="text"
                    className="form-control no-outline-login"
                    style={{ borderRadius: "none" }}
                  />
                </div>
                <div className="inputs py-1">
                  <input
                    type="text"
                    className="form-control no-outline-login"
                    style={{ borderRadius: "none" }}
                  />
                </div>
              </div>
              <div
                className="col-3 py-3"
                style={{ borderRight: "1px solid grey" }}
              >
                <div style={{color:"dodgerblue"}}>Debit (Rs)</div>
                <div className="inputs py-1">
                  <input
                    type="text"
                    className="form-control no-outline-login"
                    style={{ borderRadius: "none" }}
                  />
                </div>
              </div>
              <div className="col-3 py-3">
                <div style={{color:"dodgerblue"}}>Credit (Rs)</div>
                <div className="inputs py-1">
                  <input
                    type="text"
                    className="form-control no-outline-login"
                    style={{ borderRadius: "none" }}
                  />
                </div>
              </div>
              <div
                className="col-3 py-3"
                style={{ borderTop: "1px solid grey" }}
              >
                <label style={{color:"dodgerblue"}}>Narration</label>
              </div>
              <div
                className="col-9 py-3"
                style={{ borderTop: "1px solid grey" }}
              >
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>

          <div className="container d-flex justify-content-center py-3">
            <div className="col-6">
              <button className="btn mr-1" style={{padding:"5px 20px",backgroundColor:"green",color:"white"}}>Save</button>
              <button className="btn ml-1"style={{padding:"5px 15px",backgroundColor:"red",color:"white"}}>Cancel</button>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
