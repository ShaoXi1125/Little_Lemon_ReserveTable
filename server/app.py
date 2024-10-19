from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Database connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost", 
        user="root",
        password="123qwe",
        database="little_lemon"
    )

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    telephone = data.get("telephone")
    occasion = data.get("occasion")
    guests = data.get("guests")
    date = data.get("date")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO reservations (name, email, telephone, occasion, guests, date)
        VALUES (%s, %s, %s, %s, %s, %s)
    ''', (name, email, telephone, occasion, guests, date))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Reservation created successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True)
