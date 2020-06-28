import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../services/signup/signup.service';

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
    console.log(this.form.value);
    this.service.validateForm(this.form.value);
  }
}
