<?php
// Debug - list all files
$dir = __DIR__;
echo "DIR: $dir<br>";
echo "<br>FILES:<br>";
$files = scandir($dir);
foreach($files as $f) {
    echo "- $f<br>";
}
echo "<br>INDEX.HTML EXISTS: " . (file_exists($dir . '/index.html') ? 'YES' : 'NO') . "<br>";