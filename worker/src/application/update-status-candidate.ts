import { ApplicationStatus } from '../domain/entities/candidate';
import { CandidateRepository } from '../domain/repositories/candidate-repository';
import { Queue } from '../infra/queue/queue';

export class UpdateCandidateStatus {
  constructor(
    readonly candidateRepository: CandidateRepository,
    readonly queue: Queue
  ) {}

  async execute(): Promise<void> {
    await this.queue.consume(
      'applications_to_be_approved',
      async (input: any) => {
        const candidate = await this.candidateRepository.getById(
          input.candidateId
        );

        if (
          candidate.name.substring(candidate.name.length - 1) === 'a' ||
          candidate.name.substring(candidate.name.length - 1) === 'A'
        ) {
          candidate.application_status = ApplicationStatus.ACCEPTED;
        } else {
          candidate.application_status = ApplicationStatus.DENIED;
        }

        await this.candidateRepository.update(candidate);

        console.log(`Candidate with id ${candidate.id} processed`);
      }
    );
  }
}
