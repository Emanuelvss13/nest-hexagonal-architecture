import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './lists/entities/list.model';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    ListsModule,
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory:',
      models: [ListModel],
      autoLoadModels: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
