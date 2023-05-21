import { useEffect } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { loadReferHistory } from "../store/referHistory";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";

function ReferHistory() {
    const referHistory = useSelector((state) => {
        return state.refer_history.list;
    });
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "Refer History | JJLudo";
        dispatch(loadReferHistory());
    }, []);
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    {referHistory.map((history, i) => {
                        return (
                            <div key={i} className="transition-details">
                                <ul>
                                    <li className="order">
                                        <div className="date-and-time">
                                            <strong>
                                                <Moment format="DD MMM YY">
                                                    {history?.date}
                                                </Moment>
                                            </strong>
                                            <span>
                                                <Moment format="hh:mm A">
                                                    {history?.date}
                                                </Moment>
                                            </span>
                                        </div>
                                        <div className="order-details">
                                            <div className="details">
                                                <p>
                                                    Referral Transactin ID:{" "}
                                                    {history?.order_id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="money">
                                            <div>
                                                {history?.transaction_type !=
                                                2 ? (
                                                    <span className="positive">
                                                        (+)
                                                    </span>
                                                ) : (
                                                    <>
                                                        {" "}
                                                        {/* <span className="negative">
                                                            Redeemed To Wallet
                                                        </span> */}
                                                        <span className="negative">
                                                            (-)
                                                        </span>
                                                    </>
                                                )}
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                                    alt=""
                                                />{" "}
                                                {history?.referral_amount}
                                            </div>
                                            <p>
                                                Closing Referral Balance:{" "}
                                                {
                                                    history?.referral_closing_balance
                                                }
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        );
                    })}
                    {referHistory.length == 0 ? (
                        <>
                            <h3
                                className="pt-5"
                                style={{ textAlign: "center" }}
                            >
                                No Refer Earing Yet!
                            </h3>
                            <p style={{ textAlign: "center" }}>
                                Seems like you havn't referred anyone yet.
                            </p>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <RightContainer />
        </>
    );
}
export default ReferHistory;
