import RightContainer from "../common/RightContainer";
import { sendOtp, verifyOtp } from "../../store/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../HOC/Loading";

// import { useSelector } from 'react-redux'
function Login() {
    let { refer_id } = useParams();
    const authenticated = useSelector(
        (state) => {
        //  console.warn('state',state);
         return   state.user.details.isAuthenticated
        }
            );
    const navigate = useNavigate();
    const [resendOtp, setResendOtp] = useState(false);
    let [seconds, setSeconds] = useState(30);
    const [intrvl, setIntrvl] = useState();
    useEffect(() => {
        if (refer_id) {
            navigate("/login/:" + refer_id);
            // console.log('refer-id----', refer_id);
        }
        if (authenticated && authenticated !== "loading") {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, [authenticated]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [referCode, setReferCode] = useState(refer_id);
    const [otp, setOtp] = useState("");
    const [otpVisible, setOtpVisible] = useState(false);
    const dispatch = useDispatch();
    const handlePhoneInput = (e) => {
        setPhoneNumber(e.target.value);
    };
    const handleOtpInput = (e) => {
        setOtp(e.target.value);
    };
    const handleLogin = () => {
        setIntrvl(
            setInterval(() => {
                if (seconds > 0) {
                    setSeconds(--seconds);
                }
                if (seconds === 0) {
                    clearInterval(intrvl);
                    setResendOtp(true);
                }
            }, 1000)
        );
        if (!otpVisible) {
            dispatch(
                sendOtp(
                    { phone_no: phoneNumber, refer_code: referCode },
                    () => {
                        setOtpVisible(true);
                    }
                )
            );
        } else {
            dispatch(verifyOtp({ phone_no: phoneNumber, otp_no: otp }));
        }
    };
    const resendOtpMsg = () => {
        setIntrvl(
            setInterval(() => {
                if (seconds > 0) {
                    setSeconds(--seconds);
                }
                if (seconds === 0) {
                    clearInterval(intrvl);
                    setResendOtp(true);
                }
            }, 1000)
        );
        dispatch(
            sendOtp({ phone_no: phoneNumber, refer_code: referCode }, () => {
                setOtpVisible(true);
            })
        );
    };
    // const games = useSelector(state => state.games)
    return (
        <>
            <div className="leftContainer">
                <div className="main-area">
                    <div style={{ overflowY: "hidden", height: "100vh" }}>
                        <div className="splash-overlay"></div>
                        <div className="splash-screen">
                            <figure>
                                <img
                                    width="100%"
                                    src={`${process.env.PUBLIC_URL}/img/global-gameSheetSplash.png`}
                                    alt=""
                                />
                            </figure>
                        </div>
                        <div
                            className={`position-absolute w-100 center-xy mx-auto login-box ${otpVisible ? "withOTPInput" : ""
                                }`}
                            style={{
                                top: "50%",
                                zIndex: 4,
                                transform: "translateY(-50%)",
                            }}
                        >
                            <div className="d-flex text-white font-15 mb-4">
                                Sign in or Sign up
                            </div>
                            <div
                                className="bg-white px-4 cxy flex-column whiteBox"
                                style={{
                                    width: "85%",
                                    height: "70px",
                                    borderRadius: "5px",
                                }}
                            >
                                <div
                                    className="input-group mobileInput"
                                    style={{
                                        transition: "top 0.5s ease 0s",
                                        top: "25px",
                                    }}
                                >
                                    <div className="input-group-prepend">
                                        <div
                                            className="input-group-text"
                                        // style={{ width: "100px" }}
                                        >
                                            +91
                                        </div>
                                    </div>
                                    <input
                                        onChange={handlePhoneInput}
                                        className="form-control"
                                        name="mobile"
                                        type="tel"
                                        placeholder="Mobile number"
                                        value={phoneNumber}
                                        style={{
                                            transition: "all 3s ease-out 0s",
                                        }}
                                    />
                                    <div className="invalid-feedback">
                                        Enter a valid mobile number
                                    </div>
                                </div>
                                <div
                                    className="input-group pt-2 otpInput"
                                    style={{
                                        transition: "left 0.5s ease 0s",
                                        left: "-500px",
                                    }}
                                >
                                    <div className="input-group-prepend">
                                        <div
                                            className="input-group-text"
                                        // style={{ width: "100px" }}
                                        >
                                            OTP
                                        </div>
                                    </div>
                                    <input
                                        className="form-control"
                                        name="otp"
                                        type="tel"
                                        placeholder="Enter OTP"
                                        autoComplete="off"
                                        value={otp}
                                        onChange={handleOtpInput}
                                    />
                                    <div className="invalid-feedback">
                                        Enter a correct OTP
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleLogin}
                                className="bg-green refer-button cxy mt-4"
                                style={{ width: "85%" }}
                            >
                                Continue
                            </button>
                            <div className="resend-otp">
                                {resendOtp ? (
                                    <Link
                                        style={{
                                            color: "white",
                                            textDecoration: "underline",
                                            textUnderlineOffset: "8px",
                                        }}
                                        onClick={resendOtpMsg}
                                    >
                                        RESEND OTP
                                    </Link>
                                ) : (
                                    <>
                                        <div>RESEND OTP in {seconds}</div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="login-footer">
                            By proceeding, you agree to our
                            <Link to="/terms-conditions"> Terms of Use / </Link>
                            <Link to="/privacy-policy">Privacy Policy</Link> and
                            that you are 18 years or older. You are not playing
                            from Assam, Odisha, Nagaland, Sikkim, Meghalaya,
                            Andhra Pradesh, or Telangana.
                        </div>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(Login);
