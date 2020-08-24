import { DataPoint } from '../../definitions/datapoint';
import { TimeSeries } from '../../definitions/timeseries';
import TimeSeriesStore from '../../usecase/TimeSeriesStore';
import NeDB from 'nedb';

class NedbAdapter implements TimeSeriesStore {
  private readonly db: NeDB;

  constructor(db: NeDB) {
    this.db = db;
  }

  append(key: string, value: DataPoint): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.insert({ key: key, ...value }, err => {
        if (err) {
          reject(`failed to append: ${err}`);
        }

        resolve();
      });
    });
  }

  delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.remove({ key: key }, { multi: true }, err => {
        if (err) {
          reject(`failed to remove: ${err}`);
        }

        resolve();
      });
    });
  }

  fetch(key: string, begin: number, end: number): Promise<TimeSeries> {
    return new Promise<TimeSeries>((resolve, reject) => {
      this.db.find({ key: key, timestamp: { $gte: begin, $lt: end } })
        .sort({ timestamp: 1 })
        .exec((err, docs) => {
          if (err) {
            reject(`failed to fetch: ${err}`);
          }

          resolve(docs);
        });
    });
  }

  fetchLast(key: string, duration: number): Promise<TimeSeries> {
    return new Promise<TimeSeries>((resolve, reject) => {
      const begin = Date.now() - duration;
      this.db.find({ key: key, timestamp: { $gte: begin } })
        .sort({ timestamp: 1 })
        .exec((err, docs) => {
          if (err) {
            reject(`failed to fetch: ${err}`);
          }

          resolve(docs);
        });
    });
  }

  query(key: string): Promise<DataPoint | undefined> {
    return new Promise<DataPoint>((resolve, reject) => {
      this.db.find({ key: key })
        .sort({ timestamp: -1 })
        .limit(1)
        .exec((err, docs) => {
          if (err) {
            reject(`failed to fetch: ${err}`);
          }

          resolve(docs[0]);
        });
    });
  }
}

export default NedbAdapter;
