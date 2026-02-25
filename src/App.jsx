import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.css";
import "./App.scss";
import Routing from "./Routing/Routing";
import ScrollToTop from "./ScrollToTop/ScrollToTop";

import { AxiosInterceptor } from "config/axiosInstance";
import {
  disableReactDevTools,
  errorResponse,
  failResponse,
} from "config/config";
import { Toaster } from "react-hot-toast";



const App = () => {

  // disable react dev tools in production modes
  if (process.env.NODE_ENV === "production") {
    process.env.GRPC_VERBOSITY = "DEBUG";
    process.env.GRPC_TRACE = "all";
    disableReactDevTools();
  }

  // this function triggered when new message arrive

  return (
    <BrowserRouter>
      <AxiosInterceptor>
          <div className="App position-relative">
            <ScrollToTop />
            
            <Routing />
          </div>
          <Toaster
            position="top-right"
            // containerClassName="toastify"
            // toastOptions={{
            //   style: {
            //     boxShadow:
            //       "0 3px 10px rgb(0 0 0 / 0%), 0 3px 3px rgba(0, 0, 0, 0.05)",
            //     animation: "none",
            //   },
            // }}
          />
      </AxiosInterceptor>
    </BrowserRouter>
  );
};

export default App;
