import Store from 'electron-store';
import { when } from 'jest-when';
import { Widget, WidgetEdit } from '../../definitions/widget';
import ElectronStoreImpl from './ElectronStoreImpl';

jest.mock('electron-store');
const mockeimpl = Store as jest.Mock<Store>;

beforeEach(() => {
  mockeimpl.mockClear();
});

describe('addWidget()', () => {
  const id = 'widget-id';
  const widget: Widget = {
    id: id,
    title: 'title',
    metric: 'metric',
    type: 'type',
    interval: 2000,
  };

  it('should store a widget to electron-store', async () => {
    const mockHas = jest.fn(), mockSet = jest.fn();
    when(mockHas).expectCalledWith(`widgets.${id}`).mockReturnValue(false);
    when(mockSet).expectCalledWith(`widgets.${id}`, widget);
    Store.prototype.has = mockHas;
    Store.prototype.set = mockSet;

    const impl = new ElectronStoreImpl();
    await expect(impl.addWidget(id, widget)).resolves.toBeUndefined();
  });

  it('should not allow storing a duplicate widget', async () => {
    const mockHas = jest.fn(), mockSet = jest.fn();
    when(mockHas).expectCalledWith(`widgets.${id}`).mockReturnValue(true);
    Store.prototype.has = mockHas;
    Store.prototype.set = mockSet;

    const impl = new ElectronStoreImpl();
    await expect(impl.addWidget(id, widget)).rejects.toBeDefined();

    expect(mockSet).not.toBeCalled();
  });

  it('should reject when set fails', async () => {
    const mockHas = jest.fn(), mockSet = jest.fn();
    when(mockHas).expectCalledWith(`widgets.${id}`).mockReturnValue(false);
    when(mockSet).expectCalledWith(`widgets.${id}`).mockImplementation(() => {throw new Error();});
    Store.prototype.has = mockHas;
    Store.prototype.set = mockSet;

    const impl = new ElectronStoreImpl();
    await expect(impl.addWidget(id, widget)).rejects.toBeDefined();
  });
});

describe('deleteWidget()', () => {
  const id = 'widget-id';

  it('should delete a widget from electron-store', async () => {
    const mockDelete = jest.fn();
    when(mockDelete).expectCalledWith(`widgets.${id}`);
    Store.prototype.delete = mockDelete;

    const impl = new ElectronStoreImpl();
    await expect(impl.deleteWidget(id)).resolves.toBeUndefined();
  });
});

describe('get()', () => {
  const title = 'dashboard-title';
  const widgets: { [id: string]: Widget } = {
    'widget-id': {
      id: 'widget-id',
      title: 'title',
      metric: 'metric',
      type: 'type',
      interval: 2000,
    },
  };
  const dashboard = { title, widgets };

  it('should return the dashboard in electron-store', async () => {
    const mockGet = jest.fn();
    when(mockGet).expectCalledWith('title').mockReturnValueOnce('dashboard-title');
    when(mockGet).expectCalledWith('widgets').mockReturnValue(widgets);
    Store.prototype.get = mockGet;

    const impl = new ElectronStoreImpl();
    await expect(impl.get()).resolves.toEqual(dashboard);
  });
});

describe('getWidget()', () => {
  const id = 'widget-id';
  const widget: Widget = {
    id: 'widget-id',
    title: 'title',
    metric: 'metric',
    type: 'type',
    interval: 2000,
  };

  it('should return the widget in electron-store', async () => {
    const mockGet = jest.fn();
    when(mockGet).expectCalledWith(`widgets.${id}`).mockReturnValue(widget);
    Store.prototype.get = mockGet;

    const impl = new ElectronStoreImpl();
    await expect(impl.getWidget(id)).resolves.toEqual(widget);
  });

  it('should reject if the widget does not exist', async () => {
    const mockGet = jest.fn();
    when(mockGet).expectCalledWith(`widgets.${id}`).mockReturnValue(undefined);
    Store.prototype.get = mockGet;

    const impl = new ElectronStoreImpl();
    await expect(impl.getWidget(id)).rejects.toBeDefined();
  });
});

describe('updateWidget()', () => {
  const id = 'widget-id';
  const widget: Widget = {
    id: 'widget-id',
    title: 'title',
    metric: 'metric',
    type: 'type',
    interval: 2000,
  };
  const edit: WidgetEdit = {
    id: 'widget-id',
    title: 'updated-title',
    metric: 'updated-metric',
    type: 'updated-type',
    interval: 3000,
  };
  const updated = { ...widget, ...edit };

  it('should update the widget in electron-store', async () => {
    const mockGet = jest.fn(), mockSet = jest.fn();
    when(mockGet).expectCalledWith(`widgets.${id}`).mockReturnValue(widget);
    when(mockSet).expectCalledWith(`widgets.${id}`, updated);
    Store.prototype.get = mockGet;
    Store.prototype.set = mockSet;

    const impl = new ElectronStoreImpl();
    await expect(impl.updateWidget(id, edit)).resolves.toBeUndefined();
  });

  it('should reject if the widget does not exist', async () => {
    const mockGet = jest.fn(), mockSet = jest.fn();
    when(mockGet).expectCalledWith(`widgets.${id}`).mockReturnValue(undefined);
    Store.prototype.get = mockGet;
    Store.prototype.set = mockSet;

    const impl = new ElectronStoreImpl();
    await expect(impl.updateWidget(id, widget)).rejects.toBeDefined();

    expect(mockSet).not.toBeCalled();
  });

  it('should reject if store fails', async () => {
    const mockGet = jest.fn(), mockSet = jest.fn();
    when(mockGet).expectCalledWith(`widgets.${id}`).mockReturnValue(undefined);
    when(mockSet).expectCalledWith(`widgets.${id}`, updated).mockImplementation(() => {throw new Error();});
    Store.prototype.get = mockGet;
    Store.prototype.set = mockSet;

    const impl = new ElectronStoreImpl();
    await expect(impl.updateWidget(id, widget)).rejects.toBeDefined();
  });
});
