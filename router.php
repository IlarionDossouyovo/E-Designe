<?php
// Router script for E-Graphisme PHP built-in server
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// Remove leading/trailing slashes for consistency
$path = trim($path, '/');

// Build file path
$filePath = $path === '' ? '/index.html' : '/' . $path . '.html';

// Serve existing files directly
if (is_file(__DIR__ . $filePath)) {
    readfile(__DIR__ . $filePath);
    return;
}

// Default to index.html for root
if ($path === '' || $path === 'index') {
    readfile(__DIR__ . '/index.html');
    return;
}

// Try to serve .html file (alternative)
$altPath = __DIR__ . '/' . $path . '.html';
if (is_file($altPath)) {
    readfile($altPath);
    return;
}

// 404
http_response_code(404);
echo "Page non trouvée: " . $path;