import { useEffect, useRef, useState } from "react";

const useVdocipher = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const scriptRef = useRef(null);
  useEffect(() => {
    if (isScriptLoaded) return;

    const script = document.createElement("script");
    script.onload = () => setIsScriptLoaded(true);
    script.src = "https://player.vdocipher.com/v2/api.js";
    scriptRef.current = script;
    document.body.append(script);

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  });

  const destroyVideo = function (iframe) {
    if (iframe && iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  };

  return {
    loadVideo: function ({ otp, playbackInfo, container, configuration = {} }) {
      const params = new URLSearchParams("");
      const parametersToAdd = { otp, playbackInfo, ...configuration };
      for (const item in parametersToAdd) {
        params.append(item, parametersToAdd[item]);
      }
      const iframe = document.createElement("iframe");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("allow", "autoplay; encrypted-media");
      iframe.setAttribute("frameborder", "0");
      iframe.style =
        "height: 400px; width: 100%; overflow: auto; border-radius:12px;";
      iframe.src = "https://player.vdocipher.com/v2/?" + params;
      container.append(iframe);
      return iframe;
    },
    isAPIReady: isScriptLoaded,
    destroyVideo,
  };
};

export default useVdocipher;
