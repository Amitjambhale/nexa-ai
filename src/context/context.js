const { createContext, useContext, useState } = require("react");

const LanguageContext = createContext();

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("EN");
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

// course context
const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [course, setCourse] = useState({});
  const [myallCourses, mysetAllCourses] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [notificationCheck, setNotificationCheck] = useState(0);
  const [mentorfindstudentformflag, setMentorfindstudentformflag] = useState(false);
  const [MentorshipFlag, setMentorshipFlag] = useState(false);
  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
        mysetAllCourses,
        myallCourses,
        allNotifications,
        setAllNotifications,
        notificationCheck,
        setNotificationCheck,
        mentorfindstudentformflag,
        setMentorfindstudentformflag,
        MentorshipFlag,
        setMentorshipFlag
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  return useContext(CourseContext);
};

// course addons context
const AddonContext = createContext();

export const AddonContextProvider = ({ children }) => {
  const [addons, setAddons] = useState({});
  return (
    <AddonContext.Provider value={{ addons, setAddons }}>
      {children}
    </AddonContext.Provider>
  );
};

export const useAddons = () => {
  return useContext(AddonContext);
};
