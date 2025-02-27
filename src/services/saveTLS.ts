import type { Config } from "../types/Config.type";
import { StorageProvider } from "../providers/StorageProvider";
import { LocalStorageProvider } from "../providers/LocalStorageProvider";


export function saveToLocalStorage(objects: any) {

  if (objects.length === 0){
    alert("Aucun objet à sauvegarder !")
    return;
  }

  const name = prompt("Nom de la configuration du canvas :")
  if (!name) return;

  // Récupérer les configurations existantes
  let saved = localStorage.getItem("savedCanvases")
  let savedCanvases = saved ? JSON.parse(saved) : []

  // Vérifier si un canvas avec ce nom existe déjà
  const nameExists = savedCanvases.some((config: any) => config.name === name)
  if (nameExists) {
    alert("Une configuration avec ce nom existe déjà. Veuillez choisir un autre nom.")
    return;
  }

  // Créer une configuration avec un ID unique
  const newConfig = {
    id: Date.now(),
    name,
    objects: [...objects], // Sauvegarde une copie des objets actuels
  };

  // Ajouter la nouvelle configuration et sauvegarder
  savedCanvases.push(newConfig)
  console.log(savedCanvases)

  const providerContext = {
    localStorage: LocalStorageProvider
  }

  if(providerContext.localStorage) {
    localStorage.setItem("savedCanvases", JSON.stringify(savedCanvases))
    alert("Configuration sauvegardée !")
  }

  return JSON.stringify(savedCanvases)

  ; // Enregistrement dans LocalStorage


}
