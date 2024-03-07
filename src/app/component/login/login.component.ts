import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginDetail: any;
  hide = true;
  constructor(private fb: FormBuilder) {
    this.loginDetail = fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onLoginSubmit() {}
}
