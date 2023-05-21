import { useSelector, useDispatch } from "react-redux";
import { changeSideBarStatus } from "../../store/ui";
import { useNavigate } from "react-router-dom";
function SideNav() {
    const ui = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.details);

    const handleLink = (link) => {
        dispatch(changeSideBarStatus());
        link && navigate(link);
    };
    return (
        <>
            <div
                onClick={() => dispatch(changeSideBarStatus())}
                className={ui.sideBarOpen ? "sideNav-overlay" : ""}
            ></div>
            <div
                className={ui.sideBarOpen ? "sideNav sideNav-open" : "sideNav"}
            >
                <span
                    className="sideNav-options"
                    onClick={() => handleLink("/profile")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className="border-50"
                            src={`${process.env.REACT_APP_ASSETS_PATH}user-profiles/${user.profileImage}`}
                            alt="My Profile"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">My Profile</div>
                    </div>
                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span>
                <span
                    className="sideNav-options"
                    onClick={() => handleLink("/")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className=""
                            src={`${process.env.PUBLIC_URL}/img/gamepad.png`}
                            alt="Win Cash"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">Win Cash</div>
                    </div>
                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span>
                <span
                    className="sideNav-options"
                    onClick={() => handleLink("/wallet")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className=""
                            src={`${process.env.PUBLIC_URL}/img/sidebar-wallet.png`}
                            alt="My Wallet"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">My Wallet</div>
                    </div>
                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span>
                <span
                    className="sideNav-options"
                    onClick={() => handleLink("/game-history")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className=""
                            src={`${process.env.PUBLIC_URL}/img/sidebar-gamesHistory.png`}
                            alt="Games History"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">Games History</div>
                    </div>
                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span>
                <span
                    className="sideNav-options"
                    onClick={() => handleLink("/transaction-history")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className=""
                            src={`${process.env.PUBLIC_URL}/img/order-history.png`}
                            alt="Transaction History"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">Transaction History</div>
                    </div>

                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span>

                <span
                    className="sideNav-options"
                    onClick={() => handleLink("/refer-history")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className=""
                            src={`${process.env.PUBLIC_URL}/img/sidebar-referEarn.png`}
                            alt="Transaction History"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">Refer History</div>
                    </div>

                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span>

                <span
                    className="sideNav-options"
                    onClick={() => handleLink("/refer-earn")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className=""
                            src={`${process.env.PUBLIC_URL}/img/sidebar-referEarn.png`}
                            alt="Refer &amp; Earn"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">Refer &amp; Earn</div>
                    </div>
                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span>
                {/* <span
                    className="sideNav-options"
                    onClick={() => handleLink("/notifications")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className=""
                            src={`${process.env.PUBLIC_URL}/img/sidebar-notifications.png`}
                            alt="Notification"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">Notification</div>
                    </div>
                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span> */}
                <span
                    className="sideNav-options"
                    onClick={() => handleLink("/support")}
                >
                    <picture className="sideNav-icon">
                        <img
                            className=""
                            src={`${process.env.PUBLIC_URL}/img/sidebar-support.png`}
                            alt="Support"
                        />
                    </picture>
                    <div className="position-relative ml-3">
                        <div className="sideNav-text">Support</div>
                    </div>
                    <picture className="sideNav-arrow">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-black-chevronRight.png`}
                            alt=""
                        />
                    </picture>
                    <div className="sideNav-divider"></div>
                </span>
            </div>
        </>
    );
}

export default SideNav;
