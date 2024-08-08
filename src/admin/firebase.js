// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
  push,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBY1_bOHd9MeWGIJO5esI5g8jDvGbJHAWg",
  authDomain: "team-3-b32d1.firebaseapp.com",
  databaseURL:
    "https://team-3-b32d1-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "team-3-b32d1",
  storageBucket: "team-3-b32d1.appspot.com",
  messagingSenderId: "261484342305",
  appId: "1:261484342305:web:d4b3796f4110fedeee4760",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

function writeUserData(name, password) {
  set(ref(db, "users/"), {
    username: name,
    password: password,
  });
}
writeUserData("admin", "adminpas");

export async function getData(dbName) {
  try {
    let data = await get(ref(db, dbName));
    if (data.exists()) {
      return data.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.log(error);
  }
}
