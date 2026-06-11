<?php
// E-Graphisme Router
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);

// Remove query strings and trim
$path = trim(explode('?', $path)[0], '/');

// Get directory
$dir = __DIR__;

// If root, serve index
if ($path === '') {
    include $dir . '/index.html';
    exit;
}

// Try direct file
$file = $dir . '/' . $path;
if (file_exists($file)) {
    include $file;
    exit;
}

// Try with .html
if (!str_ends_with($path, '.html')) {
    $htmlFile = $dir . '/' . $path . '.html';
    if (file_exists($htmlFile)) {
        include $htmlFile;
        exit;
    }
}

// 404
http_response_code(404);
echo "Page non trouvée: $path";