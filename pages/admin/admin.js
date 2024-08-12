import { getData } from "./firebase.js";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const check = async () => {
  const user = await getData("/users");
  let storedUser = getCookie("user");

  if (storedUser) {
    storedUser = JSON.parse(storedUser);
  }

  if (
    storedUser.username === user.username &&
    storedUser.password === user.password
  ) {
    if (!window.location.href.includes("admin.html")) {
      window.location.href = "./admin.html";
    }
  } else {
    if (!window.location.href.includes("login.html")) {
      window.location.href = "./login.html";
    }
  }
};

const loginForm = document.getElementById("loginForm");

const login = async (event) => {
  event.preventDefault();
  const user = await getData("/users");

  const form = {
    username: loginForm.elements.namedItem("user").value,
    password: loginForm.elements.namedItem("password").value,
  };

  if (form.username === user.username && form.password === user.password) {
    setCookie("user", JSON.stringify(form));
    window.location.href = "./admin.html";
  } else {
    alert("Username or password incorrect!");
  }
};

const logoutButton = document.getElementById("logout");

const logout = () => {
  deleteCookie("user");
  window.location.href = "./login.html";
};

if (loginForm) {
  loginForm.addEventListener("submit", login);
}

if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

check();
