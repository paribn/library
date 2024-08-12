import { getData } from "../pages/admin/firebase.js";
// variables
const aboutTitle = document.getElementById("aboutTitle");
const aboutText = document.getElementById("aboutDescription");
const aboutImg = document.getElementById("aboutImage");

function LoadPage() {
  getData("/about").then((data) => {
    aboutTitle.innerHTML = data.title;
    aboutText.innerHTML = data.description;
    aboutImg.src = data.bookImgUrl;
  });
}

LoadPage();
