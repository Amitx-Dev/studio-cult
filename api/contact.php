<?php
/**
 * STUDIO CULT - AJAX Contact Form Handler
 * Validates, sanitizes, and returns JSON response
 */

header('Content-Type: application/json; charset=utf-8');

// Ensure request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method. Only POST is allowed.'
    ]);
    exit;
}

// Retrieve & sanitize input data
$name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email   = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : 'General Inquiry';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Anti-Spam Honeypot Detection
if (!empty($_POST['website_url_hp']) || !empty($_POST['company_fax_hp'])) {
    http_response_code(200);
    echo json_encode([
        'status'  => 'success',
        'message' => 'Thank you! Your message has been received.'
    ]);
    exit;
}

// Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Please enter your valid full name.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid email address.';
}

if (empty($message) || strlen($message) < 5) {
    $errors[] = 'Message must be at least 5 characters long.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => implode(' ', $errors)
    ]);
    exit;
}

// In production, send email via mail() or PHPMailer / SMTP:
// mail('hello@studiocult.co', "Contact Form: $subject", $message, "From: $email");

echo json_encode([
    'status' => 'success',
    'message' => "Thank you, {$name}! Your message has been received. Our team will contact you within 24 hours.",
    'data' => [
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'timestamp' => date('Y-m-d H:i:s')
    ]
]);
exit;

