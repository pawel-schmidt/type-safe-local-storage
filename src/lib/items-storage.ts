import { Item } from '../types';
import { CustomStorage } from './custom-storage';
import { isValidItemArray, isValidItem } from '../utils';

const STORAGE_ITEMS_KEY = 'items';

class ItemsStorage {
  private static instance: ItemsStorage;
  private storage: CustomStorage<Item[]>;

  private constructor() {
    this.storage = new CustomStorage<Item[]>(STORAGE_ITEMS_KEY);
  }

  public static getInstance(): ItemsStorage {
    return this.instance ?? (this.instance = new ItemsStorage());
  }

  public getItems(): Item[] | null {
    try {
      const items = this.storage.get() ?? [];
      if (!isValidItemArray(items)) {
        throw new Error('Invalid items');
      }

      return items;
    } catch (error: unknown) {
      this.logError(error);
      return null;
    }
  }

  public setItem(item: Item): void {
    try {
      if (!isValidItem(item)) {
        throw new Error('Invalid item fields');
      }

      const currentItems = this.storage.get() ?? [];
      if (!isValidItemArray(currentItems)) {
        throw new Error('Invalid items');
      }

      const items: Item[] = [...currentItems, item];
      this.storage.set(items);
    } catch (error: unknown) {
      this.logError(error);
    }
  }

  public clearItems(): void {
    try {
      this.storage.clear();
    } catch (error: unknown) {
      this.logError(error);
    }
  }

  private logError(error: unknown): void {
    let errorMessage = 'An error occurred in ItemsStorage';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    console.error(errorMessage);
  }
}

export const itemsStorage = ItemsStorage.getInstance();
