import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http : HttpClient) { }

  postBankAccount(formData){

     return this.http.post(environment.apiBaseURI+'/BankAccount',formData)

  }

  getBankAccountList(){

    return this.http.get(environment.apiBaseURI+'/BankAccount')

  }

  putBankAccount(formData){

    return this.http.put(environment.apiBaseURI+'/BankAccount/'+formData.id,formData)

 }

 deleteBankAccount(id){

  return this.http.delete(environment.apiBaseURI+'/BankAccount/'+id)

}
}
