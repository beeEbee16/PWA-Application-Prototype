import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { loginBtn, logoutBtn } from "./nav.js";
import { loadHists, syncHist } from "./indexDB.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo6VodSwglHUQyJ-wbj1Kt7QYs8FTfmFI",
  authDomain: "web-dev-pwa-c2fc3.firebaseapp.com",
  projectId: "web-dev-pwa-c2fc3",
  storageBucket: "web-dev-pwa-c2fc3.firebasestorage.app",
  messagingSenderId: "758195619522",
  appId: "1:758195619522:web:c88930d9ea5095edbd9d5b",
  measurementId: "G-YNXJR2MBLM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export let currUser = null;
console.log("currUser cleared");


document.addEventListener("DOMContentLoaded", () => {
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {userSignIn()});
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {userSignOut()});
  }
  
  // Check if the user is authenticated
  onAuthStateChanged(auth, (user) => {    
    if (user) {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "block";
      //currUserId = user.uid;
      currUser = user;
      console.log("currUser set: " + currUser.displayName);
      loadHists();
      syncHist();
      
    } else {
      loginBtn.style.display = "block";
      logoutBtn.style.display = "none";
      alert("You need to be logged in to play the quizzes.");
      //window.location.href = "/index.html";
    }
  })
});

export const userSignIn = async () => {
  signInWithPopup(auth, provider)
  .then((result) => {
      const user = result.user;
      console.log(user);
  }).catch((e) => {
      console.error(e);
  })
}

export const userSignOut = async () => {
  signOut(auth).then(() => {
      alert("You have signed out successfully!");
  }).catch((e) => {
      console.error(e);
  })
}