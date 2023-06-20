import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import * as bcrypt from 'bcryptjs'
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private route: ActivatedRoute,
    private router: Router){}
  pass = localStorage.getItem('password')
  user = localStorage.getItem('username')
  isLogin = false
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  login() {
    let usernameForm = this.loginForm.value.username
    let passwordForm = this.loginForm.value.password?this.loginForm.value.password : ' '
    let password = localStorage.getItem('password')
    let isPassword = bcrypt.compareSync(passwordForm, password?password:"")
    let isUsername = usernameForm === localStorage.getItem('username')
    this.isLogin = isPassword && isUsername
    console.log("login ::: " + this.isLogin);
    if (!this.isLogin) {
      alert("Sai tên đăng nhập hoặc mật khẩu")
    }
  }

  logout() {
    this.isLogin = false
  }

  delete() {
    localStorage.clear()
    this.ngOnInit()
  }

  checkRegister() {
    console.log("Local:::" + localStorage.getItem('username'));
    
    return localStorage.getItem('username') != null && localStorage.getItem('password') != null
  }
  ngOnInit(): void {
    if (!this.checkRegister()) {
      this.router.navigate(['/register'])
    }
  }
}
