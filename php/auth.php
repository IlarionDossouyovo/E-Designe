<?php
/**
 * E-Graphisme - Auth API
 * Gestion de l'authentification et des utilisateurs
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$db_file = __DIR__ . '/../db/users.json';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Helper: Charger les utilisateurs
function loadUsers() {
    global $db_file;
    if (file_exists($db_file)) {
        $users = json_decode(file_get_contents($db_file), true);
        return is_array($users) ? $users : [];
    }
    return [];
}

// Helper: Sauvegarder les utilisateurs
function saveUsers($users) {
    global $db_file;
    file_put_contents($db_file, json_encode($users, JSON_PRETTY_PRINT));
}

// Helper: Générer un token
function generateToken($userId) {
    return bin2hex(random_bytes(32));
}

// Helper: Hasher le mot de passe
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

// GET - Obtenir l'utilisateur connecté
if ($method === 'GET') {
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? str_replace('Bearer ', '', $_GET['Authorization'] ?? '');
    
    if (empty($token)) {
        echo json_encode(['authenticated' => false]);
        exit;
    }
    
    $users = loadUsers();
    foreach ($users as $user) {
        if (isset($user['token']) && $user['token'] === $token) {
            unset($user['password']);
            echo json_encode(['authenticated' => true, 'user' => $user]);
            exit;
        }
    }
    
    echo json_encode(['authenticated' => false]);
    exit;
}

// POST - Connexion, Inscription, etc.
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? 'login';
    
    switch ($action) {
        case 'login':
            // Connexion
            $email = $input['email'] ?? '';
            $password = $input['password'] ?? '';
            
            if (empty($email) || empty($password)) {
                echo json_encode(['success' => false, 'message' => 'Email et mot de passe requis']);
                exit;
            }
            
            $users = loadUsers();
            $found = false;
            
            foreach ($users as &$user) {
                if (isset($user['email']) && $user['email'] === $email) {
                    if (password_verify($password, $user['password'])) {
                        $user['token'] = generateToken($user['id']);
                        $user['lastLogin'] = date('Y-m-d H:i:s');
                        saveUsers($users);
                        
                        unset($user['password']);
                        echo json_encode([
                            'success' => true,
                            'token' => $user['token'],
                            'user' => $user,
                            'redirect' => 'dashboard.html'
                        ]);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect']);
                    }
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé']);
            }
            break;
            
        case 'register':
            // Inscription
            $firstName = $input['firstName'] ?? '';
            $lastName = $input['lastName'] ?? '';
            $email = $input['email'] ?? '';
            $password = $input['password'] ?? '';
            $phone = $input['phone'] ?? '';
            $company = $input['company'] ?? '';
            
            if (empty($email) || empty($password)) {
                echo json_encode(['success' => false, 'message' => 'Email et mot de passe requis']);
                exit;
            }
            
            // Vérifier si l'email existe déjà
            $users = loadUsers();
            foreach ($users as $user) {
                if (isset($user['email']) && $user['email'] === $email) {
                    echo json_encode(['success' => false, 'message' => 'Email déjà utilisé']);
                    exit;
                }
            }
            
            // Créer l'utilisateur
            $newUser = [
                'id' => 'user_' . time(),
                'firstName' => $firstName,
                'lastName' => $lastName,
                'email' => $email,
                'password' => hashPassword($password),
                'phone' => $phone,
                'company' => $company,
                'plan' => 'free',
                'projects' => 0,
                'createdAt' => date('Y-m-d H:i:s'),
                'token' => generateToken('user_' . time())
            ];
            
            $users[] = $newUser;
            saveUsers($users);
            
            unset($newUser['password']);
            echo json_encode([
                'success' => true,
                'token' => $newUser['token'],
                'user' => $newUser,
                'redirect' => 'dashboard.html'
            ]);
            break;
            
        case 'updateProfile':
            // Mettre à jour le profil
            $token = $input['token'] ?? '';
            
            if (empty($token)) {
                echo json_encode(['success' => false, 'message' => 'Non connecté']);
                exit;
            }
            
            $users = loadUsers();
            $found = false;
            
            foreach ($users as &$user) {
                if (isset($user['token']) && $user['token'] === $token) {
                    $user['firstName'] = $input['firstName'] ?? $user['firstName'];
                    $user['lastName'] = $input['lastName'] ?? $user['lastName'];
                    $user['phone'] = $input['phone'] ?? $user['phone'];
                    $user['company'] = $input['company'] ?? $user['company'];
                    $user['bio'] = $input['bio'] ?? $user['bio'];
                    $user['updatedAt'] = date('Y-m-d H:i:s');
                    
                    saveUsers($users);
                    unset($user['password']);
                    
                    echo json_encode(['success' => true, 'user' => $user]);
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé']);
            }
            break;
            
        case 'subscribe':
            // Changer d'abonnement
            $token = $input['token'] ?? '';
            $plan = $input['plan'] ?? 'free';
            
            if (empty($token)) {
                echo json_encode(['success' => false, 'message' => 'Non connecté']);
                exit;
            }
            
            $users = loadUsers();
            $found = false;
            
            foreach ($users as &$user) {
                if (isset($user['token']) && $user['token'] === $token) {
                    $user['plan'] = $plan;
                    $user['subscriptionDate'] = date('Y-m-d H:i:s');
                    
                    saveUsers($users);
                    unset($user['password']);
                    
                    echo json_encode(['success' => true, 'user' => $user]);
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé']);
            }
            break;
            
        case 'logout':
            // Déconnexion
            $token = $input['token'] ?? '';
            
            if (!empty($token)) {
                $users = loadUsers();
                foreach ($users as &$user) {
                    if (isset($user['token']) && $user['token'] === $token) {
                        $user['token'] = null;
                        saveUsers($users);
                        break;
                    }
                }
            }
            
            echo json_encode(['success' => true]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Action non reconnue']);
    }
    exit;
}

echo json_encode(['error' => 'Méthode non autorisée']);