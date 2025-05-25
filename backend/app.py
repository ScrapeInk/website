# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json # For reading and writing JSON data
from datetime import datetime
import os # To construct file paths safely

app = Flask(__name__)
CORS(app)

# Define the path for the subscribers file
# This will place subscribers.json in the same directory as app.py
SUBSCRIBERS_FILE = os.path.join(os.path.dirname(__file__), 'subscribers.json')

# Store email subscriptions (will be loaded from/saved to file)
subscribers = []

def load_subscribers():
    """Loads subscribers from the JSON file into the global list."""
    global subscribers
    try:
        if os.path.exists(SUBSCRIBERS_FILE):
            with open(SUBSCRIBERS_FILE, 'r') as f:
                data = json.load(f)
                # Basic validation: ensure it's a list
                if isinstance(data, list):
                    subscribers = data
                else:
                    print(f"Warning: {SUBSCRIBERS_FILE} does not contain a valid list. Starting fresh.")
                    subscribers = [] # Reset if format is wrong
        else:
            subscribers = [] # File doesn't exist, start with empty list
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {SUBSCRIBERS_FILE}. Starting with an empty list.")
        subscribers = [] # Reset if file is corrupted
    except Exception as e:
        print(f"An error occurred while loading subscribers: {e}")
        subscribers = [] # Fallback to empty list

def save_subscribers():
    """Saves the current global subscribers list to the JSON file."""
    try:
        with open(SUBSCRIBERS_FILE, 'w') as f:
            json.dump(subscribers, f, indent=4) # indent for readability
    except IOError as e:
        print(f"Error: Could not write to {SUBSCRIBERS_FILE}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred while saving subscribers: {e}")

# Load subscribers when the application starts
load_subscribers()


@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    global subscribers # Ensure we're modifying the global list
    try:
        data = request.get_json()
        email = data.get('email')

        if not email:
            return jsonify({'error': 'Email is required'}), 400

        # Simple email validation
        if '@' not in email or '.' not in email:
            return jsonify({'error': 'Invalid email format'}), 400

        # Check if email already exists
        if any(sub['email'] == email for sub in subscribers):
            return jsonify({'error': 'Email already subscribed'}), 409

        # Add subscriber
        new_subscriber = {
            'email': email,
            'timestamp': datetime.now().isoformat()
        }
        subscribers.append(new_subscriber)
        save_subscribers() # Save the updated list to file

        return jsonify({'message': 'Successfully subscribed!'}), 200

    except Exception as e:
        print(f"Error in /api/subscribe: {e}")
        return jsonify({'error': 'Server error'}), 500

@app.route('/api/stats')
def stats():
    # The subscribers count will now reflect the persisted list
    return jsonify({
        'subscribers': len(subscribers),
        'services': 4,
        'launch_date': '2025'
    })

if __name__ == '__main__':
    # Note: Flask's dev server will reload on code changes.
    # load_subscribers() is called once when the module is first loaded.
    # If the dev server reloads, the module reloads, and so does load_subscribers().
    app.run(debug=True, host='0.0.0.0', port=5000)