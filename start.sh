#!/bin/bash
# E-Désigne Local Start Script
# Runs API server + Frontend with Vite + optional ngrok

echo "🎀 E-DÉSIGNE - Démarrage Local"
echo "============================"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    lsof -i:$1 >/dev/null 2>&1
}

# Function to start ngrok
start_ngrok() {
    local PORT=$1
    if command -v ngrok &> /dev/null; then
        echo -e "${YELLOW}🔗 Starting ngrok on port $PORT...${NC}"
        ngrok http $PORT &
        sleep 3
        echo -e "${GREEN}✓ ngrok started${NC}"
    else
        echo -e "${RED}⚠ ngrok not installed - can't expose URL${NC}"
    fi
}

# Parse arguments
START_NGROK=false
API_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --ngrok)
            START_NGROK=true
            shift
            ;;
        --api-only)
            API_ONLY=true
            shift
            ;;
        -h|--help)
            echo "Usage: ./start.sh [options]"
            echo ""
            echo "Options:"
            echo "  --ngrok      Expose server with ngrok (requires ngrok installed)"
            echo "  --api-only   Start API server only (no frontend)"
            echo "  -h, --help  Show this help message"
            exit 0
            ;;
        *)
            shift
            ;;
    esac
done

# Check Ollama status
echo ""
echo -e "${YELLOW}🤖 Checking Ollama...${NC}"
if check_port 11434; then
    echo -e "${GREEN}✓ Ollama is running on port 11434${NC}"
    echo "Available models:"
    curl -s http://localhost:11434/api/tags | grep -o '"name":"[^"]*"' | head -5
else
    echo -e "${RED}⚠ Ollama not detected on port 11434${NC}"
    echo "  Start with: ollama serve"
    echo "  Or check: https://ollama.ai"
fi

# Start API Server
echo ""
echo -e "${YELLOW}🚀 Starting API server...${NC}"
cd "$(dirname "$0")/server"
node index.js &
API_PID=$!

# Wait for API to start
sleep 2

if check_port 3000; then
    echo -e "${GREEN}✓ API server running on http://localhost:3000${NC}"
else
    echo -e "${RED}✗ Failed to start API server${NC}"
    exit 1
fi

# Start Frontend (unless api-only)
if [ "$API_ONLY" = false ]; then
    echo ""
    echo -e "${YELLOW}🎨 Starting Frontend...${NC}"
    cd "$(dirname "$0")/frontend"
    npm run dev &
    FRONTEND_PID=$!
    
    sleep 3
    
    if check_port 5173; then
        echo -e "${GREEN}✓ Frontend running on http://localhost:5173${NC}"
    else
        echo -e "${YELLOW}⚠ Using port 5173...trying 5174...${NC}"
    fi
fi

# Start ngrok if requested
if [ "$START_NGROK" = true ]; then
    start_ngrok 3000
fi

echo ""
echo "============================"
echo -e "${GREEN}🎀 E-DÉSIGNE EST PRÊT!${NC}"
echo "============================"
echo ""
echo "📱 URLs:"
echo "  API:    http://localhost:3000"
if [ "$API_ONLY" = false ]; then
    echo "  Front: http://localhost:5173"
fi
echo "  Health: http://localhost:3000/api/health"
echo "  AI:    http://localhost:3000/api/ai/healthcheck"
echo ""
echo "🤖 Chatbot test:"
echo "  curl -X POST http://localhost:3000/api/ai/chatbot \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"message\":\"Bonjour, comment ça va?\"}'"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter"

# Wait for interrupt
trap "kill $API_PID 2>/dev/null; kill $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait