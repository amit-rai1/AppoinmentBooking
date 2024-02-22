import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { updatePatient, patientById } from "../services/Auth.services";
import { useNavigate } from "react-router-dom";
export const Edit = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [input, setInput] = useState({
    PatientName: "",
    contact: "0",
    email: "",
    Date: "",
    symptoms: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const test = async (id) => {
      const response = await patientById(id);
      setInput(() => ({
        PatientName: response.data.result.PatientName,
        contact: response.data.result.contact,
        email: response.data.result.email,
        symptoms: response.data.result.symptoms,
      }));
     
    };
    test(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateResponse = await updatePatient(input, id);
    if (updateResponse.data.status) {
      navigate("/doctordashboard");
    }
  };

  return (
    <>
      <div class="container mt-4 p-4">
        <div class="row">
          <div class="col-md-6">
            <h2 class="text-center my-4">update Your appoinment</h2>
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
                value={input.PatientName}
                onChange={(e) => handleInput(e)}
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
                value={input.contact}
                onChange={(e) => handleInput(e)}
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
                value={input.email}
                onChange={(e) => handleInput(e)}
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
                value={input.Date}
                onChange={(e) => handleInput(e)}
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
                value={input.symptoms}
                onChange={(e) => handleInput(e)}
              ></textarea>
            </div>
          </div>

          <div class="form-group row justify-content-end">
            <div class="col-sm-5">
              <button type="submit" class="btn btn-form" onClick={handleSubmit}>
                update
              </button>
            </div>
          </div>
        </form>
        <div />
      </div>
    </>
  );
};
