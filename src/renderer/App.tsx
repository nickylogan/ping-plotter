import React from 'react';
import styles from './App.module.less';
import LatencyChart from './components/LatencyChart';

function App() {
  return (
    <div className={styles.App}>
      <LatencyChart
        host={'8.8.8.8'}
        color={'#419EF9'}
        timeoutColor={'#FD77A4'}
        style={{ height: 400, width: 800 }}
        seconds={30}
      />
    </div>
  );
}

export default App;
