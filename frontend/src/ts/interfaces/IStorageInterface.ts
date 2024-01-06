export interface IStorageInterface {
    getItem(key: string): string | null
    setItem(key: string, value: any): void
    removeItem(key: string): void
}