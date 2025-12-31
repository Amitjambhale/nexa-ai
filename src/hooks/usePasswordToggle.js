import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);

  const Icon = visible ? (
    <AiOutlineEye onClick={() => setVisible((visible) => !visible)} />
  ) : (
    <AiOutlineEyeInvisible onClick={() => setVisible((visible) => !visible)} />
  );

  const inputType = visible ? "text" : "password";

  return [inputType, Icon];
};

export default usePasswordToggle;
