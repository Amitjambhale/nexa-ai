import { decryptData, encryptData } from "config/config";
import { instance as axios } from "config/axiosInstance";
import { getBrowserName } from "config/utils";
import Cookies from "js-cookie";

export const getTests = async (data = {}) => {
  try {

    const payload = {
      ...data,
      platformType: getBrowserName(),
  
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
