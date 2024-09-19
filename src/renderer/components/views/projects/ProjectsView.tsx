import { BarChart, Card, GlossaryModal } from '@/components';
import { ProjectsCount } from '@/schemas/ProjectsCount.schema';
import { useUrlHash } from '@/hooks';

interface ProjectViewProps {
  data: ProjectsCount[];
  isLoading: boolean;
}

const chartData = {
  labels: ['Company A', 'Company B', 'Company C'],
  datasets: [
    {
      label: 'Payment Amount',
      data: [500, 750, 1200],
      backgroundColor: ['#53D9D9', '#002B49', '#0067A0'],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  indexAxis: 'y',
  plugins: {
    legend: {
      display: true,
    },
  },
};

const allowedStatuses = ['Registered', 'Authorized', 'Approved'];

const ProjectsView: React.FC<ProjectViewProps> = ({ data, isLoading = false }) => {
  const [active, setActive] = useUrlHash('glossary');

  const openModal = () => {
    setActive(true);
  };

  const filteredData = data.filter((status) => allowedStatuses.includes(status.projectStatus));

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-16 m-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {filteredData?.map((status) => (
          <Card key={status.projectStatus}>
            <div className="flex flex-col gap-4 p-4 text-center">
              <h3 className="text-7xl bold">{status.count}</h3>
              <h4 className="text-lg font-semibold">
                <a
                  href="#glossary"
                  onClick={() => openModal()}
                  className={`${
                    status.projectStatus.toLowerCase() === 'approved'
                      ? 'text-lime-500 text-left dark:text-green-400'
                      : status.projectStatus.toLowerCase() === 'authorized'
                        ? 'text-left text-sky-400 dark:text-blue-500'
                        : 'text-gray-900 dark:text-white'
                  } underline`}
                >
                  Projects {status.projectStatus}
                </a>
              </h4>
            </div>
          </Card>
        ))}
        <GlossaryModal onClose={() => setActive(false)} open={active} />
      </div>
      {/* This is sample graph. Update it with the actual data */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="mb-4 text-xl font-bold">Chart 1</h4>
          <BarChart data={chartData} options={chartOptions} />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="mb-4 text-xl font-bold">Chart 2</h4>
          <BarChart data={chartData} options={chartOptions} />
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="mb-4 text-xl font-bold">Chart 3</h4>
          <BarChart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export { ProjectsView };
