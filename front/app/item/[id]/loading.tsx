import React from "react";
import { Spin } from "antd";

const Loading: React.FC<CustomSpinProps> = (props) => {
  return (
    <div className="loading">
      {" "}
      <Spin
        className="flex items-center place-content-center justify-center red-spin red-6"
        size="large"
        style={{
          height: "100%",
          width: "auto",
          margin: "250px",
          color: "red",
        }}
      />
    </div>
  );
};

export default Loading;
