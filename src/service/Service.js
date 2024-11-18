import { createNavigationContainerRef } from "@react-navigation/native";
import axios from "axios";
import Config from "react-native-config";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = Config.API_URL;
const navigationRef = createNavigationContainerRef();

axiosInstance.interceptors.request.use(async (request) => {
    const domain = request.url.split("/")[2];
    request.headers["Content-Type"] = "application/json";
    return request;
}, null);

axiosInstance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return data;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
        }
        return Promise.reject(error.response ? error.response.data : error.message);
    }
);

export const post = (url, payload) =>
    axiosInstance.post(url, payload).then((response) => response);

export const get = (url) => axiosInstance.get(url).then((response) => response);

export const patch = (url, payload) =>
    axiosInstance.patch(`/${url}`, payload).then((response) => response);
