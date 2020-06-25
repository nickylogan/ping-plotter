import NetworkPing, { NetworkProtocol } from '../../usecase/metrics/NetworkPing';

class NetworkPingImpl implements NetworkPing {
  call(host: string, protocol: NetworkProtocol, timeout: number): Promise<number> {
    const data = Math.random() * 100;
    return Promise.resolve(data);
  }

  is(): string {
    return 'network-ping';
  }
}

export default NetworkPingImpl;
