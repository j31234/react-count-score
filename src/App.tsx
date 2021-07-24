import React, { useState } from "react";
import { Table, Button, InputNumber, message } from "antd";
import "./App.css";

const App: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [status, setStatus] = useState(new Array(5).fill(0));
  const scoreEnd = [60, 70, 80, 90, 101];

  const onInputChange = (value: number | string | undefined) => {
    if (value)
      setScore(parseInt(value.toString()));
  };

  const handleReSet = () => {
    setScore(0);
    setStatus(new Array(5).fill(0));
  };

  const handleSubmit = () => {
    if (score < 0 || score > 100) {
      message.error("无效分数！");
    } else {
      message.success("录入成功");
      const statusCopy = Array.from(status);
      for (let i = 0; i < 5; i++)
        if (score < scoreEnd[i]) {
          statusCopy[i]++;
          setStatus(statusCopy);
          break;
        }
    }
  };

  const dataSource = [status];

  const columns = [
    {
      title: '<60',
      dataIndex: 0,
    },
    {
      title: '60-69',
      dataIndex: 1,
    },
    {
      title: '70-79',
      dataIndex: 2,
    },
    {
      title: '80-89',
      dataIndex: 3,
    },
    {
      title: '90-100',
      dataIndex: 4,
    },
  ];

  return (
    <div>
      <h1>统计分数</h1>
      <p>输入分数:</p>
      <InputNumber defaultValue={0} onChange={onInputChange} />
      <Button onClick={handleSubmit} type="primary">
        提交
      </Button>
      <Button onClick={handleReSet}>
        重置
      </Button>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default App;