export const CURRENT_WEATHER = 'CURRENT_WEATHER'
export type currentWeather = {
  current: any
  forecast: any
  completeForecast: any
}
export type CurrentWeatherTypes = {
  type: typeof CURRENT_WEATHER
  payload: currentWeather
}

export const DAY_FORECAST = 'DAY_FORECAST'
export type forecast = {
  data: any
}
export type DayForecastTypes = {
  type: typeof DAY_FORECAST
  payload: forecast
}

export const CHANGE_TEMP_UNIT = 'CHANGE_TEMP_UNIT'
export type tempUnit = {
  unit: string
}
export type ChangeTempUnitTypes = {
  type: typeof CHANGE_TEMP_UNIT
  payload: tempUnit
}

export const ERROR_HANDLER = 'ERROR_HANDLER'
export type errorHandler = {
  unit: string
}
export type ErrorHandlerTypes = {
  type: typeof ERROR_HANDLER
  payload: errorHandler
}
