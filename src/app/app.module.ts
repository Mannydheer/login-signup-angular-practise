import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './notfound/notfound.component';

//HTTP
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './services/signup/signup.service';

//Error handling.
import { ErrorHandler } from '@angular/core';
import { GlobalError } from './errors/global-app-error';
import { NavbarComponent } from './navbar/navbar.component';
//Router
import { RouterModule, Router } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { SinglepostComponent } from './singlepost/singlepost.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    NotFoundComponent,
    PostsComponent,
    SinglepostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      //
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'posts/:id',
        component: SinglepostComponent,
      },

      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
  ],
  providers: [
    SignupService,
    {
      provide: ErrorHandler,
      useClass: GlobalError,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
