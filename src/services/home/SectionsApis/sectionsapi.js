import { instance as axios } from "config/axiosInstance";
import { decryptData } from 'config/config';
import { getBrowserName } from 'config/utils';
import CryptoJS from 'crypto-js';

//get Banners API
export const getBanners = async (data = {}) => {
  try {
    const payload = {
      ...data,
    };

    const response = await axios.get("/banners-list", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getBanners API Error:", err);
    throw err;
  }
};

// get Testimonial Api
export const getTestimonials = async (data = {}) => {
  try {
    const payload = {
      ...data,
    };

    const response = await axios.get("/testimonial-list", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getTestimonials API Error:", err);
    throw err;
  }
};

// get gallery Api
export const getGallary = async (data = {}) => {
  try {
    const payload = {
      ...data,
    };

    const response = await axios.get("/galleries-list", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getBanners API Error:", err);
    throw err;
  }
};