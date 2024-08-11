import { getData, pushData } from "../pages/admin/firebase.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const bookName = document.getElementById("bookName");
const bookYear = document.getElementById("bookYear");
const bookCreated = document.getElementById("bookCreated");
const bookAuthor = document.getElementById("bookAuthor");
const bookDescription = document.getElementById("bookDescription");
const bookImage = document.getElementById("bookImage");

const get = async () => {
  const data = await getData("/books");
  const book = data[id];

  if (!book) {
    alert("Book not found!");
    return;
  }
  const date = `${book.addDate.slice(0, 4)}-${book.addDate.slice(
    4,
    6
  )}-${book.addDate.slice(6, 8)}`;
  const day = Math.floor((new Date() - new Date(date)) / 86400000);

  bookName.innerHTML = book.title;
  bookAuthor.innerHTML = book.author;
  bookDescription.innerHTML = book.description;
  bookYear.innerHTML = book.addDate.slice(0, 4);
  bookCreated.innerHTML = `${day} days ago added`;
  bookImage.src = book.img;

  await getComments();
};

const comments = document.getElementById("comments");
const commentCreateForm = document.getElementById("commentCreateForm");

const getComments = async () => {
  const data = await getData("/comments");

  const keys = Object.keys(data);

  keys.reverse().map((key) => {
    if (data[key].bookId === id) {
      addComment(data[key]);
    }
  });
};

const addComment = (comment) => {
  const date = new Date(comment.date);
  const dateTime = `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  comments.innerHTML += `
    <div class="comment">
      <div class="comment__head">
        <p class="user">anonim</p>
        <p class="created">${dateTime} today</p>
      </div>
      <p class="comment__description">
        ${comment.text}
      </p>
    </div>
  `;
};

const createComment = async (event) => {
  event.preventDefault();

  const form = {
    bookId: id,
    text: commentCreateForm.elements.namedItem("comment").value,
    date: new Date().toISOString(),
  };

  pushData("comments/", form);
  addComment(form);
};

commentCreateForm.addEventListener("submit", createComment);

get();
