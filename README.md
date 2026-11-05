# Carnet d'observation des sols

> Projet individuel du SAS DFS, brief 3 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

Mise en place d'un carnet d'observation des sols en JavaScript, avec Node.js regroupant les données rélévés sur une ferme pédagogique.
Il permet de conserver les observations, de trouver les points concernés et de repérer les valeurs à vérifier avec le coach,
à partir de l'observation d'un point avec la fiche de terrain, en renseignant une classe de texture et une valeur de pH, puis en relier ces observations aux interactions entre l'eau, le sol et la plante.


## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git
cd brief-3-carnet-sols
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/observations.json`
- [x] Ajouter une observation, saisies invalides refusées sans arrêter le programme
- [x] Lister les observations, message si le carnet est vide
- [x] Rechercher par point ou par parcelle ; filtrer par texture
- [x] Trier par pH
- [x] Synthèse : pH minimum et maximum, nombre par texture, points à discuter (pH < 5,5)
- [x] Bonus : supprimer et modifier une observation (choix 6 et 7)
- [x] Bonus : tri par pH décroissant, texture la plus fréquente

## Données

Le nombre d'observations: 10;

les champs:

-id:Identifiant unique du point d'observation de type texte non vide.

-parcelle:Portion de terre où se trouve le point de type texte nom vide et enregistrée en majuscules.

-texture:Le type de sol observé de type texte	appartenant à la liste de textures (limoneux,argileux,sableux).

-pH:Assidité du sol sans unité de type nombre compro
is entre 0 et 14 avec virgule acceptée.

-etatHumidite:Etat d'humidité du sol au relévé de type texte appartenant à la liste des états autorisés(sec,humide et intermédiare).

Ces données étant fictives.


## Limites

-Lorqu'on entre un champ invalide(exp:id) le programme ne s'arrête pas directement ,il renvoi l'erreur que lorsque toutes les questions on été répondus.

-Les données doivent être toute saisies par l'utilisateur

-On ne connait pas vraiment le sueil du pH pour prendre des décisions adaptées.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

 Fatoumata KONE, Fatma-u.
 Entraide : Toure Emmanuel :la logique des fonctions;
    
Fofana Fanta Latifat:Pour la compréhension du sujet agronomique 
  
Kamagaté Salia Abdallah pour les tests 
