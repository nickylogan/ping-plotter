import { DataPoint } from '../definitions/datapoint';
import { TimeSeries } from '../definitions/timeseries';

interface TimeSeriesPersistence {
  append(key: string, value: DataPoint): Promise<void>;

  query(key: string): Promise<DataPoint>;

  fetch(key: string, from: number, to: number): Promise<TimeSeries>;

  fetchLast(key: string, duration: number): Promise<TimeSeries>;

  delete(key: string): Promise<void>;
}

export default TimeSeriesPersistence;
