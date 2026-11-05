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

✏️ *Le fichier, le nombre d'observations, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), le pH sans unité. Rappelez qu'elles sont fictives.*

## Limites

✏️ *Au moins trois. Par exemple : le carnet repère des valeurs à discuter, mais ne produit aucun diagnostic de fertilisation.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
