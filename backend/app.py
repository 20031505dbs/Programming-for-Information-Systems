from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pymysql.cursors

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'bootique'

CORS(app)

def get_db_connection():
    try:
        connection = pymysql.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DB'],
            cursorclass=pymysql.cursors.DictCursor
        )
        print("Database connection successful!")
        return connection
    except pymysql.MySQLError as e:
        print(f"Error connecting to MySQL Database: {e}")
        return None

# API Endpoints

# User Registration
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500
    
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
    account = cursor.fetchone()

    if account:
        cursor.close()
        connection.close()
        return jsonify({'error': 'User already exists!'}), 400

    cursor.execute('INSERT INTO users (username, email, password) VALUES (%s, %s, %s)', (username, email, password))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({'message': 'User registered successfully!'}), 201

# User Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Database connection failed'}), 500

    cursor = connection.cursor()
    cursor.execute('SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
    user = cursor.fetchone()
    
    if user:
        session['user_id'] = user['id']
        cursor.close()
        connection.close()
        return jsonify({'message': 'Login successful!', 'user': user}), 200

    cursor.close()
    connection.close()
    return jsonify({'error': 'Invalid credentials!'}), 401

# Get Products with Filters
@app.route('/api/products', methods=['GET'])
def get_products():
    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Failed to connect to the database'}), 500

    cursor = connection.cursor()

    # Base query
    query = "SELECT * FROM products WHERE 1=1"
    filters = []

    # Apply filters if they exist
    category = request.args.get('category')
    if category:
        query += " AND category = %s"
        filters.append(category)

    fabric_type = request.args.get('fabric_type')
    if fabric_type:
        query += " AND fabric_type = %s"
        filters.append(fabric_type)

    colors = request.args.get('colors')
    if colors:
        query += " AND FIND_IN_SET(%s, colors)"
        filters.append(colors)

    sizes = request.args.get('sizes')
    if sizes:
        query += " AND FIND_IN_SET(%s, sizes)"
        filters.append(sizes)

    product_type = request.args.get('type')
    if product_type:
        query += " AND type = %s"
        filters.append(product_type)

    min_price = request.args.get('min_price')
    if min_price:
        query += " AND price >= %s"
        filters.append(min_price)

    max_price = request.args.get('max_price')
    if max_price:
        query += " AND price <= %s"
        filters.append(max_price)

    cursor.execute(query, filters)
    product_list = cursor.fetchall()
    cursor.close()
    connection.close()
    
    return jsonify(product_list), 200
    
if __name__ == '__main__':
    app.run(debug=True)
