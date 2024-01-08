import Sidebar from "./Sidebar";
import Header from "../components/Header";
import "../Style/AdminForgotPassword.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


function AdminForgotPassword() {

    let[selectTagValue,setSelectTagValue]=useState("");

    let[memberId,setmemberId]=useState("");
    let[name,setName]=useState("");
    let[Email,setEmail]=useState("");
    let[currentPassword,SetCurrentPassword]=useState("");
    let[newPassword,SetNewPassword]=useState("");

    async function GetMemberDetails()
    {
        try {
            let response=await axios.get(`http://bpcl.kolhapurdakshin.com:8000/all_memberdata/${memberId}/`);
            let firstName=response.data.members[0].first_name+ " ";
            let middleName=response.data.members[0].middle_name+ " ";
            let lastName=response.data.members[0].last_name;
            setName(firstName+middleName+lastName);
            setEmail(response.data.members[0].email);
            SetCurrentPassword(response.data.members[0].password);
            
        } catch (error) {
            console.log('change password error :',error);
        }
    }

    async function handleChangePassword()
    {
        if(memberId==="")
        {
            Swal.fire({
                icon: "warning",
                title: "Please Enter Member Id",
                text: "Member Id is empty",
                customClass: {
                  popup: "custom-swal-popup",
                  confirmButton: "custom-swal-button",
                },
                didOpen: () => {
                  Swal.getPopup().style.borderRadius = "25px";
                },
              });
              return;
        }
        else if(newPassword.length===0)
        {
            Swal.fire({
                icon: "warning",
                title: "Please Enter Valid New Password",
                text: "New Password is empty",
                customClass: {
                  popup: "custom-swal-popup",
                  confirmButton: "custom-swal-button",
                },
                didOpen: () => {
                  Swal.getPopup().style.borderRadius = "25px";
                },
              });
              return;
        }

        let payloadData={
            member_id:memberId,
            new_password:newPassword
        }

        try {
            let response=await axios.post(`http://bpcl.kolhapurdakshin.com:8000/update_pass/`,payloadData);

            if('success' in response.data&&response.data.success.length>2)
            {
                Swal.fire({
                    icon: "success",
                    title: "Password Changed Successfully",
                    text: "password successfully changed",
                    customClass: {
                        popup: "custom-swal-popup",
                        confirmButton: "custom-swal-button",
                    },
                    didOpen: () => {
                        Swal.getPopup().style.borderRadius = "25px";
                    },
                });
                SetNewPassword("");
                return;
            }


        } catch (error) {
            console.log('change password error :',error);
        }
    }

    useEffect(()=>{
        if(memberId!=="")
        {
            GetMemberDetails();
        }
    },[memberId])

    return(
        <>
      
        
            <Sidebar />
            <div className="container-fluid dashboard-area d-flex">
                <div className="main-content p-4">
                    {/* Navbar */}
                    <Header />
                    {/* Heading1 Main */}

                                    <div className="button-container d-flex  align-items-center flex-sm-row flex-column  text-start mb-5 mt-3"> 
                                       <span>Change Password Admin :</span>
                                        <select className="admin-select-tag ms-sm-2 " onChange={(e)=>{setSelectTagValue(e.target.value)}}>
                                            <option value="">Select Option</option>
                                            <option value="Change Password">Change Password</option>
                                            <option value="Forgot Password">Forgot Password</option>
                                            <option value="Enable/Disable Operator">Enable/Disable Operator</option>
                                            <option value="Change ADMIN Right">Change ADMIN Right</option>
                                            <option value="Change CASHIER Right">Change CASHIER Right</option>

                                        </select>
                                    </div>
                   {(selectTagValue==="Change Password")?
                   <>
                    <div className="container-fluid d-flex text-start w-100 pb-1 px-0">
                        <div className="H1-Heading-Main ">Change Password</div>
                    </div>

                    <div className="mt-4  d-flex align-items-center admin-change-password-memberId-box" >
                                <div className="change-password-info-first-content">Member Id : </div>

                                <input type="text" className="form-control  no-outline-login w-25 change-password-memberId-input" 
                                value={memberId}
                                    onChange={(e) => {
                                        const numericValue = e.target.value.replace(
                                            /[^0-9.]/g,
                                            ""
                                        );
                                        setmemberId(numericValue);
                                    }}
                                />
                    </div>

                    <div className="admin-change-password-info-box d-flex mt-4">
                            <div className="change-password-info-first-content">Name : </div>
                            <div className="change-password-second-content">{(memberId==="")?"":name}</div>
                    </div>
                    <div className="admin-change-password-info-box d-flex mt-4">
                            <div className="change-password-info-first-content">Email : </div>
                            <div className="change-password-second-content">{(memberId==="")?"":Email}</div>
                    </div>
                    <div className="admin-change-password-info-box d-flex mt-4">
                            <div className="change-password-info-first-content">Current Password : </div>
                            <div className="change-password-second-content">{(memberId==="")?"":currentPassword}</div>
                    </div>
                    <div className="admin-change-password-memberId-box d-flex mt-4">
                            <div className="change-password-info-first-content">Set New Password: </div>
                            <input type="text" className="form-control  no-outline-login w-25 change-password-memberId-input" 
                                    value={(memberId==="")?"":newPassword}
                                    onChange={(e) => {
                                        // const numericValue = e.target.value.replace(
                                        //     /[^0-9.]/g,
                                        //     ""
                                        // );
                                        SetNewPassword(e.target.value);
                                    }}
                                />
                    </div>
                    
                    <div className="mt-5 text-center">
                            <button className="btn btn-primary" onClick={handleChangePassword}>Change Passsword</button>
                    </div>
                      
                      

                    
                   </>
                    :null}

                </div>

            </div>
        </>
    )
}

export default AdminForgotPassword;