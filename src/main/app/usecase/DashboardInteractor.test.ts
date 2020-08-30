import { mock, mockClear } from 'jest-mock-extended';
import { mocked } from 'ts-jest/utils';
import { v4 as uuidv4 } from 'uuid';
import { Dashboard } from '../definitions/dashboard';
import { Widget, WidgetEdit } from '../definitions/widget';
import DashboardInteractor, { DashboardMetrics } from './DashboardInteractor';
import DashboardStore from './DashboardStore';
import NetworkPing from './metrics/NetworkPing';
import Repeater from './Repeater';
import TimeSeriesStore from './TimeSeriesStore';
import WidgetPublisher from './WidgetPublisher';

jest.mock('uuid');

const mockUuidV4 = mocked(uuidv4, true);

const widgets: Widget[] = Array(5).fill(0).map((_, i) => ({
  id: 'id' + i,
  title: 'title' + i,
  metric: 'metric',
  type: 'type',
  interval: i * 100,
}));
const dashboard: Dashboard = {
  title: 'title',
  widgets: Object.fromEntries(widgets.map(w => [ w.id, w ])),
};

const mockWidgetPub = mock<WidgetPublisher>();
const mockTsStore = mock<TimeSeriesStore>();
const mockDashboardStore = mock<DashboardStore>();
const mockMetrics: DashboardMetrics = { ping: mock<NetworkPing>() };

beforeEach(() => {
  mockClear(mockWidgetPub);
  mockClear(mockTsStore);
  mockClear(mockDashboardStore);
  mockClear(mockMetrics.ping);
});

describe('init()', () => {
  it('should return the dashboard and init all publishers', async () => {
    const mockRepeat = jest.fn();
    Repeater.prototype.repeat = mockRepeat;

    mockDashboardStore.get.mockResolvedValueOnce(dashboard);

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.init()).resolves.toEqual(dashboard);

    expect(mockRepeat.mock.calls.length).toEqual(widgets.length);
    widgets.forEach(w => {
      expect(mockRepeat).toBeCalledWith(w.id, expect.anything(), w.interval);
    });
  });

  it('should reject during an error', async () => {
    mockDashboardStore.get.mockRejectedValueOnce(new Error('error'));

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.init()).rejects.toBeDefined();
  });
});

describe('getWidget()', () => {
  it('should return the correct widget', async () => {
    mockDashboardStore.getWidget.calledWith('id0').mockResolvedValueOnce(widgets[0]);

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.getWidget('id0')).resolves.toEqual(widgets[0]);
  });

  it('should reject during an error', async () => {
    mockDashboardStore.getWidget.mockRejectedValueOnce(new Error('error'));

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.getWidget('id0')).rejects.toBeDefined();
  });
});

describe('addWidget()', () => {
  it('should return the widget id and init the publisher on success', async () => {
    const widget = widgets[0];
    const id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    mockUuidV4.mockReturnValueOnce(id);

    const mockRepeat = jest.fn();
    Repeater.prototype.repeat = mockRepeat;

    mockDashboardStore.addWidget.calledWith(id, { ...widget, id }).mockResolvedValueOnce();

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.addWidget(widget)).resolves.toEqual(id);

    expect(mockRepeat).toBeCalledWith(id, expect.anything(), widget.interval);
  });

  it('should reject on an error', async () => {
    const widget = widgets[0];
    const id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    mockUuidV4.mockReturnValueOnce(id);

    const mockRepeat = jest.fn();
    Repeater.prototype.repeat = mockRepeat;

    mockDashboardStore.addWidget.mockRejectedValueOnce(new Error('error'));

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.addWidget(widget)).rejects.toBeDefined();

    expect(mockRepeat).not.toBeCalled();
  });
});

describe('updateWidget()', () => {
  it('should update the widget', async () => {
    const id = 'id0';
    const edit = widgets[1] as WidgetEdit;

    mockDashboardStore.updateWidget.calledWith(id, edit).mockResolvedValueOnce();

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.updateWidget(id, edit)).resolves.toBeUndefined();
  });

  it('should reject on an error', async () => {
    const id = 'id0';
    const edit = widgets[1] as WidgetEdit;

    mockDashboardStore.updateWidget.mockRejectedValue(new Error('error'));

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.updateWidget(id, edit)).rejects.toBeDefined();
  });
});

describe('deleteWidget()', () => {
  it('should delete the widget', async () => {
    const id = 'id0';

    mockDashboardStore.deleteWidget.calledWith(id).mockResolvedValueOnce();

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.deleteWidget(id)).resolves.toBeUndefined();
  });

  it('should reject on an error', async () => {
    const id = 'id0';

    mockDashboardStore.deleteWidget.mockRejectedValue(new Error('error'));

    const interactor = new DashboardInteractor(
      mockWidgetPub,
      mockTsStore,
      mockDashboardStore,
      mockMetrics,
    );
    await expect(interactor.deleteWidget(id)).rejects.toBeDefined();
  });
});
