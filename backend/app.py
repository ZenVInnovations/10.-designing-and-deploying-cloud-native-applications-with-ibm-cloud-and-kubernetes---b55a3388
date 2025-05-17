from flask import Flask, request, jsonify, send_from_directory
from cloudant.client import Cloudant
from cloudant.error import CloudantException
import os

app = Flask(__name__, static_folder='../frontend', static_url_path='')

# IBM Cloudant credentials
CLOUDANT_USERNAME = os.getenv('CLOUDANT_USERNAME')
CLOUDANT_API_KEY = os.getenv('CLOUDANT_API_KEY')

client = Cloudant.iam(CLOUDANT_USERNAME, CLOUDANT_API_KEY, connect=True)
event_db = client.create_database('events', throw_on_exists=False)
rsvp_db = client.create_database('rsvps', throw_on_exists=False)

# 🌐 Serve index.html and style.css
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/style.css')
def serve_css():
    return send_from_directory(app.static_folder, 'style.css')

# 📩 API Routes
@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    if not all(k in data for k in ('title', 'date', 'description')):
        return jsonify({"error": "Missing fields"}), 400
    doc = event_db.create_document(data)
    return jsonify(doc), 201

@app.route('/events', methods=['GET'])
def list_events():
    return jsonify([doc for doc in event_db]), 200

@app.route('/rsvp', methods=['POST'])
def rsvp():
    data = request.get_json()
    if not all(k in data for k in ('event_id', 'name', 'email')):
        return jsonify({"error": "Missing fields"}), 400
    doc = rsvp_db.create_document(data)
    return jsonify(doc), 201

@app.route('/rsvp/<event_id>', methods=['GET'])
def get_rsvps(event_id):
    rsvps = [doc for doc in rsvp_db if doc.get('event_id') == event_id]
    return jsonify(rsvps), 200

# 🚀 Start the Flask server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
