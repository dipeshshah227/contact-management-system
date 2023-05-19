import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "https://dev.api.veelapp.com/";

axiosClient.defaults.headers.common["Content-Type"] = "application/json";
axiosClient.defaults.headers.common["Accept"] = "application/json";

axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

export default axiosClient;
