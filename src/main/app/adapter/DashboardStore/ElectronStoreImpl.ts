import ElectronStore from 'electron-store';
import { Dashboard } from '../../definitions/dashboard';
import { Widget, WidgetEdit } from '../../definitions/widget';
import DashboardStore from '../../usecase/DashboardStore';

class ElectronStoreImpl implements DashboardStore {
  private readonly store: ElectronStore<any>;

  constructor(store: ElectronStore) {
    this.store = store;
  }

  addWidget(id: string, widget: Widget): Promise<void> {
    if (this.store.has(`widgets.${id}`)) {
      return Promise.reject('widget already exists');
    }

    try {
      this.store.set(`widgets.${id}`, widget);
    } catch (e) {
      return Promise.reject(`failed to store widget: ${e}`);
    }

    return Promise.resolve();
  }

  deleteWidget(id: string): Promise<void> {
    this.store.delete(`widgets.${id}`);
    return Promise.resolve();
  }

  get(): Promise<Dashboard> {
    const title: string | undefined = this.store.get('title');
    const widgets: { [id: string]: Widget } = this.store.get('widgets') || {};

    return Promise.resolve({ title, widgets });
  }

  getWidget(id: string): Promise<Widget> {
    const widget: Widget = this.store.get(`widgets.${id}`);
    if (widget === undefined) {
      return Promise.reject(`cannot find widget#${id}`);
    }

    return Promise.resolve(widget);
  }

  updateWidget(id: string, edit: WidgetEdit): Promise<void> {
    let widget: Widget = this.store.get(`widgets.${id}`);
    if (widget === undefined) {
      return Promise.reject(`cannot find widget#${id}`);
    }

    widget = { ...widget, ...edit };
    try {
      this.store.set(`widgets.${id}`, widget);
    } catch (e) {
      return Promise.reject(`failed to update widget: ${e}`);
    }
    return Promise.resolve(undefined);
  }
}

export default ElectronStoreImpl;
