import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
//import { CreateListInCrmListener } from './listeners/create-list-in-crm.listener';
import { BullModule } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ListGatewayHttp } from './gateway/list.gateway-http';
import { ListGatewaysequelize } from './gateway/list.gateway-sequelize';
import { CreateListInCrmJob } from './jobs/create-list-in-crm.job';
import { PublishListCreatedListener } from './listener/publish-list-created.listener';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: { attempts: 3 },
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaysequelize,
    ListGatewayHttp,
    //CreateListInCrmListener,
    PublishListCreatedListener,
    CreateListInCrmJob,
    {
      provide: 'ListPersistenceGateway',
      useExisting: ListGatewaysequelize,
    },
    {
      provide: 'ListIntegrationGateway',
      useExisting: ListGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
