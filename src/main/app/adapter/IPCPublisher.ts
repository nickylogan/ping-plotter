import { BrowserWindow } from 'electron';
import { Message } from '../definitions/message';
import WidgetPublisher from '../usecase/WidgetPublisher';

class IPCPublisher implements WidgetPublisher {
  constructor(
    private readonly window: BrowserWindow,
  ) {
  }

  publishWidgetMessage(id: string, message: Message): Promise<void> {
    if (this.window.isDestroyed()) return Promise.reject();

    const evt = `DATA_WIDGET_${id}`;
    this.window.webContents.send(evt, message);
  }
}

export default IPCPublisher;
