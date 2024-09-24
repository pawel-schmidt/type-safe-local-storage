export class CustomStorage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public get(): T | null {
    try {
      const data = localStorage.getItem(this.key);
      if (!data) return null;

      return JSON.parse(data) as T;
    } catch (error) {
      throw new Error(`Failed to retrieve item from storage for key ${this.key}`);
    }
  }

  public set(item: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(item));
    } catch (error) {
      throw new Error('Failed to set item in storage for key ${this.key}');
    }
  }

  public clear(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      throw new Error('Failed to clear item from storage for key ${this.key}');
    }
  }
}
