import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '../helpers/classname'
import { State } from '../store/rootReducers'

const TodayForcast: FC = () => {
  const { weather, cUnit } = useSelector((store: State) => store.WeatherReducer)
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className='today-forcast p-2 border mt-2 rounded'>
      <p className='text-xl leading-8 font-semibold mb-2 text-slate-700'>
        Today&lsquo;s Forecast for {weather?.name}, {weather?.sys?.country}
      </p>
      <div className='flex p-2 border rounded mt-2'>
        <div className='current-weather'>
          <div className='text-sm text-gray-900 font-bold'>
            Current Temp:{' '}
            <span className='capitalize font-normal'>
              {weather &&
                (cUnit === 'celsius'
                  ? weather?.main?.temp + '°C'
                  : weather?.main?.temp * 1.8 + 32 + '°F')}
            </span>
          </div>
          <div className='text-sm text-gray-900 font-bold'>
            Weather Condition:{' '}
            <span className='capitalize font-normal'>{weather?.weather[0]?.description}</span>
          </div>
          <div className='text-sm text-gray-900 font-bold'>
            Highest{' '}
            <span className='capitalize font-normal'>
              {weather &&
                (cUnit === 'celsius'
                  ? weather?.main?.temp_max + '°C'
                  : weather?.main?.temp_max * 1.8 + 32 + '°F')}
            </span>{' '}
            and lowest{' '}
            <span className='capitalize font-normal'>
              {weather &&
                (cUnit === 'celsius'
                  ? weather?.main?.temp_min + '°C'
                  : weather?.main?.temp_min * 1.8 + 32 + '°F')}
            </span>
          </div>
          {show && (
            <>
              <div className='text-sm text-gray-900 font-bold'>
                Wind Speed:{' '}
                <span className='capitalize font-normal'>
                  {weather && weather?.wind?.speed * 3.6}
                </span>
              </div>
              <div className='text-sm text-gray-900 font-bold'>
                Humidity:{' '}
                <span className='capitalize font-normal'>
                  {weather && weather?.main?.humidity}%
                </span>
              </div>
              <div className='text-sm text-gray-900 font-bold'>
                Pressure:{' '}
                <span className='capitalize font-normal'>{weather && weather?.main?.pressure}</span>
              </div>
              <div className='text-sm text-gray-900 font-bold'>
                Sunrise{' '}
                <span className='uppercase font-normal'>
                  {weather && getCurrentTime(weather?.timezone, weather?.sys?.sunrise)}
                </span>
                <span className='font-normal'> and</span> Sunset{' '}
                <span className='uppercase font-normal'>
                  {weather && getCurrentTime(weather?.timezone, weather?.sys?.sunset)}
                </span>
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
