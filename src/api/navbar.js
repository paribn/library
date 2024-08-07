const btn_resp = document.querySelector(".btn_resp");
const navbar_resp = document.querySelector(".navbar_resp");
const btn_close = document.querySelector(".btn_close");

btn_resp.addEventListener("click", function () {
  console.log("open");
  navbar_resp.style.display = "block";
});

btn_close.addEventListener("click", function () {
  navbar_resp.style.display = "";
});
