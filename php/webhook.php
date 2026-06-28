<?php
/**
 * E-Graphisme - Webhook Endpoints for N8N/Ollama Integration
 * 
 * Architecture: Frontend -> Webhook -> Ollama -> JSON -> Frontend
 * 
 * Endpoints:
 * - /webhook/analyze-brand - Brand analysis
 * - /webhook/generate-prompt - Prompt generation
 * - /webhook/generate-template - Template generation
 * - /webhook/generate-video - Video generation
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Parse endpoint from URI
$endpoint = parse_url($requestUri, PHP_URL_PATH);
$endpoint = str_replace('/webhook/', '', $endpoint);

// Get request body
$input = json_decode(file_get_contents('php://input'), true);

// Route to handler
switch ($endpoint) {
    case 'analyze-brand':
        handleAnalyzeBrand($input);
        break;
    case 'generate-prompt':
        handleGeneratePrompt($input);
        break;
    case 'generate-template':
        handleGenerateTemplate($input);
        break;
    case 'generate-video':
        handleGenerateVideo($input);
        break;
    default:
        echo json_encode([
            'success' => false,
            'error' => 'Endpoint not found: ' . $endpoint,
            'available_endpoints' => [
                '/webhook/analyze-brand',
                '/webhook/generate-prompt',
                '/webhook/generate-template',
                '/webhook/generate-video'
            ]
        ]);
}

/**
 * Handle brand analysis request
 */
function handleAnalyzeBrand($input) {
    $url = $input['url'] ?? '';
    
    if (empty($url)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'URL is required'
        ]);
        exit;
    }
    
    // Call Ollama for brand analysis
    $result = callOllama('brand-analysis', [
        'url' => $url,
        'analyze' => [
            'brand_name',
            'logo',
            'industry',
            'target_audience',
            'primary_colors',
            'secondary_colors',
            'fonts',
            'images',
            'products',
            'services'
        ]
    ]);
    
    echo json_encode([
        'success' => true,
        'endpoint' => 'analyze-brand',
        'url' => $url,
        'result' => $result,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

/**
 * Handle prompt generation request
 */
function handleGeneratePrompt($input) {
    $type = $input['type'] ?? 'general';
    $brand = $input['brand'] ?? '';
    $category = $input['category'] ?? 'general';
    $style = $input['style'] ?? 'modern professional';
    
    if (empty($brand)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Brand name is required'
        ]);
        exit;
    }
    
    // Generate prompt structure
    $prompt = generatePromptStructure($type, $brand, $category, $style);
    
    // Call Ollama to enhance prompt
    $enhanced = callOllama('prompt-enhance', [
        'prompt' => $prompt,
        'style' => $style
    ]);
    
    echo json_encode([
        'success' => true,
        'endpoint' => 'generate-prompt',
        'type' => $type,
        'brand' => $brand,
        'prompt' => $prompt,
        'enhanced' => $enhanced,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

/**
 * Handle template generation request
 */
function handleGenerateTemplate($input) {
    $template = $input['template'] ?? 'social-post';
    $brand = $input['brand'] ?? '';
    $platform = $input['platform'] ?? 'instagram';
    
    if (empty($brand)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Brand name is required'
        ]);
        exit;
    }
    
    // Get template specifications
    $specs = getTemplateSpecs($template, $platform);
    
    // Call Ollama for design suggestions
    $suggestions = callOllama('template-suggestions', [
        'template' => $template,
        'brand' => $brand,
        'platform' => $platform,
        'specs' => $specs
    ]);
    
    echo json_encode([
        'success' => true,
        'endpoint' => 'generate-template',
        'template' => $template,
        'brand' => $brand,
        'platform' => $platform,
        'specifications' => $specs,
        'suggestions' => $suggestions,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

/**
 * Handle video generation request
 */
function handleGenerateVideo($input) {
    $type = $input['type'] ?? 'promo';
    $brand = $input['brand'] ?? '';
    $duration = $input['duration'] ?? 30;
    
    if (empty($brand)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Brand name is required'
        ]);
        exit;
    }
    
    // Generate video parameters
    $params = generateVideoParams($type, $brand, $duration);
    
    // Call Ollama for video suggestions
    $suggestions = callOllama('video-suggestions', [
        'type' => $type,
        'brand' => $brand,
        'duration' => $duration,
        'params' => $params
    ]);
    
    echo json_encode([
        'success' => true,
        'endpoint' => 'generate-video',
        'type' => $type,
        'brand' => $brand,
        'duration' => $duration,
        'parameters' => $params,
        'suggestions' => $suggestions,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

/**
 * Call Ollama API
 * Uses N8N webhook as proxy to avoid calling localhost from browser
 */
function callOllama($task, $data) {
    // N8N webhook URL - configure in environment
    $n8nWebhook = getenv('N8N_WEBHOOK_URL') ?: 'http://localhost:5678/webhook/ollama';
    
    $payload = [
        'task' => $task,
        'data' => $data,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    $ch = curl_init($n8nWebhook);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200 && $response) {
        $result = json_decode($response, true);
        return $result;
    }
    
    // Fallback: return mock data if Ollama not available
    return [
        'status' => 'simulated',
        'task' => $task,
        'data' => $data,
        'message' => 'Ollama simulation mode'
    ];
}

/**
 * Generate prompt structure
 */
function generatePromptStructure($type, $brand, $category, $style) {
    $structures = [
        'logo' => "Professional logo design for {$brand}, {$category} industry, {$style}, minimalist, vector style, clean lines, scalable",
        'banner' => "Banner design for {$brand}, target audience, {$style}, dynamic composition, marketing materials",
        'social' => "Social media post for {$brand}, target, {$category} content, eye-catching, {$style}, engagement focused",
        'website' => "Website design for {$brand}, target, section type, modern UI, {$style}, conversion optimized",
        'print' => "Print design for {$brand}, product, material type, print-ready, CMYK, professional quality",
        'video' => "Video content for {$brand}, target, video type, motion graphics, professional editing, AI enhanced"
    ];
    
    return $structures[$type] ?? $structures['social'];
}

/**
 * Get template specifications
 */
function getTemplateSpecs($template, $platform) {
    $specs = [
        'instagram-post' => ['width' => 1080, 'height' => 1080],
        'instagram-story' => ['width' => 1080, 'height' => 1920],
        'facebook-post' => ['width' => 1200, 'height' => 630],
        'facebook-cover' => ['width' => 820, 'height' => 312],
        'youtube-thumbnail' => ['width' => 1280, 'height' => 720],
        'linkedin-post' => ['width' => 1200, 'height' => 627],
        'twitter-post' => ['width' => 1200, 'height' => 675],
        'flyer' => ['width' => 2480, 'height' => 3508],
        'affiche' => ['width' => 3508, 'height' => 4961],
        'carte-visite' => ['width' => 1050, 'height' => 600]
    ];
    
    $key = $platform . '-' . $template;
    return $specs[$key] ?? ['width' => 1080, 'height' => 1080];
}

/**
 * Generate video parameters
 */
function generateVideoParams($type, $brand, $duration) {
    return [
        'type' => $type,
        'brand' => $brand,
        'duration' => $duration,
        'resolution' => '1920x1080',
        'fps' => 30,
        'format' => 'mp4',
        'codec' => 'h264',
        'audio' => true,
        'subtitles' => true
    ];
}