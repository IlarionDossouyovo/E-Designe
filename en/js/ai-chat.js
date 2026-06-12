/**
 * E-Graphisme - AI Chat Module
 * Features: Voice recognition, Text-to-Speech, AI conversation
 */

// AI Configuration
const AI_CONFIG = {
    // Ollama API (local AI)
    ollama: {
        endpoint: 'http://localhost:11434/api/generate',
        model: 'llama3',
        maxTokens: 500
    },
    // OpenAI API (you can replace with your own API key)
    openai: {
        endpoint: 'https://api.openai.com/v1/chat/completions',
        model: 'gpt-3.5-turbo',
        maxTokens: 500
    },
    // Fallback to simulated AI responses
    fallback: true,
    voice: {
        lang: 'fr-FR',
        rate: 1,
        pitch: 1,
        volume: 1
    }
};

// AI Context and knowledge base
const AI_KNOWLEDGE = {
    fr: [
        { pattern: /bonjour|salut|hello/i, response: "Bonjour! Je suis l'assistant IA d'E-Graphisme. Comment puis-je vous aider aujourd'hui?" },
        { pattern: /design|graphisme|logo/i, response: "E-Graphisme propose des services de branding, web design, print design et motion design. Nous créons des identités visuelles uniques pour les marques." },
        { pattern: /prix|tarif|devis/i, response: "Nos tarifs varient selon le projet. Un logo commence à partir de 299€, un site vitrine à partir de 699€. Demandez un devis gratuit!" },
        { pattern: /délai|livraison/i, response: "Nos délais: logo 5-7 jours, site vitrine 2-3 semaines, site e-commerce 4-6 semaines." },
        { pattern: /studio|IA|video/i, response: "E-Studio est notre service de production vidéo par intelligence artificielle. Créez des vidéos professionnelles en quelques minutes!" },
        { pattern: /contact|email|téléphone/i, response: "Contactez-nous: contact@e-graphisme.com ou +33 1 23 45 67 89" },
        { pattern: /merci|thanks/i, response: "De rien! N'hésitez pas si vous avez d'autres questions." }
    ],
    en: [
        { pattern: /hello|hi|hey/i, response: "Hello! I'm E-Graphisme's AI assistant. How can I help you today?" },
        { pattern: /design|graphic|logo/i, response: "E-Graphisme offers branding, web design, print design, and motion design services." },
        { pattern: /price|cost|quote/i, response: "Our prices vary by project. A logo starts at €299, a website at €699. Get a free quote!" },
        { pattern: /delay|delivery/i, response: "Our timelines: logo 5-7 days, showcase site 2-3 weeks, e-commerce 4-6 weeks." },
        { pattern: /studio|AI|video/i, response: "E-Studio is our AI-powered video production service. Create professional videos in minutes!" },
        { pattern: /contact|email|phone/i, response: "Contact us: contact@e-graphisme.com or +33 1 23 45 67 89" },
        { pattern: /thanks|thank you/i, response: "You're welcome! Feel free to ask if you have more questions." }
    ]
};

// Chat state
let chatState = {
    isListening: false,
    isSpeaking: false,
    messages: [],
    voiceEnabled: true,
    apiKey: null
};

/**
 * Initialize AI Chat
 */
function initAIChat() {
    // Load saved API key
    chatState.apiKey = localStorage.getItem('egraphisme-ai-key') || null;
    
    // Check for Speech Recognition support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('Speech Recognition not supported');
        chatState.voiceEnabled = false;
    }
    
    // Initialize chat widget
    createAIChatWidget();
    
    // Add keyboard shortcuts
    initKeyboardShortcuts();
}

/**
 * Create AI Chat Widget
 */
function createAIChatWidget() {
    // Remove existing widget
    const existing = document.getElementById('ai-chat-widget');
    if (existing) existing.remove();
    
    const widget = document.createElement('div');
    widget.id = 'ai-chat-widget';
    widget.className = 'ai-chat-closed';
    
    // Get current language
    const lang = localStorage.getItem('egraphisme-lang') || 'fr';
    const labels = {
        fr: { title: 'Chat IA E-Graphisme', placeholder: 'Tapez votre message...', voice: 'Microphone' },
        en: { title: 'AI Chat E-Graphisme', placeholder: 'Type your message...', voice: 'Microphone' },
        es: { title: 'Chat IA E-Graphisme', placeholder: 'Escribe tu mensaje...', voice: 'Micrófono' },
        de: { title: 'KI-Chat E-Graphisme', placeholder: 'Nachricht eingeben...', voice: 'Mikrofon' },
        pt: { title: 'Chat IA E-Graphisme', placeholder: 'Digite sua mensagem...', voice: 'Microfone' }
    };
    
    const l = labels[lang] || labels.fr;
    
    widget.innerHTML = `
        <button class="ai-chat-toggle" aria-label="Open AI Chat">
            <i class="fas fa-robot"></i>
            <span class="ai-notification"></span>
        </button>
        <div class="ai-chat-window">
            <div class="ai-chat-header">
                <div class="ai-chat-title">
                    <i class="fas fa-robot"></i>
                    <span>${l.title}</span>
                </div>
                <button class="ai-chat-close" aria-label="Close chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="ai-chat-messages">
                <div class="ai-message ai-message-bot">
                    <div class="ai-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="ai-text">
                        <p>${l.title.split(' ').slice(0, -1).join(' ')}! Comment puis-je vous aider?</p>
                        <span class="ai-time">${new Date().toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            </div>
            <div class="ai-chat-input-area">
                <button class="ai-voice-btn" aria-label="Voice input" ${!chatState.voiceEnabled ? 'disabled' : ''}>
                    <i class="fas fa-microphone"></i>
                </button>
                <input type="text" class="ai-chat-input" placeholder="${l.placeholder}" />
                <button class="ai-speak-btn" aria-label="Text-to-speech">
                    <i class="fas fa-volume-up"></i>
                </button>
                <button class="ai-send-btn" aria-label="Send message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <div class="ai-voice-status">
                <span class="ai-voice-indicator"></span>
                <span class="ai-voice-text">Écoute en cours...</span>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .ai-chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: var(--font-poppins);
        }
        .ai-chat-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00D4FF, #7B2FFF);
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
            transition: transform 0.3s, box-shadow 0.3s;
            position: relative;
        }
        .ai-chat-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(0, 212, 255, 0.6);
        }
        .ai-notification {
            position: absolute;
            top: 0;
            right: 0;
            width: 12px;
            height: 12px;
            background: #FF006E;
            border-radius: 50%;
            display: none;
        }
        .ai-chat-closed .ai-chat-window {
            display: none;
        }
        .ai-chat-window {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 380px;
            height: 500px;
            background: var(--white);
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .ai-chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background: linear-gradient(135deg, #00D4FF, #7B2FFF);
            color: white;
        }
        .ai-chat-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
        }
        .ai-chat-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .ai-chat-close:hover {
            opacity: 1;
        }
        .ai-chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .ai-message {
            display: flex;
            gap: 10px;
            max-width: 85%;
        }
        .ai-message-user {
            align-self: flex-end;
            flex-direction: row-reverse;
        }
        .ai-message-bot {
            align-self: flex-start;
        }
        .ai-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00D4FF, #7B2FFF);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 0.9rem;
            flex-shrink: 0;
        }
        .ai-text {
            padding: 12px 16px;
            border-radius: 18px;
            background: var(--light-color);
            font-size: 0.9rem;
            line-height: 1.5;
        }
        .ai-message-user .ai-text {
            background: linear-gradient(135deg, #00D4FF, #7B2FFF);
            color: white;
        }
        .ai-time {
            font-size: 0.7rem;
            opacity: 0.6;
            display: block;
            margin-top: 5px;
        }
        .ai-chat-input-area {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 15px;
            border-top: 1px solid var(--border-color);
        }
        .ai-chat-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 25px;
            font-size: 0.9rem;
            outline: none;
            transition: border-color 0.2s;
        }
        .ai-chat-input:focus {
            border-color: #00D4FF;
        }
        .ai-voice-btn, .ai-speak-btn, .ai-send-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            background: var(--light-color);
            color: var(--dark-color);
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .ai-voice-btn:hover, .ai-speak-btn:hover {
            background: var(--primary-color);
            color: white;
        }
        .ai-voice-btn.listening {
            background: #FF006E;
            color: white;
            animation: pulse 1s infinite;
        }
        .ai-send-btn {
            background: linear-gradient(135deg, #00D4FF, #7B2FFF);
            color: white;
        }
        .ai-send-btn:hover {
            transform: scale(1.1);
        }
        .ai-voice-status {
            display: none;
            align-items: center;
            gap: 8px;
            padding: 10px 15px;
            background: #FF006E;
            color: white;
            font-size: 0.85rem;
        }
        .ai-voice-status.active {
            display: flex;
        }
        .ai-voice-indicator {
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            animation: pulse 1s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        @media (max-width: 480px) {
            .ai-chat-window {
                width: calc(100vw - 40px);
                height: calc(100vh - 150px);
                right: -10px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(widget);
    
    // Event listeners
    setupChatEvents(widget, l);
}

/**
 * Setup chat events
 */
function setupChatEvents(widget, labels) {
    const toggle = widget.querySelector('.ai-chat-toggle');
    const close = widget.querySelector('.ai-chat-close');
    const window = widget.querySelector('.ai-chat-window');
    const input = widget.querySelector('.ai-chat-input');
    const sendBtn = widget.querySelector('.ai-send-btn');
    const voiceBtn = widget.querySelector('.ai-voice-btn');
    const speakBtn = widget.querySelector('.ai-speak-btn');
    const messages = widget.querySelector('.ai-chat-messages');
    const voiceStatus = widget.querySelector('.ai-voice-status');
    
    // Toggle chat
    toggle.addEventListener('click', () => {
        widget.classList.toggle('ai-chat-closed');
        if (!widget.classList.contains('ai-chat-closed')) {
            input.focus();
        }
    });
    
    close.addEventListener('click', () => {
        widget.classList.add('ai-chat-closed');
    });
    
    // Send message
    const sendMessage = () => {
        const text = input.value.trim();
        if (!text) return;
        
        addMessage(text, 'user');
        input.value = '';
        
        // Get AI response
        setTimeout(() => {
            getAIResponse(text).then(response => {
                addMessage(response, 'bot');
            });
        }, 500);
    };
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Voice recognition
    if (chatState.voiceEnabled) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn("Speech recognition not supported in this browser");
            return;
        }
        
        const recognition = new SpeechRecognition();
        
        recognition.lang = getVoiceLang();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            
            input.value = transcript;
            
            if (event.results[0].isFinal) {
                sendMessage();
            }
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            voiceStatus.classList.remove('active');
            voiceBtn.classList.remove('listening');
        };
        
        recognition.onend = () => {
            voiceStatus.classList.remove('active');
            voiceBtn.classList.remove('listening');
            chatState.isListening = false;
        };
        
        voiceBtn.addEventListener('click', () => {
            if (chatState.isListening) {
                recognition.stop();
            } else {
                recognition.start();
                chatState.isListening = true;
                voiceStatus.classList.add('active');
                voiceBtn.classList.add('listening');
            }
        });
    } else {
        voiceBtn.disabled = true;
    }
    
    // Text-to-Speech
    speakBtn.addEventListener('click', () => {
        const lastBotMessage = widget.querySelector('.ai-message-bot:last-child .ai-text p');
        if (lastBotMessage) {
            speakText(lastBotMessage.textContent);
        }
    });
    
    function addMessage(text, sender) {
        const lang = localStorage.getItem('egraphisme-lang') || 'fr';
        const time = new Date().toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${sender}`;
        messageDiv.innerHTML = `
            ${sender === 'bot' ? '<div class="ai-avatar"><i class="fas fa-robot"></i></div>' : ''}
            <div class="ai-text">
                <p>${text}</p>
                <span class="ai-time">${time}</span>
            </div>
        `;
        
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
        
        // Speak bot messages
        if (sender === 'bot' && chatState.isSpeaking) {
            speakText(text);
        }
    }
}

/**
 * Get AI response
 */
async function getAIResponse(userMessage) {
    const lang = localStorage.getItem('egraphisme-lang') || 'fr';
    const knowledge = AI_KNOWLEDGE[lang] || AI_KNOWLEDGE.fr;
    
    // Check knowledge base first
    for (const item of knowledge) {
        if (item.pattern.test(userMessage)) {
            return item.response;
        }
    }
    
    // Try Ollama API (local AI)
    try {
        const response = await fetch(AI_CONFIG.ollama.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: AI_CONFIG.ollama.model,
                prompt: `You are E-Graphisme AI assistant. Help users with design, branding, web design, and company information. Respond in ${lang} language.\n\nUser: ${userMessage}\nAssistant:`,
                max_tokens: AI_CONFIG.ollama.maxTokens,
                stream: false
            })
        });
        
        const data = await response.json();
        return data.response || data.message?.content;
    } catch (ollamaError) {
        console.log('Ollama not available, trying OpenAI...');
    }
    
    // Try OpenAI API if configured
    if (chatState.apiKey) {
        try {
            const response = await fetch(AI_CONFIG.openai.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${chatState.apiKey}`
                },
                body: JSON.stringify({
                    model: AI_CONFIG.openai.model,
                    messages: [
                        { role: 'system', content: 'You are E-Graphisme AI assistant. Help users with design, branding, web design, and company information.' },
                        { role: 'user', content: userMessage }
                    ],
                    max_tokens: AI_CONFIG.openai.maxTokens
                })
            });
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('AI API error:', error);
        }
    }
    
    // Fallback response
    const fallbacks = {
        fr: "Je suis désolé, je n'ai pas bien compris. Pouvez-vous reformuler votre question?",
        en: "I'm sorry, I didn't understand. Can you rephrase your question?",
        es: "Lo siento, no entendí. ¿Puedes reformular tu pregunta?",
        de: "Entschuldigung, ich habe nicht verstanden. Können Sie Ihre Frage umformulieren?",
        pt: "Desculpe, não entendi. Pode reformular a sua pergunta?"
    };
    
    return fallbacks[lang] || fallbacks.fr;
}

/**
 * Text-to-Speech
 */
function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getVoiceLang();
    utterance.rate = AI_CONFIG.voice.rate;
    utterance.pitch = AI_CONFIG.voice.pitch;
    utterance.volume = AI_CONFIG.voice.volume;
    
    utterance.onstart = () => { chatState.isSpeaking = true; };
    utterance.onend = () => { chatState.isSpeaking = false; };
    utterance.onerror = () => { chatState.isSpeaking = false; };
    
    speechSynthesis.speak(utterance);
}

/**
 * Get voice language code
 */
function getVoiceLang() {
    const lang = localStorage.getItem('egraphisme-lang') || 'fr';
    const voiceLangs = {
        fr: 'fr-FR',
        en: 'en-US',
        es: 'es-ES',
        de: 'de-DE',
        pt: 'pt-PT'
    };
    return voiceLangs[lang] || 'fr-FR';
}

/**
 * Initialize keyboard shortcuts
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+Shift+A to toggle AI chat
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            const widget = document.getElementById('ai-chat-widget');
            if (widget) {
                widget.classList.toggle('ai-chat-closed');
            }
        }
    });
}

/**
 * Set API Key
 */
function setAPIKey(key) {
    chatState.apiKey = key;
    localStorage.setItem('egraphisme-ai-key', key);
}

/**
 * Get chat state
 */
function getChatState() {
    return chatState;
}

// Export
window.aiChat = {
    init: initAIChat,
    speak: speakText,
    setAPIKey,
    getState: getChatState
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIChat);
} else {
    initAIChat();
}