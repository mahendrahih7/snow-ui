import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sellerForgotPassword } from "../../redux/features/sellers/sellerLoginSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newError = {};
    if (!email) {
      isValid = false;
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newError.email = "Invalid email";
    } else {
      newError.email = "";
    }
    setError(newError);
    return isValid;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError({});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, "email");
    if (validateForm()) {
      dispatch(sellerForgotPassword(email));
    }
  };

  return (
    <>
      <section className="sign_up">
        <div className="sign_up_otr">
          <div className="sign_up_innr">
            <div className="sgn_hdr text-center">
              <h3>Forgot Password</h3>
              {/* <p>Your Social Campaigns</p> */}
            </div>
            {/* <div className="socials">
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
            </div> */}

            <form onSubmit={submitHandler}>
              <div className="frm_innr">
                <div className="inpt">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {error && <p className="error">{error.email}</p>}
                {/* <div className="inpt">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleRegChange(e)}
                  />
                </div>
                {error && <p className="error">{error.password}</p>} */}
                <div className="">
                  <input
                    type="submit"
                    // value={loading ? "Submitting.." : "Submit"}
                    value="Reset Password"
                  />
                </div>
                {/* <div className="forget-password">
                  <a href="_blank">
                    <h2>
                      <u>Forgot Password?</u>
                    </h2>
                  </a>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
