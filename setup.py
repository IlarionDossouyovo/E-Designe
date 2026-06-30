#!/usr/bin/env python3
"""
E-Graphisme - Script de Configuration
Initialise la base de données et vérifie la configuration
"""

import json
import os
from pathlib import Path

PROJECT_DIR = Path(__file__).parent

def main():
    print("=======================================")
    print("  E-Graphisme - Setup & Configuration")
    print("=======================================\n")

    # 1. Vérifier la configuration
    print("[1] Vérification de la configuration...")
    
    config = {
        'DB_TYPE': 'json',
        'EMAIL_FROM': 'noreply@e-graphisme.com',
        'EMAIL_TO': 'electronbusiness07@gmail.com',
        'OLLAMA_HOST': 'http://localhost:11434',
        'OLLAMA_MODEL': 'llama3'
    }
    
    for key, value in config.items():
        print(f"  - {key}: {value}")
    print("  ✓ Configuration chargée\n")

    # 2. Créer les dossiers nécessaires
    print("[2] Création des dossiers...")
    dirs = ['db', 'php/logs', 'uploads', 'cache']
    
    for d in dirs:
        path = PROJECT_DIR / d
        if not path.exists():
            path.mkdir(parents=True, exist_ok=True)
            print(f"  - Créé: {d}")
    print("  ✓ Dossiers prêts\n")

    # 3. Initialiser les fichiers JSON
    print("[3] Initialisation de la base de données JSON...")
    
    tables = {
        'contacts.json': {
            'contacts': [],
            'newsletter': []
        },
        'users.json': [
            {
                'id': 'admin_001',
                'username': 'admin',
                'email': 'admin@e-graphisme.com',
                'role': 'admin',
                'status': 'active',
                'password': 'egraphisme2026'
            }
        ],
        'services.json': [
            {'id': 'web', 'name': 'Web Design', 'price': 150000, 'description': 'Création de sites web professionnels'},
            {'id': 'branding', 'name': 'Branding', 'price': 200000, 'description': 'Identité de marque'},
            {'id': 'print', 'name': 'Impression', 'price': 50000, 'description': 'Flyers, cartes, brochures'},
            {'id': 'video', 'name': 'Vidéo', 'price': 250000, 'description': 'Production vidéo'}
        ],
        'products.json': [
            {'id': 'logo', 'name': 'Logo Professionnel', 'category': 'branding', 'price': 150000},
            {'id': 'web', 'name': 'Site Web', 'category': 'web', 'price': 250000},
            {'id': 'video', 'name': 'Vidéo Corporate', 'category': 'video', 'price': 300000}
        ],
        'orders.json': [],
        'subscriptions.json': [
            {'id': 'free', 'name': 'Gratuit', 'price': 0, 'features': ['Designs basiques', 'Export PNG', 'Support email']},
            {'id': 'pro', 'name': 'Pro', 'price': 25000, 'features': ['Tous les designs', 'Export PDF/SVG', 'Support priority']},
            {'id': 'enterprise', 'name': 'Entreprise', 'price': 50000, 'features': ['Tout inclus', 'Équipe', 'API', 'Support 24/7']}
        ]
    }
    
    db_path = PROJECT_DIR / 'db'
    for filename, data in tables.items():
        file_path = db_path / filename
        if not file_path.exists():
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"  - Créé: {filename}")
    print("  ✓ Base de données initialisée\n")

    # 4. Vérifier Ollama
    print("[4] Vérification Ollama...")
    try:
        import urllib.request
        req = urllib.request.Request('http://localhost:11434/api/tags')
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read())
            print("  ✓ Ollama connecté")
            print("  Modèles disponibles:")
            for model in data.get('models', []):
                print(f"    - {model['name']}")
    except Exception as e:
        print(f"  ⚠ Ollama non disponible: {e}")
        print("  Pour installer Ollama: brew install ollama (macOS) ou curl -sfsSL https://ollama.ai/install.sh | sh")
    print()

    # 5. Résumé
    print("=======================================")
    print("  Configuration Terminée!")
    print("=======================================\n")

    print("URLs:")
    print("  Site: http://localhost:8000")
    print("  Dashboard: http://localhost:8000/dashboard.html")
    print("  Admin: http://localhost:8000/admin/")
    print()

    print("Comptes:")
    print("  Admin: admin@e-graphisme.com / egraphisme2026")
    print("  Editor: editor@e-graphisme.com / egraphisme2026")
    print()

    print("Prochaines étapes:")
    print("  1. python3 -m http.server 8000")
    print("  2. ollama serve (pour l'IA)")
    print()

if __name__ == '__main__':
    main()