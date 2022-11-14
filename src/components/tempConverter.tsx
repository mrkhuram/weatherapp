import { FC } from 'react'
import { classNames } from '../helpers/classname'
import { BsArrowLeftRight } from 'react-icons/bs'

const TempConverter: FC = () => {
  return (
    <div className='temp-converter p-2 m-2 border rounded'>
      <p className='text-xl leading-8 font-semibold mb-2 text-slate-700'>Temprature Converter</p>
      <div
        className={classNames(
          'p-3 flex items-center justify-between w-12/12 m-auto mt-2',
          'xs:w-9/12',
          'sm:w-full',
        )}
      >
        <button className='py-2 px-3 border rounded-md w-28'>Celsius</button>
        <BsArrowLeftRight size={28} />
        <button className='py-2 px-3 border rounded-md w-28'>Fahrenheit</button>
      </div>
    </div>
  )
}

export default TempConverter
