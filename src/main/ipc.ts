import crypto from 'crypto';
import { BrowserWindow, ipcMain as ipc } from 'electron';

export enum Message {
  PING_REQUEST = 'PING_REQUEST',
  PING_DATA = 'PING_DATA',
}

export enum Protocol {
  TCP = 'tcp',
  UDP = 'udp',
  ICMP = 'icmp',
}

export type ProtocolString = 'tcp' | 'udp' | 'icmp';

export type PingRequest = {
  host: string
  protocol: Protocol | ProtocolString,
};

export const registerEvents = (window: BrowserWindow) => {
  const reqs = {};

  const createRequest = (id: string) => {
    clearInterval(reqs[id]);
    reqs[id] = setInterval(() => {
      if (window.isDestroyed()) {
        clearInterval(reqs[id]);
        return;
      }

      const r = Math.random() * 100;
      const ts = Date.now();
      const lat = {
        latency: r > 98 ? undefined : r,
        timestamp: ts,
      };
      window.webContents.send(Message.PING_DATA, lat);
    }, 100);
  };

  const handlePingRequest = (req: PingRequest) => {
    const id = crypto.createHash('sha1').update(req.host).digest('base64');
    createRequest(id);
  };

  ipc.on(Message.PING_REQUEST, (evt, req) => {
    handlePingRequest(req);
  });
};

