import { DataPoint } from '../definitions/datapoint';
import { TimeSeries } from '../definitions/timeseries';

interface TimeSeriesStore {
  append(key: string, value: DataPoint): Promise<void>;

  query(key: string): Promise<DataPoint | undefined>;

  fetch(key: string, begin: number, end: number): Promise<TimeSeries>;

  fetchLast(key: string, duration: number): Promise<TimeSeries>;

  delete(key: string): Promise<void>;
}

export default TimeSeriesStore;
