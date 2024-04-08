import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { filesData } from 'src/app/interface/model';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pdfUrl!: string;
  id!: string;
  userData!: filesData[];
  constructor(
    private supabase: SupabaseService,
    private sanitizer: DomSanitizer,
    private aRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let userData = JSON.parse(localStorage.getItem('userdetail') as string);
    this.id = userData.userId;
    console.log('id', this.id);

    this.supabase.getDocuments(this.id).then((res) => {
      console.log(res, 'res');
      if (res?.data) {
        this.userData = res?.data;
        console.log('user data', this.userData);
      }
    });
  }
  ValidateUrl(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onOpen() {
    this.router.navigate(['/view-document'], { queryParams: {} });
  }
}
