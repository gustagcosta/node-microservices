import { ExpressAdapter } from './infra/http/express-adapter';
import { CreateCandidateControler } from './infra/controllers/http/create-candidate-controller';
import { GetCandidateController } from './infra/controllers/http/get-candidate-controller';
import { HttpError } from './infra/http/http-error';
import RabbitMQAdapter from './infra/queue/rabbitmq-adapter';
import { MysqlCandidateRepository } from './infra/repositories/mysql-candidate-repository';

async function init() {
  const http = new ExpressAdapter();
  const repository = new MysqlCandidateRepository();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  await repository.connect();

  http.on('post', '/candidate', async (params: any, body: any) => {
    const createCandidateController = new CreateCandidateControler(
      repository,
      queue
    );

    try {
      return await createCandidateController.execute(body);
    } catch (error) {
      return new HttpError(500, 'erro desconhecido');
    }
  });

  http.on('get', '/candidate/:id', async (params: any, body: any) => {
    const getCandidateController = new GetCandidateController(repository);

    try {
      return await getCandidateController.execute(params.id);
    } catch (error) {
      return new HttpError(500, 'erro desconhecido');
    }
  });

  http.listen(5555);
}

init();
