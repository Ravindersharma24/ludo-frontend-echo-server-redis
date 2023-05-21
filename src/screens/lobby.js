import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    addBattle,
    addNewBattle,
    deleteBattle,
    liveBattles,
    loadAllBattles,
    rejectBtl,
    setWaitingStatus,
} from "../store/lobby";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    createRoom,
    roomCodeGenerated,
    roomCodeWaiting,
    roomCreated,
} from "../store/room";
import { toast } from "react-toastify";

function Lobby() {
    const user = useSelector((state) => state.user.details);
    const battles = useSelector((state) => state.battles);
    const [joinedPlayer, setJoinedPlayer] = useState({
        photo: "",
        name: "",
    });
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [battleAmount, setBattleAmount] = useState();

    useEffect(() => {
        dispatch(loadAllBattles(id));
        // dispatch(liveBtl(id));
        // const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
        //     cluster: "ap2",
        // });
        // const channel = pusher.subscribe("channel-khello");
        window.echo
            .channel("channel-khello").listen(`.waiting-status-changed`, data => {
                        // console.warn("status-changed", data);
                // channel.bind(`waiting-status-changed`, function (data) {
                if (data?.data?.oppPlayerImage && data?.data?.oppPlayerName) {
                    setJoinedPlayer({
                        ...joinedPlayer,
                        photo: data?.data?.oppPlayerImage,
                        name: data?.data?.oppPlayerName,
                    });
                }
                dispatch(setWaitingStatus(data?.data));
                // dispatch(loadAllBattles(id));
            });
        window.echo
            .channel("channel-khello").listen(`.live-battles-${id}`, data => {
                        // console.warn("live-battle", data);
                // channel.bind(`live-battles`, function (data) {
                dispatch(liveBattles(data));
            });
        window.echo
            .channel("channel-khello").listen(`.latest-battles-${id}`, data => {
                        // console.warn("latest-battles", data);
                // channel.bind(`latest-battles`, function (data) {
                dispatch(addNewBattle(data.data));
            });
        return () => {
            window.echo.leave("channel-khello");
            // pusher.unsubscribe("channel-khello");
        };
    }, []);
    const handleBattleAmount = (e) => {
        setBattleAmount(e.target.value);
    };
    const storeBattleId = (battle_id) => {
        // localStorage.setItem("battle_id", battle_id);
    };
    const deleteGameBattle = (battleId) => {
        dispatch(
            deleteBattle({
                battle_id: battleId,
                game_id: id,
            })
        );
    };
    const createBattle = () => {
        dispatch(
            addBattle({
                game_id: id,
                entry_fees: battleAmount,
            })
        );
        setBattleAmount("");
    };
    const handleRejectBattle = (battle_id) => {
        // localStorage.removeItem("roomDetails");
        dispatch(
            rejectBtl({
                battle_id: battle_id,
            })
        );
        // dispatch(loadAllBattles(id));
    };
    const handleGameEntry = (battle) => {
        // localStorage.removeItem("roomDetails");
        if (+user.walletBalance + user.winningCash < battle.entry_fees) {
            const message = "Not Sufficient Balance!";
            toast.error(message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        dispatch(
            createRoom(
                { game_id: id, battle_id: battle.id },
                (dispatch, res) => {
                    dispatch(roomCodeGenerated());
                    if (res.roomCode) {
                        dispatch(roomCreated(res));
                        localStorage.setItem(
                            "roomDetails",
                            `{"roomId": "${res.roomId}", "roomCode": "${res.roomCode}"}`
                        );
                    } else if (res.roomCodeWaiting) {
                        dispatch(roomCodeWaiting());
                    }
                    navigate(`/game-room/${battle?.id}`, {
                        state: { game_id: id, battle_id: battle.id },
                    });
                }
            )
        );
    };

    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    <div className="mb-2">
                        <span
                            className="Home_battleInputHeader"
                            style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            Create a Battle
                        </span>
                        <div className="mx-auto d-flex my-2 w-50">
                            <div>
                                <input
                                    onChange={handleBattleAmount}
                                    className="Home_formControl__Jx9pO"
                                    type="tel"
                                    value={battleAmount || ""}
                                    placeholder="Amount"
                                />
                            </div>
                            <div className="set ml-1 ">
                                {" "}
                                <button
                                    onClick={createBattle}
                                    className="bg-green Home_playButton__V95wM cxy position-static h-100 "
                                >
                                    Set
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="Home_dividerX__FO2S8"
                        style={{
                            background: "#f1f1f1",
                            height: "10px",
                            width: "100%",
                        }}
                    ></div>
                    <div className="px-4 py-3">
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/global-purple-battleIcon.png`}
                                    width="20px"
                                    alt=""
                                />
                                <span className="ml-2 games-section-title">
                                    Open Battles
                                </span>
                            </div>
                            <Link to="/game-rules">
                                <span
                                    className="games-section-headline text-uppercase position-relative mt-2 font-weight-bold float-right"
                                    style={{ top: "-0.2rem" }}
                                >
                                    Rules
                                    <img
                                        className="ml-2"
                                        src={"/img/infoIcon.png"}
                                        alt=""
                                    />
                                </span>
                            </Link>
                        </div>
                        {battles.list.map((battle, i) => {
                            return battle?.battle_status === "0" ? (
                                <div key={i} className="mt-1 d-flex">
                                    <div className="betCard mt-1 w-100">
                                        <span
                                            className="betCard-title px-2 d-flex
                                                justify-content-between text-uppercase"
                                        >
                                            <span
                                                className="ml-1 betCard-border-bottom"
                                                style={{ color: "#212529" }}
                                            >
                                                CHALLENGE FROM{" "}
                                                <b
                                                    style={{
                                                        color: "brown",
                                                        letterSpacing: "0.3px",
                                                    }}
                                                >
                                                    {battle.created_by}
                                                </b>
                                            </span>
                                            {battle?.user_id == user?.userId &&
                                                battle?.status !== "1" ? (
                                                <>
                                                    <span
                                                        style={{
                                                            marginRight: "12px",
                                                        }}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                deleteGameBattle(
                                                                    battle?.id
                                                                )
                                                            }
                                                            className="bg-red deleteBtn cxy d-flex"
                                                        >
                                                            Delete
                                                        </button>
                                                    </span>
                                                </>
                                            ) : (
                                                <></>
                                            )}

                                            {battle.status === "1" &&
                                                battle?.user_id == user?.userId ? (
                                                <div className="d-flex">
                                                    <span>
                                                        <button
                                                            className="bg-green deleteBtn cxy mx-2"
                                                            onClick={() =>
                                                                handleGameEntry(
                                                                    battle
                                                                )
                                                            }
                                                        >
                                                            Start
                                                        </button>
                                                    </span>
                                                    <span>
                                                        <button
                                                            className="bg-red deleteBtn cxy"
                                                            onClick={() => {
                                                                handleRejectBattle(
                                                                    battle?.id
                                                                );
                                                            }}
                                                        >
                                                            Reject
                                                        </button>
                                                    </span>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </span>
                                        <div className="challenge-card d-flex justify-content-between align-items-center p-2">
                                            <div className="prizing">
                                                <div className="head">
                                                    <span className="betCard-subTitle d-flex justify-content-center">
                                                        Entry
                                                    </span>
                                                    <span className="betCard-subTitle pl-5 ml-3">
                                                        Prize Pool
                                                    </span>
                                                </div>
                                                <div className="price">
                                                    <div className="money mr-3">
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                                            width="18px"
                                                            alt=""
                                                        />
                                                        <span className="betCard-amount">
                                                            {battle.entry_fees | parseInt}
                                                        </span>
                                                    </div>
                                                    <div className="money">
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                                            width="18px"
                                                            alt=""
                                                        />
                                                        <span className="betCard-amount">
                                                            {battle.price | parseInt}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {battle?.user_id != user?.userId ? (
                                                <button
                                                    onClick={() =>
                                                        handleGameEntry(battle)
                                                    }
                                                    className="playButton cxy d-flex"
                                                    style={{
                                                        position: "unset",
                                                        marginRight: "12px",
                                                    }}
                                                >
                                                    Play
                                                </button>
                                            ) : battle?.status !== "1" ? (
                                                <>
                                                    <div className="playerFetching">
                                                        <img
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                            }}
                                                            src="/img/loader.gif"
                                                            alt=""
                                                        />
                                                        <span>
                                                            Fetching player
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="joinedUser">
                                                        {battle
                                                            .user_image[0] ? (
                                                            <>
                                                                <img
                                                                    style={{
                                                                        height: "40px",
                                                                        width: "40px",
                                                                    }}
                                                                    src={`${process.env.REACT_APP_ASSETS_PATH}/user-profiles/${battle.user_image[0]["user_image"]}`}
                                                                />
                                                            </>
                                                        ) : joinedPlayer?.photo ? (
                                                            <img
                                                                style={{
                                                                    height: "40px",
                                                                    width: "40px",
                                                                }}
                                                                src={`${process.env.REACT_APP_ASSETS_PATH}/user-profiles/${joinedPlayer?.photo}`}
                                                            />
                                                        ) : (
                                                            <></>
                                                        )}
                                                        <span
                                                            className="d-block mt-1"
                                                            style={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            {joinedPlayer?.name}
                                                            {battle?.player_detail
                                                                ? battle
                                                                    ?.player_detail[0]
                                                                : joinedPlayer?.name}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        {/* <span
                                            className="betCard-title mt-2 pl-3 d-flex
                                                justify-content-between text-uppercase betCard-border-top"
                                        >
                                            {battle.status === "1" ? (
                                                <span
                                                    className="ml-auto mr-3 text-right"
                                                    style={{
                                                        color: "rgb(78, 78, 71)",
                                                    }}
                                                >
                                                    1 waiting now
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </span> */}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            );
                        })}
                        {!battles.list.length ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <h1 className="noBattleText">No battles found.</h1>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="px-4 py-3">
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <div>
                                <img
                                    src={`${process.env.PUBLIC_URL}/img/global-purple-battleIcon.png`}
                                    width="20px"
                                    alt=""
                                />
                                <span className="ml-2 games-section-title">
                                    Running Battles
                                </span>
                            </div>
                            <span
                                className="games-section-headline text-uppercase position-relative mt-2 font-weight-bold float-right d-flex align-items-center"
                                style={{ top: "-0.2rem" }}
                            >
                                <img
                                    className="ml-2"
                                    src={`${process.env.PUBLIC_URL}/img/global-grey-iButton.png`}
                                    alt=""
                                />
                            </span>
                        </div>
                        {battles?.list.map((liveBattle, i) => {
                            return liveBattle?.battle_status !== "0" &&
                                liveBattle?.battle_status !== "2" ? (
                                <div key={i} className="running-battles">
                                    <div className="card mb-2">
                                        <div className="d-flex justify-content-between align-items-center px-3 py-2 pricing">
                                            <span
                                                className="betCard-subTitle"
                                                style={{ fontSize: "0.65rem" }}
                                            >
                                                Playing For{" "}
                                                <picture className="moneyIcon-container">
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                                        alt=""
                                                        width="25"
                                                    />
                                                </picture>
                                                &nbsp;
                                                {liveBattle.entry_fees | parseInt}
                                                {/* </b > */}
                                            </span>
                                            <span>
                                                {liveBattle?.battle_status !=
                                                    "2" &&
                                                    (liveBattle?.player_id[0] ==
                                                        user?.userId ||
                                                        liveBattle?.player_id[1] ==
                                                        user?.userId) ? (
                                                    <Link
                                                        to={`/game-room/${liveBattle?.id}`}
                                                        onClick={() =>
                                                            storeBattleId(
                                                                liveBattle?.id
                                                            )
                                                        }
                                                    >
                                                        {
                                                            liveBattle?.status == 3 ?
                                                                <button
                                                                    className="btn btn-danger"
                                                                    style={{ fontSize: "0.6rem" }}
                                                                >
                                                                    View
                                                                </button>
                                                                :

                                                                <button
                                                                    className="btn btn-success"
                                                                    style={{ fontSize: "0.6rem" }}
                                                                >
                                                                    View
                                                                </button>
                                                        }
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>

                                            <span
                                                className="betCard-subTitle"
                                                style={{ fontSize: "0.65rem" }}
                                            >
                                                Prize
                                                {/* <b style={{ color: "black" }}>  */}
                                                <picture className="moneyIcon-container">
                                                    <img
                                                        style={{
                                                            width: "25px",
                                                        }}
                                                        src={`${process.env.PUBLIC_URL}/img/global-rupeeIcon.png`}
                                                        alt=""
                                                    />
                                                </picture>
                                                &nbsp;
                                                {liveBattle.price | parseInt}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center px-4 py-2">
                                            <div className="user">
                                                <img
                                                    src={`${process.env.REACT_APP_ASSETS_PATH}/user-profiles/${liveBattle.user_image[0]?.["user_image"]}`}
                                                />
                                                <span
                                                    className="d-block mt-1"
                                                    style={{ fontSize: "0.7rem" }}
                                                >
                                                    {/* {liveBattle.price}  */}
                                                    {
                                                        liveBattle
                                                            .player_detail[0]
                                                    }
                                                </span>
                                            </div>
                                            <div className="vs-image">
                                                <img
                                                    src={`${process.env.REACT_APP_ASSETS_PATH}/user-profiles/versus.png`}
                                                />
                                            </div>
                                            <div className="user">
                                                <img
                                                    src={`${process.env.REACT_APP_ASSETS_PATH}/user-profiles/${liveBattle.user_image[1]?.["user_image"]}`}
                                                />
                                                <span
                                                    className="d-block mt-1"
                                                    style={{ fontSize: "0.7rem" }}
                                                >
                                                    {/* {liveBattle.price} */}
                                                    {
                                                        liveBattle
                                                            .player_detail[1]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // <div key={i} className="mt-1 d-flex">
                                //     <div className="betCard mt-1 w-100">
                                //         <div className="d-flex pl-3 justify-content-between align-items-center">
                                //             <div>
                                //                 <span className="betCard-subTitle" style={{ "fontSize":"14px" }}>
                                //                     Playing For (<b style={{ "color":"black" }}> ₹ {liveBattle.entry_fees}</b>)
                                //                 </span>
                                //                 <div>
                                //                     {/* <img
                                //                         src="/images/global-rupeeIcon.png"
                                //                         width="21px"
                                //                         alt=""
                                //                     /> */}
                                //                     <span className="betCard-amount d-block mt-3">
                                //  {liveBattle.price}
                                //                         {liveBattle.player_detail[0]}
                                //                     </span>
                                //                 </div>
                                //             </div>
                                //             <div>VS</div>
                                //             <div className="d-flex mr-3 flex-column">
                                //                 <span className="betCard-subTitle"  style={{ "fontSize":"14px" }}>
                                //                     Prize (<b style={{ "color":"black" }}> ₹ {liveBattle.price}</b>)
                                //                 </span>
                                //                 <span className="betCard-amount d-block mt-3">
                                //                         {liveBattle.player_detail[1]}
                                //                     </span>
                                //                 {/* <button
                                //                     onClick={() =>
                                //                         handleGameEntry(liveBattle)
                                //                     }
                                //                     className="bg-green playButton cxy d-flex"
                                //                     style={{
                                //                         position: "unset",
                                //                     }}
                                //                 >
                                //                     ₹{liveBattle.entry_fees}
                                //                 </button> */}
                                //             </div>
                                //         </div>
                                //         <span className="betCard-title mt-2 pl-3 d-flex align-items-center text-uppercase betCard-border-top">
                                //             {/* <span
                                //                 className="ml-1"
                                //                 style={{ color: "brown" }}
                                //             >
                                //                 {liveBattle.live_player} playing now{" "}
                                //             </span> */}
                                //             {/* {liveBattle.status === "2" ? (
                                //                 <span
                                //                     className="ml-auto mr-3 text-right"
                                //                     style={{
                                //                         color: "rgb(78, 78, 71)",
                                //                     }}
                                //                 >
                                //                     1 waiting now
                                //                 </span>
                                //             ) : (
                                //                 <></>
                                //             )} */}
                                //         </span>
                                //     </div>
                                // </div>
                                <></>
                            );
                        })}
                        {!battles?.list.length ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <h1 className="noBattleText">No battles found.</h1>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Lobby;
