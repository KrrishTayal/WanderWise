document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("itineraryForm");

    form.addEventListener("submit", function(event) {
        // Form validation
        const from = document.getElementById("from").value.trim();
        const to = document.getElementById("to").value.trim();
        const days = parseInt(document.getElementById("days").value);
        const budget = parseFloat(document.getElementById("budget").value);
        const numPersons = parseInt(document.getElementById("num_persons").value);

        if (from === "" || to === "") {
            alert("Please fill in both the 'From' and 'To' fields.");
            event.preventDefault();
            return;
        }

        if (days <= 0) {
            alert("Please enter a valid number of days.");
            event.preventDefault();
            return;
        }

        if (budget <= 0 || numPersons <= 0) {
            alert("Budget and number of persons should be positive numbers.");
            event.preventDefault();
            return;
        }

        // Display a loading message
        alert("Generating your custom itinerary. Please wait...");
    });
});
