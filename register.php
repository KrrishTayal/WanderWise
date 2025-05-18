<?php
// Example of registration script in PHP
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password == $confirm_password) {
        // Store user in the database here
        echo "Welcome, " . $name . "! Your account has been created.";
    } else {
        echo "Passwords do not match!";
    }
}
?>
