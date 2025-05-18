// function scrollToItinerary() {
//     document.getElementById("itinerary").scrollIntoView({ behavior: "smooth" });
// }

// function generateItinerary() {   
//     const days = document.getElementById('days').value;
//     const budget = document.getElementById('budget').value;
//     const persons = document.getElementById('persons').value;
//     const preferences = document.getElementById('preferences').value;

//     if (days && budget && persons) {
//         // Store data in local storage
//         const itineraryData = { days, budget, persons, preferences };
//         localStorage.setItem('itinerary', JSON.stringify(itineraryData));

//         // Send data to server for processing
//         fetch('process_itinerary.php', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(itineraryData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             displayItinerary(data);
//         })
//         .catch(error => console.error('Error:', error));
//     }
// }

// function displayItinerary(data) {
//     const resultDiv = document.getElementById('itineraryResult');
//     resultDiv.innerHTML = `
//         <h3>Your Customized Itinerary</h3>
//         <p>Days: ${data.days}</p>
//         <p>Budget: ${data.budget} INR</p>
//         <p>Best places to visit: ${data.places.join(', ')}</p>
//         <p>Hotel Recommendations: ${data.hotels.join(', ')}</p>
//     `;
// }




// let currentStep = 1;
// const totalSteps = 4;

// function nextStep() {
//     if (currentStep < totalSteps) {
//         updateStep(currentStep + 1);
//     }
// }

// function prevStep() {
//     if (currentStep > 1) {
//         updateStep(currentStep - 1);
//     }
// }

// function updateStep(step) {
//     document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove("active");
//     document.querySelector(`.form-step[data-step="${step}"]`).classList.add("active");

//     currentStep = step;
//     updateProgress();
// }

// function updateProgress() {
//     const progress = document.getElementById("progress");
//     progress.style.width = `${(currentStep / totalSteps) * 100}%`;
// }

// function generateItinerary() {
//     const days = document.getElementById('days').value;
//     const budget = document.getElementById('budget').value;
//     const persons = document.getElementById('persons').value;
    
//     // Collect preferences from checkboxes (or any other input type)
//     const preferences = [];
//     document.querySelectorAll('input[name="preferences"]:checked').forEach((checkbox) => {
//         preferences.push({ type: checkbox.value, value: checkbox.dataset.value });
//     });

//     if (days && budget && persons) {
//         const itineraryData = { days, budget, persons, preferences };
//         localStorage.setItem('itinerary', JSON.stringify(itineraryData));

//         fetch('process_itinerary.php', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(itineraryData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             displayItinerary(data);
//         })
//         .catch(error => console.error('Error:', error));
//     }
// }

// function displayItinerary(data) {
//     const resultDiv = document.getElementById('itineraryResult');
//     resultDiv.innerHTML = `
//         <h3>Your Customized Itinerary</h3>
//         <p>Days: ${data.days}</p>
//         <p>Budget: ${data.budget} INR</p>
//         <p>Best places to visit:</p>
//         <ul>
//             ${data.places.map(place => `<li><a href="${place.link}" target="_blank">${place.name}</a></li>`).join('')}
//         </ul>
//         <p>Hotel Recommendations:</p>
//         <ul>
//             ${data.hotels.map(hotel => `<li><a href="${hotel.link}" target="_blank">${hotel.name}</a></li>`).join('')}
//         </ul>
//     `;
//     resultDiv.style.display = 'block';
// }



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
localStorage.setItem('itinerary', JSON.stringify(itineraryData));
