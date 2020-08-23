"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pingman_1 = __importDefault(require("pingman"));
var NetworkPing_impl_1 = __importDefault(require("./NetworkPing.impl"));
jest.mock('pingman');
describe('is()', function () {
    it('should return \'network-ping\'', function () {
        var networkPing = new NetworkPing_impl_1.default();
        expect(networkPing.is()).toBe('network-ping');
    });
});
describe('call()', function () {
    var mockedPingman = pingman_1.default;
    it('should resolve with a latency in icmp ping', function () {
        var networkPing = new NetworkPing_impl_1.default();
        var host = 'localhost';
        var protocol = 'icmp';
        mockedPingman.mockResolvedValue({
            alive: true,
            bufferSize: 56,
            host: 'localhost',
            max: 0.036,
            min: 0.036,
            numericHost: '127.0.0.1',
            output: 'PING localhost (127.0.0.1): 56 data bytes\n' +
                '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.036 ms\n' +
                '\n' +
                '--- localhost ping statistics ---\n' +
                '1 packets transmitted, 1 packets received, 0.0% packet loss\n' +
                'round-trip min/avg/max/stddev = 0.036/0.036/0.036/0.000 ms\n',
            packetLoss: '0.0',
            stddev: 0.000,
            time: 0.036,
            times: [0.036],
            avg: 0.036,
        });
        expect(networkPing.call(host, protocol)).resolves.toBe(0.036);
    });
    it('should reject if icmp ping fails', function () {
        var networkPing = new NetworkPing_impl_1.default();
        var host = '8.8.8.8';
        var protocol = 'icmp';
        mockedPingman.mockRejectedValue("error");
        expect(networkPing.call(host, protocol)).rejects.toBeDefined();
    });
    it.skip('should resolve with a latency in udp ping', function () {
        var networkPing = new NetworkPing_impl_1.default();
        var host = 'localhost';
        var protocol = 'udp';
        // TODO: add mock if udp ping is implemented
        expect(networkPing.call(host, protocol)).resolves.toBe(0);
    });
    it.skip('should resolve with a latency in tcp ping', function () {
        var networkPing = new NetworkPing_impl_1.default();
        var host = 'localhost';
        var protocol = 'tcp';
        // TODO: add mock if tcp ping is implemented
        expect(networkPing.call(host, protocol)).resolves.toBe(0);
    });
    it('should not allow invalid protocols', function () {
        var networkPing = new NetworkPing_impl_1.default();
        var host = '8.8.8.8';
        var protocol = 'abc';
        // @ts-ignore to allow other protocol
        expect(networkPing.call(host, protocol)).rejects.toBeDefined();
    });
});
