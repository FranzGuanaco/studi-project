from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import psycopg2
import os
from werkzeug.utils import secure_filename
from flask import send_from_directory

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


UPLOAD_FOLDER = '/Users/pierrechevin/Studi project/studi-project/src/Pic'

@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@app.route('/addProductWithImage', methods=['POST'])
def add_product_with_image():
    if 'file' not in request.files:
        return jsonify({'error': 'Pas de fichier fourni'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Pas de fichier sélectionné'}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    libelle = request.form['libelle']
    description = request.form['description']
    prix = request.form['prix']
    categorie_id = request.form['categorie_id']

    cursor = db_connection.cursor()

    try:
        cursor.execute("INSERT INTO produits (libelle, description, prix, image_url, categorie_id) VALUES (%s, %s, %s, %s, %s) RETURNING id;", 
                       (libelle, description, prix, file_path, categorie_id))

        product_id = cursor.fetchone()[0]
        db_connection.commit()
    except Exception as e:
        return jsonify({'error': 'Erreur lors de linsertion en base de données', 'details': str(e)}), 500
    finally:
        cursor.close()

    return jsonify({'success': 'Produit ajouté avec succès', 'id': product_id})




@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'Pas de fichier fourni'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Pas de fichier sélectionné'}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        cursor = db_connection.cursor()
        
        # Insertion mise à jour
        try:
            cursor.execute("INSERT INTO produits (image_url) VALUES (%s)", (file_path,))
            db_connection.commit()
        except Exception as e:
            # Gestion d'erreur basique pour l'insertion en base de données
            return jsonify({'error': 'Erreur lors de linsertion en base de données', 'details': str(e)}), 500
        finally:
            cursor.close()
        
        return jsonify({'success': 'Image téléchargée et enregistrée avec succès', 'image_path': file_path})

    

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

    # Récupérer le paramètre categorie_id (s'il est fourni)
    categorie_id = request.args.get('categorie_id')
    
    # Construisez la requête de base
    query = '''
        SELECT 
            produits.id, 
            produits.libelle, 
            produits.description, 
            produits.prix, 
            produits.image_url, 
            produits.categorie_id, 
            categories.libelle_categorie,
            produits.statut_promotion, 
            produits.image 
        FROM produits 
        LEFT JOIN categories ON produits.categorie_id = categories.id
    '''
    
    # Si categorie_id est fourni, ajoutez une condition à la requête
    if categorie_id:
        query += ' WHERE produits.categorie_id = %s'
        cursor.execute(query, (categorie_id,))
    else:
        cursor.execute(query)
    
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
            'categorie_libelle': produit[6],
            'statut_promotion': produit[7],
            'image': produit[8]
        }
        response.append(item)

    return jsonify(response)




@app.route('/categorie', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'])
def get_categories():
    cursor = db_connection.cursor()
    cursor.execute('SELECT * FROM categories;')
    categories = cursor.fetchall()
    cursor.close()

    response = []

    for category in categories:
        item = {
            'id': category[0],
            'libelle_categories': category[1],
        }
        response.append(item)

    return jsonify(response)



@app.route('/nvproduits', methods=['POST'])
@cross_origin(origins=['http://localhost:3000'])
def add_product():

    product_data = request.json
    cursor = db_connection.cursor()
    cursor.execute(
    "INSERT INTO produits (libelle, description, prix, categorie_id) VALUES (%s, %s, %s, %s) RETURNING id;",
    (product_data['libelle'], product_data['description'], product_data['prix'], product_data['categorie_id']))
    product_id = cursor.fetchone()[0]
    db_connection.commit()
    cursor.close()

    return jsonify({"id": product_id}), 201  # 201 Created

if __name__ == '__main__':
    app.run(debug=True, port=3001)


