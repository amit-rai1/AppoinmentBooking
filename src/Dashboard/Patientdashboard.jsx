import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../pages/Sidebar";
import Nav from "../pages/Nav";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import { doctorList } from "../services/Auth.services";
import { Link } from "react-router-dom";

export const Patientdashboard = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState([]);

  useEffect(() => {
    const func = async () => {
      const res = await doctorList();
      setShow(res.data.result);
    };

    func();
    doctorList();
  }, []);

  console.log(show[0]);
  return (
    <>
      <div>
        <Nav />
      </div>
      <marquee bgcolor = "cyan"  vspace = "20" hspace = "20" font-size="10em" text-color="red">Make a appoinment!</marquee>
      <div className="container mt-4">
        <div className="row"></div>
        <div>
          <table className="table table-info table-striped">
            <thead>
              <tr>
                <th>fullname</th>
                <th>phone</th>
                <th>address</th>
                <th>email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {show.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.fullname}</td>
                    <td>{data.phone}</td>
                    <td>{data.address}</td>
                    <td>{data.email}</td>
                 
                    <td>
                      {
                 
                        <Button variant="dark"
                        ><Link to ="/patient">
                          Make appoinment
                          </Link>
                        </Button>
                   
                      }
                     
                    </td>
                   
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
     
    </>
  );
};
