import { StorageProvider } from "./StorageProvider";
import { saveConfig } from "../services/save";

import type { Config } from "../types/Config.type";

export class LocalStorageProvider extends StorageProvider {
  save(config: Config): Config [] {

    const stringData = saveConfig(config)

    if(!stringData) return []
    const finalData: Config[] = JSON.parse(stringData)
    return finalData
  }

}
