import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static setItem(key: string, data: any) {
    let value = data;
    if (data instanceof Object) {
      value = JSON.stringify(data);
    }


    localStorage.setItem(key, value);

    return localStorage.getItem(key);
  }

  static getItem(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (error) {
      return localStorage.getItem(key);
    }
  }


}
