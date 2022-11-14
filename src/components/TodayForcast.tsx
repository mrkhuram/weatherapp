import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '../helpers/classname'
import { State } from '../store/rootReducers'

const TodayForcast: FC = () => {
  const { weather } = useSelector((store: State) => store.WeatherReducer)
  const [show, setShow] = useState<boolean>(false)
  console.log(weather)
  return (
    <div className='today-forcast p-2 border mt-2 rounded'>
      <p className='text-xl leading-8 font-semibold mb-2 text-slate-700'>
        Today&lsquo;s Forecast for {weather?.name}, {weather?.sys?.country}
      </p>
      <div className='flex p-2 border mt-2'>
        <div className='current-weather'>
          <div className='text-sm'>Current Temp: {weather?.main?.temp}</div>
          <div className='text-sm'>Weather Condition: {weather?.weather[0]?.description}</div>
          <div className='text-sm'>
            Highest {weather?.main?.temp_max} and lowest {weather?.main?.temp_min}
          </div>
          {show && (
            <>
              <div className='text-sm'>Wind Speed: {weather?.wind?.speed * 3.6}</div>
              <div className='text-sm'>Humidity: {weather?.main?.humidity}%</div>
              <div className='text-sm'>Pressure: {weather?.main?.pressure}</div>
              <div className='text-sm'>
                Sunrise {getCurrentTime(weather?.timezone, weather?.sys?.sunrise)} and Sunset{' '}
                {getCurrentTime(weather?.timezone, weather?.sys?.sunset)}
              </div>
            </>
          )}
          <button className='outline-none background-none text-sm' onClick={() => setShow(!show)}>
            {show ? 'Less' : 'See more'}
          </button>
        </div>
        <div className='weather-icon'></div>
      </div>
    </div>
  )
}

const getCurrentTime = (timezone: number, time: number) => {
  const result = new Date((timezone + time) * 1000).toLocaleTimeString('en-PK', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  })
  return result
}
export default TodayForcast
