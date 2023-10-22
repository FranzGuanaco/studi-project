from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import psycopg2

app = Flask(__name__)
CORS(app)

# Configuration de la base de données
db_connection = psycopg2.connect(
    host='localhost',
    port=5432,
    user='pierrechevin',
    password='votre_mot_de_passe',
    database='mercadona'
)

# Message d'accueil
print("API Flask en cours d'exécution. Accédez à l'API via http://localhost:3000/")

# Route pour récupérer les données de la table "Utilisateurs"
@app.route('/api/user', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'])
def get_utilisateurs():
    print('La route /api/user a été appelée.')
    try:
        cursor = db_connection.cursor()
        cursor.execute('SELECT * FROM Utilisateurs')
        utilisateurs = cursor.fetchall()
        cursor.close()
        return jsonify(utilisateurs)
    except Exception as e:
        return str(e), 500

# Route pour l'authentification
@app.route('/auth', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'])
def test_route():
    return jsonify({'message': 'Ceci est un message de test depuis l\'API.'})

if __name__ == '__main__':
    app.run(debug=True, port=3001)
