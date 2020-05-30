import React, { CSSProperties, useState } from 'react';
import { Card, Typography } from 'antd';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import styles from './style.module.less';
import { useInterval } from '../../hooks';
import clsx from 'clsx';

const { Text } = Typography;

export type ChartProps = {
  host: string;
  color: string;
  seconds?: number;

  className?: string;
  style?: CSSProperties;
}

export const DEFAULT_SECONDS = 60;

type Latency = {
  latency: number;
  timestamp: number;
}

const Chart: React.FC<ChartProps> = ({ host, color, seconds, className, style }) => {
  const [data, setData] = useState<Latency[]>([]);

  seconds = seconds || DEFAULT_SECONDS;

  useInterval(() => {
    setData([...data, {
      latency: Math.random() * 100,
      timestamp: Date.now()
    }].filter(x => (
      moment(x.timestamp).isAfter(
        moment(Date.now()).subtract(seconds, 'seconds')
      )
    )));
  }, 100);

  const title = <Text>Latency over time to <Text code>{host}</Text></Text>;
  return (
    <Card hoverable title={title} className={clsx(styles.card, className)} style={style}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis
            dataKey="timestamp"
            domain={['dataMin', 'auto']}
            name="Timestamp"
            tickFormatter={t => moment(t).format('HH:mm:ss')}
            type="number"
            scale="time"
            interval="preserveStartEnd"
            allowDataOverflow
          />
          <YAxis dataKey="latency" name="Latency (ms)"/>
          <Tooltip/>
          <Line
            dot={false}
            dataKey="latency"
            data={data}
            type="monotone"
            stroke={color}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;