from flask import Flask, jsonify
import asyncio
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import nest_asyncio
import openai

nest_asyncio.apply()

async def download_audio_file():
    cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "walkok",
  "private_key_id": "fc9cc17c32bcdb5b0281674e3c005004308cc793",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDtC6qghHOedVuB\nAytEaQEf/xCfS8pX0bGkoNH0Jp+esWqnQTWsg0NzBiqnSgagK+/nSRp0XJVp3Ip/\nPy88H+EzOqSk0xoJNau9oT8cmy4TFYwDgw4bGUoQNim0qt1OziSyTk+0qQC4gkXd\ngXqMJjokP0eYwpQ7k7Np52nhUv5SFA+B6hBZoYTACa5Kb65efQHOU18ACRg35I6U\n1l2KljSBew66L7/KbZuzRuXl4lTNQ6Zidikpo1WLiZqqYUoIz8HTElMMYwabhl6J\nr3wA+86gAJge6jJfpXovmZMNm4OeRqnG81y50GAU0I3LEztWViXDZlqeK+e5rVj7\n3kVXNk75AgMBAAECggEAHDkmYKREi9pXQb4Z2bRS4PdiiETi25/o8bwAI3yxxphD\nJZTbCiY60qgqTe6/aTSyBKysjKw1UfxjNRFV02fMTWgvEDzePbh5MUPQmtxTGQyY\nthZViJ5zNgjs4Ejzvp1Gu0Adt1nj7xP7s4rmB2fJxmUOZj7MnWdRlktqTNyv0R+9\nq5Fwg4Tm966V/CgJlVJ0z26do772OM1GwDVjhmQws3sro2CUYhsBthW/Om/+ZgmY\neGJM1rxDSvJOW0Kytrz7VEWuP18xYH/c0J45zMlU1dkY+mx2gBAZOUKX0Y2jZZcU\n4gG2bpLxFDslqfYFzM9Vj4n0Zgzs0ocsbR8nLi0wAQKBgQD3qcfmb1nvcSa7Dy/F\nuUFruNjFlxGY/cnWu2OodOfiJiucCgwREvX6wil23bYsZsR1yeRe8xj3V54ScmJO\nbvE6DAXsopovUBWcD0xLVDzqbgCEUsMT/8EwoIlJcj62e57GjC91d6srgRdyEseW\n5ZtKjFng+8xgfxAEhio+7aROAQKBgQD1BmOUef9TBFyUdThv5o1Ob2QwabOeVivs\nlq3vMdbm6+6HkZaNAB++Chl8iu/+VvIymRGzWEOAg1QMUUoD64Faj1cej+z4gaGZ\nrp3FdUvH6LWsuxQG5lGgbCEVJGs9CR2WOf26siOkWQ4d8oHIgHDDkJCHadWkDV9j\n3qti/EZw+QKBgCET0vgK7TcWpLadG6NLz9oEUSdqutX1J2z/kBriqknBEVgA24W4\nQ5QfNIyEph0eCKU2tsKbszztvdX24vxYwu0ex/fH69Hf31L9lBIHiS9CS91gdF+K\nbBIDjvJ5SLj0n8si0//bYMgpsKjyqyeTOP9m6WYsGyrULZ59EM1gze4BAoGAI7dP\nsqfp2N8M47MGjAEuXd2M3CW8QftLocwBBJneOoDvnyFQsbLv7ZKpTmcuPoPMACYh\n12OpS0VZbgY3ZMTicSHt0A2ovDyhIra6VrsXVceNG+WVMMBH67t3Qw6w9w+qGWjQ\nnHM1ENLOZP0hf+mBBnC/MI3zz1sHqZYeo2oklnkCgYEAz6IiaJHPFpk+CSnhuI0M\nFfFi5rJ9V5xT/b5/GJAzUDCDH8uY56CAq314gJgcCqShCAPwTe6duTYwn+3Lekhh\nZi7la5QjuUsXjRfqTO63LcMVt0Ue7gs+oy/a8QB8g+/zI2jSHq2YCHPYTm4aIhNo\ntTAc2G0/nXmMMIIylFybW10=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-dc3c7@walkok.iam.gserviceaccount.com",
  "client_id": "106924742753412646577",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dc3c7%40walkok.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
)
    firebase_admin.initialize_app(cred, options={
        'storageBucket': 'walkok.appspot.com'  # Remove the full URL and keep only the bucket name
    })

    bucket = storage.bucket()

    print(bucket)

    try:
        blob = bucket.blob("audio.m4a")

        local_path = "audio.m4a"
        c =  await blob.download_to_filename(local_path)
        print(c)

        print(f"Downloaded file to {local_path}")
    except Exception as e:
        print(f"This is perfect")


asyncio.run(download_audio_file())
API_KEY = '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'

model_id = "whisper-1"

media_file_path = 'audio.m4a'

media_file = open(media_file_path, 'rb')

data = openai.Audio.transcribe(
    api_key = API_KEY,
    model=model_id,
    file=media_file,
    response_format = 'json'
)["text"]

print(data)

app = Flask(__name__)

# Enable CORS for all routes using a decorator
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    return response




@app.route('/upload')
def read():
    response_data = {"content": data}
    return jsonify(response_data)

if __name__ == '__main__':

    app.after_request(add_cors_headers)  # Add CORS headers to all responses
    app.run(port=4000)

