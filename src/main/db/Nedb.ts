import electron from 'electron';
import DB from 'nedb';
import path from 'path';

namespace Nedb {
  export function initTimeSeriesDB(): Promise<DB> {
    const dir = electron.app.getPath('userData');
    const dbPath = path.join(dir, 'ts.db');

    const db = new DB({ filename: dbPath, autoload: true });
    return new Promise<DB>((resolve, reject) => {
      db.ensureIndex({ fieldName: 'key' }, err => err && reject(`failed to init db: ${err}`));
      db.ensureIndex({ fieldName: 'timestamp' }, err => err && reject(`failed to init db: ${err}`));

      resolve(db);
    });
  }
}

export = Nedb;
