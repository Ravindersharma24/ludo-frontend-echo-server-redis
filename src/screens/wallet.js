import { Link } from "react-router-dom";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../HOC/Loading";
import { useEffect } from "react";
function Wallet() {
    const user = useSelector((state) => state.user.details);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Wallet | JJLudo";
    }, []);
    const handleLink = (link) => {
        link && navigate(link);
    };
    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <div className="p-4 bg-light">
                        <span
                            className="d-flex align-items-center profile-wallet undefined"
                            onClick={() => handleLink("/transaction-history")}
                        >
                            <picture className="ml-4">
                                <img
                                    width="32px"
                                    src={`${process.env.PUBLIC_URL}/img/order-history.png`}
                                    alt=""
                                />
                            </picture>
                            <div className="ml-5 mytext text-muted">
                                Order History
                            </div>
                        </span>
                    </div>
                    <div className="divider-x"></div>
                    <div className="p-4 bg-light">
                        <div
                            className="wallet-card"
                            style={{
                                backgroundColor: "rgb(71, 130, 244)",
                                backgroundImage:
                                    "url('/img/bg-wallets-deposit.png')",
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <picture className="mr-1">
                                    <img
                                        height="26px"
                                        width="26px"
                                        src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                        alt=""
                                    />
                                </picture>
                                <span
                                    className="text-white"
                                    style={{
                                        fontSize: "1.1em",
                                        fontWeight: 900,
                                    }}
                                >
                                    ₹{user.depositeCash}
                                </span>
                            </div>
                            <div
                                className="text-white text-uppercase"
                                style={{ fontSize: "0.9em", fontWeight: 800 }}
                            >
                                Deposit Cash
                            </div>
                            <div
                                className="mt-5"
                                style={{
                                    fontSize: "1em",
                                    color: "rgb(191, 211, 255)",
                                }}
                            >
                                Can be used to play Tournaments &amp; Battles.
                                <br />
                                Cannot be withdrawn to Paytm or Bank.
                            </div>
                            <Link
                                to={"/add-funds"}
                                className="walletCard-btn d-flex justify-content-center align-items-center text-uppercase"
                            >
                                Add Cash
                            </Link>
                        </div>
                        <div
                            className="wallet-card"
                            style={{
                                backgroundColor: "rgb(127, 153, 255)",
                                backgroundImage:
                                    "url('/img/bg-wallets-winnings.png')",
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <picture className="mr-1">
                                    <img
                                        height="26px"
                                        width="26px"
                                        src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                        alt=""
                                    />
                                </picture>
                                <span
                                    className="text-white"
                                    style={{
                                        fontSize: "1.1em",
                                        fontWeight: 900,
                                    }}
                                >
                                    ₹{user.winningCash}
                                </span>
                            </div>
                            <div
                                className="text-white text-uppercase"
                                style={{ fontSize: "0.9em", fontWeight: 800 }}
                            >
                                Winnings Cash
                            </div>
                            <div
                                className="mt-5"
                                style={{
                                    fontSize: "1em",
                                    color: "rgb(216, 224, 255)",
                                }}
                            >
                                Can be withdrawn to Paytm or Bank. Can be used
                                to play Tournaments &amp; Battles.
                            </div>
                            <Link
                                to={"/withdraw-funds"}
                                className="walletCard-btn d-flex justify-content-center align-items-center text-uppercase"
                            >
                                Withdraw
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(Wallet);
