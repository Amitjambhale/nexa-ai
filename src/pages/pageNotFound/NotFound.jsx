import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="notfound-page">
      {/* Animated background shapes */}
      <div className="notfound-bg-shape notfound-shape-1" />
      <div className="notfound-bg-shape notfound-shape-2" />
      <div className="notfound-bg-shape notfound-shape-3" />

      <motion.div
        className="notfound-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="notfound-code"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="notfound-title"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          className="notfound-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          The page you’re looking for doesn’t exist,  
          might have been moved, or is temporarily unavailable.
        </motion.p>

        <motion.div
          className="notfound-actions"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <Link to="/" className="notfound-btn notfound-primary">
           Back To Home
          </Link>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
