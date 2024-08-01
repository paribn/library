const btn_resp = document.querySelector(".btn_resp");
const navbar_resp = document.querySelector(".navbar_resp");
const btn_close = document.querySelector(".btn_close");

btn_resp.addEventListener("click", function () {
  console.log("open");
  navbar_resp.style.display = "block";
  document.body.style.backgroundColor = "rgba(36, 20, 0, 0.9)";
  // document.body.style.backdropFilter = "blur(10px)";
});

btn_close.addEventListener("click", function () {
  console.log("ss close");
  navbar_resp.style.display = "";
  document.body.style.backgroundColor = "";
});
