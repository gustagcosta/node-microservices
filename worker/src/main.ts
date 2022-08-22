import { UpdateStatusController } from './infra/controllers/cli/update-status-controller';
import RabbitMQAdapter from './infra/queue/rabbitmq-adapter';
import { MysqlCandidateRepository } from './infra/repositories/mysql-candidate-repository';

async function init() {
  const repository = new MysqlCandidateRepository();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  await repository.connect();

  const updateStatusController = new UpdateStatusController(repository, queue);

  await updateStatusController.execute();
}

init();
