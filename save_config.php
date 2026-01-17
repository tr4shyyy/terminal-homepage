<?php
header('Content-Type: application/json');

$rawInput = file_get_contents('php://input');
if ($rawInput === false || trim($rawInput) === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'empty payload']);
  exit;
}

$decoded = json_decode($rawInput, true);
if (!is_array($decoded)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'invalid json']);
  exit;
}

$target = __DIR__ . DIRECTORY_SEPARATOR . 'userconfig.local.json';
$bytes = file_put_contents($target, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
if ($bytes === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'write failed']);
  exit;
}

echo json_encode(['ok' => true, 'bytes' => $bytes]);
