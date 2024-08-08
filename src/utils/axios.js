// import ToastComponent from "@/component/common/ToastComponent";
import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEPATH,
});
if (typeof window !== "undefined") {
  axiosApi.defaults.headers.common[
    "Authorization"
  ] = `token ${localStorage.getItem("refresh")}`;
}

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const _status = error?.response?.status;
    switch (_status) {
      case 401:
        localStorage.removeItem("refresh");
        window.location.href = "/";
        break;
      default:
      // toast.custom((t) => (
      //   <ToastComponent t={t} type={error.response?.data?.errorType} response={error.response?.data} />
      // ));
    }
    return Promise.reject(error);
  }
);
