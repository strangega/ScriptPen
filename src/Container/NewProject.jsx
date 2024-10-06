import "./App.css";
import React, { useState, useEffect } from "react";
import Editor from "./editor";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Alert, UserDetails } from "../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
function App() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const htmlContent = params.get("html") || "";
  const cssContent = params.get("css") || "";
  const jsContent = params.get("js") || "";
  const titleContent = params.get("title") || "Untitled";
  const [html, sethtml] = useState(htmlContent);
  const [css, setcss] = useState(cssContent);
  const [js, setjs] = useState(jsContent);
  const [title, setTitle] = useState(titleContent);
  const [source, setSource] = useState(`
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
  </html>`);
  const [isTitle, setIsTitle] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSource(`
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
  </html>`);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const saveProgram = async () => {
    const id = `${Date.now()}`; // Unique ID based on timestamp
    const docRef = doc(db, "Projects", id);
    const data = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: source,
      user: user,
    };

    try {
      await setDoc(docRef, data);
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } catch (err) {
      console.error(err); // Error handling
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* alert section */}
      <AnimatePresence>
        {alert && <Alert status={"Success"} alertMsg={"Project Saved.."} />}
      </AnimatePresence>
      {/* header section */}

      <header className="w-full flex items-center justify-between px-12 py-2">
        <div className="flex items-center justify-center gap-6">
          <Link to={"/home"}>
            <div
              className="w-full h-auto text-white text-3xl px-2 font-bold items-center"
              style={{ fontFamily: `'Playfair Display', 'Georgia', serif` }}
            >
              ScriptPen
            </div>
          </Link>
          <div className="flex flex-col items-start justify-start">
            {/* title section */}
            <div className=" flex justify-center items-center gap-3">
              <AnimatePresence>
                {isTitle ? (
                  <>
                    <motion.input
                      key="TitleInput"
                      type="text"
                      placeholder="Your Title"
                      className="px-3 py-2 rounded-md bg-transparent
            text-primaryText  outline-none border-none text-md"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <motion.p
                      key={"titleLabel"}
                      className="px-3 py-1 text-white  text-md"
                    >
                      {title}
                    </motion.p>
                  </>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isTitle ? (
                  <>
                    <motion.div
                      key={"Check"}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                      onClick={() => {
                        if (!title) {
                          setTitle("Untitled");
                        }
                        setIsTitle(false);
                      }}
                    >
                      <FaCheck className="text-2xl text-emerald-400" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      key={"Edit"}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer"
                      onClick={() => setIsTitle(true)}
                    >
                      <MdEdit className="text-xl text-primaryText" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            {/* follow section */}
            <div className="flex items-center justify-center px-3 -mt-2 gap-2">
              <p className="text-primaryText text-sm mt-1">
                {user?.displayName
                  ? user?.displayName
                  : `${user?.email.split("@")[0]}`}
              </p>
              <motion.p
                whileTap={{ scale: 0.9 }}
                className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer mt-2"
              >
                + Follow
              </motion.p>
            </div>
          </div>
        </div>
        {/* user section */}
        {user && (
          <div className="flex items-center justify-center gap-4">
            <motion.button
              onClick={saveProgram}
              whileTap={{ scale: 0.9 }}
              className="px-5 py-1.5 bg-primaryText cursor-pointer text-base text-white font-semibold rounded-md "
            >
              Save
            </motion.button>
            <UserDetails />
          </div>
        )}
      </header>

      <div className="panel top-panel flex flex-start w-full bg-gray-950 overflow-hidden">
        <Editor
          language="xml"
          dispName="HTML"
          value={html}
          onChange={sethtml}
        />
        <Editor
          language="css"
          dispName="CSS"
          value={css}
          onChange={setcss}
          className="overflow-hidden"
        />
        <Editor
          language="javascript"
          dispName="JS"
          value={js}
          onChange={setjs}
        />
      </div>
      <div className="panel bg-white">
        {/* <h2>Output:</h2> */}
        <iframe
          srcDoc={source}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
