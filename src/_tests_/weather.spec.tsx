import { getCurrentWeather } from '../store/weather/weather.action'
import { State, Actions } from '../store/rootReducers'
import configureStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'

type DispatchExts = ThunkDispatch<State, void, Actions>

const mockStore = configureStore<State,DispatchExts>([thunk])

test('should test for get current weather action', () => {
  const store = mockStore()
  store.dispatch(getCurrentWeather('islamabad')).then((response) => console.log('response', response));
})
