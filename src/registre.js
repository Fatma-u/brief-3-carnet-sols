// Ajouter et lister les observations de sol.
// Fiche : fiches/3-ajouter-lister.md · Vérifier : npm run test:registre
import { versNombre } from './outils.js';

// Listes fermées des classes d'exercice, validées par le coach agronomie.
export const TEXTURES = ['sableux', 'limoneux', 'argileux'];
export const HUMIDITES = ['sec', 'intermédiaire', 'humide'];

// Renvoie une ligne de texte qui décrit l'observation.
// Exemple : 'S01 | P1 | sableux | pH 5.2 | sec'
export function formaterObservation(observation) {
  return `${observation.id} | ${observation.parcelle} | ${observation.texture} | pH ${observation.pH} | ${observation.etatHumidite}`;
}

// Renvoie un texte avec une observation par ligne (lignes séparées par '\n'),
// ou 'Aucune observation enregistrée.' si la liste est vide.
export function listerObservations(observations) {
  if (observations.length===0){
  return `Aucune observation enregistrée.`;
 }
 else{
  return observations.map(formaterObservation).join('\n');
 }
}

// Renvoie l'observation qui a cet identifiant de point, ou undefined si elle n'existe pas.
export function trouverParId(observations, id) {
 return observations.find(observations=>observations.id===id);
}

// Contrôle une saisie AVANT de l'ajouter. Tous les champs arrivent sous forme de TEXTE :
// { id: 'S11', parcelle: 'P6', texture: 'limoneux', pH: '5,8', etatHumidite: 'humide' }
// Renvoie un tableau de messages d'erreur, un message par règle non respectée ;
// un tableau vide signifie « saisie valide ».
// Règles : id obligatoire et unique · parcelle obligatoire (n'importe quel texte non vide)
// · texture présente dans TEXTURES · pH nombre entre 0 et 14 (bornes comprises)
// · etatHumidite présent dans HUMIDITES. N'ajoutez aucune autre règle que celles-ci.
export function verifierObservation(saisie, observations) {
  const erreur=[];
  if(!saisie.id){
    erreur.push(`id est obligatoire`);
  }
  else {
    for(const obs of observations){
      if(obs.id===saisie.id){
        erreur.push(`Cet id existe déjà veuillez en entrer un autre`);
      }
    }
  }
  if(!TEXTURES.includes (saisie.texture)){
    erreur.push(`Veuillez entrer une texture valide svp :${TEXTURES}`);
  }
  else{
    observations.texture=saisie.texture;
  }
  if(saisie.parcelle.trim===''){
    erreur.push(`Veuillez entrer svp une parcelle`);
  }
  const p=Number((saisie.pH).replace(',', '.'));
  if( p<0 || p>14 || isNaN(p) || saisie.pH ===''){
    erreur.push(`Veuillez utiliser un ph valide entre 0 et 14`);
  }
  if(!HUMIDITES.includes(saisie.etatHumidite)){
    erreur.push(`Veuillez enter une humidité valide:${HUMIDITES}`);
  }

  return erreur;
}

// Fabrique l'observation à enregistrer à partir d'une saisie VALIDE : pH devient un nombre.
export function creerObservation(saisie) {
  const val={...saisie};
  val.pH=Number((saisie.pH).replace(',', '.'));
  return val;
}

// Ajoute la saisie au carnet si elle est valide (verifierObservation, puis creerObservation).
// Renvoie les erreurs : [] si l'observation a été ajoutée ; sinon les messages, et rien n'est ajouté.
export function ajouterObservation(observations, saisie) {
  const erreurs=verifierObservation(saisie,observations);
  if (erreurs.length>0){
    return erreurs;
  }
  const observation=creerObservation(saisie);
  observations.push(observation);
  return [];
}
