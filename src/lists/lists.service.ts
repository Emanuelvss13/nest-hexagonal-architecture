import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import EventEmitter from 'events';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { ListCreatedEvent } from './event/list-created.event';
import { IListGateway } from './gateway/list.gateway';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistenceGateway')
    private readonly listPersistenceGateway: IListGateway, //porta
    @Inject('EventEmitter')
    private readonly eventEmitter: EventEmitter,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new List({ name: createListDto.name });

    await this.listPersistenceGateway.create(list);
    console.log('Create');

    this.eventEmitter.emit('list.created', new ListCreatedEvent(list));

    return list;
  }

  findAll() {
    return this.listPersistenceGateway.findAll();
  }

  async findOne(id: number) {
    const list = await this.listPersistenceGateway.findById(id);

    if (!list) throw new NotFoundException('Lista não encontrada');

    return list;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
