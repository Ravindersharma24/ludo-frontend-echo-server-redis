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
import { loadGamesHistory } from "../store/gameHistory";
import Loading from "../HOC/Loading";
import { useParams } from "react-router-dom";
function GameHistory() {
    const gameHistory = useSelector((state) => state.game_history.list);
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "Game History | JJLudo";
        dispatch(loadGamesHistory());
    }, []);
    return (
        <>
            <SideNav />
            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    {gameHistory.map((history, i) => {
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
                                                {history?.transaction_type ==
                                                3 ? (
                                                    <h4>
                                                        Won against{" "}
                                                        <b
                                                            style={{
                                                                fontWeight:
                                                                    "700",
                                                            }}
                                                        >
                                                            {
                                                                history?.opposition_player
                                                            }
                                                        </b>
                                                    </h4>
                                                ) : history?.transaction_type ==
                                                4 ? (
                                                    <h4>
                                                        Lost against{" "}
                                                        <b
                                                            style={{
                                                                fontWeight:
                                                                    "700",
                                                            }}
                                                        >
                                                            {
                                                                history?.opposition_player
                                                            }
                                                        </b>
                                                    </h4>
                                                ) : (<h4>
                                                    Penalty{" "}
                                                </h4>)}
                                                <p>
                                                    Battle ID:{" "}
                                                    {history?.battle_id}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="money">
                                            <div>
                                                {history?.transaction_type ==
                                                3 ? (
                                                    <span className="positive">
                                                        (+)
                                                    </span>
                                                ) : (
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
                                </ul>
                            </div>
                        );
                    })}
                    {gameHistory.length == 0 ? (
                        <>
                            <h3
                                className="pt-5"
                                style={{ textAlign: "center" }}
                            >
                                No Games Played Yet!
                            </h3>
                            <p style={{ textAlign: "center" }}>
                                Seems like you havn't played any game yet.
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

export default Loading(GameHistory);
