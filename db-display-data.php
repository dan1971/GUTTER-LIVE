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

    $sql = "SELECT `InquiryID`,`FullName`,`Email`,`Phone`,`ServiceRequested`,`CustomerMessage`,`SubmissionDate` FROM `CustomerInquiries` WHERE 1;";
    $stmt = $pdo->prepare($sql);

    // Fetch all results into an array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($results) > 0) {
        echo json_encode($results);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "0 Results",
            "data" => []
        ]);
    }
} catch(PDOException $e) {
    
    header('Content-Type: application/json');
    
    // Set appropriate HTTP status code (e.g., 500 Internal Server Error)
    http_response_code(500);

    // Format error details
    $results = [
        'status' => 'error',
        'code' => $e->getCode(),
        'message' => 'Database error occurred',
        // In production, avoid showing raw $e->getMessage() for security
        'debug' => $e->getMessage() 
    ];

    echo json_encode($results);
}
$conn = null; // Close connection
    
?>