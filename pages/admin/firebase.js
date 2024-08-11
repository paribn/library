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

// function writeUserData(name, password) {
//   set(ref(db, "users/"), {
//     username: name,
//     password: password,
//   });
// }
// writeUserData("admin", "adminpas");

export async function writeBasicData(dbName, data) {
  set(ref(db, dbName), data);
}

// get single  data from db. cannot use it if you have more than one data
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

// it will return all data from db. example usage : readPushedData("books/"); IT CAN BE USED FOR WHICH DATA STORED WITH PUSH METHOD
export async function readPushedData(dbName) {
  try {
    const snapshot = await get(ref(db, dbName));
    if (snapshot.exists()) {
      let newData = Object.entries(snapshot.val()).map((item) => ({
        id: item[0],
        ...item[1],
      }));
      return newData;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// delete data from db. example usage : deleteData("books/-N7cXQ2zQjIYy9WQ7w3x");
export function deleteData(dbTable) {
  remove(ref(db, dbTable));
}

// update existing data example : updateData("books/", "-N7cXQ2zQjIYy9WQ7w3x", {name : "book1", author : "author1"});
export function updateData(dbTable, dataID, data) {
  update(ref(db, dbTable + dataID), data);
}

// push data with unic id  data must be in json format example : pushData("books/", {name : "book1", author : "author1"});
export function pushData(dbTable, data) {
  push(ref(db, dbTable), data);
}
