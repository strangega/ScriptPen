import { GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { v4 as uuidv4 } from 'uuid';
import {auth} from "../config/firebase.config"

const googleProvider=new GoogleAuthProvider()

export const signInWithGoogle=async()=>{
  await signInWithPopup(auth,googleProvider).then(userCred=>{
    window.location.reload()
  })
}

export const Menus = [
{ id: uuidv4(), name: "Projects", uri: "/home/projects" },
// { id: uuidv4(), name: "Collections", uri: "/home/collection" },
// { id: uuidv4(), name: "Profile", uri: "/home/profile" },
];   

export const signOutAction=async()=>{
  await auth.signOut().then(()=>{
    window.location.reload();
  })
}