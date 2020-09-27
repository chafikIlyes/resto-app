import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {


  url = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  saveUser(data) {

    return this.http.post(this.url, data)
  }

}

