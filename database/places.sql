CREATE TABLE Places (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    distance_km DECIMAL(5,2),
    ticket_price DECIMAL(5,2)
);
