// src/components/HelloButton.jsx
import React, { useState } from "react";

const HelloButton = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      You clicked {count} times mingcute:arrow-left-line
    </button>
  );
};

export default HelloButton;
