import { Dispatch } from 'redux'
import { searchByCity, searchByZip, fiveDayForecast } from '../../services/weather'
import { CHANGE_TEMP_UNIT, CURRENT_WEATHER, DAY_FORECAST, ERROR_HANDLER } from './weather.type'

const getFiveDayItems = (forecast: any) => {
  return Object.values(
    forecast.list.reduce((r: any, o: any) => {
      const date = o.dt_txt.substring(0, 10)
      if (!(date in r)) r[date] = { ...o }
      return r
    }, {}),
  )
}

const getItemsWithSameDate = (date: string, completeForecast: any) => {
  return completeForecast.list.filter((ele: any) => {
    return ele.dt_txt.includes(date.slice(0, 11))
  })
}

export const getCurrentWeather = (cityname: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ERROR_HANDLER,
        payload: false,
      })
      const result = await searchByCity(cityname)
      const forecast = await fiveDayForecast(result.coord.lat, result.coord.lon)
      const fiveDay = await getFiveDayItems(forecast)
      dispatch({
        type: CURRENT_WEATHER,
        payload: { current: result, forecast: fiveDay, completeForecast: forecast },
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: ERROR_HANDLER,
        payload: 'Something went wrong, kindly try again with different query.',
      })
    }
  }
}
export const getWeatherByZip = (zip: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ERROR_HANDLER,
        payload: false,
      })
      const zipcode = parseInt(zip)
      const result = await searchByZip(zipcode)
      const forecast = await fiveDayForecast(result.coord.lat, result.coord.lon)
      const fiveDay = await getFiveDayItems(forecast)
      dispatch({
        type: CURRENT_WEATHER,
        payload: { current: result, forecast: fiveDay, completeForecast: forecast },
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: ERROR_HANDLER,
        payload: 'Something went wrong, kindly try again with different query.',
      })
    }
  }
}
export const forcastFor = (date: string, completeForecast: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ERROR_HANDLER,
        payload: false,
      })
      console.log(date, completeForecast)
      const result = getItemsWithSameDate(date, completeForecast)
      console.log(result)
      dispatch({
        type: DAY_FORECAST,
        payload: result,
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: ERROR_HANDLER,
        payload: 'Something went wrong, kindly try again with different query.',
      })
    }
  }
}
export const changeTempUnitAction = (unit: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: CHANGE_TEMP_UNIT,
        payload: unit,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
