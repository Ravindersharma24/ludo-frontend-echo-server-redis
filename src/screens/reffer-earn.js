import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import { toast } from "react-toastify";
import Loading from "../HOC/Loading";
import {
    WhatsappShareButton,
    FacebookIcon,
    WhatsappIcon,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";

function Reffer() {
    const user = useSelector((state) => state.user.details);
    useEffect(() => {
        document.title =
            "Refer and Earn | Referral Program for influencers - JJLudo";
    }, []);
    const handleCopyCode = () => {
        navigator.clipboard.writeText(
            ` https://www.jjludo.com/login/${user.affiliateId}`
            // `http://localhost:3000/login/${user.affiliateId}`
        );
        toast.success("Refer Code Copied!", {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <div className="center-xy">
                        <picture className="mt-1">
                            <img
                                width="226px"
                                src={`${process.env.PUBLIC_URL}/img/referral-user-welcome.png`}
                                alt=""
                            />
                        </picture>
                        <div className="mb-1">
                            <div className="font-15">
                                Earn Unlimited Now
                                <span role="img" aria-label="party-face">
                                    🥳
                                </span>
                            </div>
                            <div className="d-flex justify-content-center">
                                Refer your friends now!
                            </div>
                            <div className="mt-3 text-center">
                                Your Refer Code: <b>{user.affiliateId}</b>
                            </div>
                            <div className="d-flex justify-content-center">
                                Total Refers:&nbsp;
                                <b>
                                    {" "}
                                    {user.totalRefers ? user.totalRefers : 0}
                                </b>
                            </div>
                            <div className="d-flex justify-content-center">
                                Refer earning:&nbsp;
                                <b> {user.refer_cash ? user.refer_cash : 0}</b>
                            </div>
                        </div>
                    </div>
                    <div className="divider-x"></div>
                    <div className="mx-3 my-3">
                        <div className="font-11">Refer &amp; Earn Rules</div>
                        <div className="d-flex align-items-center m-3">
                            <picture>
                                <img
                                    width="82px"
                                    src={`${process.env.PUBLIC_URL}/img/referral-signup-bonus-new.png`}
                                    alt=""
                                />
                            </picture>
                            <div
                                className="font-9 mx-3"
                                style={{ width: "63%" }}
                            >
                                <div>
                                    When your friend signs up on jj ludo from
                                    your referral link,
                                </div>
                                <div className="font-8 c-green mt-2">
                                    You get{" "}
                                    <strong>
                                        {parseFloat(
                                            user.refer_commission_percentage
                                        )}
                                        % Commission
                                    </strong>{" "}
                                    on your
                                    <strong> referral's winnings.</strong>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center m-3">
                            <picture>
                                <img
                                    width="82px"
                                    src={`${process.env.PUBLIC_URL}/img/banner_illsutration.png`}
                                    alt=""
                                />
                            </picture>
                            <div
                                className="font-9 mx-3"
                                style={{ width: "63%" }}
                            >
                                <div>
                                    Suppose your referral plays a battle for
                                    ₹10000 Cash,
                                </div>
                                <div className="font-8 c-green mt-2">
                                    You get{" "}
                                    <strong>
                                        ₹
                                        {10000 *
                                            (parseFloat(
                                                user.refer_commission_percentage
                                            ) /
                                                100)}{" "}
                                        Cash
                                    </strong>{" "}
                                    <strong></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ paddingBottom: "80px" }}></div>
                    <div className="refer-footer">
                        <WhatsappShareButton
                            url={`Play ludo and earn ₹10000 daily Register https://www.jjludo.com/login/${user.affiliateId} Now With My Refer Code ${user.affiliateId}`}
                            quote={"CampersTribe - World is yours to explore"}
                            hashtag="#camperstribe"
                            target="_blank"
                        >
                            <WhatsappIcon
                                size={45}
                                style={{ borderRadius: "10px" }}
                            />
                        </WhatsappShareButton>
                        <FacebookShareButton
                            url={`https://www.jjludo.com/login/${user.affiliateId}`}
                        >
                            <FacebookIcon
                                size={45}
                                style={{ borderRadius: "10px" }}
                            />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={`Play ludo and earn ₹10000 daily Register https://www.jjludo.com/login/${user.affiliateId} Now With My Refer Code ${user.affiliateId}`}
                            quote={"CampersTribe - World is yours to explore"}
                            hashtag="#camperstribe"
                        >
                            <TwitterIcon
                                size={45}
                                style={{ borderRadius: "10px" }}
                            />
                        </TwitterShareButton>
                        <button
                            onClick={handleCopyCode}
                            className="refer-button-copy d-flex"
                        >
                            <picture>
                                <img
                                    height="18px"
                                    width="18px"
                                    src={`${process.env.PUBLIC_URL}/img/global-copy-grey.png`}
                                    alt=""
                                />
                            </picture>
                        </button>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(Reffer);
