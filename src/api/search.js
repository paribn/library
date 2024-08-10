const leftBtn = document.querySelector(".leftBtn");
const rightBtn = document.querySelector(".rightBtn");
const sliderContainer = document.querySelector(".sliderContainer");
const getInput = document.querySelector(".searchInput");
const Btn = document.querySelector(".sendBtn");
//& C A R O U S E L
let scrollAmount = 0;

rightBtn.addEventListener("click", () => {
  const containerWidth = sliderContainer.clientWidth;
  scrollAmount += containerWidth;
  if (scrollAmount >= sliderContainer.scrollWidth) {
    scrollAmount = 0;
  }
  sliderContainer.scrollTo({
    top: 0,
    left: scrollAmount,
    behavior: "smooth",
  });
});

leftBtn.addEventListener("click", () => {
  const containerWidth = sliderContainer.clientWidth;
  scrollAmount -= containerWidth;
  if (scrollAmount < 0) {
    scrollAmount = sliderContainer.scrollWidth - containerWidth;
  }
  sliderContainer.scrollTo({
    top: 0,
    left: scrollAmount,
    behavior: "smooth",
  });
});

//** A P I  */
