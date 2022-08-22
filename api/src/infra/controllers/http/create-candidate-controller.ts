import CreateCandidate from '../../../application/create-candidate';
import {
  ApplicationStatus,
  Candidate,
} from '../../../domain/entities/candidate';
import { CandidateRepository } from '../../../domain/repositories/candidate-repository';
import { HttpError } from '../../http/http-error';
import { HttpResponse } from '../../http/http-response';
import { Queue } from '../../queue/queue';

export class CreateCandidateControler {
  constructor(readonly repository: CandidateRepository, readonly queue: Queue) {}

  public async execute(body: any) {
    const createCandidate = new CreateCandidate(this.repository, this.queue);

    if (!body.name || !body.email || !body.github_link || !body.linkedin_link) {
      return new HttpError(400, 'campos faltantes');
    }

    const candidate = new Candidate(
      body.name,
      body.email,
      body.github_link,
      body.linkedin_link,
      ApplicationStatus.PROCESSING
    );

    try {
      await createCandidate.execute(candidate);

      return new HttpResponse(200, { id: candidate.id });
    } catch (err) {
      console.error(err);
      return new HttpError(500, 'erro ao criar candidato');
    }
  }
}
