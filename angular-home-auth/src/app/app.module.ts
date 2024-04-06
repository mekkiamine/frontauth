import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupRoleComponent } from './signup-role/signup-role.component';
import { HomeComponent } from './home/home.component';
import { SignupFormateurComponent } from './signup-formateur/signup-formateur.component';
import { RedirectComponent } from './redirect/redirect.component';
import {  HttpClientModule } from '@angular/common/http';
import { GoogleSignUpComponent } from './google-sign-up/google-sign-up.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SignupRoleComponent,
    HomeComponent,
    SignupFormateurComponent,
    RedirectComponent,
    GoogleSignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  providers: [ {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('1052580759683-3f6obc3ho8bh9spepvn1u00t2rh4jddp.apps.googleusercontent.com'),
        },
      ],
    } as SocialAuthServiceConfig,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
