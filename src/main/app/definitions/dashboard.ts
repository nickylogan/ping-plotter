import { Widget } from './widget';

export type Dashboard = {
  title?: string;
  widgets: Record<string, Widget>;
};
