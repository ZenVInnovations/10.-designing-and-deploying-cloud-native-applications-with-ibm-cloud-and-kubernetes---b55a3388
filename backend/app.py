from flask import Flask, request, jsonify, send_from_directory
from cloudant.client import Cloudant
from cloudant.error import CloudantException
import os

app = Flask(__name__, static_folder='../frontend', static_url_path='')

# 🔐 IBM Cloudant Credentials
CLOUDANT_USERNAME = os.getenv('CLOUDANT_USERNAME')
CLOUDANT_API_KEY = os.getenv('CLOUDANT_API_KEY')

# 📦 Connect to Cloudant
try:
    client = Cloudant.iam(CLOUDANT_USERNAME, CLOUDANT_API_KEY, connect=True)
except CloudantException as e:
    print("Cloudant connection failed:", str(e))
    exit(1)

# 🗃 Create (or connect to) databases
event_db = client.create_database('events', throw_on_exists=False)
rsvp_db = client.create_database('rsvps', throw_on_exists=False)

# 🔽 Serve Static Frontend
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/style.css')
def serve_css():
    return send_from_directory(app.static_folder, 'style.css')

# 📌 Create Event
@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    required_fields = {'title', 'date', 'description'}
    if not required_fields.issubset(data):
        return jsonify({"error": "Missing fields"}), 400

    try:
        doc = event_db.create_document(data)
        return jsonify(doc), 201
    except CloudantException as e:
        return jsonify({"error": str(e)}), 500

# 📜 List All Events
@app.route('/events', methods=['GET'])
def list_events():
    try:
        events = [doc for doc in event_db]
        return jsonify(events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 📥 RSVP to Event
@app.route('/rsvp', methods=['POST'])
def rsvp():
    data = request.get_json()
    required_fields = {'event_id', 'name', 'email'}
    if not required_fields.issubset(data):
        return jsonify({"error": "Missing fields"}), 400

    try:
        doc = rsvp_db.create_document(data)
        return jsonify(doc), 201
    except CloudantException as e:
        return jsonify({"error": str(e)}), 500

# 📋 Get RSVPs for a Specific Event
@app.route('/rsvp/<event_id>', methods=['GET'])
def get_rsvps(event_id):
    try:
        rsvps = [doc for doc in rsvp_db if doc.get('event_id') == event_id]
        return jsonify(rsvps), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🚀 Run Flask Server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
