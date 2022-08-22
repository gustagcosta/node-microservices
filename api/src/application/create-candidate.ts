import { Candidate } from '../domain/entities/candidate';
import { CandidateRepository } from '../domain/repositories/candidate-repository';
import { Queue } from '../infra/queue/queue';

export default class CreateCandidate {
  constructor(
    readonly candidateRepository: CandidateRepository,
    readonly queue: Queue
  ) {}

  async execute(candidate: Candidate): Promise<void> {
    await this.candidateRepository.store(candidate);
    await this.queue.publish('applications_to_be_approved', {
      candidateId: candidate.id,
    });
  }
}
