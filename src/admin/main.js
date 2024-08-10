import { pushData } from "./firebase.js";

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const resultContainer = document.querySelector(".result_container");

const bookNameInput = document.querySelector(".addBookName");
const authorNameInput = document.querySelector(".addAuthorName");
const bookImageUrlInput = document.querySelector(".bookImgUrl");
const descBookInput = document.querySelector(".descBook");
const genreSelect = document.querySelector("#genreSelect");
const addBookBtn = document.querySelector(".addBookBtn");
const isBest = document.querySelector(".isBest");
const isNewCheck = document.querySelector(".isNewCheck");
const genreAdd = document.querySelector(".genreAdd");

const bookGenres = [
  "Adventure",
  "Biography",
  "Classics",
  "Comic Book",
  "Crime",
  "Drama",
  "Fantasy",
  "Historical Fiction",
  "Horror",
  "Mystery",
  "Non-Fiction",
  "Poetry",
  "Romance",
  "Science Fiction",
  "Self-Help",
  "Thriller",
  "Travel",
  "Western",
  "Young Adult",
];

bookGenres.forEach((genre) => {
  let option = document.createElement("option");
  option.value = genre;
  option.textContent = genre;
  genreSelect.appendChild(option);
});
searchBtn.addEventListener("click", () => {
  let inputValue = searchInput.value;
  fetchData(inputValue);
});

/// add book form

addBookBtn.addEventListener("click", function () {
  let bookTitleAdd = bookNameInput.value;
  let authorAdd = authorNameInput.value;
  let addImg = bookImageUrlInput.value;
  let addDect = descBookInput.value;
  let inNew = isNewCheck.checked;
  let addisBest = isBest.checked;

  let isEmpty = false;

  for (let i = 0; i < genreSelect.length; i++) {
    genreSelect[i].style = "border:1px solid black";
  }

  for (let j = 0; j < genreSelect.length; j++) {
    if (genreSelect[j].value === "") {
      genreSelect[j].style = "border: 1px solid red";
      isEmpty = true;
    }
  }

  if (isEmpty) {
    alert("Please fill in all fields");
    return;
  }

  let genreArr = [];
  let genreSelect = genreAdd;
  for (let i = 0; i < genreSelect.length; i++) {
    genreArr.push(genreSelect[i].value);
  }

  let date = new Date();
  let dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
    2,
    0
  )}${String(date.getDate()).padStart(2, 0)}`;

  let newBook = {
    title: bookTitleAdd,
    author: authorAdd,
    description: addDect,
    img: addImg,
    isNew: inNew,
    isBestSeller: addisBest,
    genre: genreArr,
    addDate: dateStr,
  };

  pushData("books/", newBook);
  alert("Book added succesfuly");
});

async function fetchData(searchData) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchData}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log("dataa", data);

    addData(data.items);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function addData(items) {
  resultContainer.innerHTML = items
    .map((aryData) => {
      return `
        <div class="result_box" data-title="${
          aryData.volumeInfo.title
        }" data-author="${
        aryData.volumeInfo.authors
          ? aryData.volumeInfo.authors[0]
          : "Unknown Author"
      }" data-image="${
        aryData.volumeInfo.imageLinks
          ? aryData.volumeInfo.imageLinks.thumbnail
          : "http://books.google.com/books/content?id=JM1xEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      }" data-description="${
        aryData.volumeInfo.description
          ? aryData.volumeInfo.description.replace(/"/g, "&quot;")
          : "No description available"
      }"
              <img src="../img/admn&lgn/clock.svg" alt="clock" />
              <p>${aryData.volumeInfo.title}</p>
            </div>
        `;
    })
    .join("");

  const resultBoxes = document.querySelectorAll(".result_box");
  resultBoxes.forEach((box) => {
    box.addEventListener("click", (event) => {
      const title = event.currentTarget.getAttribute("data-title");
      const author = event.currentTarget.getAttribute("data-author");
      const image = event.currentTarget.getAttribute("data-image");
      const description = event.currentTarget.getAttribute("data-description");
      const genres = event.currentTarget.getAttribute("data-genres");

      bookNameInput.value = title;
      authorNameInput.value = author;
      bookImageUrlInput.value = image;
      descBookInput.value = description;
      bookGenres.value = genres;
    });
  });
}
