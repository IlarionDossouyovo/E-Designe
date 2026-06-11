<?php
/**
 * E-Graphisme - Ollama AI API
 * Backend PHP pour le chat IA avec Ollama
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration Ollama
$OLLAMA_HOST = 'http://localhost:11434';
$DEFAULT_MODEL = 'llama3';

// Gestion des requêtes
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $message = $input['message'] ?? '';
    $model = $input['model'] ?? $DEFAULT_MODEL;
    $system = $input['system'] ?? 'You are E-Graphisme AI assistant. Help users with design, branding, web design, and company information. Respond in French or English.';
    
    if (empty($message)) {
        echo json_encode(['error' => 'Message required']);
        exit;
    }
    
    // Appeler Ollama
    $data = [
        'model' => $model,
        'prompt' => $system . "\n\nUser: " . $message . "\n\nAssistant:",
        'stream' => false
    ];
    
    $ch = curl_init($OLLAMA_HOST . '/api/generate');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code === 200) {
        $result = json_decode($response, true);
        echo json_encode([
            'success' => true,
            'response' => $result['response'] ?? $result['message']['content'] ?? 'No response'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Ollama error',
            'details' => $response
        ]);
    }
} else {
    echo json_encode([
        'status' => 'ok',
        'service' => 'E-Graphisme AI API',
        'endpoints' => [
            'POST /api/ai' => 'Chat with AI'
        ]
    ]);
}