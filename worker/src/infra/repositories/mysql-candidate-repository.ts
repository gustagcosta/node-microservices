import { Candidate } from '../../domain/entities/candidate';
import { CandidateRepository } from '../../domain/repositories/candidate-repository';
import knex, { Knex } from 'knex';

export class MysqlCandidateRepository implements CandidateRepository {
  conn: Knex;

  async connect() {
    this.conn = knex({
      client: 'mysql2',
      connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'microservices',
      },
    });
  }

  async getById(id: string): Promise<Candidate> {
    const result = await this.conn
      .select('*')
      .from('candidates')
      .where({ id })
      .first();

    if (result) {
      return new Candidate(
        result.name,
        result.email,
        result.github_link,
        result.linkedin_link,
        result.application_status,
        result.id
      );
    }
  }

  async update(candidate: Candidate): Promise<void> {
    await this.conn('candidates')
      .update({ application_status: candidate.application_status })
      .where({ id: candidate.id });
  }
}
