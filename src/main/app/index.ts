import { BrowserWindow } from 'electron';
import ElectronStore from '../db/ElectronStore';
import Nedb from '../db/Nedb';
import * as DashboardStore from './adapter/DashboardStore';
import IPCController from './adapter/IPCController';
import IPCPublisher from './adapter/IPCPublisher';
import NetworkPingImpl from './adapter/metrics/NetworkPing.impl';
import * as TimeSeriesStore from './adapter/TimeSeriesStore';
import DashboardInteractor, { DashboardMetrics } from './usecase/DashboardInteractor';

class App {
  constructor(private readonly window: BrowserWindow) {
  }

  async run() {
    const pub = new IPCPublisher(this.window);
    const metrics: DashboardMetrics = {
      ping: new NetworkPingImpl(),
    };

    const tsDB = await Nedb.initTimeSeriesDB();
    const dashDB = await ElectronStore.initDashboardDB();

    const tsStore = new TimeSeriesStore.NedbAdapter(tsDB);
    const dashboardStore = new DashboardStore.ElectronStoreAdapter(dashDB);
    const interactor = new DashboardInteractor(pub, tsStore, dashboardStore, metrics);
    const controller = new IPCController(interactor);

    controller.registerHandlers();
  }
}

export default App;
