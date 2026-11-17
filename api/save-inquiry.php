<?php
/**
 * STUDIO CULT - Inquiry & Custom Package Quote Submission Handler
 * Production API Endpoint
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Only POST is accepted.'
    ]);
    exit;
}

// Support both JSON body and standard form post
$input = [];
$contentType = isset($_SERVER['CONTENT_TYPE']) ? trim($_SERVER['CONTENT_TYPE']) : '';
if (strpos($contentType, 'application/json') !== false) {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: [];
} else {
    $input = $_POST;
}

// Sanitize inputs
$name           = isset($input['name']) ? trim(strip_tags($input['name'])) : '';
$businessName   = isset($input['business_name']) ? trim(strip_tags($input['business_name'])) : '';
$industry       = isset($input['industry']) ? trim(strip_tags($input['industry'])) : 'General Business';
$email          = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';
$phone          = isset($input['phone']) ? trim(strip_tags($input['phone'])) : '';
$selectedItems  = isset($input['services']) ? $input['services'] : (isset($input['selected_services']) ? $input['selected_services'] : []);
$estimatedTotal = isset($input['estimated_total']) ? trim(strip_tags($input['estimated_total'])) : '0';
$notes          = isset($input['notes']) ? trim(strip_tags($input['notes'])) : '';

// Anti-Spam Honeypot Detection
if (!empty($input['website_url_hp']) || !empty($input['company_fax_hp'])) {
    // Silent success response for bot traps
    http_response_code(200);
    echo json_encode([
        'status'  => 'success',
        'ref_id'  => 'SC-Q-' . rand(1000, 9999),
        'message' => 'Your inquiry has been successfully registered.'
    ]);
    exit;
}

// Validation
$errors = [];
if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Please provide your full name.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if (empty($phone) || strlen($phone) < 8) {
        $errors[] = 'Please provide a valid email or phone number.';
    }
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => implode(' ', $errors)
    ]);
    exit;
}

// Generate human-friendly unique Reference Number (e.g. SC-Q-8492)
$refId = 'SC-Q-' . rand(1000, 9999);

$inquiryRecord = [
    'ref_id'          => $refId,
    'timestamp'       => date('Y-m-d H:i:s'),
    'name'            => $name,
    'business_name'   => $businessName ?: 'N/A',
    'industry'        => $industry,
    'email'           => $email ?: 'N/A',
    'phone'           => $phone ?: 'N/A',
    'selected_services' => $selectedItems,
    'estimated_total' => $estimatedTotal,
    'notes'           => $notes,
    'status'          => 'New',
    'ip'              => isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '127.0.0.1'
];

// Persist in secure JSON storage
$dataFile = __DIR__ . '/inquiries.json';
$currentData = [];
if (file_exists($dataFile)) {
    $json = file_get_contents($dataFile);
    $currentData = json_decode($json, true) ?: [];
}

array_unshift($currentData, $inquiryRecord);
// Keep last 500 inquiries
if (count($currentData) > 500) {
    $currentData = array_slice($currentData, 0, 500);
}

@file_put_contents($dataFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

// Prepare WhatsApp share / quick chat text
$waMessage = "Hello STUDIO CULT! I submitted a quotation request.\nRef ID: {$refId}\nBusiness: {$businessName} ({$industry})\nName: {$name}\nPhone: {$phone}\nEstimated Total: {$estimatedTotal}\nPlease share my detailed proposal.";
$waUrl = "https://wa.me/?text=" . urlencode($waMessage);

echo json_encode([
    'status'       => 'success',
    'ref_id'       => $refId,
    'message'      => "Thank you {$name}! Your quotation inquiry #{$refId} has been successfully generated and registered. Our strategy director will review your requirements and reach out within 2–4 hours.",
    'whatsapp_url' => $waUrl,
    'summary'      => [
        'ref_id'       => $refId,
        'business'     => $businessName,
        'industry'     => $industry,
        'estimated'    => $estimatedTotal
    ]
]);
exit;
