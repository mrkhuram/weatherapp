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
import { useSelector } from 'react-redux'
import { State } from '../store/rootReducers'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Weather Chart',
    },
  },
}

const BarChart: FC = () => {
  const { forecastForDay } = useSelector((store: State) => store.WeatherReducer)
  const labels = [
    '00:00 AM',
    '03:00 AM',
    '06:00 AM',
    '09:00 AM',
    '12:00 PM',
    '03:00 PM',
    '06:00 PM',
    '09:00 PM',
  ]
  const data = {
    labels,
    datasets: [
      {
        data: forecastForDay?.map((ele: any) => ele.main.temp),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        hoverBackgroundColor: ['#FF5A5E'],
      },
    ],
  }

  return (
    <div className='barchart p-2 border rounded m-2 !h-80  overflow-x-auto'>
      <div className='!h-full !min-w-[400px] max-w-[600px] m-auto'>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default BarChart
