<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
$input = json_decode(file_get_contents("php://input"), true);

// Check if the input is valid
if (!$input) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$days = $input['days'];
$budget = $input['budget'];
$persons = $input['persons'];
$preferences = $input['preferences'];

// Database connection
$conn = new mysqli("localhost", "root", "", "udaipur_tour");

// Check connection
if ($conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Prepare and execute the places query
$placesQuery = "SELECT name, time_required, cost_of_ticket, preference_type FROM Places WHERE preference_type LIKE '%$preferences%' LIMIT 5";
$placesResult = $conn->query($placesQuery);

// Check if the query was successful
if (!$placesResult) {
    echo json_encode(['error' => 'Places query failed: ' . $conn->error]);
    exit;
}

// Fetch places
$places = [];
while ($row = $placesResult->fetch_assoc()) {
    $places[] = [
        'name' => $row['name'],
        'time_required' => $row['time_required'],
        'cost_of_ticket' => $row['cost_of_ticket'],
        'preference_type' => $row['preference_type'],
        'link' => 'https://example.com/' . strtolower(str_replace(' ', '-', $row['name'])),
        'image' => 'images/' . strtolower(str_replace(' ', '_', $row['name'])) . '.jpg'
    ];
}

// Prepare and execute the hotels query
$hotelsQuery = "SELECT name, cost, food, luxury FROM Hotels WHERE cost <= $budget / $days LIMIT 5";
$hotelsResult = $conn->query($hotelsQuery);

// Check if the query was successful
if (!$hotelsResult) {
    echo json_encode(['error' => 'Hotels query failed: ' . $conn->error]);
    exit;
}

// Fetch hotels
$hotels = [];
while ($row = $hotelsResult->fetch_assoc()) {
    $hotels[] = [
        'name' => $row['name'],
        'cost' => $row['cost'],
        'food' => $row['food'],
        'luxury' => $row['luxury'],
        'link' => 'https://example.com/' . strtolower(str_replace(' ', '-', $row['name'])),
        'image' => 'images/' . strtolower(str_replace(' ', '_', $row['name'])) . '.jpg'
    ];
}

// Prepare the response
$response = [
    'days' => $days,
    'budget' => $budget,
    'places' => $places,
    'hotels' => $hotels,
];

// Return JSON response
echo json_encode($response);

$conn->close();
?>
