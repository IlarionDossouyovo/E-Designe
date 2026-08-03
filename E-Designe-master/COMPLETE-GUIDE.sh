#!/bin/bash

# =====================================================
# 🎯 E-DÉSIGNE - GUIDE COMPLET DE MISE À JOUR
# Depuis OneDrive vers Docker + GitHub
# =====================================================

echo "=============================================="
echo "🎯 E-DÉSIGNE - GUIDE COMPLET"
echo "=============================================="

# =====================================================
# PARTIE 1: RÉCUPÉRATION DEPUIS ONEDRIVE
# =====================================================

echo -e "\n📂 PARTIE 1: RÉCUPÉRATION DEPUIS ONEDRIVE\n"

echo "Si votre projet est sur OneDrive:"
echo ""
echo "Option A - Via Navigateur:"
echo "  1. Allez sur onedrive.live.com"
echo "  2. Téléchargez le dossier E-Designe"
echo "  3. Extrayez le fichier ZIP"
echo "  4. Placez le contenu dans /workspace/project/E-Designe/"
echo ""
echo "Option B - Via OneDrive Client (Linux):"
echo "  # Installer OneDrive client"
echo "  sudo apt install onedrive"
echo ""
echo "  # Configurer"
echo "  onedrive --synchronize"
echo ""
echo "Option C - Via RClone:"
echo "  # Installer rclone"
echo "  curl https://rclone.org/install.sh | sudo bash"
echo ""
echo "  # Configurer OneDrive"
echo "  rclone config"
echo ""
echo "  # Synchroniser"
echo "  rclone copy onedrive:/E-Designe /workspace/project/E-Designe"

# =====================================================
# PARTIE 2: CLONER DEPUIS GITHUB
# =====================================================

echo -e "\n📥 PARTIE 2: CLONER DEPUIS GITHUB\n"

echo "# Cloner le dépôt"
echo "git clone https://github.com/IlarionDossouyovo/E-Designe.git"
echo ""
echo "# OU si vous avez un token:"
echo "git clone https://${GITHUB_TOKEN}@github.com/IlarionDossouyovo/E-Designe.git"

# =====================================================
# PARTIE 3: CONFIGURATION COMPLETE
# =====================================================

echo -e "\n⚙️ PARTIE 3: CONFIGURATION COMPLETE\n"

echo "# 1. Entrer dans le dossier"
echo "cd /workspace/project/E-Designe/E-Designe-master"
echo ""
echo "# 2. Installer les dépendances principales"
echo "npm install"
echo ""
echo "# 3. Installer les dépendances frontend"
echo "cd frontend && npm install"
echo ""
echo "# 4. Retourner à la racine"
echo "cd .."

# =====================================================
# PARTIE 4: LANCER DOCKER
# =====================================================

echo -e "\n🐳 PARTIE 4: LANCER DOCKER\n"

echo "# 1. Démarrer Docker"
echo "sudo dockerd > /tmp/docker.log 2>&1 &"
echo ""
echo "# 2. Attendre que Docker soit prêt"
echo "sleep 5"
echo ""
echo "# 3. Lancer les conteneurs"
echo "cd /workspace/project/E-Designe/E-Designe-master"
echo "sudo docker compose up -d"
echo ""
echo "# 4. Vérifier les conteneurs"
echo "sudo docker ps"
echo ""
echo "# 5. Vérifier les logs"
echo "sudo docker logs edesigne-db"
echo "sudo docker logs edesigne-api"

# =====================================================
# PARTIE 5: CONFIGURER LA BASE DE DONNÉES
# =====================================================

echo -e "\n🗄️ PARTIE 5: CONFIGURER LA BASE DE DONNÉES\n"

echo "# Se connecter à PostgreSQL dans Docker"
echo "sudo docker exec -it edesigne-db psql -U edesigne -d edesigne_db"
echo ""
echo "# Commandes SQL utiles:"
echo "-- Voir les tables"
echo "\dt"
echo ""
echo "-- Voir les produits"
echo "SELECT * FROM products;"
echo ""
echo "-- Voir les comptes sociaux"
echo "SELECT * FROM social_accounts;"
echo ""
echo "-- Voir les marketplaces"
echo "SELECT * FROM marketplace_connections;"
echo ""
echo "-- Voir les automatisations"
echo "SELECT * FROM marketing_automations;"

# =====================================================
# PARTIE 6: DÉMARRER L'APPLICATION
# =====================================================

echo -e "\n🚀 PARTIE 6: DÉMARRER L'APPLICATION\n"

echo "# Option A - Frontend seulement"
echo "cd frontend && npm run dev"
echo ""
echo "# Option B - Backend + Frontend (2 terminaux)"
echo ""
echo "# Terminal 1 - Backend API:"
echo "cd api && node index.js"
echo ""
echo "# Terminal 2 - Frontend:"
echo "cd frontend && npm run dev"

# =====================================================
# PARTIE 7: DÉPLOYER VERS VERCEL
# =====================================================

echo -e "\n☁️ PARTIE 7: DÉPLOYER VERS VERCEL\n"

echo "# 1. Installer Vercel CLI"
echo "npm install -g vercel"
echo ""
echo "# 2. Se connecter"
echo "vercel login"
echo ""
echo "# 3. Déployer"
echo "vercel --prod"
echo ""
echo "# OU via GitHub (automatique)"
echo "# Pousser vers GitHub et Vercel déploie automatiquement"
echo "git add ."
echo 'git commit -m "Mise à jour"'
echo "git push origin master"

# =====================================================
# PARTIE 8: COMMANDES QUICK-START
# =====================================================

echo -e "\n⚡ COMMANDES QUICK-START\n"

echo "Voici toutes les commandes en une seule fois:"
echo ""
cat << 'QUICKSTART'

# =====================================================
# 🚀 QUICK START - TOUTES LES COMMANDES
# =====================================================

# 1. CLONER LE PROJET
git clone https://github.com/IlarionDossouyovo/E-Designe.git /workspace/E-Designe
cd /workspace/E-Designe/E-Designe-master

# 2. INSTALLER LES DÉPENDANCES
npm install
cd frontend && npm install
cd ..

# 3. LANCER DOCKER
sudo dockerd > /tmp/docker.log 2>&1 &
sleep 5
sudo docker compose up -d

# 4. VÉRIFIER QUE TOUT FONCTIONNE
sudo docker ps                           # Voir les conteneurs
curl http://localhost:3000/api/health   # Tester l'API
curl http://localhost:3000/api/products  # Voir les produits

# 5. DÉMARRER LE FRONTEND (dans un autre terminal)
cd frontend && npm run dev

# 6. ACCÉDER À L'APPLICATION
echo "Frontend: http://localhost:5173"
echo "API: http://localhost:3000"
echo "PgAdmin: http://localhost:5050"

QUICKSTART

# =====================================================
# PARTIE 9: ACCÈS AUX SERVICES
# =====================================================

echo -e "\n🌐 PARTIE 9: ACCÈS AUX SERVICES\n"

echo "| Service       | URL                  | Identifiants |"
echo "|---------------|----------------------|---------------|"
echo "| Frontend      | http://localhost:5173 | -            |"
echo "| API           | http://localhost:3000  | -            |"
echo "| PgAdmin       | http://localhost:5050 | admin@e-designe.com / admin123 |"
echo "| PostgreSQL    | localhost:5432         | edesigne / edesigne_password_2024 |"
echo "| Redis         | localhost:6379         | -            |"

# =====================================================
# PARTIE 10: TROUBLESHOOTING
# =====================================================

echo -e "\n🔧 PARTIE 10: TROUBLESHOOTING\n"

echo "# Si Docker ne fonctionne pas:"
echo "sudo systemctl start docker"
echo ""
echo "# Si les conteneurs ne démarrent pas:"
echo "sudo docker compose down"
echo "sudo docker compose up -d"
echo ""
echo "# Voir les logs d'un conteneur:"
echo "sudo docker logs edesigne-db"
echo "sudo docker logs edesigne-api"
echo ""
echo "# Redémarrer un conteneur:"
echo "sudo docker restart edesigne-api"
echo ""
echo "# Supprimer et recréer:"
echo "sudo docker compose down -v"
echo "sudo docker compose up -d"

# =====================================================
# PARTIE 11: MISE À JOUR DEPUIS GITHUB
# =====================================================

echo -e "\n🔄 PARTIE 11: MISE À JOUR DEPUIS GITHUB\n"

echo "# Si vous avez déjà le projet et voulez mettre à jour:"
echo "cd /workspace/project/E-Designe/E-Designe-master"
echo "git pull origin master"
echo ""
echo "# Après un pull, reconstruire si nécessaire:"
echo "cd frontend && npm install"
echo "cd .."
echo "sudo docker compose down"
echo "sudo docker compose up -d"

echo -e "\n=============================================="
echo "✅ GUIDE COMPLET TERMINÉ!"
echo "=============================================="
