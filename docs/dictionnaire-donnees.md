# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ        | Signification                               | Type  | Règle de validation                  | Unité | Exemple |
|--------------| --------------------------------------------|------ | -----------------------------        | ------| --------|
| `id`         | Identifiant unique du point d'observation   | texte |non vide, absent des données          |   —   | S13     |
|`parcelle    `|Portion de terre où se trouve le point       | texte |nom vide,enregistrée en majuscules    |   —   | P25     |
|`texture`     |Le type de sol observé                       | texte |Appartenir à liste de textures        |   —   |sableux  |
| `pH`         |Assidité du sol                              | nombre|Compris[0,14] avec virgule acceptée   |sans unité| 5,2  |
|`etatHumilite`|Etat d'humidité du sol au relévé             | texte |Appartenir à liste des états autorisés|   —      |  sec |

**Listes de valeurs autorisées** : 
textures=[sableux,limoneux,argileux]
etatHumilite=[sec,humide,intermédiaire]

**Sources** : SUJET.md ,donnees\observations.json