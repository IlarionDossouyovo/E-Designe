<?php
/**
 * E-Graphisme - Script de Configuration
 * Initialise la base de données et vérifie la configuration
 */

require_once __DIR__ . '/php/config.php';

echo "=======================================\n";
echo "  E-Graphisme - Setup & Configuration\n";
echo "=======================================\n\n";

// 1. Vérifier la configuration
echo "[1] Vérification de la configuration...\n";
$checks = [
    'DB_TYPE' => DB_TYPE,
    'DB_PATH' => DB_PATH,
    'EMAIL_FROM' => EMAIL_FROM,
    'EMAIL_TO' => EMAIL_TO,
    'OLLAMA_HOST' => OLLAMA_HOST,
    'OLLAMA_MODEL' => OLLAMA_MODEL
];

foreach ($checks as $key => $value) {
    echo "  - $key: $value\n";
}
echo "  ✓ Configuration chargée\n\n";

// 2. Créer les dossiers nécessaires
echo "[2] Création des dossiers...\n";
$dirs = [
    __DIR__ . '/db',
    __DIR__ . '/php/logs',
    __DIR__ . '/uploads',
    __DIR__ . '/cache'
];

foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
        echo "  - Créé: $dir\n";
    }
}
echo "  ✓ Dossiers prêts\n\n";

// 3. Initialiser les fichiers JSON
echo "[3] Initialisation de la base de données JSON...\n";
$tables = [
    'contacts' => ['contacts' => [], 'newsletter' => []],
    'users' => [
        ['id' => 'admin_001', 'username' => 'admin', 'email' => 'admin@e-graphisme.com', 'role' => 'admin', 'status' => 'active', 'password' => password_hash('egraphisme2026', PASSWORD_DEFAULT)]
    ],
    'services' => [
        ['id' => 'web', 'name' => 'Web Design', 'price' => 150000],
        ['id' => 'branding', 'name' => 'Branding', 'price' => 200000],
        ['id' => 'print', 'name' => 'Impression', 'price' => 50000],
        ['id' => 'video', 'name' => 'Vidéo', 'price' => 250000]
    ],
    'products' => [
        ['id' => 'logo', 'name' => 'Logo Professionnel', 'category' => 'branding', 'price' => 150000],
        ['id' => 'web', 'name' => 'Site Web', 'category' => 'web', 'price' => 250000],
        ['id' => 'video', 'name' => 'Vidéo Corporate', 'category' => 'video', 'price' => 300000]
    ],
    'orders' => [],
    'subscriptions' => [
        ['id' => 'free', 'name' => 'Gratuit', 'price' => 0, 'features' => ['Designs basiques', 'Export PNG', 'Support email']],
        ['id' => 'pro', 'name' => 'Pro', 'price' => 25000, 'features' => ['Tous les designs', 'Export PDF/SVG', 'Support priority', 'Branding personnalisé']],
        ['id' => 'enterprise', 'name' => 'Entreprise', 'price' => 50000, 'features' => ['Tout inclus', 'Équipe', 'API', 'Support 24/7']]
    ]
];

foreach ($tables as $table => $data) {
    $file = __DIR__ . '/db/' . $table . '.json';
    if (!file_exists($file)) {
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        echo "  - Créé: $table.json\n";
    }
}
echo "  ✓ Base de données initialisée\n\n";

// 4. Vérifier la connexion Ollama
echo "[4] Vérification Ollama...\n";
$ollamaHost = getenv('OLLAMA_HOST') ?: OLLAMA_HOST;
$ch = curl_init($ollamaHost . '/api/tags');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $data = json_decode($response, true);
    echo "  ✓ Ollama connecté\n";
    echo "  Modèles disponibles:\n";
    foreach ($data['models'] ?? [] as $model) {
        echo "    - " . $model['name'] . "\n";
    }
} else {
    echo "  ⚠ Ollama non disponible (mode simulation actif)\n";
    echo "  Pour installer Ollama: brew install ollama\n";
}
echo "\n";

// 5. Résumé
echo "=======================================\n";
echo "  Configuration Terminée!\n";
echo "=======================================\n\n";

echo "URLs:\n";
echo "  Site: http://localhost:8000\n";
echo "  Dashboard: http://localhost:8000/dashboard.html\n";
echo "  Admin: http://localhost:8000/admin/\n";
echo "\n";

echo "Comptes:\n";
echo "  Admin: admin@e-graphisme.com / egraphisme2026\n";
echo "  Editor: editor@e-graphisme.com / egraphisme2026\n";
echo "\n";

echo "Prochaines étapes:\n";
echo "  1. php -S localhost:8000\n";
echo "  2. ollama serve (pour l'IA)\n";
echo "\n";