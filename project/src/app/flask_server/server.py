from flask import Flask, jsonify


app = Flask(__name__)

# Enable CORS for all routes using a decorator
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response

# Dummy read function (replace this with your actual read logic)
def read_data():
    # Replace this with your actual logic to determine if it's hostile or not
    return True

@app.route('/upload')
def read():
    result = read_data()
    response_data = {"hostile": result}
    return jsonify(response_data)

if __name__ == '__main__':
    app.after_request(add_cors_headers)  # Add CORS headers to all responses
    app.run(port=4000)

