import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import RightContainer from "../common/RightContainer";
import SideNav from "../common/SideNav";
import StepOne from "./components/stepOne";
import StepTwo from "./components/stepTwo";
import StepThree from "./components/stepThree";
import { useSelector, useDispatch } from "react-redux";
import Completed from "./components/completed";
import {
    checkAuth,
    getDocumentTypes,
    getStates,
    kycUploaded,
    uploadKyc,
} from "../../store/user";
import Loading from "../../HOC/Loading";
import { useNavigate } from "react-router-dom";
function Kyc() {
    const initialForm = {
        docType: { name: "Select Document", id: 0 },
        docNumber: "",
        firstName: "",
        lastName: "",
        dob: "",
        state: { name: "Select State", id: 0 },
        frontPhoto: "",
        backPhoto: "",
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const kycStatus = useSelector((state) => state.user.details.kyc);
    const [formInput, setFormInput] = useState(initialForm);
    const [step, setStep] = useState(1);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    useEffect(() => {
        dispatch(getDocumentTypes());
        dispatch(getStates());
    }, []);
    const pad2 = (n) => {
        return (n < 10 ? "0" : "") + n;
    };
    var today = new Date();
    var month = pad2(today.getMonth() + 1); //months (0-11)
    var day = pad2(today.getDate()); //day (1-31)
    var year = today.getFullYear() - 18;
    const maxDate = `${year}-${month}-${day}`;
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleFormInput = (e) => {
        if (e.target.type === "file")
            setFormInput({ ...formInput, [e.target.name]: e.target.files[0] });
        else setFormInput({ ...formInput, [e.target.name]: e.target.value });
    };
    const handleSetDt = (docType) => {
        setFormInput({ ...formInput, docType });
        setDropdownVisible(false);
    };
    const handleSetState = (state) => {
        setFormInput({ ...formInput, state });
        setDropdownVisible(false);
    };
    const validateCurrentStep = () => {
        let reqInputs = [];
        if (step === 1) {
            if (
                formInput.docType.id === 1 &&
                formInput.docNumber.length != 12
            ) {
                return false;
            }
            reqInputs = {
                docType: `{"name":"Select Document","id":0}`,
                docNumber: "",
            };
        }
        if (step === 2) {
            if (formInput.dob > maxDate) {
                return false;
            }
            reqInputs = {
                firstName: "",
                lastName: "",
                dob: "",
                state: `{"name":"Select State","id":0}`,
            };
        }
        if (step === 3) {
            reqInputs = { frontPhoto: "", backPhoto: "" };
        }
        for (let input in reqInputs) {
            let formInputValue =
                typeof formInput[input] === "object"
                    ? JSON.stringify(formInput[input])
                    : formInput[input];
            if (formInputValue === reqInputs[input]) {
                return false;
            }
        }
        return true;
    };
    const handleNextStep = () => {
        if (step === 3) {
            dispatch(
                uploadKyc(formInput, (dispatch, res) => {
                    // console.warn("dis", dispatch, res);
                    if (res?.success) {
                        dispatch(kycUploaded());
                        dispatch(checkAuth());
                        navigate("/");
                    }
                })
            );
            return;
        }
        if (validateCurrentStep()) {
            setStep(step + 1);
        }
    };
    const handlePrevStep = () => {
        if (step !== 1) {
            setStep(step - 1);
        }
    };
    const handleClearFile = (input) => {
        setFormInput({ ...formInput, [input]: "" });
    };
    const {
        docType,
        docNumber,
        firstName,
        lastName,
        dob,
        state,
        frontPhoto,
        backPhoto,
    } = formInput;
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    {kycStatus == 1 ||
                    (kycStatus == 0 && kycStatus !== false) ? (
                        <Completed />
                    ) : (
                        <div className="kycPage">
                            <div>
                                <span style={{ fontSize: "1.5em" }}>
                                    Step {step}
                                </span>{" "}
                                of 3
                            </div>
                            {step === 1 ? (
                                <StepOne
                                    formInputs={{ docType, docNumber }}
                                    handleSetDt={handleSetDt}
                                    handleFormInput={handleFormInput}
                                    toggleDropdown={toggleDropdown}
                                    dropdownVisible={dropdownVisible}
                                />
                            ) : step === 2 ? (
                                <StepTwo
                                    formInputs={{
                                        docType,
                                        docNumber,
                                        firstName,
                                        lastName,
                                        dob,
                                        state,
                                    }}
                                    handleFormInput={handleFormInput}
                                    toggleDropdown={toggleDropdown}
                                    dropdownVisible={dropdownVisible}
                                    handleSetState={handleSetState}
                                />
                            ) : step === 3 ? (
                                <StepThree
                                    formInputs={{
                                        docType,
                                        docNumber,
                                        frontPhoto,
                                        backPhoto,
                                    }}
                                    handleFormInput={handleFormInput}
                                    handleClearFile={handleClearFile}
                                />
                            ) : (
                                <></>
                            )}
                            <div style={{ paddingBottom: "80px" }}></div>

                            <div className="refer-footer">
                                {step !== 1 ? (
                                    <button
                                        onClick={handlePrevStep}
                                        className="refer-button mr-2 cxy w-100 bg-primary"
                                    >
                                        {" "}
                                        Previous{" "}
                                    </button>
                                ) : (
                                    <></>
                                )}
                                <button
                                    disabled={!validateCurrentStep()}
                                    onClick={handleNextStep}
                                    className="refer-button cxy w-100 next-btn-bg"
                                >
                                    {step === 3 ? "Complete" : "Next"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(Kyc);
