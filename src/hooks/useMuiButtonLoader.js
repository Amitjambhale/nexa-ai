import { useState, useEffect } from "react";

const useMuiButtonLoader = () => {
  const [isLoading, setLoading] = useState(false);
  const [element, setElement] = useState({ disabled: false, loading: false });

  useEffect(() => {
    if (isLoading) {
      setElement({ ...element, disabled: true, loading: true });
    } else {
      setElement({ ...element, disabled: false, loading: false });
    }
    // eslint-disable-next-line
  }, [isLoading]);

  return [element, setLoading];
};

export default useMuiButtonLoader;
