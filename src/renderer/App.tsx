import React from 'react';
import styles from './App.module.less';
import Chart from './components/Chart';

function App() {
  return (
    <div className={styles.App}>
      <Chart
        host={'8.8.8.8'}
        color={"#E66AD2"}
        style={{ height: 400, width: 800 }}
        seconds={30}
      />
    </div>
  );
}

export default App;
