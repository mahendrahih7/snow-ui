import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SellerResetPassword } from "../../redux/features/sellers/sellerLoginSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token, "token");
  // const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const { loading, resetPassword } = useSelector((state) => state.loginSeller);

  const validateForm = () => {
    let isValid = true;
    const newError = {};
    if (!password.newPassword) {
      isValid = false;
      newError.newPassword = "Password is required";
    } else if (password.newPassword.length < 6) {
      isValid = false;
      newError.newPassword = "Password must be at least 6 characters";
    } else {
      newError.newPassword = "";
    }
    // if (!password.confirmPassword) {
    //   isValid = false;
    //   newError.confirmPassword = "Password is required";
    // } else if (password.confirmPassword.length < 6) {
    //   isValid = false;
    //   newError.confirmPassword = "Password must be at least 6 characters";
    // } else {
    //   newError.confirmPassword = "";
    // }
    if (password.newPassword !== password.confirmPassword) {
      isValid = false;
      newError.confirmPassword = "Password mismatch";
    } else {
      newError.confirmPassword = "";
    }
    setError(newError);
    return isValid;
  };

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    if (password.newPassword) {
      setError({ ...error, newPassword: "" });
    }
    if (password.confirmPassword) {
      setError({ ...error, confirmPassword: "" });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(
        SellerResetPassword({ newPassword: password.newPassword, token: token })
      );
    }
  };

  if (resetPassword) {
    navigate("/seller-login");
  }

  return (
    <>
      <section className="sign_up">
        <div className="sign_up_otr">
          <div className="sign_up_innr">
            <div className="sgn_hdr text-center">
              <h3>Reset Password</h3>
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
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={password.newPassword}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {error && <p className="error">{error.newPassword}</p>}
                <div className="inpt">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={password.confirmPassword}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                {error && <p className="error">{error.confirmPassword}</p>}
                <div className="">
                  <input
                    type="submit"
                    // value={loading ? "Submitting.." : "Submit"}
                    value="Submit"
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

export default ResetPassword;
