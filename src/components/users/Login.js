import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const { email, password } = login;

  const validateFormLogin = () => {
    let isValid = true;
    const newError = {};
    if (!login.email) {
      isValid = false;
      newError.email = "Invalid email format";
    } else if (!/\S+@\S+\.\S+/.test(login.email)) {
      isValid = false;
      newError.email = "Invalid email format";
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
  };

  const handleRegSubmission = (e) => {
    e.preventDefault();
    //console.log(login, "login")
    if (validateFormLogin()) {
      dispatch(loginUser(login));
      setLogin({
        email: "",
        password: "",
      });
    }
  };

  return (
    <section className="sign_up">
      <div className="sign_up_otr">
        <div className="sign_up_innr">
          <div className="sgn_hdr text-center">
            <h3>Log In</h3>
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
              <div className="button">
                <button type="submit"> Submit </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
