import { FC, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Actions, State } from '../store/rootReducers'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { forcastFor } from '../store/weather/weather.action'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
}

const CarouselComp: FC = () => {
  const carousel = useRef<Carousel>(null)
  const { forecast, completeForecast, weather, cUnit } = useSelector(
    (store: State) => store.WeatherReducer,
  )
  const thunkDispatch: ThunkDispatch<State, undefined, Actions> = useDispatch()
  const movePrev = () => {
    const cSlide: any = carousel.current?.state?.currentSlide
    carousel?.current?.goToSlide(cSlide - 1)
  }

  const moveNext = () => {
    const cSlide: any = carousel.current?.state?.currentSlide
    carousel?.current?.goToSlide(cSlide + 1)
  }

  const currentItem = (date: string) => {
 
    thunkDispatch(forcastFor(date, completeForecast))
  }

  return (
    <div className='carousel my-2 mx-auto'>
      <h2 className='text-xl leading-8 font-semibold mb-2 text-slate-700'>
        Weekly Forecast for {weather?.name}, {weather?.sys?.country}
      </h2>
      <div className='relative overflow-hidden pb-12'>
        {forecast && (
          <Carousel
            responsive={responsive}
            arrows={false}
            showDots
            renderDotsOutside
            ref={carousel}
            itemClass='!w-52 mr-4'
            infinite
            dotListClass='!mt-5'
          >
            {forecast?.map((resource: any, index: number) => {
              return (
                <div
                  key={index}
                  className='carousel-item  p-2 relative w-52 h-44 snap-start border rounded'
                  onClick={() => currentItem(resource.dt_txt)}
                >
                  <div className='h-full w-full aspect-square block  bg-left-top bg-cover bg-no-repeat z-0'>
                    <div className='text-sm w-full'>{resource.dt_txt}</div>
                    <div className='text-sm text-gray-900 font-bold'>
                      Weather Condition:{' '}
                      <div className='capitalize font-normal ml-5'>
                        {resource.weather[0].description}
                      </div>
                    </div>
                    <div className='text-sm text-gray-900 font-bold'>
                      Current Temp:{' '}
                      <span className='capitalize font-normal'>
                        {cUnit === 'celsius'
                          ? resource.main.temp + '°C'
                          : resource.main.temp * 1.8 + 32 + '°F'}
                      </span>
                    </div>
                    <div className='text-sm text-gray-900 font-bold'>
                      Highest Temp:{' '}
                      <span className='capitalize font-normal '>
                        {cUnit === 'celsius'
                          ? resource.main.temp_max + '°C'
                          : ((resource.main.temp_max * 1.8) + 32) + '°F'}
                      </span>
                    </div>
                    <div className='text-sm text-gray-900 font-bold'>
                      Lowest Temp:{' '}
                      <span className='capitalize font-normal'>
                        {cUnit === 'celsius'
                          ? resource.main.temp_min + '°C'
                          : ((resource.main.temp_min * 1.8) + 32) + '°F'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </Carousel>
        )}
      </div>
      <div className='flex justify-between w-56 m-auto relative -top-8'>
        <button
          onClick={movePrev}
          className='text-white w-10 h-full text-center opacity-75 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-20 -ml-5'
            fill='black'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
          </svg>
          <span className='sr-only'>Prev</span>
        </button>

        <button
          onClick={moveNext}
          className='text-white w-10 h-full text-center opacity-75 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-20 -ml-5'
            fill='black'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
          </svg>
          <span className='sr-only'>Next</span>
        </button>
      </div>
    </div>
  )
}

export default CarouselComp
