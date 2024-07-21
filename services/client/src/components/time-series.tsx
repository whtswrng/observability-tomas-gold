import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Box, Typography } from "@mui/material";
import { CpuLoadMetrics } from "../features/hosts/queries/metrics";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface TimeSeriesProps {
  data: CpuLoadMetrics;
}

interface TimeSeriesPoint {
  timestamp: number;
  value: string | number;
}

const TimeSeries: React.FC<{ data: Array<TimeSeriesPoint> | undefined; label: string }> = ({ data, label }) => {
  if (!data) return;

  const timestamps = data.map((metric) => new Date(metric.timestamp).toLocaleTimeString());
  const loads = data.map((metric) => metric.value);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: label,
        data: loads,
        borderColor: "#42A5F5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: label,
        },
        min: 0,
      },
    },
  };

  return (
    <Box sx={{ padding: 2, width: 700 }}>
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default TimeSeries;
