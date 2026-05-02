import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function RadarChart({ scores }) {
  const data = {
    labels: ['자기 이해', '세계 이해', '방향 설정', '실행/영향'],
    datasets: [
      {
        label: '성장 4분면',
        data: [scores[1], scores[2], scores[3], scores[4]],
        backgroundColor: 'rgba(139, 92, 246, 0.22)',
        borderColor: '#A78BFA',
        borderWidth: 3,
        pointBackgroundColor: ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'],
        pointBorderColor: '#F8FAFC',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20, color: 'rgba(248,250,252,.55)', backdropColor: 'transparent' },
        grid: { color: 'rgba(248,250,252,.12)' },
        angleLines: { color: 'rgba(248,250,252,.14)' },
        pointLabels: { color: '#F8FAFC', font: { size: 13, weight: '700' } },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
  };

  return (
    <div className="h-72 sm:h-96">
      <Radar data={data} options={options} />
    </div>
  );
}
