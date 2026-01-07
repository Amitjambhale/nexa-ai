import { instance as axios } from "config/axiosInstance";
import { decryptData, encryptReqData } from 'config/config';
import { getBrowserName } from 'config/utils';
import CryptoJS from 'crypto-js';

// get faq Api
export const getFAQ = async (data = {}) => {
  try {
    const payload = {
      ...data,
    };

    const response = await axios.get("/faq-list", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getFAQ API Error:", err);
    throw err;
  }
};

// contact us api 
export const addContactUs = async (data = {}) => {
  try {
    const encryptedPayload = encryptReqData(data);

    const response = await axios.post("/contactus-add", encryptedPayload);

    return decryptData(response);
  } catch (err) {
    console.error("addContactUs API Error:", err);
    throw err;
  }
};

// parent Dropdown api

export const getParentDropdown = async (data = {}) => {
  try {
    const payload = {
      ...data,
    };

    const response = await axios.get("/parent-dropdown", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getParentDropdown API Error:", err);
    throw err;
  }
};

// get product by parent id
export const geProductByParentID = async (data = {}) => {
  try {
    const payload = {
      ...encryptReqData(data),
    };

    const response = await axios.get("/product-by-Parent", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getParentDropdown API Error:", err);
    throw err;
  }
};

//blogs apis
export const getBlogsList = async (data = {}) => {
  try {
    const payload = {
      ...data,
    };

    const response = await axios.get("/blogs-list", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getBlogsList API Error:", err);
    throw err;
  }
};

export const getFeaturedBlogsList = async (data = {}) => {
  try {
    const payload = {
      ...data,
    };

    const response = await axios.get("/featured-blogs-list", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getFeaturedBlogsList API Error:", err);
    throw err;
  }
};

export const getBlogDetailById = async (data = {}) => {
  try {
    const payload = {
      ...data,
    };

    const response = await axios.get("/blog-details", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getBlogDetailById API Error:", err);
    throw err;
  }
};

// get seo
export const getSeo = async (data = {}) => {
  try {
    const response = await axios.get("/get-seo-details", { 
      params: data 
    });

    return decryptData(response);
  } catch (err) {
    console.error("getSeo API Error:", err);
    throw err;
  }
};



export const getDynamicPages = async (data = {}) => {
  try {
    const payload = {
      ...encryptReqData(data),
    };

    const response = await axios.get("/page-details", {
      params: payload,
    });

    return decryptData(response);
  } catch (err) {
    console.error("getDynamicPages API Error:", err);
    throw err;
  }
};