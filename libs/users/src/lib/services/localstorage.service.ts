/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

// const TOKEN = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {


  constructor() { }

  setToken(data: any){
    localStorage.setItem('token', data)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token')
  }
}
