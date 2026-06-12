/**
 * E-Graphisme - Internationalization (i18n) Module
 * Supports: French, English, Spanish, German, Portuguese
 */

// Language configurations
const supportedLanguages = {
    fr: { name: 'Français', flag: '🇫🇷', code: 'fr-FR' },
    en: { name: 'English', flag: '🇬🇧', code: 'en-US' },
    es: { name: 'Español', flag: '🇪🇸', code: 'es-ES' },
    de: { name: 'Deutsch', flag: '🇩🇪', code: 'de-DE' },
    pt: { name: 'Português', flag: '🇵🇹', code: 'pt-PT' }
};

// Translation dictionaries
const translations = {
    // French (default)
    fr: {
        nav: {
            home: 'Accueil',
            services: 'Services',
            portfolio: 'Portfolio',
            about: 'À propos',
            blog: 'Blog',
            contact: 'Contact',
            studio: 'E-Studio',
            faq: 'FAQ'
        },
        hero: {
            title: 'Design & Innovation',
            subtitle: 'Nous créons des expériences visuelles uniques pour votre marque',
            cta: 'Démarrer un projet',
            cta2: 'Voir le portfolio'
        },
        services: {
            title: 'Nos Services',
            subtitle: 'Des solutions créatives pour votre succès',
            branding: 'Branding',
            brandingDesc: 'Identité visuelle forte et mémorable',
            web: 'Web Design',
            webDesc: 'Sites web modernes et responsives',
            print: 'Print Design',
            printDesc: 'Supports印刷 tous',
            motion: 'Motion Design',
            motionDesc: 'Animations et vidéos',
            studio: 'E-Studio IA',
            studioDesc: 'Production vidéo par intelligence artificielle',
            discover: 'Découvrir'
        },
        footer: {
            quickLinks: 'Liens Rapides',
            contact: 'Contact',
            legal: 'Mentions Légales',
            privacy: 'Confidentialité',
            copyright: 'Tous droits réservés'
        },
        contact: {
            title: 'Contactez-nous',
            name: 'Votre nom',
            email: 'Votre email',
            message: 'Votre message',
            send: 'Envoyer',
            address: '123 Rue de la Créativité, Paris',
            phone: '+229 01 977 003 47'
        },
        faq: {
            title: 'Questions Fréquentes',
            delivery: 'Quels sont vos délais de livraison ?',
            deliveryAns: 'Nos délais varient selon la complexité du projet.',
            revisions: 'Proposez-vous des revisions ?',
            revisionsAns: 'Oui, chaque projet inclut 2 à 3 rounds de revisions.',
            files: 'Quels fichiers livrez-vous ?',
            filesAns: 'Nous livrons tous les fichiers sources et finals.'
        },
        chat: {
            title: 'Chat IA',
            placeholder: 'Tapez votre message...',
            send: 'Envoyer',
            voice: 'Reconnaissance vocale',
            listening: 'Écoute en cours...',
            error: 'Erreur de reconnaissance vocale'
        }
    },
    
    // English
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            portfolio: 'Portfolio',
            about: 'About',
            blog: 'Blog',
            contact: 'Contact',
            studio: 'E-Studio',
            faq: 'FAQ'
        },
        hero: {
            title: 'Design & Innovation',
            subtitle: 'We create unique visual experiences for your brand',
            cta: 'Start a project',
            cta2: 'View portfolio'
        },
        services: {
            title: 'Our Services',
            subtitle: 'Creative solutions for your success',
            branding: 'Branding',
            brandingDesc: 'Strong and memorable visual identity',
            web: 'Web Design',
            webDesc: 'Modern and responsive websites',
            print: 'Print Design',
            printDesc: 'Print on all supports',
            motion: 'Motion Design',
            motionDesc: 'Animations and videos',
            studio: 'E-Studio AI',
            studioDesc: 'Video production by artificial intelligence',
            discover: 'Discover'
        },
        footer: {
            quickLinks: 'Quick Links',
            contact: 'Contact',
            legal: 'Legal',
            privacy: 'Privacy Policy',
            copyright: 'All rights reserved'
        },
        contact: {
            title: 'Contact Us',
            name: 'Your name',
            email: 'Your email',
            message: 'Your message',
            send: 'Send',
            address: '123 Creativity Street, Paris',
            phone: '+229 01 977 003 47'
        },
        faq: {
            title: 'Frequently Asked Questions',
            delivery: 'What are your delivery times?',
            deliveryAns: 'Our delivery times vary according to project complexity.',
            revisions: 'Do you offer revisions?',
            revisionsAns: 'Yes, each project includes 2 to 3 revision rounds.',
            files: 'What files do you deliver?',
            filesAns: 'We deliver all source and final files.'
        },
        chat: {
            title: 'AI Chat',
            placeholder: 'Type your message...',
            send: 'Send',
            voice: 'Voice recognition',
            listening: 'Listening...',
            error: 'Voice recognition error'
        }
    },
    
    // Spanish
    es: {
        nav: {
            home: 'Inicio',
            services: 'Servicios',
            portfolio: 'Portafolio',
            about: 'Nosotros',
            blog: 'Blog',
            contact: 'Contacto',
            studio: 'E-Studio',
            faq: 'FAQ'
        },
        hero: {
            title: 'Diseño e Innovación',
            subtitle: 'Creamos experiencias visuales únicas para tu marca',
            cta: 'Iniciar proyecto',
            cta2: 'Ver portafolio'
        },
        services: {
            title: 'Nuestros Servicios',
            subtitle: 'Soluciones creativas para tu éxito',
            branding: 'Branding',
            brandingDesc: 'Identidad visual fuerte y memorable',
            web: 'Diseño Web',
            webDesc: 'Sitios web modernos y responsivos',
            print: 'Diseño Print',
            printDesc: 'Impresión en todos los soportes',
            motion: 'Motion Design',
            motionDesc: 'Animaciones y videos',
            studio: 'E-Studio IA',
            studioDesc: 'Producción de video por inteligencia artificial',
            discover: 'Descubrir'
        },
        footer: {
            quickLinks: 'Enlaces Rápidos',
            contact: 'Contacto',
            legal: 'Aviso Legal',
            privacy: 'Privacidad',
            copyright: 'Todos los derechos reservados'
        },
        contact: {
            title: 'Contáctanos',
            name: 'Tu nombre',
            email: 'Tu email',
            message: 'Tu mensaje',
            send: 'Enviar',
            address: '123 Calle Creatividad, París',
            phone: '+229 01 977 003 47'
        },
        faq: {
            title: 'Preguntas Frecuentes',
            delivery: '¿Cuáles son sus tiempos de entrega?',
            deliveryAns: 'Nuestros tiempos de entrega varían según la complejidad.',
            revisions: '¿Ofrecen revisiones?',
            revisionsAns: 'Sí, cada proyecto incluye 2 a 3 rondas de revisiones.',
            files: '¿Qué archivos entregan?',
            filesAns: 'Entregamos todos los archivos fuente y finales.'
        },
        chat: {
            title: 'Chat IA',
            placeholder: 'Escribe tu mensaje...',
            send: 'Enviar',
            voice: 'Reconocimiento de voz',
            listening: 'Escuchando...',
            error: 'Error de reconocimiento de voz'
        }
    },
    
    // German
    de: {
        nav: {
            home: 'Startseite',
            services: 'Leistungen',
            portfolio: 'Portfolio',
            about: 'Über uns',
            blog: 'Blog',
            contact: 'Kontakt',
            studio: 'E-Studio',
            faq: 'FAQ'
        },
        hero: {
            title: 'Design & Innovation',
            subtitle: 'Wir schaffen einzigartige visuelle Erlebnisse für Ihre Marke',
            cta: 'Projekt starten',
            cta2: 'Portfolio ansehen'
        },
        services: {
            title: 'Unsere Leistungen',
            subtitle: 'Kreative Lösungen für Ihren Erfolg',
            branding: 'Branding',
            brandingDesc: 'Starke und einprägsame visuelle Identität',
            web: 'Web Design',
            webDesc: 'Moderne und responsive Websites',
            print: 'Print Design',
            printDesc: 'Druck auf allen Trägern',
            motion: 'Motion Design',
            motionDesc: 'Animationen und Videos',
            studio: 'E-Studio KI',
            studioDesc: 'Videoproduktion durch Künstliche Intelligenz',
            discover: 'Entdecken'
        },
        footer: {
            quickLinks: 'Schnelllinks',
            contact: 'Kontakt',
            legal: 'Impressum',
            privacy: 'Datenschutz',
            copyright: 'Alle Rechte vorbehalten'
        },
        contact: {
            title: 'Kontaktieren Sie uns',
            name: 'Ihr Name',
            email: 'Ihre E-Mail',
            message: 'Ihre Nachricht',
            send: 'Senden',
            address: '123 Kreativstraße, Paris',
            phone: '+229 01 977 003 47'
        },
        faq: {
            title: 'Häufig Gestellte Fragen',
            delivery: 'Was sind Ihre Lieferzeiten?',
            deliveryAns: 'Unsere Lieferzeiten variieren je nach Komplexität.',
            revisions: 'Bieten Sie Revisionen an?',
            revisionsAns: 'Ja, jedes Projekt enthält 2 bis 3 Revisionsrunden.',
            files: 'Welche Dateien liefern Sie?',
            filesAns: 'Wir liefern alle Quell- und Enddateien.'
        },
        chat: {
            title: 'KI-Chat',
            placeholder: 'Nachricht eingeben...',
            send: 'Senden',
            voice: 'Spracherkennung',
            listening: 'Hört zu...',
            error: 'Spracherkennungsfehler'
        }
    },
    
    // Portuguese
    pt: {
        nav: {
            home: 'Início',
            services: 'Serviços',
            portfolio: 'Portfólio',
            about: 'Sobre',
            blog: 'Blog',
            contact: 'Contacto',
            studio: 'E-Studio',
            faq: 'FAQ'
        },
        hero: {
            title: 'Design & Inovação',
            subtitle: 'Criamos experiências visuais únicas para a sua marca',
            cta: 'Iniciar projeto',
            cta2: 'Ver portfólio'
        },
        services: {
            title: 'Os Nossos Serviços',
            subtitle: 'Soluções criativas para o seu sucesso',
            branding: 'Branding',
            brandingDesc: 'Identidade visual forte e memorável',
            web: 'Web Design',
            webDesc: 'Sites modernos e responsivos',
            print: 'Design Print',
            printDesc: 'Impressão em todos os suportes',
            motion: 'Motion Design',
            motionDesc: 'Animações e vídeos',
            studio: 'E-Studio IA',
            studioDesc: 'Produção de vídeo por inteligência artificial',
            discover: 'Descobrir'
        },
        footer: {
            quickLinks: 'Links Rápidos',
            contact: 'Contacto',
            legal: 'Legal',
            privacy: 'Privacidade',
            copyright: 'Todos os direitos reservados'
        },
        contact: {
            title: 'Contacte-nos',
            name: 'O seu nome',
            email: 'O seu email',
            message: 'A sua mensagem',
            send: 'Enviar',
            address: '123 Rua Criatividade, Paris',
            phone: '+229 01 977 003 47'
        },
        faq: {
            title: 'Perguntas Frequentes',
            delivery: 'Quais são os seus prazos de entrega?',
            deliveryAns: 'Os nossos prazos variam conforme a complexidade.',
            revisions: 'Oferecem revisões?',
            revisionsAns: 'Sim, cada projeto inclui 2 a 3 rodadas de revisões.',
            files: 'Que arquivos entregam?',
            filesAns: 'Entregamos todos os arquivos fonte e finais.'
        },
        chat: {
            title: 'Chat IA',
            placeholder: 'Digite a sua mensagem...',
            send: 'Enviar',
            voice: 'Reconhecimento de voz',
            listening: 'A ouvir...',
            error: 'Erro de reconhecimento de voz'
        }
    }
};

// Current language (default: French)
let currentLang = 'fr';

/**
 * Initialize i18n module
 */
function initI18n() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('egraphisme-lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            currentLang = browserLang;
        }
    }
    
    // Apply translations
    applyTranslations();
    
    // Create language selector
    createLanguageSelector();
}

/**
 * Get translation for a key
 */
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            // Fallback to French
            value = translations['fr'];
            for (const k2 of keys) {
                if (value && value[k2]) {
                    value = value[k2];
                } else {
                    return key;
                }
            }
            return value;
        }
    }
    
    return value;
}

/**
 * Apply translations to the page
 */
function applyTranslations() {
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = t(key);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update document title
    if (translations[currentLang]?.nav) {
        document.title = `E-Graphisme - ${translations[currentLang].nav.home}`;
    }
}

/**
 * Change language
 */
function changeLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('egraphisme-lang', lang);
        applyTranslations();
        
        // Dispatch event for other modules
        window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang } }));
    }
}

/**
 * Create language selector UI
 */
function createLanguageSelector() {
    // Remove existing selector
    const existing = document.querySelector('.lang-selector');
    if (existing) existing.remove();
    
    const selector = document.createElement('div');
    selector.className = 'lang-selector';
    selector.innerHTML = `
        <button class="lang-btn" aria-label="Select language">
            <span class="lang-flag">${supportedLanguages[currentLang].flag}</span>
            <span class="lang-code">${currentLang.toUpperCase()}</span>
            <i class="fas fa-chevron-down"></i>
        </button>
        <div class="lang-dropdown">
            ${Object.entries(supportedLanguages).map(([code, lang]) => `
                <button class="lang-option ${code === currentLang ? 'active' : ''}" data-lang="${code}">
                    <span class="lang-flag">${lang.flag}</span>
                    <span class="lang-name">${lang.name}</span>
                </button>
            `).join('')}
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .lang-selector {
            position: relative;
            display: inline-block;
        }
        .lang-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: var(--light-color);
            border: 1px solid var(--border-color);
            border-radius: 25px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: var(--transition);
        }
        .lang-btn:hover {
            background: var(--white);
            border-color: var(--primary-color);
        }
        .lang-flag {
            font-size: 1.2rem;
        }
        .lang-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 8px;
            background: var(--white);
            border-radius: 12px;
            box-shadow: var(--shadow);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: var(--transition);
            z-index: 1000;
            min-width: 160px;
            overflow: hidden;
        }
        .lang-selector.open .lang-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .lang-option {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 12px 16px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            text-align: left;
            transition: background 0.2s;
        }
        .lang-option:hover {
            background: var(--light-color);
        }
        .lang-option.active {
            background: var(--light-color);
            color: var(--primary-color);
            font-weight: 600;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(selector);
    
    // Event listeners
    selector.querySelector('.lang-btn').addEventListener('click', () => {
        selector.classList.toggle('open');
    });
    
    selector.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
            selector.classList.remove('open');
            createLanguageSelector();
        });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!selector.contains(e.target)) {
            selector.classList.remove('open');
        }
    });
}

/**
 * Get current language
 */
function getCurrentLang() {
    return currentLang;
}

/**
 * Get all supported languages
 */
function getSupportedLanguages() {
    return supportedLanguages;
}

// Export for use in other modules
window.i18n = {
    t,
    changeLanguage,
    getCurrentLang,
    getSupportedLanguages,
    initI18n
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}