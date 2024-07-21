import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from '@mui/material';
import { CpuLoadEvents } from '../features/hosts/queries/cpu-load-events';

// Register required Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface EventChartProps {
  data: CpuLoadEvents;
}

const EventChart: React.FC<EventChartProps> = ({ data }) => {
  // Extract timestamps, types, and colors for the chart
  const timestamps = data.events.map(event => new Date(event.startTimestamp).toLocaleTimeString());
  const events = data.events.map(event => ({
    timestamp: new Date(event.startTimestamp).toLocaleTimeString(),
    type: event.type,
  }));

  const eventTypes = Array.from(new Set(events.map(event => event.type))); // Get unique event types

  // Define colors for each event type
  const colors = {
    HeavyLoad: 'rgba(255, 99, 132, 0.4)', // Red
    Recovered: 'rgba(75, 192, 192, 0.4)', // Green
  };

  // Prepare datasets for the chart
  const datasets = eventTypes.map(type => {
    const dataPoints = events.map(event => event.type === type ? 1 : 0); // 1 for the event type, 0 otherwise

    return {
      label: type,
      data: dataPoints,
      borderColor: type === 'HeavyLoad' ? 'red' : 'green',
      backgroundColor: colors[type],
      fill: true,
      tension: 0.1,
    };
  });

  // Define chart data and options
  const chartData = {
    labels: timestamps,
    datasets: datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Event Presence',
        },
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Box sx={{ padding: 2, border: '1px solid gray', borderRadius: 1 }}>
      <Typography variant="h6">CPU Load Events Over Time</Typography>
      <div style={{ height: 300, width: '100%' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </Box>
  );
};

export default EventChart;
