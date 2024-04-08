import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { filesData } from 'src/app/interface/model';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss'],
})
export class ViewDocumentComponent implements OnInit {
  data!: filesData;
  urlId: any;

  constructor(
    private supabase: SupabaseService,
    private sanitizer: DomSanitizer,
    private aRoutes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlId = this.aRoutes.snapshot.params['id'];
    console.log('id user', this.urlId);

    this.supabase.getDocumentId(this.urlId).then((res) => {
      console.log('res', res);
      if (res.data) {
        this.data = res.data[0];
      }
    });
  }

  ValidateUrl(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
