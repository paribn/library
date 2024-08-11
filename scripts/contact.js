import { pushData } from "../pages/admin/firebase.js";

const contactForm = document.getElementById("contactForm");

const contact = async (event) => {
  event.preventDefault();

  const form = {
    name: contactForm.elements.namedItem("fullName").value,
    email: contactForm.elements.namedItem("email").value,
    address: contactForm.elements.namedItem("address").value,
    phone: contactForm.elements.namedItem("phone").value,
    description: contactForm.elements.namedItem("description").value,
  };

  pushData("contact/", form);
  alert("Your request has been submitted.");
};

contactForm.addEventListener("submit", contact);
