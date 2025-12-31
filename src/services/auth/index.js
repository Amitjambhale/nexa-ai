import { decryptData, encryptData ,encryptPassword } from "config/config";
import { instance as axios } from "config/axiosInstance";
import { getBrowserName, isLoggedIn } from "config/utils";


export const StudentLogin = async (data) => {
  try {
    const response = await axios.post("/student-login", {
     ...data,
     password:encryptPassword(data.password)
    });
    return response.data; // backend response
  } catch (err) {
    console.error("Login API Error:", err);
    throw err;
  }
};


export const userLogout = async (data = {}) => {
  const token = isLoggedIn();
  return decryptData(
    await axios.get(
      `/logout?reqData=${encryptData({
        platformType: getBrowserName(),
        access_token: token,
      })}`
    )
  );
};

export const UserRegister = async (data) => {
  try {
    const payload = {
      ...data,
      password: encryptPassword(data.password), // Encrypt password
    };

    const response = await axios.post("/customer-register", payload);
    return response.data; 
  } catch (err) {
    console.error("Customer Register API Error:", err);
    throw err;
  }
};

