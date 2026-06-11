<?php
// E-Graphisme Router - Minimal
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');

if ($path === '') {
    $path = 'index.html';
} else if (!str_ends_with($path, '.html')) {
    $path = $path . '.html';
}

readfile(__DIR__ . '/' . $path);