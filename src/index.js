import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import {
  AddonContextProvider,
  CourseContextProvider,
  LanguageContextProvider,
} from "context/context";
import { CookiesProvider } from "react-cookie";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AddonContextProvider>
        <LanguageContextProvider>
          <CourseContextProvider>
            <App />
          </CourseContextProvider>
        </LanguageContextProvider>
      </AddonContextProvider>
    </CookiesProvider>
  </React.StrictMode>
);


