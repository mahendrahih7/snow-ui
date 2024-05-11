import React, { useEffect, useRef, useState } from "react";
import img from "../../assets/images/vryfctn_icn.png";
import {
  loginSeller,
  sellerLoginWithOtp,
} from "../../redux/features/sellers/sellerLoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpTimer from "otp-timer";
import { Bounce, toast } from "react-toastify";
// import Cookies from "js-cookie";

const Otp = ({ length = 4, onOtpSubmit = () => {}, email, password }) => {
  console.log(email, password, "999");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [error, setError] = useState({});
  const inputRefs = useRef([]);
  console.log(otp, "otp");
  const { loading, withOtp } = useSelector((state) => state.loginSeller);
  console.log(loading, "otp_loading");
  console.log(withOtp, "withOtp");

  // console.log(Cookies.get(), "Hello..");

  const validateForm = () => {
    let isValid = true;
    const newError = {};
    console.log(otp, "otp996");
    console.log(new Array(length).fill(""), "666");
    if (otp.includes("")) {
      isValid = false;
      newError.otp = "Please Enter OTP";
    } else {
      newError.otp = "";
    }
    setError(newError);
    return isValid;
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    //allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //submit trgger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    //Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    //optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").slice(0, otp.length);
    const newOtp = pastedText
      .split("")
      .map((char) => (/^\d$/.test(char) ? char : ""));
    setOtp(newOtp);
    // Focus on first input after pasting
    inputRefs.current[0].focus();
  };

  const submitCredentials = (e) => {
    e.preventDefault();
    // console.log(otp, "otpInSub");
    const OTP = Number(otp.join(""));
    // console.log(OTP, typeof OTP, "333");
    const credentials = {
      email: email,
      password: password,
      otp: OTP,
    };
    // console.log(credentials, "credentials");
    // console.log(validateForm(), "validateForm");
    if (validateForm()) {
      dispatch(sellerLoginWithOtp(credentials));
      // console.log("koushik");
      // const cookie = document;
      // console.log(cookie, "hello world", "documentcookie");
    } else {
      toast.error("Please Enter OTP", {
        className: "toast-message",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: 'dark',
        transition: Bounce,
      });
    }
    setOtp(new Array(length).fill(""));
  };

  const resendOtp = () => {
    console.log("resend otp", "otp");
    const OTP = Number(otp.join(""));
    console.log(OTP, typeof OTP, "333");
    const credentials = {
      email: email,
      password: password,
    };
    console.log(credentials, "credentials");
    dispatch(loginSeller(credentials));
  };

  if (withOtp) {
    console.log("withOtp", "222");
    navigate("/");
  }
  return (
    <>
      <section className="sign_up">
        <div className="sign_up_otr">
          <div className="sign_up_innr vryfctn text-center">
            <div className="icn">
              <img src={img} />
            </div>
            <div className="sgn_hdr v_hdr text-center">
              <h3>Two Step Verification</h3>
              <p>
                Enter the verification code we <br />
                sent to
              </p>
            </div>
            <div className="p_num text-center">
              <h5>{email}</h5>
              <p>Type your 4 digit security code</p>
            </div>
            <form onSubmit={(e) => submitCredentials(e)}>
              <div className="v_frm_innr">
                <div className="v_inputs">
                  {otp.map((value, index) => {
                    return (
                      <input
                        key={index}
                        type="text"
                        ref={(input) => (inputRefs.current[index] = input)}
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={(e) => handlePaste(e)}
                        data-maxlength={1}
                      />
                    );
                  })}

                  {/* <input
                    type="number"
                    data-maxlength={1}
                    onChange={(e) => setOtp(otp + e.target.value)}
                  />
                  <input
                    type="number"
                    data-maxlength={1}
                    onChange={(e) => setOtp(otp + e.target.value)}
                  />
                  <input
                    type="number"
                    data-maxlength={1}
                    onChange={(e) => setOtp(otp + e.target.value)}
                  /> */}
                </div>
                <button className="cmn_btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <div className="btm_snp_lnk text-center">
              <a href="javascript:void(0);">Didn’t get the code ? </a>
              {/* <a href="javascript:void(0);" onClick={resendOtp}>
                Resend{" "}
              </a> */}
              <OtpTimer
                minutes={1}
                seconds={1}
                text="Resend OTP in:"
                ButtonText="Resend"
                resend={resendOtp}
                buttonColor="blue"
                background="white"
              />
              {/* <span>or</span>
              <a href="javascript:void(0);">Call Us </a> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Otp;
