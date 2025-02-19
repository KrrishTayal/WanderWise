CREATE TABLE Hotels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price_per_night DECIMAL(5,2),
    location VARCHAR(255)
);
