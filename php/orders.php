<?php
/**
 * E-Graphisme - Orders API
 * Gestion des commandes clients
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$db_file = __DIR__ . '/../db/orders.json';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// GET - Lister les commandes
if ($method === 'GET') {
    if (file_exists($db_file)) {
        $orders = json_decode(file_get_contents($db_file), true);
    } else {
        $orders = [];
    }
    
    echo json_encode([
        'success' => true,
        'orders' => $orders
    ]);
    exit;
}

// POST - Créer une commande
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Valider les données
    if (empty($input['items']) || count($input['items']) === 0) {
        echo json_encode([
            'success' => false,
            'error' => 'Panier vide'
        ]);
        exit;
    }
    
    if (empty($input['customer']['name']) || empty($input['customer']['email'])) {
        echo json_encode([
            'success' => false,
            'error' => 'Nom et email requis'
        ]);
        exit;
    }
    
    // Créer la commande
    $order = [
        'id' => $input['id'] ?? 'order_' . time(),
        'items' => $input['items'],
        'customer' => [
            'name' => $input['customer']['name'],
            'email' => $input['customer']['email'],
            'phone' => $input['customer']['phone'] ?? '',
            'company' => $input['customer']['company'] ?? '',
            'message' => $input['customer']['message'] ?? ''
        ],
        'total' => $input['total'] ?? 0,
        'status' => 'pending',
        'payment' => 'pending',
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ];
    
    // Charger les commandes existantes
    $orders = [];
    if (file_exists($db_file)) {
        $orders = json_decode(file_get_contents($db_file), true);
        if (!is_array($orders)) {
            $orders = [];
        }
    }
    
    // Ajouter la nouvelle commande
    $orders[] = $order;
    
    // Sauvegarder
    if (file_put_contents($db_file, json_encode($orders, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'success' => true,
            'message' => 'Commande créée avec succès',
            'order' => $order
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Erreur lors de la sauvegarde'
        ]);
    }
    exit;
}

// PUT - Mettre à jour une commande
if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['id'])) {
        echo json_encode([
            'success' => false,
            'error' => 'ID de commande requis'
        ]);
        exit;
    }
    
    // Charger les commandes
    $orders = [];
    if (file_exists($db_file)) {
        $orders = json_decode(file_get_contents($db_file), true);
    }
    
    // Trouver et mettre à jour la commande
    $found = false;
    foreach ($orders as &$order) {
        if ($order['id'] === $input['id']) {
            $order = array_merge($order, $input);
            $order['updated_at'] = date('Y-m-d H:i:s');
            $found = true;
            break;
        }
    }
    
    if ($found) {
        file_put_contents($db_file, json_encode($orders, JSON_PRETTY_PRINT));
        echo json_encode([
            'success' => true,
            'message' => 'Commande mise à jour'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Commande non trouvée'
        ]);
    }
    exit;
}

echo json_encode(['error' => 'Méthode non autorisée']);