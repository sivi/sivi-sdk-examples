<?php
require_once __DIR__ . '/SiviClient.php';

header('Content-Type: application/json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ("$method $uri") {
        case 'POST /designs-from-prompt':
            echo json_encode(SiviClient::post('/general/designs-from-prompt', getJsonBody()));
            break;

        case 'POST /designs-from-content':
            echo json_encode(SiviClient::post('/general/designs-from-content', getJsonBody()));
            break;

        case 'POST /content-from-prompt':
            echo json_encode(SiviClient::post('/general/content-from-prompt', getJsonBody()));
            break;

        case 'GET /get-request-status':
            echo json_encode(SiviClient::get('/general/get-request-status', ['requestId' => $_GET['requestId'] ?? '']));
            break;

        case 'GET /get-design-variants':
            echo json_encode(SiviClient::get('/general/get-design-variants', ['designId' => $_GET['designId'] ?? '']));
            break;

        case 'POST /update-webhook':
            $body = getJsonBody();
            if (empty($body['webhookUrl']) || !is_string($body['webhookUrl'])) {
                http_response_code(400);
                echo json_encode(['error' => 'webhookUrl is required and must be a string']);
                break;
            }
            echo json_encode(SiviClient::post('/general/update-webhook', $body));
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

function getJsonBody(): array {
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?? [];
}
