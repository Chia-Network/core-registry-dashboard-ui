import { IntlShape } from 'react-intl';

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

export const stackedBarChartOptionsBase = {
  indexAxis: 'x',
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      title: {
        display: false,
      },
      ticks: {
        autoSkip: false,
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: { display: false },
      title: {
        display: true,
        text: 'Tons CO2',
      },
      ticks: {
        display: false,
      },
    },
  },

  plugins: {
    legend: {
      display: true,
      position: 'left',
    },
    title: {
      display: true,
      text: '',
      font: {
        size: 18,
      },
      position: 'bottom',
    },
    datalabels: {
      display: false,
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

export const createNoDataPlugin = (intl: IntlShape) => ({
  id: 'noDataPlugin',
  afterDatasetsDraw: (chart: any) => {
    const dataset = chart.data.datasets[0];
    const ctx = chart.ctx;

    if (dataset.data.length === 0) {
      const { width, height } = chart;
      chart.clear();
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '16px sans-serif';
      ctx.fillStyle = 'gray';
      ctx.fillText(intl.formatMessage({ id: 'no-data-available' }), width / 2, height / 2);
      ctx.restore();
    }
  },
});
