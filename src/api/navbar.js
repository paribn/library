import { pushData } from "../admin/firebase.js";

const btn_resp = document.querySelector(".btn_resp");
const navbar_resp = document.querySelector(".navbar_resp");
const btn_close = document.querySelector(".btn_close");
const joinUsContainer = document.querySelector(".joinUsContainer");
const joinUsForm = document.querySelector(".joinUsForm");
const closeJoinUs = document.querySelector(".closeJoinUs");
const join = document.querySelector(".join");

btn_resp.addEventListener("click", function () {
  console.log("open");
  navbar_resp.style.display = "block";
});

btn_close.addEventListener("click", function () {
  navbar_resp.style.display = "";
});

joinUsContainer.addEventListener("click", (e) => {
  if (e.target === joinUsContainer) {
    joinUsContainer.style = "display:none";
  }
});

closeJoinUs.addEventListener("click", () => {
  joinUsContainer.style = "display:none";
});

join.addEventListener("click", () => {
  joinUsContainer.style = "display:flex";
});

const joinUsName = document.querySelector(".joinUserName");
const joinUsEmail = document.querySelector(".joinUsEmail");
const joinUsLogin = document.querySelector(".joinUsLogin");
joinUsLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(joinUsEmail.value)) {
    alert("Please enter a valid email address");
    return;
  } else if (!joinUsName.value || !joinUsEmail.value) {
    alert("Please fill all the fields");
    return;
  }

  let joinUsNameValue = joinUsName.value;
  let joinUsEmailValue = joinUsEmail.value;
  console.log(joinUsNameValue, joinUsEmailValue);

  pushData("joinUs/", {
    name: joinUsNameValue,
    email: joinUsEmailValue,
  });
});
