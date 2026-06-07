#!/usr/bin/env python3
"""
Serveur HTTP personnalisé pour E-Graphisme
- Sert les fichiers statiques
- Utilise 404.html pour les pages non trouvées
"""
import http.server
import socketserver
import os

PORT = 12000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def send_error(self, code, message=None, explain=None):
        """Override pour utiliser 404.html personnalisé"""
        if code == 404:
            self.path = '/404.html'
            try:
                # Tenter de servir 404.html
                f = self.send_head()
                if f:
                    f.close()
                return
            except:
                pass
        # Comportement par défaut pour les autres erreurs
        super().send_error(code, message, explain)
    
    def end_headers(self):
        # Ajouter les headers pour le cache
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

class ReuseAddrTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def run_server():
    with ReuseAddrTCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serveur E-Graphisme démarré sur http://localhost:{PORT}")
        print(f"Utilisez Ctrl+C pour arrêter")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()