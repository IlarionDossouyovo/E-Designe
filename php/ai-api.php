<?php
/**
 * E-Graphisme - Ollama AI API
 * Backend PHP pour le chat IA avec Ollama et brand analysis
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration Ollama
$OLLAMA_HOST = getenv('OLLAMA_HOST') ?: 'http://localhost:11434';
$DEFAULT_MODEL = getenv('OLLAMA_MODEL') ?: 'llama3';

// Get action from request
$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';

// Handle preflight
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Route to handler
switch ($action) {
    case 'chat':
        handleChat($input);
        break;
    case 'analyze_website':
        handleAnalyzeWebsite($input);
        break;
    case 'generate_prompt':
        handleGeneratePrompt($input);
        break;
    default:
        // Default to chat if no action
        if ($method === 'POST') {
            handleChat($input);
        } else {
            echo json_encode([
                'status' => 'ok',
                'service' => 'E-Graphisme AI API',
                'endpoints' => [
                    'POST /api/ai - action: chat' => 'Chat with AI',
                    'POST /api/ai - action: analyze_website' => 'Analyze website URL',
                    'POST /api/ai - action: generate_prompt' => 'Generate AI prompt'
                ]
            ]);
        }
}

/**
 * Handle chat request
 */
function handleChat($input) {
    global $OLLAMA_HOST, $DEFAULT_MODEL;
    
    $message = $input['message'] ?? '';
    $model = $input['model'] ?? $DEFAULT_MODEL;
    $system = $input['system'] ?? 'You are E-Graphisme AI assistant. Help users with design, branding, web design, and company information. Respond in French or English.';
    
    if (empty($message)) {
        echo json_encode(['error' => 'Message required']);
        return;
    }
    
    // Call Ollama
    $data = [
        'model' => $model,
        'prompt' => $system . "\n\nUser: " . $message . "\n\nAssistant:",
        'stream' => false
    ];
    
    $ch = curl_init($OLLAMA_HOST . '/api/generate');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code === 200) {
        $result = json_decode($response, true);
        echo json_encode([
            'success' => true,
            'response' => $result['response'] ?? $result['message']['content'] ?? simulateResponse($message)
        ]);
    } else {
        // Fallback to simulation
        echo json_encode([
            'success' => true,
            'response' => simulateResponse($message)
        ]);
    }
}

/**
 * Handle website analysis request
 */
function handleAnalyzeWebsite($input) {
    $url = $input['url'] ?? '';
    
    if (empty($url)) {
        echo json_encode(['error' => 'URL required']);
        return;
    }
    
    // Normalize URL
    if (!preg_match('/^https?:\/\//', $url)) {
        $url = 'https://' . $url;
    }
    
    // Extract HTML from URL
    $html = @file_get_contents($url);
    
    if ($html === false) {
        // Return mock data for demo
        echo json_encode([
            'success' => true,
            'url' => $url,
            'brandName' => 'Demo Brand',
            'industry' => 'Technology',
            'targetAudience' => 'Professionals, Businesses',
            'logo' => '/images/logo-electron-premium.svg',
            'primaryColors' => [
                ['name' => 'Primary Blue', 'hex' => '#00D4FF'],
                ['name' => 'Secondary Purple', 'hex' => '#7B2FFF']
            ],
            'secondaryColors' => [
                ['name' => 'Accent Pink', 'hex' => '#FF006E'],
                ['name' => 'Dark', 'hex' => '#0a0a0f']
            ],
            'fonts' => [
                ['name' => 'Inter', 'category' => 'sans-serif'],
                ['name' => 'Orbitron', 'category' => 'display']
            ],
            'images' => [],
            'products' => [],
            'services' => ['Web Design', 'Branding', 'UI/UX'],
            'socialMedia' => [],
            'contact' => []
        ]);
        return;
    }
    
    // Parse HTML to extract brand elements
    $doc = new DOMDocument();
    @$doc->loadHTML($html);
    
    // Extract title
    $title = '';
    $metas = $doc->getElementsByTagName('title');
    if ($metas->length > 0) {
        $title = $metas->item(0)->textContent;
    }
    
    // Extract meta description
    $description = '';
    $descriptions = $doc->getElementsByTagName('meta');
    foreach ($descriptions as $meta) {
        if ($meta->getAttribute('name') === 'description') {
            $description = $meta->getAttribute('content');
            break;
        }
    }
    
    // Extract colors from styles
    preg_match_all('/#([0-9a-fA-F]{3,6})/', $html, $matches);
    $colors = array_unique($matches[0]);
    $primaryColors = [];
    $secondaryColors = [];
    
    foreach (array_slice($colors, 0, 6) as $color) {
        if (count($primaryColors) < 3) {
            $primaryColors[] = ['name' => 'Color ' . count($primaryColors), 'hex' => $color];
        } elseif (count($secondaryColors) < 3) {
            $secondaryColors[] = ['name' => 'Color ' . count($secondaryColors), 'hex' => $color];
        }
    }
    
    // Extract images
    $images = [];
    $imgs = $doc->getElementsByTagName('img');
    foreach ($imgs as $img) {
        $src = $img->getAttribute('src');
        if ($src && !strpos($src, 'data:')) {
            $images[] = $src;
        }
    }
    
    echo json_encode([
        'success' => true,
        'url' => $url,
        'brandName' => $title ?: 'Unknown',
        'industry' => 'Unknown',
        'targetAudience' => 'General',
        'logo' => '',
        'primaryColors' => $primaryColors ?: [['name' => 'Primary', 'hex' => '#00D4FF']],
        'secondaryColors' => $secondaryColors ?: [['name' => 'Secondary', 'hex' => '#7B2FFF']],
        'fonts' => [['name' => 'System', 'category' => 'sans-serif']],
        'images' => array_slice($images, 0, 10),
        'products' => [],
        'services' => [],
        'description' => $description
    ]);
}

/**
 * Handle prompt generation request
 */
function handleGeneratePrompt($input) {
    $type = $input['type'] ?? 'general';
    $brand = $input['brand'] ?? '';
    $style = $input['style'] ?? 'modern professional';
    
    $prompts = [
        'logo' => "Professional logo design for {$brand}, {$style}, minimalist, vector style, clean lines, scalable",
        'banner' => "Banner design for {$brand}, {$style}, dynamic composition, marketing materials",
        'social' => "Social media post for {$brand}, {$style}, eye-catching, engagement focused",
        'website' => "Website design for {$brand}, {$style}, modern UI, conversion optimized",
        'print' => "Print design for {$brand}, {$style}, print-ready, CMYK, professional quality",
        'video' => "Video content for {$brand}, {$style}, motion graphics, professional editing"
    ];
    
    echo json_encode([
        'success' => true,
        'prompt' => $prompts[$type] ?? $prompts['social'],
        'type' => $type,
        'brand' => $brand,
        'style' => $style
    ]);
}

/**
 * Simulate AI response when Ollama is not available
 */
function simulateResponse($message) {
    $responses = [
        'hello' => 'Bonjour! Je suis E-Graphisme AI. Comment puis-je vous aider avec votre projet de design ou branding?',
        'design' => 'Je serais ravi de vous aider avec votre projet de design. Quelle type de création recherchez-vous? Logo, site web, identité visuelle...?',
        'branding' => 'Le branding est essentiel pour votre entreprise. Je peux vous aider à créer une identité visuelle cohérente et professionnelle.',
        'default' => 'Merci pour votre message. Je suis disponible pour discuter de vos projets de design, branding, ou pour répondre à vos questions sur nos services.'
    ];
    
    $message = strtolower($message);
    foreach ($responses as $key => $response) {
        if (strpos($message, $key) !== false) {
            return $response;
        }
    }
    
    return $responses['default'];
}