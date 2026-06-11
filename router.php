<?php
// E-Graphisme Router - with debug
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$path = trim($path, '/');

$dir = __DIR__;
$fullPath = $dir . '/' . $path;

echo "URI: $uri<br>";
echo "PATH: $path<br>";
echo "DIR: $dir<br>";
echo "FULL: $fullPath<br>";
echo "EXISTS: " . (file_exists($fullPath) ? 'YES' : 'NO') . "<br>";

if ($path === '') {
    echo "ROOT - serving index.html";
    readfile($dir . '/index.html');
    exit;
}

if (is_file($fullPath)) {
    echo "FOUND: $fullPath";
    readfile($fullPath);
    exit;
}

$htmlPath = $dir . '/' . $path . '.html';
echo "HTML: $htmlPath EXISTS: " . (file_exists($htmlPath) ? 'YES' : 'NO') . "<br>";
if (is_file($htmlPath)) {
    readfile($htmlPath);
    exit;
}

echo "404";
exit;