import moment from "moment";
import { normalDecryptData, normalEncryptData } from "./config";

export function isLoggedIn() {
  const cookieName = process.env.REACT_APP_AUTH || "access_token";

  const cookies = document.cookie.split(";");

  let accessToken = null;

  for (let c of cookies) {
    const [key, value] = c.split("=").map(v => v.trim());
    if (key === cookieName) {
      accessToken = decodeURIComponent(value);
      break;
    }
  }

  if (!accessToken) return null;

  try {
    // JWT decode
    const base64Payload = accessToken.split(".")[1];
    const decodedPayload = JSON.parse(atob(base64Payload));

    console.log("JWT payload:", decodedPayload);

    const now = Date.now() / 1000;

    // Check exp
    if (decodedPayload.exp && decodedPayload.exp < now) {
      console.log("Token expired");
      return null;
    }

    return decodedPayload; // user is logged in
  } catch (err) {
    console.log("JWT decode failed:", err);
    return null;
  }
}



export function multiPartData(data) {
  let multiPart = new FormData();
  for (let key in data) {
    multiPart.append(key, data[key]);
  }

  return multiPart;
}

export function checkPassword(str) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
}

export function capitalizeFirstLetter(string) {
  //return ;
  return string;
  //return str.charAt(0).toUpperCase() + str.slice(1);
}

// get marks percentage
export function getMarkPercentage(marks = 0, total = 0) {
  return (marks / total) * 100;
}

// test access with startDate and End date
export function testAccess(startDate, validDate) {
  if (startDate && validDate) {
    const startDateUTC = new Date(startDate).toLocaleString("en-US", {
      timeZone: "UTC",
    });
    const endDateUTC = new Date(validDate).toLocaleString("en-US", {
      timeZone: "UTC",
    });
    const validDateFormat = moment(endDateUTC).format("YYYY-MM-DD");
    const startDateFormat = moment(startDateUTC).format("YYYY-MM-DD");
    const currentDate = moment().format("YYYY-MM-DD");
    return currentDate >= startDateFormat && currentDate <= validDateFormat;
  } else {
    return false;
  }
}

export function testIsStarted(startDate) {
  if (startDate) {
    const startDateUTC = new Date(startDate).toLocaleString("en-US", {
      timeZone: "UTC",
    });
    const startDateFormat = moment(startDateUTC).format("YYYY-MM-DD");
    const currentDate = moment().format("YYYY-MM-DD");
    return currentDate < startDateFormat;
  } else {
    return false;
  }
}

export function testIsExpired(endDate) {
  if (endDate) {
    const endDateUTC = new Date(endDate).toLocaleString("en-US", {
      timeZone: "UTC",
    });
    const endDateFormat = moment(endDateUTC).format("YYYY-MM-DD");
    const currentDate = moment().format("YYYY-MM-DD");
    return currentDate > endDateFormat;
  } else {
    return false;
  }
}

// course access with startDate and End date
export function courseAccess(startDate) {
  if (startDate) {
    const startDateUTC = new Date(startDate).toLocaleString("en-US", {
      timeZone: "UTC",
    });
    const startDateFormat = moment(startDateUTC);
    const currentDate = moment();
    return currentDate >= startDateFormat;
  } else {
    return false;
  }
}

// test access with startDate only
export function testAccessWithStartDate(startDate) {
  if (startDate) {
    const startDateUTC = new Date(startDate).toLocaleString("en-US", {
      timeZone: "UTC",
    });
    const startDateFormat = moment(startDateUTC);
    const currentDate = moment();
    return currentDate > startDateFormat;
  } else {
    return false;
  }
}

export function lectureAccess(startDate, endDate, lectureTime = "") {
  const startDateFormat = new Date(startDate).toLocaleString("en-US", {
    timeZone: "UTC",
  });
  const endDateFormat = new Date(endDate).toLocaleString("en-US", {
    timeZone: "UTC",
  });
  lectureTime = moment(endDateFormat).format("HH:mm");
  const startDateObj = new Date(startDateFormat);
  const endDateObj = new Date(endDateFormat);
  const currentTime = new Date();

  // Split the lectureTime string into hours and minutes
  // const [lectureHour, lectureMinute] = lectureTime?.split(":").map(Number);

  // Set the lecture time for the startDate
  // startDateObj.setHours(lectureHour);
  // startDateObj.setMinutes(lectureMinute);

  // endDateObj.setHours(lectureHour);
  // endDateObj.setMinutes(lectureMinute);

  const isValidTimeRange =
    currentTime >= startDateObj && currentTime <= endDateObj;

  return isValidTimeRange;
}

export function lectureIsStarted(startDate, lectureTime) {
  const startDateFormat = new Date(startDate).toLocaleString("en-US", {
    timeZone: "UTC",
  });
  const startDateObj = new Date(startDateFormat);
  const currentTime = new Date();

  // Split the lectureTime string into hours and minutes
  // const [lectureHour, lectureMinute] = lectureTime.split(":").map(Number);

  // Set the lecture time for the startDate
  // startDateObj.setHours(lectureHour);
  // startDateObj.setMinutes(lectureMinute);

  const isValidTimeRange = currentTime <= startDateObj;

  return isValidTimeRange;
}

export function lectureIsExpired(endDate, lectureTime) {
  const endDateFormat = new Date(endDate).toLocaleString("en-US", {
    timeZone: "UTC",
  });
  const endDateObj = new Date(endDateFormat);
  const currentTime = new Date();

  // Split the lectureTime string into hours and minutes
  // const [lectureHour, lectureMinute] = lectureTime.split(":").map(Number);

  // Set the lecture time for the startDate
  // endDateObj.setHours(lectureHour);
  // endDateObj.setMinutes(lectureMinute);

  const isValidTimeRange = currentTime >= endDateObj;

  return isValidTimeRange;
}

export function momentDateFormat(date) {
  if (date) {
    const dateFormat = new Date(date).toLocaleString("en-US", {
      timeZone: "UTC",
    });
    return moment(dateFormat).format("DD MMM YYYY");
  } else {
    return "-- --- ----";
  }
}

export function dateFormat(date) {
  if (date) {
    return new Date(Date.parse(date)).toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } else {
    return "-- --- ----";
  }
  // return moment(date).format("DD/MM/YYYY");
}

export function simpleDateFormat(date) {
  return moment(date).format("YYYY-MM-DD");
}

export function timeFormat(date) {
  if (date) {
    const newFormatDate = new Date(date).toLocaleString("en-US", {
      timeZone: "UTC",
    });
    return new Date(Date.parse(newFormatDate)).toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  } else {
    return "--:--:--";
  }
}

export function dateTimeFormat(date) {
  return date ? moment(date).format("DD MMM YYYY H:mm") : "-- --- ----- --:--";
}

export function ShortString(string) {
  return string.substr(-100);
}

//get device status online ofline time
export function deviceOnlineStatus(deviceStatusTime) {
  let currentTime = moment(new Date());
  let lastUpdatedTime = moment(new Date(parseInt(deviceStatusTime)));
  let totalMinutes = currentTime.diff(lastUpdatedTime, "minutes");
  let deviceStatus;
  if (totalMinutes > 10) {
    deviceStatus = false;
  } else {
    deviceStatus = true;
  }
  return deviceStatus;
}

export function errorMsg() {
  return "Something wents wrong, please try again";
}

export function validateEmail(mail) {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(mailFormat)) {
    return true;
  } else {
    return false;
  }
}

export function validateMobile(mobile) {
  const mobileFormat = /^[6-9]\d{9}$/;
  if (mobile.match(mobileFormat)) {
    return true;
  } else {
    return false;
  }
}

// this function checks dat is available or not
export function dataIsAvailable(data) {
  return data ? data : "N/A";
}

// this function is used for character limitation
export function charLimit(data, limit) {
  return data?.length > limit ? data.substring(0, limit + 1) + "..." : data;
}

// this function is used to get arrays of counts
export function countArray(limit) {
  let arr = [];
  for (let i = 1; i <= +limit; i++) {
    arr.push(i);
  }
  return arr;
}

export const timeFormatWith12Hour = (time) => {
  return moment(timeConverter(time)).format("hh:mm A");
};

export const timeConverter = (time, date) => {
  if (time) {
    const newFormatDate = new Date(date).toLocaleString("en-US", {
      timeZone: "UTC",
    });

    const fullYear = date
      ? new Date(newFormatDate).getFullYear()
      : new Date().getFullYear();
    const month = date
      ? new Date(newFormatDate).getMonth()
      : new Date().getMonth();
    const newDate = date
      ? new Date(newFormatDate).getDate()
      : new Date().getDate();

    const editTime = time.split(":");
    return new Date(fullYear, month, newDate, editTime[0], editTime[1]);
  } else {
    return new Date();
  }
};

export const timeFormatWith12Hour2 = (time) => {
  return moment(timeConverter2(time)).format("hh:mm A");
};

export const timeConverter2 = (date) => {
  if (date) {
    const newFormatDate = new Date(date);
    // .toLocaleString("en-US", {
    //   timeZone: "UTC",
    // });
    return new Date(newFormatDate);
  } else {
    return new Date();
  }
};

export function customSetHours(dt, h) {
  var s = /(\d+):(\d+) (.+)/.exec(h);
  dt.setHours(s[3] === "pm" ? 12 + parseInt(s[1], 10) : parseInt(s[1], 10));
  dt.setMinutes(parseInt(s[2], 10));
  return dt;
}

export function addressFormatter(data, type) {
  if (
    data[`${type}HouseNo`] ||
    data[`${type}Street`] ||
    data[`${type}Street`] ||
    data[`${type}City`] ||
    data[`${type}State`] ||
    data[`${type}Landmark`] ||
    data[`${type}ZipCode`]
  ) {
    return `${data[`${type}HouseNo`]} 
  ${data[`${type}Street`]} 
  ${data[`${type}City`]} ${data[`${type}State`]} 
  ${data[`${type}Landmark`]} 
  ${data[`${type}ZipCode`]}`;
  } else {
    return "N/A";
  }
}

// slider show item
export const sliderItem = (arr = [], item = 3) => {
  // if (arr.length === 3) {
  //   return 2;
  // }
  if (arr.length >= item) {
    return item - 1;
  }
  if (arr.length < 3) {
    return arr.length;
  }
  if (arr.length < 7) {
    return arr.length;
  }
};

// minutes conversions
export const minutesConversion = (time = 0) => {
  return String(Math.floor(time / 60)).padStart(2, 0);
};

// seconds conversions
export const secondsConversion = (time = 0) => {
  return String(time % 60).padStart(2, 0);
};

// get next days
export function getNextDates(date, daysRequired = 7) {
  let days = [];
  let finalDate = date
    ? moment(date).startOf("week").add(1, "days")
    : moment().startOf("week").add(1, "days");

  for (let i = 0; i < daysRequired; i++) {
    days.push(moment(finalDate).add(i, "days").format("YYYY-MM-DD"));
  }
  return days;
}

// get previous days
export function getPreviousDays(date = new Date()) {
  let previousDate = moment(date)
    .subtract(8, "days")
    .startOf("day")
    .format("YYYY-MM-DD");
  return getNextDates(previousDate);
}

// group data by key
export function groupBy(array, key) {
  // let getTimestamp = (str) => new Date(...str.split("-").reverse());
  const arr = array.reduce((acc, obj) => {
    const property = moment(momentDateFormat(obj[key])).format("YYYY-MM-DD");
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
  let completeArr = [];
  for (let a in arr) {
    completeArr.push({ date: a, data: arr[a] });
  }
  return completeArr.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// get only current month data
export function getCurrentMonthData(dateArray = []) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const filteredDates = dateArray.filter((dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return year === currentYear && month === currentMonth;
  });

  return filteredDates;
}

// get prev month data
export function getPreviousMonthData(dateArray = []) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const filteredDates = dateArray.filter((dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    return year === previousYear && month === previousMonth;
  });

  return filteredDates;
}

export const ALPHABETS_COUNT = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
  9: "I",
  10: "J",
  11: "K",
  12: "L",
  13: "M",
  14: "N",
  15: "O",
  16: "P",
  17: "Q",
  18: "R",
  19: "S",
  20: "T",
  21: "U",
  22: "V",
  23: "W",
  24: "X",
  25: "Y",
  26: "Z",
};

// add days in date
export const addDaysInDate = (date, days) => {
  return date ? moment(date, "DD MMM YYYY").add(+days, "days") : "-- --- ----";
};

export function stringAvatar(name) {
  if (name.split(" ")[1]) {
    return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  } else {
    return `${name.split(" ")[0][0]}${name.split(" ")[0][0]}`;
  }
}

// get browser name
export const getBrowserName = () => {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "unknown";
  }
  return browserName;
};

// get os detail
export const getOSDetail = () => {
  if (window.navigator.platform.indexOf("Win") !== -1) {
    return "Windows";
  } else if (window.navigator.platform.indexOf("Mac") !== -1) {
    return "Mac";
  } else if (window.navigator.platform.indexOf("Linux") !== -1) {
    return "Linux";
  } else {
    return "Unknown";
  }
};

// convert seconds to minute
export function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  // const remainingSeconds = seconds % 60;

  // return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  return minutes;
}

export function getLocalTrackingTime(
  courseId,
  lectureId,
  sectionId,
  type = "shub-playtime"
) {
  return normalDecryptData(localStorage.getItem(type))
    ? JSON.parse(normalDecryptData(localStorage.getItem(type)))[
        `${courseId},${sectionId},${lectureId}`
      ]
    : {};
}

export function setLocalTrackingTime(
  courseId,
  lectureId,
  sectionId,
  type = "shub-playtime",
  data
) {
  let trackData = normalDecryptData(localStorage.getItem(type))
    ? JSON.parse(normalDecryptData(localStorage.getItem(type)))
    : 0;

  trackData = {
    [`${courseId},${sectionId},${lectureId}`]:
      +[`${courseId},${sectionId},${lectureId}`] || 0 + data,
  };

  localStorage.setItem(type, normalEncryptData(JSON.stringify(trackData)));
}

export function getLocalTrackingTimeLecture(
  courseId,
  lectureId,
  type = "shub-playtime"
) {
  return normalDecryptData(localStorage.getItem(type))
    ? JSON.parse(normalDecryptData(localStorage.getItem(type)))[
        `${courseId},${lectureId}`
      ]
    : {};
}

export function setLocalTrackingTimeLecture(
  courseId,
  lectureId,
  type = "shub-playtime",
  data
) {
  let trackData = normalDecryptData(localStorage.getItem(type))
    ? JSON.parse(normalDecryptData(localStorage.getItem(type)))
    : 0;

  trackData = {
    [`${courseId},${lectureId}`]: +[`${courseId},${lectureId}`] || 0 + data,
  };

  localStorage.setItem(type, normalEncryptData(JSON.stringify(trackData)));
}

export function getLocalConfig(key, type = "config") {
  return normalDecryptData(sessionStorage.getItem(type))
    ? JSON.parse(normalDecryptData(sessionStorage.getItem(type)))[key]
    : "";
}

export function setLocalConfig(key, value, type = "config") {
  let configData = normalDecryptData(sessionStorage.getItem(type))
    ? JSON.parse(normalDecryptData(sessionStorage.getItem(type)))
    : {};

  configData = {
    ...configData,
    [key]: value,
  };

  sessionStorage.setItem(type, normalEncryptData(JSON.stringify(configData)));
}

// convert minutes to hours,minute and seconds
export function convertMinutesToHoursMinutesSeconds(minutes) {
  if (isNaN(minutes) || minutes < 0) {
    return "Invalid input";
  }

  // if data is 0
  if (minutes <= 0) {
    return "0 sec";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  const remainingSeconds = Math.round((minutes % 1) * 60); // Round to the nearest second

  let result = "";

  if (hours > 0) {
    result += hours + " hr";

    result += ", ";
  }

  if (remainingMinutes > 0) {
    result += remainingMinutes + " min";

    if (remainingSeconds > 0) {
      result += ", ";
    }
  }

  if (remainingSeconds > 0) {
    result += remainingSeconds + " sec";
  }

  return result;
}

// this function is used for display time like (today ,yesterday,and other date)
export const todaysDate = (date) => {
  let finalDate = new Date(date);
  // .toLocaleString("en-US", {
  //   timeZone: "UTC",
  // });
  finalDate = moment(finalDate).format("DD-MM-YYYY");
  if (finalDate === moment().format("DD-MM-YYYY")) {
    return "Today";
  } else if (finalDate === moment().add(-1, "days").format("DD-MM-YYYY")) {
    return "Yesterday";
  } else {
    return finalDate;
  }
};

// remove dots from string like :- email
export const removeDots = (str = "") => {
  const email_s = str.split("@");
  return email_s[0].replace(/\./g, "") + "@" + email_s[1];
};

export const liveLectureLinkCreation = (mediaId) => {
  return `${process.env.REACT_APP_LIVE_LECTURE}${mediaId}&mode=1080p`;
};

export const reverseString = (str = "") => {
  var splitString = str.split("");

  var reverseArray = splitString.reverse();

  var joinArray = reverseArray.join("");

  return joinArray;
};
