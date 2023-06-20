import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import * as bcrypt from 'bcryptjs'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private route: ActivatedRoute,
    private router: Router){}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  register() {
    const salt = bcrypt.genSaltSync(10);
     
    var hashPassword = bcrypt.hashSync(this.loginForm.value.password?this.loginForm.value.password:"" , salt);
    localStorage.setItem('username', this.loginForm.value.username?this.loginForm.value.username:"")
    localStorage.setItem('password', hashPassword)
    this.router.navigate(['/login'])
  }
}
