<?php
echo "<h1>E-Graphisme Server Working!</h1>";
echo "<p>Current directory: " . getcwd() . "</p>";
echo "<p>Files in directory:</p>";
echo "<ul>";
$files = scandir('.');
foreach($files as $f) {
    if(is_file($f)) {
        echo "<li>$f</li>";
    }
}
echo "</ul>";
echo "<p><a href='index.html'>index.html</a></p>";
echo "<p><a href='portfolio.html'>portfolio.html</a></p>";