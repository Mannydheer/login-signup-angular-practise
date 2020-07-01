import { ErrorHandler } from '@angular/core';

export class GlobalError implements ErrorHandler {
  handleError() {
    console.error('Unexpected Error Occured');
  }
}
