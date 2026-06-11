<?php
// E-Graphisme Router - Serve ALL files
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');

// If empty, serve index.html
if ($path === '' || $path === '/') {
    $path = 'index.html';
}

// Security: prevent directory traversal
$path = str_replace('..', '', $path);

// Build full path
$dir = dirname(__FILE__);
$file = $dir . '/' . $path;

// Check if file exists
if (file_exists($file) && is_file($file)) {
    // Determine content type
    $ext = pathinfo($path, PATHINFO_EXTENSION);
    $types = [
        'html' => 'text/html',
        'htm' => 'text/html',
        'css' => 'text/css',
        'js' => 'application/javascript',
        'json' => 'application/json',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
    ];
    
    header('Content-Type: ' . ($types[$ext] ?? 'text/html'));
    readfile($file);
    exit;
}

// 404
http_response_code(404);
echo "404 - File not found: " . htmlspecialchars($path);