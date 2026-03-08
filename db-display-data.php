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

    $sql = "SELECT id, first_name, last_name FROM users";
    $stmt = $conn->query($sql);

    // Fetch all results into an array
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($results) > 0) {
        echo "<ul>";
        foreach ($results as $row) {
            echo "<li>ID: " . $row["id"]. " - Name: " . $row["first_name"]. " " . $row["last_name"]. "</li>";
        }
        echo "</ul>";
    } else {
        echo "0 results";
    }
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
$conn = null; // Close connection
    
?>