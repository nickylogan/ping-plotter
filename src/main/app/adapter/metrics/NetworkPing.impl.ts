import autoBind from 'auto-bind';
import pingman from 'pingman';
import NetworkPing, { NetworkProtocol } from '../../usecase/metrics/NetworkPing';

class NetworkPingImpl implements NetworkPing {
  public static readonly DEFAULT_TIMEOUT = 2000;

  constructor() {
    autoBind(this);
  }

  call(host: string, protocol: NetworkProtocol, timeout?: number): Promise<number> {
    if (timeout === undefined) {
      timeout = NetworkPingImpl.DEFAULT_TIMEOUT;
    }

    switch (protocol) {
      case 'icmp':
        return NetworkPingImpl.callICMP(host, timeout);
      case 'tcp':
        return NetworkPingImpl.callTCP(host, '', timeout);
      case 'udp':
        return NetworkPingImpl.callUDP(host, '', timeout);
      default:
        return Promise.reject(`unsupported protocol: ${protocol}`);
    }
  }

  is(): string {
    return 'network-ping';
  }

  private static async callICMP(hostname: string, timeout: number): Promise<number> {
    try {
      const resp = await pingman(hostname, {
        numberOfEchos: 1,
        timeout: timeout,
      });
      return Promise.resolve(resp.avg);
    } catch (e) {
      return Promise.reject(`ping failed: ${e}`);
    }
  }

  private static async callUDP(host: string, port: string, timeout: number): Promise<number> {
    return Promise.reject('udp is not yet supported');
  }

  private static async callTCP(host: string, port: string, timeout: number): Promise<number> {
    return Promise.reject('tcp is not yet supported');
  }
}

export default NetworkPingImpl;
