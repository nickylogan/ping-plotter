import { Dashboard } from '../definitions/dashboard';
import { Widget } from '../definitions/widget';
import DashboardPersistence from './DashboardPersistence';
import EventPublisher from './EventPublisher';
import NetworkPing from './metric/NetworkPing';
import TimeSeriesPersistence from './TimeSeriesPersistence';

export type DashboardMetrics = {
  ping: NetworkPing,
}

class DashboardInteractor {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly tsStore: TimeSeriesPersistence,
    private readonly dashboardStore: DashboardPersistence,
    private readonly metrics: DashboardMetrics,
  ) {
  }

  async init(): Promise<Dashboard> {
    return this.dashboardStore.get();
  }

  async getWidget(id: string): Promise<Widget> {
    return this.dashboardStore.getWidget(id);
  }

  async addWidget(widget: Widget): Promise<void> {
    const id = "temp-id";
    widget.id = id;

    return this.dashboardStore.addWidget(id, widget);
  }

  async updateWidget(id: string, widget: Widget): Promise<void> {
    return this.dashboardStore.updateWidget(id, widget);
  }

  async deleteWidget(id: string): Promise<void> {
    return this.dashboardStore.deleteWidget(id);
  }
}

export default DashboardInteractor;
