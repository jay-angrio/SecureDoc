import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { document } from 'src/app/interface/model';
import { SupabaseService } from 'src/app/service/supabase.service';
import { environment } from 'src/environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pdfSrc!: SafeResourceUrl;
  fileInput!: any;
  imgPath = environment.imgPath;
  selectOption: any;
  passwordOption: any;
  documents: any;
  hide = true;
  id: any;
  option: any;
  supaPath: any;
  urlId: any;
  urlGet: string = '';
  showLoader: boolean = false;

  document!: document;
  constructor(
    private auth: SupabaseService,
    private sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private clipboard: Clipboard
  ) {}

  seasons: string[] = ['Email', 'Password'];

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('userdetail') as string);
    this.id = user?.userId;
  }

  openGallery() {
    this.fileInput = document.getElementById('fileInput') as HTMLInputElement;
    this.fileInput.click();
    // click() was use for open gallery of pc
  }

  handleFileInput(event: any) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];

    let name = 'idProof' + new Date().getTime() + file.name;

    if (file.size <= 10 * 1024 * 1024) {
      this.auth
        .uploadImage('application/' + name, file)
        .then((res: any) => {
          console.log('res', res);
          this.supaPath = res;
          this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.imgPath + res
          );
          console.log('res', this.pdfSrc);
          console.log('path of image', this.imgPath + this.pdfSrc);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }

  onBtnClick() {
    this.openGallery();
  }

  onGetUrl() {
    if (this.selectOption === 'Password') {
      this.option = this.passwordOption;
    } else {
      this.option = this.selectOption;
    }
    console.log('selected option', this.option);

    this.document = {
      userId: this.id,
      pdfSrc: this.imgPath + this.supaPath,
      lock: this.option,
      lock_type: this.selectOption,
    };

    this.auth.addData(this.document).then((res) => {
      console.log('data', res);

      if (res?.data) {
        this.urlGet =
          'https://dochub-e5625.web.app/view-documnet/' + res?.data[0]?.id;
      }
    });
  }

  copyUrl(url: string) {
    if (url) {
      this.clipboard.copy(url);
      if (this.clipboard.copy(url)) {
        alert('Link Copied');
      }
    }
  }
}
