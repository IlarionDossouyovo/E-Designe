<?php
// E-Graphisme Router - Simple Version
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');

// Get directory
$dir = __DIR__;

// Map routes to files
$routes = [
    '' => 'index.html',
    'index' => 'index.html',
    'portfolio' => 'portfolio.html',
    'services' => 'services.html',
    'studio' => 'studio.html',
    'contact' => 'contact.html',
    'about' => 'about.html',
    'blog' => 'blog.html',
    'privacy' => 'privacy.html',
    'terms' => 'terms.html',
];

// Check if route exists in our map
if (isset($routes[$path])) {
    $file = $dir . '/' . $routes[$path];
    if (file_exists($file)) {
        readfile($file);
        exit;
    }
}

// Try direct file with .html
$file = $dir . '/' . $path . '.html';
if (file_exists($file)) {
    readfile($file);
    exit;
}

// Try without extension
$file = $dir . '/' . $path;
if (file_exists($file)) {
    readfile($file);
    exit;
}

// 404
http_response_code(404);
echo "404 - Page non trouvée: $path";