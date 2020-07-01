export class AppError {
  constructor(public originalError: any) {
    console.log(this.originalError, 'ORIGINAL ');
  }
}
