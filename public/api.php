<?php
/**
 * Next Level Language School — Built-in CMS Backend (PHP 7.4+ / 8.x)
 * Works out-of-the-box on LiteSpeed / Apache / Nginx hosting (nextlevel.am).
 *
 * Endpoints:
 *   GET  api.php?action=get     -> returns saved site content JSON
 *   POST api.php?action=save    -> saves site content JSON (requires password)
 *   POST api.php?action=upload  -> uploads an image file to /uploads (requires password)
 *   POST api.php?action=verify  -> verifies admin password
 *   POST api.php?action=passwd  -> changes admin password
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$dataDir    = __DIR__ . '/data';
$uploadDir  = __DIR__ . '/uploads';
$contentFile = $dataDir . '/content.json';
$passFile    = $dataDir . '/admin_pass.hash';

// Default password if not changed yet: nextlevel2025
$defaultPass = 'nextlevel2025';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
if (!is_dir($uploadDir)) {
    @mkdir($uploadDir, 0755, true);
}

function verify_admin_password(string $provided, string $passFile, string $defaultPass): bool {
    if (file_exists($passFile)) {
        $hash = trim((string)@file_get_contents($passFile));
        if ($hash !== '') {
            return password_verify($provided, $hash);
        }
    }
    return hash_equals($defaultPass, $provided);
}

function get_provided_password(?array $jsonBody = null): string {
    if (!empty($_SERVER['HTTP_X_ADMIN_PASSWORD'])) {
        return (string)$_SERVER['HTTP_X_ADMIN_PASSWORD'];
    }
    if (!empty($_POST['password'])) {
        return (string)$_POST['password'];
    }
    if (is_array($jsonBody) && isset($jsonBody['password'])) {
        return (string)$jsonBody['password'];
    }
    return '';
}

$action = $_GET['action'] ?? 'get';

if ($action === 'get') {
    if (file_exists($contentFile)) {
        $raw = @file_get_contents($contentFile);
        if ($raw !== false && trim($raw) !== '') {
            echo $raw;
            exit;
        }
    }
    echo json_encode(new stdClass());
    exit;
}

$rawInput = file_get_contents('php://input');
$jsonBody = $rawInput ? json_decode($rawInput, true) : null;

if ($action === 'verify') {
    $pass = get_provided_password($jsonBody);
    $ok = verify_admin_password($pass, $passFile, $defaultPass);
    if (!$ok) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Неверный пароль администратора']);
        exit;
    }
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'passwd') {
    $pass = get_provided_password($jsonBody);
    if (!verify_admin_password($pass, $passFile, $defaultPass)) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Текущий пароль неверный']);
        exit;
    }
    $newPass = trim((string)($jsonBody['newPassword'] ?? ''));
    if (strlen($newPass) < 4) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Новый пароль должен содержать минимум 4 символа']);
        exit;
    }
    $hash = password_hash($newPass, PASSWORD_DEFAULT);
    @file_put_contents($passFile, $hash);
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'save') {
    $pass = get_provided_password($jsonBody);
    if (!verify_admin_password($pass, $passFile, $defaultPass)) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Неверный пароль администратора']);
        exit;
    }
    $payload = $jsonBody['content'] ?? $jsonBody;
    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Некорректные данные JSON']);
        exit;
    }
    $encoded = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if (@file_put_contents($contentFile, $encoded) === false) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Не удалось записать файл data/content.json (проверьте права доступа)']);
        exit;
    }
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'upload') {
    $pass = get_provided_password(null);
    if (!verify_admin_password($pass, $passFile, $defaultPass)) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Неверный пароль администратора']);
        exit;
    }
    if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Файл не получен или поврежден']);
        exit;
    }
    $tmpName = $_FILES['file']['tmp_name'];
    $origName = basename((string)$_FILES['file']['name']);
    $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    if (!in_array($ext, $allowed, true)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Разрешены только изображения: JPG, PNG, WEBP, GIF']);
        exit;
    }
    $slot = preg_replace('/[^a-zA-Z0-9_-]/', '_', (string)($_POST['slot'] ?? 'img'));
    $filename = $slot . '_' . time() . '_' . substr(md5(uniqid('', true)), 0, 6) . '.' . $ext;
    $targetPath = $uploadDir . '/' . $filename;
    if (!@move_uploaded_file($tmpName, $targetPath)) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Не удалось сохранить загруженный файл']);
        exit;
    }
    echo json_encode([
        'ok' => true,
        'url' => 'uploads/' . $filename
    ]);
    exit;
}

http_response_code(400);
echo json_encode(['ok' => false, 'error' => 'Unknown action']);
