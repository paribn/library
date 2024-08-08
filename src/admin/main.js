const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const resultContainer = document.querySelector(".result_container");

searchBtn.addEventListener("click", () => {
  let inputValue = searchInput.value;
  fetchData(inputValue);
});

function fetchData(searchData) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchData}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      addData(data.items);
    });
}

function addData(items) {
  resultContainer.innerHTML = items
    .map((aryData) => {
      return `
        <div class="result_box">
              <img src="../img/admn&lgn/clock.svg" alt="clock" />
              <p>${aryData.volumeInfo.title}</p>
            </div>
        `;
    })
    .join("");
}

