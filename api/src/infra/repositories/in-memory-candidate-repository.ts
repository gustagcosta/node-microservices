import { Candidate } from '../../domain/entities/candidate';
import { CandidateRepository } from '../../domain/repositories/candidate-repository';

export class InMemoryCandidateRepository implements CandidateRepository {
  public candidates: Candidate[];

  constructor() {
    this.candidates = [];
  }

  async getById(id: string): Promise<Candidate> {
    const candidate = this.candidates.find((i) => i.id === id) as Candidate;
    return candidate;
  }

  async update(candidate: Candidate): Promise<void> {
    await this.delete(candidate.id!);
    await this.store(candidate);
  }

  async store(candidate: Candidate): Promise<void> {
    this.candidates.push(candidate);
  }

  async delete(id: string): Promise<void> {
    const candidate = await this.getById(id);

    if (candidate) {
      const index = this.candidates.indexOf(candidate);
      this.candidates.splice(index, 1);
    }
  }
}
