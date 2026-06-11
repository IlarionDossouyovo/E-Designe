<?php
// E-Graphisme Router - ALWAYS run first
echo "ROUTEUR ACTIF!";
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');
$dir = __DIR__;
$file = $dir . '/' . $path . '.html';

if ($path === '') {
    $file = $dir . '/index.html';
}

if (is_file($file)) {
    readfile($file);
} else {
    echo "NOT FOUND: $file";
}