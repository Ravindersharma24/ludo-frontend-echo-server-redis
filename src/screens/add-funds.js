import React, { useState } from "react";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import {
    generateOrderToken,
    setPaymentDetails,
    checkOrderStatus,
} from "../store/addFund";
import { useDispatch } from "react-redux";
import { checkAuth } from "../store/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../HOC/Loading";
function AddFunds() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const funds = [100, 250, 500, 1000];
    const [amount, setAmount] = useState("");
    const [step, setStep] = useState(1);

    const cbs = (data) => {
            dispatch(
                checkOrderStatus(
                    { order_id: data.ORDERID },
                    (dispatch, res) => {
                        dispatch(checkAuth());
                        navigate("/");
                    }
                )
            );
    };
    const cbf = (data) => {
        const message = data.RESPMSG || "Something Went Wrong!";
        toast.error(message, {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        navigate("/");
    };
    const renderPaymentGateway = () => {
        dispatch(
            generateOrderToken({ amount }, (dispatch, res) => {
                dispatch(setPaymentDetails(res));
                var config = {
                    "root": "#drop_in_container",
                    "flow": "DEFAULT",
                    "merchant": {
                        mid: "UQSkIi79045699973159",
                        name: "JJLUDO",
                        logo: "https://jjludo.com/img/jjludo.png",
                        redirect: false
                    },
                    "data": {
                        "orderId": "" + res.order_id, /* update order id */
                        "token": "" + res.order_token, /* update token value */
                        "tokenType": "TXN_TOKEN",
                        "amount": "2000" /* update amount */
                    },
                    "handler": {
                        "notifyMerchant": function (eventName, data) {
                            console.log("notifyMerchant handler function called");
                        },
                        "transactionStatus":function(data){
                            if(data.STATUS === "TXN_SUCCESS" && data.RESPCODE === "01"){
                                cbs(data);
                            }
                            else{
                                cbf(data);
                            }
                          }

                    }
                };

                if (window.Paytm && window.Paytm.CheckoutJS) {
                        // initialze configuration using init method
                        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                            // after successfully updating configuration, invoke JS Checkout
                            window.Paytm.CheckoutJS.invoke();
                        }).catch(function onError(error) {
                            console.log("error => ", error);
                        });
                }
            })
        );
    };

    const handleAmountInput = (e) => {
        const re = /^[0-9\b]+$/;
        let inputAmount = e.target.value;
        if (!re.test(inputAmount) && inputAmount !== "") return;

        if (inputAmount > 20000) inputAmount = 20000;

        setAmount(inputAmount);
    };
    const handleNextClick = () => {
        if (amount < 10) {
            const message = "Minimum amount is 10";
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
        renderPaymentGateway();
        setStep(2);
    };
    const handleEditAmount = () => {
        setStep(1);
    };
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    {step === 1 ? (
                        <div className="px-4 py-3">
                            <div className="games-section">
                                <div className="d-flex position-relative align-items-center">
                                    <div className="games-section-title">
                                        Choose amount to add
                                    </div>
                                </div>
                            </div>
                            <div className="pb-3">
                                <div className="MuiFormControl-root mt-4 MuiFormControl-fullWidth">
                                    <div className="MuiFormControl-root MuiTextField-root">
                                        <label
                                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink"
                                            data-shrink="true"
                                        >
                                            Enter Amount
                                        </label>
                                        <div className="MuiInputBase-root MuiInput-root MuiInput-underline jss28 MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart">
                                            <div className="MuiInputAdornment-root position-static MuiInputAdornment-positionStart">
                                                <p className="MuiTypography-root MuiTypography-body1 MuiTypography-colorTextSecondary">
                                                    ₹
                                                </p>
                                            </div>
                                            <input
                                                onChange={handleAmountInput}
                                                aria-invalid="false"
                                                type="tel"
                                                className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart"
                                                value={amount}
                                            />
                                        </div>
                                        <p className="MuiFormHelperText-root">
                                            Min: 10, Max: 20000
                                        </p>
                                    </div>
                                </div>
                                <div className="games-window">
                                    {funds.map((fund, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="gameCard-container"
                                                onClick={() => setAmount(fund)}
                                            >
                                                <div className="add-fund-box">
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "baseline",
                                                        }}
                                                    >
                                                        <div
                                                            className="collapseCard-title mr-1"
                                                            style={{
                                                                fontSize:
                                                                    "0.9em",
                                                            }}
                                                        >
                                                            ₹
                                                        </div>
                                                        <div
                                                            className="collapseCard-title"
                                                            style={{
                                                                fontSize:
                                                                    "1.5em",
                                                            }}
                                                        >
                                                            {fund}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="refer-footer">
                                <button
                                    onClick={handleNextClick}
                                    type="button"
                                    disabled={!amount}
                                    className={`refer-button cxy w-100 next-btn-bg`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div
                                className="px-4 py-3 d-flex justify-content-center flex-column"
                                style={{ height: "60px" }}
                            >
                                <div className="d-flex align-items-center">
                                    <div className="games-section-title">
                                        Amount to be added ₹{amount}
                                    </div>
                                    <button
                                        onClick={handleEditAmount}
                                        className="btn btn-sm btn-info position-absolute"
                                        style={{
                                            right: "1.5rem",
                                            fontWeight: "600",
                                            fontSize: "0.75em",
                                        }}
                                    >
                                        EDIT
                                    </button>
                                </div>
                            </div>
                            <div className="divider-x w-100"></div>
                            <div className="px-4 py-3">
                                <div
                                    className="d-flex flex-column"
                                    id="drop_in_container"
                                ></div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(AddFunds);
