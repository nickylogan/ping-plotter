import React from 'react';
import styles from './App.module.less';
import Dashboard from './container/Dashboard';

function App() {
  return (
    <div className={styles.App}>
      <Dashboard />
    </div>
  );
}

export default App;
