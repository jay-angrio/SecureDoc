import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/service/supabase.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerDetail: any;
  hide = true;
  userId: any;
  constructor(
    private fb: FormBuilder,
    private auth: SupabaseService,
    private router: Router
  ) {
    this.registerDetail = fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
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

  onRegisterSubmit() {
    localStorage.setItem(
      'userDetail',
      JSON.stringify(this.registerDetail.value)
    );

    this.router.navigate(['/loading']);
  }
}
