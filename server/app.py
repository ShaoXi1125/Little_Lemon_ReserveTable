from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
import mysql.connector
from datetime import datetime
from flask_cors import CORS
import pytz


app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '123qwe',
    'database': 'little_lemon'
}

def get_db_connection():
    return mysql.connector.connect(**db_config) 
@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json() 
    print("Received data:", data)  

    cursor = None
    connection = None

    try:
        connection = get_db_connection() 
        cursor = connection.cursor()

      
        date_str = data['date'].replace("Z","") 

        date_object = datetime.fromisoformat(date_str)
        

        local_tz = pytz.timezone('Asia/Kuala_Lumpur') 
        date_object = local_tz.localize(date_object) 

        formatted_date = date_object.strftime('%Y-%m-%d %H:%M:%S')

        query = "INSERT INTO reservations (name, email, telephone, guests, occasion, date) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (
            data['name'],
            data['email'],
            data['telephone'],
            data['guests'],
            data.get('occasion'),
            formatted_date 
        ))
        
        connection.commit()
        return jsonify({"message": "Reservation created successfully!"}), 201

    except mysql.connector.Error as err:
        print(f"Database error: {err}") 
        return jsonify({"message": "Database error occurred!"}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred!"}), 500
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# app = Flask(__name__)
bcrypt = Bcrypt(app) 

# Registration endpoint
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    connection = get_db_connection()
    cursor = connection.cursor()
    
    try:
        # Hash the password
        hashed_password = bcrypt.generate_password_hash(data['pass']).decode('utf-8')

        query = "INSERT INTO Customer (name, email, phone, password) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (data['name'], data['email'], data['telephone'], hashed_password))
        connection.commit()
        return jsonify({"message": "User registered successfully!"}), 201

    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        return jsonify({"message": "Database error occurred!"}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred!"}), 500
    finally:
        cursor.close()
        connection.close()

# Login endpoint
@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json()
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    try:
        # 查询用户
        query = "SELECT * FROM Customer WHERE email = %s"
        cursor.execute(query, (data['email'],))
        user = cursor.fetchone()

        # 验证密码
        if user and bcrypt.check_password_hash(user['password'], data['pass']):
            return jsonify({"message": "Login successful!", "name": user['name']}), 200
        else:
            return jsonify({"message": "Invalid email or password!"}), 401

    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        return jsonify({"message": "Database error occurred!"}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred!"}), 500
    finally:
        cursor.close()
        connection.close()


if __name__ == "__main__":
    app.run(debug=True)
