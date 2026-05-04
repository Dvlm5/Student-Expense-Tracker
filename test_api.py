import json
import urllib.request

data = {'desc': 'Test expense', 'amount': 50.0, 'cat': 'food', 'date': '2026-05-04', 'mode': 'Cash', 'month': 'May'}
req = urllib.request.Request('http://127.0.0.1:5000/api/expenses',
                            data=json.dumps(data).encode('utf-8'),
                            headers={'Content-Type': 'application/json'},
                            method='POST')
try:
    with urllib.request.urlopen(req) as response:
        print('Status:', response.status)
        print('Response:', response.read().decode('utf-8'))
except Exception as e:
    print('Error:', e)