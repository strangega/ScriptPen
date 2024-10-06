import React, { useState } from "react";
import { UserAuthInput } from "../components";
import { IoMdMail } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../utils/helper";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadInOut } from "../animations";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const createNewUser = async () => {
    if (getEmailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred.user.auth);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred.user);
          }
        })
        .catch((err) => {
          if (err.message.includes("invalid-credential")) {
            setAlert(true);
            setAlertMsg("Invalid credentials");
          } else {
            setAlert(true);
            setAlertMsg("Temporarily disabled due to many failed login!");
          }

          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <p className="py-12 text-2xl text-primaryText">Join With Us! 🚀</p>
      <div
        className="px-8 w-80
       md:w-auto py-4 rounded-xl gap-8 bg-secondary shadow-md flex-col items-center justify-center "
      >
        {/* email */}
        <UserAuthInput
          label="Email"
          placeholder="Email"
          isPass={false}
          key="Email"
          setStateFunction={setEmail}
          Icon={IoMdMail}
          setGetEmailValidationStatus={setGetEmailValidationStatus}
        />
        {/* password */}
        <UserAuthInput
          label="Password"
          placeholder="Password"
          isPass={true}
          key="Password"
          setStateFunction={setPassword}
          Icon={MdOutlinePassword}
        />
        {/* alert section */}
        <AnimatePresence>
          {alert && (
            <motion.p
              key={"AlertMessage"}
              {...fadInOut}
              className="text-red-400 flex items-center justify-center"
            >
              {alertMsg}
            </motion.p>
          )}
        </AnimatePresence>

        {/* login button */}

        {isLogin ? (
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-full py-2 my-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            onClick={loginWithEmailPassword}
          >
            <p className="text-xl text-white">Login</p>
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-full py-2 my-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            onClick={createNewUser}
          >
            <p className="text-xl text-white">Sign Up</p>
          </motion.div>
        )}

        {/* account text section */}
        {isLogin ? (
          <p className="text-sm text-primaryText flex items-center justify-center gap-3">
            Doesn't have an account!{" "}
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              Create Here
            </span>
          </p>
        ) : (
          <p className="text-sm text-primaryText flex items-center justify-center gap-3">
            Already have an account!{" "}
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              Login Here
            </span>
          </p>
        )}

        {/* or section */}
        <div className="flex items-center justify-center my-3 gap-6">
          <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
          <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
        </div>

        {/* google sign in */}

        <motion.div
          onClick={signInWithGoogle}
          whileTap={{ scale: 0.9 }}
          className="flex flex-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 px-1 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer my-4"
        >
          <FcGoogle className="text-3xl" />
          <p className="text-xl text-white">Sign in with google</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
