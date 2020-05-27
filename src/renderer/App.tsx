import React from "react";
import { Card, Button } from "antd";
import styles from "./App.module.less";

function App() {
  return (
    <div className={styles.App}>
      <Card hoverable title="It works!" bordered={false} style={{ width: 300 }}>
        <Button type="primary">Yay!</Button>
      </Card>
    </div>
  );
}

export default App;
