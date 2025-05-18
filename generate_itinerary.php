<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tour_planner";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Capture form data
$from_location = $_POST['from_location'];
$to_location = $_POST['to_location'];
$days = (int)$_POST['days'];
$budget = (float)$_POST['budget'];
$num_persons = (int)$_POST['num_persons'];
$interests = $_POST['interests']; // User input interests (e.g., "history, architecture, lakes")

// Insert itinerary request data
$sql = "INSERT INTO itinerary_requests (from_location, to_location, days, budget, num_persons, interests)
        VALUES ('$from_location', '$to_location', $days, $budget, $num_persons, '$interests')";
$conn->query($sql);

// Display itinerary with improved design
echo "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;'>";
echo "<h1 style='color: #4CAF50; text-align: center;'>Your Itinerary for $to_location</h1>";
echo "<p style='text-align: center;'>From: $from_location | To: $to_location | Days: $days | Budget: $$budget | Persons: $num_persons</p>";

// Split interests into an array
$interests_array = explode(", ", $interests); // User's interests as an array

// Loop through each day to generate day-wise itinerary
for ($day = 1; $day <= $days; $day++) {
    echo "<h3 style='color: #333;'>Day $day</h3>";

    // Query locations based on user interests and destination
    // We will use FIND_IN_SET for each interest
    $locations_sql = "SELECT * FROM locations WHERE location_name='$to_location' AND (";
    
    // Loop through interests to add FIND_IN_SET condition for each one
    foreach ($interests_array as $index => $interest) {
        if ($index > 0) {
            $locations_sql .= " OR "; // Add OR between conditions
        }
        $locations_sql .= "FIND_IN_SET('$interest', interests)";
    }
    
    $locations_sql .= ") LIMIT 1 OFFSET " . ($day - 1); // Ensure day-wise offset for unique locations
    
    $locations_result = $conn->query($locations_sql);

    if ($locations_result && $locations_result->num_rows > 0) {
        while ($location = $locations_result->fetch_assoc()) {
            echo "<p><strong>Visit:</strong> " . $location['location_name'] . "</p>";
            echo "<p><strong>Description:</strong> " . $location['description'] . "</p>";
            echo "<p><strong>Activities:</strong> " . $location['interests'] . "</p>";
            echo "<p><strong>Estimated Cost:</strong> Rs- " . $location['activity_cost'] . "</p>";
        }
    } else {
        echo "<p>No specific locations found for your interests on Day $day.</p>";
    }

    // Query hotels for the destination
    $hotels_sql = "SELECT * FROM hotels WHERE location_name='$to_location' LIMIT 1";
    $hotels_result = $conn->query($hotels_sql);

    if ($hotels_result && $hotels_result->num_rows > 0) {
        $hotel = $hotels_result->fetch_assoc();
        echo "<h4>Suggested Hotel: " . $hotel['hotel_name'] . "</h4>";
        echo "<p>Price per night: Rs- " . $hotel['price_per_night'] . " | Rating: " . $hotel['rating'] . "</p>";
        echo "<p>Amenities: " . $hotel['amenities'] . "</p>";
    } else {
        echo "<p>No hotels found at your destination.</p>";
    }

    echo "<hr style='border-top: 1px solid #ddd;'>";
}

echo "</div>";
$conn->close();
?>
