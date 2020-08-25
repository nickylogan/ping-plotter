import autoBind from 'auto-bind';
import { v4 as uuidv4 } from 'uuid';
import { Dashboard } from '../definitions/dashboard';
import { DataPoint } from '../definitions/datapoint';
import { Widget, WidgetEdit } from '../definitions/widget';
import DashboardStore from './DashboardStore';
import NetworkPing from './metrics/NetworkPing';
import Repeater, { RepeatTerminator } from './Repeater';
import TimeSeriesStore from './TimeSeriesStore';
import WidgetPublisher from './WidgetPublisher';

export type DashboardMetrics = {
  ping: NetworkPing,
}

class DashboardInteractor {
  private readonly repeater: Repeater;

  constructor(
    private readonly widgetPub: WidgetPublisher,
    private readonly tsStore: TimeSeriesStore,
    private readonly dashboardStore: DashboardStore,
    private readonly metrics: DashboardMetrics,
  ) {
    this.repeater = new Repeater();

    autoBind(this);
  }

  async init(): Promise<Dashboard> {
    return this.dashboardStore.get();
  }

  async getWidget(id: string): Promise<Widget> {
    return this.dashboardStore.getWidget(id);
  }

  async addWidget(widget: Widget): Promise<string> {
    const id = uuidv4();
    widget.id = id;

    try {
      await this.dashboardStore.addWidget(id, widget);

      this.startPublisher(widget);

      return Promise.resolve(id);
    } catch (e) {
      // TODO: parse error
      return Promise.reject(e);
    }
  }

  async updateWidget(id: string, edit: WidgetEdit): Promise<void> {
    return this.dashboardStore.updateWidget(id, edit);
  }

  async deleteWidget(id: string): Promise<void> {
    return this.dashboardStore.deleteWidget(id);
  }

  private startPublisher(widget: Widget) {
    this.repeater.repeat(widget.id, async (stop: RepeatTerminator) => {
      const timestamp = Date.now();
      const data = await this.getDataPoint(widget.metric);

      this.widgetPub.publishWidgetMessage(widget.id, { data, timestamp }).catch(stop);

      await this.tsStore.append(widget.metric, data);
    }, widget.interval);
  }

  private async getDataPoint(metric: string): Promise<DataPoint> {
    const timestamp = Date.now();
    const value = await this.metrics.ping.call('host', 'tcp', 1000);

    return Promise.resolve({
      source: metric,
      value,
      timestamp,
    });
  }
}

export default DashboardInteractor;
