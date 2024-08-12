import { pushData, readPushedData, deleteData } from "./firebase.js";

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const resultContainer = document.querySelector(".result_container");

const bookNameInput = document.querySelector(".addBookName");
const authorNameInput = document.querySelector(".addAuthorName");
const bookImageUrlInput = document.querySelector(".bookImgUrl");
const descBookInput = document.querySelector(".descBook");
const genreSelectAdd = document.querySelector(".genreSelect");
const addBookBtn = document.querySelector(".addBookBtn");
const isBest = document.querySelector(".isBest");
const isNewCheck = document.querySelector(".isNewCheck");
const genreAdd = document.querySelector(".addBookInput");
const plus_sign = document.querySelector("#plus_sign");
const genreContainer = document.querySelector(".genreContainer");

let btnContactDelete;

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
  genreSelectAdd.appendChild(option);
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

  if (!bookTitleAdd || !authorAdd || !addImg || !addDect) {
    alert("Please fill in all fields");
    return;
  }

  let genreArr = [];
  let genreSelect = document.querySelectorAll(".genreSelect");
  for (let i = 0; i < genreSelect.length; i++) {
    genreArr.push(genreSelect[i].value);
  }
  if (genreArr.length === 0) {
    alert("Please select at least one genre");
    return;
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
        <div class="result_box" data-title="${encodeURI(
          aryData.volumeInfo.title
        )}" data-author="${
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
      const title = decodeURI(event.currentTarget.getAttribute("data-title"));
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

plus_sign.addEventListener("click", () => {
  console.log("plus");

  let newSelect = document.createElement("select");

  newSelect.classList.add("genreSelect");
  newSelect.style = "width:100%";

  bookGenres.forEach((genre) => {
    let option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    newSelect.appendChild(option);
  });
  genreContainer.appendChild(newSelect);
});

/// JoinUs GET
async function populateJoinUsTable() {
  let joinUsData = await readPushedData("joinUs/");

  const tableBody = document.querySelector("#joinUsTableBody");
  tableBody.innerHTML = "";

  joinUsData.forEach((item, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td class="trash_edit">
        <button class="deleteBtn"><i class="fa-duotone fa-solid fa-trash-can"></i></button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Select all delete buttons
  let btnContactDelete = document.querySelectorAll(".deleteBtn");

  // Attach the event listeners to each delete button
  btnContactDelete.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      deleteData(`joinUs/${joinUsData[i].id}`);
      alert("Delete succesfuly!");
      window.location.reload();
    });
  });
}

/// Books GET

function getBooks() {
  let bookTableBody = document.querySelector("#booksGetTable");
  readPushedData("books/").then((data) => {
    console.log(data);
    bookTableBody.innerHTML = data
      .map((item) => {
        return `
       <tr>
          <td>${data.indexOf(item) + 1}</td>
          <td class="angels minDesc">
            <img src="${item.img}" alt="photo"/>
            ${item.title}
          </td>
          <td><p class="minDesc">${item.description}</p></td>
          <td>${item.genre}</td>
          <td>${item.author}</td>
          <td class="trash_edit">
            <button class="deleteBtnBooks">
              <i class="fa-duotone fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
      })
      .join("");

    let btnContactDelete = document.querySelectorAll(".deleteBtnBooks");

    btnContactDelete.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        deleteData(`books/${data[index].id}`);
        alert("Delete succesfuly!");
        getBooks();
      });
    });
  });
}

///CONTACT GET
function renderContactUsData() {
  let contactTableBody = document.querySelector("#contactBody");

  readPushedData("contact/").then((data) => {
    console.log(data);

    contactTableBody.innerHTML = data
      .map((item) => {
        return `
      <tr>
          <td>${data.indexOf(item) + 1}</td>
          <td>${item.name}</td>
          <td>${item.address}</td>
          <td>${item.email}</td>
          <td>${item.phone}</td>
         
      </tr>
      `;
      })
      .join("");

    btnContactDelete = document.querySelectorAll(".btnContactDelete");

    for (let i = 0; i < btnContactDelete.length; i++) {
      btnContactDelete[i].addEventListener("click", () => {
        deleteDataFromDB(`contact/${data[i].id}`);
        customAlert("Contact user deleted successfully");
        renderContactUsData();
      });
    }
  });
}

window.onload = function () {
  populateJoinUsTable();
  getBooks();
  renderContactUsData();
};
