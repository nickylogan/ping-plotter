import Store from 'electron-store';

namespace ElectronStore {
  export function initDashboardDB(): Promise<Store> {
    const store = new Store<any>({
      name: 'dashboard',
      schema: {
        title: {
          type: 'string',
        },
        widgets: {
          additionalProperties: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              metric: { type: 'string' },
              type: { type: 'string' },
              interval: { type: 'number' },
            },
          },
        },
      },
    });

    return Promise.resolve(store);
  }
}

export = ElectronStore;
