import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSeller } from "../../redux/features/sellers/sellerLoginSlice";
import Otp from "./Otp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../redux/features/loginSlice";

const SellerLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const { email, password } = login;
  const dispatch = useDispatch();

  const { loading, otpStatus } = useSelector((state) => state.loginSeller);
  console.log(loading, "loading");
  console.log(otpStatus, "otpStatus");

  const validateFormLogin = () => {
    let isValid = true;
    const newError = {};
    if (!login.email) {
      isValid = false;
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(login.email)) {
      isValid = false;
      newError.email = "Invalid email";
    } else {
      newError.email = "";
    }
    if (!login.password) {
      isValid = false;
      newError.password = "Password is required";
    } else if (login.password.length < 6) {
      isValid = false;
      newError.password = "Password must be at least 6 characters";
    } else {
      newError.password = "";
    }
    setError(newError);
    return isValid;
  };

  const handleRegChange = (e) => {
    //console.log(e.target.value, "e")
    setLogin({ ...login, [e.target.name]: e.target.value });
    if (login.email) {
      setError({ ...error, email: "" });
    }
    if (login.password) {
      setError({ ...error, password: "" });
    }
  };

  const handleRegSubmission = (e) => {
    e.preventDefault();
    //console.log(login, "login")
    if (validateFormLogin()) {
      console.log(login, "login-seller");
      dispatch(loginSeller(login));
      //   dispatch(loginUser(login));
      // setLogin({
      //   email: "",
      //   password: "",
      // });
    }
  };

  return (
    <>
      {otpStatus ? (
        <>
          <Otp email={email} password={password} />
        </>
      ) : (
        <>
          <section className="sign_up">
            <div className="sign_up_otr">
              <div className="sign_up_innr">
                <div className="sgn_hdr text-center">
                  <h3>Log In Seller</h3>
                  <p>Your Social Campaigns</p>
                </div>
                <div className="socials">
                  <div className="apple">
                    <div className="a_img">
                      <img src={require("../../assets/images/aple.png")} />
                    </div>
                    <div className="a_txt">
                      <p>Sign in with Apple</p>
                    </div>
                  </div>
                  <div className="ggle">
                    <div className="a_img">
                      <img src={require("../../assets/images/ggle.png")} />
                    </div>
                    <div className="a_txt">
                      <p>Sign in with Google</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleRegSubmission}>
                  <div className="frm_innr">
                    <div className="inpt">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleRegChange(e)}
                      />
                    </div>
                    {error && <p className="error">{error.email}</p>}
                    <div className="inpt">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => handleRegChange(e)}
                      />
                    </div>
                    {error && <p className="error">{error.password}</p>}
                    <div className="">
                      <input
                        type="submit"
                        value={loading ? "Submitting.." : "Submit"}
                      />
                    </div>
                    <div className="forget-password">
                      <a
                        href="/forgot-password"
                        // style={{ textDecoration: "underline" }}
                        // onClick={() => navigate("/forgot-password")}
                      >
                        <h2>
                          <u>Forgot Password?</u>
                        </h2>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SellerLogin;
