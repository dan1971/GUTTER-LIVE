<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

define('GUSER', 'servicerequest@rainreadyguttersolutions.com'); // GMail username
define('GPWD', 'MutterGutter33!'); // GMail password

$send_to = "danrollans100@gmail.com;


$from_name = $_POST['firstname'];
$phone = $_POST['phone']; 
$from = $_POST['email'];
$subject = "Gutter Service Request";
$service = $_POST['service'];
$body = $_POST['message'];

function smtpmailer($to, $from, $from_name, $subject, $body) { 
    global $error;
    $mail = new PHPMailer();  // create a new object
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true;  // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
    $mail->Host = 'smtp0101.titan.email';
    $mail->Port = 465; 
    $mail->Username = GUSER;  
    $mail->Password = GPWD;           
    $mail->AddReplyTo($from, $from_name);
    $mail->SetFrom($from, $from);
    $mail->Subject = $subject;
    $mail->Body = "From: " . $from_name . "\n" . "Email: " . $from  . "Phone Number: " . $phone . "Service Requested: " . $service . "\n" . "Message: " . $body;
    $mail->AddAddress($to);
    if(!$mail->Send()) {
        $error = 'Mail error: '.$mail->ErrorInfo; 
        $response = array("error","There was a problem sending your message.<br>Please reload the page and try again");
        echo json_encode($response);
        return false;
    } else {
        $error = 'Message sent!';
        $userName = json_encode($from_name);
        $response = array("success",$userName);
        echo json_encode($response); //sending response to ajax
        return true;
    }
}

// Sanitize and print comment string
$sanitizedFirstName = htmlspecialchars($from_name, ENT_QUOTES, 'UTF-8');
//echo $sanitizedFirstName;

// Sanitize Email
$sanitizedEmail = filter_var($from, FILTER_SANITIZE_EMAIL);

// Validate Email and send or 
if (filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
        // $userName = json_encode($sanitizedFirstName);
        // $response = array("success",$userName);
        // echo json_encode($response);
    smtpmailer($send_to,$from,$from_name,$subject,$body);
} else {
    $response = array("error","Invalid email address. Please check for typos and resend");
    echo json_encode($response);
}

?>