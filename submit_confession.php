<?php
$host = 'b4oshfn2vdvaapfrrblx-mysql.services.clever-cloud.com';
$dbname = 'b4oshfn2vdvaapfrrblx';
$user = 'ucc78gpmfrv4jybm';
$pass = '45rU1t6KlAdO3dWXgPHG';
$charset = 'utf8mb4';

try {
    // Connect to the database using PDO
    $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if required POST data is received
    if (isset($_POST['senderName']) && isset($_POST['message'])) {
        $senderName = $_POST['senderName'];
        $message = $_POST['message'];

        // Use PHP's built-in date() function to generate a valid MySQL DATETIME format
        // Format: 'Y-m-d H:i:s' (e.g., '2024-11-15 11:28:00')
        $datetime = date('Y-m-d H:i:s'); // This will generate a MySQL-friendly format

        // Prepare and execute the SQL statement to insert the confession into the database
        $stmt = $pdo->prepare("INSERT INTO confessions (sender_name, message, posted_at) VALUES (?, ?, ?)");
        $stmt->execute([$senderName, $message, $datetime]);

        // Respond with a success message
        echo json_encode(['success' => true]);
    } else {
        // Return an error message if required fields are missing
        echo json_encode(['success' => false, 'error' => 'Missing required fields.']);
    }
} catch (PDOException $e) {
    // Return specific error message in case of any PDO exception
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
