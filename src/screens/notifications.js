import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import Loading from "../HOC/Loading";
import { useEffect } from "react";

function Notifications() {
    useEffect(() => {
        document.title = "Notificaitons | JJLudo";
    }, []);
    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <div
                        className="cxy flex-column px-4 text-center"
                        style={{ marginTop: "70px" }}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/img/nonotification.png`}
                            width="220px"
                            alt=""
                        />
                        <div
                            className="games-section-title mt-4"
                            style={{ fontSize: "1.2em" }}
                        >
                            No notification yet!
                        </div>
                        <div
                            className="games-section-headline mt-2"
                            style={{ fontSize: "0.85em" }}
                        >
                            Seems like you haven’t done any activity yet
                        </div>
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(Notifications);
