import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";

//import reducers
import GamesReducer from "./games";
import UIReducer from "./ui";
import UserReducer from "./user";
import LobbyReducer from "./lobby";
import AddFundReducer from "./addFund";
import RoomReducer from "./room";
import GameHistory from "./gameHistory";

//import middlewares
import apiMiddleware from "./middleware/api";
import authMiddleware from "./middleware/auth";
import TransactionHistory from "./transactionHistory";
import referHistory from "./referHistory";
const reducer = combineReducers({
    games: GamesReducer,
    ui: UIReducer,
    user: UserReducer,
    battles: LobbyReducer,
    add_fund: AddFundReducer,
    room: RoomReducer,
    game_history: GameHistory,
    transaction_history: TransactionHistory,
    refer_history: referHistory,
});
export default configureStore({
    reducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
        apiMiddleware,
        authMiddleware,
    ],
});
