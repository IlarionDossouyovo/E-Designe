<?php
// E-Graphisme Router - Debug Version
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');

$dir = __DIR__;

// Debug: show what we're looking for
$debug = "Searching for: '$path' in dir: '$dir'<br>";
$debug .= "Files in dir:<br>";
$files = scandir($dir);
foreach ($files as $f) {
    $debug .= "- $f<br>";
}

echo $debug;
exit;

// (rest of code never reached)