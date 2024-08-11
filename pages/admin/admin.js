import { getData } from "./firebase.js";

async function userCheck() {
  let data = await getData("users/");
  console.log(data, "dataa");
}

userCheck();

// window.location.href = "./admin.html";
