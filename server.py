#!/usr/bin/env python3
"""
Simple HTTP server for E-Graphisme
Serves index.html as the default file
"""
import http.server
import socketserver
import webbrowser
import os

PORT = 8000
DIRECTORY = "."

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def do_GET(self):
        # If requesting root, serve index.html
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

def run_server():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"✅ E-Graphisme Server started!")
        print(f"🌐 http://localhost:{PORT}")
        print(f"📱 http://localhost:{PORT}/index.html")
        print(f"🎨 http://localhost:{PORT}/portfolio.html")
        print(f"⚙️  http://localhost:{PORT}/services.html")
        print(f"🎬 http://localhost:{PORT}/studio.html")
        print(f"\nAppuyez Ctrl+C pour arrêter\n")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()