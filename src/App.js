import "./App.css";
import AssesmentOP from "./Page/AssesmentOP";
import Collection from "./Page/Collection";
import Dashboard from "./Page/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TitleTaxProp from "./Page/TitleTaxProp";
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
import Loaninterest from "./Page/Loaninterest";
import Recurring from "./MemberPages/Recurring";
import RecurringDeposit from "./Page/RecurringDeposit";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Home" element={<Dashboard />} />
          <Route path="/assesment-of-property" element={<AssesmentOP />} />
          <Route path="/collection" element={<Collection />} />
          <Route
            path="/title-transfer-of-property"
            element={<TitleTaxProp />}
          />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
