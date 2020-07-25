import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  constructor(private _formBuilder: FormBuilder, private _router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    //console.log(this.loginForm.value)
    this.authService.setCredentials(this.loginForm.value.username, this.loginForm.value.password)
    this._router.navigateByUrl('/dashboard')
  }

  getStatus(ctrl: string) {
    return this.loginForm.controls[ctrl].touched ? (this.loginForm.controls[ctrl].invalid ? 'is-invalid' : 'is-valid' ): '';
  }
}
