<?php
/**
 * E-Graphisme - Ollama AI Integration
 * Connect to local Ollama for AI-powered responses
 */

// Configuration
define('OLLAMA_HOST', getenv('OLLAMA_HOST') ?: 'http://localhost:11434');
define('OLLAMA_MODEL', getenv('OLLAMA_MODEL') ?: 'llama3.2:1b');

/**
 * Send a chat message to Ollama
 */
function ollama_chat($message, $system_prompt = null) {
    $url = OLLAMA_HOST . '/api/chat';
    
    $messages = [];
    
    if ($system_prompt) {
        $messages[] = [
            'role' => 'system',
            'content' => $system_prompt
        ];
    }
    
    $messages[] = [
        'role' => 'user',
        'content' => $message
    ];
    
    $data = [
        'model' => OLLAMA_MODEL,
        'messages' => $messages,
        'stream' => false,
        'options' => [
            'temperature' => 0.7,
            'top_p' => 0.9,
            'num_ctx' => 4096
        ]
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        return [
            'success' => false,
            'error' => $error
        ];
    }
    
    if ($http_code !== 200) {
        return [
            'success' => false,
            'error' => "HTTP $http_code: $response"
        ];
    }
    
    $result = json_decode($response, true);
    
    return [
        'success' => true,
        'response' => $result['message']['content'] ?? '',
        'model' => $result['model'] ?? OLLAMA_MODEL,
        'done' => $result['done'] ?? true
    ];
}

/**
 * Generate embeddings for semantic search
 */
function ollama_embeddings($text) {
    $url = OLLAMA_HOST . '/api/embeddings';
    
    $data = [
        'model' => OLLAMA_MODEL,
        'prompt' => $text
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    return $result['embedding'] ?? [];
}

/**
 * Check if Ollama is available
 */
function ollama_available() {
    $url = OLLAMA_HOST . '/api/tags';
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return $http_code === 200;
}

/**
 * Get available models
 */
function ollama_models() {
    $url = OLLAMA_HOST . '/api/tags';
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    return $result['models'] ?? [];
}

/**
 * E-Graphisme AI System Prompt
 */
function egraphisme_system_prompt() {
    return <<<PROMPT
Tu es l'assistant IA d'E-Graphisme, une agence de design graphique et web design basée au Bénin.

Informations sur l'entreprise:
- Nom: E-Graphisme By ELECTRON
- Email: electronbusiness07@gmail.com
- Téléphone: +229 01 977 003 47 / +229 01 498 022 02
- Adresse: Cotonou, Bénin
- Services: Branding, Web Design, Print Design, Motion Design, Production Vidéo IA

Tarifs indicatifs:
- Logo: à partir de 299€
- Site vitrine: à partir de 699€
- Site e-commerce: à partir de 1499€

Délais:
- Logo: 5-7 jours
- Site vitrine: 2-3 semaines
- Site e-commerce: 4-6 semaines

Sois professionnel, courtois et aidant. Réponds en français sauf si l'utilisateur écrit en anglais.
PROMPT;
}

/**
 * Handle AI chat request
 */
function handle_ai_chat() {
    header('Content-Type: application/json');
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['message'])) {
        echo json_encode([
            'success' => false,
            'error' => 'Message requis'
        ]);
        return;
    }
    
    $message = $input['message'];
    $lang = $input['lang'] ?? 'fr';
    
    // Check if Ollama is available
    if (!ollama_available()) {
        // Fallback to knowledge base
        echo json_encode([
            'success' => false,
            'error' => 'Ollama non disponible',
            'fallback' => true
        ]);
        return;
    }
    
    // Add context based on language
    $system_prompt = egraphisme_system_prompt();
    
    if ($lang === 'en') {
        $system_prompt = str_replace([
            'français', 'français'
        ], [
            'English', 'English'
        ], $system_prompt);
    }
    
    $result = ollama_chat($message, $system_prompt);
    
    echo json_encode($result);
}

// Handle direct calls
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'ollama-integration.php') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        handle_ai_chat();
    } else {
        // Return status
        header('Content-Type: application/json');
        echo json_encode([
            'available' => ollama_available(),
            'models' => ollama_models(),
            'host' => OLLAMA_HOST,
            'model' => OLLAMA_MODEL
        ]);
    }
}