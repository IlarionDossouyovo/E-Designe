# 📚 Commandes pour E-Graphisme

Ce fichier contient toutes les commandes nécessaires pour gérer le projet E-Graphisme.

---

## 🚀 Relancer le serveur

### Option 1 : Avec le serveur personnalisé (Recommandé)

```bash
cd /workspace/project/E-Graphisme

# Arrêter le serveur existant
pkill -f "server.py"

# Relancer le serveur
python3 server.py
```

### Option 2 : Avec Python simple

```bash
cd /workspace/project/E-Graphisme
python3 -m http.server 12000 --bind 0.0.0.0
```

### Option 3 : Avec npm

```bash
cd /workspace/project/E-Graphisme
npm run start
```

---

## 🔄 Mettre à jour depuis GitHub

### 1. Récupérer les dernières modifications

```bash
cd /workspace/project/E-Graphisme
git fetch origin
```

### 2. Voir les changements

```bash
git log --oneline -10
```

### 3. Télécharger les mises à jour

```bash
git pull origin main
```

### En cas de conflit

```bash
# Sauvegarder vos modifications locales
git stash

# Télécharger les mises à jour
git pull origin main

# Récupérer vos modifications
git stash pop
```

---

## 📤 Déployer sur GitHub

### 1. Vérifier le statut

```bash
cd /workspace/project/E-Graphisme
git status
```

### 2. Ajouter les fichiers

```bash
git add .
```

### 3. Créer un commit

```bash
git commit -m "Description de vos modifications"
```

### 4. Pousser vers GitHub

```bash
git push origin main
```

---

## 🔧 Commandes utiles

### Voir les processus en cours

```bash
ps aux | grep -E "server.py|http.server"
```

### Voir les ports utilisés

```bash
netstat -tlnp | grep 12000
```

### Tester le serveur

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:12000/
```

### Voir les logs

```bash
cat /workspace/project/E-Graphisme/server.log
```

### Arrêter le serveur

```bash
pkill -f "server.py"
```

---

## 🌐 Accès au site

| Environnement | URL |
|------------|-----|
| Local | http://localhost:12000 |
| Local (IP) | http://127.0.0.1:12000 |
| Externe | https://work-1-cicumjimiwljxgja.prod-runtime.all-hands.dev/ |

---

## 📋 Résumé des commandes

| Action | Commande |
|--------|---------|
| **Lancer le serveur** | `python3 server.py` |
| **Arrêter le serveur** | `pkill -f "server.py"` |
| **Mettre à jour** | `git fetch origin && git pull origin main` |
| **Statut git** | `git status` |
| **Pousser vers GitHub** | `git add . && git commit -m "msg" && git push origin main` |
| **Tester** | `curl http://localhost:12000/` |

---

## ⚠️ Dépannage

### Si "localhost refuse la connexion"

1. Utiliser `127.0.0.1` au lieu de `localhost`
2. Vérifier le pare-feu
3. Relancer le serveur

### Si le port est déjà utilisé

```bash
# Trouver le processus
lsof -i :12000

# Arrêter le processus
kill <PID>
```

### Si erreur de merge

```bash
git merge --abort
git stash
git pull origin main
git stash pop
```