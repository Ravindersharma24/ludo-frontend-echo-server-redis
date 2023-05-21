// import axios from "axios";
// import { baseURL } from "../apiUrl";
// import { apiCallStart } from "../api";
const authMiddleware = (store) => next => action => {
    next(action)
}
export default authMiddleware;