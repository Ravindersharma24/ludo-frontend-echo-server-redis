import { Link } from "react-router-dom";
function RightContainer() {
    return (
        <>
            <div className="divider-y"></div>
            <div className="rightContainer">
                <div className="rcBanner flex-center">
                    <picture className="rcBanner-img-container">
                        <img
                            src={`${process.env.PUBLIC_URL}/img/jjludo.png`}
                            alt=""
                        />
                    </picture>
                    <div className="rcBanner-footer">
                        For best experience, open&nbsp;
                        <Link
                            to="/"
                            style={{
                                color: "##007bff",
                                fontWeight: 500,
                                textDecoration: "none",
                            }}
                        >
                            jjludo.com
                        </Link>
                        &nbsp;on&nbsp;
                        <img
                            src={`${process.env.PUBLIC_URL}/img/global-chrome.png`}
                            alt=""
                        />
                        &nbsp;chrome mobile
                    </div>
                </div>
            </div>
        </>
    );
}

export default RightContainer;
