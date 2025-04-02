from flask import Flask, request, jsonify
from flask_cors import CORS
from gmail import GmailSendMessage
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    print("Received data:", data)
    return jsonify({"message": "Data received", "received": data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


#data = receive_data()
#import requests
#url = "http://127.0.0.1:5000/api/data"
#response = requests.get(url)
#print(response.json())

#email tool
#mail = GmailSendMessage("Hello")