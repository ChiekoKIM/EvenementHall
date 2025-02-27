import { StorageProvider } from "./StorageProvider";
import { saveToLocalStorage } from "../services/saveTLS";

import type { Config } from "../types/Config.type";

export class LocalStorageProvider extends StorageProvider {
  save(config: Config): Config [] {

    const stringData = saveToLocalStorage(config)

    if(!stringData) return []
    const finalData: Config[] = JSON.parse(stringData)
    return finalData
  }

}
