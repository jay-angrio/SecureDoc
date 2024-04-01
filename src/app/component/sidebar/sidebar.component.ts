import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onHome() {
    this.router.navigate(['/main/home']);
  }

  onDashboard() {
    this.router.navigate(['/main/dashboard']);
  }

  onAbout() {
    this.router.navigate(['/main/about']);
  }

  onContact() {
    this.router.navigate(['/main/contact']);
  }
}
