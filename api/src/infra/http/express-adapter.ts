import HttpServer from './http-server';
import express from 'express';

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: any, res: any) {
      const output = await callback(req.params, req.body);
      res.status(output.statusCode).json(output.message || output.data);
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log("Api is running on port %d", port)
    });
  }
}
