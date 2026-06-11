# E-Graphisme N8n Workflows

## Workflows disponibles

### 1. leads.json - Gestion des leads
- Réception formulaire contact
- Sauvegarde en base de données
- Notification email admin

**Webhook:** `POST /contact`

### 2. ai-chat.json - Chat IA
- Réception messages chat
- Réponse via Ollama (llama3)
- Retourne la réponse

**Webhook:** `POST /ai-chat`

### 3. daily-report.json - Rapport quotidien
- Déclencheur quotidien (9h00)
- Lit les contacts de la veille
- Envoie rapport par email

**Cron:** `0 9 * * *`

---

## Import dans N8n

```bash
# URL pour importer
http://127.0.0.1:8000/workflows/leads.json
http://127.0.0.1:8000/workflows/ai-chat.json
http://127.0.0.1:8000/workflows/daily-report.json
```

---

## Configuration

1. Allez sur http://localhost:5678
2. Importez chaque fichier
3. Configurez les identifiants Gmail dans chaque workflow
4. Activez les workflows