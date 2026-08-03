#!/bin/bash

# =====================================================
# 🎯 E-DÉSIGNE - MISE À JOUR COMPLÈTE
# Guide étape par étape
# =====================================================

echo "=============================================="
echo "🎯 MISE À JOUR COMPLÈTE E-DÉSIGNE"
echo "=============================================="

# =====================================================
# ÉTAPE 1: METTRE À JOUR LE CODE DEPUIS GITHUB
# =====================================================

echo -e "\n📥 ÉTAPE 1: Mise à jour depuis GitHub\n"

echo "Commandes:"
echo "----------"
echo "cd /workspace/E-Designe/E-Designe-master"
echo "git pull origin master"
echo ""

# =====================================================
# ÉTAPE 2: INSTALLER LES DÉPENDANCES
# =====================================================

echo -e "\n📦 ÉTAPE 2: Installation des dépendances\n"

echo "Commandes:"
echo "----------"
echo "# Racine du projet"
echo "npm install"
echo ""
echo "# Frontend"
echo "cd frontend && npm install && cd .."
echo ""

# =====================================================
# ÉTAPE 3: ARRÊTER LES ANCIENS CONTENEURS
# =====================================================

echo -e "\n🛑 ÉTAPE 3: Arrêter les conteneurs\n"

echo "Commandes:"
echo "----------"
echo "cd /workspace/E-Designe/E-Designe-master"
echo "sudo docker compose down"
echo ""

# =====================================================
# ÉTAPE 4: RECRÉER LES CONTENEURS
# =====================================================

echo -e "\n🐳 ÉTAPE 4: Recréer les conteneurs\n"

echo "Commandes:"
echo "----------"
echo "cd /workspace/E-Designe/E-Designe-master"
echo "sudo docker compose up -d"
echo ""

# =====================================================
# ÉTAPE 5: VÉRIFIER LES SERVICES
# =====================================================

echo -e "\n✅ ÉTAPE 5: Vérification\n"

echo "Commandes:"
echo "----------"
echo "sudo docker ps"
echo ""
echo "# Tester l'API"
echo "curl http://localhost:3000/api/health"
echo ""
echo "# Voir les produits"
echo "curl http://localhost:3000/api/products"
echo ""

# =====================================================
# ÉTAPE 6: LANCER LE FRONTEND
# =====================================================

echo -e "\n🚀 ÉTAPE 6: Lancer le Frontend\n"

echo "Commandes:"
echo "----------"
echo "cd /workspace/E-Designe/E-Designe-master/frontend"
echo "npm run dev"
echo ""

# =====================================================
# RÉSUMÉ EN UNE COMMANDE
# =====================================================

echo -e "\n⚡ TOUT EN UNE COMMANDE (Linux/Mac)\n"
echo "----------"
cat << 'EOF'
cd /workspace/E-Designe/E-Designe-master && \
git pull origin master && \
npm install && \
cd frontend && npm install && cd .. && \
sudo docker compose down && \
sudo docker compose up -d && \
sleep 10 && \
curl http://localhost:3000/api/health
EOF

echo -e "\n=============================================="
echo "✅ MISE À JOUR TERMINÉE!"
echo "=============================================="
