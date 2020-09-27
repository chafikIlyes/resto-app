import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { UserService } from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  addUser = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl('')
  })
  alert: boolean = false;
  
  constructor(private userService :UserService) { }

  ngOnInit(): void {
  }

  collectUser() {

    this.userService.saveUser(this.addUser.value).subscribe((result) => {
      console.warn("result is here", result)
    })
    this.alert = true
    this.addUser.reset({})
  }
  closeAlert() {
    this.alert = false;

  }

}
