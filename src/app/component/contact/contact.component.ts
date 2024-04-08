import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactus: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactus = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      about: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('value', this.contactus);
    // if (this.contactus) {
    this.http
      .post('https://formspree.io/f/xvoevkkk', this.contactus.value)
      .subscribe((res) => {
        console.log('res', res);
      });
    // }
  }
}
