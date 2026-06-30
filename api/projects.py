#!/usr/bin/env python3
"""
E-Graphisme Projects API
Manages user video projects
"""

from flask import Flask, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# Database path
DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'db', 'projects.json')

def load_projects():
    """Load projects from database"""
    if os.path.exists(DB_PATH):
        with open(DB_PATH, 'r') as f:
            return json.load(f)
    return []

def save_projects(projects):
    """Save projects to database"""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    with open(DB_PATH, 'w') as f:
        json.dump(projects, f, indent=2)

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get all projects (with optional user filter)"""
    user_id = request.args.get('user_id')
    projects = load_projects()
    
    if user_id:
        projects = [p for p in projects if p.get('user_id') == user_id]
    
    return jsonify({'success': True, 'projects': projects})

@app.route('/api/projects', methods=['POST'])
def create_project():
    """Create a new project"""
    data = request.get_json()
    
    user_id = data.get('user_id')
    name = data.get('name')
    project_type = data.get('type', 'video')
    
    if not all([user_id, name]):
        return jsonify({'success': False, 'error': 'Missing required fields'}), 400
    
    projects = load_projects()
    
    # Create new project
    project_id = f"proj_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    new_project = {
        'id': project_id,
        'user_id': user_id,
        'name': name,
        'type': project_type,
        'status': 'draft',
        'data': data.get('data', {}),
        'created': datetime.now().isoformat(),
        'updated': datetime.now().isoformat()
    }
    
    projects.append(new_project)
    save_projects(projects)
    
    return jsonify({
        'success': True,
        'project': new_project
    })

@app.route('/api/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    """Get project by ID"""
    projects = load_projects()
    project = next((p for p in projects if p.get('id') == project_id), None)
    
    if not project:
        return jsonify({'success': False, 'error': 'Project not found'}), 404
    
    return jsonify({'success': True, 'project': project})

@app.route('/api/projects/<project_id>', methods=['PUT'])
def update_project(project_id):
    """Update project"""
    data = request.get_json()
    projects = load_projects()
    
    for i, p in enumerate(projects):
        if p.get('id') == project_id:
            projects[i].update(data)
            projects[i]['updated'] = datetime.now().isoformat()
            save_projects(projects)
            
            return jsonify({'success': True, 'project': projects[i]})
    
    return jsonify({'success': False, 'error': 'Project not found'}), 404

@app.route('/api/projects/<project_id>', methods=['DELETE'])
def delete_project(project_id):
    """Delete project"""
    projects = load_projects()
    
    initial_length = len(projects)
    projects = [p for p in projects if p.get('id') != project_id]
    
    if len(projects) < initial_length:
        save_projects(projects)
        return jsonify({'success': True, 'message': 'Project deleted'})
    
    return jsonify({'success': False, 'error': 'Project not found'}), 404

@app.route('/api/projects/<project_id>/duplicate', methods=['POST'])
def duplicate_project(project_id):
    """Duplicate a project"""
    projects = load_projects()
    project = next((p for p in projects if p.get('id') == project_id), None)
    
    if not project:
        return jsonify({'success': False, 'error': 'Project not found'}), 404
    
    # Create duplicate
    new_id = f"proj_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    duplicate = {
        'id': new_id,
        'user_id': project['user_id'],
        'name': f"{project['name']} (copy)",
        'type': project['type'],
        'status': 'draft',
        'data': project.get('data', {}),
        'created': datetime.now().isoformat(),
        'updated': datetime.now().isoformat()
    }
    
    projects.append(duplicate)
    save_projects(projects)
    
    return jsonify({
        'success': True,
        'project': duplicate
    })

if __name__ == '__main__':
    print("Projects API running on http://localhost:8003")
    app.run(host='0.0.0.0', port=8003, debug=True)