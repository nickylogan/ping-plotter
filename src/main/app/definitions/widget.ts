export type Widget = {
  id: string
  title: string
  metric: string
  type: string
  interval: number
};

export type WidgetType = 'timeseries' | 'query';
