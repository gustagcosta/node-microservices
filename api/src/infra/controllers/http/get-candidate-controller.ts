import {
  GetCandidateStatus,
  GetCandidateStatusDTO,
} from '../../../application/get-candidate-status';
import { CandidateRepository } from '../../../domain/repositories/candidate-repository';
import { HttpError } from '../../http/http-error';
import { HttpResponse } from '../../http/http-response';

export class GetCandidateController {
  constructor(readonly repository: CandidateRepository) {}

  public async execute(id: string) {
    const getCandidate = new GetCandidateStatus(this.repository);

    try {
      const candidate: GetCandidateStatusDTO = await getCandidate.execute(id);

      if (!candidate) {
        return new HttpError(404, 'candidate não encontrado');
      }

      return new HttpResponse(200, candidate);
    } catch (err) {
      console.error(err);
      return new HttpError(500, 'erro ao buscar candidato');
    }
  }
}
