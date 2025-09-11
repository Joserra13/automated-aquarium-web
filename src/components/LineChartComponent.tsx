"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';

// Static data as fallback
const staticData = [
  {
    timestamp: 'Day 1',   
    sensor: 2400,
  },
  {
    timestamp: 'Day 2',
    sensor: 1398,
  },
  {
    timestamp: 'Day 3',
    sensor: 9800,
  },
  {
    timestamp: 'Day 4',
    sensor: 3908,
  },
  {
    timestamp: 'Day 5',
    sensor: 4800,
  },
  {
    timestamp: 'Day 6',
    sensor: 3800,
  },
  {
    timestamp: 'Day 7',
    sensor: 4300,
  },
];

type Sensor = {
  key: string;
  tag: string;
};

export default function LineChartComponent({ sensor }: { sensor: Sensor; }) {
  const [data, setData] = useState(staticData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/read-mongodb');
        if (response.ok) {
          const mongoData = await response.json();
          
          // Transform MongoDB data to chart format
            const chartData = mongoData.map((entry: any) => ({
            [sensor.key]: entry[sensor.key],
            timestamp: entry.timestamp,
            }));
          
          setData(chartData);
        } else {
          console.error('Failed to fetch data from API');
        }
      } catch (err) {
        console.error(`Something went wrong trying to fetch the data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  return (
    
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
      }}
    >
      <CartesianGrid opacity={0.1} />
      <XAxis dataKey="timestamp" stroke="#A5F3FC" />
      <YAxis stroke="#A5F3FC" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={`${sensor.key}`} stroke="#06b6d4" activeDot={{ r: 8 }} name={`${sensor.tag}`}/>
    </LineChart>
  );
}