<?php
$host = 'b4oshfn2vdvaapfrrblx-mysql.services.clever-cloud.com';
$dbname = 'b4oshfn2vdvaapfrrblx';
$user = 'ucc78gpmfrv4jybm';
$pass = '45rU1t6KlAdO3dWXgPHG';
$charset = 'utf8mb4';

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Query to get all confessions, ordered by the date they were posted
    $stmt = $pdo->query("SELECT * FROM confessions ORDER BY posted_at DESC");
    $confessions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the results as JSON
    echo json_encode($confessions);
} catch (PDOException $e) {
    // Return error if something goes wrong
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
