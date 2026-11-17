<?php
/**
 * STUDIO CULT - AJAX Newsletter Subscription Handler
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method.'
    ]);
    exit;
}

$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid email address.'
    ]);
    exit;
}

// In production, save to database or CRM (Mailchimp, Klaviyo, Brevo):
echo json_encode([
    'status' => 'success',
    'message' => "Welcome to STUDIO CULT! You've been subscribed with {$email}.",
    'email' => $email
]);
exit;

