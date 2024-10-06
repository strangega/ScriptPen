import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { Controlled as ContolledContainer } from "react-codemirror2";

import { useState } from "react";
import { FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { IoLogoNodejs } from "react-icons/io";
export default function Editor(props) {
  const { dispName, value, language, onChange } = props;

  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  const [open, setOpen] = useState(true);
  const renderIcon = (dispName) => {
    switch (dispName) {
      case "HTML":
        return <FaHtml5 className="text-xl text-red-500" />;
      case "CSS":
        return <FaCss3 className="text-xl text-blue-500" />;
      case "JS":
        return <FaJs className="text-xl text-yellow-500" />;
      default:
        return null; // Return null if none of the cases match
    }
  };
  return (
    <div className={`editorContainer ${open ? `` : `collapsed`}`}>
      <div className="editorTitle flex justify-between">
        <div className="flex gap-3">
          {renderIcon(dispName)}
          {dispName}
        </div>

        <button
          type="button"
          className="expand-collapse-button"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <ContolledContainer
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
}
