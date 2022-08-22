import { v4 as uuid } from 'uuid';

export enum ApplicationStatus {
  PROCESSING = 'processing',
  ACCEPTED = 'accepted',
  DENIED = 'denied',
}

export class Candidate {
  id?: string;
  name: string;
  email: string;
  github_link: string;
  linkedin_link: string;
  application_status: ApplicationStatus;

  constructor(
    name: string,
    email: string,
    github_link: string,
    linkedin_link: string,
    application_status: ApplicationStatus,
    id?: string
  ) {
    if (!id) {
      this.id = uuid();
    } else {
      this.id = id;
    }

    this.name = name;
    this.email = email;
    this.github_link = github_link;
    this.linkedin_link = linkedin_link;
    this.application_status = application_status;
  }
}
