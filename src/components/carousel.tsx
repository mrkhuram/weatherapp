import { FC, useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../store/rootReducers'
// Data
import data from './data.json'

interface resource {
  title: string
  link: string
  imageUrl: string
}

const Carousel: FC = () => {
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const carousel = useRef<HTMLHeadingElement>(null)
  const { forecast } = useSelector((store: State) => store.WeatherReducer)
  console.log(forecast)
  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1)
    }
  }

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1)
    }
  }

  const isDisabled = (direction: string) => {
    if (direction === 'prev') {
      return currentIndex <= 0
    }

    if (direction === 'next' && carousel.current !== null) {
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
    }

    return false
  }

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0
  }, [])

  return (
    <div className='carousel my-2 mx-auto'>
      <h2 className='text-xl leading-8 font-semibold mb-2 text-slate-700'>
        Weekly Forecast for Faisalabad
      </h2>
      <div className='relative overflow-hidden'>
        <div
          ref={carousel}
          className='carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0'
        >
          {forecast?.list?.map((resource: any, index: number) => {
            if ([0, 8, 16, 24, 32].includes(index)) {
              return (
                <div
                  key={index}
                  className='carousel-item text-center relative w-44 h-44 snap-start border rounded'
                >
                  <a
                    href={resource.link}
                    className='h-full w-full aspect-square block  bg-left-top bg-cover bg-no-repeat z-0'
                  >
                    <div className='text-sm w-full'>{resource.dt_txt}</div>
                    <div className='text-sm'>
                      Weather Condition: <span className='capitalize'>{resource.weather[0].description}</span>
                    </div>
                    <div className='text-sm'>
                      Current Temp: <span className='capitalize'>{resource.main.temp}</span>
                    </div>
                    <div className='text-sm'>
                      Highest Temp: <span className='capitalize'>{resource.main.temp_max}</span>
                    </div>
                    <div className='text-sm'>
                      Lowest Temp: <span className='capitalize'>{resource.main.temp_min}</span>
                    </div>
                  </a>
                </div>
              )
            }
          })}
        </div>
      </div>
      <div className='flex justify-between w-44 m-auto'>
        <button
          onClick={movePrev}
          className='text-white w-10 h-full text-center opacity-75 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
          disabled={isDisabled('prev')}
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
          disabled={isDisabled('next')}
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

export default Carousel
