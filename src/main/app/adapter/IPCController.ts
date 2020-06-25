import { ipcMain } from 'electron';
import { Events } from '../definitions/events';
import { Message } from '../definitions/message';
import { Widget } from '../definitions/widget';
import DashboardInteractor from '../usecase/DashboardInteractor';

class IPCController {
  constructor(private readonly interactor: DashboardInteractor) {
  }

  registerHandlers() {
    ipcMain.on(Events.REQ_INIT, (evt) => {
      this.interactor.init()
        .then(dashboard => evt.reply(Events.RES_OK_INIT, dashboard))
        .catch(err => evt.reply(Events.RES_ERR_INIT, err));
    });

    ipcMain.on(Events.REQ_GET_WIDGET, (evt, message: Message) => {
      const id = message.data as string;
      this.interactor.getWidget(id)
        .then(dashboard => evt.reply(Events.RES_OK_GET_WIDGET, dashboard))
        .catch(err => evt.reply(Events.RES_ERR_GET_WIDGET, err));
    });

    ipcMain.on(Events.REQ_ADD_WIDGET, (evt, message: Message) => {
      const widget = message.data as Widget;
      this.interactor.addWidget(widget)
        .then(id => evt.reply(Events.RES_OK_ADD_WIDGET, id))
        .catch(err => evt.reply(Events.RES_ERR_ADD_WIDGET, err));
    });

    ipcMain.on(Events.REQ_EDIT_WIDGET, (evt, message: Message) => {
      const updated = message.data as Widget;
      this.interactor.updateWidget(updated.id, updated)
        .then(() => evt.reply(Events.RES_OK_EDIT_WIDGET))
        .catch(err => evt.reply(Events.RES_ERR_EDIT_WIDGET, err));
    });

    ipcMain.on(Events.REQ_DELETE_WIDGET, (evt, message: Message) => {
      const id = message.data as string;
      this.interactor.deleteWidget(id)
        .then(() => evt.reply(Events.RES_OK_DELETE_WIDGET))
        .catch(err => evt.reply(Events.RES_ERR_DELETE_WIDGET, err));
    });
  }
}

export default IPCController;
