// Translations - Graphisme by ELECTRON
// Multi-language support for all pages

export type Language = 'fr' | 'en' | 'es' | 'de' | 'pt' | 'ar' | 'zh' | 'ja' | 'yo' | 'sw'

export interface Translations {
  [key: string]: string
}

const translations: Record<Language, Translations> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.pricing': 'Tarifs',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.shop': 'Boutique',
    'nav.login': 'Connexion',
    'nav.register': 'Inscription',
    
    // Hero
    'hero.title': 'La créativité rencontre la technologie',
    'hero.subtitle': 'La première agence numérique intelligente fonctionnant avec une équipe d\'Intelligences Artificielles collaboratives pour transformer vos projets en réalité.',
    'hero.cta': 'Découvrez nos services',
    'hero.demo': 'Voir la démo',
    'hero.chat': 'Discuter avec notre IA',
    
    // Stats
    'stats.automation': 'Automatisation',
    'stats.experience': 'Services',
    'stats.availability': 'Disponibilité',
    'stats.ai': 'IA alimentée',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    
    // Common
    'common.submit': 'Soumettre',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.search': 'Rechercher',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    
    // Payment
    'payment.title': 'Moyens de paiement',
    'payment.select': 'Sélectionnez votre pays',
    'payment.method': 'Mode de paiement',
    'payment.card': 'Carte bancaire',
    'payment.mobile': 'Mobile Money',
    'payment.crypto': 'Cryptomonnaie',
    'payment.bank': 'Virement bancaire',
    'payment.wallet': 'Portefeuille électronique',
    'payment.fees': 'Frais',
    'payment.processing': 'Délai',
    'payment.instant': 'Instantané',
    
    // Contact
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.register': 'Inscription',
    'auth.logout': 'Déconnexion',
    'auth.forgot': 'Mot de passe oublié?',
    'auth.remember': 'Se souvenir de moi',
  },
  
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.pricing': 'Pricing',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.shop': 'Shop',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    'hero.title': 'Where creativity meets technology',
    'hero.subtitle': 'The first intelligent digital agency operating with a team of collaborative Artificial Intelligences to transform your projects into reality.',
    'hero.cta': 'Discover our services',
    'hero.demo': 'See demo',
    'hero.chat': 'Chat with our AI',
    
    'stats.automation': 'Automation',
    'stats.experience': 'Services',
    'stats.availability': 'Availability',
    'stats.ai': 'AI Powered',
    
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    'payment.title': 'Payment methods',
    'payment.select': 'Select your country',
    'payment.method': 'Payment method',
    'payment.card': 'Bank card',
    'payment.mobile': 'Mobile Money',
    'payment.crypto': 'Cryptocurrency',
    'payment.bank': 'Bank transfer',
    'payment.wallet': 'E-wallet',
    'payment.fees': 'Fees',
    'payment.processing': 'Processing time',
    'payment.instant': 'Instant',
    
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.send': 'Send',
    
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.forgot': 'Forgot password?',
    'auth.remember': 'Remember me',
  },
  
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.pricing': 'Precios',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.shop': 'Tienda',
    'nav.login': 'Iniciar sesión',
    'nav.register': 'Registrarse',
    
    'hero.title': 'Donde la creatividad se encuentra con la tecnología',
    'hero.subtitle': 'La primera agencia digital inteligente que opera con un equipo de Inteligencias Artificiales colaborativas para transformar sus proyectos en realidad.',
    'hero.cta': 'Descubre nuestros servicios',
    'hero.demo': 'Ver demo',
    'hero.chat': 'Chatea con nuestra IA',
    
    'stats.automation': 'Automatización',
    'stats.experience': 'Servicios',
    'stats.availability': 'Disponibilidad',
    'stats.ai': 'IA',
    
    'payment.title': 'Métodos de pago',
    'payment.select': 'Seleccione su país',
    'payment.method': 'Método de pago',
    'payment.card': 'Tarjeta bancaria',
    'payment.mobile': 'Mobile Money',
    'payment.crypto': 'Criptomoneda',
    'payment.bank': 'Transferencia',
    'payment.wallet': 'Billetera',
    
    'contact.name': 'Nombre',
    'contact.email': 'Correo',
    'contact.phone': 'Teléfono',
    'contact.message': 'Mensaje',
    
    'auth.login': 'Iniciar sesión',
    'auth.register': 'Registrarse',
  },
  
  de: {
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.services': 'Dienstleistungen',
    'nav.portfolio': 'Portfolio',
    'nav.pricing': 'Preise',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    'nav.shop': 'Shop',
    'nav.login': 'Anmelden',
    'nav.register': 'Registrieren',
    
    'hero.title': 'Wo Kreativität auf Technologie trifft',
    'hero.subtitle': 'Die erste intelligente digitale Agentur, die mit einem Team kollaborativer Künstlicher Intelligenzen arbeitet, um Ihre Projekte zu verwirklichen.',
    'hero.cta': 'Entdecken Sie unsere Leistungen',
    'hero.demo': 'Demo ansehen',
    'hero.chat': 'Mit unserer KI chatten',
    
    'stats.automation': 'Automatisierung',
    'stats.experience': 'Dienstleistungen',
    'stats.availability': 'Verfügbarkeit',
    'stats.ai': 'KI-gestützt',
    
    'payment.title': 'Zahlungsmethoden',
    'payment.select': 'Wählen Sie Ihr Land',
    'payment.method': 'Zahlungsmethode',
    'payment.card': 'Karte',
    'payment.mobile': 'Mobile Money',
    'payment.crypto': 'Kryptowährung',
    'payment.bank': 'Überweisung',
    
    'contact.name': 'Name',
    'contact.email': 'E-Mail',
    'contact.phone': 'Telefon',
    'contact.message': 'Nachricht',
    
    'auth.login': 'Anmelden',
    'auth.register': 'Registrieren',
  },
  
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.services': 'Serviços',
    'nav.portfolio': 'Portfólio',
    'nav.pricing': 'Preços',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    'nav.shop': 'Loja',
    'nav.login': 'Entrar',
    'nav.register': 'Cadastrar',
    
    'hero.title': 'Onde a criatividade encontra a tecnologia',
    'hero.subtitle': 'A primeira agência digital inteligente que opera com uma equipe de Inteligências Artificiais colaborativas para transformar seus projetos em realidade.',
    'hero.cta': 'Descubra nossos serviços',
    'hero.demo': 'Ver demo',
    'hero.chat': 'Converse com nossa IA',
    
    'stats.automation': 'Automação',
    'stats.experience': 'Serviços',
    'stats.availability': 'Disponibilidade',
    'stats.ai': 'IA',
    
    'payment.title': 'Métodos de pagamento',
    'payment.select': 'Selecione seu país',
    'payment.method': 'Método de pagamento',
    'payment.card': 'Cartão',
    'payment.mobile': 'Mobile Money',
    'payment.crypto': 'Criptomoeda',
    'payment.bank': 'Transferência',
    
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.phone': 'Telefone',
    'contact.message': 'Mensagem',
    
    'auth.login': 'Entrar',
    'auth.register': 'Cadastrar',
  },
  
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'الخدمات',
    'nav.portfolio': 'معرض الأعمال',
    'nav.pricing': 'الأسعار',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.shop': 'المتجر',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    
    'hero.title': 'حيث يلتقي الإبداع بالتكنولوجيا',
    'hero.subtitle': 'أول وكالة رقمية ذكية تعمل مع فريق من الذكاءات الاصطناعية التعاونية لتحويل مشاريعك إلى واقع.',
    'hero.cta': 'اكتشف خدماتنا',
    'hero.demo': 'شاهد العرض',
    'hero.chat': 'تحدث مع ذكائنا الاصطناعي',
    
    'stats.automation': 'الأتمتة',
    'stats.experience': 'الخدمات',
    'stats.availability': 'التوفر',
    'stats.ai': 'مدعوم بالذكاء الاصطناعي',
    
    'payment.title': 'طرق الدفع',
    'payment.select': 'اختر بلدك',
    'payment.method': 'طريقة الدفع',
    
    'contact.name': 'الاسم',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.message': 'الرسالة',
    
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
  },
  
  zh: {
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.services': '服务',
    'nav.portfolio': '作品集',
    'nav.pricing': '价格',
    'nav.blog': '博客',
    'nav.contact': '联系',
    'nav.shop': '商店',
    'nav.login': '登录',
    'nav.register': '注册',
    
    'hero.title': '创意与科技相遇',
    'hero.subtitle': '首个智能数字机构，配备协作人工智能团队，将您的项目变为现实。',
    'hero.cta': '探索我们的服务',
    'hero.demo': '查看演示',
    'hero.chat': '与AI对话',
    
    'stats.automation': '自动化',
    'stats.experience': '服务',
    'stats.availability': '可用性',
    'stats.ai': 'AI驱动',
    
    'payment.title': '支付方式',
    'payment.select': '选择您的国家',
    'payment.method': '支付方式',
    
    'contact.name': '姓名',
    'contact.email': '邮箱',
    'contact.phone': '电话',
    'contact.message': '留言',
    
    'auth.login': '登录',
    'auth.register': '注册',
  },
  
  ja: {
    'nav.home': 'ホーム',
    'nav.about': '概要',
    'nav.services': 'サービス',
    'nav.portfolio': 'ポートフォリオ',
    'nav.pricing': '料金',
    'nav.blog': 'ブログ',
    'nav.contact': 'お問い合わせ',
    'nav.shop': 'ショップ',
    'nav.login': 'ログイン',
    'nav.register': '登録',
    
    'hero.title': 'クリエイティブとテクノロジーの出会い',
    'hero.subtitle': '協調的なAIチームを擁する最初のインテリジェントなデジタルエージェント。プロジェクトを現実に変えます。',
    'hero.cta': 'サービスを発見',
    'hero.demo': 'デモを見る',
    'hero.chat': 'AIとチャット',
    
    'stats.automation': '自動化',
    'stats.experience': 'サービス',
    'stats.availability': '可用性',
    'stats.ai': 'AI搭載',
    
    'payment.title': '支払い方法',
    'payment.select': '国を選択',
    'payment.method': '支払い方法',
    
    'contact.name': '名前',
    'contact.email': 'メール',
    'contact.phone': '電話',
    'contact.message': 'メッセージ',
    
    'auth.login': 'ログイン',
    'auth.register': '登録',
  },
  
  yo: {
    'nav.home': 'Ìbẹ̀rẹ̀',
    'nav.about': 'Nípa Rẹ̀',
    'nav.services': 'Ìpìlẹ̀',
    'nav.portfolio': 'Àpòlà',
    'nav.pricing': 'Àwọn owó',
    'nav.blog': 'Bùngbé',
    'nav.contact': 'Olúkọ̀',
    'nav.shop': 'Ìtọ̀',
    'nav.login': 'Ìwọlé',
    'nav.register': 'Forukọsilẹ̀',
    
    'hero.title': 'Níbi ti àlàáfià bá tékọ̀nọ́lọ̀jì',
    'hero.subtitle': 'Àgbààgbà ìpìlẹ̀ àlàáfià akọni ti ó ń ṣiṣẹ́ pẹ̀lu ọ̀pọ̀ àwọn Onímọ̀-ìrọ̀lẹ̀ ti wọ́n fẹ́ ṣe àlàáfià fún àwọn iṣẹ́ rẹ.',
    'hero.cta': 'Ríi àwọn iṣẹ́ wa',
    'hero.demo': 'Wò ìdájú',
    'hero.chat': 'Bá AI wa sọ̀rọ̀',
    
    'stats.automation': 'Ìtọ́ju',
    'stats.experience': 'Ìpìlẹ̀',
    'stats.availability': 'Ìfúnni',
    'stats.ai': 'AI',
    
    'payment.title': 'Àwọn ọna san owo',
    'payment.select': 'Yan orílẹ̀-èdè rẹ',
    'payment.method': 'Ọna san owo',
    
    'contact.name': 'Orukọ',
    'contact.email': 'Iméli',
    'contact.phone': 'Nọ́mbà fóònù',
    'contact.message': 'Ọ̀rọ̀',
    
    'auth.login': 'Ìwọlé',
    'auth.register': 'Forukọsilẹ̀',
  },
  
  sw: {
    'nav.home': 'Nyumbani',
    'nav.about': 'Kuhusu',
    'nav.services': 'Huduma',
    'nav.portfolio': 'Toleo',
    'nav.pricing': 'Bei',
    'nav.blog': 'Blogu',
    'nav.contact': 'Wasiliana',
    'nav.shop': 'Duka',
    'nav.login': 'Ingia',
    'nav.register': 'Jisajili',
    
    'hero.title': 'Ucreative unakutana na teknolojia',
    'hero.subtitle': 'Shirika la kwanza la kidigitali linalofanya kazi na timu ya Akili Bandika ya kushirikiana kubadilisha miradi yako kuwa ukweli.',
    'hero.cta': 'Gusa huduma zetu',
    'hero.demo': 'Tazama demo',
    'hero.chat': 'zungumza na AI yetu',
    
    'stats.automation': 'Uendeshaji',
    'stats.experience': 'Huduma',
    'stats.availability': 'Upatikanaji',
    'stats.ai': 'Inaendeshwa na AI',
    
    'payment.title': 'Mbinu za kulipa',
    'payment.select': 'Chagua nchi yako',
    'payment.method': 'Mbinu ya kulipa',
    
    'contact.name': 'Jina',
    'contact.email': 'Barua pepe',
    'contact.phone': 'Simu',
    'contact.message': 'Ujumbe',
    
    'auth.login': 'Ingia',
    'auth.register': 'Jisajili',
  },
}

export const languageNames: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  pt: 'Português',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語',
  yo: 'Yorùbá',
  sw: 'Kiswahili',
}

// Country code to language mapping for auto-detection
export const countryToLanguage: Record<string, Language> = {
  // Europe
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  CA: 'fr',
  LU: 'fr',
  MC: 'fr',
  
  GB: 'en',
  US: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  ZA: 'en',
  
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  PE: 'es',
  
  DE: 'de',
  AT: 'de',
  
  PT: 'pt',
  BR: 'pt',
  
  // Middle East
  SA: 'ar',
  AE: 'ar',
  EG: 'ar',
  MA: 'ar',
  
  // Asia
  CN: 'zh',
  HK: 'zh',
  TW: 'zh',
  JP: 'ja',
  
  // Africa
  BJ: 'yo',
  NG: 'yo',
  TG: 'yo',
  KE: 'sw',
  TZ: 'sw',
  UG: 'sw',
  RW: 'sw',
}

export const languageFlags: Record<Language, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  es: '🇪🇸',
  de: '🇩🇪',
  pt: '🇧🇷',
  ar: '🇸🇦',
  zh: '🇨🇳',
  ja: '🇯🇵',
  yo: '🇧🇯',
  sw: '🇰🇪',
}

export function getTranslation(lang: Language, key: string): string {
  return translations[lang]?.[key] || translations['en'][key] || key
}

export function getAllTranslations(lang: Language): Translations {
  return translations[lang] || translations['en']
}

export default translations
