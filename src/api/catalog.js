// document.addEventListener("DOMContentLoaded", () => {
//   const slider = document.querySelector(".slider_1");
//   const slides = document.querySelectorAll(".books");
//   const prevButton = document.querySelector(".prev");
//   const nextButton = document.querySelector(".next");

//   let currentIndex = 0;
//   let autoSlideInterval;

//   function showSlide(index) {
//     slider.style.transform = `translateX(-${index * 100}%)`;
//   }

//   function startAutoSlide() {
//     autoSlideInterval = setInterval(() => {
//       currentIndex = (currentIndex + 1) % slides.length;
//       showSlide(currentIndex);
//     }, 3000); // 3 saniyede bir otomatik kaydırma
//   }

//   function stopAutoSlide() {
//     clearInterval(autoSlideInterval);
//   }

//   prevButton.addEventListener("click", () => {
//     stopAutoSlide();
//     if (currentIndex > 0) {
//       currentIndex--;
//     } else {
//       currentIndex = slides.length - 1;
//     }
//     showSlide(currentIndex);
//     startAutoSlide();
//   });

//   nextButton.addEventListener("click", () => {
//     stopAutoSlide();
//     if (currentIndex < slides.length - 1) {
//       currentIndex++;
//     } else {
//       currentIndex = 0;
//     }
//     showSlide(currentIndex);
//     startAutoSlide();
//   });

//   slider.addEventListener("mouseover", stopAutoSlide);
//   slider.addEventListener("mouseout", startAutoSlide);

//   startAutoSlide(); // Sayfa yüklendiğinde otomatik kaydırmayı başlat
// });
