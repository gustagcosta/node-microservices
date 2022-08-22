export class HttpResponse {
  statusCode: number;
  data?: object;

  constructor(statusCode: number, data?: object) {
    this.statusCode = statusCode;
    this.data = data;
  }
}
