import { inject, Injectable, InjectionToken } from '@angular/core';

export const STORAGE_SERVICE = new InjectionToken<StorageService>(
  'StorageService',
  {
    providedIn: 'root',
    factory: () => inject(StorageService),
  }
);

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
