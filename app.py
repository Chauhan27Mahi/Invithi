from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    text = file.read().decode('utf-8')
    return jsonify({'text': text})

@app.route('/process', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data['text']
    # Process text as needed, for simplicity we just return it as processed text
    processed_text = text
    return jsonify({'processed_text': processed_text})

if __name__ == '__main__':
    app.run(debug=True)
