import { BrowserWindow } from 'electron';
import IPCController from './adapter/IPCController';
import IPCPublisher from './adapter/IPCPublisher';
import NetworkPingImpl from './adapter/metrics/NetworkPing.impl';
import DashboardInteractor, { DashboardMetrics } from './usecase/DashboardInteractor';

class App {
  constructor(private readonly window: BrowserWindow) {
  }

  run() {
    const pub = new IPCPublisher(this.window);
    const metrics: DashboardMetrics = {
      ping: new NetworkPingImpl(),
    };
    const interactor = new DashboardInteractor(pub, null, null, metrics);
    const controller = new IPCController(interactor);

    controller.registerHandlers();
  }
}

export default App;
