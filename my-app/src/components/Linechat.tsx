import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  return (
   <div style={{ width: '100%', maxWidth: 600 }}>
  <LineChart
    xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'] }]}
    series={[
      { data: [10, 20, 15, 30], label: 'Sales 2025', color: 'blue' },
      { data: [5, 15, 10, 25], label: 'Sales 2024', color: 'orange' },
    ]}
    height={300}
  />
</div>
  );
}
