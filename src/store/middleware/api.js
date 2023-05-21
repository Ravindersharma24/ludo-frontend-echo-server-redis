import axios from "axios";
import { baseURL } from "../apiUrl";
import { apiCallStart } from "../api";
import { toast } from "react-toastify";
import { getNested } from "../../common/utils";
import { changeLoadingStatus } from "../ui";
const apiMiddleware =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== apiCallStart.type) return next(action);

        dispatch(changeLoadingStatus(true));
        next(action);
        const {
            url,
            method,
            data,
            onError,
            onSuccess,
            hasFile,
            dontNotifySuccess,
            dontNotifyError,
        } = action.payload;
        if (hasFile) {
            var formData = new FormData();
            for (var input in data) {
                formData.append(input, data[input]);
            }
            axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
        } else {
            axios.defaults.headers.post["Content-Type"] = "application/json";
        }
        axios.defaults.baseURL = baseURL;
        axios.defaults.headers.post["Accept"] = "application/json";
        axios.defaults.withCredentials = true;
        axios.interceptors.request.use(function (config) {
            const token = localStorage.getItem("_token");
            config.headers.Authorization = token ? `Bearer ${token}` : "";
            return config;
        });

        try {
            let response = await axios.request({
                url,
                method,
                data: hasFile ? formData : data,
            });
            dispatch(changeLoadingStatus(false));
            if (onSuccess && typeof onSuccess === "string")
                dispatch({ type: onSuccess, payload: response.data });
            else if (onSuccess && typeof onSuccess === "function")
                onSuccess(dispatch, response.data);
            const message = getNested(response, "data", "msg");
            let status = getNested(response, "data", "success");
            // console.warn("response---",response);
            // console.warn("message---",message);
            // console.warn("status---",status);
            status =
                status === "pending" || status === false
                    ? "warning"
                    : "success";
            if (!dontNotifySuccess && message) {
                toast[status](message, {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            dispatch(changeLoadingStatus(false));
            if (onError && typeof onError === "string")
                dispatch({ type: onError, payload: error.message });
            else if (onError && onError instanceof "function")
                onError(dispatch, error.message);
            const message = getNested(error, "response", "data", "msg");
            if (!dontNotifyError && message) {
                toast.error(message, {
                    position: "top-left",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };
export default apiMiddleware;
