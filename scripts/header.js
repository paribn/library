const modal = document.getElementById("modal");
const joinButton = document.getElementById("join__button");
const outerBox = document.getElementById("outerBox");

joinButton.addEventListener("click", () => {
  modal.classList.add("active");
});

outerBox.addEventListener("click", () => {
  modal.classList.remove("active");
});

const burgerButton = document.getElementById("burgerButton");
const closeBurgerButton = document.getElementById("closeBurgerButton");
const navigation = document.getElementById("navigation");

burgerButton.addEventListener("click", () => {
  navigation.classList.add("active");
});

closeBurgerButton.addEventListener("click", () => {
  navigation.classList.remove("active");
});
