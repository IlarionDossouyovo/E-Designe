<?php
// Default index - serve index.html
$indexFile = __DIR__ . '/index.html';
if (file_exists($indexFile)) {
    readfile($indexFile);
} else {
    echo "index.html not found";
}