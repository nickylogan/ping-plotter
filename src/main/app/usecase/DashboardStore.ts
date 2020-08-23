import { Dashboard } from '../definitions/dashboard';
import { Widget, WidgetEdit } from '../definitions/widget';

interface DashboardStore {
  get(): Promise<Dashboard>;

  getWidget(id: string): Promise<Widget>;

  addWidget(id: string, widget: Widget): Promise<void>;

  updateWidget(id: string, edit: WidgetEdit): Promise<void>;

  deleteWidget(id: string): Promise<void>;
}

export default DashboardStore;
