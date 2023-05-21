import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../HOC/Loading";
import { loadTransactionHistory } from "../store/transactionHistory";
function TransactionHistory() {
    const transactionHistory = useSelector(
        (state) => state.transaction_history.list
    );
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "Transaction History | JJLudo";
        dispatch(loadTransactionHistory());
    }, []);
    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <div className="transition-details">
                        <ul>
                            {transactionHistory.map((history, i) => {
                                return (
                                    <li key={i} className="order">
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
                                                {history?.dr_cr != 0 ? (
                                                    <h4> {history?.status == 0 ? 'Amount Pending To Add' : history?.status == 1 ? 'Added Cash Amount' : history?.status == 2 ? 'Rejected Add Request' : 'Failed To Add Amount'}</h4>
                                                ) : (
                                                    <h4>
                                                        {history?.status == 0 ? 'Pending Withdrawal Amount' : history?.status == 1 ? 'Withdrawal Cash Amount' : history?.status == 2 ? 'Withdrawal Rejected' : 'Failed To Withdraw Amount'}
                                                    </h4>
                                                )}
                                                <p>
                                                    Order ID:{" "}
                                                    <span>
                                                        {history?.order_id}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="money">
                                            <div className="data">
                                                {history.dr_cr != 0 ? (
                                                    <span className="positive">
                                                        (+)
                                                    </span>
                                                )
                                                : history.dr_cr == 0 && history?.status == 2 ? (
                                                    <span className="positive">
                                                        (+)
                                                    </span>
                                                )
                                                : (
                                                    <span className="negative">
                                                        (-)
                                                    </span>
                                                )}
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                                    alt=""
                                                />{" "}
                                                {history?.transaction_amount}
                                            </div>
                                            <p>
                                                closing Balance:{" "}
                                                {history?.closing_balance}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {transactionHistory.length == 0 ? (
                        <>
                            <h3
                                className="pt-5"
                                style={{ textAlign: "center" }}
                            >
                                No transaction Yet!
                            </h3>
                            <p style={{ textAlign: "center" }}>
                                Seems like you haven't done any activity yet.
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

export default Loading(TransactionHistory);
