import axios from "axios";
import useCookie from "hooks/useCookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "./utils";
import { decryptData } from "./config";

// this code is created an instance with base url for admin
export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/user`,
});

export const masterInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/master`,
});

export const cashfreeinstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/cashfree`,
});
export const commonInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/common`,
});

// this function is used for set headers in api
export const setJwtToken = () => {
  return {
    headers: {
      Authorization: "Bearer " + isLoggedIn(),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
};

export const setMultiPartHeader = () => {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };
};

//this interceptors checks user's token is valid or not
export const AxiosInterceptor = ({ children }) => {
  const [isSet, setIsSet] = useState(false);
  const navigate = useNavigate();
  const { removeCookie } = useCookie();

  useEffect(() => {
    const resInterceptor = (response) => {
      if (decryptData(response).code === 401) {
        removeCookie();
        sessionStorage.removeItem("course");
        navigate("/");
      }
      return response;
    };

    const errInterceptor = (error) => {
      return error;
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    setIsSet(true);

    return () => instance.interceptors.response.eject(interceptor);
    // eslint-disable-next-line
  }, []);

  return isSet && children;
};

// instance.interceptors.response.use((response) => {
//   if (response.data.status === 401) {
//     // const navigate = useNavigate();
//     // navigate("/");
//     window.location = "/";
//   }
//   return response;
// }, null);
