<?php
// Router script for PHP built-in server
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// Serve existing files directly
$file = __DIR__ . $path;
if (is_file($file)) {
    return false;
}

// Default to index.html for root
if ($uri === '/' || $uri === '') {
    readfile(__DIR__ . '/index.html');
    return;
}

// Try to serve .html file without extension
if (is_file(__DIR__ . $path . '.html')) {
    readfile(__DIR__ . $path . '.html');
    return;
}

// 404
http_response_code(404);
echo "Page non trouvée";