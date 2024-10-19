from flask import Flask, request, jsonify
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
    return mysql.connector.connect(**db_config)  # 使用 db_config

@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json() 
    print("Received data:", data)  

    cursor = None
    connection = None

    try:
        connection = get_db_connection() 
        cursor = connection.cursor()

        # 去掉毫秒部分和 Z 表示的 UTC 时间
        date_str = data['date'].replace("Z","")  # 移除末尾的 Z

        # 解析日期字符串为 datetime 对象
        date_object = datetime.fromisoformat(date_str)  # 转换为 datetime 对象
        
        # 格式化为 MySQL 所需的格式
        local_tz = pytz.timezone('Asia/Kuala_Lumpur')  # 设定为马来西亚时区
        date_object = local_tz.localize(date_object)  # 将本地时间设定为当地时区

        formatted_date = date_object.strftime('%Y-%m-%d %H:%M:%S')


        # SQL 插入语句
        query = "INSERT INTO reservations (name, email, telephone, guests, occasion, date) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (
            data['name'],
            data['email'],
            data['telephone'],
            data['guests'],
            data.get('occasion'),
            formatted_date  # 使用格式化后的日期字符串
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

if __name__ == "__main__":
    app.run(debug=True)
