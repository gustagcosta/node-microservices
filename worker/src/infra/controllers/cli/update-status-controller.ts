import { UpdateCandidateStatus } from '../../../application/update-status-candidate';
import { CandidateRepository } from '../../../domain/repositories/candidate-repository';
import { Queue } from '../../queue/queue';

export class UpdateStatusController {
  constructor(
    readonly repository: CandidateRepository,
    readonly queue: Queue
  ) {}

  public async execute() {
    const updateStatus = new UpdateCandidateStatus(this.repository, this.queue);

    try {
      await updateStatus.execute();
    } catch (error) {
      throw error;
    }
  }
}
