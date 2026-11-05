# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. ✏️

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action                     | Attendu         | Obtenu                      | Testeur                |
|-------------------------- -|-----------------|-----------------------------|------------------------|
|Recherche texture 'limoneux'|S02,S05,S07,S10  |S02,S05,S07,S10              |Kamagaté Salia Abdallah |
|Lister des observations     |S01-S10          |S01-S10                      |Kamagaté Salia Abdallah |
|Recherche par parcelle      |S05,S06          |S05,S06                      |Kamagaté Salia Abdallah |
|Trier par pH décroissant    |S08-S04          |S08-S04                      |Kamagaté Salia Abdalla  |
|Synthèse des observation    |S01,S04,S06,S09  |Changement du pH en 13.2     |Kamagaté Salia Abdallah |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : TheKingSalia
