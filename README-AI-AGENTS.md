# E-Graphisme - Complete AI Platform

## 🚀 Pages Disponibles

| Page | Description | Accès |
|------|-------------|-------|
| **index.html** | Site principal | Public |
| **studio.html** | E-Studio AI | Public |
| **stack-studio.html** | Administration (16 agents) | Token: `egraphisme-founder-2026` |
| **stack-graphisme.html** | Creative Suite (28 outils) | Token: `egraphisme-creative-2026` |
| **dashboard.html** | Dashboard analytics | Public |
| **contact.html** | Formulaire contact | Public |

---

## 🌐 Stack Studio - Agent Principal (16 AI Agents)

**URL**: http://localhost/stack-studio.html

**Token**: `egraphisme-founder-2026`

### Agents:
- Design Agent, Brand Strategist, Web Agent, Dev Agent
- Video Agent, Motion Designer, Content Agent, Copywriter Pro
- Marketing Agent, Social Media Manager, SEO Agent, Ads Specialist
- Analysis Agent, Sales Assistant, Support Agent, Data Analyst

---

## 🎨 Stack Graphisme - Creative Suite (28 Tools)

**URL**: http://localhost/stack-graphisme.html

**Token**: `egraphisme-creative-2026`

### Outils:
- Logo Creator, Identity Builder, Mockup Generator, Illustration AI
- Brand Strategy, Competitor Analysis, Naming Tool, Brand Guide
- UI Designer, Landing Page, Email Designer, Icon Generator
- Script Writer, Thumbnail Creator, Motion Graphics, Subtitle Generator
- Business Card, Brochure, Poster, Packaging
- Post Creator, Story Maker, Content Calendar, Hashtag Tool

---

## 🤖 Modèles Ollama

- llama3.2 (2.0 Go) - Usage général
- llama3.1:8b (4.9 Go) - Raisonnement avancé
- qwen2.5-coder:7b (4.7 Go) - Code
- phi3:mini (2.2 Go) - Rapide

---

## 🚀 Installation Locale

```bash
# Clone le projet
git clone https://github.com/votre-repo/E-Graphisme.git
cd E-Graphisme

# Lance Docker
docker compose up -d

# Ollama sur Windows
ollama serve

# Accède aux pages
# http://localhost/stack-studio.html
# http://localhost/stack-graphisme.html
```

---

## 📁 Structure

```
E-Graphisme/
├── index.html
├── studio.html
├── stack-studio.html      # Admin AI
├── stack-graphisme.html # Creative AI
├── dashboard.html
├── contact.html
├── docker-compose.yml
├── db/init.sql
├── php/*.php
├── js/*.js
└── css/*.css
```