import Header from './components/header'
import { classNames } from './helpers/classname'
import { BsArrowLeftRight } from 'react-icons/bs'
import BarChart from './components/barchart'
import Carousel from './components/carousel'
import TempConverter from './components/tempConverter'
import SearchComp from './components/searchComp'
import TodayForcast from './components/TodayForcast'
import { State } from './store/rootReducers'
import { useSelector } from 'react-redux'

function App() {
  const { error } = useSelector((store: State) => store.WeatherReducer)
  return (
    <div className='wrapper container mx-auto'>
      <Header />
      {error && <div className='text-lg font-bold text-red-300'>{error}</div>}
      <SearchComp />
      <div className={classNames('p-3 flex flex-col', 'xs:flex-row')}>
        <div className={classNames('left-wrapper w-12/12', 'xs:w-6/12')}>
          <TodayForcast />
          <div className='weekly-forcast p-2 pt-5 pb-1.5 border rounded mt-2'>
            <Carousel />
          </div>
        </div>
        <div className={classNames('right-wrapper w-12/12 ', 'xs:w-6/12')}>
          <TempConverter />
          <BarChart />
        </div>
      </div>
    </div>
  )
}

export default App
