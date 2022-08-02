import React, { createContext } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const FirebaseContext = createContext();

// Firebase Modular Imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Config
import FirebaseConfig from "./config/FirebaseConfig";

// Initialize Firebase
const app = initializeApp(FirebaseConfig);

// Firebase Modules Variables
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const Firebase = {
  // Auth Begins

  // Get Current User
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Check if User is Logged In
  checkAuth: (user) => {
    return onAuthStateChanged(auth, user);
  },

  // Get User Info
  getUserData: async (uid) => {
    try {
      const docRef = await doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (err) {
      console.log("Error @Firebase.getUserInfo: ", err.message);
    }
  },

  // Update User data
  updateUserData: async (uid, user) => {
    try {
      await updateDoc(doc(db, "users", uid), user);

      return true;
    } catch (err) {
      console.log("Error @Firebase.updateUserData: ", err.message);
    }
  },

  // Sign Up with Email and Password
  createUser: async (user) => {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;
      await setDoc(doc(db, "users", uid), {
        email: user.email,
        name: user.name,
        uid: uid,
      });

      delete user.password;

      return { ...user, uid };
    } catch (err) {
      console.log("Error @Firebase.createUser: ", err.message);
      alert(err.message);
    }
  },

  // Sign In with Email and Password
  signIn: async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log("Error @Firebase.signIn: ", err.message);
    }
  },

  // Sign Out
  signOut: async () => {
    try {
      await signOut(auth);

      return true;
    } catch (err) {
      console.log("Error @Firebase.signOut: ", err.message);
    }
    return false;
  },

  // Reset Password
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);

      return true;
    } catch (err) {
      console.log("Error @Firebase.resetPassword: ", err.message);
    }
  },

  // Delete User
  deleteUser: async (uid) => {
    try {
      await deleteDoc(doc(db, "users", uid));

      return true;
    } catch (err) {
      console.log("Error @Firebase.deleteUser: ", err.message);
    }
  },

  // Auth Ends
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider, FirebaseContext };
