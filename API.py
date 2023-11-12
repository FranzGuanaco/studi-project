from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import psycopg2
import os
from werkzeug.utils import secure_filename
from flask import send_from_directory
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt()


    # Configuration de la base de données
db_connection = psycopg2.connect(
        host='localhost',
        port=5432,
        user='pierrechevin',
        password='votre_mot_de_passe',
        database='mercadona'
    )


UPLOAD_FOLDER = '/Users/pierrechevin/Studi project/studi-project/src/Pic'

# Route pour récupérer les données de la table "Utilisateurs"
# Route pour récupérer les données de la table "Utilisateurs"
@app.route('/login', methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def login():
    data = request.json
    nom_utilisateur = data['nom_utilisateur']
    mot_de_passe = data['mot_de_passe']

    # Debug: À retirer après le débogage
    print("Nom d'utilisateur reçu:", nom_utilisateur)
    print("Mot de passe reçu:", mot_de_passe)

    try:
        cursor = db_connection.cursor()
        cursor.execute('SELECT mot_de_passe FROM utilisateurs WHERE nom_utilisateur = %s;', (nom_utilisateur,))
        utilisateur = cursor.fetchone()
        cursor.close()

        if utilisateur:
            mot_de_passe_hash = utilisateur[0]
            print("Mot de passe hashé depuis la BD:", mot_de_passe_hash)  # Debug: À retirer après le débogage

            if bcrypt.check_password_hash(mot_de_passe_hash, mot_de_passe):
                return jsonify({'status': 'success', 'message': 'Authentification réussie!'})
            else:
                return jsonify({'status': 'failure', 'message': 'Mot de passe incorrect!'}), 401
        else:
            return jsonify({'status': 'failure', 'message': 'Nom d’utilisateur non trouvé!'}), 401

    except Exception as e:
        print("Erreur lors de la connexion à la base de données:", str(e))
        return jsonify({'status': 'failure', 'message': 'Erreur interne du serveur'}), 500

  


# Route pour l'authentification
@app.route('/auth', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'])
def test_route():
    return jsonify({'message': 'Ceci est un message de test depuis l\'API.'})

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
    date_debut_promotion = request.form['date_debut_promotion']
    date_fin_promotion = request.form['date_fin_promotion']
    categorie_id = request.form['categorie_id']

    cursor = db_connection.cursor()

    try:
        cursor.execute("INSERT INTO produits (libelle, description, prix, prix_original, date_debut_promotion, date_fin_promotion, image_url, categorie_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;", 
                       (libelle, description, prix, prix, date_debut_promotion, date_fin_promotion, file_path, categorie_id))

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
            produits.prix_original, 
            produits.date_debut_promotion,
            produits.date_fin_promotion,
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
            'prix_original': produit[4],
            'date_debut_promotion': produit[5],
            'date_fin_promotion': produit[6],
            'image_url': produit[7],
            'categorie_id': produit[8],
            'categorie_libelle': produit[9],
            'statut_promotion': produit[10],
            'image': produit[11]
        }
        response.append(item)

    return jsonify(response)



@app.route('/filtre_produits', methods=['GET'])
@cross_origin(origins=['http://localhost:3000'])
def get_pantalon_produits():
    cursor = db_connection.cursor()
    categorie_id = request.args.get('categorie_id')

    # Build the base query
    query = '''
    SELECT 
        produits.id, 
        produits.libelle, 
        produits.description, 
        produits.prix,
        produits.prix_original, 
        produits.date_debut_promotion,
        produits.date_fin_promotion,
        produits.image_url, 
        produits.categorie_id, 
        categories.libelle_categorie,
        produits.statut_promotion, 
        produits.image 
    FROM produits 
    LEFT JOIN categories ON produits.categorie_id = categories.id
    '''

    # If categorie_id is provided, add a condition to the query
    if categorie_id:
        query += " WHERE categories.libelle_categorie = %s"
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
            'prix_original': produit[4],
            'date_debut_promotion': produit[5],
            'date_fin_promotion': produit[6],
            'image_url': produit[7],
            'categorie_id': produit[8],
            'categorie_libelle': produit[9],
            'statut_promotion': produit[10],
            'image': produit[11]
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


@app.route('/update-product-info', methods=['POST'])
def update_product_info():
    try:
        data = request.get_json()
        product_id = data['product_id']
        new_price = data['new_price']

        cursor = db_connection.cursor()
        # Mettre à jour à la fois le prix et le statut de promotion
        cursor.execute("UPDATE produits SET prix = %s, statut_promotion = true WHERE id = %s", (new_price, product_id))
        db_connection.commit()
        cursor.close()

        return jsonify({'message': 'Prix et statut de promotion mis à jour avec succès'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500




@app.route('/reset-product-price', methods=['POST'])
def reset_product_price():
    try:
        data = request.get_json()
        product_id = data['product_id']

        cursor = db_connection.cursor()

        # Récupérez la valeur de prix_original pour le produit donné
        cursor.execute("SELECT prix_original FROM produits WHERE id = %s", (product_id,))
        prix_original = cursor.fetchone()[0]

        # Mettez à jour la colonne "prix" avec la valeur de "prix_original"
        cursor.execute("UPDATE produits SET prix = %s WHERE id = %s", (prix_original, product_id))
        db_connection.commit()

        # Sélectionnez à nouveau le produit pour obtenir le prix original mis à jour
        cursor.execute("SELECT prix_original FROM produits WHERE id = %s", (product_id,))
        prix_original_mis_a_jour = cursor.fetchone()[0]

        cursor.close()

        return jsonify({'message': 'Prix réinitialisé avec succès', 'prix_original': prix_original_mis_a_jour}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



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


