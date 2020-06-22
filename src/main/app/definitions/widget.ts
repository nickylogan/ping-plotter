export type Widget = {
  id: string
  title: string
  event: string
  type: string
  interval: number
};

export type WidgetType = 'timeseries' | 'query';
