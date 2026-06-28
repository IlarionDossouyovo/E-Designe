<?php
/**
 * E-Graphisme - Leads API
 * API pour gérer les leads/contacts
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];
$db_file = __DIR__ . '/../db/contacts.json';

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// GET - Lire les contacts
if ($method === 'GET') {
    if (file_exists($db_file)) {
        $contacts = json_decode(file_get_contents($db_file), true);
        echo json_encode(['success' => true, 'contacts' => $contacts]);
    } else {
        echo json_encode(['success' => true, 'contacts' => []]);
    }
    exit;
}

// POST - Ajouter un contact
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $contact = [
        'id' => 'lead_' . time(),
        'name' => $input['name'] ?? '',
        'email' => $input['email'] ?? '',
        'phone' => $input['phone'] ?? '',
        'service' => $input['service'] ?? '',
        'message' => $input['message'] ?? '',
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    // Lire les contacts existants
    $contacts = [];
    if (file_exists($db_file)) {
        $contacts = json_decode(file_get_contents($db_file), true);
        if (!is_array($contacts)) {
            $contacts = [];
        }
    }
    
    // Ajouter le nouveau contact
    $contacts[] = $contact;
    
    // Sauvegarder
    file_put_contents($db_file, json_encode($contacts, JSON_PRETTY_PRINT));
    
    echo json_encode([
        'success' => true,
        'message' => 'Contact saved',
        'contact' => $contact
    ]);
    exit;
}

echo json_encode(['error' => 'Method not allowed']);