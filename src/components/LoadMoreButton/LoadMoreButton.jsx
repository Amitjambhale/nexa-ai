import React from "react";
import { FaPlus, FaSpinner } from "react-icons/fa";
import "./LoadMoreButton.scss";

const LoadMoreButton = ({ 
  onLoadMore, 
  loading, 
  hasNextPage, 
  label = "Load More", 
  loadingLabel = "Loading..." 
}) => {
  // Agar next page nahi hai, toh kuch mat dikhao
  if (!hasNextPage) return null;

  return (
    <div className="reusable-load-more-container">
      <button
        className={`load-more-btn ${loading ? "is-loading" : ""}`}
        onClick={onLoadMore}
        disabled={loading}
      >
        {loading ? (
          <>
            <FaSpinner className="spinner-icon" /> {loadingLabel}
          </>
        ) : (
          <>
            {label}
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;