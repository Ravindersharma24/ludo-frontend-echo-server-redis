import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    checkAuth,
    logout,
    updatedProfile,
    updateUpiId,
    updateUserProfile,
} from "../store/user";
import { useEffect, useState } from "react";
import { updateReferCode, updateUsername, updatedName } from "../store/user";
import Loading from "../HOC/Loading";
import { toast } from "react-toastify";
function Profile() {
    const [referCode, setReferCode] = useState("");
    const [userName, setUserName] = useState("");
    const [nameEditable, setNameEditable] = useState(false);
    const [profileImg, setProfileImg] = useState();
    const [upiId, setUpiId] = useState("");
    const user = useSelector((state) => state.user.details);
    const dispatch = useDispatch();
    const [htmlElements, setHtmlElements] = useState({
        profileBox: "",
        overlayElement: "",
    });
    useEffect(() => {
        document.title = "Profile Update | JJLudo";
        setProfileImg(user.profileImage);
    }, []);
    const handleLogout = () => {
        dispatch(logout());
    };
    const selectProfile = () => {
        setHtmlElements.profileBox = document.getElementById("select-profile");
        setHtmlElements.overlayElement = document.getElementById("overlay");
        setHtmlElements.profileBox.classList.add("kyc-select-enter-done");
        setHtmlElements.overlayElement.classList.add("active");
    };
    const hideProfileSectector = () => {
        setHtmlElements.overlayElement.classList.remove("active");
        setHtmlElements.profileBox.classList.remove("kyc-select-enter-done");
    };
    const updateProfileImage = (user_image) => {
        setProfileImg(user_image);
        setHtmlElements.overlayElement.classList.remove("active");
        setHtmlElements.profileBox.classList.remove("kyc-select-enter-done");
        dispatch(
            updateUserProfile({ user_image }, (dispatch, res) => {
                dispatch(updatedProfile(res));
            })
        );
    };
    const handleReferCodeInput = (e) => {
        setReferCode(e.target.value);
    };
    const handleUpdateReferCode = () => {
        dispatch(updateReferCode({ referCode }));
    };
    const handleUpdateUpiId = () => {
        dispatch(updateUpiId({ upiId }))
    }
    const handleUpiIdInput = (e) => {
        setUpiId(e.target.value)
    }
    const validateUpiId = () => {
        let regex = new RegExp(/^[\w.-]+@[\w.-]+$/);
        if (upiId === null) {
            return false;
        }
        if (regex.test(upiId) === true) {
            return true;
        } else {
            return false;
        }
    }

    const handleChangeUsername = () => {
        setNameEditable(true);
    };
    const selectedProfileImg = (e) => {
        dispatch(
            updateUserProfile(
                { user_image: e.target.files[0] },
                (dispatch, res) => {
                    dispatch(updatedProfile(res));
                    setProfileImg(res.profileImage);
                }
            )
        );
        setHtmlElements.overlayElement.classList.remove("active");
        setHtmlElements.profileBox.classList.remove("kyc-select-enter-done");
    };
    const handleUsernameInput = (e) => {
        setUserName(e.target.value);
    };
    const handleUpdateUsername = () => {
        if (userName.length > 20) {
            const message = "Username can't be more than 20 characters.";
            toast.error(message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        dispatch(
            updateUserProfile({ userName }, (dispatch, res) => {
                setNameEditable(false);
                setUserName("");
                dispatch(updatedProfile(res));
            })
        );
    };
    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <div
                        className="p-3"
                        style={{ background: "rgb(250, 250, 250)" }}
                    >
                        <div className="center-xy py-5">
                            <picture onClick={selectProfile}>
                                <img
                                    className="border-50"
                                    height="70px"
                                    width="70px"
                                    src={`${process.env.REACT_APP_ASSETS_PATH}user-profiles/${profileImg}`}
                                    alt=""
                                />
                            </picture>
                            <span className="battle-input-header mr-1">
                                {user.phoneNumber}
                            </span>
                            <span className="battle-input-header mr-1">
                                Upi Id : {user?.upiId ? user.upiId : '-'}
                            </span>
                            <div className="text-bold my-3">
                                {nameEditable ? (
                                    <>
                                        <div
                                            className="MuiFormControl-root MuiTextField-root"
                                            style={{ verticalAlign: "bottom" }}
                                        >
                                            <label
                                                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated"
                                                data-shrink="false"
                                            >
                                                {!userName
                                                    ? "Enter Username"
                                                    : null}
                                            </label>
                                            <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                                                <input
                                                    aria-invalid="false"
                                                    type="text"
                                                    className="MuiInputBase-input MuiInput-input"
                                                    onChange={
                                                        handleUsernameInput
                                                    }
                                                    value={userName}
                                                />
                                            </div>
                                        </div>
                                        <img
                                            onClick={handleUpdateUsername}
                                            className="ml-2"
                                            width="20px"
                                            src={`${process.env.PUBLIC_URL}/img/select-blue-checkIcon.png`}
                                            alt=""
                                        />
                                    </>
                                ) : (
                                    <>
                                        {user.name ? user.name : "JJ Ludo User"}
                                        <img
                                            className="ml-2"
                                            width="20px"
                                            src={`${process.env.PUBLIC_URL}/img/icon-edit.jpg`}
                                            onClick={handleChangeUsername}
                                            alt=""
                                        ></img>
                                    </>
                                )}
                            </div>
                            <Link
                                className="d-flex align-items-center profile-wallet w-100"
                                to="/wallet"
                            >
                                <picture className="ml-4">
                                    <img
                                        width="32px"
                                        src={`${process.env.PUBLIC_URL}/img/sidebar-wallet.png`}
                                        alt=""
                                    />
                                </picture>
                                <div className="ml-5 mytext text-muted">
                                    My Wallet
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="divider-x"></div>
                    {user?.kyc == 2 ? (
                        <>
                            <div className="p-3">
                                <div className="text-bold">
                                    Complete Profile
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="p-3  complete-profile">
                                <div className="text-bold">
                                    Complete Profile
                                </div>
                                <Link to="/complete-kyc">
                                    <div className="d-flex">
                                        <div
                                            className="react-swipeable-view-container"
                                            style={{
                                                flexDirection: "row",
                                                transition: "all 0s ease 0s",
                                                direction: "ltr",
                                                flex: 1,
                                                willChange: "transform",
                                                transform: "translate(0%, 0px)",
                                            }}
                                        >
                                            <div
                                                aria-hidden="false"
                                                data-swipeable="true"
                                                style={{
                                                    width: "100%",
                                                    flexShrink: 0,
                                                    overflow: "auto",
                                                }}
                                            >
                                                <span className="d-flex align-items-center profile-wallet bg-light mx-1 my-4 py-5">
                                                    <picture className="ml-4">
                                                        <img
                                                            width="32px"
                                                            src={`${process.env.PUBLIC_URL}/img/kyc-icon-new.png`}
                                                            alt=""
                                                        />
                                                    </picture>
                                                    <div className="ml-5 mytext text-muted">
                                                        Complete KYC
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </>
                    )}
                    <div className="divider-x"></div>
                    {!user.referCode ? (
                        <div className="px-3 py-1">
                            <div
                                className="d-flex align-items-center position-relative"
                                style={{ height: "84px" }}
                            >
                                <picture>
                                    <img
                                        height="32px"
                                        width="32px"
                                        src={`${process.env.PUBLIC_URL}/img/sidebar-referEarn.png`}
                                        alt=""
                                    />
                                </picture>
                                <div className="pl-4">
                                    <div
                                        className="text-uppercase moneyBox-header"
                                        style={{ fontSize: "0.95rem" }}
                                    >
                                        Use Refer Code
                                    </div>
                                    <div>
                                        <div
                                            className="MuiFormControl-root MuiTextField-root"
                                            style={{ verticalAlign: "bottom" }}
                                        >
                                            <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                                                <input
                                                    onChange={
                                                        handleReferCodeInput
                                                    }
                                                    aria-invalid="false"
                                                    type="text"
                                                    className="MuiInputBase-input MuiInput-input"
                                                    value={referCode}
                                                />
                                            </div>
                                        </div>
                                        {referCode.length === 5 ? (
                                            <img
                                                onClick={handleUpdateReferCode}
                                                className="ml-2"
                                                width="20px"
                                                src={`${process.env.PUBLIC_URL}/img/select-blue-checkIcon.png`}
                                                alt=""
                                                style={{ cursor: "pointer" }}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {
                        !user.upiId ? (
                            <>
                                <div className="px-3 py-1">
                                    <div
                                        className="d-flex align-items-center position-relative"
                                        style={{ height: "84px" }}
                                    >
                                        <picture>
                                            <img
                                                height="32px"
                                                width="32px"
                                                src={`${process.env.PUBLIC_URL}/img/sidebar-referEarn.png`}
                                                alt=""
                                            />
                                        </picture>
                                        <div className="pl-4">
                                            <div
                                                className="text-uppercase moneyBox-header"
                                                style={{ fontSize: "0.95rem" }}
                                            >
                                                UPI ID
                                            </div>
                                            <div>
                                                <div
                                                    className="MuiFormControl-root MuiTextField-root"
                                                    style={{ verticalAlign: "bottom" }}
                                                >
                                                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                                                        <input
                                                            onChange={
                                                                handleUpiIdInput
                                                            }
                                                            aria-invalid="false"
                                                            type="text"
                                                            className="MuiInputBase-input MuiInput-input"
                                                            value={upiId}
                                                        />
                                                    </div>
                                                </div>
                                                {validateUpiId() && upiId ? (
                                                    <img
                                                        onClick={handleUpdateUpiId}
                                                        className="ml-2"
                                                        width="20px"
                                                        src={`${process.env.PUBLIC_URL}/img/select-blue-checkIcon.png`}
                                                        alt=""
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}

                    <div className="px-3 py-1">
                        <div
                            className="d-flex align-items-center position-relative"
                            style={{ height: "84px" }}
                        >
                            <picture>
                                <img
                                    height="32px"
                                    width="32px"
                                    src={`${process.env.PUBLIC_URL}/img/global-cash-won-green-circular.png`}
                                    alt=""
                                />
                            </picture>
                            <div className="pl-4">
                                <div
                                    className="text-uppercase moneyBox-header"
                                    style={{ fontSize: "0.95rem" }}
                                >
                                    Cash Won
                                </div>
                                <div>
                                    <picture className="mr-1">
                                        <img
                                            height="auto"
                                            width="21px"
                                            src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                            alt=""
                                        />
                                    </picture>
                                    <span
                                        className="moneyBox-text"
                                        style={{
                                            fontSize: "1em",
                                            bottom: "-1px",
                                        }}
                                    >
                                        ₹{user.winningCash}
                                    </span>
                                </div>
                                <span className="thin-divider-x"></span>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 py-1">
                        <div
                            className="d-flex align-items-center position-relative"
                            style={{ height: "84px" }}
                        >
                            <picture>
                                <img
                                    height="32px"
                                    width="32px"
                                    src={`${process.env.PUBLIC_URL}/img/global-purple-battleIcon.png`}
                                    alt=""
                                />
                            </picture>
                            <div className="pl-4">
                                <div
                                    className="text-uppercase moneyBox-header"
                                    style={{ fontSize: "0.95rem" }}
                                >
                                    Battle Played
                                </div>
                                <div>
                                    <span
                                        className="moneyBox-text"
                                        style={{
                                            fontSize: "1em",
                                            bottom: "-1px",
                                        }}
                                    >
                                        {user?.battlePlayed}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider-x"></div>
                    <div className="p-3">
                        <span
                            onClick={handleLogout}
                            className="center-xy text-muted text-uppercase py-4 font-weight-bolder cursor-hover"
                        >
                            Log Out
                        </span>
                    </div>
                    <div className="kyc-select">
                        <div
                            className="overlay"
                            id="overlay"
                            onClick={hideProfileSectector}
                        ></div>
                        <div
                            className="box"
                            id="select-profile"
                            style={{ bottom: "0px", position: "absolute" }}
                        >
                            <div className="bg-white">
                                <div className="header cxy flex-column">
                                    <picture>
                                        <img
                                            className="border-50"
                                            height="80px"
                                            width="80px"
                                            src={`${process.env.REACT_APP_ASSETS_PATH}/user-profiles/${profileImg}`}
                                            alt=""
                                        />
                                    </picture>
                                    <div className="custom-file mt-4">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="profilePic"
                                            name="user_image"
                                            accept="image/*"
                                            onChange={selectedProfileImg}
                                        />
                                        <label className="custom-file-label">
                                            Browse your profile pic
                                        </label>
                                    </div>
                                    <span className="mt-2">OR</span>
                                    <div className="header-text mt-2">
                                        Choose Avatar
                                    </div>
                                </div>
                                <div
                                    className="mx-3 pb-3"
                                    style={{ paddingTop: "300px" }}
                                >
                                    <div className="row justify-content-between col-10 mx-auto">
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={`${process.env.PUBLIC_URL}/img/avatars/Avatar1.png`}
                                            alt=""
                                            onClick={() =>
                                                updateProfileImage(
                                                    "Avatar1.png"
                                                )
                                            }
                                        />
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={`${process.env.PUBLIC_URL}/img/avatars/Avatar2.png`}
                                            alt=""
                                            onClick={() =>
                                                updateProfileImage(
                                                    "Avatar2.png"
                                                )
                                            }
                                        />
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={`${process.env.PUBLIC_URL}/img/avatars/Avatar3.png`}
                                            alt=""
                                            onClick={() =>
                                                updateProfileImage(
                                                    "Avatar3.png"
                                                )
                                            }
                                        />
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={`${process.env.PUBLIC_URL}/img/avatars/Avatar4.png`}
                                            alt=""
                                            onClick={() =>
                                                updateProfileImage(
                                                    "Avatar4.png"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="row justify-content-between col-10 mx-auto mt-3 mb-3">
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={`${process.env.PUBLIC_URL}/img/avatars/Avatar5.png`}
                                            alt=""
                                            onClick={() =>
                                                updateProfileImage(
                                                    "Avatar5.png"
                                                )
                                            }
                                        />
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={`${process.env.PUBLIC_URL}/img/avatars/Avatar6.png`}
                                            alt=""
                                            onClick={() =>
                                                updateProfileImage(
                                                    "Avatar6.png"
                                                )
                                            }
                                        />
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={`${process.env.PUBLIC_URL}/img/avatars/Avatar7.png`}
                                            alt=""
                                            onClick={() =>
                                                updateProfileImage(
                                                    "Avatar7.png"
                                                )
                                            }
                                        />
                                        <img
                                            height="50px"
                                            width="50px"
                                            src={`${process.env.PUBLIC_URL}/img/avatars/Avatar8.png`}
                                            alt=""
                                            onClick={() =>
                                                updateProfileImage(
                                                    "Avatar8.png"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(Profile);
