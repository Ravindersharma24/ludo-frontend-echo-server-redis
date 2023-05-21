import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RedeemReferralFunds } from "../store/redeem-referral-fund";
import { checkAuth } from "../store/user";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";

function Refer() {
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.details);
    const canRedeem = () => {
        // console.log(
        //     "true--",
        //     user.refer_cash >= parseFloat(user?.refer_reedem_limit)
        // );
        return (
            user.kyc == 1 &&
            user.refer_cash >= parseFloat(user?.refer_reedem_limit)
        );
    };
    const handleAmountInput = (e) => {
        const re = /^[0-9\b]+$/;
        let inputAmount = parseInt(e.target.value);
        if (!re.test(inputAmount) && inputAmount !== "") return;

        if (inputAmount > 1000) inputAmount = 1000;

        setAmount(inputAmount);
    };
    const handleRedeem = () => {
        // console.log("func called--",Object.keys(formErrors).length);
        dispatch(
            RedeemReferralFunds({ refer_amount: amount }, (dispatch, res) => {
                if (res?.success || res?.success === "pending") {
                    dispatch(checkAuth());
                    navigate("/");
                }
            })
        );
    };
    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="mt-5 py-4 px-3">
                    <div className="games-section mt-2">
                        <div className="games-section-title">
                            Redeem your refer balance
                        </div>
                        <div
                            className="games-section-headline mt-2"
                            style={{ fontSize: "0.85em" }}
                        >
                            TDS (0%) will be deducted after annual referral
                            earning of ₹15,000.
                        </div>
                    </div>
                    <div className="games-section-headline mt-2">
                        Enter Amount (Min: 100, Max: 10000)
                    </div>
                    <div>
                        <div
                            className="MuiFormControl-root MuiTextField-root mt-4 "
                            style={{ width: "100%" }}
                        >
                            <input
                                className="w3-input input"
                                type="number"
                                placeholder="Enter Amount"
                                defaultValue={amount}
                                onChange={handleAmountInput}
                                style={{
                                    width: "100%",
                                    transition: "all .5s ease",
                                    padding: "8px",
                                    display: "block",
                                    border: "none",
                                    borderBottom: "1px solid #ccc",
                                }}
                            />
                            <small className="text-warning">
                                Minimum withdrawal amount ₹
                                {parseFloat(user?.refer_reedem_limit)}
                            </small>
                            <p className="MuiFormHelperText-root">
                                Money will be added to JJLudo cash.
                            </p>
                        </div>

                        {!canRedeem() ? (
                            <button
                                className="refer-button cxy  mt-5"
                                style={
                                    !canRedeem()
                                        ? {
                                              backgrounColor: "grey",
                                              color: "grey",
                                          }
                                        : {}
                                }
                            >
                                Redeem
                            </button>
                        ) : (
                            <button
                                className="refer-button cxy  bg-primary mt-5"
                                onClick={handleRedeem}
                            >
                                Redeem
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}
export default Refer;
