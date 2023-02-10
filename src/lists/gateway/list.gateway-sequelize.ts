import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { List } from '../entities/list.entity';
import { ListModel } from './../entities/list.model';
import { IListGateway } from './list.gateway';

@Injectable()
export class ListGatewaysequelize implements IListGateway {
  constructor(
    @InjectModel(ListModel)
    private readonly listModel: typeof ListModel,
  ) {}

  async create(list: List): Promise<List> {
    const newList = await this.listModel.create(list);

    list.id = newList.id;

    return list;
  }
  async findAll(): Promise<List[]> {
    const listModels = await this.listModel.findAll();

    return listModels.map((listModel) => new List({ name: listModel.name }));
  }
  async findById(id: number): Promise<List> {
    const list = await this.listModel.findByPk(id);

    if (!list) {
      throw new NotFoundException(`List not found`);
    }

    return new List({ id: list.id, name: list.name });
  }
}
