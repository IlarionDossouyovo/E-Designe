<?php
// Auto-index - redirect to index.html or list files
$files = [
    'index.html',
    'portfolio.html', 
    'services.html',
    'studio.html',
    'contact.html',
    'about.html',
    'blog.html'
];

$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');

// If requesting a specific file
if ($path && in_array($path, $files)) {
    readfile(__DIR__ . '/' . $path);
    exit;
}

// If root, redirect to index.html
if ($path === '' || $path === '/') {
    readfile(__DIR__ . '/index.html');
    exit;
}

// Otherwise show links
header('Content-Type: text/html; charset=utf-8');
echo "<h1>E-Graphisme</h1>";
echo "<p>Server working! Files:</p>";
echo "<ul>";
foreach ($files as $f) {
    echo "<li><a href='$f'>$f</a></li>";
}
echo "</ul>";
echo "<p>Current dir: " . __DIR__ . "</p>";