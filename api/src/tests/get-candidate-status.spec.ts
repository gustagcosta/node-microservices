import { GetCandidateStatus } from '../application/get-candidate-status';
import { ApplicationStatus, Candidate } from '../domain/entities/candidate';
import { InMemoryCandidateRepository } from '../infra/repositories/in-memory-candidate-repository';

describe('test create candidate use case', () => {
  test('show execute a regular create candidate use case', async () => {
    const candidateRepository = new InMemoryCandidateRepository();

    const candidate = new Candidate(
      'teste',
      'teste',
      'teste',
      'teste',
      ApplicationStatus.PROCESSING
    );

    candidateRepository.store(candidate);

    const getCandidateStatus = new GetCandidateStatus(candidateRepository);

    const candidateStatus = await getCandidateStatus.execute(candidate.id!);

    expect(candidate.id).toBeTruthy();
    expect(candidateRepository.candidates).toHaveLength(1);
    expect(candidateStatus).toBeTruthy();
    expect(candidateStatus.status).toBe(ApplicationStatus.PROCESSING);
  });
});
