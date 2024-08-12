import { getData } from "../pages/admin/firebase.js";

let books;
const resultBox = document.getElementById("resultBox");
const searchForm = document.getElementById("searchForm");

const get = async () => {
  books = await getData("/books");
};

const getResult = (result) => {
  resultBox.innerHTML += `
    <div class="swiper-slide">
      <div class="book__slide">
        <div class="book__image">
          <img
            src="${result.img}"
            alt="Book"
          />
        </div>
        <div class="book__info">
          <p class="book__name">${result.title}</p>
          <p class="book__author">${result.author}</p>
          <p class="book__description">${result.description}</p>
        </div>
      </div>
    </div>`;
};

get();
const search = async (event) => {
  event.preventDefault();

  const keys = Object.keys(books);
  const search = searchForm.elements
    .namedItem("search")
    .value.trim()
    .toLowerCase();
  resultBox.innerHTML = "";

  keys.forEach((key) => {
    if (
      books[key].title.toLowerCase().includes(search) ||
      books[key].author.toLowerCase().includes(search) ||
      books[key].description.toLowerCase().includes(search)
    ) {
      getResult(books[key]);
    }
  });
};

searchForm.addEventListener("submit", search);
