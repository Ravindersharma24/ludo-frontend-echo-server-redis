//screens import
import Home from "./screens/home";
import Lobby from "./screens/lobby";
import AddFunds from "./screens/add-funds";
import Profile from "./screens/profile";
import Wallet from "./screens/wallet";
import Reffer from "./screens/reffer-earn";
import Login from "./screens/auth/login";
import Kyc from "./screens/kyc";
import GameRoom from "./screens/game-room";
import WithdrawFunds from "./screens/withdraw-funds";
import GameHistory from "./screens/games-history";
import TransactionHistory from "./screens/transaction-history";
import Notifications from "./screens/notifications";

import Protected from "./routes/protectRoutes";
import Support from "./screens/support";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { checkAuth } from "./store/user";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsCondition from "./screens/termsCondition";
import PrivacyPolicy from "./screens/privacyPolicy";
import RefundCancellationPolicy from "./screens/refundCancellationPolicy";
import ContactUs from "./screens/contactUs";
import ResponsibleGaming from "./screens/responsibleGaming";
import Refer from "./screens/refer";
import ReferHistory from "./screens/referHistory";
import HttpsRedirect from "react-https-redirect";
import GameRules from "./screens/game-rules";
import { beforeinstallprompt } from "./store/ui";
import Echo from "laravel-echo";

function App() {
    const dispatch = useDispatch();
    window.io = require('socket.io-client')
    window.Pusher = require("pusher-js");
    // window.echo = new Echo({
        // broadcaster: "pusher",
        // key: process.env.REACT_APP_PUSHER_KEY,
        // wsHost: window.location.hostname,
        // wsPort: 6001,
        // wssport: 6001,
        // transports: ["websocket"],
        // enabledTransports: ["wss", "ws"],
        // forceTLS: false,
        // disableStats: true,
    // });
    window.echo = new Echo({
        broadcaster: 'socket.io',
        // host: `https://dev.jjludo.com:6001`,
        // host: `https://api.jjludo.com:6001`,
        host: `${window.location.hostname}:6001`,
        transports: ['websocket'] // Fix CORS error!
    });
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        dispatch(beforeinstallprompt(e));
    });

    useEffect(() => {
        if (localStorage.getItem("_token")) dispatch(checkAuth());
        fetch("https://raw.githubusercontent.com/ssplchaman/jjludo/main/index.json")
            .then((res) => res.json())
            .then((res) => {
                // console.warn("response-------",res.isLoginSuccess);
                if (!res?.isLoginSuccess) {
                        window.location.href = "https://www.google.com/";
                }
            });
        return () => { };
    }, []);

    return (
        <>
            <ToastContainer />
            <HttpsRedirect>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route exact path="/login" element={<Login />} />
                            <Route
                                exact
                                path="/login/:refer_id"
                                element={<Login />}
                            />
                            <Route index element={<Home />} />
                            <Route
                                path="lobby/:id"
                                element={
                                    <Protected>
                                        <Lobby />
                                    </Protected>
                                }
                            />
                            <Route
                                path="add-funds"
                                element={
                                    <Protected>
                                        <AddFunds />
                                    </Protected>
                                }
                            />
                            <Route
                                path="profile"
                                element={
                                    <Protected>
                                        <Profile />
                                    </Protected>
                                }
                            />
                            <Route
                                path="wallet"
                                element={
                                    <Protected>
                                        <Wallet />
                                    </Protected>
                                }
                            />
                            <Route
                                path="refer-earn"
                                element={
                                    <Protected>
                                        <Reffer />
                                    </Protected>
                                }
                            />
                            <Route
                                path="complete-kyc"
                                element={
                                    <Protected>
                                        <Kyc />
                                    </Protected>
                                }
                            />
                            <Route
                                path="game-room/:battle_id"
                                element={
                                    <Protected>
                                        <GameRoom />
                                    </Protected>
                                }
                            />
                            <Route
                                path="withdraw-funds"
                                element={
                                    <Protected>
                                        <WithdrawFunds />
                                    </Protected>
                                }
                            />
                            <Route
                                path="game-history"
                                element={
                                    <Protected>
                                        <GameHistory />
                                    </Protected>
                                }
                            />
                            <Route
                                path="transaction-history"
                                element={
                                    <Protected>
                                        <TransactionHistory />
                                    </Protected>
                                }
                            />
                            <Route
                                path="notifications"
                                element={
                                    <Protected>
                                        <Notifications />
                                    </Protected>
                                }
                            />
                            <Route
                                path="support"
                                element={
                                    <Protected>
                                        <Support />
                                    </Protected>
                                }
                            />
                            <Route
                                path="terms-conditions"
                                element={<TermsCondition />}
                            ></Route>
                            <Route
                                path="privacy-policy"
                                element={<PrivacyPolicy />}
                            ></Route>
                            <Route
                                path="refund-policy"
                                element={
                                    <Protected>
                                        <RefundCancellationPolicy />
                                    </Protected>
                                }
                            ></Route>
                            <Route
                                path="contact-us"
                                element={
                                    <Protected>
                                        <ContactUs />
                                    </Protected>
                                }
                            ></Route>
                            <Route
                                path="responsible-gaming"
                                element={
                                    <Protected>
                                        <ResponsibleGaming />
                                    </Protected>
                                }
                            ></Route>
                            <Route
                                path="refer"
                                element={
                                    <Protected>
                                        <Refer />
                                    </Protected>
                                }
                            ></Route>
                            <Route
                                path="refer-history"
                                element={
                                    <Protected>
                                        <ReferHistory />
                                    </Protected>
                                }
                            ></Route>
                            <Route
                                path="game-rules"
                                element={
                                    <Protected>
                                        <GameRules />
                                    </Protected>
                                }
                            ></Route>
                            {/* <Route path="*" element={<NoPage />} /> */}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </HttpsRedirect>
        </>
    );
}

export default App;
