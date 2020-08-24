import { when } from 'jest-when';
import { DataPoint } from '../../definitions/datapoint';
import NeDBImpl from './NeDBImpl';
import NeDB from 'nedb';

jest.mock('nedb');

describe('append()', () => {
  const key = 'key';
  const value: DataPoint = {
    source: 'source',
    value: 123,
    timestamp: 0,
  };

  it('should store a datapoint in NeDB', async () => {
    const mockInsert = jest.fn().mockImplementation((newDoc, callback: (err: Error, doc: any) => void) => callback(null, {}));
    NeDB.prototype.insert = mockInsert;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.append(key, value)).resolves.toBeUndefined();

    expect(mockInsert).toBeCalledWith({ key, ...value }, expect.anything());
  });

  it('should reject if store fails', async () => {
    const mockInsert = jest.fn().mockImplementation((newDoc, callback: (err: Error, doc: any) => void) => callback(new Error('error'), {}));
    NeDB.prototype.insert = mockInsert;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.append(key, value)).rejects.toBeDefined();

    expect(mockInsert).toBeCalledWith({ key, ...value }, expect.anything());
  });
});

describe('delete()', () => {
  const key = 'key';

  it('should delete values in NeDB', async () => {
    const mockDelete = jest.fn().mockImplementation((query, opts, callback: (err: Error, doc: any) => void) => callback(null, {}));
    NeDB.prototype.remove = mockDelete;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.delete(key)).resolves.toBeUndefined();

    expect(mockDelete).toBeCalledWith({ key }, { multi: true }, expect.anything());
  });

  it('should reject if remove fails', async () => {
    const mockDelete = jest.fn().mockImplementation((query, opts, callback: (err: Error, doc: any) => void) => callback(new Error('error'), {}));
    NeDB.prototype.remove = mockDelete;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.delete(key)).rejects.toBeDefined();

    expect(mockDelete).toBeCalledWith({ key }, { multi: true }, expect.anything());
  });
});

describe('fetch()', () => {
  const key = 'key';
  const begin = 0;
  const end = begin + 1000;
  const docs: DataPoint[] = [
    { source: 'source', value: 0, timestamp: 0 },
    { source: 'source', value: 2, timestamp: 200 },
    { source: 'source', value: 4, timestamp: 400 },
    { source: 'source', value: 6, timestamp: 600 },
    { source: 'source', value: 8, timestamp: 800 },
  ];

  it('should fetch values from NeDB', async () => {
    const mockFind = jest.fn(), mockSort = jest.fn();
    const mockExec = jest.fn()
      .mockImplementation((callback: (err: Error, documents: any[]) => void) => callback(null, docs));
    when(mockSort).expectCalledWith({ timestamp: 1 })
      .mockReturnValue({ exec: mockExec });
    when(mockFind).expectCalledWith({ key: key, timestamp: { $gte: begin, $lt: end } })
      .mockReturnValue({ sort: mockSort });
    NeDB.prototype.find = mockFind;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.fetch(key, begin, end)).resolves.toEqual(docs);
  });

  it('should reject if it throws an error', async () => {
    const mockFind = jest.fn(), mockSort = jest.fn();
    const mockExec = jest.fn()
      .mockImplementation((callback: (err: Error, documents: any[]) => void) => callback(new Error('error'), []));
    when(mockSort).expectCalledWith({ timestamp: 1 })
      .mockReturnValue({ exec: mockExec });
    when(mockFind).expectCalledWith({ key: key, timestamp: { $gte: begin, $lt: end } })
      .mockReturnValue({ sort: mockSort });
    NeDB.prototype.find = mockFind;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.fetch(key, begin, end)).rejects.toBeDefined();
  });
});

describe('fetchLast()', () => {
  const key = 'key';
  const duration = 1000;
  const docs: DataPoint[] = [
    { source: 'source', value: 0, timestamp: 0 },
    { source: 'source', value: 2, timestamp: 200 },
    { source: 'source', value: 4, timestamp: 400 },
    { source: 'source', value: 6, timestamp: 600 },
    { source: 'source', value: 8, timestamp: 800 },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch values from NeDB', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1000);

    const mockFind = jest.fn(), mockSort = jest.fn();
    const mockExec = jest.fn()
      .mockImplementation((callback: (err: Error, documents: any[]) => void) => callback(null, docs));
    when(mockSort).expectCalledWith({ timestamp: 1 })
      .mockReturnValue({ exec: mockExec });
    when(mockFind).expectCalledWith({ key: key, timestamp: { $gte: 0 } })
      .mockReturnValue({ sort: mockSort });
    NeDB.prototype.find = mockFind;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.fetchLast(key, duration)).resolves.toEqual(docs);
  });

  it('should reject if it throws an error', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1000);

    const mockFind = jest.fn(), mockSort = jest.fn();
    const mockExec = jest.fn()
      .mockImplementation((callback: (err: Error, documents: any[]) => void) => callback(new Error('error'), []));
    when(mockSort).expectCalledWith({ timestamp: 1 })
      .mockReturnValue({ exec: mockExec });
    when(mockFind).expectCalledWith({ key: key, timestamp: { $gte: 0 } })
      .mockReturnValue({ sort: mockSort });
    NeDB.prototype.find = mockFind;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.fetchLast(key, duration)).rejects.toBeDefined();
  });
});

describe('query()', () => {
  const key = 'key';
  const docs: DataPoint[] = [
    { source: 'source', value: 0, timestamp: 0 },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a value from NeDB', async () => {
    const mockFind = jest.fn(), mockSort = jest.fn(), mockLimit = jest.fn();
    const mockExec = jest.fn()
      .mockImplementation((callback: (err: Error, documents: any[]) => void) => callback(null, docs));
    when(mockLimit).expectCalledWith(1)
      .mockReturnValue({ exec: mockExec });
    when(mockSort).expectCalledWith({ timestamp: -1 })
      .mockReturnValue({ limit: mockLimit });
    when(mockFind).expectCalledWith({ key: key })
      .mockReturnValue({ sort: mockSort });
    NeDB.prototype.find = mockFind;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.query(key)).resolves.toEqual(docs[0]);
  });

  it('should reject if it throws an error', async () => {
    const mockFind = jest.fn(), mockSort = jest.fn(), mockLimit = jest.fn();
    const mockExec = jest.fn()
      .mockImplementation((callback: (err: Error, documents: any[]) => void) => callback(new Error('error'), []));
    when(mockLimit).expectCalledWith(1)
      .mockReturnValue({ exec: mockExec });
    when(mockSort).expectCalledWith({ timestamp: -1 })
      .mockReturnValue({ limit: mockLimit });
    when(mockFind).expectCalledWith({ key: key })
      .mockReturnValue({ sort: mockSort });
    NeDB.prototype.find = mockFind;

    const db = new NeDB();
    const impl = new NeDBImpl(db);
    await expect(impl.query(key)).rejects.toBeDefined();
  });
});
