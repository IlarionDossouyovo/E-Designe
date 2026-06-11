# E-Graphisme Server using Python
# Run: python run.py
# Then open http://localhost:8000

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 40)
        print("E-Graphisme Server Started!")
        print("=" * 40)
        print(f"URL: http://localhost:{PORT}")
        print(f"Directory: {DIRECTORY}")
        print()
        print("Pages:")
        print(f"  http://localhost:{PORT}/index.html")
        print(f"  http://localhost:{PORT}/portfolio.html")
        print(f"  http://localhost:{PORT}/services.html")
        print(f"  http://localhost:{PORT}/studio.html")
        print()
        print("Press Ctrl+C to stop")
        print("=" * 40)
        httpd.serve_forever()

if __name__ == "__main__":
    run()