import "../scripts/header.js";
import { pushData } from "../pages/admin/firebase.js";

const joinUsForm = document.getElementById("joinUsForm");

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const joinUs = async (event) => {
  event.preventDefault();

  const name = joinUsForm.elements.namedItem("fullName").value.trim();
  const email = joinUsForm.elements.namedItem("email").value.trim();

  if (!name) {
    alert("Please enter your full name.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const form = {
    name: name,
    email: email,
  };

  pushData("joinUs/", form);
  alert("Your request has been submitted.");
};

joinUsForm.addEventListener("submit", joinUs);
