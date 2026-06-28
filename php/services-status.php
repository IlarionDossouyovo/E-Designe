<?php
// E-Graphisme - Service Status API

header('Content-Type: application/json');

// Services a verifier
$services = [
    ['name' => 'web', 'url' => 'http://127.0.0.1:8000', 'port' => 8000],
    ['name' => 'n8n', 'url' => 'http://localhost:5678', 'port' => 5678],
    ['name' => 'ollama', 'url' => 'http://localhost:11434', 'port' => 11434],
    ['name' => 'webui', 'url' => 'http://localhost:3001', 'port' => 3001]
];

$results = [];

foreach ($services as $service) {
    $status = false;
    $conn = @fsockopen('localhost', $service['port'], $errno, $errstr, 2);
    if ($conn) {
        $status = true;
        fclose($conn);
    }
    
    $results[] = [
        'name' => $service['name'],
        'port' => $service['port'],
        'status' => $status ? 'online' : 'offline'
    ];
}

echo json_encode([
    'success' => true,
    'timestamp' => date('Y-m-d H:i:s'),
    'services' => $results
], JSON_PRETTY_PRINT);