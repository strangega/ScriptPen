import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";
import { Menus, signOutAction } from "../utils/helper";
import { Link } from "react-router-dom";
import { slideDown } from "../animations";

const UserDetails = () => {
  const user = useSelector((state) => state.user?.user);
  const [isMenu, setIsMenu] = useState(false);
  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-12 h-11 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={user?.photoUR}
              alt={user?.displayName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>
      <motion.div
        onClick={() => setIsMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
      >
        <FaAngleDown className="text-primaryText" />
      </motion.div>
      <AnimatePresence>
        {isMenu && (
          <motion.div
            {...slideDown}
            className="bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]"
          >
            {Menus.map((menu) => (
              <Link
                to={menu.uri}
                key={menu.id}
                className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.01)] px-2 py-1 w-full rounded-md"
              >
                {menu.name}
              </Link>
            ))}
            <motion.p
              onClick={signOutAction}
              whileTap={{ scale: 0.9 }}
              className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.01)] px-2 py-1 w-full rounded-md"
            >
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDetails;
