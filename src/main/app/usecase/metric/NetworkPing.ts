import MetricGenerator from '../MetricGenerator';

export type NetworkProtocol = 'tcp' | 'udp' | 'icmp';

interface NetworkPing extends MetricGenerator {
  call(host: string, protocol: NetworkProtocol, timeout: number);
}

export default NetworkPing;
