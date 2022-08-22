import { Candidate } from '../entities/candidate';

export interface CandidateRepository {
  getById(id: string): Promise<Candidate>;
  store(candidate: Candidate): Promise<void>;
}
