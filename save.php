<?php

header("Content-Type: application/json; charset=UTF-8");

$name = trim($_POST["name"] ?? "");
$text = trim($_POST["text"] ?? "");

if ($name === "" || $text === "") {
    echo json_encode([
        "success" => false,
        "message" => "Имя и сообщение не должны быть пустыми"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$file = __DIR__ . "/messages.json";

if (!file_exists($file)) {
    file_put_contents($file, "[]");
}

$messages = json_decode(file_get_contents($file), true);

if (!is_array($messages)) {
    $messages = [];
}

$messages[] = [
    "name" => $name,
    "text" => $text,
    "time" => date("Y-m-d H:i:s")
];

$result = file_put_contents(
    $file,
    json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

if ($result === false) {
    echo json_encode([
        "success" => false,
        "message" => "Не получилось записать файл messages.json"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Сообщение сохранено"
], JSON_UNESCAPED_UNICODE);

?>