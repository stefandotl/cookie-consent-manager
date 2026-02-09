<?php
// ==========================================
// CONSENT LOGGING (DSGVO NACHWEIS)
// ==========================================
// Dieses Skript speichert die Einwilligung des Nutzers serverseitig.
// Dies dient der Nachweispflicht gemäß Art. 7 Abs. 1 DSGVO.
//
// HINWEIS: Stellen Sie sicher, dass der Ordner 'logs' existiert und beschreibbar ist,
// oder passen Sie den Pfad zu einer Datenbank an.

header('Content-Type: application/json');

// Nur POST-Anfragen erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// JSON-Daten empfangen
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

// IP-Adresse anonymisieren (letztes Oktett entfernen)
$ip = $_SERVER['REMOTE_ADDR'];
if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
    $ip = preg_replace('/\.\d+$/', '.0', $ip);
} elseif (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) {
    $ip = preg_replace('/:[a-f0-9]+:[a-f0-9]+:[a-f0-9]+:[a-f0-9]+$/', ':0000:0000:0000:0000', $ip);
}

// Log-Eintrag vorbereiten
$logEntry = [
    'timestamp' => date('c'), // ISO 8601 Datum
    'consent_id' => $data['consent_id'] ?? 'unknown',
    'consent_type' => $data['consent_type'] ?? 'unknown', // 'all', 'essential', 'custom'
    'categories' => $data['categories'] ?? [],
    'ip_anonymized' => $ip,
    'user_agent' => $_SERVER['HTTP_USER_AGENT']
];

// In Datei speichern (In der Praxis: Datenbank empfohlen)
// Wir erstellen eine Log-Datei pro Monat
$logDir = __DIR__ . '/logs';
if (!is_dir($logDir)) {
    mkdir($logDir, 0755, true);
}

$logFile = $logDir . '/consent_' . date('Y-m') . '.log';
$logLine = json_encode($logEntry) . "\n";

if (file_put_contents($logFile, $logLine, FILE_APPEND | LOCK_EX)) {
    echo json_encode(['status' => 'success', 'message' => 'Consent logged']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Could not write log']);
}
?>
