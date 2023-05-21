import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import { manualWithdrawFunds, withdrawFunds } from "../store/withdraw";
import { checkAuth } from "../store/user";
import Loading from "../HOC/Loading";
function WithdrawFunds() {
    const initialForm = {
        name: "",
        email: "",
        account_number: "",
        ifsc_code: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    };
    const initialManualForm = {
        phone_no: null,
        transfer_type: 1,
        upi_id: "",
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.details);
    const canWithdraw = () => {
        return (
            user?.kyc == 1 && user?.upiId &&
            +user?.winningCash >= parseFloat(user?.wallet_withdraw_limit)
        )
    };
    const [paymentOption, setPaymentOption] = useState("");
    const [amount, setAmount] = useState(0);
    const [formInput, setFormInput] = useState(initialForm);
    const [manualFormInput, setManualFormInput] = useState(initialManualForm)
    //form error
    const [formErrors, setFormErrors] = useState({});
    const [manualFormErros, setManualFromErros] = useState({});
    const handleFormInput = (e) => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    };
    const handleManualFormInput = (e) => {
        if (e.target.name === 'transfer_type') {
            setManualFormInput({ ...manualFormInput, [e.target.name]: parseInt(e.target.value) })
        } else {
            setManualFormInput({ ...manualFormInput, [e.target.name]: e.target.value })
        }
    }

    const handleSetPaymentOption = () => {
        if (!canWithdraw()) return false;
        setPaymentOption("bank");
    };
    const handleAmountInput = (e) => {
        const re = /^[0-9\b]+$/;
        let inputAmount = parseInt(e.target.value);
        if (!re.test(inputAmount) && inputAmount !== "") return;
        if (inputAmount > 1000) inputAmount = 1000;
        setAmount(inputAmount);
    };

    const validateForm = () => {
        let reqInputs = [
            "amount",
            "name",
            "email",
            "account_number",
            "ifsc_code",
            "address",
            "city",
            "state",
            "pincode",
        ];
        for (let input in reqInputs) {
            if (formInput[input] === "") {
                return false;
            }
        }
        return true;
    };

    const manualFormValidate = () => {
        if (formInput.name === "" || manualFormInput?.phone_no || formInput?.amount === "") {
            return false;
        }
        if (manualFormInput.transfer_type === 1) {
            if (manualFormInput?.upi_id === "") {
                return false;
            }
        } else {
            if (formInput?.account_number || formInput?.ifsc_code) {
                return false;
            }
        }
        return true;
    };

    const handleWithdraw = () => {
        if (!validateForm() && !manualFormValidate()) {
            alert("Please fill all required fields.");
            return;
        }
        // if (amount < 95 || amount > 1000) {
        //     alert("Please enter any amount from 95 to 1000");
        //     return;
        // }
        // if (amount > +user.winningCash) {
        //     alert("Insuficient funds!");
        //     return;
        // }
        const formErrors = validate({ ...formInput, amount, ...manualFormInput });
        // console.log("error---", formErrors, formInput);
        setFormErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            if (user.paytm) {
                dispatch(
                    withdrawFunds({ ...formInput, amount }, (dispatch, res) => {
                        if (res?.success || res?.success === "pending") {
                            dispatch(checkAuth());
                            navigate("/");
                        }
                    })
                );
            } else if (transfer_type === 1) {
                dispatch(
                    manualWithdrawFunds({ name, amount, transfer_type, upi_id }, (dispatch, res) => {
                        if (res?.success || res?.success === "pending") {
                            dispatch(checkAuth());
                            navigate("/")
                        }
                    })
                )
            } else {
                dispatch(
                    manualWithdrawFunds({ name, amount, transfer_type, account_number, ifsc_code }, (dispatch, res) => {
                        if (res?.success || res?.success === "pending") {
                            dispatch(checkAuth());
                            navigate("/")
                        }
                    })
                )
            }
        }
    };
    useEffect(() => {
        if (Object.keys(formErrors).length === 0) {
            // console.log(formInput);
        }

    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        const upiIdRegex = new RegExp(/^[\w.-]+@[\w.-]+$/);
        console.warn('paytm', values, transfer_type);
        if (!(values?.amount >= +user?.wallet_withdraw_limit && values?.amount <= 1000)) {
            // errors.amount = "Amount must be between " + +user?.wallet_withdraw_limit + " and 1000";
            errors.amount = "Minimum withdrawl amount should be  ₹ " + +user?.wallet_withdraw_limit;
        }
        if (!values.name) {
            errors.name = "Name is required!";
        }
        console.warn('transfer', typeof transfer_type);
        if (!user?.paytm && transfer_type === 1) {
            if (!values.transfer_type) {
                errors.transfer_type = "Please select a transfer type to withdrawal";
            }
            if (!values.upi_id) {
                errors.upi_id = "Upi Id is required";
            }
            else if(!upiIdRegex.test(values.upi_id)){
                errors.upi_id = "Incorrect upi id format";
            }
            // if (!values.phone_no) {
            //     errors.phone_no = "Mobile number is required";
            // } else if (!mobileRegex.test(values.phone_no)) {
            //     errors.phone_no = "This is not a valid mobile number!";
            // }
        } else if (transfer_type === 2) {
            if (!values.account_number) {
                errors.account_number = "Account Number is required";
            }
            if (!values.ifsc_code) {
                errors.ifsc_code = "IFSC Code is required";
            }
            // if (!values.phone_no) {
            //     errors.phone_no = "Mobile number is required";
            // } else if (!mobileRegex.test(values.phone_no)) {
            //     errors.phone_no = "This is not a valid mobile number!";
            // }
        }
        else {
            if (!values.account_number) {
                errors.account_number = "Account Number is required";
            }
            if (!values.ifsc_code) {
                errors.ifsc_code = "IFSC Code is required";
            }
            if (!values.email) {
                errors.email = "Email is required!";
            } else if (!emailRegex.test(values.email)) {
                errors.email = "This is not a valid email format!";
            }
            if (!values.address) {
                errors.address = "Address is required";
            }
            if (!values.city) {
                errors.city = "City is required";
            }
            if (!values.state) {
                errors.state = "State is required";
            }
            if (!values.pincode) {
                errors.pincode = "PIN Code is required";
            }
        }
        return errors;
    };
    const {
        name,
        email,
        account_number,
        ifsc_code,
        address,
        city,
        state,
        pincode,
    } = formInput;
    const {
        // phone_no,
        transfer_type,
        upi_id,
    } = manualFormInput
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <div className="px-4 py-3 pb-5">
                        <div className="games-section mt-2">
                            <div className="d-flex position-relative align-items-center">
                                <div className="games-section-title">
                                    Choose withdrawal option
                                </div>
                            </div>
                        </div>
                        {user.kyc != 1 ? (
                            <>
                                <Link
                                    className="d-flex align-items-center profile-wallet bg-light m-4 py-3"
                                    to="/complete-kyc"
                                >
                                    <picture className="ml-4">
                                        <img
                                            width="32px"
                                            src={`${process.env.PUBLIC_URL}/img/alert.svg`}
                                            alt=""
                                        />
                                    </picture>
                                    <div className="ml-4 mytext text-muted">
                                        Complete KYC to take Withdrawals
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                        {!user?.upiId ? (
                            <>
                                <Link
                                    className="d-flex align-items-center profile-wallet bg-light m-4 py-3"
                                    to="/profile"
                                >
                                    <picture className="ml-4">
                                        <img
                                            width="32px"
                                            src={`${process.env.PUBLIC_URL}/img/alert.svg`}
                                            alt=""
                                        />
                                    </picture>
                                    <div className="ml-4 mytext text-muted">
                                        Add UPI to your profile to take Withdrawals
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}
                        {!paymentOption ? (
                            <div
                                className="mt-3"
                                style={!canWithdraw() ? { opacity: 0.6 } : {}}
                            >
                                {/* <div
                                        className="add-fund-box d-flex align-items-center mt-4"
                                        style={{paddingTop: '15px', height: '60px'}}
                                    >
                                        <div className="d-flex align-items-center">
                                            <img width="48px" src={`${process.env.PUBLIC_URL}/img/upi.webp`} alt="" />
                                            <div className="d-flex justify-content-center flex-column ml-4">
                                                <div className="jss19">Withdraw to UPI</div>
                                                <div className="jss20">Minimum withdrawal amount ₹95</div>
                                            </div>
                                        </div>
                                    </div> */}
                                <div
                                    className="add-fund-box d-flex align-items-center mt-4"
                                    style={{
                                        paddingTop: "15px",
                                        height: "60px",
                                    }}
                                    onClick={handleSetPaymentOption}
                                >
                                    <div className="d-flex align-items-center">
                                        <img
                                            width="48px"
                                            src={`${process.env.PUBLIC_URL}/img/bank.png`}
                                            alt=""
                                        />
                                        <div className="d-flex justify-content-center flex-column ml-4">
                                            <div className="jss19">
                                                {user?.paytm ? 'Bank Transfer' : 'Transfer funds'}
                                            </div>
                                            <div className="jss20">
                                                Minimum withdrawal amount ₹
                                                {parseFloat(
                                                    user?.wallet_withdraw_limit
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : user?.paytm ?
                            (
                                <div className="px-4 py-3">
                                    <div className="pb-3 mb-5">
                                        <div className="MuiFormControl-root mt-4 MuiFormControl-fullWidth">
                                            <div className="MuiFormControl-root MuiTextField-root">
                                                <label
                                                    className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink"
                                                    data-shrink="true"
                                                >
                                                    Enter Amount
                                                </label>
                                                <div className="MuiInputBase-root MuiInput-root MuiInput-underline jss28 MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart">
                                                    <div className="kyc-doc-input">
                                                        <div className="MuiInputAdornment-root MuiInputAdornment-positionStart">
                                                            <p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextSecondary">
                                                                ₹
                                                            </p>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                handleAmountInput
                                                            }
                                                            aria-invalid="false"
                                                            type="tel"
                                                            className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart"
                                                            defaultValue={amount}
                                                        />
                                                        <div className="invalid">
                                                            {formErrors.amount
                                                                ? formErrors.amount
                                                                : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="MuiFormHelperText-root">
                                                    Min: {user.wallet_withdraw_limit | parseInt}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "30px" }}>
                                            <div className="kyc-doc-input">
                                                <input
                                                    onChange={handleFormInput}
                                                    type="text"
                                                    name="name"
                                                    autoComplete="off"
                                                    value={name}
                                                    required
                                                />
                                                <div className="label">Name</div>
                                                <div className="invalid">
                                                    {formErrors.name
                                                        ? formErrors.name
                                                        : ""}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="kyc-doc-input mt-4">
                                                <input
                                                    onChange={handleFormInput}
                                                    type="text"
                                                    name="email"
                                                    autoComplete="off"
                                                    value={email}
                                                />
                                                <div className="label">Email</div>
                                                <div className="invalid">
                                                    {formErrors.email
                                                        ? formErrors.email
                                                        : ""}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="kyc-doc-input mt-4">
                                                <input
                                                    onChange={handleFormInput}
                                                    type="text"
                                                    name="account_number"
                                                    autoComplete="off"
                                                    value={account_number}
                                                />
                                                <div className="label">
                                                    Account Number
                                                </div>
                                                <div className="invalid">
                                                    {formErrors.account_number
                                                        ? formErrors.account_number
                                                        : ""}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="kyc-doc-input mt-4">
                                                <input
                                                    onChange={handleFormInput}
                                                    type="text"
                                                    name="ifsc_code"
                                                    autoComplete="off"
                                                    value={ifsc_code}
                                                />
                                                <div className="label">
                                                    IFSC Code
                                                </div>
                                                <div className="invalid">
                                                    {formErrors.ifsc_code
                                                        ? formErrors.ifsc_code
                                                        : ""}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="kyc-doc-input mt-4">
                                                <input
                                                    onChange={handleFormInput}
                                                    type="text"
                                                    name="address"
                                                    autoComplete="off"
                                                    value={address}
                                                />
                                                <div className="label">Address</div>
                                                <div className="invalid">
                                                    {formErrors.address
                                                        ? formErrors.address
                                                        : ""}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="kyc-doc-input mt-4">
                                                <input
                                                    onChange={handleFormInput}
                                                    type="text"
                                                    name="city"
                                                    autoComplete="off"
                                                    value={city}
                                                />
                                                <div className="label">City</div>
                                                <div className="invalid">
                                                    {formErrors.city
                                                        ? formErrors.city
                                                        : ""}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="kyc-doc-input mt-4">
                                                <input
                                                    onChange={handleFormInput}
                                                    type="text"
                                                    name="state"
                                                    autoComplete="off"
                                                    value={state}
                                                />
                                                <div className="label">state</div>
                                                <div className="invalid">
                                                    {formErrors.state
                                                        ? formErrors.state
                                                        : ""}
                                                </div>
                                            </div>
                                            <br />
                                            <div className="kyc-doc-input mt-4">
                                                <input
                                                    onChange={handleFormInput}
                                                    type="text"
                                                    name="pincode"
                                                    autoComplete="off"
                                                    value={pincode}
                                                />
                                                <div className="label">Pincode</div>
                                                <div className="invalid">
                                                    {formErrors.pincode
                                                        ? formErrors.pincode
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="refer-footer">
                                        <button
                                            onClick={handleWithdraw}
                                            type="button"
                                            disabled={!amount}
                                            className={`refer-button cxy w-100 next-btn-bg`}
                                        >
                                            Withdraw
                                        </button>
                                    </div>
                                </div>
                            ) :
                            <div className="px-4 py-3">
                                <div className="pb-3 mb-5">
                                    <div className="MuiFormControl-root mt-4 MuiFormControl-fullWidth">
                                        <div className="MuiFormControl-root MuiTextField-root">
                                            <label
                                                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink"
                                                data-shrink="true"
                                            >

                                                Enter Amount
                                            </label>
                                            <div className="MuiInputBase-root MuiInput-root MuiInput-underline jss28 MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart">
                                                <div className="kyc-doc-input">
                                                    <div className="MuiInputAdornment-root MuiInputAdornment-positionStart">
                                                        <p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextSecondary">
                                                            ₹
                                                        </p>
                                                    </div>
                                                    <input
                                                        onChange={
                                                            handleAmountInput
                                                        }
                                                        aria-invalid="false"
                                                        type="tel"
                                                        className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart"
                                                        defaultValue={amount}
                                                    />
                                                    <div className="invalid">
                                                        {formErrors.amount
                                                            ? formErrors.amount
                                                            : ""}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="MuiFormHelperText-root">
                                                Min: {user.wallet_withdraw_limit | parseInt}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "30px" }}>
                                        <div className="kyc-doc-input">
                                            <input
                                                onChange={handleFormInput}
                                                type="text"
                                                name="name"
                                                autoComplete="off"
                                                value={name}
                                                required
                                            />
                                            <div className="label">Name</div>
                                            <div className="invalid">
                                                {formErrors.name
                                                    ? formErrors.name
                                                    : ""}
                                            </div>
                                        </div>
                                        <br />
                                        {/* <div className="kyc-doc-input mt-4">
                                            <input
                                                onChange={handleManualFormInput}
                                                type="text"
                                                name="phone_no"
                                                autoComplete="off"
                                                defaultValue={phone_no}
                                            />
                                            <div className="label">Mobile Number</div>
                                            <div className="invalid">
                                                {formErrors.phone_no
                                                    ? formErrors.phone_no
                                                    : ""}
                                            </div>
                                        </div> */}
                                        <br />


                                        <div className="kyc-doc-input mt-4">
                                            <select className=" paymentTypeSelect" name="transfer_type" defaultValue={transfer_type} onChange={handleManualFormInput}>
                                                <option value="1">Upi</option>
                                                <option value="2">Bank</option>
                                            </select>
                                            <div className="label">Transfer Type</div>
                                            <div className="invalid">
                                                {formErrors.transfer_type
                                                    ? formErrors.transfer_type
                                                    : ""}
                                            </div>
                                        </div>
                                        <br />
                                        {transfer_type === 1 ?
                                            <div className="kyc-doc-input mt-4">
                                                <input
                                                    onChange={handleManualFormInput}
                                                    type="text"
                                                    name="upi_id"
                                                    autoComplete="off"
                                                    defaultValue={upi_id}
                                                />
                                                <div className="label">Upi Id</div>
                                                <div className="invalid">
                                                    {formErrors.upi_id
                                                        ? formErrors.upi_id
                                                        : ""}
                                                </div>
                                            </div>
                                            : <>
                                                <div className="kyc-doc-input mt-4">
                                                    <input
                                                        onChange={handleFormInput}
                                                        type="text"
                                                        name="account_number"
                                                        autoComplete="off"
                                                        value={account_number}
                                                    />
                                                    <div className="label">
                                                        Account Number
                                                    </div>
                                                    <div className="invalid">
                                                        {formErrors.account_number
                                                            ? formErrors.account_number
                                                            : ""}
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="kyc-doc-input mt-4">
                                                    <input
                                                        onChange={handleFormInput}
                                                        type="text"
                                                        name="ifsc_code"
                                                        autoComplete="off"
                                                        value={ifsc_code}
                                                    />
                                                    <div className="label">
                                                        IFSC Code
                                                    </div>
                                                    <div className="invalid">
                                                        {formErrors.ifsc_code
                                                            ? formErrors.ifsc_code
                                                            : ""}
                                                    </div>
                                                </div>
                                            </>}


                                        {/* <br />
                                        <div className="kyc-doc-input mt-4">
                                            <input
                                                onChange={handleFormInput}
                                                type="text"
                                                name="city"
                                                autoComplete="off"
                                                value={city}
                                            />
                                            <div className="label">City</div>
                                            <div className="invalid">
                                                {formErrors.city
                                                    ? formErrors.city
                                                    : ""}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="kyc-doc-input mt-4">
                                            <input
                                                onChange={handleFormInput}
                                                type="text"
                                                name="state"
                                                autoComplete="off"
                                                value={state}
                                            />
                                            <div className="label">state</div>
                                            <div className="invalid">
                                                {formErrors.state
                                                    ? formErrors.state
                                                    : ""}
                                            </div>
                                        </div>
                                        <br />
                                        <div className="kyc-doc-input mt-4">
                                            <input
                                                onChange={handleFormInput}
                                                type="text"
                                                name="pincode"
                                                autoComplete="off"
                                                value={pincode}
                                            />
                                            <div className="label">Pincode</div>
                                            <div className="invalid">
                                                {formErrors.pincode
                                                    ? formErrors.pincode
                                                    : ""}
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="refer-footer">
                                    <button
                                        onClick={handleWithdraw}
                                        type="button"
                                        disabled={!amount}
                                        className={`refer-button cxy w-100 next-btn-bg`}
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(WithdrawFunds);
