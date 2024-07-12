from flask import Flask, render_template, request, jsonify, redirect, url_for
import json
import os

app = Flask(__name__)

# Route for rendering the signup form
@app.route('/')
def index():
    return render_template('signup.html')

# Route for handling signup form submission
@app.route('/signup', methods=['POST'])
def signup():
    # Retrieve form data
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')

    # Basic form validation (you can add more advanced validation as needed)
    if not name or not email or not password:
        return jsonify({'error': 'Please fill out all fields'}), 400

    # Create user object
    new_user = {
        'name': name,
        'email': email,
        'password': password
    }

    # Save user data to users.json
    save_to_users_json(new_user)

    # Redirect to profile.html after successful signup
    return redirect(url_for('profile'))

def save_to_users_json(user_data):
    # Determine file path for users.json
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, 'users.json')

    # Load existing users data from users.json
    try:
        with open(file_path, 'r') as file:
            users = json.load(file)
    except FileNotFoundError:
        users = []

    # Assign a unique ID to the new user
    new_user_id = len(users) + 1
    new_user['id'] = new_user_id

    # Append new user data
    users.append(new_user)

    # Save updated users data back to users.json
    with open(file_path, 'w') as file:
        json.dump(users, file, indent=4)

@app.route('/profile')
def profile():
    return render_template('profile.html')

if __name__ == '__main__':
    app.run(debug=True)
