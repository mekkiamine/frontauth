import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl= "http://localhost:3000";
  constructor(private httpClient : HttpClient) { }
   
  public authenticateGoogle(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });
    const options = { headers: headers,withCredentials:true };
    return this.httpClient.get(this.apiUrl + '/auth/google', options);
  }

  
  public loginUser(){
    return this.httpClient.get(this.apiUrl+'')
  }
}










