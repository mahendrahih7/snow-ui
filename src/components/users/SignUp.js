import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/features/regSlice';
import { faEye, faEllipsisVertical, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUp = () => {
    const [error, setError] = useState({})
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        countryCode: "",
        phoneNumber: "",
        password: ""
    })
    const { firstName, lastName, userName, email, countryCode, phoneNumber, password } = registration
    const dispatch = useDispatch()
    const handleRegChange = (e) => {
        //console.log(e.target.value, "e")
        setRegistration({ ...registration, [e.target.name]: e.target.value })
    }

    const validateRegForm = () => {
        let isValid = true
        const newError = {}
        if (!registration.email) {
            isValid = false;
            newError.email = "Invalid email format";
        } else if (!/\S+@\S+\.\S+/.test(registration.email)) {
            isValid = false;
            newError.email = "Invalid email format";
        } else {
            newError.email = "";
        }
        if (!registration.password) {
            isValid = false;
            newError.password = "Password is required";
        } else if (registration.password.length < 6) {
            isValid = false;
            newError.password = "Password must be at least 6 characters";
        } else {
            newError.password = "";
        }
        if (registration.phoneNumber.length !== 10) {
            isValid = false;
            newError.phoneNumber = "Phone No is invalid";
        } else {
            newError.phoneNumber = ""
        }
        setError(newError)
        return isValid;
    }

    const handleRegSubmission = (e) => {
        e.preventDefault()
        //console.log(registration, "reg")
        if (validateRegForm()) {
            dispatch(signUpUser(registration))
            registration.firstName = "";
            registration.lastName = "";
            registration.userName = "";
            registration.email = "";
            registration.countryCode = "";
            registration.phoneNumber = "";
            registration.password = ""

        }
    }


    return (
        <section className="sign_up reg">
            <div className="sign_up_otr">
                <div className="sign_up_innr">
                    <div className="sgn_hdr text-center">
                        <h3>Sign Up</h3>
                        <p>Your Social Campaigns</p>
                    </div>
                    <div className="socials">
                        <div className="apple">
                            <div className="a_img">
                                <img src={require('../../assets/images/aple.png')} />
                            </div>
                            <div className="a_txt">
                                <p>Sign in with Apple</p>
                            </div>
                        </div>
                        <div className="ggle">
                            <div className="a_img">
                                <img src={require('../../assets/images/ggle.png')} />
                            </div>
                            <div className="a_txt">
                                <p>Sign in with Google</p>
                            </div>
                        </div>
                    </div>
                    <div className="or_wth text-center">
                        <h6>Or with Email</h6>
                    </div>
                    <form onSubmit={handleRegSubmission}>
                        <div className="frm_innr">
                            <div className="inpt">
                                <input type="text" name='firstName' placeholder="First Name" value={firstName} onChange={(e) => handleRegChange(e)} />
                            </div>
                            <div className="inpt">
                                <input type="text" name='lastName' placeholder="Last Name" value={lastName} onChange={(e) => handleRegChange(e)} />
                            </div>
                            <div className="inpt">
                                <input type="text" name='userName' placeholder="User Name" value={userName} onChange={(e) => handleRegChange(e)} />
                            </div>
                            <div className="inpt">
                                <input type="email" name='email' placeholder="Email" value={email} onChange={(e) => handleRegChange(e)} />
                            </div>
                            {error && <p className='error'>{error.email}</p>}
                            <div className="inpt">
                                <input type="phone" name='countryCode' placeholder="Country Code" value={countryCode} onChange={(e) => handleRegChange(e)} />
                                <input type="phone" name='phoneNumber' placeholder="Phone No" value={phoneNumber} onChange={(e) => handleRegChange(e)} />
                            </div>
                            {error && <p className='error'>{error.phoneNumber}</p>}
                            <div className="inpt">
                                <input type="password" name='password' placeholder="Password" value={password} onChange={(e) => handleRegChange(e)} />
                            </div>
                            {error && <p className='error'>{error.password}</p>}
                            {/* <div className="inpt_icn">
                                    <span className="pswrd_show">
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                </div> */}
                            {/* <div className="pass">
                                <h6>
                                    Use 8 or more characters with a mix <br />
                                    of letter, number &amp; symbols.
                                </h6>
                            </div> */}
                            {/* <div className="inpt">
                                <input type="password" name='repeatPassword' placeholder="Repeat Password" value={repeatPassword} onChange={(e) => handleRegChange(e)} />
                            </div> */}
                            <div className="checkbox">
                                <input type="checkbox" placeholder="Name" defaultValue="" />
                                <label style={{ marginLeft: "5px" }}>
                                    I Accept the <span>Terms</span>
                                </label>
                            </div>
                            <div className="button">
                                <button type='submit'> Submit </button>
                            </div>
                        </div>
                    </form>
                    <div className="btm_snp_lnk text-center">
                        <a href="javascript:void(0);">
                            Aready have an account?<span>Sign In</span>
                        </a>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default SignUp