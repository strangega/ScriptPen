import React from "react";
import { LineWave } from "react-loader-spinner";

const loader = () => {
  return (
    <LineWave
      visible={true}
      height="200"
      width="200"
      color="#4fa94d"
      ariaLabel="line-wave-loading"
      wrapperStyle={{}}
      wrapperClass=""
      firstLineColor="orange"
      middleLineColor="blue"
      lastLineColor="yellow"
    />
  );
};

export default loader;
