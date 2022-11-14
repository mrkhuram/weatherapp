import { FC } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Weather Chart',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [120, 12, 12, 14, 11, 10],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

const BarChart: FC = () => {
  return (
    <div className='barchart p-2 border rounded m-2 !h-80  overflow-x-auto'>
      <div className='!h-full !min-w-[400px] max-w-[600px] m-auto'>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default BarChart
