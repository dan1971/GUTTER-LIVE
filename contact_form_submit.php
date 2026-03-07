<?php 

// 1. Database Configuration
$host     = 'localhost';
$db       = 'sazxjwte_CustomerInquiries'; // Replace with your actual database name
$user     = 'sazxjwte_gutterMan';
$pass     = 'BingoBangoBongo987!';
$charset  = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // 2. Connect to Database
    $pdo = new PDO($dsn, $user, $pass, $options);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // 3. Collect and Sanitize Input
        $name    = htmlspecialchars($_POST['name']);
        $email   = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $phone   = htmlspecialchars($_POST['phone']);
        $message = htmlspecialchars($_POST['message']);
        
        // 4. Handle the Checkbox Array
        // Converts ['Service A', 'Service B'] into "Service A, Service B"
        $services = isset($_POST['service']) ? implode(", ", $_POST['service']) : "None selected";

        // 5. Prepared Statement (Security First!)
        $sql = "INSERT INTO CustomerInquiries (FullName, Email, Phone, ServiceRequested, CustomerMessage) 
                VALUES (?, ?, ?, ?, ?)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$name, $email, $phone, $services, $message]);

        echo "Thank you! Your inquiry has been submitted.";
    }
} catch (\PDOException $e) {
    // In production, log this error instead of echoing it
    die("Database connection failed: " . $e->getMessage());
}
?>