import { normalDecryptData, normalEncryptData } from "config/config";
import { useCookies } from "react-cookie";

const useCookie = () => {
  const [value, setValue, removeValue] = useCookies([
    process.env.REACT_APP_AUTH,
  ]);

  let nextSevenDay = new Date();
  let today = new Date();
  nextSevenDay.setDate(today.getDate() + 7);

  const setCookie = (
    data,
    option = {
      path: "/",
      expires: nextSevenDay,
    }
  ) => {
    setValue(process.env.REACT_APP_AUTH, normalEncryptData(data), option);
  };

  const removeCookie = (
    option = {
      path: "/",
    }
  ) => {
    removeValue(process.env.REACT_APP_AUTH, option);
  };

  const cookies = normalDecryptData(value[process.env.REACT_APP_AUTH]);

  return { cookies, setCookie, removeCookie };
};

export default useCookie;
