import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userDetails } from 'src/app/interface/model';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit {
  userEmail!: string;
  userPassword!: string;
  data!: userDetails;

  constructor(private auth: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('userDetail') as string);
    if (userData) {
      this.userEmail = userData.email;
      this.userPassword = userData.password;
    }

    if (userData) {
      this.data = {
        userId: '',
        email: userData?.email,
        firstName: userData?.fname,
        lastName: userData?.lname,
      };
    }

    this.onSignUp();
  }

  onSignUp() {
    console.log('email', this.userEmail, 'pass', this.userPassword);

    this.auth
      .signUpUser(this.userEmail, this.userPassword)
      .then((res: any) => {
        console.log('res', res);
        console.log('user id', res.data.user.id);
        this.addUserIntoDb(res.data.user.id);
        localStorage.setItem('idOfUser', res.data.user.id);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  addUserIntoDb(userId: string) {
    if (!userId) {
      return;
    }
    console.log('user id', userId);
    this.data.userId = userId;
    console.log('data id', this.data.userId);
    console.log('data', this.data);

    this.auth.addUser(this.data).then((res) => {
      if (this.data) {
        this.router.navigate(['/']);
        localStorage.removeItem('idOfUser');
        localStorage.removeItem('userDetail');
      }
    });
  }
}
