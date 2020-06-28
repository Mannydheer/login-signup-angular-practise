import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  url: string;
  constructor(private http: HttpClient) {
    this.url; //whatever url
  }

  validateForm(formValues) {
    return this.http.post(this.url, JSON.stringify(formValues));
  }
}
