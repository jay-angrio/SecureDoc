import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { LoadingScreenComponent } from './component/loading-screen/loading-screen.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MainComponent } from './component/main/main.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { AuthanticationGuard } from './service/authantication.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'loading',
    component: LoadingScreenComponent,
  },

  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthanticationGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
