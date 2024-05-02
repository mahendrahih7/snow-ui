import React from 'react'

const Verification = () => {
    return (
        <section className="sign_up">
            <div className="sign_up_otr">
                <div className="sign_up_innr vryfctn text-center">
                    <div className="icn">
                        <img src={require('../../assets/images/vryfctn_icn.png')} />
                    </div>
                    <div className="sgn_hdr v_hdr text-center">
                        <h3>Two Step Verification</h3>
                        <p>
                            Enter the verification code we <br />
                            sent to
                        </p>
                    </div>
                    <div className="p_num text-center">
                        <h5>+852 19850622</h5>
                        <p>Type your 4 digit security code</p>
                    </div>
                    <form>
                        <div className="v_frm_innr">
                            <div className="v_inputs">
                                <input type="number" data-maxlength={1} />
                                <input type="number" data-maxlength={1} />
                                <input type="number" data-maxlength={1} />
                                <input type="number" data-maxlength={1} />
                            </div>
                            <button clas="cmn_btn">Submit</button>
                        </div>
                    </form>
                    <div className="btm_snp_lnk text-center">
                        <a href="javascript:void(0);">Didn’t get the code ? </a>
                        <a href="javascript:void(0);">Resend </a>
                        <span>or</span>
                        <a href="javascript:void(0);">Call Us </a>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Verification