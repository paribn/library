import { writeBasicData } from "./firebase.js";

const title = document.querySelector(".title");
const bookImgUrl = document.querySelector(".bookImgUrl");
const description = document.querySelector(".bookDescription");
const aboutAddBtn = document.querySelector(".aboutAdd");

aboutAddBtn.addEventListener("click", () => {
  console.log("clicked");

  if (!title.value || !bookImgUrl.value || !description.value) {
    alert("Please fill all the fields");
    return;
  }

  let titleValue = title.value.trim() || "";
  let bookImgUrlValue = bookImgUrl.value.trim() || "";
  let descriptionValue = description.value.trim() || "No description";
  console.log(titleValue, bookImgUrlValue, descriptionValue);

  writeBasicData("about/", {
    title: titleValue,
    bookImgUrl: bookImgUrlValue,
    description: descriptionValue,
  });
});
