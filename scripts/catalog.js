import { getData } from "../pages/admin/firebase.js";

const allBooks = document.querySelector("#allBooks");
const besteller = document.querySelector("#besteller");
const newReleases = document.querySelector("#newReleases");
const genres = document.querySelector("#genres");
let selectedGenre = null;

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

const showGenres = () => {
  genres.innerHTML = "";

  bookGenres.map((genre) => {
    genres.innerHTML += `
      <button class="catalog__genre" value="${genre}">${genre}</button>
    `;
  });

  document.querySelectorAll(".catalog__genre").forEach((genre) => {
    genre.addEventListener("click", () => {
      document.querySelectorAll(".catalog__genre").forEach((g) => {
        g.classList.remove("active");
      });

      allBooks.innerHTML = "";
      besteller.innerHTML = "";
      newReleases.innerHTML = "";

      const genreName = genre.getAttribute("value");

      if (genreName !== selectedGenre) {
        selectedGenre = genreName;
        genre.classList.add("active");
        get(genreName);
      } else {
        selectedGenre = null;

        get();
      }
    });
  });
};

showGenres();

const get = async (genre) => {
  const data = await getData("/books");

  const keys = Object.keys(data);

  keys.map((key) => {
    if (!data[key].title) {
      return;
    }

    if (
      genre &&
      data[key].genre &&
      !data[key].genre.filter((i) => i === genre).length
    ) {
      return;
    }

    allBooks.innerHTML += `
        <div class="swiper-slide">
          <div class="catalog__book">
            <div class="book__image">
              <img src="${data[key].img}" alt="Book" />
            </div>
            <div class="book__info">
              <p class="book__name">${data[key].title}</p>
              <p class="book__author">${data[key].author}</p>
              <button>
                <span> <a href="../pages/book-detail.html?id=${key}">READ MORE</a></span>
              </button>
            </div>
          </div>
        </div>
    `;

    if (data[key].isBestSeller) {
      besteller.innerHTML += `
        <div class="swiper-slide">
          <div class="catalog__book">
            <div class="book__image">
              <img src="${data[key].img}" alt="Book" />
            </div>
            <div class="book__info">
              <p class="book__name">${data[key].title}</p>
              <p class="book__author">${data[key].author}</p>
             
              <button>
                <span> <a href="../pages/book-detail.html?id=${key}">READ MORE</a></span>
              </button>
            </div>
          </div>
        </div>
    `;
    }

    if (data[key].isNew) {
      newReleases.innerHTML += `
        <div class="swiper-slide">
          <div class="catalog__book">
            <div class="book__image">
              <img src="${data[key].img}" alt="Book" />
            </div>
            <div class="book__info">
              <p class="book__name">${data[key].title}</p>
              <p class="book__author">${data[key].author}</p>
              <button>
                        <span> <a href="../pages/book-detail.html?id=${key}">READ MORE</a></span>
              </button>
            </div>
          </div>
        </div>
    `;
    }
  });
};

get();
