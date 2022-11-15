import { ChangeEvent, FC, useState, KeyboardEvent } from 'react'
import { classNames } from '../helpers/classname'
import { getCurrentWeather, getWeatherByZip } from '../store/weather/weather.action'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Actions, State } from '../store/rootReducers'

const SearchComp: FC = () => {
  const [type, setType] = useState<string>('0')
  const [error, setError] = useState<boolean>(false)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const thunkDispatch: ThunkDispatch<State, undefined, Actions> = useDispatch()

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      if (type == '1') {
        thunkDispatch(getCurrentWeather(searchKeyword))
        return true
      }
      if (type == '2') {
        thunkDispatch(getWeatherByZip(searchKeyword))
        return true
      }
      setError(true)
    }
  }

  return (
    <div className={classNames('flex p-3 pr-5 justify-between flex-col', 'xs:flex-row')}>
      <input
        type='text'
        className={classNames(
          'py-2 px-3 text-lg rounded-md border w-12/12 outline-none',
          'xs:w-10/12',
        )}
        placeholder='Search Weather'
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value)
        }}
        onKeyDown={searchHandler}
        data-testid='search_input'
      />
      <select
        name=''
        id=''
        defaultValue={type}
        className={classNames(
          'py-2 px-3 rounded border w-12/12 outline-none mt-2',
          'xs:mt-0 xs:w-2/12 xs:ml-4',
          error && 'border-red-400',
        )}
        onChange={(e) => {
          setType(e.target.value)
          setError(false)
        }}
        data-testid='search_by'
      >
        <option value='0'>Search By</option>
        <option value='1'>City Name</option>
        <option value='2'>Zip Code</option>
      </select>
    </div>
  )
}

export default SearchComp
