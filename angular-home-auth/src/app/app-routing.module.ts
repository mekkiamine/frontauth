import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupRoleComponent } from './signup-role/signup-role.component';
import { HomeComponent } from './home/home.component';
import { SignupFormateurComponent } from './signup-formateur/signup-formateur.component';
import { RedirectComponent } from './redirect/redirect.component';
import { GoogleSignUpComponent } from './google-sign-up/google-sign-up.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'signup-role', component:SignupRoleComponent},
  {path:'home', component:HomeComponent},
  {path:'signup-f', component:SignupFormateurComponent},
  {path:'redirect',component:RedirectComponent},//component where it redirects from backend after autheticating with google
  {path:'GoogleSignUp',component:GoogleSignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
