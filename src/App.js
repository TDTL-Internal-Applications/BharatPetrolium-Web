import "./App.css";
import AssesmentOP from "./Page/AssesmentOP";
import Collection from "./Page/Collection";
import Dashboard from "./Page/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TitleTaxProp from "./Page/TitleTaxProp";
import LoginPage from "./Page/LoginPage";
import MemberReg1 from "./Page/MemberReg1";
import RegisterMembers from "./Page/RegisterMembers";
import ForgotPassword from "./Page/ForgotPassword";
import EmployeeReg from "./Page/EmployeeReg";
import RegisterEmployees from "./Page/RegisterEmployees";


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
          <Route path="/register-members" element={<RegisterMembers/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path ="/employee-registration" element={<EmployeeReg/>}></Route>
          <Route path="/register-employees" element={<RegisterEmployees/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
