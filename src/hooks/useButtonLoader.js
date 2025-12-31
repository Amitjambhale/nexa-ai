import { useRef, useState, useEffect } from "react";

const useButtonLoader = (defaultText = "Load", withArrow = false) => {
  const [isLoading, setLoading] = useState(false);
  const element = useRef(null);

  useEffect(() => {
    if (element.current) {
      if (isLoading) {
        element.current.disabled = true;
        element.current.innerHTML =
          '<span animation="border" role="status" class="spinner-border spinner-border-sm"><span class="visually-hidden">Loading...</span></span> ';
      } else {
        if (element.current) {
          element.current.disabled = false;
          if (withArrow) {
            element.current.innerHTML = `${defaultText} <span class="icon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path></svg></span>`;
          } else {
            element.current.innerHTML = `${defaultText}`;
          }
        }
      }
    }
    // eslint-disable-next-line
  }, [isLoading]);

  return [element, setLoading];
};

export default useButtonLoader;
