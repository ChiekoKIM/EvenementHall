import type { Config } from "../types/Config.type";

export abstract class StorageProvider {
  abstract save(object: Config): Config[]
}
