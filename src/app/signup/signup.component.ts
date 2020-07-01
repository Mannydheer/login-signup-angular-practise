import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../services/signup/signup.service';
import { error } from '@angular/compiler/src/util';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found';
import { BadRequestError } from '../errors/bad-request';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  constructor(private service: SignupService) {}
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  public get username() {
    return this.form.get('username');
  }

  public get password() {
    return this.form.get('password');
  }

  submit() {
    this.service.validateForm(this.form.value).subscribe(
      //subscribe method has a response and error (try-catch concept)
      (response) => {
        console.log('thanks for signing up.', response);
      },
      //the type of Error.
      (error: AppError) => {
        //checking if the error being returned is
        //Any of the custom errors - (BadRequest, NotFoundError) is an instance.
        //if it is, we know it's coming from our own errors and we can control for it.jj
        if (error instanceof AppError) {
          console.log('it is an instance');
        } else throw error; // this will throw GlobalError
      }
    );
  }
}
