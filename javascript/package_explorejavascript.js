
let sliderStates = [];


function initializeSliders() {
  const sliders = document.querySelectorAll('.slide-container');
  sliderStates = Array.from(sliders).map(() => ({ currentSlide: 0 }));
}


function showSlide(sliderIndex, slideIndex) {
  const slider = document.querySelector(`.slide-container[data-slider="${sliderIndex}"] .slider`);
  const slides = slider.querySelectorAll('.package_desc');
  const maxVisibleSlides = 4; 

  
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





// Option to open



  function showGallery(region, button) {
    
    document.querySelectorAll('.summon').forEach(gallery => gallery.style.display = 'none');
    document.getElementById(region).style.display = 'grid'; 
    const galleries = document.querySelectorAll('.summon');
    

    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    
    button.classList.add('active');
}
window.onload = function() {
    showGallery('july'); 
};