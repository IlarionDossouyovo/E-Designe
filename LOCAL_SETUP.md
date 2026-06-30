# E-Graphisme - Configuration Locale (Windows)


## Prérequis

- Docker Desktop installé et démarré
- Ollama installé
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


```powershell
# Via Docker

# OU si déjà créé
```


2. Connectez-vous avec vos identifiants
3. Allez dans **Settings (engrenage) > Import workflow**
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

```

---

## Environment Variables (optionnel)

Créer un fichier `.env` à la racine du projet:

```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3:latest
```

---

## URLs

| Service | URL |
|---------|-----|
| Site Web | http://localhost:8000 |
| Ollama | http://localhost:11434 |

---

## Modèles Ollama disponibles

```
llama3:latest    - 4.7 GB (principal)
phi3:latest    - 2.2 GB (léger)
codellama:7b   - 3.8 GB (code)
```