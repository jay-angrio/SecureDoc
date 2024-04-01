import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    this.router.navigate(['/']);
  }
}
