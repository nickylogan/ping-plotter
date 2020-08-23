import { Widget } from './widget';

export type Dashboard = {
  title?: string;
  widgets: {
    [id: string]: Widget;
  }
};
