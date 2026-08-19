# Guide de Configuration - Graphisme by ELECTRON

## Étapes pour finaliser votre programme

### 1. Configuration des Variables d'Environnement

Copiez le fichier `.env.example` vers `.env.local` et ajoutez vos clés API :

```bash
cp .env.example .env.local
```

### 2. Clés API à Configurer

#### Services IA (Au moins un requis)
- **Ollama** (déjà configuré pour usage local): `OLLAMA_API_URL=http://localhost:11434`
- **OpenAI**: Obtenez votre clé sur https://platform.openai.com/api-keys
- **Anthropic (Claude)**: Obtenez votre clé sur https://console.anthropic.com
- **Google AI (Gemini)** ⭐ Recommandé: Obtenez votre clé sur https://aistudio.google.com/app/apikey

#### Configuration Google AI (Gemini)

Google AI est le provider IA recommandé pour des réponses plus rapides et plus performantes. Il offre:
- Modèles ultra-rapides (Gemini 2.0 Flash)
- Contexte de 1M+ tokens
- Raisonnement professionnel amélioré
- Support multilingue excellent

**Variables d'environnement:**
```bash
# Dans .env.local ou Admin > Paramètres API
GOOGLE_AI_API_KEY=your-google-ai-api-key
```

**Dans les paramètres admin:**
1. Allez dans `/admin/settings`
2. Onglet "AI Services"
3. Entrez votre clé API Google AI
4. Configurez le provider IA (Auto/Google/Ollama)
5. Sélectionnez le modèle par défaut (gemini-1.5-flash recommandé)

#### Réseaux Sociaux
| Plateforme | Où obtenir les clés | URL |
|------------|---------------------|-----|
| Facebook | Meta for Developers | https://developers.facebook.com |
| Instagram | Meta for Developers | https://developers.facebook.com |
| TikTok | TikTok for Developers | https://developers.tiktok.com |
| YouTube | Google Cloud Console | https://console.cloud.google.com |
| LinkedIn | LinkedIn Developers | https://www.linkedin.com/developers |
| Twitter/X | Twitter Developers | https://developer.twitter.com |

#### Messagerie
| Service | Où obtenir les clés |
|---------|---------------------|
| WhatsApp Business | https://developers.facebook.com/docs/whatsapp |
| Telegram | @BotFather sur Telegram |

#### Services Email
- **Resend** (recommandé): https://resend.com
- **SendGrid**: https://sendgrid.com
- **Mailgun**: https://mailgun.com

#### Paiements
- **Stripe**: https://dashboard.stripe.com
- **PayPal**: https://developer.paypal.com

### 3. Accès à l'Interface d'Admin

1. Ouvrez `http://localhost:3000/admin`
2. Cliquez sur "Paramètres API" dans le menu latéral
3. Entrez vos clés API dans les champs correspondants
4. Cliquez sur "Sauvegarder"

### 4. Configuration des Agents IA

Dans la page des paramètres API, onglet "AI Agents", vous pouvez :
- Activer/désactiver chaque agent
- Configurer les réponses automatiques pour certains agents

### 5. Automatisation des Réseaux Sociaux

L'API `/api/social/post` permet de poster automatiquement :

```javascript
// Exemple de requête
fetch('/api/social/post', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    platform: 'facebook',
    content: 'Votre message ici',
    media: { url: 'https://...' }
  })
})
```

### 6. Lancer l'Application

```bash
# Installation des dépendances
npm install

# Lancer Ollama (optionnel - le mode démo fonctionne sans)
ollama serve
ollama pull llama3.2

# Lancer l'application
npm run dev
```

L'application sera disponible sur http://localhost:3002

### 7. Comptes par Défaut

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Administrateur | admin@graphisme.electron | admin123 |
| Client | client@exemple.com | client123 |

### 8. URLs d'Accès

| Service | URL |
|---------|-----|
| Application | http://localhost:3002 |
| Admin | http://localhost:3002/admin |
| Config API | http://localhost:3002/admin/settings |
| Équipe IA | http://localhost:3002/ai-team |

### Dépannage

#### Ollama ne fonctionne pas
```bash
# Vérifier si Ollama est en cours d'exécution
ollama list

# Installer un modèle
ollama pull llama3.2
```

#### Les clés API ne fonctionnent pas
1. Vérifiez que les clés sont correctement copiées
2. Assurez-vous qu'il n'y a pas d'espaces ou de caractères supplémentaires
3. Certaines clés expirent - vérifiez la date d'expiration

#### Erreurs de connexion
- Vérifiez votre connexion Internet
- Certains services peuvent être bloqués dans votre région
- Vérifiez les paramètres du pare-feu

---

**Support**: electronbusiness07@gmail.com
