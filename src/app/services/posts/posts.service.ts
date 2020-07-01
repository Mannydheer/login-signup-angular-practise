import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotFoundError } from 'src/app/errors/not-found';
import { BadRequestError } from 'src/app/errors/bad-request';
import { AppError } from 'src/app/errors/app-error';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://jsonplaceholder.typicode.com/posts';
  }

  //Methods.
  public getPosts() {
    return this.http.get(this.url).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }
    if (error.status === 400) {
      return throwError(new BadRequestError(error));
    }
    return throwError(new AppError(error));
  }
}
