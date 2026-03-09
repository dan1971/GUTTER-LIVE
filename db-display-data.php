<?php 
header('Content-Type: application/json; charset=utf-8;');

// 1. Database Configuration
$host     = 'localhost';
$db       = 'sazxjwte_CustomerInquiries'; // Replace with your actual database name
$user     = 'sazxjwte_rainman';
$pass     = 'Copper&Tin45!';
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $sql = "SELECT * FROM `CustomerInquiries`";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Fetch all results into an array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json_response = json_encode($results, JSON_PRETTY_PRINT);
    echo $json_response;
} catch(PDOException $e) {
    
    header('Content-Type: application/json');
    
    // Set appropriate HTTP status code (e.g., 500 Internal Server Error)
    http_response_code(500);

    // Format error details
    $errorMsg = [
        'status' => 'error',
        'code' => $e->getCode(),
        'message' => 'Database error occurred',
        // In production, avoid showing raw $e->getMessage() for security
        'debug' => $e->getMessage() 
    ];

    echo json_encode($errorMsg);
}
$conn = null; // Close connection
    
?>