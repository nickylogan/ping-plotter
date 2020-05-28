import React from 'react';
import { Button, Card, Typography } from 'antd';
import styles from './App.module.less';

const { Text } = Typography;

function App() {
  return (
    <div className={styles.App}>
      <Card hoverable title={
        <Text>Latency over time to <Text code>google.com</Text></Text>
      } bordered={false}>
        <Button>Cool!</Button>
      </Card>
    </div>
  );
}

export default App;
