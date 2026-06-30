#!/usr/bin/env python3
"""
E-Graphisme - Contact Form API
Handles contact form submissions
"""

import json
import os
from datetime import datetime
from pathlib import Path
from http.server import HTTPServer, BaseHTTPRequestHandler

PROJECT_DIR = Path(__file__).parent.parent
DB_DIR = PROJECT_DIR / 'db'

class ContactHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/contact':
            self.send_contact()
        else:
            self.send_error(404, 'Not Found')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def send_contact(self):
        try:
            # Get JSON data
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Validate required fields
            required = ['name', 'email', 'subject', 'message']
            errors = []
            
            for field in required:
                if not data.get(field):
                    errors.append(f'{field} is required')
            
            if errors:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'errors': errors}).encode())
                return
            
            # Get client IP
            client_ip = self.client_address[0]
            
            # Create contact record
            contact = {
                'id': f'contact_{datetime.now().strftime("%Y%m%d%H%M%S")}',
                'name': data['name'],
                'email': data['email'],
                'subject': data['subject'],
                'message': data['message'],
                'phone': data.get('phone', ''),
                'company': data.get('company', ''),
                'service': data.get('service', ''),
                'budget': data.get('budget', ''),
                'ip': client_ip,
                'status': 'new',
                'created_at': datetime.now().isoformat()
            }
            
            # Load existing contacts
            contacts_file = DB_DIR / 'contacts.json'
            if contacts_file.exists():
                with open(contacts_file, 'r', encoding='utf-8') as f:
                    contacts_data = json.load(f)
            else:
                contacts_data = {'contacts': [], 'newsletter': []}
            
            # Add new contact
            contacts_data['contacts'].insert(0, contact)
            
            # Save
            with open(contacts_file, 'w', encoding='utf-8') as f:
                json.dump(contacts_data, f, ensure_ascii=False, indent=2)
            
            # Log the contact
            log_file = PROJECT_DIR / 'php' / 'logs' / f'contact_{datetime.now().strftime("%Y-%m-%d")}.log'
            log_file.parent.mkdir(parents=True, exist_ok=True)
            with open(log_file, 'a', encoding='utf-8') as f:
                f.write(f"{datetime.now().isoformat()} | IP: {client_ip} | Name: {data['name']} | Email: {data['email']}\n")
            
            # Success response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'success': True,
                'message': 'Message envoyé avec succès! Nous vous contacterons bientôt.',
                'contact_id': contact['id']
            }).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode())
    
    def log_message(self, format, *args):
        # Suppress default logging
        pass

def run_server(port=8001):
    server = HTTPServer(('0.0.0.0', port), ContactHandler)
    print(f'API server running on http://localhost:{port}')
    print(f'Contact API: http://localhost:{port}/api/contact')
    server.serve_forever()

if __name__ == '__main__':
    run_server()