<?php

header("Content-Type: application/json; charset=UTF-8");

$file = __DIR__ . "/messages.json";

if (!file_exists($file)) {
    file_put_contents($file, "[]");
}

echo file_get_contents($file);

?>