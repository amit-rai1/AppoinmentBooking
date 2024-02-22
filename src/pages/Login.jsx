import React from "react";
import { useState, useEffect } from "react";
import "../assets/css/style.min.css";
import { Link } from "react-router-dom";
import { multiLogin } from "../services/Auth.services";
import { toast, useToast } from "react-toastify";
import { GoogleLogin } from "react-google-login";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userlogin } from "../Slice/AuthSlice";
import ReactFacebookLogin from "react-facebook-login";


export const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setInput({ ...input, showPassword: !input.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setInput({ ...input, [prop]: event.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await multiLogin(input);
      console.log(response.data.result.role, "response");
      if (response.data.result.role === 0) {
        // dispatch(userlogin(response.data));
        toast.success("user login successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/patientdashboard");
      } else {
      }
      if (response.data.result.role === 1) {
        // dispatch(userlogin(response.result.data));
        toast.success("user login successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/doctordashboard");
        console.log("response");
      }
    } catch (e) {
      console.warn(e);
    }
  };
  console.log(input);
  const onResponse = (resp) => {
    console.log(resp);
  };
  const setResponse = (resp) => {
    console.log(resp);
  };

  
  return (
    <>
      <section class="login_section">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-5">
              <img
                src="../../assets/images/login.png"
                class="img-fluid login_icon"
                alt=""
              />
              <h3>Login</h3>
              <div class="form_box">
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                  <div class="form-group">
                    <label for="" class="form-label">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="text"
                      class="form-control"
                      placeholder="name@gmail.com"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label for="" class="form-label">
                      Password
                    </label>
                    <div class="input_box">
                      <input
                        name="password"
                        type={input.showPassword ? "text" : "password"}
                        onChange={handlePasswordChange("password")}
                        value={input.password}
                        class="form-control"
                        placeholder="*********"
                        onChange={handleChange}
                      />
                      <i
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {input.showPassword ? (
                          <i class="fa-solid fa-eye"></i>
                        ) : (
                          <i class="fa-solid fa-eye-slash"></i>
                        )}
                      </i>
                    </div>
                  </div>
                  <p>
                    <a href="#">Forgot Password?</a>
                  </p>

                  <button class="login_btn">Login</button>
                </form>
              </div>
              <br />

              <div class="d-flex justify-content-around">
                <ReactFacebookLogin
                  appId="1093898651224874" // we created this, remember?
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={onResponse}
                  onFailure={onResponse}
                  cssClass="btnFacebook"
                />
              </div>
              <br />
              <div class="d-flex justify-content-around">
                <GoogleLogin
                  clientId="754721961522-uq1jscjfq90o34k5vgqa8l4mqrt71f39.apps.googleusercontent.com" // We created this earlier, remember?
                  buttonText="Login with Google"
                  onSuccess={setResponse}
                  onFailure={setResponse}
                  cssClas="btnGoogle"
                />
              </div>
            </div>

            <div class="col-md-5">
              <div class="rBox">
                <img
                  src="../../assets/images/login_bg.png"
                  class="img-fluid login_bg"
                  alt=""
                />
                <img
                  src="../../assets/images/lgn.png"
                  class="img-fluid"
                  alt=""
                />
                <h2>
                  online <span>appoinment</span>
                </h2>
                <p>
                  A Communication <span>Lifeline</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
