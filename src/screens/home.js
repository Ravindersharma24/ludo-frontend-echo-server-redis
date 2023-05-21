import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { loadAllGames } from "../store/games";
import Loading from "../HOC/Loading";
import PwaInstall from "./common/installPwaButton";
function Home() {
    const games = useSelector((state) => state.games);
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.setItem('test', true);
        document.title = "Play Games Online and Earn Money | JJLudo";
        dispatch(loadAllGames());
    }, []);
    const showDropdownLinks = () => {
        let dropdownImg = document.getElementById("dropdownImg");
        let hiddenSec = document.getElementById("hiddenSection");
        let termsSpan = document.getElementById("termsHtml");
        dropdownImg.classList.toggle("activedropDown");
        if (dropdownImg.classList.contains("activedropDown")) {
            termsSpan.style.display = "none";
            hiddenSec.style.height = "110px";
        } else {
            termsSpan.style.display = "inline-block";
            hiddenSec.style.height = "0px";
        }
    };
    return (
        <>
            <PwaInstall></PwaInstall>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <marquee className="mt-2">
                        <h6 className="d-none  text-danger d-block text-center">
                            ◉ महत्वपूर्ण सूचना: JJLudo से संबंधित किसी भी समस्या
                            के लिए आप हमसे इस 9988998899 मोबाइल नंबर पर संपर्क
                            कर सकते हैं। संपर्क करने का समय सुबह 10 बजे से श्याम
                            6 बजे तक। अन्य किसी भी नंबर से समस्या का हल नहीं
                            होगा।
                        </h6>
                    </marquee>
                    <section className="games-section p-3">
                        <div className="d-flex align-items-center games-section-title">
                            Our Games
                        </div>
                        <div className="games-section-headline mt-2 mb-1">
                            <img
                                src={`${process.env.PUBLIC_URL}/img/global-purple-battleIcon.png`}
                                alt=""
                            />{" "}
                            is for Battles and
                            <img
                                className="ml-1"
                                src={`${process.env.PUBLIC_URL}/img/global-blue-tournamentIcon.png`}
                                alt=""
                            />
                            is for Tournaments. <span>Know more here.</span>
                            <div className="games-window">
                                {games.list.map((game, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="gameCard-container"
                                        >
                                            <span className="blink text-danger d-block text-right">
                                                ◉ LIVE
                                            </span>
                                            <Link
                                                className="gameCard"
                                                to={`lobby/${game.id}`}
                                            >
                                                <picture className="gameCard-image">
                                                    <img
                                                        width="100%"
                                                        src={`${process.env.REACT_APP_ASSETS_PATH}game_listing/${game.image}`}
                                                        alt=""
                                                    />
                                                </picture>
                                                <div className="gameCard-title">
                                                    {game.name}
                                                </div>
                                                <picture className="gameCard-icon">
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/img/global-battleIconWhiteStroke.png`}
                                                        alt=""
                                                    />
                                                </picture>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                    <section className="footer">
                        <div className="footer-divider"></div>
                        <Link
                            className="px-3 py-4 d-block"
                            to="#!"
                            onClick={showDropdownLinks}
                            style={{
                                textDecoration: "none",
                                position: "relative",
                            }}
                        >
                            <picture className="">
                                <img
                                    width="100"
                                    src={`${process.env.PUBLIC_URL}/img/logo_h.png`}
                                    alt=""
                                />
                            </picture>
                            <span
                                id="termsHtml"
                                style={{
                                    color: "rgb(149, 149, 149)",
                                    fontSize: "0.8em",
                                    fontWeight: 400,
                                    display: "inline-block",
                                    marginLeft: "10px",
                                }}
                            >
                                Terms, Privacy, Support
                            </span>
                            <picture className="footer-arrow">
                                <img
                                    id="dropdownImg"
                                    width="21px"
                                    src={`${process.env.PUBLIC_URL}/img/global-grey-dropDown.png`}
                                    alt=""
                                />
                            </picture>
                        </Link>
                        <div
                            className="px-3 overflow-hidden"
                            id="hiddenSection"
                            style={{
                                height: "0px",
                                transition: "height 0.5s ease 0s",
                            }}
                        >
                            <div className="row footer-links">
                                <Link className="col-6" to="/terms-conditions">
                                    Terms &amp; Condition
                                </Link>
                                <Link className="col-6" to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                                <Link className="col-6" to="/refund-policy">
                                    Refund/Cancellation Policy
                                </Link>
                                <Link className="col-6" to="/support">
                                    Contact Us
                                </Link>
                                <Link
                                    className="col-6"
                                    to="/responsible-gaming"
                                >
                                    Responsible Gaming
                                </Link>
                            </div>
                        </div>
                        <div className="footer-divider"></div>
                        <div className="px-3 py-4 pb-5">
                            <h6 className="footer-text-bold">About Us</h6>
                            <p className="footer-text">
                                JJ Ludo is a real-money gaming product owned and
                                operated by Gazick Private Limited ("JJ Ludo" or
                                "We" or "Us" or "Our").
                            </p>
                            <h6 className="footer-text-bold">
                                Our Business &amp; Products
                            </h6>
                            <p className="footer-text">
                                We are an HTML5 game-publishing company and our
                                mission is to make accessing games fast and easy
                                by removing the friction of app-installs.
                            </p>
                            <p className="footer-text">
                                JJ Ludo is a skill-based real-money gaming
                                platform accessible only for our users in India.
                                It is accessible on &nbsp;
                                <Link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    to="/"
                                >
                                    https://www.jjludo.com
                                </Link>
                                . On JJ Ludo, users can compete for real cash in
                                Tournaments and Battles. They can encash their
                                winnings via popular options such as Paytm
                                Wallet, Amazon Pay, Bank Transfer, Mobile
                                Recharges etc.
                            </p>
                            <h6 className="footer-text-bold">Our Games</h6>
                            <p className="footer-text">
                                JJ Ludo has a wide-variety of high-quality,
                                premium HTML5 games. Our games are especially
                                compressed and optimised to work on low-end
                                devices, uncommon browsers, and patchy internet
                                speeds.
                            </p>
                            <p className="footer-text">
                                We have games across several popular categories:
                                Arcade, Action, Adventure, Sports &amp; Racing,
                                Strategy, Puzzle &amp; Logic. We also have a
                                strong portfolio of multiplayer games such as
                                Ludo, Chess, 8 Ball Pool, Carrom, Tic Tac Toe,
                                Archery, Quiz, Chinese Checkers and more! Some
                                of our popular titles are: Escape Run, Bubble
                                Wipeout, Tower Twist, Cricket Gunda, Ludo With
                                Friends. If you have any suggestions around new
                                games that we should add or if you are a game
                                developer yourself and want to work with us,
                                don't hesitate to drop in a line at &nbsp;
                                <a href="mailto:support@jjludo.com">
                                    support@jjludo.com
                                </a>
                                !
                            </p>
                        </div>
                    </section>
                    <div className="kyc-select">
                        <div className="overlay"></div>
                        <div
                            className="box"
                            style={{ bottom: "0px", position: "absolute" }}
                        >
                            <div className="bg-white">
                                <div
                                    className="header"
                                    style={{ borderBottom: "unset" }}
                                >
                                    <div className="d-flex position-relative align-items-center">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/img/global-ytPlayIcon.png`}
                                            width="20px"
                                            alt=""
                                        />
                                        <div className="games-section-title ml-3">
                                            How to play on JJ Ludo?
                                        </div>
                                        <span
                                            className="position-absolute font-weight-bold cxy"
                                            style={{
                                                right: "5px",
                                                height: "40px",
                                                width: "40px",
                                            }}
                                        >
                                            X
                                        </span>
                                    </div>
                                    <div className="tutorialVideo">
                                        <div
                                            id="tabNav-1"
                                            className="tab tabActive"
                                        >
                                            <span>Hindi</span>
                                            <div className="selectedLine"></div>
                                        </div>
                                        <div id="tabNav-2" className="tab">
                                            <span>English</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        paddingTop: "150px",
                                        paddingBottom: "60px",
                                    }}
                                >
                                    <div className="embed-responsive embed-responsive-16by9"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(Home);
