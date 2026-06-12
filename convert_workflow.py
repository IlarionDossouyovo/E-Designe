#!/usr/bin/env python3
"""Convert workflow to n8n format"""
import json
import os

def convert_workflow(filename):
    with open(f'workflows/{filename}', 'r') as f:
        wf = json.load(f)
    
    new_wf = {
        "name": wf.get("name", "E-Graphisme Workflow"),
        "nodes": wf.get("nodes", []),
        "connections": wf.get("connections", {}),
        "active": False,
        "settings": {
            "executionOrder": "v1"
        },
        "id": "eg_" + wf.get("name", "workflow").lower().replace(" ", "_").replace("-", "_")
    }
    
    with open(f'workflows/{filename}', 'w') as f:
        json.dump(new_wf, f, indent=2)

# Convert all workflows
for f in os.listdir('workflows'):
    if f.endswith('.json'):
        try:
            convert_workflow(f)
            print(f"Converted: {f}")
        except Exception as e:
            print(f"Error {f}: {e}")