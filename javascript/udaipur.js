// MORE CONTENT
function toggleContent() {
    var moreContent = document.getElementById("moreudaipur");
    var button = document.querySelector(".read-more-button");
    
    if (moreContent.style.display === "none" || moreContent.style.display === "") {
        moreContent.style.display = "block";
        button.innerText = "Read Less";
    } else {
        moreContent.style.display = "none";
        button.innerText = "Read More";
    }
}


// SLIDER

let sliderStates = [];


function initializeSliders() {
  const sliders = document.querySelectorAll('.slide-container');
  sliderStates = Array.from(sliders).map(() => ({ currentSlide: 0 }));
}


function showSlide(sliderIndex, slideIndex) {
  const slider = document.querySelector(`.slide-container[data-slider="${sliderIndex}"] .slider`);
  const slides = slider.querySelectorAll('.option_desc');
  const maxVisibleSlides = 3; 

  
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

document.addEventListener("DOMContentLoaded", function() {
  
    document.querySelectorAll(".show-more").forEach(button => {
        button.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal-id");
            toggleModal(modalId, "open");
        });
    });

    
    document.querySelectorAll(".modal .close").forEach(button => {
        button.addEventListener("click", function() {
            const modalId = this.getAttribute("data-modal-id");
            toggleModal(modalId, "close");
        });
    });
});


function toggleModal(modalId, action) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = action === "open" ? "block" : "none";
    } else {
        console.warn(`Modal with ID "${modalId}" not found.`);
    }
}

// faq
function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    
    if (answer.style.display === "block") {
        answer.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
    } else {
        answer.style.display = "block";
        arrow.style.transform = "rotate(90deg)";
    }
}

// CUSTOMIZABLE ITIENARY
document.getElementById('itineraryForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const days = document.getElementById('days').value;
  const budget = document.getElementById('budget').value;
  const persons = document.getElementById('persons').value;

  // Send POST request to the PHP script
  fetch('http://localhost/wanderwise/process_itinerary.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          days: days,
          budget: budget,
          persons: persons
      })
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('itineraryResult').innerText = data.itinerary;
  })
  .catch(error => {
      console.error('Error fetching itinerary:', error);
  });
});

// CUSTOM ITEINARY

let currentStep = 1;
const totalSteps = 4;

function nextStep() {
    if (currentStep < totalSteps) {
        updateStep(currentStep + 1);
    }
}

function prevStep() {
    if (currentStep > 1) {
        updateStep(currentStep - 1);
    }
}

function updateStep(step) {
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove("active");
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add("active");

    currentStep = step;
    updateProgress();
}

function updateProgress() {
    const progress = document.getElementById("progress");
    progress.style.width = `${(currentStep / totalSteps) * 100}%`;
}

function generateItinerary() {
    const days = document.getElementById('days').value;
    const budget = document.getElementById('budget').value;
    const persons = document.getElementById('persons').value;
    const preferences = document.getElementById('preferences').value;

    if (days && budget && persons) {
        const itineraryData = { days, budget, persons, preferences };
        localStorage.setItem('itinerary', JSON.stringify(itineraryData));

        fetch('process_itinerary.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itineraryData)
        })
        .then(response => response.json())
        .then(data => {
            displayItinerary(data);
        })
        .catch(error => console.error('Error:', error));
    }
}

// function displayItinerary(data) {
//     const resultDiv = document.getElementById('itineraryResult');
//     resultDiv.innerHTML = `
//         <h3>Your Customized Itinerary</h3>
//         <p>Days: ${data.days}</p>
//         <p>Budget: ${data.budget} INR</p>
//         <h4>Best Places to Visit:</h4>
//         <ul>
//             ${data.places.map(place => `
//                 <li>
//                     <strong>${place.name}</strong> - Time Required: ${place.time_required}, Ticket Cost: ${place.cost_of_ticket} INR, Preference: ${place.preference_type}
//                 </li>
//             `).join('')}
//         </ul>
//         <h4>Hotel Recommendations:</h4>
//         <ul>
//             ${data.hotels.map(hotel => `
//                 <li>
//                     <strong>${hotel.name}</strong> - Cost: ${hotel.cost} INR, Food: ${hotel.food}, Luxury: ${hotel.luxury}
//                 </li>
//             `).join('')}
//         </ul>
//     `;
//     resultDiv.style.display = 'block';
// }
function displayItinerary(data) {
    const resultDiv = document.getElementById('itineraryResult');
    
    if (data.error) {
        resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
        resultDiv.style.display = 'block';
        return;
    }
    
    resultDiv.innerHTML = `
        <h3>Your Customized Itinerary</h3>
        <p>Days: ${data.days}</p>
        <p>Budget: ${data.budget} INR</p>
        <h4>Best Places to Visit:</h4>
        <ul>
            ${data.places.map(place => `
                <li>
                    <a href="${place.link}">${place.name}</a> - Time Required: ${place.time_required}, Cost: ${place.cost_of_ticket}, Preference: ${place.preference_type}
                </li>
            `).join('')}
        </ul>
        <h4>Hotel Recommendations:</h4>
        <ul>
            ${data.hotels.map(hotel => `
                <li>
                    <a href="${hotel.link}">${hotel.name}</a> - Cost: ${hotel.cost}, Food: ${hotel.food}, Luxury: ${hotel.luxury}
                </li>
            `).join('')}
        </ul>
    `;
    resultDiv.style.display = 'block';
}









// function generateItinerary() {
//     const budget = document.getElementById('budget').value;
//     const days = document.getElementById('days').value;
//     const people = document.getElementById('people').value;
//     const preferences = document.getElementById('preferences').value || "Standard";

//     let itinerary = `
//         <h3>Your Customized Itinerary</h3>
//         <p><strong>Budget:</strong> ₹${budget}</p>
//         <p><strong>Number of Days:</strong> ${days}</p>
//         <p><strong>Number of People:</strong> ${people}</p>
//         <p><strong>Preferences:</strong> ${preferences}</p>
//         <p>Suggested Plan:</p>
//         <ul>
//             <li>Day 1: Explore City Palace and Lake Pichola.</li>
//             <li>Day 2: Visit Fateh Sagar Lake and Jagdish Temple.</li>
//             <li>Day 3: Check out Saheliyon Ki Bari and enjoy local markets.</li>
//         </ul>
//     `;

//     document.getElementById('itineraryOutput').innerHTML = itinerary;
// }

// // Smooth Scroll for Navigation Links
// document.querySelectorAll('nav a').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// // Image Slider for Photos Section
// let currentSlide = 0;
// const slides = document.querySelectorAll('.photo-gallery img');

// function showSlide(index) {
//     slides.forEach((slide, i) => {
//         slide.style.display = i === index ? 'block' : 'none';
//     });
// }

// function nextSlide() {
//     currentSlide = (currentSlide + 1) % slides.length;
//     showSlide(currentSlide);
// }

// function prevSlide() {
//     currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//     showSlide(currentSlide);
// }

// // Initialize Slider
// showSlide(currentSlide);
// setInterval(nextSlide, 3000); // Auto-slide every 3 seconds

// // Add buttons to photo gallery
// const photoSection = document.getElementById('photos');
// const nextButton = document.createElement('button');
// const prevButton = document.createElement('button');
// nextButton.innerText = 'Next';
// prevButton.innerText = 'Prev';
// nextButton.onclick = nextSlide;
// prevButton.onclick = prevSlide;
// photoSection.appendChild(prevButton);
// photoSection.appendChild(nextButton);

// // Scroll Animation for Sections
// const sections = document.querySelectorAll('section');
// const options = {
//     threshold: 0.25,
//     rootMargin: "0px 0px -100px 0px"
// };

// const sectionObserver = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//             observer.unobserve(entry.target);
//         }
//     });
// }, options);

// sections.forEach(section => {
//     sectionObserver.observe(section);
// });


