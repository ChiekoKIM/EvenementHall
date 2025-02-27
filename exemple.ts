// `
// import { StorageProvider } from "./StorageProvider";

// export abstract class StorageProvider {
//     save(object: Config): Config [];
// }

// *
//

// class LocalStorageProvider extends StorageProvider {
//     save(config: Config):Config[] {
//         const stringData = config.toString();

//         localStorage.set('data', stringData)

//         const allData: string = localStorage.getItem('data')

//         const finalData: Config[] = JSON.parse(allData)
//         return finalData;
//     };
// }


// class SQLStorageProvider extends StorageProvider{
//     save(config: Config):Config[] ;
// }

// class FirebaseStorageProvider extends StorageProvider {
//     save(config: Config):Config[] {
//         // Je fais des truc pour enregistrer sur firebase
//         // Je fais ce qu'il fazut poru retourner les données à la bonne forme
//         return finalData;
//     };
// }
