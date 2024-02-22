import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { userlogout } from "../Slice/AuthSlice";
import { toast, useToast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
export default function Nav(){
  const dispatch = useDispatch();
  
  let navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("users");

    localStorage.clear();

    dispatch(userlogout());

    toast.success(
      "Logout Successfully",
      { position: toast.POSITION.TOP_RIGHT },

      { autoClose: 1000 }
    );

    navigate("/login");
  };

  return(
        <div className="navbar">
          <div className="logo"><img
          src="https://thumbs.dreamstime.com/b/hospital-logo-template-hospital-logo-template-117487677.jpg"
          alt=""
          width="50px"
          height="50px"
        /></div>
           <ul className="nav-links">
           <div>
           <button onClick={logoutHandler} className="">Logout</button>
           </div>
              <Link to="/about">About</Link>
              <Link to="/patient">booking</Link>
              <img
              src="https://img.freepik.com/free-psd/smiley-nurse-having-stethoscope_23-2148444830.jpg?w=740&t=st=1663670128~exp=1663670728~hmac=2314b8592466f61cfb4457fde5b7504a1c6c5af94cc5ed39fc28b36866d9fb07"
              alt=""
              width="70px"
              height="70px"
            />
           </ul>
        </div>
  );

}