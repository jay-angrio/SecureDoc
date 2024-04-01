import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginDetail: any;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private auth: SupabaseService,
    private router: Router
  ) {
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

  onLoginSubmit() {
    this.auth.signInUser(this.loginDetail.value).then((res) => {
      console.log('res', res);

      if (res.error == null) {
        this.auth.getUserId(res.data.user.id).then((user: any) => {
          this.auth.login = true;
          localStorage.setItem('userdetail', JSON.stringify(user?.data[0]));
          this.router.navigate(['/main/home']);
        });
      } else {
        alert(res.error.message);
      }
    });
  }
}
