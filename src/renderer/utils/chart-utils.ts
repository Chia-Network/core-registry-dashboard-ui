import { IntlShape } from 'react-intl';
import { capitalizeText } from './text-utils';
import { rgbToString, stringToBlueRGB } from './color-utils';

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
        text: '',
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

export const createChartDataWithSingleDataset = (labels: string[], data: any[], datasetLabel: any) => {
  const backgroundColors = labels.map((label) => rgbToString(stringToBlueRGB(label)));
  const borderColors = labels.map((label) => rgbToString(stringToBlueRGB(label)));

  return {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
};

export const createChartDataWithMultipleDatasets = (
  labels: string[],
  datasets: Array<{ label: string; data: number[] }>,
) => {
  return {
    labels,
    datasets: datasets.map((dataset) => {
      const baseColor = stringToBlueRGB(dataset.label);
      const backgroundColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.9)`;
      const borderColor = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 1)`;

      return {
        label: dataset.label,
        data: dataset.data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      };
    }),
  };
};

export const createNoDataPlugin = (intl: IntlShape) => ({
  id: 'noDataPlugin',
  afterDatasetsDraw: (chart: any) => {
    const datasets = chart.data.datasets;
    const ctx = chart.ctx;

    const allDataEmpty = datasets.every((dataset: any) => {
      if (Array.isArray(dataset.backgroundColor)) {
        return dataset.data.every((value: number) => value === 0);
      }
      return dataset.data.length === 0;
    });
    if (allDataEmpty) {
      const { width, height } = chart;
      chart.clear();
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '16px sans-serif';
      ctx.fillStyle = 'gray';
      ctx.fillText(capitalizeText(intl.formatMessage({ id: 'no-data-available' })), width / 2, height / 2);
      ctx.restore();
    }
  },
});
