import "./App.css";
import AssesmentOP from "./Page/AssesmentOP";
import Collection from "./Page/Collection";
import Dashboard from "./Page/Dashboard";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
// import TitleTaxProp from "./Page/TitleTaxProp";
import LoginPage from "./Page/LoginPage";
import MemberReg1 from "./Page/MemberReg1";
import ForgotPassword from "./Page/ForgotPassword";
import ResetPassword from "./Page/ResetPassword";
import NewTransaction from "./Page/NewTransaction";
import NewLoan from "./Page/NewLoan";
import Chart from "./Page/Chart";
import LoanHistory from "./Page/LoanHistory";
import EmployeeReg from "./Page/EmployeeReg";
import RegisterMembers from "./Page/RegisterMembers";
import TransactionHistory from "./Page/TransactionHistory";
import LoanScheme from "./Page/LoanScheme";
import Shareholder from "./Page/Shareholder";
import Loaninterest from "./Page/EditInterest";
import Recurring from "./MemberPages/Recurring";
import RecurringDeposit from "./Page/RecurringDeposit";
import MediumTermLoan from "./Page/MediumTermLoan";
import ViewMediumTermLoan from "./Page/ViewMediumTermLoan";
import NewMediumTermLoan from "./Page/NewMediumTermLoan";
import NewStaffEmergencyLoan from "./Page/NewStaffEmergencyLoan";
import ViewStaffEmergencyLoan from "./Page/ViewStaffEmergencyLoan"
import NewEmergencyLoan from "./Page/NewEmergencyLoan"
import ViewEmergencyLoan from "./Page/ViewEmergencyLoan"
import ViewStaffMediumTermLoan from "./Page/ViewStaffMediumTermLoan"
import NewStaffMediumTermLoan from "./Page/NewStaffMediumTermLoan"
import TermDeposit from "./Page/TermDeposit"
import TermDepositRenew from "./Page/TermDepositRenew"
import ViewTermDeposit from "./Page/ViewTermDeposit"
import EklakshaDeposit from "./Page/EkLakshaYojanaDeposit"
import EklakshaDepositRenew from "./Page/EkLakshyaDepositRenew"
import EklakshaDepositView from "./Page/ViewEkLakshyaYojana";
import DamDuppatDeposit from "./Page/DamDuppatDeposit"
import DamDuppatRenew from "./Page/DamDuppatRenew"
import ViewDamDuppat from "./Page/ViewDAMDuppat"
import LakhpatiView from "./Page/ViewLakhpati"
import LakhpatiYojana from "./Page/LakhpatiYojana";
import CashCertificateDeposit from "./Page/CashCertificateDeposit"
import CashCertificateDepositRenew from "./Page/CashCertificateDepositRenew"
import ViewCashCertificate from "./Page/ViewCashCertificateDeposit"
import RdTransaction from "./Page/RecurringTransaction";
import ViewRd from "./Page/ViewRecurringDeposit";
import IForm from "./Page/I_Form"
import JForm from "./Page/Jform"
import ViewMemberDetails from "./Page/ViewMemberDetails"
import MemberTransactionsEntry from "./Page/MemberTransactionsEntry"
import MemberLoanTransactionsEntries from "./Page/MemberLoanTransactionsEntries"
import PrintPassbook from "./Page/PrintPassbook";
import KYCUpdation from "./Page/KycUpdate";
import BankDetailsUpdate from "./Page/BankDetailsUpdate"
import MemberSettlementAccountReceipt from "./Page/MemberSettlementAccountReceipt"
import MemberSavingDepositReceiptEntry from "./Page/MemSavDeposit"
import Cumulativepaymententries from "./Page/CumulativePaymentEntryNew"
import DividentInterest from "./Page/DividentInterest"
import JournelEntries from "./Page/JournelEntries";
import TransactionStaffMedTermLoan from "./Page/TransactionStaffMediumTermLoan";
import Profile from "./MemberPages/Profile";
import MemberRecurriing from "./MemberPages/Recurring"
import FixedDeposit from "./MemberPages/FixedDeposit"
import MemberCashCertificate from "./MemberPages/CashCertificate"
import MemberDamDuppat from "./MemberPages/DamDuppat"
import MemberEklaksha from "./MemberPages/Eklaksha"
import MemberLakhpati from "./MemberPages/lakhpati"
import UnderDevelopment from "./Page/Under_Development";
import TransactionMedTermLoan from "./Page/TransactionMemTermLoan"
import AddNewOp from "./Page/NewOperator"
import AllLoanTransaction from "./Page/AllLoanTransaction";
import NeftTransaction from "./Page/NeftTransaction";
import DepositAutoRenewal from "./Page/DepositAutoRenewal"
import VoucherPrinting from "./Page/VoucherPrinting";
import MemberMedTerm from "./MemberPages/MemberMedTerm";
import MemberEmergencyLoan from "./MemberPages/MemberEmergencyLoan"
import TermDepositClose from "./Page/TermDepositClose"
import ForgotPassword2 from "./Page/ForgotPassword2"
import ForgotPassword3 from "./Page/ForgotPassword3"
import AdminUpdateCredentials from "./Page/AdminUpdateCredentials"


function App() {

 let[forgotPasswordEmail,setForgotPasswordEmail]=useState("");
 
  function forSettingForgotPasswordEmail(value)
  {
    setForgotPasswordEmail(value);
  }

  let currentLocation= useLocation();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[currentLocation])

  let[memberIdNo,setMemberIdNo]=useState(0);
  function toChangeMemberId(ID) {
    setMemberIdNo(ID);
  }
  return (
    <div className="App">
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Home" element={<Dashboard />} />
          <Route path="/assesment-of-property" element={<AssesmentOP />} />
          <Route path="/collection" element={<Collection />} />
          {/* <Route
            path="/title-transfer-of-property"
            element={<TitleTaxProp />}
          /> */}
          <Route path="/new-member-registration" element={<MemberReg1 />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/employer-registration-form" element={<EmployeeReg />} />
          <Route path="/member-list" element={<RegisterMembers />} />
          <Route path="/purchase-shares" element={<Shareholder />} />

          {/* Deposit */}
          <Route path="/recurring-deposit" element={<RecurringDeposit />} />

          {/* Sub Menu of Transaction */}
          <Route path="/new-transaction" element={<NewTransaction />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />

          {/* Sub Menu of Loan */}
          <Route path="/add-new-loan" element={<NewLoan />} />
          {/* Charts */}
          <Route path="/Dashboard" element={<Chart />} />
          <Route path="/loan-history" element={<LoanHistory />} />

          {/* Loan Scheme */}
          <Route path="/loan-scheme" element={<LoanScheme />} />
          <Route path="/loan-interest" element={<Loaninterest />} />

          {/* Members Pages */}
          <Route path="/member-rd" element={<Recurring />} />

         <Route path="/medium-term-loan" element={<MediumTermLoan/>}/>
         <Route path="/view-medium-term-loan" element={<ViewMediumTermLoan/>}></Route>
         {/* <Route path="/new-medium-term-loan" element={<NewMediumTermLoan/>}></Route> */}
         <Route path="/medium-term-loan-transaction" element={<TransactionMedTermLoan/>}></Route>

         <Route path="/new-medium-term-loan" element={<NewMediumTermLoan/>}></Route>
         <Route path="/new-staff-emergency-loan" element={<NewStaffEmergencyLoan/>}></Route>
         <Route path="/view-staff-emergency-loan" element={<ViewStaffEmergencyLoan/>}></Route>
         <Route path="/new-emergency-loan" element={<NewEmergencyLoan/>}></Route>
         <Route path="/view-emergency-loan" element={<ViewEmergencyLoan/>}></Route>
         <Route path="/view-staff-medium-term-loan" element={<ViewStaffMediumTermLoan/>}></Route>
         <Route path="/new-staff-medium-term-loan" element={<NewStaffMediumTermLoan/>}></Route>
         <Route path="/staff-medium-term-loan-transaction" element={<TransactionStaffMedTermLoan/>}></Route>


        {/* Admin Deposit */}
        <Route path="/term-deposit/new" element={<TermDeposit/>}></Route>
        <Route path="/term-deposit/renew" element={<TermDepositRenew/>}></Route>
        <Route path="/term-deposit/view" element={<ViewTermDeposit/>}></Route>
        <Route path="/term-deposit/close" element={<TermDepositClose/>}></Route>

        {/* Ek Laksha Yojana */}
        <Route path="/ek-laksha/new" element={<EklakshaDeposit/>}></Route>
        <Route path="/ek-laksha/renew" element={<EklakshaDepositRenew/>}></Route>
        <Route path="/ek-laksha-yojana/view" element={<EklakshaDepositView/>}></Route>
        
        {/* Dam Duppat Yojana */}
        <Route path="/dam-duppat/new" element={<DamDuppatDeposit/>}></Route>
        <Route path="/dam-duppat/renew" element={<DamDuppatRenew/>}></Route>
        <Route path="/dam-duppat-yojana/view" element={<ViewDamDuppat/>}></Route>

        {/* Lakhpati Yojana */}
        <Route path="/lakhpati-deposit/view" element={<LakhpatiView/>}></Route>
        <Route path="/lakhpati/new" element={<LakhpatiYojana/>}></Route>

        {/* Cash Certificate */}
        <Route path="/cash-certificate/new" element={<CashCertificateDeposit />} />
        <Route path="/cash-certificate/renew" element={<CashCertificateDepositRenew/>}></Route>
        <Route path="/cash-certificate-deposit/view" element={<ViewCashCertificate/>}></Route>

        {/* cumulative deposit */}
        <Route path="/cumulative-receipt-payment-entries" element={<Cumulativepaymententries/>}></Route>

        {/* Divident */}
        <Route path="/divident-payment" element={<DividentInterest/>}></Route>



        {/* Recurring Deposit */}
        <Route path="/recurring-deposit/new" element={<RecurringDeposit/>}></Route>
        <Route path="/recurring-deposit/payment" element={<RdTransaction/>}></Route>
        <Route path="/recurring-deposit/view" element={<ViewRd/>}></Route>

        {/* Reports */}
        <Route path="/I-form" element={<IForm/>}></Route>
        <Route path="/J-form" element={<JForm/>}></Route>

        {/* View Member  */}
        <Route path="/view-member-details" element={<ViewMemberDetails toChangeMemberId={toChangeMemberId}/>} />
         <Route path="/member-transactions-entries" element={<MemberTransactionsEntry memberIdNo={memberIdNo}/>}></Route>
         <Route path="/member-loan-transactions-entries" element={<MemberLoanTransactionsEntries  memberIdNo={memberIdNo}/>}></Route>

          {/* Print Passbook */}
          <Route path="/print-passbook" element={<PrintPassbook/>}></Route>


          {/* Update */}
          <Route path="/kyc-update" element={<KYCUpdation/>}></Route>
         <Route path="/bank-details-update" element={<BankDetailsUpdate/>} ></Route>
         <Route path="/member-settlement-account-receipt" element={<MemberSettlementAccountReceipt />}></Route>
         <Route path="/member-saving-deposit-receipt-payment-entry" element={<MemberSavingDepositReceiptEntry />}></Route>

         {/* Journel */}
         <Route path="/journel-entries" element={<JournelEntries/>}></Route>



         {/* Member Dashboard */}
         <Route path="/profile" element={<Profile/>}></Route>
         <Route path="/recurring-transaction" element={<MemberRecurriing/>}></Route>
         <Route path="/cash-certificate-transaction" element={<MemberCashCertificate/>}></Route>
         <Route path="/dam-duppat-yojana-transaction" element={<MemberDamDuppat/>}></Route>
         <Route path="/term-deposit-transaction" element={<FixedDeposit/>}></Route>
         <Route path="/ek-laksha-yojana-transaction" element={<MemberEklaksha/>}></Route>
         <Route path="/lakhpati-yojana-transaction" element={<MemberLakhpati/>}></Route>
         <Route path="/med-term-loan-transaction" element={<MemberMedTerm/>}></Route>
         <Route path="/emergency-loan-transaction" element={<MemberEmergencyLoan/>}></Route>

         

         <Route path="/add-new-operator" element={<AddNewOp/>}></Route>
         <Route path="/update-crendentials" element={<AdminUpdateCredentials/>}></Route>

         <Route path="/all-loan-transaction" element={<AllLoanTransaction/>}></Route>
         <Route path="/all-neft-transaction" element={<NeftTransaction/>}></Route>

         <Route path="/deposit-auto-renewal" element={<DepositAutoRenewal/>}></Route>
         <Route path="/voucher-printing" element={<VoucherPrinting/>}></Route>


        {/* Forgot Password */}
        <Route path="/set-new-password" element={<ForgotPassword3 />} />
        <Route path="/forgot-password" element={<ForgotPassword forSettingForgotPasswordEmail={forSettingForgotPasswordEmail}/>} />
        <Route path="/otp-verfication" element={<ForgotPassword2 forgotPasswordEmail={forgotPasswordEmail}/>} />



        
         <Route path="/under-development" element={<UnderDevelopment/>}></Route>






        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
