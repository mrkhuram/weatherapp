import {
  CurrentWeatherTypes,
  CURRENT_WEATHER,
  DAY_FORECAST,
  DayForecastTypes,
  CHANGE_TEMP_UNIT,
  ChangeTempUnitTypes,
  ErrorHandlerTypes,
  ERROR_HANDLER
} from './weather.type'

export type WeatherState = {
  weather: null | any
  forecast: null | any
  completeForecast: null | any
  forecastForDay: null | any
  cUnit: string,
  error: boolean | string
}

const initState: WeatherState = {
  weather: null,
  forecast: null,
  completeForecast: null,
  forecastForDay: null,
  cUnit: 'celsius',
  error: false
}

const WeatherReducer = (
  state = initState,
  action: CurrentWeatherTypes | DayForecastTypes | ChangeTempUnitTypes | ErrorHandlerTypes,
) => {
  const { type, payload } = action

  switch (type) {
    case CURRENT_WEATHER:
      return {
        ...state,
        weather: payload.current,
        forecast: payload.forecast,
        completeForecast: payload.completeForecast,
      }
    case DAY_FORECAST:
      return {
        ...state,
        forecastForDay: payload,
      }
    case CHANGE_TEMP_UNIT:
      return {
        ...state,
        cUnit: payload,
      }
    case ERROR_HANDLER:
      return {
        ...state,
        error: payload,
      }
    default:
      return state
  }
}
export default WeatherReducer
