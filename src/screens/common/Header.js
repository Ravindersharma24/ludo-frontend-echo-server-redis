import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSideBarStatus } from "../../store/ui";
import Pwainstall from "./installPwaButton";
import { useState } from "react";
import { useEffect } from "react";
function Header() {
    const user = useSelector((state) => state.user.details);
    const dispatch = useDispatch();
    // const [deferredPrompt, setDeferredPrompt] = useState(null);
    useEffect(() => {}, []);
    return (
        <>
            <div className="headerContainer">
                {user.isAuthenticated === true ? (
                    <>
                        {" "}
                        <span
                            onClick={() => dispatch(changeSideBarStatus())}
                            className="cxy h-100"
                        >
                            <picture className="sideNavIcon mr-2 ml-2">
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/header-hamburger.png`}
                                    alt=""
                                />
                            </picture>
                        </span>
                    </>
                ) : (
                    <></>
                )}
                <Link to="/">
                    <picture className="ml-1 navLogo d-flex">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/jjludo.png`}
                            alt=""
                        />
                    </picture>
                </Link>
                {user.isAuthenticated === true ? (
                    <div className="menu-items">
                        <Link
                            className="box"
                            to="/add-funds"
                            style={{ marginRight: "5px" }}
                        >
                            <picture className="moneyIcon-container">
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                    alt=""
                                    width="20"
                                />
                            </picture>
                            <div className="mt-1 ml-1">
                                <div className="moneyBox-header">Cash</div>
                                <div className="moneyBox-text">
                                    {user.walletBalance + user.winningCash}
                                </div>
                            </div>
                            <picture className="moneyBox-add">
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/global-addSign.png`}
                                    alt=""
                                />
                            </picture>
                        </Link>

                        <Link className="box" to="/refer">
                            <picture className="moneyIcon-container">
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/money-bag-icon.png`}
                                    alt=""
                                    width="14"
                                />
                            </picture>
                            <div className="mt-1 ml-1">
                                <div className="moneyBox-header">Referral</div>
                                <div className="moneyBox-text">
                                    {user.refer_cash ? user.refer_cash : 0}
                                </div>
                            </div>
                            <picture className="moneyBox-add">
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/global-addSign.png`}
                                    alt=""
                                />
                            </picture>
                        </Link>
                    </div>
                ) : (
                    <div className="menu-items">
                        <Link className="login-btn" to="/login">
                            SIGN UP
                        </Link>
                        <Link className="login-btn" to="/login">
                            LOGIN
                        </Link>
                    </div>
                )}
                <span className="mx-5"></span>
            </div>
        </>
    );
}

export default Header;
