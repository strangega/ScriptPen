import React from "react";
import { motion } from "framer-motion";
import { slideDown } from "../animations";

const Alert = ({ status, alert, alertMsg }) => {
  return (
    <motion.div {...slideDown} className=" absolute top-14 right-32 z-10">
      {status === "Success" && (
        <div className=" w-max px-4 py-1 rounded-md bg-emerald-400 shadow-md shadow-emerald-500">
          <p className="text-md text-primary">{alertMsg}</p>
        </div>
      )}

      {status === "Warning" && (
        <div className=" w-max px-4 py-1 rounded-md bg-yellow-400 shadow-md shadow-yellow-500">
          <p className="text-md text-primary">{alertMsg}</p>
        </div>
      )}

      {status === "Danger" && (
        <div className=" w-max px-4 py-1 rounded-md bg-red-400 shadow-md shadow-red-500">
          <p className="text-md text-primary">{alertMsg}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
