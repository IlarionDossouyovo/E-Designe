#!/bin/bash

# =====================================================
# 🎯 E-DÉSIGNE - COMMANDES EXPRESS
# Clone + Update + Lance tout
# =====================================================

echo "🚀 Lancement de E-Designe..."

# =====================================================
# 1. CLONER DEPUIS GITHUB
# =====================================================
echo "📥 Étape 1: Clonage du dépôt GitHub..."

if [ -d "/workspace/E-Designe" ]; then
    echo "⚠️ Le dossier existe déjà, mise à jour..."
    cd /workspace/E-Designe/E-Designe-master
    git pull origin master
else
    git clone https://github.com/IlarionDossouyovo/E-Designe.git /workspace/E-Designe
    cd /workspace/E-Designe/E-Designe-master
fi

# =====================================================
# 2. INSTALLER LES DÉPENDANCES
# =====================================================
echo "📦 Étape 2: Installation des dépendances..."

# Dépendances principales
npm install

# Dépendances frontend
cd frontend
npm install
cd ..

# =====================================================
# 3. LANCER DOCKER
# =====================================================
echo "🐳 Étape 3: Lancement de Docker..."

# Démarrer Docker si pas déjà lancé
if ! pgrep -x "dockerd" > /dev/null; then
    echo "   → Démarrage du démon Docker..."
    sudo dockerd > /tmp/docker.log 2>&1 &
    sleep 5
fi

# Lancer les conteneurs
sudo docker compose up -d

# =====================================================
# 4. VÉRIFICATION
# =====================================================
echo "✅ Étape 4: Vérification..."

echo ""
echo "   📊 Conteneurs actifs:"
sudo docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "   🌐 API Health:"
curl -s http://localhost:3000/api/health 2>/dev/null || echo "   En cours de démarrage..."

echo ""
echo "   🛒 Produits disponibles:"
curl -s http://localhost:3000/api/products 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'   {len(d)} produits trouvés')" 2>/dev/null || echo "   En cours de démarrage..."

# =====================================================
# 5. INFORMATIONS
# =====================================================
echo ""
echo "=============================================="
echo "🎉 E-DÉSIGNE EST PRÊT!"
echo "=============================================="
echo ""
echo "📍 ACCÈS:"
echo "   🌐 Frontend:  http://localhost:5173"
echo "   🔌 API:       http://localhost:3000"
echo "   🗄️  PgAdmin:   http://localhost:5050"
echo "                   admin@e-designe.com / admin123"
echo ""
echo "🗄️  BASE DE DONNÉES:"
echo "   Host:     localhost:5432"
echo "   User:     edesigne"
echo "   Pass:     edesigne_password_2024"
echo "   DB:       edesigne_db"
echo ""
echo "📝 COMMANDES UTILES:"
echo "   # Voir les conteneurs"
echo "   sudo docker ps"
echo ""
echo "   # Voir les logs"
echo "   sudo docker logs edesigne-api"
echo "   sudo docker logs edesigne-db"
echo ""
echo "   # Arrêter Docker"
echo "   sudo docker compose down"
echo ""
echo "   # Mettre à jour depuis GitHub"
echo "   git pull origin master"
echo ""
echo "=============================================="
