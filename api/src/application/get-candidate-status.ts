import { ApplicationStatus } from '../domain/entities/candidate';
import { CandidateRepository } from '../domain/repositories/candidate-repository';

export type GetCandidateStatusDTO = {
  name: string;
  status: ApplicationStatus;
};

export class GetCandidateStatus {
  constructor(readonly candidateRepository: CandidateRepository) {}

  async execute(id: string): Promise<GetCandidateStatusDTO> {
    const candidate = await this.candidateRepository.getById(id);

    if (!candidate) {
      throw new Error('candidate not found');
    }

    return {
      name: candidate.name,
      status: candidate.application_status,
    };
  }
}
