import { Action, combineReducers } from 'redux'
import WeatherReducer, { WeatherState } from './weather/weather.reducer'

export interface State {
  WeatherReducer: WeatherState
}

export type Actions = Action<any>

const rootReducers = combineReducers({ WeatherReducer })

export default rootReducers
