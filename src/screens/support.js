import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import Loading from "../HOC/Loading";
import { useEffect } from "react";
import { TelegramIcon, TelegramShareButton, WhatsappIcon } from "react-share";
import { Icon } from "@mui/material";



function Support() {
    useEffect(() => {
        document.title = "24x7 Helpdesk | JJLudo";
    }, []);
    let image = `${process.env.PUBLIC_URL}/img/logo.png`;
    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <div
                        className="cxy flex-column mx-4"
                        style={{ marginTop: "70px" }}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/contact_us.png`}
                            width="280px"
                            alt=""
                        />
                        <div
                            className="games-section-title mt-4"
                            style={{ fontSize: "1.2em" }}
                        >
                            Contact us at below platforms.
                        </div>
                        {/* <a
                            target="_blank"
                            href="https://telegram.me/SachinSharma990"
                        >
                            <TelegramIcon
                                width="45"
                                height="45"
                                style={{
                                    borderRadius: "50%",
                                    marginTop: "10px",
                                }}
                            ></TelegramIcon>
                        </a> */}
                        <a
                            href="https://wa.me/919024646060"
                            class="whatsapp_float"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsappIcon
                                width="45"
                                height="45"
                                style={{
                                    borderRadius: "50%",
                                    marginTop: "10px",
                                }}
                            ></WhatsappIcon>
                            <p>Whatsapp</p>
                        </a>
                        {/* <span className="font-9 mt-3 mb-2">Or</span> */}
                        <div className="mt-2 d-flex justify-content-around w-80">
                            <a
                                className="cxy flex-column"
                                href="mailto:support@jjludo.com"
                            >
                                <img
                                    width="50px"
                                    src={`${process.env.PUBLIC_URL}/img/mail1.png`}
                                    alt=""
                                />
                                <span className="footer-text-bold">
                                    {" "}
                                    support@jjludo.com{" "}
                                </span>
                            </a>
                        </div>
                        <p>Phone-: <a href="tel:+919024646060">9024646060</a></p>

                        {/* <div class="col-12 my-2 text-center font-weight-bold">
                            <a class="cxy flex-column" href="#">
                                <span class="footer-text-bold">
                                    <a href="tel:01413137991">01413137991 </a>
                                    <a href="tel:9521575292">9521575292</a>
                                </span>
                                <span class="footer-text-bold">
                                    Mama shakuni gaming private limited
                                </span>
                                <span class="footer-text-bold">
                                    S-24 alankar plaza center spine vidhyadhar
                                    nagar jaipur 302039
                                </span>
                            </a>
                        </div> */}
                    </div>


                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(Support);
