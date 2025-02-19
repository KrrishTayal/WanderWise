function toggleContent() {
    var moreContent = document.getElementById("moreContent");
    var button = document.querySelector(".read-more-button");
    
    if (moreContent.style.display === "none") {
        moreContent.style.display = "block";
        button.innerText = "Read Less";
    } else {
        moreContent.style.display = "none";
        button.innerText = "Read More";
    }
}

// slider

let sliderStates = [];


function initializeSliders() {
  const sliders = document.querySelectorAll('.slide-container');
  sliderStates = Array.from(sliders).map(() => ({ currentSlide: 0 }));
}


function showSlide(sliderIndex, slideIndex) {
  const slider = document.querySelector(`.slide-container[data-slider="${sliderIndex}"] .slider`);
  const slides = slider.querySelectorAll('.place_desc');
  const maxVisibleSlides = 2; 

  
  if (slideIndex >= slides.length) {
    sliderStates[sliderIndex].currentSlide = 0; 
  } else if (slideIndex < 0) {
    sliderStates[sliderIndex].currentSlide = slides.length - maxVisibleSlides; 
  } else {
    sliderStates[sliderIndex].currentSlide = slideIndex; 
  }

  
  const offset = sliderStates[sliderIndex].currentSlide * (100 / maxVisibleSlides); 
  slider.style.transform = `translateX(-${offset}%)`; 
}


function nextSlide(sliderIndex) {
  showSlide(sliderIndex, sliderStates[sliderIndex].currentSlide + 1);
}

function prevSlide(sliderIndex) {
  showSlide(sliderIndex, sliderStates[sliderIndex].currentSlide - 1);
}


document.querySelectorAll('.prev').forEach(button => {
  button.addEventListener('click', () => {
    const sliderIndex = button.getAttribute('data-slider');
    prevSlide(sliderIndex);
  });
});

document.querySelectorAll('.next').forEach(button => {
  button.addEventListener('click', () => {
    const sliderIndex = button.getAttribute('data-slider');
    nextSlide(sliderIndex);
  });
});


document.addEventListener('DOMContentLoaded', initializeSliders);



// PHOTOS MODAL SCREEN
function openModal() {
    document.getElementById("photoModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("photoModal").style.display = "none";
}