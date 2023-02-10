import { ListCreatedEvent } from './event/list-created.event';
import { ListGatewayInMemory } from './gateway/list.gatewat-in-memory';
import { IListGateway } from './gateway/list.gateway';
import { ListsService } from './lists.service';

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway: IListGateway;
  const eventEmitterMock = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    listPersistenceGateway = new ListGatewayInMemory();
    service = new ListsService(listPersistenceGateway, eventEmitterMock as any);
  });

  it('Should create a list', async () => {
    const list = await service.create({ name: 'List' });

    expect(await listPersistenceGateway.findById(1)).toEqual(list);
    expect(eventEmitterMock.emit).toHaveBeenCalledWith(
      'list.created',
      new ListCreatedEvent(list),
    );
  });
});
