"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    waterTemp: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    waterTemp: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    waterTemp: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    waterTemp: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    waterTemp: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    waterTemp: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    waterTemp: 4300,
    amt: 2100,
  },
];

export default function LineChartComponent() {
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
        <XAxis dataKey="name" stroke="#A5F3FC"/>
        <YAxis stroke='#A5F3FC'/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="waterTemp" stroke="#06b6d4" activeDot={{ r: 8 }} />
      </LineChart>
  );
}