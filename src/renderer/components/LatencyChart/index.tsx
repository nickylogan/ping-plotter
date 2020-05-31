import React, { CSSProperties, useState } from 'react';
import { Card, Typography } from 'antd';
import { CartesianGrid, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import styles from './style.module.less';
import { useInterval } from '../../hooks';
import clsx from 'clsx';

const { Text } = Typography;

export type ChartProps = {
  host: string;
  color?: string;
  timeoutColor?: string;
  seconds?: number;

  className?: string;
  style?: CSSProperties;
}

export const DEFAULT_SECONDS = 60;

type Latency = {
  latency?: number;
  timestamp: number;
}

const LatencyChart: React.FC<ChartProps> = (
  {
    host,
    color,
    timeoutColor,
    seconds,
    className,
    style,
  }
) => {
  const [data, setData] = useState<Latency[]>([]);
  const [prevRto, setPrevRto] = useState<boolean>(false);
  const [prevTs, setPrevTs] = useState<number>(Date.now());
  const [timeouts, setTimeouts] = useState<[number, number][]>([]);

  color = color || '#ffffff';
  timeoutColor = timeoutColor || '#ff0000';
  seconds = seconds || DEFAULT_SECONDS;

  const appendData = (lat: Latency) => {
    setData([...data, lat].filter(x => (
      moment(x.timestamp).isAfter(
        moment(Date.now()).subtract(seconds, 'seconds')
      )
    )))
  };

  const appendTimeout = (interval: [number, number]) => {
    setTimeouts([...timeouts, interval].filter(interval => (
      moment(interval[1]).isAfter(
        moment(Date.now()).subtract(seconds, 'seconds')
      )
    )) as [number, number][]);
  }

  useInterval(() => {
    const r = Math.random() * 100;
    const ts = Date.now();
    const lat: Latency = {
      latency: r > 98 ? undefined : r,
      timestamp: ts,
    };

    if (lat.latency === undefined) {
      setPrevRto(true);
      appendTimeout([prevTs, ts]);
    } else if (prevRto){
      setPrevRto(false);
      appendTimeout([prevTs, ts]);
    }

    appendData(lat);
    setPrevTs(ts);
  }, 100);

  const title = <Text>Latency over time to <Text code>{host}</Text></Text>;
  return (
    <Card hoverable title={title} className={clsx(styles.card, className)} style={style}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="10 10" stroke='#fffffff' strokeOpacity={0.1}/>
          <XAxis
            dataKey="timestamp"
            domain={['auto', 'auto']}
            name="Timestamp"
            tickFormatter={t => moment(t).format('HH:mm:ss')}
            type="number"
            scale="time"
            interval="preserveStartEnd"
            allowDataOverflow
          />
          <YAxis dataKey="latency" name="Latency (ms)"/>
          <Tooltip content={<></>}/>
          <Line
            dot={false}
            dataKey="latency"
            type="linear"
            stroke={color}
            strokeWidth={2}
            isAnimationActive={false}
          />
          {timeouts.map(interval => (
            <ReferenceArea
              key={interval[0]}
              x1={interval[0]} x2={interval[1]}
              fill={timeoutColor}
            />))
          }
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LatencyChart;