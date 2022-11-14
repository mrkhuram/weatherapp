import { Dispatch } from 'redux'
import { searchByCity, searchByZip, fiveDayForecast } from '../../services/weather'
import { CURRENT_WEATHER } from './weather.type'

export const getCurrentWeather = (cityname: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const result = await searchByCity(cityname)
      const forecast = await fiveDayForecast(result.coord.lat, result.coord.lon)
      dispatch({
        type: CURRENT_WEATHER,
        payload: {current: result, forecast},
      })
    } catch (error) {
      console.log(error)
    }
  }
}
export const getWeatherByZip = (zip: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const zipcode = parseInt(zip)
      const result = await searchByZip(zipcode)
      const forecast = await fiveDayForecast(result.coord.lat, result.coord.lon)
      dispatch({
        type: CURRENT_WEATHER,
        payload: {current: result, forecast},
      })
    } catch (error) {
      console.log(error)
    }
  }
}
