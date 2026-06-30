#!/bin/bash
# E-Graphisme - Script de démarrage automatique du système complet
# Ce script démarre tous les services nécessaires

echo "🚀 Démarrage du système E-Graphisme..."
echo "=========================================="

# Configuration
PROJECT_DIR="/workspace/project/E-Graphisme"
PORT_WEB=8000
PORT_API=8001
PORT_OLLAMA=11434

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour vérifier si un port est utilisé
check_port() {
    netstat -tuln 2>/dev/null | grep -q ":$1 " || ss -tuln 2>/dev/null | grep -q ":$1 "
}

# Fonction pour vérifier si un processus est en cours
check_process() {
    pgrep -f "$1" > /dev/null 2>&1
}

# Fonction pour afficher le statut
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
    else
        echo -e "${RED}✗${NC} $1"
    fi
}

echo ""
echo "1️⃣ Vérification des services en cours..."
echo "--------------------------------------"

# Vérifier Web Server
if check_port $PORT_WEB; then
    print_status "Web Server (port $PORT_WEB)" 0
else
    print_status "Web Server (port $PORT_WEB)" 1
fi

# Vérifier API
if check_port $PORT_API; then
    print_status "API Server (port $PORT_API)" 0
else
    print_status "API Server (port $PORT_API)" 1
fi

# Vérifier Ollama
if check_port $PORT_OLLAMA; then
    print_status "Ollama (port $PORT_OLLAMA)" 0
else
    print_status "Ollama (port $PORT_OLLAMA)" 1
fi

echo ""
echo "2️⃣ Démarrage des services..."
echo "---------------------------"

# Démarrer Web Server si pas déjà en cours
if ! check_port $PORT_WEB; then
    echo -e "${YELLOW}→${NC} Démarrage Web Server..."
    cd "$PROJECT_DIR"
    python3 -m http.server $PORT_WEB > /dev/null 2>&1 &
    sleep 2
    print_status "Web Server" 0
else
    echo -e "${GREEN}✓${NC} Web Server déjà en cours"
fi

# Démarrer API si pas déjà en cours
if ! check_port $PORT_API; then
    echo -e "${YELLOW}→${NC} Démarrage API Server..."
    cd "$PROJECT_DIR"
    python3 api/contact.py > /dev/null 2>&1 &
    sleep 2
    print_status "API Server" 0
else
    echo -e "${GREEN}✓${NC} API Server déjà en cours"
fi

echo ""
echo "3️⃣ Vérification finale..."
echo "------------------------"

# Vérifications finales
sleep 2

if check_port $PORT_WEB; then
    echo -e "${GREEN}✓${NC} Web: http://127.0.0.1:$PORT_WEB"
else
    echo -e "${RED}✗${NC} Web: ÉCHEC"
fi

if check_port $PORT_API; then
    echo -e "${GREEN}✓${NC} API: http://127.0.0.1:$PORT_API/api/contact"
else
    echo -e "${RED}✗${NC} API: ÉCHEC"
fi

if check_port $PORT_OLLAMA; then
    echo -e "${GREEN}✓${NC} Ollama: http://127.0.0.1:$PORT_OLLAMA"
else
    echo -e "${YELLOW}⚠${NC} Ollama: Non installé (optionnel - requis pour AI)"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Démarrage terminé !${NC}"
echo ""
echo "📋 URLs d'accès:"
echo "   • Site Web:    http://127.0.0.1:$PORT_WEB"
echo "   • API:       http://127.0.0.1:$PORT_API/api/contact"
echo "   • GitHub:    https://ilariondossouyovo.github.io/E-Graphisme/"
echo ""
echo "💡 Commandes manuelles:"
echo "   • python3 -m http.server $PORT_WEB"
echo "   • python3 api/contact.py"
echo ""