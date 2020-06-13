import React from 'react';
import { Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import LatencyChart from '../../components/LatencyChart';
import styles from './styles.module.less';

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = {};

const layout: Layouts = {
  lg: [
    { i: 'a', x: 2, y: 2, w: 4, h: 2 },
    { i: 'b', x: 6, y: 2, w: 4, h: 2 },
  ]
};

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <ResponsiveGridLayout
      className={styles.dashboard}
      layouts={layout}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      compactType="vertical"
      containerPadding={[16, 16]}
      draggableHandle=".drag-handle"
    >
      <div key="a">
        <LatencyChart
          className={styles.widget}
          host={'8.8.8.8'}
          color={'#419EF9'}
          timeoutColor={'#FD77A4'}
          seconds={30}
        />
      </div>
      <div key="b">
        <LatencyChart
          className={styles.widget}
          host={'8.8.8.8'}
          color={'#419EF9'}
          timeoutColor={'#FD77A4'}
          seconds={30}
        />
      </div>
    </ResponsiveGridLayout>
  );
};

export default Dashboard;