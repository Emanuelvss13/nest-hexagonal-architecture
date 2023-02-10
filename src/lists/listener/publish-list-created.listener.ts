import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { ListCreatedEvent } from './../event/list-created.event';

@Injectable()
export class PublishListCreatedListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    console.log('inside event');

    await this.queue.add('list.created', event);
  }
}
