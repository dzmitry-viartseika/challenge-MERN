import {IStorageInterface} from "../ts/interfaces/IStorageInterface";

class StorageFactory {
  private readonly storage: IStorageInterface

  readonly namespace: string

  private storageMap: Record<string, IStorageInterface> = {
    localStorage: localStorage,
    sessionStorage: sessionStorage,
  }

  constructor(
    namespace: string,
    storageType: keyof StorageFactory['storageMap'],
  ) {
    this.namespace = namespace
    this.storage = this.storageMap[storageType]

    if (!this.storage) {
      throw new Error('Invalid storage type')
    }
  }

  getStorage(name: string): string | null {
    return this.storage.getItem(name)
  }

  setStorage(name: string, value: any) {
    this.storage.setItem(name, value)
  }

  removeStorage(name: string) {
    this.storage.removeItem(name)
  }
}

export default function FactoryStorageData(namespace: string, storage: string) {
  return new StorageFactory(namespace, storage)
}
