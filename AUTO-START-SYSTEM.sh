#!/bin/bash
# E-Graphisme - Script de démarrage automatique du système complet
# Ce script démarre tous les services nécessaires

echo "🚀Démarrage du système E-Graphisme..."
echo "=========================================="

# Configuration
PROJECT_DIR="/workspace/project/E-Graphisme"
PORT_PHP=8000
PORT_N8N=5678
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

# Vérifier PHP
if check_process "php.*$PORT_PHP"; then
    print_status "PHP Server (port $PORT_PHP)" 0
else
    print_status "PHP Server (port $PORT_PHP)" 1
fi

# Vérifier N8N
if check_process "n8n"; then
    print_status "N8N (port $PORT_N8N)" 0
else
    print_status "N8N (port $PORT_N8N)" 1
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

# Démarrer PHP si pas déjà en cours
if ! check_process "php.*$PORT_PHP"; then
    echo -e "${YELLOW}→${NC} Démarrage PHP Server..."
    cd "$PROJECT_DIR"
    php -S 127.0.0.1:$PORT_PHP -t "$PROJECT_DIR" > /dev/null 2>&1 &
    sleep 2
    print_status "PHP Server" 0
else
    echo -e "${GREEN}✓${NC} PHP Server déjà en cours"
fi

# Démarrer N8N si pas déjà en cours
if ! check_process "n8n"; then
    echo -e "${YELLOW}→${NC} Démarrage N8N..."
    n8n start > /dev/null 2>&1 &
    sleep 3
    print_status "N8N" 0
else
    echo -e "${GREEN}✓${NC} N8N déjà en cours"
fi

echo ""
echo "3️⃣ Vérification finale..."
echo "------------------------"

# Vérifications finales
sleep 2

if check_process "php.*$PORT_PHP"; then
    echo -e "${GREEN}✓${NC} PHP: http://127.0.0.1:$PORT_PHP"
else
    echo -e "${RED}✗${NC} PHP: ÉCHEC"
fi

if check_process "n8n"; then
    echo -e "${GREEN}✓${NC} N8N: http://127.0.0.1:$PORT_N8N"
else
    echo -e "${RED}✗${NC} N8N: ÉCHEC"
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
echo "   • Site Web:    http://127.0.0.1:$PORT_PHP"
echo "   • N8N:       http://127.0.0.1:$PORT_N8N"
echo "   • GitHub:     https://ilariondossouyovo.github.io/E-Graphisme/"
echo ""
echo "💡 Pour arrêter les services, utilisez: ./AUTO-STOP-SYSTEM.sh"
echo ""