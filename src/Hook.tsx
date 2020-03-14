import React, { FC, useState, useEffect, useRef } from 'react';
import { Button } from 'antd';

interface IcurrentRef {
  current: boolean | null;
};
const Hook: FC = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(111);
  // componentDidMount 
  useEffect(() => {
    console.log('count ====');
    document.title = `title ${count}`;
  }, []);
  // componentDidUpdate
  const mounted: IcurrentRef = useRef(null);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  });

  // compontWillUnMount
  useEffect(() => {
    return () => {
      setInterval(() => {
        console.log('interval ====');
      }, 500);
    };
  });
  const addCount = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <Button onClick={addCount}>添加</Button>
      <div>{count}</div>
      <div onClick={() => {setNum(num + 1)}}>{num}</div>
    </div>
  );
};

export default Hook;