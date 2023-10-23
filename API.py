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
@app.route('/login', methods=['POST'])
@cross_origin(origins=['http://localhost:3000'])
    
def login():
    data = request.json
    nom_utilisateur = data['nom_utilisateur']
    mot_de_passe = data['mot_de_passe']

    cursor = db_connection.cursor()
    cursor.execute('SELECT * FROM Utilisateurs WHERE nom_utilisateur = %s AND mot_de_passe = %s;', (nom_utilisateur, mot_de_passe))
    utilisateur = cursor.fetchone()
    cursor.close()

    if utilisateur:
        return jsonify({'status': 'success', 'message': 'Authentification réussie!'})
    else:
        return jsonify({'status': 'failure', 'message': 'Authentification échouée!'}), 401



# Route pour l'authentification
@app.route('/auth', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'])
def test_route():
    return jsonify({'message': 'Ceci est un message de test depuis l\'API.'})



@app.route('/produits', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'])
def get_produits():
    cursor = db_connection.cursor()
    cursor.execute('SELECT * FROM Produits;')
    produits = cursor.fetchall()
    cursor.close()

    response = []

    for produit in produits:
        item = {
            'id': produit[0],
            'libelle': produit[1],
            'description': produit[2],
            'prix': produit[3],
            'image_url': produit[4],
            'categorie_id': produit[5],
            'statut_promotion': produit[6],
            'image': produit[7]
        }
        response.append(item)

    return jsonify(response)




if __name__ == '__main__':
    app.run(debug=True, port=3001)


