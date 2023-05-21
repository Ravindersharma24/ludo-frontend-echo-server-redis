import Header from "./common/Header";
import RightContainer from "./common/RightContainer";
import SideNav from "./common/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Pusher from "pusher-js";
import {
    roomCreated,
    saveGameResult,
    gameCompleted,
    createRoom,
    roomCodeGenerated,
    roomCodeWaiting,
    addRoomCode,
    joinedUserDetail,
    getRoomCode,
} from "../store/room";
import { parseInJSON } from "../common/utils";
import { json, useLocation, useNavigate, useParams } from "react-router-dom";
import FilePicker from "./common/components/filePicker";
import { toast } from "react-toastify";
import { checkAuth } from "../store/user";
import Loading from "../HOC/Loading";
import { setWaitingStatus } from "../store/lobby";

function GameRoom() {
    const location = useLocation();
    let { game_id } = location.state || {};
    const navigate = useNavigate();
    const { battle_id } = useParams();
    const [gameRoomCode, setGameRoomCode] = useState("");
    const room = useSelector((state) => state.room);
    const user = useSelector((state) => state.user.details);
    const roomDetails = parseInJSON(localStorage.getItem("roomDetails"));
    // const oldBattleId = parseInJSON(localStorage.getItem("oldBattleId"));
    let { roomCode, roomId, roomStatus } = roomDetails || {};
    let userId = useSelector((state) => state.user.details.userId);
    const [screenShot, setScreenShot] = useState("");
    const dispatch = useDispatch();
    const [cancelNote, setCancelNote] = useState("");
    const roomStatusCheck = parseInJSON(
        localStorage.getItem("roomWaitingStatus")
    );
    const [roomStatusState, setRoomStatusState] = useState(
        roomStatusCheck ? roomStatusCheck : false
    );
    const [matchProcessing, setMatchProcessing] = useState(true);
    const [displayCancel, setCancelDisplay] = useState("none");
    const [displayWon, setWonDisplay] = useState("none");
    const [gameStatus, setGameStatus] = useState("");
    const [user_details, setUserDetails] = useState({
        current_player_image: "",
        other_player_image: "",
        battle_fees: "",
        current_player_status: "",
        admin_provided_status: "",
    });
    let {
        current_player_image,
        other_player_image,
        battle_fees,
        current_player_status,
        admin_provided_status,
    } = user_details;
    const [room_code, setRoom_Code] = useState();
    useEffect(() => {
        localStorage.removeItem("roomDetails");
        if (battle_id) {
            dispatch(
                joinedUserDetail({ battle_id, game_id }, (dispatch, res) => {
                    if (res?.data?.code) {
                        if (!res?.success) {
                            navigate(`/lobby/${game_id}`);
                        }
                        setRoom_Code(res?.data?.code)
                        if (roomCode) roomCode = res?.data?.code;
                        if (roomId) roomId = res?.data?.roomId;
                        setUserDetails({
                            ...user_details,
                            current_player_image: user.profileImage,
                            other_player_image: res?.data?.user_image,
                            battle_fees: res?.data?.entry_fees,
                            current_player_status: res?.player_status,
                            admin_provided_status: res?.admin_status,
                        });
                        // if(res?.data?.code || res?.data?.room_id){
                        localStorage.setItem(
                            "roomDetails",
                            JSON.stringify({
                                roomId: res?.data?.room_id,
                                roomCode: res?.data?.code,
                            })
                        );
                        // }
                        // else{
                        //     localStorage.removeItem("roomDetails");
                        // }
                    } else {
                        setUserDetails({
                            ...user_details,
                            current_player_image: user.profileImage,
                            other_player_image: res?.data?.user_image,
                            battle_fees: res?.data?.entry_fees,
                            current_player_status: res?.player_status,
                            admin_provided_status: res?.admin_status,
                        });
                        dispatch(getRoomCode(game_id, (dispatch, res) => {
                            if (res?.roomcode) {
                                dispatch(
                                    addRoomCode({ game_id, gameRoomCode: res?.roomcode, battle_id }, (dispatch, res) => {
                                        if (res?.success) {
                                            setRoomStatusState(true);
                                        } else {
                                            navigate(`/lobby/${game_id}`);
                                        }
                                        dispatch(
                                            createRoom({ game_id, battle_id }, (dispatch, res) => {
                                                // console.log('create room----',res);
                                                dispatch(roomCodeGenerated());
                                                if (res.roomCode) {
                                                    dispatch(roomCreated(res));

                                                    localStorage.setItem(
                                                        "roomDetails",
                                                        JSON.stringify({
                                                            roomId: res.roomId,
                                                            roomCode: res.roomCode,
                                                            roomWaitingStatus: res?.roomCodeWaiting
                                                        })
                                                        // `{"roomId": "${res.roomId}", "roomCode": "${res.roomCode}", "roomWaitingStatus": "${res?.roomCodeWaiting}"}`
                                                    );
                                                } else if (res.roomCodeWaiting) {
                                                    dispatch(roomCodeWaiting());
                                                    // console.log("one player joined",res.roomCode);

                                                }
                                            })
                                        );
                                    })
                                );
                            }
                        }))
                    }
                })
            );
        }
        // const channel = pusher.subscribe("channel-khello");
        window.echo.channel("channel-khello").listen(`.connect-with-${userId}`, data => {
            // channel.bind(`connect-with-${userId}`, function (data) {
            setRoomStatusState(false);
            localStorage.setItem("roomWaitingStatus", false);
            setMatchProcessing(false);
            const message = "Match found.";
            toast.success(message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // setTimeout(() => {
            game_id = data?.data?.game_id;
            localStorage.setItem(
                "roomDetails",
                JSON.stringify({
                    roomId: data?.data?.roomId,
                    roomCode: data?.data?.code,
                })
            );
            // localStorage.setItem("oldBattleId", oldBattleId ? oldBattleId : battle_id);
            dispatch(
                roomCreated({
                    roomCode: data.code,
                    roomId: data.roomId,
                })
            );
            dispatch(
                joinedUserDetail({ battle_id, game_id }, (dispatch, res) => {
                    // console.warn("joined-room-connect", res.success);
                    setUserDetails({
                        ...user_details,
                        current_player_image: user.profileImage,
                        other_player_image: res?.data?.user_image,
                        battle_fees: res?.data?.entry_fees,
                        current_player_status: res?.player_status,
                        admin_provided_status: res?.admin_status,
                    });
                })
            );
            // }, 1500);
        });
        window.echo
            .channel("channel-khello").listen(`.waiting-status-changed`, data => {
                // channel.bind(`waiting-status-changed`, function (data) {
                game_id = data?.data?.game_id;
                let msg = data?.data?.battleExpired ? 'Battle Expired' : data?.data?.deleted ? "Battle Deleted" : "Battle request rejected.";
                if (data?.data?.status === "1") {
                    // console.log("waiting for other player to join");
                }
                if (data.data.status === "0") {
                    toast.success(msg, {
                        position: "top-left",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    localStorage.setItem(
                        "roomDetails",
                        JSON.stringify({
                            ...roomDetails,
                            roomId: data?.data?.roomId,
                            roomCode: data?.data?.code,
                        })
                    );
                    // localStorage.removeItem("roomDetails");
                    localStorage.setItem("roomWaitingStatus", false);
                    // localStorage.setItem("oldBattleId", oldBattleId ? oldBattleId : battle_id);
                    navigate(`/lobby/${game_id}`);
                } else {
                    dispatch(setWaitingStatus(data.data));
                    if (data?.data?.code || data?.data?.roomId) {
                        // console.log("one player requested");
                        // console.log("data-",data);
                        // localStorage.setItem(
                        //     "roomDetails",
                        //     JSON.stringify({
                        //         roomId: data?.data?.roomId,
                        //         roomCode: data?.data?.code,
                        //     })
                        // );
                    }
                }
            });
        return () => {
            // pusher.unsubscribe("channel-khello");
            window.echo.leave("channel-khello");
        };
    }, [roomStatusState]);
    const getCancelComment = (e) => {
        setCancelNote(e.target.value);
    };
    const handleCopyCode = () => {
        navigator.clipboard.writeText(roomCode || room.code);
        toast.success("Room Code Copied!", {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleRadio = (result) => {
        let message;
        if (result === 1) {
            if (!(screenShot instanceof File)) {
                message = "Please upload screenshot first.";
                setWonDisplay("block");
                setCancelDisplay("none");
            }
        }
        if (result === 3) {
            if (!cancelNote) {
                message = "Please enter cancel reason.";
                setCancelDisplay("block");
                setWonDisplay("none");
            }
        }
        if (result === 2) {
            if (!cancelNote) {
                setCancelDisplay("none");
                setWonDisplay("none");
            }
        }
    };
    const handleResult = (result) => {
        let message;
        if (!result) {
            message = "Please upload your game result to submit.";
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
        if (result === "1") {
            if (!(screenShot instanceof File)) {
                message = "Please upload screenshot first.";
                setWonDisplay("block");
                setCancelDisplay("none");
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
        }
        if (result === "3") {
            if (!cancelNote) {
                message = "Please provide reason for game cancellation.";
                setWonDisplay("none");
                setCancelDisplay("block");
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
        }
        dispatch(
            saveGameResult(
                {
                    room_id: roomId,
                    status: result,
                    screenshot: screenShot,
                    cancelNote,
                },
                (dispatch, res) => {
                    dispatch(gameCompleted());
                    dispatch(checkAuth());
                    navigate(`/lobby/${res?.game_id}`);
                    localStorage.removeItem("roomDetails");
                }
            )
        );
    };
    const handleScreenShot = (e) => {
        setScreenShot(e.target.files[0]);
    };
    const handleRemoveScreenShot = () => {
        setScreenShot("");
    };
    const handleRoomCodeInput = (e) => {
        setGameRoomCode(e.target.value);
    };
    const handleAddRoomCode = () => {
        dispatch(
            addRoomCode({ game_id, gameRoomCode, battle_id }, (dispatch, res) => {
                if (res?.success) {
                    setRoomStatusState(true);
                } else {
                    navigate(`/lobby/${game_id}`);
                }
                dispatch(
                    createRoom({ game_id, battle_id }, (dispatch, res) => {
                        // console.log('create room----',res);
                        dispatch(roomCodeGenerated());
                        if (res.roomCode) {
                            dispatch(roomCreated(res));

                            localStorage.setItem(
                                "roomDetails",
                                JSON.stringify({
                                    roomId: res.roomId,
                                    roomCode: res.roomCode,
                                    roomWaitingStatus: res?.roomCodeWaiting
                                })
                                // `{"roomId": "${res.roomId}", "roomCode": "${res.roomCode}", "roomWaitingStatus": "${res?.roomCodeWaiting}"}`
                            );
                        } else if (res.roomCodeWaiting) {
                            dispatch(roomCodeWaiting());
                            // console.log("one player joined",res.roomCode);

                        }
                    })
                );
            })
        );
    };

    return (
        <>
            <SideNav />

            <div className="leftContainer">
                <Header />
                <div className="main-area" style={{ paddingTop: "60px" }}>
                    {/* <div className="py-3">
                        <div className="mb-2 ml-3">
                            {roomCode || room.code ? (
                                <>
                                    <div className="game-room py-2">
                                        <div className="players-matching">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <div className="player">
                                                    <img
                                                        src={`${process.env.REACT_APP_ASSETS_PATH}user-profiles/${current_player_image}`}
                                                        width="50px"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="vs-text text-center">
                                                    <img
                                                        src={`${process.env.REACT_APP_ASSETS_PATH}user-profiles/versus.png`}
                                                        width="25px"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="player">
                                                    <img
                                                        src={`${process.env.REACT_APP_ASSETS_PATH}user-profiles/${other_player_image}`}
                                                        width="50px"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <p
                                                className="text-center mt-3 d-flex
                            align-items-center justify-content-center"
                                                style={{
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                Playing for{" "}
                                                <img
                                                    src="/img/global-rupeeIcon.png"
                                                    width="25px"
                                                    alt=""
                                                    className="mx-1"
                                                />
                                                {battle_fees}
                                            </p>
                                        </div>

                                        <hr />

                                        <div
                                            className="roomCode-box p-3 text-center bg-light m-4 p-4 rounded"
                                            style={{ border: "1px solid #ccc" }}
                                        >
                                            <h6>Room Code</h6>
                                            <h2 className="roomCode">
                                                {roomCode || room.code}
                                            </h2>
                                            <button
                                                onClick={handleCopyCode}
                                                className="copycode btn btn-success text-uppercase"
                                            >
                                                Copy Code
                                            </button>
                                        </div>

                                        <div className="download-app text-center my-4">
                                            <p>
                                                Play Ludo Game in Ludo King App
                                            </p>
                                        </div>

                                        <hr />

                                        <div
                                            className="rules p-3 py-4 m-3 my-4"
                                            style={{
                                                border: "1px solid #ccc",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <h4
                                                style={{
                                                    textDecoration: "underline",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {" "}
                                                Game Rules
                                            </h4>
                                            <ul
                                                className="rule-list p-0 m-0"
                                                style={{
                                                    borderRadius: "6px",
                                                    border: "1px solid #ccc",
                                                }}
                                            >
                                                <li
                                                    className="p-3"
                                                    style={{
                                                        borderBottom:
                                                            "1px solid #ccc",
                                                    }}
                                                >
                                                    <b>
                                                        For Cancellation of
                                                        game, Cancel Reason is
                                                        required.{" "}
                                                    </b>
                                                </li>
                                                <li
                                                    className="p-3 text-center"
                                                    style={{
                                                        borderBottom:
                                                            "1px solid #ccc",
                                                        color: "#f00",
                                                    }}
                                                >
                                                    महत्वपूर्ण नोट: कृपया गलत
                                                    गेम परिणाम अपलोड न करे
                                                    अन्यथा आपके वॉलेट बैलेंस पर
                                                    दंड लड़ाई जायेगी, गलत रिजल्ट
                                                    अपडेट करने पर 50 रुपये
                                                    पेनल्टी लगेगी
                                                </li>
                                                <li
                                                    className="p-3 text-center"
                                                    style={{ color: "#f00" }}
                                                >
                                                    महत्वपूर्ण नॉट: यदि आप गेम
                                                    के परिणामों को अपडेट नहीं
                                                    करते है, तो आपके वॉलेट बलके
                                                    पर जुर्माना लगाया जायेगा
                                                    रिजल्ट अपडेट नहीं करने पर 25
                                                    रुपये पेनल्टी लगेगी
                                                </li>
                                            </ul>
                                        </div>

                                        <div
                                            className="p-3 px-3 py-1 bg-light"
                                            style={{
                                                color: "#000",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Match Status
                                        </div>
                                        {current_player_status === "0" &&
                                            admin_provided_status === "0" ? (
                                            <div className="p-3 update-result">
                                                <p
                                                    style={{
                                                        fontWeight: "500",
                                                        color: "rgb(177 177 177)",
                                                    }}
                                                >
                                                    After completion of your
                                                    game, select the status of
                                                    the game and post your
                                                    screen shot below.
                                                </p>
                                                <div
                                                    className="upload-box mb-3"
                                                    style={{
                                                        display: displayWon,
                                                    }}
                                                >
                                                    <FilePicker
                                                        handleFileSelect={
                                                            handleScreenShot
                                                        }
                                                        selectedFile={
                                                            screenShot
                                                        }
                                                        label={`Upload Result ScreenShot`}
                                                        name={"screenShot"}
                                                        clearFile={
                                                            handleRemoveScreenShot
                                                        }
                                                    />
                                                </div>
                                                <div className="update d-flex align-items-center justify-content-between my-4">
                                                    <div className="form-group d-flex align-items-center">
                                                        <input
                                                            type="radio"
                                                            name="battleResult"
                                                            value="1"
                                                            onChange={(e) =>
                                                                setGameStatus(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                            }}
                                                            onClick={() =>
                                                                handleRadio(1)
                                                            }
                                                        />
                                                        <label>I WON</label>
                                                    </div>
                                                    <div
                                                        className="form-group d-flex align-items-center"
                                                        onClick={() =>
                                                            handleRadio(2)
                                                        }
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="battleResult"
                                                            value="2"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                            }}
                                                            onChange={(e) =>
                                                                setGameStatus(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <label>I LOST</label>
                                                    </div>
                                                    <div
                                                        className="form-group d-flex align-items-center"
                                                        onClick={() =>
                                                            handleRadio(3)
                                                        }
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="battleResult"
                                                            value="3"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                            }}
                                                            onChange={(e) =>
                                                                setGameStatus(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                        <label>Cancel</label>
                                                    </div>
                                                </div>

                                                <div
                                                    className="comment my-2 mb-4"
                                                    style={{
                                                        display: displayCancel,
                                                    }}
                                                >
                                                    <textarea
                                                        className="form-control"
                                                        rows="5"
                                                        placeholder=" Reason for Cancelation :"
                                                        onChange={
                                                            getCancelComment
                                                        }
                                                    ></textarea>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        handleResult(gameStatus)
                                                    }
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        ) : current_player_status === "1" ? (
                                            <p className="ml-3">
                                                {admin_provided_status === "1"
                                                    ? "Admin has updated your battle result for Won"
                                                    : "You have already updated your battle result for Won"}
                                            </p>
                                        ) : current_player_status === "2" ? (
                                            <p className="ml-3">
                                                {admin_provided_status === "2"
                                                    ? "Admin has updated your battle result for Loss"
                                                    : "You have already updated your battle result for Loss"}
                                            </p>
                                        ) : current_player_status === "3" ? (
                                            <p className="ml-3">
                                                {admin_provided_status === "3"
                                                    ? "Admin has updated your battle result for Cancel"
                                                    : "You have already updated your battle result for Cancel"}
                                            </p>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </>
                            ) : roomStatusState ? (
                                <div className="matching-screen">
                                    <p className="matching-text">
                                        Waiting for Another player to join..
                                    </p>
                                    <div className="players-matching">
                                        <div className="player">
                                            <img
                                                src={`${process.env.PUBLIC_URL}/img/user-profile.png`}
                                                alt="user"
                                                className="user-profile"
                                            />{" "}
                                            {user.name}
                                        </div>
                                        <p className="vs-text">
                                            <img
                                                src={`${process.env.PUBLIC_URL}/img/vs.png`}
                                                alt="vs"
                                            />
                                        </p>
                                        <div
                                            className={`player ${matchProcessing
                                                ? "is-matching"
                                                : ""
                                                }`}
                                        >
                                            <div className="loading">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/img/loading-load.gif`}
                                                    alt="loading.."
                                                    width="50"
                                                />
                                            </div>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/img/user-profile.png`}
                                                alt="user"
                                                className="user-profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div
                                        className="MuiFormControl-root MuiTextField-root"
                                        style={{ verticalAlign: "bottom" }}
                                    >
                                        <label
                                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated"
                                            data-shrink="false"
                                        >
                                            {!gameRoomCode
                                                ? "Enter Room Code"
                                                : null}
                                        </label>
                                        <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
                                            <input
                                                aria-invalid="false"
                                                type="text"
                                                className="MuiInputBase-input MuiInput-input"
                                                onChange={handleRoomCodeInput}
                                                value={gameRoomCode}
                                            />
                                        </div>
                                    </div>
                                    <img
                                        onClick={handleAddRoomCode}
                                        className="ml-2"
                                        width="20px"
                                        src={`${process.env.PUBLIC_URL}/img/select-blue-checkIcon.png`}
                                        alt=""
                                    />
                                </>
                            )}
                        </div>
                    </div> */}
                    <div className="game-room py-2">
                        <div className="players-matching">
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="player">
                                    <img
                                        src={`${process.env.REACT_APP_ASSETS_PATH}user-profiles/${current_player_image}`}
                                        width="50px"
                                        alt=""
                                    />
                                </div>
                                <div className="vs-text text-center">
                                    <img
                                        src={`${process.env.REACT_APP_ASSETS_PATH}user-profiles/versus.png`}
                                        width="25px"
                                        alt=""
                                    />
                                </div>
                                <div className="player">
                                    <img
                                        src={`${process.env.REACT_APP_ASSETS_PATH}user-profiles/${other_player_image}`}
                                        width="50px"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <p
                                className="text-center mt-3 d-flex
                            align-items-center justify-content-center"
                                style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                }}
                            >
                                Playing for{" "}
                                <img
                                    src="/img/global-rupeeIcon.png"
                                    width="25px"
                                    alt=""
                                    className="mx-1"
                                />
                                {battle_fees | parseInt}
                            </p>
                        </div>

                        <hr />

                        <div
                            className="roomCode-box p-3 text-center bg-light m-4 p-4 rounded"
                            style={{ border: "1px solid #ccc", }}
                        >
                            {roomCode || room_code ?
                                <div>
                                    <h6>Room Code</h6>
                                    <h2 className="roomCode">
                                        {roomCode || room.code || room_code}
                                    </h2>
                                    <button
                                        onClick={handleCopyCode}
                                        className="copycode btn btn-success text-uppercase"
                                    >
                                        Copy Code
                                    </button>
                                </div>
                                :
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div>
                                        <h6>Room Code</h6>
                                    </div>

                                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl"
                                        style={{ width: '26%' }}
                                    >
                                        <input
                                            aria-invalid="false"
                                            type="text"
                                            className="MuiInputBase-input MuiInput-input"
                                            onChange={handleRoomCodeInput}
                                            value={gameRoomCode}
                                            maxLength="8"
                                            style={{ textAlign: "center" }}
                                        />
                                    </div>
                                    {/* </div> */}
                                    <img
                                        style={{
                                            position: 'relative',
                                            left: '62px',
                                            top: '-15px'
                                        }}
                                        onClick={handleAddRoomCode}
                                        width="20px"
                                        src={`${process.env.PUBLIC_URL}/img/select-blue-checkIcon.png`}
                                        alt=""
                                    />
                                </div>
                            }

                        </div>

                        <div className="download-app text-center my-4">
                            <p>
                                Play Ludo Game in Ludo King App
                            </p>
                        </div>

                        <hr />

                        <div
                            className="rules p-3 py-4 m-3 my-4"
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                            }}
                        >
                            <h4
                                style={{
                                    textDecoration: "underline",
                                    textAlign: "center",
                                }}
                            >
                                {" "}
                                Game Rules
                            </h4>
                            <ul
                                className="rule-list p-0 m-0"
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                }}
                            >
                                {/* <li
                                                className="p-3"
                                                style={{
                                                    borderBottom:
                                                        "1px solid #ccc",
                                                }}
                                            >
                                                <b>
                                                    Record every game while
                                                    playing.
                                                </b>
                                            </li> */}
                                <li
                                    className="p-3"
                                    style={{
                                        borderBottom:
                                            "1px solid #ccc",
                                    }}
                                >
                                    <b>
                                        For Cancellation of
                                        game, Cancel Reason is
                                        required.{" "}
                                    </b>
                                </li>
                                <li
                                    className="p-3 text-center"
                                    style={{
                                        borderBottom:
                                            "1px solid #ccc",
                                        color: "#f00",
                                    }}
                                >
                                    महत्वपूर्ण नोट: कृपया गलत
                                    गेम परिणाम अपलोड न करे
                                    अन्यथा आपके वॉलेट बैलेंस पर
                                    दंड लगाई जायेगी, गलत रिजल्ट
                                    अपडेट करने पर {user.wrong_result_penalty_amt | parseInt} रुपये
                                    पेनल्टी लगेगी !
                                </li>
                                <li
                                    className="p-3 text-center"
                                    style={{ color: "#f00" }}
                                >
                                    महत्वपूर्ण नोट: यदि आप गेम
                                    के परिणामों को अपडेट नहीं
                                    करते है, तो आपके वॉलेट बैलेंस
                                    पर जुर्माना लगाया जायेगा,
                                    रिजल्ट अपडेट नहीं करने पर {user.pending_game_penalty_amt | parseInt} रुपये पेनल्टी लगेगी !
                                </li>
                            </ul>
                        </div>

                        {roomCode ?
                            <div
                                className="p-3 px-3 py-1 bg-light"
                                style={{
                                    color: "#000",
                                    fontWeight: "600",
                                }}
                            >
                                Match Status
                            </div> : <p></p>}
                        {current_player_status === "0" &&
                            admin_provided_status === "0" ? (
                            <div className="p-3 update-result">
                                <p
                                    style={{
                                        fontWeight: "500",
                                        color: "rgb(177 177 177)",
                                    }}
                                >
                                    After completion of your
                                    game, select the status of
                                    the game and post your
                                    screen shot below.
                                </p>
                                <div
                                    className="upload-box mb-3"
                                    style={{
                                        display: displayWon,
                                    }}
                                >
                                    <FilePicker
                                        handleFileSelect={
                                            handleScreenShot
                                        }
                                        selectedFile={
                                            screenShot
                                        }
                                        label={`Upload Result ScreenShot`}
                                        name={"screenShot"}
                                        clearFile={
                                            handleRemoveScreenShot
                                        }
                                    />
                                </div>
                                <div className="update d-flex align-items-center justify-content-between my-4">
                                    <div className="form-group d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name="battleResult"
                                            value="1"
                                            onChange={(e) =>
                                                setGameStatus(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                            onClick={() =>
                                                handleRadio(1)
                                            }
                                        />
                                        <label>I WON</label>
                                    </div>
                                    <div
                                        className="form-group d-flex align-items-center"
                                        onClick={() =>
                                            handleRadio(2)
                                        }
                                    >
                                        <input
                                            type="radio"
                                            name="battleResult"
                                            value="2"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                            onChange={(e) =>
                                                setGameStatus(
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />
                                        <label>I LOST</label>
                                    </div>
                                    <div
                                        className="form-group d-flex align-items-center"
                                        onClick={() =>
                                            handleRadio(3)
                                        }
                                    >
                                        <input
                                            type="radio"
                                            name="battleResult"
                                            value="3"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                            }}
                                            onChange={(e) =>
                                                setGameStatus(
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />
                                        <label>Cancel</label>
                                    </div>
                                </div>

                                <div
                                    className="comment my-2 mb-4"
                                    style={{
                                        display: displayCancel,
                                    }}
                                >
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder=" Reason for Cancelation :"
                                        onChange={
                                            getCancelComment
                                        }
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleResult(gameStatus)
                                    }
                                >
                                    Submit
                                </button>
                            </div>
                        ) : current_player_status === "1" ? (
                            <p className="ml-3">
                                {admin_provided_status === "1"
                                    ? "Admin has approved your battle result for Won"
                                    : "You have already updated your battle result for Won"}
                            </p>
                        ) : current_player_status === "2" ? (
                            <p className="ml-3">
                                {admin_provided_status === "2"
                                    ? "Admin has approved your battle result for Loss"
                                    : "You have already updated your battle result for Loss"}
                            </p>
                        ) : current_player_status === "3" ? (
                            <p className="ml-3">
                                {admin_provided_status === "3"
                                    ? "Admin has approved your battle result for Cancel"
                                    : "You have already updated your battle result for Cancel"}
                            </p>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
            <RightContainer />
        </>
    );
}

export default Loading(GameRoom);
