import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppError } from '../../errors/app-error';
import { NotFoundError } from '../../errors/not-found';
import { BadRequestError } from '../../errors/bad-request';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://jsonplaceholder.typicode.com/postss';
  }

  validateForm(formValues) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post(this.url, JSON.stringify(formValues), { headers: headers })
      .pipe(catchError(this.handlerError));
  }

  //private error handler

  private handlerError(error: HttpErrorResponse) {
    //error from catchError
    //handle status.
    if (error.status === 404) {
      //Not Found Error.
      return throwError(new NotFoundError(error));
    }
    if (error.status === 400) {
      //Bad Request Error.
      return throwError(new BadRequestError(error));
    }
    return throwError(new AppError(error));
  }
}
