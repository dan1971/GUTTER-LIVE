<?php 
// 1. Database Configuration
$host     = 'localhost';
$db       = 'sazxjwte_CustomerInquiries'; // Replace with your actual database name
$user     = 'sazxjwte_rainman';
$pass     = 'Copper&Tin45!';
$charset  = 'utf8mb4';


try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT `InquiryID`,`FullName`,`Email`,`Phone`,`ServiceRequested`,`CustomerMessage`,`SubmissionDate` FROM `CustomerInquiries` WHERE 1;";
    $stmt = $conn->query($sql);

    // Fetch all results into an array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($results) > 0) {
        echo json_encode($response);
    } else {
        echo "0 results";
    }
} catch(PDOException $e) {
        header('Content-Type: application/json');
    
    // Set appropriate HTTP status code (e.g., 500 Internal Server Error)
    http_response_code(500);

    // Format error details
    $response = [
        'status' => 'error',
        'code' => $e->getCode(),
        'message' => 'Database error occurred',
        // In production, avoid showing raw $e->getMessage() for security
        'debug' => $e->getMessage() 
    ];

    echo json_encode($response);
}
$conn = null; // Close connection
    
?>