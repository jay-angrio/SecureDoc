import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(private auth: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdetail') as string);
    console.log('user', this.user);
  }

  logOut() {
    let confirmation = confirm('Are you sure ??');
    if (confirmation) {
      this.auth
        .signOut()
        .then((res) => {
          localStorage.removeItem('signUpData');
          localStorage.removeItem('Login Data');
          localStorage.removeItem('userdetail');
          this.router.navigate(['']);
        })
        .catch((err) => {
          console.error('error signing out', err.message);
          alert('Error signing out, Please try again');
        });
    }
  }
}
