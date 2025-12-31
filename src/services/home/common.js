import { commonInstance as axios } from "config/axiosInstance";
import { getBrowserName, isLoggedIn } from "config/utils";


export const getTestTypes = async (data) => {
  try {
    const payload = {
      ...data,
      platformType: getBrowserName(), 
    };

    const response = await axios.get("/test-type", payload);
    return response.data;
  } catch (err) {
    console.error("getTestTypes API Error:", err);
    throw err;
  }
};



