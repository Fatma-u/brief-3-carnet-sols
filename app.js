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
      const texture=saisie.toLowerCase();
      const trouve=filtrerParTexture(observations, texture);
      console.log(`${trouve.length} observation(s) sur la texture ${texture}:`);
      console.log(listerObservations(trouve));
      break;
    }
    default :
    console.log('Choix inconnu: retour au menu');

  }
}
//Choix 4 : Trier par pH
  async function trier(observations){
    console.log('---------Trier par pH------------');
    console.log('1-Par ordre croissant');
    console.log('2-Par ordre décroissant');
    const sousChoix=await demander('Votre choix:');
    if(sousChoix ===null){
        return;
      }
    switch(sousChoix){
      case'1':{
        console.log(listerObservations((trierParPh(observations))));
        break;
      }
      case '2':{
        console.log(listerObservations((trierParPhDecroissant(observations))));
        break;
      }
      default:
        console.log('Choix inconnu: retour au menu');
    }
  }
  //Choix 5 : Synthèse des observations
async function synthese(observations){
    console.log('-----------Synthèse des observations--------------');
    console.log(`Nombre d'observations :${observations.length}`);
    const bornes=phMinMax(observations);
    if(bornes===null){
      console.log('pHminimum et maximum :aucune donnée');
    }
    else{
      console.log(`pH minimum: ${bornes.min} .pH maximum : ${bornes.max}`);
    }
    console.log('Observations par texture :');
    for(const [texture,nombre] of Object.entries(compterParTexture(observations))){
      console.log(`${texture}:${nombre}`);
    }
    const frequente=Object.entries(textureLaPlusFrequente(observations));
    if(frequente===null){
      console.log('Texture la plus fréquente : aucune donnée');
    }
    else{
      console.log(`Texture la plus fréquente :${frequente}`);
    }
    const aDiscuter=pointsADiscuter(observations,SEUIL_PH_A_DISCUTER);
    console.log(`Point à discuter avec le coach (pH < ${SEUIL_PH_A_DISCUTER}):${aDiscuter.length}`);
    for(const observation of aDiscuter){
      console.log(`${formaterObservation(observation)}`);
    }
    console.log('Rappels : le pH est sans unité. Aucune moyenne de pH n\'est calculée (échelle logarithmique).');
    console.log('Ces points ne sont pas un diagnostic de fertilisation : ils servent à préparer l\'échange avec le coach');

}
//Choix 6: Supprimer une observation
async function supprimer(observations){
  console.log('----------------Supprimer une observation------------------');
  const saisie=await demander('Point à supprimer:');
  if(saisie===null){
    return;
  }
  const id =saisie.toUpperCase();
  if(trouverParId(observations,id)===undefined){
     console.log(`L'observation ${id} est introuvable`);
     return;
  }
  const confirmation=await demander(`Confirmer la suppression de ${id} (o/n):`);
  if(confirmation===null|| confirmation.toLowerCase()!=='o'){
    console.log('Suppression annulée');
    return;
  }
  supprimerObservation(observations,id);
  await enregistrerJson(FICHIER_DONNEES,observations);
  console.log(`Observation ${id} supprimé. Le carnet compte ${observations.length} observation(s).`);
}
//Choix 7: Modifier une observation
async function modif(observations){
  console.log('------------------Modifier une observation---------------------');
  const saisie=await demander('Point à modifier:');
  if(saisie===null){
    return;
  }
  const id =saisie.toUpperCase();
  const observation=trouverParId(observations,id);
  if(observation===undefined){
     console.log(`L'observation ${id} est introuvable`);
     return;
  }
  console.log(formaterObservation(observation));
  console.log('Champ à modifier:');
  console.log('1. Parcelle');
  console.log('2. Texture');
  console.log('3. pH');
  console.log('4.Etat d\'humidité');
  const choixChamp=await demander('Votre choix:');
  if(choixChamp===null){
    return;
  }
  let champ;
  let invite;
  switch(choixChamp){
    case '1':{
      champ='parcelle';
      invite='Nouvelle parcelle:';
      break;
    }
    case '2':{
      champ='texture';
      invite=`Nouvelle texture:(${TEXTURES.join(',')}):`;
      break;
    }
    case '3':{
      champ='pH';
      invite='Nouveau pH :';
      break;
    }
    case '4':{
      champ='etatHumidite';
      invite=`Nouvelle humidité:(${HUMIDITES.join(',')}):`;
      break;
    }
    default:{
      console.log('Choix inconnu: retour au menu');
      return;
    }
  }
  const saisieValeur=await demander(invite);
  if(saisieValeur===null){
    return;
  }
  let valeur=saisieValeur;
  if(champ==='parcelle'){
    valeur=saisieValeur.toUpperCase();
  }
  else if(champ==='texture' || champ==='etatHumidite'){
    valeur=saisieValeur.toLowerCase();
  }
  const erreurs=modifierObservation(observations, id, champ, valeur);
  if(erreurs.length>0){
    console.log('Modification réfusée:');
    for (const erreur of erreurs){
      console.log(`${erreur}`);
    }
  return;
  }
  await enregistrerJson(FICHIER_DONNEES,observations);
  console.log(`Observation ${id} à été modifiée`);
  }
//--------------------Programme principal---------------------
async function main() {
  ouvrirSaisie();
  afficherAccueil();

  let observations=[];
  try{
    observations=await chargerJson(FICHIER_DONNEES);
    console.log(`${observations.length} observation(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  }
  catch(erreur){
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le carnet démarre vide.`);
    observations=[];
  }
  let continu=true;
  while(continu){
    afficherMenu();
    const choix=await demander('Votre choix: ');
    //Saisie fermée (contrôle C):on quitte
    if(choix===null){
      break;
    }
    try{
      switch(choix){
        case'1':{
          await ajouter(observations);
          break;
        }
        case'2':{
          await lister(observations);
          break;
        }
        case'3':{
          await rechercher(observations);
          break;
        }
        case'4':{
          await trier(observations);
          break;
        }
        case'5':{
          await synthese(observations);
          break;
        }
        case '6':{
          await supprimer(observations);
          break;
        }
        case '7':{
          await modif(observations);
          break;
        }
        case'0':{
          console.log('Au revoir!');
          continu=false;
          break;
        }
        default:{
          console.log(`Le choix ${choix},Tapez un numéro du menu`);
        }
    }

  }
  catch(erreur){
    //Aucune erreur n'arrête le programme ,on renvoi toujours le Menu
    if(String(erreur.message).startsWith('TODO')){
      console.log(`A completer: ${erreur.message}`);
    }
    else{
      console.log(`Erreur inattendu:${erreur.message}`);
    }
    }

}
fermerSaisie();

}
main();

