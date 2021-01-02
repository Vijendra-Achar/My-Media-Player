import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  loading: boolean = false;

  authErrors: any;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authSerivce: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.authSerivce.$authErrors.subscribe((errors) => {
      this.authErrors = errors;
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.loading = true;
    this.authSerivce.login(this.email.value, this.password.value).then(() => {
      this.loading = false;
    });
  }
}
