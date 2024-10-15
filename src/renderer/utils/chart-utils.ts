const BORDER_COLORS = ['rgba(75, 192, 192, 1)', 'rgba(0, 43, 73, 1)', 'rgba(0, 103, 160, 1)'];
const BG_COLORS = ['rgba(75, 192, 192, 0.8)', 'rgba(0, 43, 73, 0.8)', 'rgba(0, 103, 160, 0.8)'];

export const barChartOptionsBase = {
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
    responsive: true,
    datalabels: {
      color: '#fff',
      anchor: 'end',
      align: 'start',
      clamp: true,
      formatter: (_value, context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return label?.split(':')[0].trim() || '';
      },
    },
    title: {
      display: true,
      text: '',
      font: {
        size: 18,
      },
      position: 'bottom',
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: 'transparent',
        callback: (value, index) => (index === 0 ? value : ''),
      },
    },
    y: {
      grid: { display: false },
      ticks: {
        color: 'transparent',
        callback: (value, index) => (index === 0 ? value : ''),
      },
    },
  },
};

export const pieChartOptionsBase = {
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: '',
      font: {
        size: 18,
      },
      position: 'bottom',
    },
    responsive: true,
    datalabels: {
      color: 'white',
      formatter: () => '',
    },
  },
};

export const createChartDataWithSingleDataset = (labels: string[], data: any[], datasetLabel: any) => ({
  labels,
  datasets: [
    {
      label: datasetLabel,
      data,
      backgroundColor: BG_COLORS,
      borderColor: BORDER_COLORS,
      borderWidth: 1,
    },
  ],
});

export const createChartDataWithMultipleDatasets = (
  labels: string[],
  datasets: Array<{ label: string; data: number[] }>,
) => {
  return {
    labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: BG_COLORS[index % BG_COLORS.length],
      borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
      borderWidth: 1,
    })),
  };
};
