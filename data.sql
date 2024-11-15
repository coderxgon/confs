CREATE TABLE confessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    posted_at DATETIME NOT NULL
);
