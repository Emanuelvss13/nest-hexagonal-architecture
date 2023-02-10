import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IListGateway } from '../gateway/list.gateway';
import { ListCreatedEvent } from './../event/list-created.event';

@Injectable()
export class CreateListInCRMListener {
  constructor(
    @Inject('ListIntegrationGateway')
    private readonly listIntegrationGateway: IListGateway,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    await this.listIntegrationGateway.create(event.list);
  }
}
