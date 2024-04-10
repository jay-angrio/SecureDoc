import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { filesData } from 'src/app/interface/model';
import { SupabaseService } from 'src/app/service/supabase.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss'],
})
export class ViewDocumentComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  data!: filesData;
  urlId: any;
  isLock: boolean = false;
  dialogRef!: MatDialogRef<any>;
  dialogResullt: any;
  showError: boolean = false;
  emailDialog: any;
  passwordInput: any;
  hide = true;

  constructor(
    private supabase: SupabaseService,
    private sanitizer: DomSanitizer,
    private aRoutes: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.urlId = this.aRoutes.snapshot.params['id'];
    console.log('id user', this.urlId);

    await this.supabase.getDocumentId(this.urlId).then((res) => {
      console.log('res', res);
      if (res.data) {
        this.data = res.data[0];
      }
    });

    this.openDialog();

    // this.openDialog();
  }

  ValidateUrl(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onReload() {
    this.openDialog();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(
      this.dialogTemplate, // Path to the dialog template HTML file
      {
        width: '250px',
      }
    );
  }

  onOk() {
    // console.log(
    //   'dialogResult: ' + this.passwordInput,
    //   'data lock value: ' + this.data.lock
    // );
    // if (this.passwordInput === this.data.lock) {
    //   this.dialogRef.close(this.dialogResullt);
    //   this.isLock = true; // Pass the value of the input field when closing the dialog
    // } else {
    //   this.showError = true; // Display error message
    // }

    if (this.data.lock_type == 'Password') {
      if (this.passwordInput === this.data.lock) {
        this.dialogRef.close(this.passwordInput);
        this.isLock = true; // Pass the value of the input field when closing the dialog
      } else {
        this.showError = true; // Display error message
      }
    } else {
      if (this.emailDialog) {
        console.log('email', this.emailDialog);
        this.dialogRef.close(this.emailDialog);

        this.isLock = true; // Pass the value of the input field when closing the dialog
      } else {
        this.isLock = true;
      }
    }
  }

  onEmail(value: any) {
    console.log('value', value);
  }
}
