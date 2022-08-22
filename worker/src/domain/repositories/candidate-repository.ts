import { Candidate } from '../entities/candidate';

export interface CandidateRepository {
  getById(id: string): Promise<Candidate>;
  update(candidate: Candidate): Promise<void>;
}
