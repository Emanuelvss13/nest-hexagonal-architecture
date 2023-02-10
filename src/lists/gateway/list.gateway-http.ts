import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { List } from '../entities/list.entity';
import { IListGateway } from './list.gateway';

@Injectable()
export class ListGatewayHttp implements IListGateway {
  constructor(
    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    await lastValueFrom(
      this.httpService.post('/lists', {
        name: list.name,
      }),
    );

    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get('/lists'));

    return data.map((list) => new List({ name: list.name }));
  }

  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(this.httpService.get(`/lists/${id}`));

    return new List({ id: data.id, name: data.name });
  }
}
