import { NotFoundException } from '@nestjs/common';
import { List } from '../entities/list.entity';
import { IListGateway } from './list.gateway';
export class ListGatewayInMemory implements IListGateway {
  items: List[] = [];

  async create(list: List): Promise<List> {
    list.id = this.items.length + 1;

    this.items.push(list);

    return list;
  }

  async findAll(): Promise<List[]> {
    return this.items;
  }

  async findById(id: number): Promise<List> {
    const list = this.items.find((item) => item.id === id);

    if (!list) {
      throw new NotFoundException('Lista não encontrada');
    }

    return list;
  }
}
