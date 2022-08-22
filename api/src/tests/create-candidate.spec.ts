import CreateCandidate from '../application/create-candidate';
import { ApplicationStatus, Candidate } from '../domain/entities/candidate';
import { Queue } from '../infra/queue/queue';
import { InMemoryCandidateRepository } from '../infra/repositories/in-memory-candidate-repository';

class QueueMocked implements Queue {
  async connect(): Promise<void> {
    return;
  }

  async close(): Promise<void> {
    return;
  }

  async consume(eventName: string, callback: Function): Promise<void> {
    return;
  }

  async publish(eventName: string, data: any): Promise<void> {
    return;
  }
}

const queue = new QueueMocked();

describe('test create candidate use case', () => {
  test('show execute a regular create candidate use case', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    
    const createCandidateUseCase = new CreateCandidate(
      candidateRepository,
      queue
    );

    const candidate = new Candidate(
      'teste',
      'teste',
      'teste',
      'teste',
      ApplicationStatus.PROCESSING
    );

    await createCandidateUseCase.execute(candidate);

    expect(candidate.id).toBeTruthy();
    expect(candidateRepository.candidates).toHaveLength(1);
  });
});
