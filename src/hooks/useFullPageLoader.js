import React, { useState } from "react";
import Loader from "components/loader/Loader";

const useFullPageLoader = () => {
  const [loading, setLoading] = useState(true);

  return [
    loading ? <Loader status={loading} /> : null,
    () => setLoading(true), //Show loader
    () => setLoading(false), //Hide Loader
  ];
};

export default useFullPageLoader;
