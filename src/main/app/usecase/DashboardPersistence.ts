import { Dashboard } from '../definitions/dashboard';
import { Widget } from '../definitions/widget';

interface DashboardPersistence {
  get(): Promise<Dashboard>;

  getWidget(id: string): Promise<Widget>;

  addWidget(id: string, widget: Widget): Promise<void>;

  updateWidget(id: string, widget: Widget): Promise<void>;

  deleteWidget(id: string): Promise<void>;
}

export default DashboardPersistence;
