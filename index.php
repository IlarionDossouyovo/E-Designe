<?php
// Simple router - serves files from current directory
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');

// Security - remove ..
$path = str_replace('..', '', $path);

// If empty, use index.html
if ($path === '') {
    $path = 'index.html';
}

// Build full path
$dir = __DIR__;
$file = $dir . '/' . $path;

// Check if file exists
if (file_exists($file)) {
    $ext = pathinfo($path, PATHINFO_EXTENSION);
    $mime_types = [
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
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
    ];
    
    header('Content-Type: ' . ($mime_types[$ext] ?? 'text/html'));
    readfile($file);
    exit;
}

// 404
http_response_code(404);
echo "404 - File not found: " . htmlspecialchars($path);
echo "<br>Looking in: " . $dir;