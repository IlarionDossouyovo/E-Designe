# E-Graphisme - Complete AI Agents System

## 🚀 Démarrage Rapide

```powershell
git pull origin mai
.\LAUNCH.bat
```

---

## 📊 Dashboard IA

Ouvrez: **http://127.0.0.1:8000/dashboard.html**

---

## 🤖 Agents IA

| Agent | Description | Status |
|-------|-------------|---------|
| **Lead Analyzer** | Analyse les leads | ✅ Actif |
| **Support IA** | Chatbot support | ✅ Actif |
| **Email Automator** | Emails automatisés | ✅ Actif |
| **Analytics** | Rapports quotidiens | ✅ Actif |
| **Design Copilot** | Suggestions design | ⚠️ En pause |
| **Notifications** | Alertes et rappels | ✅ Actif |

---

## 🌐 Services

| Service | URL | Port |
|--------|-----|-----|
| **Web Server** | http://localhost:8000 | 8000 |
| **N8n** | http://localhost:5678 | 5678 |
| **Ollama** | http://localhost:11434 | 11434 |
| **Open WebUI** | http://localhost:3001 | 3001 |

---

## 📁 Fichiers Importants

```
E-Graphisme/
├── dashboard.html      # Dashboard IA
├── SERVER.bat        # Lance serveur web
├── LAUNCH.bat       # Lance tous les services
├── verify.bat      # Vérifie les services
├── workflows/      # Workflows N8n
│   ├── leads.json
│   ├── ai-chat.json
│   ├── daily-report.json
│   └── ai-agent.json
└── php/           # APIs
    ├── ai-api.php
    └── leads-api.php
```

---

## 🔧 Commandes

```powershell
.\SERVER.bat      # Lance le serveur web
.\LAUNCH.bat    # Lance tous les services
.\verify.bat    # Vérifie les services
.\IMPORT-ALL.bat # Importe les workflows N8n
```

---

## 📥 Import N8n

Allez sur http://localhost:5678 puis importez:
- http://127.0.0.1:8000/workflows/leads.json
- http://127.0.0.1:8000/workflows/ai-chat.json
- http://127.0.0.1:8000/workflows/daily-report.json
- http://127.0.0.1:8000/workflows/ai-agent.json