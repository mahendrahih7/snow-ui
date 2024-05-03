import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerUpdatePassword } from "../../redux/features/sellers/sellerLoginSlice";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordDetail, setPasswordDetail] = useState({
    currentPassword: "",
    newPassword: "",
  });
  console.log(passwordDetail, "passwordDetail");
  const [error, setError] = useState({});
  console.log(error, "error");

  // const { loading } = useSelector((state) => state.loginseller);

  const validateForm = () => {
    let isValid = true;
    const newError = {};
    if (!passwordDetail.currentPassword) {
      isValid = false;
      newError.currentPassword = "Current password is required";
    } else if (passwordDetail.currentPassword.length < 6) {
      isValid = false;
      newError.currentPassword =
        "Current password must be at least 6 characters";
    } else {
      newError.currentPassword = "";
    }

    if (!passwordDetail.newPassword) {
      isValid = false;
      newError.newPassword = "New password is required";
    } else if (passwordDetail.newPassword.length < 6) {
      isValid = false;
      newError.newPassword = "New password must be at least 6 characters";
    } else {
      newError.newPassword = "";
    }
    setError(newError);
    return isValid;
  };

  const handlePassChange = (e) => {
    setPasswordDetail({ ...passwordDetail, [e.target.name]: e.target.value });
    if (passwordDetail.currentPassword) {
      setError({ ...error, currentPassword: "" });
    }
    if (passwordDetail.newPassword) {
      setError({ ...error, newPassword: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwordDetail, "passwordDetail");
    if (validateForm()) {
      dispatch(sellerUpdatePassword(passwordDetail))
        .then(() => {
          navigate("/seller-login");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <section className="sign_up">
        <div className="sign_up_otr">
          <div className="sign_up_innr">
            <div className="sgn_hdr text-center">
              <h3>Upadate Password</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="frm_innr">
                <div className="inpt">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={passwordDetail.currentPassword}
                    onChange={(e) => handlePassChange(e)}
                  />
                </div>
                {error && <p className="error">{error.currentPassword}</p>}
                <div className="inpt">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwordDetail.newPassword}
                    onChange={(e) => handlePassChange(e)}
                  />
                </div>
                {error && <p className="error">{error.newPassword}</p>}
                <div className="">
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatePassword;
