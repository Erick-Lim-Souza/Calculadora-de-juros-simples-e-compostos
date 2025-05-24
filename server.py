from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Configuração do arquivo para armazenamento (simulando um banco de dados simples)
HISTORY_FILE = 'calculations.json'

def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_history(history):
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    
    principal = float(data['principal'])
    rate = float(data['rate'])
    time = int(data['time'])
    interest_type = data['interest_type']
    
    if interest_type == 'simple':
        interest = principal * (rate / 100) * time
        amount = principal + interest
    else:
        amount = principal * (1 + (rate / 100)) ** time
        interest = amount - principal
    
    # Salvar no histórico
    history = load_history()
    calculation = {
        'principal': principal,
        'rate': rate,
        'time': time,
        'interest_type': interest_type,
        'amount': amount,
        'interest': interest,
        'date': datetime.now().isoformat()
    }
    history.insert(0, calculation)
    save_history(history)
    
    return jsonify({
        'amount': round(amount, 2),
        'interest': round(interest, 2),
        'type': 'simple' if interest_type == 'simple' else 'compound'
    })

@app.route('/history', methods=['GET'])
def get_history():
    return jsonify(load_history())

@app.route('/clear_history', methods=['POST'])
def clear_history():
    save_history([])
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)