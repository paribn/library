document.addEventListener('DOMContentLoaded', () => {
  const libraryBtn = document.querySelector('.library_btn');
  const mainBox = document.querySelector('.main_box');
  const leftBox = document.querySelector('.left_box');
  const greyBox = document.querySelector('.grey_box');
  const closeButton = document.querySelector('.logo button');

  libraryBtn.addEventListener('click', () => {
    mainBox.style.display = 'block';
    leftBox.style.display = 'block';
    greyBox.style.display = 'none';  
    
  });

  closeButton.addEventListener('click', () => {
    mainBox.style.display = 'block';
    leftBox.style.display = 'none';
    greyBox.style.display = 'none';
  });
});

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

