const prevButtons = document.querySelectorAll(".prev");
const nextButtons = document.querySelectorAll(".next");
const sliders = document.querySelectorAll(".slider_1");

sliders.forEach((slider, index) => {
  slider.addEventListener("wheel", (event) => {
    event.preventDefault();
    slider.scrollLeft += event.deltaY;
    slider.style.scrollBehavior = "auto";
  });

  nextButtons[index].addEventListener("click", () => {
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft += 900;
  });

  prevButtons[index].addEventListener("click", () => {
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft -= 900;
  });
});
