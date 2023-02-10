import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { ListCreatedEvent } from '../event/list-created.event';
import { IListGateway } from '../gateway/list.gateway';

@Processor()
export class CreateListInCrmJob {
  constructor(
    @Inject('ListIntegrationGateway')
    private readonly listIntegrationGateway: IListGateway,
  ) {}

  @Process('list.created')
  async handle(job: Job<ListCreatedEvent>) {
    console.log('job processando');

    await this.listIntegrationGateway.create(job.data.list);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.log(error);
  }
}
