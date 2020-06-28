import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

//HTTP
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './services/signup/signup.service';

@NgModule({
  declarations: [AppComponent, SignupComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [SignupService],
  bootstrap: [AppComponent],
})
export class AppModule {}
