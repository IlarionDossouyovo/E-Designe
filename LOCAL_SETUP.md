# E-Graphisme - Configuration Locale (Windows)

Ce guide explique comment exécuter E-Graphisme en local avec Docker, Ollama et N8N sur Windows.

## Prérequis

- Docker Desktop installé et démarré
- Ollama installé
- N8N installé
- PHP 8.x installé

## Structure des Bases de Données

### Fichiers JSON existants
- `db/database.json` - Base principale (utilisateurs, messages, articles, subscribers)
- `db/contacts.json` - Contacts et leads
- `db/users.json` - Utilisateurs admin
- `db/schema_comments.json` - Schéma des commentaires
- `db/schema_messages.json` - Schéma des messages

---

# Commandes PowerShell (Windows)

## 1. Vérifier Ollama

```powershell
curl http://localhost:11434/api/tags
```

## 2. Lancer le site E-Graphisme

Remplacez `C:\chemin\vers\E-Graphisme` par le chemin réel du dossier!

```powershell
# Aller dans le dossier du projet (remplacez par votre chemin)
cd C:\chemin\vers\E-Graphisme

# Lancer PHP
php -S localhost:8000
```

Exemple si le projet est dans Documents:
```powershell
cd $HOME\Documents\E-Graphisme
php -S localhost:8000
```

## 3. Lancer N8N (si pas déjà démarré)

```powershell
# Via Docker
docker run -d --name n8n -p 5678:5678 -e N8N_BASIC_AUTH_ACTIVE=true -e N8N_EMAIL=admin@e-graphisme.com -e N8N_PASSWORD=egraphisme2026 n8nio/n8n

# OU si déjà créé
docker start n8n
```

## 4. Importer le Workflow N8N

1. Ouvrez http://localhost:5678
2. Connectez-vous avec vos identifiants
3. Allez dans **Settings (engrenage) > Import workflow**
4. Importez le fichier `n8n-workflow-e-graphisme.json`
5. Activez le workflow en cliquant sur le bouton play

---

## Commandes Utiles

```powershell
# Vérifier Ollama
curl http://localhost:11434/api/tags

# Voir les conteneurs Docker actifs
docker ps

# Arrêter le serveur PHP
# Ctrl+C dans le terminal

# Redémarrer N8N
docker restart n8n
```

---

## Environment Variables (optionnel)

Créer un fichier `.env` à la racine du projet:

```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3:latest
N8N_HOST=http://localhost:5678
```

---

## URLs

| Service | URL |
|---------|-----|
| Site Web | http://localhost:8000 |
| N8N | http://localhost:5678 |
| Ollama | http://localhost:11434 |

---

## Modèles Ollama disponibles

```
llama3:latest    - 4.7 GB (principal)
phi3:latest    - 2.2 GB (léger)
codellama:7b   - 3.8 GB (code)
```