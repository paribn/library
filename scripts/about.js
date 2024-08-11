import { getData } from "../pages/admin/firebase.js";
// variables
const aboutTitle = document.getElementsByClassName("other__title");
const aboutText = document.getElementsByClassName("about__description");
const aboutImg = document.getElementsByClassName("about__image");

function LoadPage() {
  getData("about/").then((data) => {
    aboutTitle.textContent = data.title;
    aboutText.textContent = data.description;
    aboutImg.src = data.bookImgUrl;
  });
}

LoadPage();
