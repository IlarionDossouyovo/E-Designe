<?php
// Router script for E-Graphisme PHP built-in server
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// Remove leading/trailing slashes
$path = trim($path, '/');

// If path is empty, serve index.html
if ($path === '' || $path === 'index' || $path === 'index.html') {
    readfile(__DIR__ . '/index.html');
    return;
}

// Build full file path
$filePath = __DIR__ . '/' . $path;

// If file exists, serve it
if (is_file($filePath)) {
    readfile($filePath);
    return;
}

// Try with .html extension if not already there
if (substr($path, -5) !== '.html') {
    $htmlPath = __DIR__ . '/' . $path . '.html';
    if (is_file($htmlPath)) {
        readfile($htmlPath);
        return;
    }
}

// 404
http_response_code(404);
echo "Page non trouvée: " . htmlspecialchars($path);