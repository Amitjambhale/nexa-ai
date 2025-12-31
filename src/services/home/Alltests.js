import { decryptData, encryptData } from "config/config";
import { instance as axios } from "config/axiosInstance";
import { getBrowserName } from "config/utils";
import Cookies from "js-cookie";

export const getTests = async (data = {}) => {
  try {
    const accessToken = Cookies.get("access_token") || "";

    const payload = {
      ...data,
      platformType: getBrowserName(),
      access_token: accessToken,
    };

    const response = await axios.get("/test-list", {
      params: payload,
    });

    return response.data;
  } catch (err) {
    console.error("getTests API Error:", err);
    throw err;
  }
};
