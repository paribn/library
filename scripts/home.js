import { getData } from "../pages/admin/firebase.js";

const products = document.getElementById("products");
const buyers = document.getElementById("buyers");

const get = async () => {
  const books = await getData("/books");
  const joinUs = await getData("/joinUs");

  products.innerHTML = `${Object.keys(books).length}`;
  buyers.innerHTML = `${Object.keys(joinUs).length}`;
};

get();
