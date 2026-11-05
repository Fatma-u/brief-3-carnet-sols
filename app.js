// Carnet d'observation des sols — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { HUMIDITES, TEXTURES, ajouterObservation, formaterObservation, listerObservations, trouverParId } from './src/registre.js';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from './src/recherche.js';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from './src/synthese.js';
import { trierParPhDecroissant,textureLaPlusFrequente,modifierObservation,supprimerObservation} from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/observations.json';

//-------------------------AFFICHAGE-------------------                       

function afficherAccueil(){
console.log('==================================================');
console.log('                Ferme pédagogique                 ');
console.log('==================================================');
}
function afficherMenu(){
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter une observation');
  console.log('2. Lister les observations');
  console.log('3. Rechercher (point , parcelle, texture)');
  console.log('4. Trier par pH');
  console.log('5. Synthèse des observations');
  console.log('6.Supprimer une observation');
  console.log('7.Modifier une observation');
  console.log('0. Quitter');
}
//-------------------------ACTIONS----------------------

//Choix 1:Pour les 5 questions ,ajouter,enregistrer
async function ajouter(observations) {
  console.log(' Ajouter une observation');
  const id=await demander('Identifiant du point,(exp:S13)');
  if(id===null){ 
    return ;
  } 
  const parcelle=await demander('Parcelle,(exp:P3)');
  if(parcelle===null){
    return;
  }
  const texture=await demander(`texture (${TEXTURES.join(',')}): `);
  if(texture===null){
    return;
  }
  let pH=await demander('pH(nombre de 0 à 14,sans unité,virgule acceptée):');
  if(pH===null){
    return;
  }
  const etatHumidite=await demander(`Etat d'humidité(${HUMIDITES.join(',')}):`);
  if(etatHumidite===null){
    return;
  }
//Normalisation avant vérification: majuscules pour le point et la parcelle,
//miniscules pour la texture et l'état d'humidité ,le pH reste tel quel.
const saisie={
  id:id.toUpperCase(),
  parcelle:parcelle.toUpperCase(),
  texture:texture.toLowerCase(),
  pH,
  etatHumidite:etatHumidite.toLowerCase()
};
const erreurs=ajouterObservation(observations,saisie);
if(erreurs.length > 0){
  console.log('Observation refusée:');
  for(const erreur of erreurs){
    console.log(`${erreur}`);
  }
  console.log(`Le carnet compte toujours ${observations.length} observation(s).`);
  return ;
}
await enregistrerJson(FICHIER_DONNEES,observations);
console.log(`Observation ${saisie.id} ajoutée. Le carnet compte ${observations.length} observation(s).`); 
}
//Choix 2:Lister 
function lister(observations){
  console.log(`------Liste des observations (${observations.length})-----`);
  console.log(listerObservations(observations));
}
//Choix 3: Rechercher par point,parcelle et texture
async function rechercher(observations){
  console.log('');
  console.log('-------------------RECHERCHER------------');
  console.log('1. Par point(Identifiant)');
  console.log('2. Par parcelle');
  console.log('3. Par observation texture');

  const sousChoix =await demander('Votre choix:');
  if(sousChoix === null){ 
    return ;
  }
  switch(sousChoix){
   
    case'1':{
      const saisie=await demander('Point :');
      if(saisie===null){
        return;
      }
      const id=saisie.toUpperCase();
      const observation=trouverParId(observations,id);
      console.log(observation===undefined ? `observation ${id} introuvable.`:formaterObservation(observation));
      break;
    }

    case'2':{
      const saisie=await demander('Parcelle :');
       if(saisie===null){
        return;
       }
      const parcelle=saisie.toUpperCase();
      const trouve=filtrerParParcelle(observations, parcelle);
      console.log(`${trouve.length} observation(s) sur la parcelle ${parcelle} :`);
      console.log(listerObservations(trouve));
      break;
    }
    case'3':{
      const saisie=await demander('Texture:');
       if(saisie===null){
        return;
       }
      const trouve=filtrerParTexture(observations,texture);
      console.log(`${trouve.length} observation(s) sur la texture ${texture}:`);
      console.log(listerObservations(trouve));
      break;
    }
    default :
    console.log('Choix inconnu: retour au menu');

  }
}


fermerSaisie();

main();
