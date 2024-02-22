import React from "react";
import { useState, useEffect } from "react";
import patient from "../component/patient.css";
import { Link } from "react-router-dom";
import { payment } from "../services/Auth.services";

import "react-toastify/dist/ReactToastify.css";
import { appoinmentList } from "../services/Auth.services";
import { addAppoinment } from "../services/Auth.services";

export const Patient = () => {
  const [show, setshow] = useState([]);
  const [fees,setFees]=useState(1500)
  const [input, setInput] = useState({
    PatientName: "",
    contact: "0",
    email: "",
    Date: "",
    symptoms: "",
  });

  useEffect(() => {
    const test = async () => {
      const response = await appoinmentList();
      //  console.log(response.data.result)
      setshow(response.data.result);
    };
    test();
  }, []);

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setInput((preveious) => ({
      ...preveious,
      [name]: value,
    }));
  };
  // console.log(input);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await addAppoinment(
      input.PatientName,
      input.contact,
      input.email,
      input.Date,
      input.symptoms
    );

    const payResponse = await payment(input.PatientName,fees);
    if(payResponse){
      window.location.href=payResponse.data.url
    }

  };

  return (
    <>
    <div className="navbar">
          <div className="logo"><img
          src="https://thumbs.dreamstime.com/b/hospital-logo-template-hospital-logo-template-117487677.jpg"
          alt=""
          width="50px"
          height="50px"
        /></div>
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/patient">Doctors</Link>
              <img
              src="https://img.freepik.com/free-psd/smiley-nurse-having-stethoscope_23-2148444830.jpg?w=740&t=st=1663670128~exp=1663670728~hmac=2314b8592466f61cfb4457fde5b7504a1c6c5af94cc5ed39fc28b36866d9fb07"
              alt=""
              width="70px"
              height="70px"
            />
           </ul>
        </div>
      <div class="container mt-4 p-4">
        <div class="row">
          <div class="col-md-6">
            <h2 class="text-center my-4">Book Your appoinment</h2>
          </div>
          <div class="col-md-6 text-end">
          <h2 class="text-center my-4">Fees : ₹{fees}</h2>
        </div>
        </div>
        <div />
        <form>
          <div class="form-group row">
            <label class="col-sm-4 col-lg-4">Patient Name</label>
            <div class="col-sm-8 col-lg-8">

              <input
                type="text"
                id="patient-name"
                class="form-control"
                placeholder="Name"
                name="PatientName"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-4 col-lg-4">Contact</label>
            <div class="col-sm-8 col-lg-8">
              <input
                type="tel"
                id="contact"
                class="form-control"
                placeholder="123"
                name="contact"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-lg-4">Email</label>
            <div class="col-sm-8 col-lg-8">
              <input
                type="tel"
                id="email"
                class="form-control"
               
                name="email"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>
          </div>


          <div class="form-group row">
            <label class="col-sm-4 col-lg-4">Date</label>
            <div class="col-sm-8 col-lg-8">
              <input
                type="date"
                id="date"
                class="form-control"
                name="Date"
                onChange={(e) => onchangeHandler(e)}
              />
            </div>
          </div>

          

          <div class="form-group row">
            <label class="col-sm-4 col-lg-4">Symptoms</label>
            <div class="col-sm-8 col-lg-8">
              <textarea
                id="symptoms"
                class="form-control"
                name="symptoms"
                onChange={(e) => onchangeHandler(e)}
              ></textarea>
            </div>
          </div>

          <div class="form-group row justify-content-end">
            <div class="col-sm-5">
              <button type="submit" class="btn btn-form" onClick={handleSubmit}>
                Confirm & Pay
              </button>
            </div>
          </div>
        </form>
        <div />
      </div>
    </>
  );
};
