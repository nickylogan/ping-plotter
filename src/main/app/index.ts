import { BrowserWindow } from 'electron';
import ElectronStore from '../db/ElectronStore';
import Nedb from '../db/Nedb';
import ElectronStoreImpl from './adapter/DashboardStore/ElectronStoreImpl';
import IPCController from './adapter/IPCController';
import IPCPublisher from './adapter/IPCPublisher';
import NetworkPingImpl from './adapter/metrics/NetworkPing.impl';
import NeDBImpl from './adapter/TimeSeriesStore/NeDBImpl';
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

    const tsStore = new NeDBImpl(tsDB);
    const dashboardStore = new ElectronStoreImpl(dashDB);
    const interactor = new DashboardInteractor(pub, tsStore, dashboardStore, metrics);
    const controller = new IPCController(interactor);

    controller.registerHandlers();
  }
}

export default App;
