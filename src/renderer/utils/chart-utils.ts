export const BAR_COLORS = ['#53D9D9', '#002B49', '#0067A0'];
export const PIE_COLORS = ['#53D9D9', '#002B49'];

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
    responsive: true,
    datalabels: {
      color: 'white',
      formatter: () => '',
    },
  },
};

export const generateBarChartData = (data: { labelKey?: string; tonsCo2: number }[], labelKey: string) => {
  const filtered = data
    .filter((item) => item.tonsCo2 > 0 && item[labelKey])
    .sort((a, b) => b.tonsCo2 - a.tonsCo2)
    .slice(0, 3);

  const labels = filtered.map((item) => {
    const label = item[labelKey];
    return label ? (label.length > 35 ? label.slice(0, 35) + '...' : label) : '';
  });

  const chartData = filtered.map((item) => item.tonsCo2);

  return {
    labels,
    datasets: [
      {
        label: 'tonsCo2',
        data: chartData,
        backgroundColor: BAR_COLORS,
        borderWidth: 1,
      },
    ],
  };
};

export const generatePieChartData = (labels: string[], data: number[]) => ({
  labels,
  datasets: [
    {
      label: 'Count',
      data,
      backgroundColor: PIE_COLORS,
      borderWidth: 1,
    },
  ],
});
