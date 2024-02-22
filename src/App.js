
import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Login } from "./pages/Login";
import {Doctordashboard} from './Dashboard/Doctordashboard'
import {Patientdashboard} from './Dashboard/Patientdashboard'
import {Patient} from './component/Patient'
import {Doctor} from './component/Doctor'
import {Edit} from '../src/component/Edit'
function App() {
  return (
    <div className="App">
    <ToastContainer />
<Routes>
 <Route path="/" element={<Login/>}/>
 <Route path="/login" element={<Login/>}/>
 
 <Route path="/patientdashboard" element={<Patientdashboard/>}/>
 <Route path="/doctordashboard" element={<Doctordashboard/>}/>
 <Route path="/Patient" element={<Patient/>}/>
 <Route path="Doctor" element={<Doctor/>}/>
 <Route path="edit/:id" element={<Edit/>}/>

</Routes>
 
    </div>
  );
}

export default App;
