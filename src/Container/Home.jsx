import React, { useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { TbHomeFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import { RiSearch2Line } from "react-icons/ri";
import { Link, Route, Routes } from "react-router-dom";
import { SignUp, Projects } from "../Container";
import { useDispatch, useSelector } from "react-redux";
import { UserDetails } from "../components";
import { SET_SEARCH_TERM } from "../context/actions/searchActions";
const Home = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`w-2 ${
          sideMenu ? "w-2" : "flex-[.3] xl:flex-[.18]"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-4 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
      >
        {/* anchor */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setSideMenu(!sideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-7 flex items-center justify-center cursor-pointer"
        >
          <FaArrowRightArrowLeft className="text-white text-xl" />
        </motion.div>
        {/* logo */}
        <div className="overflow-hidden w-full flex flex-col gap-2 items-center">
          <Link to={"/home"}>
            <div
              className="w-full h-auto text-white text-3xl px-2 font-bold items-center"
              style={{ fontFamily: `'Playfair Display', 'Georgia', serif` }}
            >
              ScriptPen
            </div>
          </Link>
          {/* start coding */}
          <Link
            to={{
              pathname: "/newProject",
              state: {
                project: {
                  html: "",
                  css: "",
                  js: "",
                  title: "Untitled",
                },
              },
            }}
            className="group "
          >
            <div
              whileTap={{ scale: 0.96 }}
              className="px-4 py-3 my-2 flex items-center justify-center rounded-xl border  border-gray-400 cursor-pointer group-hover:border-gray-100 "
            >
              <p className=" text-gray-400 group-hover:text-gray-200 capitalize">
                Start Coding
              </p>
            </div>
          </Link>
          {/* home */}
          {user && (
            <Link
              to={"/home/projects"}
              className="flex items-center justify-center gap-2 cursor-pointer group"
            >
              <TbHomeFilled className="text-primaryText text-xl group-hover:text-gray-200" />
              <p className="text-lg text-primaryText group-hover:text-gray-200">
                Home
              </p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
        {/* top section */}
        <div className="w-full flex items-center justify-between ">
          {/* search */}
          <div className=" bg-secondary w-full px-4 py-3  mx-5 rounded-md  flex items-center justify-center gap-3">
            <RiSearch2Line className="text-2xl text-primaryText" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
              className="flex-1 px-4  text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
              placeholder="search here"
            />
          </div>
          {/* profile */}
          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3"
            >
              <Link
                to={"/home/auth"}
                className="bg-emerald-400 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
              >
                SignUp
              </Link>
            </motion.div>
          )}
          {user && <UserDetails />}
        </div>
        {/* bottom section */}
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
