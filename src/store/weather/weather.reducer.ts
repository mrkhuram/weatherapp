import { CurrentWeatherTypes, CURRENT_WEATHER } from './weather.type'

export type WeatherState = {
  weather: null | any
  forecast: null | any
}

const initState: WeatherState = {
  weather: null,
  forecast: null
}

const WeatherReducer = (state = initState, action: CurrentWeatherTypes) => {
  const { type, payload } = action

  switch (type) {
    case CURRENT_WEATHER:
      return {
        ...state,
        weather: payload.current,
        forecast: payload.forecast,
      }
    default:
      return state
  }
}
export default WeatherReducer
